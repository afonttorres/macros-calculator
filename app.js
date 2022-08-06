import UI from './models/UI.js';

class App {
    ui;

    constructor() {
        this.ui = new UI;
    }

    render(){
        this.ui.renderClientForm();
    }
}

const app = new App;
app.render();