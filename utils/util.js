export const util = {
    addUnitsToObj(obj, unit) {
        let dataUnits = { ...obj };
        let dataNoUnit = ['BMI', 'keto index']
        Object.keys(dataUnits).forEach(key => {
            if (dataNoUnit.includes(key)) return;
            dataUnits = { ...dataUnits, [key]: `${obj[key]} ${unit}` }
        })

        return dataUnits;
    },
    checkLocalStorage(item) {
        return JSON.parse(localStorage.getItem(item));
    },
    toDouble(num) {
        return +parseFloat(num).toFixed(2);
    },
    toInt(num) {
        return +parseInt(num);
    },
    round(num) {
        let decimals = (Math.round(num * 10) / 10).toString().split('.')[1];
        if (!decimals || decimals[decimals.length - 1] < 3 || decimals[decimals.length - 1] > 7) {
            return Math.round(num);
        }

        return +`${Math.floor(num)}.5`
    }
}