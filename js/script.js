let dataInput = document.querySelector('input');
let btnAdd = document.querySelector('.btn-add');
let mainTaskes = document.querySelector('.taskes');

//Crate empty Array fill From input

let arrayofTaskes = [];





// Dont Remove Taskes From Local Storge 
if(localStorage.getItem('tasks')){
    arrayofTaskes = JSON.parse(localStorage.getItem('tasks'));
}

getDataLocal();
// focus on input
window.onload = function(){
    dataInput.focus();
}

//// Add Taske 

btnAdd.onclick = function(){
  
    if(dataInput.value !== ""){
        addTaskesToArray(dataInput.value) // Add Taskes to Array 

        dataInput.value = ""; // Empty input After send Data

    }


};


// Deleted Button Div 
mainTaskes.addEventListener('click' , function(e){
    if(e.target.classList.contains('del')){

        deleteTaskFromLocalStorge(e.target.parentElement.getAttribute('data-id'));

        e.target.parentElement.remove();
    }


    if(e.target.classList.contains('task')){

        finshedTaskes(e.target.getAttribute('data-id'));

        e.target.classList.toggle('done');
    }
})

function addTaskesToArray(taskText){
    // infromtion Data

    const task = {
        id: Date.now(),
        title: taskText,
        finshed: false,
    };

    // push Takl To Array 
    arrayofTaskes.push(task);
    addElemntsToBody(arrayofTaskes);
    // Add Tasks To Local Sroge;

    borserLocal(arrayofTaskes);

}

function addElemntsToBody(arrayofTaskes){
    // start div Empty 
    mainTaskes.innerHTML = "";
    // loop on Array 

    arrayofTaskes.forEach((task) =>{

        // craete main div 
        let div = document.createElement('div');
        div.className = "task";
        // chek if taske done 
        if(task.finshed){
            div.className = "task done"
        }

        div.setAttribute('data-id' , task.id);
        div.appendChild(document.createTextNode(task.title));
        // create Delete btn 
        let span = document.createElement('span');
        span.className = 'del';
        span.appendChild(document.createTextNode('x'));
        // append Btn to div 
        div.appendChild(span)
        // Show Custem Div to Body 
        mainTaskes.appendChild(div)
    })

}

function borserLocal(arrayofTaskes){
    window.localStorage.setItem('tasks' , JSON.stringify(arrayofTaskes))
}

function getDataLocal(){
    let data = window.localStorage.getItem('tasks');
    if(data){
        let tasks = JSON.parse(data);
        addElemntsToBody(tasks)    
    }
}

function deleteTaskFromLocalStorge(taskId){
    arrayofTaskes = arrayofTaskes.filter((task) => task.id != taskId);

    borserLocal(arrayofTaskes)
}

function finshedTaskes(taskId){
    for(let i = 0; i < arrayofTaskes.length; i++){
        if(arrayofTaskes[i].id == taskId){
            arrayofTaskes[i].finshed == false ? arrayofTaskes[i].finshed = true: arrayofTaskes[i].finshed = false 
        }
    }
    borserLocal(arrayofTaskes)

}