import html from "./modal.html";
import './modal.css';
import {Modal} from "flowbite";

export default function (container, data, callback) {

    function createComponent() {
        const component = document.createElement("div");
        component.innerHTML = html;
        return component;
    }

    function init(container) {
        const component = createComponent();
        container.appendChild(component);

        const modal = new Modal(document.getElementById("add-modal"));

        const form = document.getElementById('my-modal');
        form.onsubmit = (event) => handleSubmit(event, form, modal, data, callback);

        return {component, open: () => openModal(modal)};
    }

    return init(container);
}

const closeModal = (modal) => modal.hide();

const openModal = (modal) => modal.show();

const validateField = (value, regex, errorElementId) => {
    const errorElement = document.getElementById(errorElementId);
    if (!regex.test(value)) {
        errorElement.classList.remove("hidden");
        return false;
    } else {
        errorElement.classList.add("hidden");
        return true;
    }
}

const handleSubmit = (event, form, modal, data, callback) => {
    event.preventDefault();

    const formData = new FormData(form);

    if (!validateField(formData.get("inn"), /^\d{11}$/, 'innError')) {
        return;
    }

    if (!validateField(formData.get("kpp"), /^\d{9}$/, 'kppError')) {
        return;
    }

    const record = createRecord(formData);
    data.push(record);

    callback();
    form.reset();
    closeModal(modal);
}

const createRecord = (formData) => {
    const record = {};
    formData.forEach((value, key) => {
        record[key] = value;
    });
    record.id = crypto.randomUUID();
    return record;
}



