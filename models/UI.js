export default class UI {
    constructor() { }

    slideBg = () => {

    }

    printCont = () => {
        const container = document.createElement('div');
        container.classList = 'container col';
        const title = document.createElement('p');
        title.innerText = 'MACROS CALCULATOR';
        title.classList='title font';
        container.appendChild(title);
        document.body.appendChild(container);
    }

    createFormControl = (field) => {
        return (
            `<div class="form-control col">
                <label class="font" for="${field}">${field}</label>
                <input class="font" type="number" name="${field}" placeholder="${field}">
            </div>`
        )
    }

    printForm = (fields, callback) => {
        const container = document.querySelector('.container');
        const form = document.createElement('form');
        form.className = 'col';
        form.innerHTML = fields.map(field => this.createFormControl(field));
        const button = document.createElement('button');
        button.innerText = "SUBMIT";
        button.classList = 'font';
        button.onclick = (e) => callback(e);
        form.insertAdjacentElement('beforeEnd', button);
        container.appendChild(form);
    }

}