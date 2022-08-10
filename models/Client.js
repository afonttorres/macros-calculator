export default class Client {
    age;
    weight;
    height;
    gender;
    activity;

    client;

    fields = [{ 'age': '18' }, { 'weight': '55 (in kg)' }, { 'height': '160 (in cm)' }, 'gender', 'activity'];

    optionals = {
        activity: [{ 'sedentary': 1.2 }, { 'light': 1.375 }, { 'moderate': 1.55 }, { 'very active': 1.9 }],
        gender: [{ 'female': 'f' }, { 'male': 'm' }]
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
        this.setClient();
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

    setClient = () => {
        this.client = {
            age: +this.age,
            weight: +this.weight,
            height: +this.height,
            gender: this.gender,
            activity: +this.activity
        }
    }

    saveData = () => {
        localStorage.setItem('client', JSON.stringify(this.client))
    }

    resetInputs = () => {
        const inputs = document.querySelectorAll('input');
        inputs.forEach(i => i.value = "");
    }
}