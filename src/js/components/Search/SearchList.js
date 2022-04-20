import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import SearchListItem from "js/components/Search/SearchListItem";
import {StyledSearchList} from "js/components/styles/SearchList.styled.js";




function SearchList() {

    const searchList = useSelector(state => state.searchList)
    const panding_requests = useSelector(state => state.panding_requests)
    useEffect(() => {
        console.log(panding_requests);
    }, [searchList, panding_requests])
    // Get next question when choose specific answer 
    if (searchList.length > 0) {

        return <StyledSearchList className="search_list">
            {searchList.map((object, i) => <SearchListItem user={object} userId={object._id} key={object._id} />)}
        </StyledSearchList>
    }
    // Ask about this
    return <div></div>
};

export default SearchList;