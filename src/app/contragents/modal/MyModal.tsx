import React from "react";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { Form, Field } from "react-final-form";
import { v4 as uuidv4 } from 'uuid';
import { Company } from "../../App";
import * as css from "./modal.module.css";

interface Props {
    openModal: boolean;
    onCloseModal: () => void;
    onSave: (data: Company) => void;
}

interface FormValues {
    name: string;
    inn: string;
    address: string;
    kpp: string;
}

const validate = (values: FormValues) => {
    const errors: Partial<FormValues> = {};
    if (!values.name) {
        errors.name = "Поле обязательно";
    }
    if (!values.inn) {
        errors.inn = "Поле обязательно";
    } else if (!/^\d{11}$/.test(values.inn)) {
        errors.inn = "ИНН должен содержать 11 символов";
    }
    if (!values.address) {
        errors.address = "Поле обязательно";
    }
    if (!values.kpp) {
        errors.kpp = "Поле обязательно";
    } else if (!/^\d{9}$/.test(values.kpp)) {
        errors.kpp = "КПП должен содержать 9 символов";
    }
    return errors;
};

const MyModal: React.FC<Props> = ({ openModal, onCloseModal, onSave }) => {

    const onSubmit = (values: FormValues) => {
        const id = uuidv4();
        onSave({ ...values, id });

        onCloseModal();
    };

    return (
        <Modal show={openModal} size="md" onClose={onCloseModal} popup position="center">
            <Modal.Header />
            <Modal.Body>
                <Form
                    onSubmit={onSubmit}
                    validate={validate}
                    render={({ handleSubmit, form, submitting, pristine, errors }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-6 p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Добавить контрагента
                                </h3>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="name" value="Наименование" />
                                    </div>
                                    <Field name="name">
                                        {({ input, meta }) => (
                                            <div>
                                                <TextInput
                                                    id="name"
                                                    placeholder="Наименование"
                                                    {...input}
                                                    required
                                                />
                                                {meta.error && meta.touched && (
                                                    <span className="text-red-500 text-sm">{meta.error}</span>
                                                )}
                                            </div>
                                        )}
                                    </Field>
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="inn" value="ИНН" />
                                    </div>
                                    <Field name="inn">
                                        {({ input, meta }) => (
                                            <div>
                                                <TextInput
                                                    id="inn"
                                                    placeholder="11 символов, числа"
                                                    {...input}
                                                    required
                                                />
                                                {meta.error && meta.touched && (
                                                    <span className="text-red-500 text-sm">{meta.error}</span>
                                                )}
                                            </div>
                                        )}
                                    </Field>
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="address" value="Адрес" />
                                    </div>
                                    <Field name="address">
                                        {({ input, meta }) => (
                                            <div>
                                                <TextInput
                                                    id="address"
                                                    placeholder="Адрес"
                                                    {...input}
                                                    required
                                                />
                                                {meta.error && meta.touched && (
                                                    <span className="text-red-500 text-sm">{meta.error}</span>
                                                )}
                                            </div>
                                        )}
                                    </Field>
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="kpp" value="КПП" />
                                    </div>
                                    <Field name="kpp">
                                        {({ input, meta }) => (
                                            <div>
                                                <TextInput
                                                    id="kpp"
                                                    placeholder="Поле КПП должно содержать 9 символов - числа"
                                                    {...input}
                                                    required
                                                />
                                                {meta.error && meta.touched && (
                                                    <span className="text-red-500 text-sm">{meta.error}</span>
                                                )}
                                            </div>
                                        )}
                                    </Field>
                                </div>
                                <div>
                                    <Button className={css.button} type="submit" disabled={submitting || pristine}>
                                        Добавить
                                    </Button>
                                </div>
                            </div>
                        </form>
                    )}
                />
            </Modal.Body>
        </Modal>
    );
};

export default MyModal;
