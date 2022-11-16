import { useContext, useEffect, useState } from "react";
// import { Draggable } from "react-beautiful-dnd";
import { ThemeContext } from "styled-components";
import getBackgroundColor from "../../helpers/getBackGroundColor";
import ICard from "../../interfaces/ICard";
import IStatus from "../../interfaces/IStatus";
import { CardBorder, CardBottom, CardContainer } from "./style";

interface CardProps {
  card: ICard;
  index: number;
  handleDragEnter:(cardId:string,columnStatus:IStatus)=>void
  handleDragEnd:(cardId:string,columnStatus:IStatus)=>void
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
    
        <CardContainer hideCard={card.hidden} draggable onDragEnter={() => handleDragEnter(card.id,card.status)} onDragEnd={() => handleDragEnd(card.id,card.status)}>
          <CardBorder color={backgroundColor} />
          <h3>{card.title} {card.id}</h3>
          <CardBottom>
            <p>+ View More</p>
          </CardBottom>
        </CardContainer>
      )

};
export default Card;
