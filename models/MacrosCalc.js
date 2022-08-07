export default class MacrosCalc {

    statusCompleted = false;

    //MACROS
    protein;
    fat;
    ch;
    ketoI;

    //INPUTS
    energy;
    proteinGBW;
    energyRatio;
    protocol;

    //FATS
    minFatGBW = 1;
    avFatGBW = 1.3;

    //CARBS
    lowCarb = 100;
    keto = 50;

    //ENERGY VALUES
    fatE = 9;
    protE = 4;
    chE = 4;

    //OBJ
    client;
    kcalComp;
    macrosComp;

    optionals = {
        purpose: [{ 'weight gain': 1.1 }, { 'body recomposition': 1 }, { 'weight loss': .9 }],
        protein: [{ 1.5: 1.5 }, { 1.75: 1.75 }, { 2: 2 }, { 2.25: 2.25 }, { 2.5: 2.5 }],
        protocol: [{ 'high carb': 'high carb' }, { 'average': 'average' }, { 'low carb': 'low carb' }, { 'keto': 'keto' }]
    }

    constructor(energy, client) {
        this.energy = energy;
        this.client = client;
    }

    validate = (inputs) => {
        let flag = true;
        inputs.forEach(i => {
            if (i.value === "" || i.value === undefined || i.value === null) {
                alert(`${i.name} can't be empty!`);
                flag = false;
            }
        })
        return flag;
    }

    catchData = (e, callback) => {
        e.preventDefault();
        const inputs = document.querySelectorAll('.input');
        let validation = this.validate(inputs);
        if (!validation) return;
        inputs.forEach(i => {
            switch (i.name) {
                case 'protein':
                    this.proteinGBW = +i.value;
                    break;
                case 'protocol':
                    this.protocol = i.value;
                    break;
                case 'purpose':
                    this.energyRatio = +i.value;
            }
        })

        this.calcMacros(callback);
    }

    calcEnergyDif = (macroE1, macroE2, expectedMacroE) => {
        return (this.energy - (macroE1 + macroE2)) / expectedMacroE;
    }

    calcEnergy = () => {
        this.energy = this.energy * this.energyRatio;
    }

    calcProt = () => {
        this.protein = +(this.client.weight * this.proteinGBW).toFixed(2);
    }

    //CALC BY PROTOCOL
    calcLowCarb = () => {
        if (this.protocol !== 'low carb') return;
        this.ch = this.lowCarb;
        this.fat = +(this.calcEnergyDif(this.protein * this.protE, this.ch * this.chE, this.fatE)).toFixed(2);
    }

    calcKeto = () => {
        if (this.protocol !== 'keto') return;
        this.ch = this.keto;
        this.fat = +(this.calcEnergyDif(this.protein * this.protE, this.ch * this.chE, this.fatE)).toFixed(2);
    }

    calcHC = () => {
        if (this.protocol !== 'high carb') return;
        this.fat = +(this.client.weight * this.minFatGBW).toFixed(2);
        this.ch = +(this.calcEnergyDif(this.protein * this.protE, this.fat * this.fatE, this.chE)).toFixed(2);
    }

    calcAverage = () => {
        if (this.protocol !== 'average') return;
        this.fat = +(this.client.weight * this.avFatGBW).toFixed(2);
        this.ch = +(this.calcEnergyDif(this.protein * this.protE, this.fat * this.fatE, this.chE)).toFixed(2);
    }

    calcKetoIndex = () => {
        this.ketoI = +(((0, 9 * this.fat) + (0, 46 * this.protein)) / (this.ch + (0, 58 * this.protein) + (0, 1 * this.fat))).toFixed(2);
    }

    //SETTERS
    setMacrosComputation = () => {
        this.macrosComp = {
            protein: this.protein,
            fat: this.fat,
            ch: this.ch,
            "keto index": this.ketoI
        }
    }

    setKcalComputation = () => {
        this.kcalComp = {
            protein: this.protein * this.protE,
            ch: this.ch * this.chE,
            fat: this.fat * this.fatE,
            total: parseInt(this.protein * this.protE + this.ch * this.chE + this.fat * this.fatE)
        }
    }

    saveMacros = () => {
        localStorage.setItem('macros', JSON.stringify(this.macrosComp));
    }

    checkIfCompleted = () => {
        this.setMacrosComputation();
        this.setKcalComputation();

        if (Math.abs(this.energy - this.kcalComp.total) > 25) return false;
        return true;
    }

    calcMacros = (callback) => {
        this.calcEnergy();
        this.calcProt();

        this.calcLowCarb();
        this.calcKeto();
        this.calcHC();
        this.calcAverage();

        this.calcKetoIndex();

        if (!this.checkIfCompleted()) return;
        this.statusCompleted = true;
        this.saveMacros();
        callback();
    }

}