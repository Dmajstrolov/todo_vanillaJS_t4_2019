let fakeDataBase;

if(localStorage.getItem("todo2019")) 
 {
    fakeDataBase = JSON.parse(localStorage.getItem("todo2019")); 
 }
else{
    fakeDataBase = [];
}


let order = true;
document.getElementById("orderButton").addEventListener("click",changeOrder);

function changeOrder(){
    order =!order;
   
    renderFakeData();
}

renderFakeData();


function renderFakeData(){

    //skapa html från vår fakedatabase
    let htmlOutput = fakeDataBase.map(function(taskObject, index){

        console.log(index);
        return `
            <div>
                <h1 id="${index}">${taskObject.task}  <sub>${taskObject.ready}</sub></h1>
                <button id = "${index}"     onclick ="deleteTask(${index})">Delete</button>
                <button onclick ="doneTask(${index})">DONE</button>
            </div>
        `;

    }); //end map

    if(order)
    {
        document.getElementById("taskList").innerHTML = htmlOutput.join("");
    }
    else
    {
        document.getElementById("taskList").innerHTML = htmlOutput.reverse().join(""); 
    }
}

//lyssna efter formsubmit

document.getElementById("taskForm").addEventListener("submit", addTask);

function addTask(event){

    //Hindra formuläret att skickas till servern
    event.preventDefault();
    //hämta input datan
    let inputText = document.getElementById("taskId").value;
    //skapa ett task objekt
    if(inputText.trim()!="")
    {
    let taskObject = {id:Date.now(), task:inputText, ready:false}
    //spara i fakedatabase
    fakeDataBase.push(taskObject);
    //rendera på nytt
    renderFakeData();

    //spara lokalt
    savelocal();
    }
    document.getElementById("taskId").value = "";
    document.getElementById("taskId").focus();

}


function savelocal(){

    localStorage.setItem("todo2019", JSON.stringify(fakeDataBase));
    
}


function _id(id){

    return document.getElementById(id);

}

function deleteTask(index){

    fakeDataBase.splice(index,1);
    renderFakeData();

}
function doneTask(index){

    let taskObject = fakeDataBase[index];
    taskObject.ready =! taskObject.ready;
    renderFakeData();
    savelocal();
}