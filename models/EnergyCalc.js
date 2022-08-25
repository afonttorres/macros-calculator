import { util } from "../utils/util.js";

export default class EnergyCalc {
    client;

    BMI;
    TMB;
    energy;

    basicData;

    constructor(client) {
        this.client = client;
    }

    calcTMB = () => {
        if (this.client.gender === 'm') {
            this.TMB = util.toInt(66.5 + (13.7 * this.client.weight) + (5 * this.client.height) - (6.8 * this.client.age));
            return;
        }
        this.TMB = util.toInt(655 + (9.6 * this.client.weight) + (1.8 * this.client.height) - (4.7 * this.client.age));
    }

    calcEnergy = () => {
        this.calcTMB();
        if (!this.TMB) return;
        this.energy = util.toInt(this.TMB * util.toDouble(this.client.activity));
    }

    calcBMI = () => {
        this.BMI = util.toDouble(this.client.weight / Math.pow((this.client.height / 100), 2));
    }

    calcBasicData = () => {
        this.calcTMB();
        this.calcEnergy();
        this.calcBMI();
        this.setBasicData();
        this.saveBasicData();
    }

    setBasicData = () => {
        if (!this.BMI || !this.TMB || !this.energy) return;
        this.basicData = {
            BMI: this.BMI,
            TMB: this.TMB,
            energy: this.energy
        }
    }

    saveBasicData = () => {
        localStorage.setItem('basic-data', JSON.stringify(this.basicData));
    }
}