import { useContext, useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { ThemeContext } from "styled-components";
import getBackgroundColor from "../../helpers/getBackGroundColor";
import ICard from "../../interfaces/ICard";
import { CardBorder, CardBottom, CardContainer } from "./style";

interface CardProps {
  card: ICard;
  index: number;
}
const Card: React.FC<CardProps> = ({ card, index }) => {
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
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <CardContainer hideCard={card.hidden}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
        >
          <CardBorder color={backgroundColor} />
          <h3>{card.title}</h3>
          <CardBottom>
            <p>+ View More</p>
          </CardBottom>
        </CardContainer>
      )}
    </Draggable>
  );
};
export default Card;
