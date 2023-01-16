// Находим элементы на странице
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

let tasks = [];

// Добавим задачи
form.addEventListener('submit', addTask);

// Удалим задачи
tasksList.addEventListener('click', deleteTask);

// Отмечаем задачу завершенной
tasksList.addEventListener('click', doneTask);

// Функции добавления в форму
function addTask(event) {
    // Отменяем отправку формы
    event.preventDefault();
    // Достаем текст из поля ввода
    const taskText = taskInput.value;

    // Описываем задачу в виде объекта
    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    };

    // Добавляем задачу в массив с задачами

    tasks.push(newTask);

    // Формируем CSS класс
    const cssClass = newTask.done ? 'task-title task-title--done' : 'task-title';

    // Формируем разметку для новой задачи
    const taskHTML = `<li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
<span class="${cssClass}">${newTask.text}</span>
<div class="task-item__buttons">
    <button type="button" data-action="done" class="btn-action">
        <img src="./img/tick.svg" alt="Done" width="18" height="18">
    </button>
    <button type="button" data-action="delete" class="btn-action">
        <img src="./img/cross.svg" alt="Done" width="18" height="18">
    </button>
</div>
</li>`;
    // Добавляем задачу на страницу
    tasksList.insertAdjacentHTML('beforeend', taskHTML);
    // Очещаем поле ввода и возвращаем его на фокус
    taskInput.value = "";
    taskInput.focus();
    // Проверим, если в списке задач больше 1-го элемента, скрываем блок
    if (tasksList.children.length > 1) {
        emptyList.classList.add('none');
    }
};

// Функция удаления из формы
function deleteTask(event) {
    // Проверяем если клик был не по кнопке "удалить задачу"
    if (event.target.dataset.action !== 'delete') {
        return
    }
    // Проверяем клик был по кнопке "удалить задачу"
    const parentNode = event.target.closest('.list-group-item');
    // Определяем ID задачи
    const id = Number(parentNode.id);
    // Находим индекс задачи в массиве
    // const index = tasks.findIndex((task) => task.id === id);
    // Удаляем задачу из массива с задачами
    // tasks.splice(index, 1);
    // Удаляем задачу из массива через фильтррацию
    tasks = tasks.filter((task) => task.id !== id);
    parentNode.remove();
    // Проверим, если в списке задач 1-ин элемент, показываем блок "Список дел пуст"
    if (tasksList.children.length === 1) {
        emptyList.classList.remove('none');
    }
};

// Функция подтверждения формы
function doneTask(event) {
    // Проверяем что клик был не по кнопке "Выполнить задачу"
    if (event.target.dataset.action !== 'done') return;
    // Проверяем что клик был по кнопке "Выполнить задачу"
    const parentNode = event.target.closest('.list-group-item');
    // Определяем ID задачи
    const id = Number(parentNode.id);
    const task = tasks.find((task) => task.id === id);
    task.done = !task.done
    const taskTitle = parentNode.querySelector('.task-title');
    taskTitle.classList.toggle('task-title--done');
};