import { util } from "../util.js";
import BasicCalc from "./BasicCalc.js";
import ClientForm from "./ClientForm.js";
import MacrosCalc from "./MacrosCalc.js";

export default class UI {

    clientForm;
    basicCalc;
    macrosCalc;

    container = document.querySelector('.container');
    constructor() {
        this.clientForm = new ClientForm;
    }

    slideBg = () => {

    }

    printCont = (titleText, flex) => {

        this.container.classList = `container col`;
        let html = `
            <p class="title font">${titleText}</p>
            <div class="items-cont ${flex}"></div>
            <div class="btn-row row"></div>
        `
        this.container.innerHTML = html;

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
                return `<option value="${r[Object.keys(r)]}">${Object.keys(r)}</option>`
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

        let html = `
            <form class="col">
                ${fields.map(field => this.createFormControl(field, optionals, fields.length)).join("")}
            </form>
        `
        let btn = ` <button class="submit-btn">submit</button>`;

        document.querySelector('.items-cont').innerHTML = html;
        document.querySelector('.btn-row').innerHTML = btn;
        document.querySelector('.submit-btn').onclick = (e) => callback(e);
    }

    renderClientForm = () => {

        localStorage.clear();
        this.container.innerHTML = '';
        this.printCont('macros calculator', 'col');
        this.printForm(this.clientForm.fields, this.clientForm.optionals, (e) => this.clientForm.catchData(e, this.renderBasicData));
    }

    printData(data, callbacks) {

        Object.keys(data).forEach(key => {
            const display = `
                <p class="data-output font"><span class="data-label">${key}:</span> ${data[key]}</p>
            `
            document.querySelector('.items-cont').innerHTML += display;
        })

        Object.keys(callbacks).forEach(b => {
            const button = document.createElement('button');
            button.innerText = callbacks[b].content.toUpperCase();
            button.onclick = callbacks[b].action;
            document.querySelector('.btn-row').insertAdjacentElement('beforeend', button);
        })

    }

    checkLocalStorage = () => {
        return JSON.parse(localStorage.getItem('basic-data'));
    }

    createBasicDataDisplay = (data, callbacks) => {

        this.container.innerHTML = '';
        this.printCont('your data', 'col');
        this.printData(util.addUnitsToObj(data, 'kcal'), callbacks);
    }

    renderBasicData = () => {

        let buttonCallbacks = {
            back_button: { action: () => this.renderClientForm(), content: 'back' },
            macros_button: { action: () => this.renderMacrosForm(), content: 'set macros' }
        }

        if (this.checkLocalStorage()) {
            this.createBasicDataDisplay(this.checkLocalStorage(), buttonCallbacks);
            return;
        }

        this.basicCalc = new BasicCalc(this.clientForm.age, this.clientForm.weight, this.clientForm.height, this.clientForm.gender, this.clientForm.activity);
        this.basicCalc.calcBasicData();

        const basicData = {
            TMB: this.basicCalc.TMB,
            energy: this.basicCalc.energy,
            BMI: this.basicCalc.BMI
        };

        this.createBasicDataDisplay(basicData, buttonCallbacks);

    }

    renderMacrosForm = () => {

        this.container.innerHTML = '';
        this.printCont('plan your macros', 'col');
        let energy = this.basicCalc ? this.basicCalc.energy : this.checkLocalStorage().energy;
        let client;
        this.clientForm.age ?
            client = {
                age: this.clientForm.age,
                weight: this.clientForm.weight,
                height: this.clientForm.height
            }
            :
            client = JSON.parse(localStorage.getItem('client'));

        this.macrosCalc = new MacrosCalc(energy, client);
        this.printForm(Object.keys(this.macrosCalc.optionals), this.macrosCalc.optionals, (e) => this.macrosCalc.catchData(e, this.renderMacrosData))
    }

    renderMacrosData = () => {

        let buttonCallbacks = {
            back_button: { action: () => this.renderMacrosForm(), content: 'back' },
            eq_button: { action: () => this.renderEquivalences(), content: 'equivalences' }
        }

        this.container.innerHTML = '';
        this.printCont('your macros', 'col');

        this.printData(util.addUnitsToObj(this.macrosCalc.macrosComp, 'g'), {});
        this.printData(util.addUnitsToObj(this.macrosCalc.kcalComp, 'kcal'), buttonCallbacks);
    }

    renderEquivalences = () => {
        console.log('not implemented yet')
    }

}
