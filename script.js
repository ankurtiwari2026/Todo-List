const inputValue = document.getElementById("inputValue");

const getTodoListFromLocal = () => {
    return JSON.parse(localStorage.getItem("userTodoList"));
};

const addTodoListLocalStorage = (localTodoLists) => {
    return localStorage.setItem("userTodoList", JSON.stringify(localTodoLists));
}

let localTodoLists = getTodoListFromLocal() || [] ;

const addTodoDynamicElement = (currElem) => {

    const divElement = document.createElement("div");

    divElement.classList.add("main_todo_div");

    divElement.innerHTML = `<li>${currElem}</li><button class="deleteBtn">Delete</button>`;

    mainTodoElem.append(divElement) ;
}

const addTodoList = (e) => {
    e.preventDefault() ;

    const todoListValue = inputValue.value.trim().toUpperCase();;

    inputValue.value = "";

    if(todoListValue == ""){
        alert("Please don't add empty item");
    }

    else if(!localTodoLists.includes(todoListValue)){
        localTodoLists.push(todoListValue);
        localTodoLists = [...new Set(localTodoLists)];
        console.log(localTodoLists);
        
        localStorage.setItem ("userTodolist", JSON.stringify(localTodoLists));
        addTodoDynamicElement(todoListValue) ;
        addTodoListLocalStorage(localTodoLists) ;
    }

    else{
        alert('You have already added this item'); 
    }
};

const showTodoList = () => {
    localTodoLists.forEach((currElem) => {
        addTodoDynamicElement(currElem);
    });
};

showTodoList();

const removeTodoElem = (e) => {
    const todoToRemove  = e.target;
    let todoListContent = todoToRemove.previousElementSibling.innerText ;
    let parentElem = todoToRemove.parentElement ;

    localTodoLists = localTodoLists.filter((currTodo) => {
        return currTodo != todoListContent.toUpperCase() ;
    })

    addTodoListLocalStorage(localTodoLists) ;
    parentElem.remove();

}

mainTodoElem.addEventListener('click', (e)=>{
    e.preventDefault();

    if(e.target.classList.contains("deleteBtn")){
        removeTodoElem(e);
    }
});

document.querySelector(".btn").addEventListener("click", (e)=>{
    addTodoList(e);
});