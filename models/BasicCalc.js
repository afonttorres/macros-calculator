export default class BasicCalc {
    age;
    weight;
    height;
    gender;
    activity;

    BMI;
    TMB;
    energy;

    constructor(age, weight, height, gender, activity) {
        this.age = parseInt(age);
        this.weight = parseInt(weight);
        this.height = parseInt(height);
        this.gender = gender;
        this.activity = parseFloat(activity);
    }

    calcTMB = () => {
        if (this.gender === 'm') {
            this.TMB = parseInt(66.5 + (13.7 * this.weight) + (5 * this.height) - (6.8 * this.age));
            return;
        }
        this.TMB = parseInt(655 + (9.6 * this.weight) + (1.8 * this.height) - (4.7 * this.age));
    }

    calcEnergy = () => {
        this.calcTMB();
        if (!this.TMB) return;
        this.energy = parseInt(this.TMB * this.activity);
    }

    calcBMI = () => {
        this.BMI = +(this.weight / Math.pow((this.height / 100), 2)).toFixed(2);
    }

    calcBasicData = () => {
        this.calcTMB();
        this.calcEnergy();
        this.calcBMI();
        this.saveBasicData();
    }

    saveBasicData = () =>{
        if(!this.BMI || !this.TMB || !this.energy) return;
        const data = {
            BMI: this.BMI,
            TMB: this.TMB,
            energy: this.energy
        }

        localStorage.setItem('basic-data', JSON.stringify(data));
    }
}