let form = document.getElementById("form");
let heading = document.getElementById("heading");
let description = document.getElementById("description");
let msg = document.getElementById("msg");
let todos = document.getElementById("todos");
let addBtn = document.getElementById("addBtn");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

function formValidation() {
  if (heading.value === "") {
    console.log("failed!");
    msg.innerHTML = "heading can't be empty";
  } else {
    console.log("success!");
    acceptData();
  }
}

let data = [];
function acceptData() {
  data.push({
    text: heading.value,
    body: description.value,
  });

  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
  createTodos();
}

function createTodos() {
  todos.innerHTML = "";
  data.map((todo, index) => {
    return (todos.innerHTML += `
        <div id=${index}>
            <h2>${todo.text}</h2>
            <p>${todo.body}</p>
            <span class="options">
                <span onClick="editTodo(this)" class="material-symbols-outlined">
                    edit_square
                </span>
                <span onClick="deleteTodo(this)" class="material-symbols-outlined">
                    delete
                </span>
            </span>
        </div>
    `);
  });

  resetForm();
}

function editTodo(e) {
  let selectedTodo = e.parentElement.parentElement;

  heading.value = selectedTodo.children[0].innerHTML;
  description.value = selectedTodo.children[1].innerHTML;

  deleteTodo(e);
}

function deleteTodo(e) {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
}

function resetForm() {
  heading.value = "";
  description.value = "";
}

(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  console.log(data);
  createTodos();
})