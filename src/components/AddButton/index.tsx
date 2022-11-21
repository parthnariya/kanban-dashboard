import { useModal } from "../../hooks/useModal"
import { Container } from "./style"

const AddButton : React.FC = () => {
    const {toggleVisibility} = useModal()
    return <Container onClick={() => toggleVisibility(undefined)}>
        <strong>+ Add Card</strong>
    </Container>
}
export default AddButton