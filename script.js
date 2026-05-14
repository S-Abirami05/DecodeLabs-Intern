const API = "http://127.0.0.1:5000/tasks";

async function fetchTasks() {

    const response = await fetch(API);

    const tasks = await response.json();

    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach(task => {

        const li = document.createElement("li");

        li.innerHTML = `
            <span>${task.task}</span>

            <div class="task-buttons">

                <button
                    class="edit-btn"
                    onclick="editTask('${task._id}', '${task.task}')"
                >
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteTask('${task._id}')"
                >
                    Delete
                </button>

            </div>
        `;

        taskList.appendChild(li);
    });
}

async function addTask() {

    const input = document.getElementById("taskInput");

    if(input.value.trim() === ""){
        return;
    }

    await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            task: input.value
        })
    });

    input.value = "";

    fetchTasks();
}

async function deleteTask(id) {

    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    fetchTasks();
}

async function editTask(id, oldTask) {

    const newTask = prompt("Edit Task", oldTask);

    if(newTask === null || newTask.trim() === ""){
        return;
    }

    await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            task: newTask
        })
    });

    fetchTasks();
}

fetchTasks();