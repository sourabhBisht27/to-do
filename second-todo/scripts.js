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

function getDate() {
  const date = new Date();
  const timestamps = date.toLocaleString();
  return timestamps;
}

function createTodos() {
  todos.innerHTML = "";
  data.forEach((todo, index) => {
    todos.innerHTML += `
        <div id=${index}>
            <div>${getDate()}</div>
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
    `;
  });

  resetForm();
}

function editTodo(e) {
  let selectedTodo = e.parentElement.parentElement;
  // console.log("select => ", selectedTodo);

  heading.value = selectedTodo.children[1].innerHTML;
  description.value = selectedTodo.children[2].innerHTML;

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