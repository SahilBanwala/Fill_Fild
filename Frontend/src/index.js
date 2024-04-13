import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import 'aos';
import 'aos/dist/aos.css'
import "./index.css";

import ContextProviders from "./context";

ReactDOM.render(
  <BrowserRouter>
    <ContextProviders>
      <App />
    </ContextProviders>
  </BrowserRouter>,
  document.getElementById("root")
);
