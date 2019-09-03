let fakeDataBase = [

    {id:1, task:"Gå och handla", ready: false},
    {id:2, task:"Gå och sporta", ready: false},
    {id:3, task:"Gå och håll någon i handen", ready: false}

];


let order = true;

function changeOrder(){
    order =!order;
}

renderFakeData();


function renderFakeData(){

    //skapa html från vår fakedatabase
    let htmlOutput = fakeDataBase.map(function(taskObject){

        return `
            <div>
                <h1>${taskObject.task}</h1>
                <button>Delete</button>
            
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
    let taskObject = {task:inputText, ready:false}
    //spara i fakedatabase
    fakeDataBase.push(taskObject);
    //rendera på nytt
    renderFakeData();
    }
    document.getElementById("taskId").value = "";
    document.getElementById("taskId").focus();

}