import { Draggable } from "react-beautiful-dnd";
import ICard from "../../interfaces/ICard"
import { CardContainer } from "./style";

interface CardProps {
    card : ICard;
    index:number
}
const Card: React.FC<CardProps> = ({card,index}) => {
    return<Draggable draggableId={card.id} index={index}>
        {provided => (
            <CardContainer hideCard={card.hidden}>
                
            </CardContainer>
        )

        }
    </Draggable>
}
export default Card