import { createContext, ReactNode, useContext, useState } from "react"
import ICard from "../interfaces/ICard"

interface ModalContextData {
    visible : boolean
    toggleVisibility : (card:ICard | undefined) => void
    selectedCard : ICard | undefined
}
interface ModalProviderProps {
    children : ReactNode
}
const ModalContext = createContext<ModalContextData>({} as ModalContextData);

const ModalProvider:React.FC<ModalProviderProps> = ({children}) => {
    const [visible, setVisible] = useState<boolean>(false)
    const [selectedCard, setSelectedCard] = useState<ICard | undefined>()

    const toggleVisibility = (card:ICard | undefined) => {
        if(card) setSelectedCard(card);
        else setSelectedCard(undefined);
        setVisible(!visible)
        return
    }
    return <ModalContext.Provider value={{visible,selectedCard,toggleVisibility}}>
        {children}
    </ModalContext.Provider>
}
function useModal() : ModalContextData {
    const context = useContext(ModalContext);
    if(!context){
        throw new Error('useModal must be used within ModalContext Provider'); 
    }
    return context
}

export {ModalProvider,useModal}