export default class UI {
    container = document.querySelector('.container');
    constructor() { }

    slideBg = () => {

    }

    printCont = (titleText, flex) => {
        this.container.classList = `container col`;
        const title = document.createElement('p');
        title.innerText = titleText;
        title.classList = 'title font';
        const itemsCont = document.createElement('div');
        itemsCont.classList = `items-cont ${flex}`;
        this.container.append(title, itemsCont);
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
        const form = document.createElement('form');
        form.className = 'col';
        form.innerHTML = fields.map(field => this.createFormControl(field));
        const button = document.createElement('button');
        button.innerText = "SUBMIT";
        button.classList = 'font';
        button.onclick = (e) => callback(e);
        form.insertAdjacentElement('beforeEnd', button);
        document.querySelector('.items-cont').append(form);
    }

}