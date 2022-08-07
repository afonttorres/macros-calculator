export default class Equivalences {

    protein;
    ch;
    fat;

    protEq = 25;
    chEq = 50;
    fatEq = 10;

    equivalences;
    printableEq;


    constructor(protein, ch, fat) {
        this.protein = protein;
        this.ch = ch;
        this.fat = fat;
    }

    calcEquivalences = () => {
        this.equivalences = {
            "protein equivalences": +parseInt(this.protein / this.protEq),
            "CH equivalences": +parseInt(this.ch / this.chEq),
            "fat equivalences": +parseInt(this.fat / this.fatEq)
        }
        this.setEquivalencesForPrint();
    }

    setEquivalencesForPrint = () => {
        this.printableEq = { ...this.equivalences };
        Object.keys(this.equivalences).forEach(eq => {
            switch (eq) {
                case 'protein equivalences':
                    this.printableEq[eq] = `${this.printableEq[eq]} (${this.protEq}g)`
                    break;
                case 'CH equivalences':
                    this.printableEq[eq] = `${this.printableEq[eq]} (${this.chEq}g)`
                    break;
                case 'fat equivalences':
                    this.printableEq[eq] = `${this.printableEq[eq]} (${this.fatEq}g)`
                    break;
            }
        })
    }



}