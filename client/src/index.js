import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import {AuthProvider} from "./context/auth";
import {SarchProvider} from "./context/search";
import {CartProvider} from "./context/Cart";
// import "antd/dist/reset.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
  <AuthProvider>
    <SarchProvider>
      <CartProvider>
         <BrowserRouter>
           <App />
        </BrowserRouter>
      </CartProvider>
    </SarchProvider>
  </AuthProvider> 
      
  
);
