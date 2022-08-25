export const elements = {
    setContainerContent(titleText, flex) {
        const container = document.querySelector('.container');
        container.classList = `container col`;
        this.resetContainer();
        container.setAttribute('style', `height :${window.innerHeight * .85}px`);
        document.querySelector('.bg').setAttribute('style', `height :${window.innerHeight * .85}px`);

        let content = `
            <p class="title font">${titleText}</p>
            <div class="items-cont ${flex}"></div>
            <div class="btn-row row"></div>
        `

        container.innerHTML = content;
    },
    createForm(fields, optionals, callback) {
        let html = `
            <form class="col">
                ${fields.map(field => this.createFormControl(field, optionals, fields.length)).join("")}
            </form>
        `
        let btn = ` <button class="submit-btn">submit</button>`;

        document.querySelector('.items-cont').innerHTML = html;
        document.querySelector('.btn-row').innerHTML = btn;
        document.querySelector('.submit-btn').onclick = (e) => callback(e);
    },
    createFormControl(field, optionals, n) {
        let element;
        !Object.keys(optionals).includes(field) ? element = this.createInput(field, n) : element = this.createSelect(field, optionals[field], n);
        return element;
    },
    createInput(field, n) {
        return (
            `<div style="height: calc(100% / ${n * 1.25})" class="form-control col">
                <label class="font" for="${Object.keys(field)}">${Object.keys(field)}</label>
                <input class="input font" type="number" name="${Object.keys(field)}" placeholder="${field[Object.keys(field)]}">
            </div>`
        )
    },
    createSelect(field, optionals, n) {
        return (

            `<div style="height: calc(100% / ${n * 1.25})" class="form-control col">
                <label class="font" for="${field}">${field}</label>
                <select class="input font" name="${field}" placeholder="${field}">
                ${optionals.map(r => {
                return `<option value="${r[Object.keys(r)]}">${Object.keys(r)}</option>`
            }).join("")
            }
                </select>
            </div>`
        )
    },
    createDisplayData(data, callbacks) {
        Object.keys(data).forEach(key => {
            const display = `
                <p class="data-output font"><span class="data-label">${key}:</span> ${data[key]}</p>
            `
            document.querySelector('.items-cont').innerHTML += display;
        })

        Object.keys(callbacks).forEach(b => {
            const button = document.createElement('button');
            button.innerText = callbacks[b].content.toUpperCase();
            button.classList = callbacks[b].class;
            button.onclick = callbacks[b].action;
            document.querySelector('.btn-row').insertAdjacentElement('beforeend', button);
        })
    },
    resetContainer() {
        document.querySelector('.container').innerHTML = '';
    },
    resetBtnRow(){
        document.querySelector('.btn-row').innerHTML = '';
    }

}