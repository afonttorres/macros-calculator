export default class IntakesCalc {
    equivalences;
    numIntakes;
    intakes;

    optionals = { intakes: [{ 1: 1 }, { 2: 2 }, { 3: 3 }, { 4: 4 }, { 5: 5 }, { 6: 6 }] }

    constructor(equivalences) {
        this.equivalences = equivalences;
        // alert(`You should do at least ${this.equivalences.protein} intakes`);
    };

    catchData(value) {
        this.numIntakes = value;
        this.calcRatios();
    }

    calcRatios() {
        this.intakes = {};
        for (let i = 1; i <= this.numIntakes; i++) {
            let intake = {};
            Object.keys(this.equivalences).forEach(e => intake[e] = this.equivalences[e] / this.numIntakes);
            this.intakes[i] = intake;
        }
        console.log(this.intakes)
    }

}