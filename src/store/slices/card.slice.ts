import { createSlice } from "@reduxjs/toolkit";

import mockCards from "../../data/cards";
import ICard from "../../interfaces/ICard";
import ICategory from "../../interfaces/ICategory";

interface CardSliceState {
  cards: ICard[];
  searchText: string;
}
const initialState: CardSliceState = {
  cards: mockCards,
  searchText: "",
};

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setCards: (state, { payload }) => {
      state.cards = payload;
    },
    setSearchText: (state, { payload }) => {
      state.searchText = payload;
    },
    addCard: (state, { payload }) => {
      state.cards = [...state.cards, payload];
    },
    updateOneCard: (state, { payload }) => {
      const cardId = payload.id;

      const updatedCards = state.cards.map((card) => {
        if (card.id === cardId) return payload;
        else return card;
      });
      state.cards = updatedCards;
    },
    filterCards: (state, { payload }) => {
      const searchText = state.searchText;
      const categories = payload.categories || Object.values(ICategory);

      const filteredCards = [...state.cards].map((item) => {
        if (searchText.length > 0) {
          if (
            item.title.toUpperCase().includes(searchText.toUpperCase()) &&
            categories.includes(item.category)
          )
            return { ...item, hidden: false };
        }else{
            if(categories.includes(item.category)){
                return {...item,hidden:false}
            }
        }
        return {...item,hidden:true}
      });
      state.cards = filteredCards
    },
    clearFilter:(state) => {
        const clearFilteredCards = state.cards.map(item => ({
            ...item,
            hidden:false
        }))
        state.cards = clearFilteredCards;
    }
  },
});
export const { addCard, setCards, setSearchText, updateOneCard,clearFilter,filterCards } =
  cardsSlice.actions;
export default cardsSlice.reducer;
