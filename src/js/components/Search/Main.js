import React, { useEffect, useRef } from "react";
import { findPeople } from "js/actions/index";
import { useDispatch } from 'react-redux';
import SearchList from "js/components/Search/SearchList";
import { useDetectOutsideClick } from "js/util/useDetectOutsideClick";


const Search = (prop) => {
    const dispatch = useDispatch();

    function search() {
        let name = document.getElementById('search-field').value
        dispatch(findPeople(name))
    }

    useEffect(() => {
        console.log('prop changed', prop);
    }, [prop])
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const onClick = () => setIsActive(!isActive);

    return (
        <div className="flex-1 flex">
        <div className="w-full flex md:ml-0">
          <label htmlFor="search-field" className="sr-only">
            Search
        </label>
          <div className="relative w-full text-gray-400 focus-within:text-gray-600">
            <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
              {/* <SearchIcon className="h-5 w-5" aria-hidden="true" /> */}
            </div>
            <input
              id="search-field"
              className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
              placeholder="Search For New Friends..."
              type="search"
              name="search"
              onChange={search}
              autoComplete="off"
            />
          </div>
          <SearchList />

        </div>
      </div>
    );
};

export default Search;