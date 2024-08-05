let todoInput = document.getElementById("todoInput");
let todoSubmit = document.getElementById("addTaskBtn");
todoSubmit.addEventListener("click", function(e){
    if(todoInput.value.trim() ==""){
        window.alert("Please enter a task")
    }
    else 
    var task={
        title: todoInput.value,
        apiKey: "66af33ae60a208ee1fdc6ae9",

    }
    todoInput.value="";
    addTodo(task);
    getAllTodos();
})
getAllTodos();
async function addTodo(task){
    let loading = true
    if (loading) {
        addTaskBtn.innerHTML="Loading"
    }
    let data = await fetch(`https://todos.routemisr.com/api/v1/todos`,{
        method:"POST",
        body: JSON.stringify(task),
        headers:{
            "Content-Type": "application/json"
        }
    })
    loading = false;
    addTaskBtn.innerHTML="Add Task"
    let resp= await data.json();
    getAllTodos();

}

async function getAllTodos(){
    let data = await fetch(`https://todos.routemisr.com/api/v1/todos/66af33ae60a208ee1fdc6ae9`);
    let resp = await data.json();
    displayData(resp.todos);
}
function displayData(data){
    let cartona =``;
    for (let i=0; i<data.length;i++){
        cartona+=`
        <div class="content ">
        <div class="cntclr list d-flex align-items-center justify-content-between pt-2 mb-3 w-75 m-auto ${data[i].completed?"bg-done":""}" id="taskParent">
          <p class="ms-3 mt-2 ${data[i].completed  ?"text-decoration-line-through": ""}  ">${data[i].title}</p>
          <div class="icons">
            <i onclick="deleteTodo('${data[i]._id}')" class="fa-solid fa-trash fa-lg me-3 "></i>
            <i   onclick="markTodo('${data[i]._id}')" class="fa-solid fa-check-circle fa-lg me-3 ${data[i].completed?"d-none":""}"></i>
          </div>
      
          
        </div>
        `
    }
    document.getElementById("taskParent").innerHTML = cartona;

}
async function deleteTodo(x){
    let data = await fetch(`https://todos.routemisr.com/api/v1/todos`,{
method:"DELETE",
body: JSON.stringify({todoId:x}),
headers: {
    "Content-Type": "application/json",
}
    })
    let result = await data.json();
    getAllTodos();
}
async function markTodo(x){
    let data = await fetch(`https://todos.routemisr.com/api/v1/todos`,{
        method:"PUT",
        body:JSON.stringify({todoId:x}),
        headers: {
            "Content-Type": "application/json",
        }
    })
    let result = await data.json();
    console.log(result);
    getAllTodos();

}