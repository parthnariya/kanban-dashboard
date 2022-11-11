import ICard from "../../interfaces/ICard"
import IStatus from "../../interfaces/IStatus"
import { CardsList, Container } from "./style"
import {Droppable} from "react-beautiful-dnd"

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
                <CardsList ref={provided.innerRef} {...provided.droppableProps}>
                    {
                    }
                </CardsList>
            }}
        </Droppable>
    </Container>
}
export default Column