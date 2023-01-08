'use strict';

const table = document.querySelector('.table tbody');
const button = document.querySelector('.add');
const clear = document.querySelector('.clear');


// Закрыть bg фон в начале
const closeBg = function () {
  const button = document.querySelector('.bg-start > button');
  const bg = document.querySelector('.bg-start');
  const input = document.querySelector('.bg-start input');

  const cb = function(e) {
    bg.classList.add('bg-start-hidden');
    table.previousElementSibling.innerHTML = bg.firstElementChild.value;
    setTimeout(() => bg.remove(), 2000);
    table.parentElement.classList.add('table-show');
  };

  button.addEventListener('click', (e) => cb(e));
  input.addEventListener('keyup', (e) => {
    if (e.keyCode !== 13) return;
    cb(e);
  });
};

//Код для таблицы
const appTable = function () {
  // Создать input столько, сколько человеку нужно.
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
  };

  let count; 
  // Основная функция, которая создает элементы, следит за событиями.
  const addItem = function () {
    const div = document.createElement('div');
    const submit = document.createElement('button');
    const form = document.createElement('form');
    let firstTime = !table.getElementsByTagName('tr').length;
    count = count ? count : checkCorrectData();
    const th = table.getElementsByTagName('th');

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
    table.innerHTML = '';
    count = null;
  });
};
closeBg();
appTable();