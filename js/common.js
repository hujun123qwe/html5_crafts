/**
 * Created by Lemon on 2015/12/23.
 */

function saveStorage(id){
    var target = document.getElementById(id);
    var val = target.value;
    //保存数据 key value
    sessionStorage.setItem("message",val);
}

function loadStorage(id) {
    var target = document.getElementById(id);
    var val = sessionStorage.getItem('message');
    target.innerHTML = val;
}

function saveLocalStorage(id){
    var target = document.getElementById(id);
    var val = target.value;
    //保存数据 key value
    localStorage.setItem("message",val);
}

function loadLocalStorage(id) {
    var target = document.getElementById(id);
    var val = localStorage.getItem('message');
    target.innerHTML = val;
}