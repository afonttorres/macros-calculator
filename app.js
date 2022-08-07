import UI from './models/UI.js';
import { util } from './utils/util.js';

class App {
    ui;

    constructor() {
        this.ui = new UI;
    }

    reset() {
        localStorage.clear();
        this.render();
    }

    render() {

        const resetBtn = document.querySelector('.reset-btn');
        resetBtn.onclick = () => this.reset();

        const views = {
            'equivalences': this.ui.renderEquivalences,
            'macros': this.ui.renderMacrosData,
            'basic-data': this.ui.renderBasicData,
        }

        if(Object.keys(views).filter(v => util.checkLocalStorage(v))[0]){
            views[Object.keys(views).filter(v => util.checkLocalStorage(v))[0]]();
            return;
        }
        
        this.ui.renderClientForm();
        


    }
}

const app = new App;
app.render();