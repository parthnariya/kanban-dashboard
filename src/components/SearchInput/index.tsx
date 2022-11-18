import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux"
import { clearFilter, filterCards, setSearchText } from "../../store/slices/card.slice";
import { Container } from "./style";
import SearchIcon from '../../assets/search.png'

const SearchInput:React.FC = () => {
    const {searchText} = useAppSelector((state => state.cards))
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(searchText.length === 0){
            dispatch(clearFilter())
        }else{
            dispatch(filterCards({}))
        }
    },[searchText])
    return <Container>
        <input 
            type="search"
            placeholder="Search Among Card Titles"
            value={searchText}
            onChange={(e) => dispatch(setSearchText(e.target.value))}
        />
        <img src={SearchIcon} alt="SearchIcon"/>
    </Container>
}
export default SearchInput