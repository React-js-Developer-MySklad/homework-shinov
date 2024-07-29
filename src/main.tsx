import {createRoot} from "react-dom/client";
import App from "./app/App";
import './style.css';
import {ApiProvider} from "./app/context/ApiContext";

const rootElement = document.getElementById('root');
const root = createRoot(rootElement)

root.render(
    <ApiProvider>
        <App/>
    </ApiProvider>);