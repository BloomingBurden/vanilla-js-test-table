'use strict';

const table = document.querySelector('.table tbody');
const button = document.querySelector('.add');
const clear = document.querySelector('.clear');
const local = localStorage;
let tableTitle;


// Создать или выбрать таблицу.
const changeTable = function () {
    const button = document.querySelector('.bg-start__wrap > button');
    const clearTable = document.querySelector('.table-list__button');
    const bg = document.querySelector('.bg-start__wrap');
    const input = document.querySelector('.bg-start__wrap input');
    const tableList = document.querySelector('.table-list');

    for (let elem of Object.keys(local)) {
        tableList.insertAdjacentHTML('beforeend', `<li class="table-list__item"><a href="#">${elem}</a></li>`);
    }

    const selectTable = function(e) {
        e.preventDefault();
        const target = e.target.closest('a');

        if (!target || !local.hasOwnProperty(target.innerHTML.trim())) return;

        getReadyTable(target.innerHTML.trim());
        cb(e, target.innerHTML.trim());
    }

    const cb = function (e, nameTable) {
        tableTitle = bg.firstElementChild.value;
        tableTitle = tableTitle ? tableTitle[0].toUpperCase() + tableTitle.slice(1).toLowerCase() : nameTable;
        bg.parentElement.classList.add('bg-start-hidden');
        
        if (!tableTitle) return;

        if (local.hasOwnProperty(tableTitle)) {
            getReadyTable(tableTitle);
        } else {
            local.setItem(tableTitle, '');
        }
        
        table.previousElementSibling.innerHTML = tableTitle;
        setTimeout(() => bg.parentElement.remove(), 2000);
        table.parentElement.classList.add('table-show');
    };

    clearTable.addEventListener('click', () => {
        local.clear()
        tableList.innerHTML = '';
    });

    tableList.addEventListener('click', selectTable);
    button.addEventListener('click', (e) => {
        e.preventDefault();
        cb(e);
    });
    input.addEventListener('keyup', (e) => {
        e.preventDefault();
        if (e.keyCode !== 13) return;
        cb(e);
    });
};

// Если таблица уже была, создать ее. Строка 26.
const getReadyTable = function(title) {
    table.innerHTML = local.getItem(title);
}

//Код для таблицы. Строка 128
const appTable = function () {
    // Создать input столько, сколько человеку нужно. Строка 103
    const getCountTitle = function (n, th) {
        let result = '';
        for (let i = 0; i < n; i++) {
            if (!th.length) {
                result += '<input type="text" placeholder="Пример: возраст, имя и тд">';
            } else {
                result += `<input type="text" placeholder="${th[i].firstChild.data.trim()}">`;
            }
        }
        return result;
    };

    // Получения количества инпутов и проверка корректности данных.
    const checkCorrectData = function () {
        let count = prompt('Сколько полей вам нужно?(Меньше 15)', 1);

        while (isNaN(+count) || count > 15 || count === null || +count === 0) {
            let conf = confirm('Ошибка данных. Если у вас есть заголовки, введите число не больше, чем заголовков. Хотите ввести еше раз?');

            if (!conf) {
                return false;
            }
            count = +prompt('Сколько полей с заголовками вам нужно?(Меньше 15)', 1);
        }
        return count;
    };

    // Создать tr, th and td 
    const createData = function (first, data) {
        const tr = document.createElement('tr');

        for (let char of data) {
            const column = document.createElement(first ? 'th' : 'td');
            column.innerHTML = char.value;
            tr.append(column);
        }
        
        table.append(tr);
        local.setItem(tableTitle, table.innerHTML);
    };

    let count;
    // Основная функция, которая создает элементы, следит за событиями.
    const addItem = function () {
        const div = document.createElement('div');
        const submit = document.createElement('button');
        const form = document.createElement('form');
        let firstTime = !table.getElementsByTagName('tr').length;
        const th = table.getElementsByTagName('th');
        count = count || !!th.length ? (count || th.length) : checkCorrectData();

        if (count === false) return;

        div.className = 'popup';
        div.prepend(form);

        form.method = 'GET';
        form.innerHTML = getCountTitle(count, th);
        form.append(submit);


        submit.className = 'popup__btn button';
        submit.type = 'submit';
        submit.innerHTML = 'Создать';

        document.body.prepend(div);

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            div.remove();
            createData(firstTime, form.getElementsByTagName('input'));
        });
    };

    button.addEventListener('click', addItem);
    clear.addEventListener('click', () => {
        local.setItem(tableTitle, '');
        table.innerHTML = '';
        count = null;
    });
};

changeTable();
appTable();