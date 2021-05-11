'use strict'
const
username = document.getElementById('username'),
registerUser = document.getElementById('registerUser'),
login = document.getElementById('login'),
list = document.getElementById('list');

const users = [];

function get_cookie ( cookie_name )
{
  let results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
 
  if ( results )
    return ( decodeURI ( results[2] ) );
  else
    return null;
}

if(get_cookie('name')){
    username.textContent = get_cookie('name');
}

let keys = Object.keys(localStorage);
for(let key of keys) {
    const newObj = JSON.parse(localStorage.getItem(key));
    users.push(newObj);
};

let count = 0;

class User {
    constructor (){
        this.checkName();        
        this.chekLogin();
        this.password = prompt('Введите пароль');
        this.date = this.getDays();
    }

    checkName() {
        let name = prompt('Введите Имя и Фамилию через пробел');
        if(!name){
            alert('не ввели имя!');
            this.checkName();
        }else if(!name.match(/^[а-я]{1,20} [а-я]{1,20}$/ig)){            
            alert('Введите Имя и Фамилию на русском языке через пробел');
            this.checkName();
        } else {
            name = name.split(/\s+/).map(word => word[0].toUpperCase() + word.substring(1).toLowerCase()).join(' ');
            this.firstName = name.split(' ')[0];
            this.lastName = name.split(' ')[1];
        }
    };

    addUser(){
        const user = new User();
        users.push(user);
        localStorage.setItem(user.login, JSON.stringify(user));
        this.render();

    }
    getDays(){
        let monYer = [
            "января",
            "февраля",
            "марта",
            "апреля",
            "мая",
            "июня",
            "июля",
            "августа",
            "сентября",
            "октября",
            "ноября",
            "декабря",
          ];
    
        let date = new Date();
        let day = date.getDay();
        let dayNum = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();
        let hour = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
      
        function correctNum(num){
            if(num<10){
            num = "0" + num;
            }
            return num;
        }
      
      return `${dayNum} ${monYer[month]} ${year} года, ${correctNum(hour)}:${correctNum(minutes)}:${correctNum(seconds)}`
    }
    render(){
        while(list.firstChild){
            list.firstChild.remove();
        };

        users.forEach((item)=>{
            const btn = document.createElement('img');
            btn.src = './img/trash.png';
            btn.type = 'image';
            btn.classList = 'remove';
            const li = document.createElement('li');
            li.textContent = `Имя: ${item.firstName}, Фамилия: ${item.lastName}, зарегистрирован: ${item.date}`;
            li.appendChild(btn);
            list.appendChild(li);
            btn.addEventListener('click', ()=>{
                localStorage.removeItem(item.login);
                users.splice(users.indexOf(item), 1);            
                this.render();
            });

        })
    }
    chekLogin(){
        const arr = [];
        let log = prompt('Введите login');
        users.forEach((item)=>{
            arr.push(item.login);
            console.log(arr);
        });
        if(arr.indexOf(log)!== -1){
            alert('Такой логин уже зарегистрирован. Введите другой логин');
            this.chekLogin();
        } else {
            this.login = log;
        }
    }
    login(){
        let tryLogin = prompt('Введите логин'),
        tryPassword = prompt('Введите пароль'),
        correctName = false;

        users.forEach((item)=>{
            if(item.login === tryLogin){
                correctName = true;
                if(item.password === tryPassword){
                    username.textContent = item.firstName;
                    document.cookie = `name=${encodeURI(item.firstName)}; expires=Tue, 7 May 2024 00:00:00 GMT`;
                }else{
                    alert('Неверный пароль');
                }
            }
        });
        if(correctName == false){
            alert('нет такого пользователя');
        }
    }    
}

User.prototype.render();

registerUser.addEventListener('click', ()=>{
    User.prototype.addUser();
});

login.addEventListener('click', ()=>{
    User.prototype.login();
});