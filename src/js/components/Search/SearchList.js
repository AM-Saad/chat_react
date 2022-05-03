import React from "react";
import {  useSelector } from 'react-redux';
import SearchListItem from "js/components/Search/SearchListItem";
import {StyledSearchList} from "js/components/styles/SearchList.styled.js";




function SearchList() {

    const searchList = useSelector(state => state.searchList)

    // Get next question when choose specific answer 

        return <StyledSearchList className="search_list">
            {searchList.map((object, i) => <SearchListItem user={object} userId={object._id} key={object._id} />)}
        </StyledSearchList>
};

export default SearchList;