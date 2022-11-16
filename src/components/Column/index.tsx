import ICard from "../../interfaces/ICard";
import IStatus from "../../interfaces/IStatus";
import { CardsList, Container } from "./style";
// import {Droppable} from "react-beautiful-dnd"
import Card from "../Card/index";
interface ColumnProps {
  status: IStatus;
  cards: ICard[];
  index: number;
  handleDragEnter:(cardId:string,columnStatus:IStatus)=>void
  handleDragEnd:(cardId:string,columnStatus:IStatus)=>void
}
const Column: React.FC<ColumnProps> = ({ cards, index, status,handleDragEnd,handleDragEnter }) => {
    const dragHandler = () => {
        // console.log("hello")
    }
  return (
    <Container isFirstColumn={index === 0} onDragEnter={dragHandler} >
      <h2>{status}</h2>
      <CardsList>
        {cards
          .filter((card) => card.status === status)
          .map((card, index) => (
            <Card card={card} index={index} key={card.id} handleDragEnd={handleDragEnd} handleDragEnter={handleDragEnter}/>
          ))}
      </CardsList>
    </Container>
  );
};
export default Column;
