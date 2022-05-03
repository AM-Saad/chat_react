import React, {useRef} from 'react';
import { useDispatch } from 'react-redux';

import { search_in_friends } from "js/actions/index";


const Search_Friends = () =>{
    const dispatch = useDispatch();
    const searchInput= useRef()
    
    function search() {
        let name = searchInput.current.value
        console.log(name)
        dispatch(search_in_friends(name))
    }

    return  <>
       <div className="my-5 w-full text-gray-400 focus-within:text-gray-600">
            <input
              id="search-field"
              className="block border-b border-gray-300 focus:border-transparent focus:outline-none focus:placeholder-gray-400 focus:ring-0 h-full p-4 placeholder-gray-500 rounded-sm sm:text-sm text-gray-900 w-full"
              placeholder="Search in your friends list..."
              type="search"
              name="search"
              ref={searchInput}
              onChange={search}
              autoComplete="off"
            />
           
          </div>
    </>
}

export default Search_Friends