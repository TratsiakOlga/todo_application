/* Эмитация карзины.
class Product{
  constructor(id, name){
    this.id = id;
    this.name = name;
  }
}

let storageCart = JSON.parse(window.localStorage.getItem('cart'));
let cart = storageCart ? storageCart : [];

console.log(storageCart);

const bread = new Product(1, 'Хлеб');
const tea = new Product(2, 'Черный чай');

//добавляем в карзину
cart.push(bread);
cart.push(tea);

let jsonCart = JSON.stringify(cart); 

window.localStorage.setItem('cart', jsonCart);

//console.log(cart);
// Можно и так добавлять: cart[0] = bread; cart[1] = tea;*/

//Todo-list
import $ from 'jquery';
//нужен уникальный идентификатор
import { v4 as uuidv4 } from 'uuid';
//console.log(uuidv4()); - проверяем создался ли идентификатор
import Task from './task.js';
import '../scss/index.scss';

let tasks = JSON.parse(window.localStorage.getItem('tasks'));

if(!tasks) {
  tasks = [];
}

/*Навешиваем обработчик событий:
$(document).ready(function(){
  tasks.forEach(function(item){
    addTaskToList(item);
  }); - здесь не нужен, так как в индексе есть defer, который выполняет то же самое. и если его не будем писать, то оптимизируем наш код (программа будет работать быстрее)*/ 
  
  

  function renderList(){
    const list = $(".tasks");
    list.html(null);
    
    tasks.forEach(function(item){
      addTaskToList(item);
    });
  }

  function addTaskToList(task) { 
    const list = $(".tasks");
    const li = $(`<li class="${task.status}">${task.name}</li>`)

    const doneButton = $(`<button>Выполнить</button>`);

    doneButton.click(() => {
      tasks.forEach((item, index, tasks) => {
        if(item.id == task.id) {
          tasks[index].status = 'done';
        }
      });

      window.localStorage.setItem('tasks', JSON.stringify(tasks));
      renderList();
    });

    const removeButton = $(`<button>Удалить</button>`);
    removeButton.click (() => {
      if(confirm('Вы действительно хотите удалить задачу?')) {
        tasks.forEach((item, index, tasks) => {
          if(item.id == task.id) {
            tasks.splice(index, 1);
          }
        });

        window.localStorage.setItem('tasks', JSON.stringify(tasks));
        renderList();
      }
    });

    li.append(doneButton);
    li.append(removeButton);

    list.append(li);
  }

  $("#add-task").click(function(){
    let text = $("#task").val();

    $("#task").val(null);

    if(!text){
      alert('Введите название задачи');
      return;
    }

    const task = new Task(uuidv4(), text, 'in-progress');
  
    tasks.push(task);
    addTaskToList(task);

    window.localStorage.setItem('tasks', JSON.stringify(tasks));
  });

  renderList();