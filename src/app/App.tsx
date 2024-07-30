import * as css from './app.module.css';
import logoSvg from '../assets/logo.svg';
import Table from "./contragents/table/Table";
import React, {useState} from "react";
import MyModal from "./contragents/modal/MyModal";
import {useApi} from "./context/ApiContext";

export interface Company {
    id: string;
    name: string;
    inn: string;
    address: string;
    kpp: string;
}

const App: React.FC = () => {

    const [openModal, setOpenModal] = useState(false);
    const { companies, createCompany } = useApi();
    const addCompany = (record: Company) => {
        createCompany(record);
    };

    return <div className={css.page}>
        <header className={css.header}>
            <img className="header-logo" src={logoSvg} alt="МойСклад"/>
            <button type="button"
                    id="add-button"
                    className={css.button}
                    onClick={()=> setOpenModal(true)}>
                Добавить
            </button>
        </header>

        <main className={css.main}>
            <div className="relative overflow-x-auto">
                <Table  counterparties={companies}/>
                <MyModal onCloseModal={() =>setOpenModal(false)}
                         openModal={openModal} onSave={addCompany}/>
            </div>
        </main>
        <footer className={css.footer}>
            <p className="text-xs font-medium">© 2007–2024 ООО «Логнекс»</p>
        </footer>
    </div>
}

export default App;