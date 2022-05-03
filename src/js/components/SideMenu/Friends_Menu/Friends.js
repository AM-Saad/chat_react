import React from "react";
import Friend from './Friend'
import { useSelector } from "react-redux";
import { useDispatch, } from 'react-redux';

import { fetch_friends } from "js/actions/index";


const Friends = () => {
    const allfriends = useSelector(state => state.friends)
    const friendsMeta = useSelector(state => state.friendsMeta)
    const dispatch = useDispatch();


        return (
        <div className="users-menu">

            <ul>
                {allfriends.length > 0 && allfriends.map((object, i) =>  <Friend friend={object} key={object._id} />)}
                {!friendsMeta.error && !friendsMeta.loading && allfriends.length === 0 && <p className={`mt-5 text-gray-400 text-xl true `}>Search for new friend and start texting...</p>}
                {friendsMeta.loading && <p>Loading...</p>}

                {friendsMeta.error && <div className="bg-opacity-50 bg-yellow-100 p-3 rounded">
                <p className="mb-5">{friendsMeta.error}</p>
                <button className="bg-gray-300 px-6 py-2 rounded-sm bg-blue-200 hover:opacity-70" onClick={() => dispatch(fetch_friends())}>Reload</button>
            </div>}

            </ul>

        </div>
    );
};

export default Friends;