import UI from './models/UI.js';

class App {
    ui;

    constructor() {
        this.ui = new UI;
    }

    render() {
        localStorage.getItem('basic-data') ? this.ui.renderBasicData() : this.ui.renderClientForm();
    }
}

const app = new App;
app.render();