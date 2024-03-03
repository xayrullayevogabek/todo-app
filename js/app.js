const input = document.querySelector("input");
const addBtn = document.querySelector(".input-wrapper button");
const ul = document.querySelector("ul");
const tasks = JSON.parse(localStorage.getItem("tasks"))
  ? JSON.parse(localStorage.getItem("tasks"))
  : [];

function addTodo() {
  if (input.value.length > 0) {
    tasks.push({ task: input.value, checked: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
    input.value = "";
  }
}

function markToDoDone(index) {
  tasks[index].checked = !tasks[index].checked;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function deleteToDo(e) {
  const parentElement = parseInt(
    e.target.parentElement.getAttribute("data-id")
  );
  tasks.splice(parentElement, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function renderTasks() {
  ul.innerHTML = "";
  console.log(tasks);
  tasks.forEach((item, indx) => {
    const li = document.createElement("li");
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.checked = item.checked;

    if (item.checked) {
      li.style.textDecoration = "line-through";
      li.style.color = "lightgray";
    }
    const span = document.createElement("span");
    span.innerText = item.task;
    const button = document.createElement("button");
    const icon = document.createElement("i");
    icon.className = "bx bxs-trash-alt";
    button.appendChild(icon);
    button.setAttribute("data-id", indx);

    li.appendChild(checkBox);
    li.appendChild(span);
    li.appendChild(button);
    ul.appendChild(li);

    button.addEventListener("click", deleteToDo);
    checkBox.addEventListener("change", () => markToDoDone(indx));
  });
}

renderTasks();
addBtn.addEventListener("click", addTodo);
