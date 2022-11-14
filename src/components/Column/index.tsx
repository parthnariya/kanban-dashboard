import ICard from "../../interfaces/ICard"
import IStatus from "../../interfaces/IStatus"
import { CardsList, Container } from "./style"
import {Droppable} from "react-beautiful-dnd"
import Card from "../Card/index"
interface ColumnProps {
    status : IStatus
    cards : ICard[]
    index : number
}
const Column : React.FC<ColumnProps> = ({cards,index,status}) => {
    return<Container isFirstColumn={index === 0}>
        <h2>{status}</h2>
        <Droppable  droppableId={status}>
            {(provided) => {
                return <CardsList ref={provided.innerRef} {...provided.droppableProps}>
                    {cards.filter(card => card.status === status).map((card,index) => 
                        <Card card={card} index={index} key={card.id}/>
                        )
                    }
                    {provided.placeholder}
                </CardsList>
            }}
        </Droppable>
    </Container>
}
export default Column