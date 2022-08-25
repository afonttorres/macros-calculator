import { elements } from "../utils/elements.js";
import { util } from "../utils/util.js";
import EnergyCalc from "./EnergyCalc.js";
import Client from "./Client.js";
import Equivalences from "./EquivalencesCalc.js";
import MacrosCalc from "./MacrosCalc.js";
import IntakesCalc from "./IntakesCalc.js";

export default class UI {

    client;
    energyCalc;
    macrosCalc;
    equivalencesCalc;
    intakesCalc;

    container = document.querySelector('.container');

    constructor() {
        this.client = new Client;
    }

    slideBg = () => {

    }

    getData = (item) => {
        if (util.checkLocalStorage(item)) {
            return util.checkLocalStorage(item);
        }
        return false;
    }

    renderClient = () => {
        localStorage.clear();
        elements.setContainerContent('macros calculator', 'col');
        elements.createForm(this.client.fields, this.client.optionals, (e) => this.client.catchData(e, this.renderBasicData));
    }

    renderBasicData = () => {
        let client = this.getData('client') ? this.getData('client') : this.client.client;

        let buttonCallbacks = {
            back_button: { action: () => { localStorage.removeItem('basic-data'); this.renderClient() }, content: 'back' },
            macros_button: { action: () => this.renderMacrosForm(), content: 'set macros', class: 'white-btn' }
        }

        this.energyCalc = new EnergyCalc(client);
        this.energyCalc.calcBasicData();

        elements.setContainerContent('your energy data', 'col');
        elements.createDisplayData(util.addUnitsToObj(this.getData('basic-data') ? this.getData('basic-data') : this.energyCalc.basicData, 'kcal'), buttonCallbacks);

    }

    renderMacrosForm = () => {
        let energy = this.getData('basic-data') ? this.getData('basic-data').energy : this.energyCalc.energy;
        let client = this.getData('client') ? this.getData('client') : this.energyCalc.client;

        elements.setContainerContent('plan your macros', 'col');

        this.macrosCalc = new MacrosCalc();
        this.macrosCalc.setData(energy, client);
        elements.createForm(Object.keys(this.macrosCalc.optionals), this.macrosCalc.optionals, (e) => this.macrosCalc.catchData(e, this.renderMacrosData))
    }

    renderMacrosData = () => {
        let macros = this.getData('macros') ? this.getData('macros') : this.macrosCalc.macrosComp;
        let { protein, CH, fat } = macros;

        let buttonCallbacks = {
            back_button: { action: () => { localStorage.removeItem('macros'); this.renderMacrosForm() }, content: 'back' },
            eq_button: { action: () => this.renderEquivalences(), content: 'equivalences', class: 'white-btn' }
        }

        elements.setContainerContent('your macros', 'col');
        elements.createDisplayData(util.addUnitsToObj(macros, 'g'), {});
        elements.createDisplayData(util.addUnitsToObj(macros ? new MacrosCalc().setKcalComputation(protein, CH, fat) : this.macrosCalc.kcalComp, 'kcal'), buttonCallbacks);
    }

    renderEquivalences = () => {
        let { protein, CH, fat } = this.getData('macros') ? this.getData('macros') : this.macrosCalc.macrosComp;

        this.equivalencesCalc = new Equivalences(protein, CH, fat);
        this.equivalencesCalc.calcEquivalences();

        let buttonCallbacks = {
            back_button: { action: () => { localStorage.removeItem('equivalences'); this.renderMacrosData() }, content: 'back' },
            intakes_button: { action: () => this.renderIntakesFrom(), content: 'set intakes', class: 'white-btn' }
        }

        elements.setContainerContent('your equivalences', 'col');
        elements.createDisplayData(util.addUnitsToObj(this.getData('equivalences') ? this.getData('equivalences') : this.equivalencesCalc.printableEq, ''), buttonCallbacks)

    }

    renderIntakesFrom = () => {
        let equivalences = this.getData('equivalences') ? this.getData('equivalences') : this.equivalencesCalc.equivalences;
        Object.keys(equivalences).forEach(e => equivalences[e] = +equivalences[e].split(' ')[0]);
        this.intakesCalc = new IntakesCalc(equivalences);
        elements.createForm(Object.keys(this.intakesCalc.optionals), this.intakesCalc.optionals, Object.keys(this.intakesCalc.optionals).length);
        elements.resetBtnRow();
        document.querySelector('.input').onchange = (e) => this.intakesCalc.catchData(e.target.value);
        if (!this.intakesCalc.intakes) return;
        elements.createDisplayData(this.intakesCalc.intakes, {});
    }

}
