/**
 * Created by Lemon on 2015/12/24.
 */

var datatable = null;
var db = openDatabase("MyData","","My Database", 1024*100);
function init(){
    datatable = document.getElementById("datatable");
    showAllData();
}

function removeAllData(){
    for(var i=datatable.childNodes.length-1;i=0;i--){
        datatable.removeChild(datatable.childNodes[i]);
    }
    var tr = document.createElement("tr");
    var th1 = document.createElement("th");
    var th2 = document.createElement("th");
    var th3 = document.createElement("th");
    th1.innerHTML = "NAME";
    th2.innerHTML = "MESSAGE";
    th3.innerHTML = "TIME";
    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    datatable.appendChild(tr);
}

function showData(row){
    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    td1.innerHTML = row.name;
    td2.innerHTML = row.message;
    var t = new Date();
    t.setTime(row.time);
    td3.innerHTML = t.toLocaleDateString()+" "+ t.toLocaleTimeString();
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    datatable.appendChild(tr);
}

function showAllData(){
    db.transaction(function(tx){
        tx.executeSql("CREATE TABLE IF NOT EXISTS MsgData(name TEXT, message TEXT, time INTEGER)",[],function(tx,rs){
            alert("create sceess");
        },
            function(tx,error){
                alert(error.source+"::"+error.message);
            }
        );
        tx.executeSql("SELECT * FROM MsgData",[],function(tx,rs){
            removeAllData();
            for(var i=0; i<rs.rows.length;i++){
                showData(rs.rows.item(i));
            }
        })
    })
}

function addData(name, message, time){
    db.transaction(function(tx){
        tx.executeSql("INSERT INTO MsgData VALUES(?,?,?)",[name,message,time],function(tx,rs){
            alert("Sucess");
        },
            function(tx,error){
                alert(error.source+"::"+error.message);
            }
        );
    })
}

function saveData(){
    var name = document.getElementById("name").value;
    var msg = document.getElementById("msg").value;
    var time = new Date().getTime();
    addData(name, msg, time);
    alert(name+":"+msg+":"+time);
    showAllData();
}