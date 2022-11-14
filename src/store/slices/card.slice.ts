import { createSlice } from "@reduxjs/toolkit";

import mockCards from "../../data/cards";
import ICard from "../../interfaces/ICard";
import ICategory from "../../interfaces/ICategory";

interface CardSliceState {
    cards : ICard[],
    searchText : string
}
const initialState: CardSliceState = {
    cards:mockCards,
    searchText:""
}

export const cardsSlice  = createSlice({
    name:"cards",
    initialState,
    reducers:{
        setCards:(state,{payload}) =>{
            state.cards = payload
        },
        setSearchText:(state,{payload}) =>{
            state.searchText = payload
        },
        addCard:(state,{payload}) => {
            state.cards = [...state.cards,payload]
        },
        updateOneCard:(state,{payload}) => {
            const cardId = payload.id;

            const updatedCards = state.cards.map(card => {
                if (card.id === cardId) return payload;
                else return card
            })
            state.cards = updatedCards
        },
        
    }
})
export const {addCard,setCards,setSearchText,updateOneCard} = cardsSlice.actions
export default cardsSlice.reducer