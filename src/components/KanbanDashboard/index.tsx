import {
  Container,
  FiltersContainer,
  Header,
  LabelContainer,
  SearchAndFilters,
  StatusesColumnsContainer,
  SwitchIcon,
  TitleAndSwitch,
} from "./style";
import Switch from "react-switch";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "styled-components";
import SunIcon from "../../assets/sun.png";
import MoonIcon from "../../assets/moon.png";
// import { DragDropContext, DropResult } from "react-beautiful-dnd";
import ICard from "../../interfaces/ICard";
import Column from "../Column";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import IStatus from "../../interfaces/IStatus";
import IColumn from "../../interfaces/IColumn";
import { setColumns } from "../../store/slices/column.slice";
import { filterCards, setCards } from "../../store/slices/card.slice";
import SearchInput from "../SearchInput";
import ICategory from "../../interfaces/ICategory";
import getBackgroundColor from "../../helpers/getBackGroundColor";
import { useModal } from "../../hooks/useModal";
import Modal from "../Modal";

interface KanbanDashboardProps {
  toggleTheme: () => void;
}
interface ColumnTargetType {
  cardId: string;
  columnStatus: IStatus;
}

const KanbanDashboard = ({ toggleTheme }: KanbanDashboardProps) => {
  const { title, colors } = useContext(ThemeContext);
  const theme = useContext(ThemeContext);

  const [target, setTarget] = useState<ColumnTargetType>();
  const [selectedCategory, setSelectedCategory] = useState<ICategory[]>(Object.values(ICategory))

  const { cards } = useAppSelector((state) => state.cards);
  const { columns } = useAppSelector((state) => state.columns);
  const {visible} = useModal() 
  console.log(visible);

  

  const dispatch = useAppDispatch();
  // const cards = mockCards;
  // const columns = mockColumns;

  const handleDragEnter = (cardId: string, columnStatus: IStatus) => {
    setTarget({
      cardId,
      columnStatus,
    });
  };
  const handleDragEnd = (cardId: string, columnStatus: IStatus) => {
    if (!target) return;
    const sourceCard = cards.find((item) => item.id === cardId);
    const sourceColumn: IColumn = columns.find(
      (column) => column.id === columnStatus
    ) as IColumn;
    const targetColumn: IColumn = columns.find(
      (item) => item.id === target?.columnStatus
    ) as IColumn;

    const updatedCards: ICard[] = cards.map((item) => {
      if (item.id === sourceCard?.id) {
        const status: IStatus = target.columnStatus as IStatus;
        return {
          ...item,
          status,
        };
      } else return item;
    });

    if (targetColumn === sourceColumn) {
      // console.log("same");
      // console.log(targetColumn);
      const newColumnCardIds = [...sourceColumn.cardsIds];
      const sourceCardIndex = newColumnCardIds.findIndex(
        (item) => item === cardId
      );
      const destinationCardIndex = newColumnCardIds.findIndex(
        (item) => item === target.cardId
      );
      newColumnCardIds.splice(sourceCardIndex, 1);
      newColumnCardIds.splice(destinationCardIndex, 0, cardId);
      const newDestinationColumn: IColumn = {
        ...targetColumn,
        cardsIds: newColumnCardIds,
      };
      // console.log(newDestinationColumn)
      const updateColumns: IColumn[] = columns.map((item) => {
        if (item.id === newDestinationColumn.id) return newDestinationColumn;
        else return item;
      });
      dispatch(setCards(updatedCards));
      dispatch(setColumns(updateColumns));
      return;
    }

    const sourceCardsIds = [...sourceColumn.cardsIds];
    const sourceCardIndex = sourceCardsIds.findIndex((item) => item === cardId);
    sourceCardsIds.splice(sourceCardIndex, 1);

    const newSourceColumn: IColumn = {
      ...sourceColumn,
      cardsIds: sourceCardsIds,
    };

    const targetCardIds = [...targetColumn.cardsIds];
    const targetCardIndex = targetCardIds.findIndex(
      (item) => item === target.cardId
    );
    targetCardIds.splice(targetCardIndex, 0, cardId);
    const newTargetColumn: IColumn = {
      ...targetColumn,
      cardsIds: targetCardIds,
    };

    const updatedColumns: IColumn[] = columns.map((item) => {
      if (item.id === newSourceColumn.id) return newSourceColumn;
      if (item.id === newTargetColumn.id) return newTargetColumn;
      else return item;
    });
    dispatch(setCards(updatedCards));
    dispatch(setColumns(updatedColumns));
    return;
  };

  const handleCategoryCheckbox = (category : ICategory) => {
    const foundCategory = selectedCategory.find(item => item === category);
    if(foundCategory){
      const categoryWithItemRemoved = selectedCategory.filter(item =>item !== category)
      setSelectedCategory(categoryWithItemRemoved)
      return
    }
    setSelectedCategory([...selectedCategory,category])
    return
  }

  useEffect(() => {
    dispatch(filterCards({categories : selectedCategory}))
  },[selectedCategory])
  return (
    <>
      <Container>
        <Header>
          <TitleAndSwitch>
            <h1>
              Kanban <span>Board</span>
            </h1>
            <Switch
              onChange={toggleTheme}
              checked={title === "light"}
              checkedIcon={<SwitchIcon src={SunIcon} alt="sun" />}
              uncheckedIcon={<SwitchIcon src={MoonIcon} alt="moon" />}
              onColor={colors.primary}
              offColor={colors.switch}
            />
          </TitleAndSwitch>
          <SearchAndFilters>
            <SearchInput />
            <FiltersContainer>
              {Object.values(ICategory).map((item) => (
                <LabelContainer
                  color={() => getBackgroundColor(theme, item)}
                  key={item}
                  onClick={() => handleCategoryCheckbox(item)}
                >
                  <input type="checkbox" name={item} value={item} checked={selectedCategory.includes(item)} onChange={() => handleCategoryCheckbox(item)}/>
                  <label>{item}</label>
                </LabelContainer>
              ))}
            </FiltersContainer>
          </SearchAndFilters>
        </Header>
        <StatusesColumnsContainer>
          {columns.map((column, index) => {
            const cardsArray: ICard[] = [];

            column.cardsIds.forEach((cardId) => {
              const foundedCard = cards.find((card) => card.id === cardId);
              if (foundedCard) cardsArray.push(foundedCard);
            });
            return (
              <Column
                cards={cardsArray}
                index={index}
                status={column.id}
                key={column.id}
                handleDragEnd={handleDragEnd}
                handleDragEnter={handleDragEnter}
              />
            );
          })}
        </StatusesColumnsContainer>
      </Container>
      <Modal visible={visible}/>
    </>
  );
};
export default KanbanDashboard;
