import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./js/store/index";
import App from "./js/components/App";
import './public/css/App.css';
import './public/css/classes.css';
import './public/css/chat.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import './public/css/index.css';

library.add(fas)
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);