import { useContext, useEffect, useState } from "react";
// import { Draggable } from "react-beautiful-dnd";
import { ThemeContext } from "styled-components";
import getBackgroundColor from "../../helpers/getBackGroundColor";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import ICard from "../../interfaces/ICard";
import IColumn from "../../interfaces/IColumn";
import IStatus from "../../interfaces/IStatus";
import { setCards } from "../../store/slices/card.slice";
import { setColumns } from "../../store/slices/column.slice";
import Badge from "../Badge";
import { CardBorder, CardBottom, CardContainer } from "./style";

interface CardProps {
  card: ICard;
  index: number;
  handleDragEnter:(cardId:string,columnStatus:IStatus)=>void
  handleDragEnd:(cardId:string,columnStatus:IStatus)=>void
}
interface ColumnTargetType {
  cardId: string;
  columnStatus: IStatus;
}
const Card: React.FC<CardProps> = ({ card, index,handleDragEnd,handleDragEnter }) => {
  
  const theme = useContext(ThemeContext);
  const [backgroundColor, setBackgroundColor] = useState<string>(
    theme.colors.primary
  );
  
  useEffect(() => {
    if (card) {
      const categoryColor = getBackgroundColor(theme, card.category);
      setBackgroundColor(categoryColor);
    }
  }, [card]);

  return (
    
        <CardContainer hideCard={card.hidden } draggable onDragEnter={() => handleDragEnter(card.id,card.status)} onDragEnd={() => handleDragEnd(card.id,card.status)}>
          <CardBorder color={backgroundColor} />
          <h3>{card.title}</h3>
          <CardBottom>
            <p>+ View More</p>
          <Badge category={card.category} key={card.id}/>
          </CardBottom>
        </CardContainer>
      )

};
export default Card;
