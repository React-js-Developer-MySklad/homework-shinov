import React, {useState} from "react";
import {Button, Label, Modal, TextInput} from "flowbite-react";
import * as css from "./modal.module.css"
import { v4 as uuidv4 } from 'uuid';
import {Company} from "../../App";

interface Props {
    openModal: boolean;
    onCloseModal: () => void;
    onSave: (data: Company) => void;
}

const validateField = (value: string, regex: RegExp, setError: (hasError: boolean) => void) => {
    const result = regex.test(value);
    setError(!result);
    return result;
};

const MyModal: React.FC<Props> = ({openModal, onCloseModal, onSave}) => {

    const [name, setName] = useState("");
    const [inn, setInn] = useState("");
    const [address, setAddress] = useState("");
    const [kpp, setKpp] = useState("");

    const [innError, setInnError] = useState(false);
    const [kppError, setKppError] = useState(false);

    const saveClick = ()=> {
        event.preventDefault();
        if (!validateField(inn, /^\d{11}$/, setInnError)) {
            return;
        }
        if (!validateField(kpp, /^\d{9}$/, setKppError)) {
            return;
        }
        const id = uuidv4();
        onSave({id, name, inn, address, kpp});

        setName("");
        setInn("");
        setAddress("");
        setKpp("");
        setInnError(false);
        setKppError(false);

        onCloseModal();
    }


    return (
        <Modal show={openModal} size="md" onClose={onCloseModal} popup position="center">
            <Modal.Header />
            <Modal.Body>
                <form onSubmit={saveClick}>
                    <div className="space-y-6 p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Добавить контрагента
                        </h3>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email" value="Наименование"/>
                            </div>
                            <TextInput
                                id="name"
                                placeholder="Наименование"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="inn" value="ИНН"/>
                            </div>
                            <TextInput
                                id="inn"
                                placeholder="11 символов, числа"
                                value={inn}
                                onChange={(event) => {

                                    setInn(event.target.value);
                                }}
                                required
                            />
                            {innError && <span className="text-red-500 text-sm">Поле ИНН должно содержать 11 символов - числа</span>}
                        </div>
                        <div>
                            <div className="mb-2 block">
                            <Label htmlFor="address" value="Адрес"/>
                            </div>
                            <TextInput
                                id="address"
                                placeholder="Адрес"
                                value={address}
                                onChange={(event) => setAddress(event.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="kpp" value="КПП"/>
                            </div>
                            <TextInput
                                id="kpp"
                                placeholder="Поле КПП должно содержать 9 символов - числа"
                                value={kpp}
                                onChange={(event) => setKpp(event.target.value)}
                                required
                            />
                            {kppError && <span className="text-red-500 text-sm">Поле КПП должно содержать 9 символов - числа</span>}
                        </div>
                        <div>
                            <Button className={css.button} type="submit">Добавить</Button>
                        </div>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
);
}

export default MyModal;