import BasicCalc from "./BasicCalc.js";
import ClientForm from "./ClientForm.js";

export default class UI {

    clientForm;
    basicCalc;

    container = document.querySelector('.container');
    constructor() {
        this.clientForm = new ClientForm;
    }

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

    createInput = (field, n) => {
        return (
            `<div style="height: calc(100% / ${n * 1.5})" class="form-control col">
                <label class="font" for="${field}">${field}</label>
                <input class="input font" type="number" name="${field}" placeholder="${field}">
            </div>`
        )
    }

    createSelect = (field, optionals, n) => {
        return (

            `<div style="height: calc(100% / ${n * 1.5})" class="form-control col">
                <label class="font" for="${field}">${field}</label>
                <select class="input font" name="${field}" placeholder="${field}">
                ${optionals.map(r => {
                return `<option value="${r}">${r}</option>`
            }).join("")
            }
                </select>
            </div>`
        )
    }

    createFormControl = (field, optionals, n) => {

        if (!Object.keys(optionals).includes(field)) {
            return this.createInput(field, n);
        }

        if (Object.keys(optionals).includes(field)) {
            return this.createSelect(field, optionals[field], n);
        }

    }

    printForm = (fields, optionals, callback) => {
        const form = document.createElement('form');
        form.className = 'col';
        form.innerHTML = fields.map(field => this.createFormControl(field, optionals, fields.length)).join("");
        const button = document.createElement('button');
        button.innerText = "SUBMIT";
        button.classList = 'font';
        button.onclick = (e) => callback(e);
        form.insertAdjacentElement('beforeEnd', button);
        document.querySelector('.items-cont').append(form);
    }

    renderClientForm = () => {
        this.printCont('macros calculator', 'row');
        this.printForm(this.clientForm.fields, this.clientForm.optionals, (e) => this.clientForm.catchData(e, this.renderBasicData));
    }

    renderBasicData = () => {
        this.basicCalc = new BasicCalc(this.clientForm.age, this.clientForm.weight, this.clientForm.height, this.clientForm.gender, this.clientForm.activity);
        this.basicCalc.calcBasicData();
        
        const basicData = {
            TMB: this.basicCalc.TMB,
            energy: this.basicCalc.energy,
            BMI: this.basicCalc.BMI
        };

        console.log(basicData);
    }

}