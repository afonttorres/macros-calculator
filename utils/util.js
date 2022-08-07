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
    }
}