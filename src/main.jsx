import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// Add bootstrap manual
import "./assets/bootstrap/css/bootstrap.min.css";

import "./assets/bootstrap/js/bootstrap.bundle.js";
import "./index.css";
import 'react-quill/dist/quill.snow.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Provider } from "react-redux";
import { store } from './redux/temp.js';




ReactDOM.createRoot(document.getElementById("root")).render(
  
<Provider store={store}>
    <App />
</Provider>
  
 
);
