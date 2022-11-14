import {
  Container,
  Header,
  StatusesColumnsContainer,
  SwitchIcon,
  TitleAndSwitch,
} from "./style";
import Switch from "react-switch";
import { useContext } from "react";
import { ThemeContext } from "styled-components";
import SunIcon from "../../assets/sun.png";
import MoonIcon from "../../assets/moon.png";
import mockCards from "../../data/cards";
import mockColumns from "../../data/columns";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import ICard from "../../interfaces/ICard";
import Column from "../Column";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import IStatus from "../../interfaces/IStatus";
import IColumn from "../../interfaces/IColumn";
import { setColumns } from "../../store/slices/column.slice";
import { setCards } from "../../store/slices/card.slice";

interface KanbanDashboardProps {
  toggleTheme: () => void;
}

const KanbanDashboard = ({ toggleTheme }: KanbanDashboardProps) => {
  const { title, colors } = useContext(ThemeContext);
  const theme = useContext(ThemeContext);
  // const cards = mockCards;
  // const columns = mockColumns;
  const { cards } = useAppSelector((state) => state.cards);
  const { columns } = useAppSelector((state) => state.columns);

  const dispatch = useAppDispatch()

  const onDragEnd = (result: DropResult) => {
    const { draggableId, source, destination } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const updatedCards: ICard[] = cards.map((card) => {
      if (card.id === draggableId) {
        const status: IStatus = destination.droppableId as IStatus;
        return {
          ...card,
          status,
        };
      } else return card;
    });

    const sourceColumn: IColumn = columns.find(
      (column) => column.id === source.droppableId
    ) as IColumn;
    const destinationColumn: IColumn = columns.find(
      (column) => column.id === destination.droppableId
    ) as IColumn;

    // moving cards into same column

    if (sourceColumn === destinationColumn) {
      const newColumnCardsIds = [...destinationColumn.cardsIds];

      newColumnCardsIds.splice(source.index, 1);
      newColumnCardsIds.splice(destination.index, 0, draggableId);

      const newDestinationColumn: IColumn = {
        ...destinationColumn,
        cardsIds: newColumnCardsIds,
      };
      const updatedColumns: IColumn[] = columns.map((column) => {
        if (column.id === newDestinationColumn.id) return newDestinationColumn;
        else return column;
      });

      dispatch(setColumns(updatedColumns))
      dispatch(setCards(updatedCards))
    }
  };
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
        </Header>
        <StatusesColumnsContainer>
          <DragDropContext onDragEnd={onDragEnd}>
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
                />
              );
            })}
          </DragDropContext>
        </StatusesColumnsContainer>
      </Container>
    </>
  );
};
export default KanbanDashboard;
