import React, { useEffect, Suspense } from "react";
import Friend from './Friend'
import { useSelector } from "react-redux";
import { useDispatch, } from 'react-redux';

import { FetchFriends } from "js/actions/index";


const Friends = () => {
    const allfriends = useSelector(state => state.friends)
    const friendsMeta = useSelector(state => state.friendsMeta)
    const dispatch = useDispatch();


    useEffect(() => {


    }, [allfriends, friendsMeta])

    const renderReloadingBtn = () => {
        if (friendsMeta.error) {
            return <div >
                <h1>Hmmm...</h1>
                <p>It seems you lost your connection, please try again.</p>
                <button className="btn bg-main" onClick={() => dispatch(FetchFriends())}>Reload</button>
            </div>
        }
    }
    return (
        <div className="users-menu">

            <ul>
                {allfriends.map((object, i) => <Suspense fallback="Loading..."> <Friend friend={object} key={object._id} /></Suspense>)}

                {renderReloadingBtn()}
            </ul>

        </div>
                );
                };
                
export default Friends;