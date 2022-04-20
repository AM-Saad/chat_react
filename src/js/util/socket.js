import store from '../store';
import io from "socket.io-client"

let url = store.getState().url

console.log('connecting...');
let socket = io(`${url}/chat`);

export default socket

