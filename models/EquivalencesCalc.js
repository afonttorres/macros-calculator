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
            "protein": Math.round(this.protein / this.protEq),
            "CH": Math.round(this.ch / this.chEq),
            "fat": Math.round(this.fat / this.fatEq)
        }
        this.setEquivalencesForPrint();
        this.saveEquivalences();
    }

    setEquivalencesForPrint = () => {
        this.printableEq = { ...this.equivalences };
        Object.keys(this.equivalences).forEach(eq => {
            switch (eq) {
                case 'protein':
                    this.printableEq[eq] = `${this.printableEq[eq]} (${this.protEq}g)`
                    break;
                case 'CH':
                    this.printableEq[eq] = `${this.printableEq[eq]} (${this.chEq}g)`
                    break;
                case 'fat':
                    this.printableEq[eq] = `${this.printableEq[eq]} (${this.fatEq}g)`
                    break;
            }
        })
    }

    saveEquivalences = () => {
        localStorage.setItem('equivalences', JSON.stringify(this.printableEq));
    }



}