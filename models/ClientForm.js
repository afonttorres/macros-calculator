export default class ClientForm {
    age;
    weight;
    height;
    fields = ['age', 'weight', 'height'];

    constructor() { }

    catchData = (e) => {
        e.preventDefault();
        const inputs = document.querySelectorAll('input');
        let validation = this.validate(inputs);
        if (!validation) return;
        inputs.forEach(i => {
            switch (i.name) {
                case 'age':
                    this.age = i.value;
                    break;
                case 'weight':
                    this.weight = i.value;
                    break;
                case 'height':
                    this.height = i.value;
            }
        })
        this.saveData();
        this.resetInputs();
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

    saveData = () => {
        let client = {
            age: this.age,
            weight: this.weight,
            height: this.height
        }
        
        localStorage.setItem('client', JSON.stringify(client))
    }

    resetInputs = () => {
        const inputs = document.querySelectorAll('input');
        inputs.forEach(i => i.value = "");
    }
}