'use strict'
const
todoControl = document.querySelector('.todo-control'),
headerInput = document.querySelector('.header-input'),
todoList = document.querySelector('#todo'),
todoCompleted = document.querySelector('#completed');


const todoData = [];

let keys = Object.keys(localStorage);
for(let key of keys) {
    const newObj = {
      value: key,
    }
      if(localStorage.getItem(key)=='true'){
        newObj.completed = true;
      }
      else{
          newObj.completed = false;
      }  

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
            localStorage.setItem(item.value, item.completed);
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
    if(headerInput.value!=''){
    todoData.push(newTodo);
    localStorage.setItem(newTodo.value, newTodo.completed);
    }
    headerInput.value = '';
    render();
  
});

render();