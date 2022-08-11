let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

submit.addEventListener("click", function (e) {
    e.preventDefault();
    let value = input.value;
    if (value) {
        const task = {
            id: Date.now(),
            title: input.value,
            completed: false,
        };
        localStorage.setItem(task.id, JSON.stringify(task));
        showTasks();
    }
}, false);


// order tasks by title alphabetically and show them
function showTasks() {
    tasksDiv.innerHTML = "";
    let tasks = Object.values(localStorage).sort(function (a, b) {
        return JSON.parse(a).title.localeCompare(JSON.parse(b).title);
    }).map(function (task) {
        return JSON.parse(task);
    }).map(function (task) {
        input.value = "";
        if (!task.completed) {
            return `<div class="task" data-id="${task.id}">
                    ${task.title}<span>delete</span>
                </div>`;
        }
        return `<div class="task done" data-id="${task.id}">
                    ${task.title}<span>delete</span>
                </div>`;
    }).join("");
    tasksDiv.innerHTML = tasks;
}

tasksDiv.addEventListener("click", function (e) {
    if (e.target.tagName === "SPAN") {
        let task = e.target.parentElement;
        let taskId = task.getAttribute("data-id");
        localStorage.removeItem(taskId);
        task.remove();
    }
    else if (e.target.tagName === "DIV") {
        let task = e.target;
        let taskId = task.getAttribute("data-id");
        let taskObj = JSON.parse(localStorage.getItem(taskId));
        taskObj.completed = !taskObj.completed;
        localStorage.setItem(taskId, JSON.stringify(taskObj));
        task.classList.toggle("done");
    }

}
, false);

window.addEventListener("load", showTasks, false);
