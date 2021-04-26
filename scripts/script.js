'use strict'
const
todoControl = document.querySelector('.todo-control'),
headerInput = document.querySelector('.header-input'),
todoList = document.querySelector('#todo'),
todoCompleted = document.querySelector('#completed');


const todoData = [];

let keys = Object.keys(localStorage);
for(let key of keys) {
    const newObj = JSON.parse(localStorage.getItem(key));
    todoData.push(newObj);
};


const render = function(){
    todoList.textContent = '';
    todoCompleted.textContent = '';
    todoData.forEach(function(item){        

        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
                        '<div class=todo-buttons>' +
                        '<button class="todo-remove"></button>' +
                        '<button class="todo-complete"></button>' +                        
                        '</div>'
        if (item.completed){
            todoCompleted.append(li);
        }
        else{
            todoList.append(li);
        }


    
        const btnComplete = li.querySelector('.todo-complete');

        btnComplete.addEventListener('click', function(){
            item.completed = !item.completed;
            localStorage.setItem(item.value, JSON.stringify(item));
            render();
        });

        const btnRemove = li.querySelector('.todo-remove');
        
        btnRemove.addEventListener('click', function(){
            localStorage.removeItem(item.value);
            todoData.splice(todoData.indexOf(item), 1);            
            render();
        }); 
       
    });

};

todoControl.addEventListener('submit', function(event){
    event.preventDefault();

    const newTodo = {
        value: headerInput.value,
        completed: false,
    }

    let values =[];
    for(let i = 0; i<todoData.length; i++){
        values[i] = todoData[i].value;
    }
    if(values.indexOf(headerInput.value)!=-1){
        alert('Такое дело уже в списке!');
    }
    else if(headerInput.value!=''){
        todoData.push(newTodo);
        localStorage.setItem(newTodo.value, JSON.stringify(newTodo));
    }
    
    headerInput.value = '';
    render();
  
});

render();