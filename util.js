export const util = {
    addUnitsToObj(obj, unit) {
        let dataUnits = { ...obj};
        Object.keys(dataUnits).forEach(key => {
            if(key === 'BMI') return;
            dataUnits = { ...dataUnits, [key]: `${obj[key]} ${unit}` }
        })

        return dataUnits;
    }
}