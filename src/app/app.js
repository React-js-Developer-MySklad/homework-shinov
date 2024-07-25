import html from "./app.html";
import './app.css'
import table from './contragents/table/table.js'
import modal from './contragents/modal/modal.js'


const rootElement = document.getElementById('root');
rootElement.innerHTML = html;


const data = [// {
    //     id: 123,
    //     name: "ООО Рога и Копыта",
    //     inn: 7725396754,
    //     address: "г. Москва, набережная Дербеневская, д. 7 стр. 5 этаж 5 офис 512",
    //     kpp: 772501001
    // }
]


const tbl = table(document.getElementById("table-container"), data);

const md = modal(document.getElementById("modal-container"), data, tbl.refresh);

document.getElementById("add-button").onclick = md.open;
