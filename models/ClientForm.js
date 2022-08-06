export default class ClientForm {
    age;
    weight;
    height;
    gender;
    activity;
    fields = ['age', 'weight', 'height', 'gender', 'activity'];
    optionals = {
        activity: [1.2, 1.375, 1.55, 1.9],
        gender: ['female', 'male']
    }

    constructor() { }

    catchData = (e, callback) => {
        e.preventDefault();
        const inputs = document.querySelectorAll('.input');
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
                    break;
                case 'gender':
                    this.gender = i.value;
                    break;
                case 'activity':
                    this.activity = i.value;
            }
        })
        this.saveData();
        this.resetInputs();
        callback();
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
            height: this.height,
            gender: this.gender,
            activity: this.activity
        }

        localStorage.setItem('client', JSON.stringify(client))
    }

    resetInputs = () => {
        const inputs = document.querySelectorAll('input');
        inputs.forEach(i => i.value = "");
    }
}