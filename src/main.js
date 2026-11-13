// Тут пиши JavaScript свого домашнього завдання.
// Додаткові модулі створюй поруч у src/ і імпортуй їх сюди:
//   import { something } from './something.js';

console.log('Шаблон готовий. Можна писати код 🚀');

import {PREP_TIME} from './js/menu.js';


const form = document.querySelector(".form")
const orderLog = document.querySelector(".order-log")

function makeOrder(delay, shouldResolve) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldResolve === true) {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });
}

function addOrderRow(name) {
    const li = document.createElement('li');

    li.classList.add('row-pending');
    li.textContent = `⏳ ${name} Капучино · у роботі…`;
    orderLog.append(li);

    return li;
}

form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(form);

    const drink = formData.get('drink');
    const state = formData.get('state');

    const delay = PREP_TIME[drink];
    const shouldResolve = state === "fulfilled";

    const row = addOrderRow(drink);

    makeOrder(delay, state === "fulfilled").then(delay => {
        row.classList.remove('row-pending');
        row.classList.add('row-ok');
        row.textContent = `✅ ${drink} · готове · ${delay} ms`
    }).catch(delay => {
        row.classList.remove('row-pending');
        row.classList.add('row-err');
        row.textContent = `❌ ${drink} · скасоване · ${delay} ms`
    }).finally(() => {
        const time = new Date().toLocaleTimeString('uk-UA');

        row.textContent += ` · ${time}`;
    });
});