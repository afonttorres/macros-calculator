import ClientForm from './models/ClientForm.js';
import UI from './models/UI.js';

class App {
    ui;
    clientForm;
    constructor() {
        this.ui = new UI;
        this.clientForm = new ClientForm;
    }

    render(){
        this.ui.printCont();
        this.ui.printForm(this.clientForm.fields, this.clientForm.catchData);
    }
}

const app = new App;
app.render();