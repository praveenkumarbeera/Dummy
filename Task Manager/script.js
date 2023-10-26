document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
    const taskForm = document.getElementById('taskForm');
    taskForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addTask();
    });
});

function loadTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    fetch('get_task.php')
        .then(response => response.json())
        .then(tasks => {
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.textContent = task.task_name;

                const editButton = document.createElement('button');
	editButton.textContent = 'Edit';
	editButton.classList.add('edit-button');
	editButton.addEventListener('click', () => editTask(task.id, task.task_name));

	const deleteButton = document.createElement('button');
	deleteButton.textContent = 'Delete';
	deleteButton.classList.add('delete-button');
	deleteButton.addEventListener('click', () => deleteTask(task.id));


                li.appendChild(editButton);
                li.appendChild(deleteButton);

                taskList.appendChild(li);
            });
        })
}

function addTask() {
    const taskForm = document.getElementById('taskForm');
    const taskName = taskForm.querySelector('input[name="task_name"]').value;

    fetch('add_task.php', {
        method: 'POST',
        body: new URLSearchParams({ task_name: taskName }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
        .then(response => {
            if (response.status === 200) {
                taskForm.reset();
                loadTasks();
            } else {
                console.error('Error adding task: ' + response.statusText);
            }
        })
}

function editTask(id, currentTaskName) {
    const updatedTaskName = prompt('Edit Task:', currentTaskName);

    console.log('ID:', id);
    console.log('Updated Task Name:', updatedTaskName);

    if (updatedTaskName !== null) {
        fetch('edit_task.php', {
            method: 'POST',
            body: new URLSearchParams({ id: id, task_name: updatedTaskName }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(response => {
                if (response.status === 200) {
                    loadTasks();
                } else {
                    console.error('Error updating task: ' + response.statusText);
                }
            })
    }
}


function deleteTask(id) {
    if (confirm('Are you sure you want to delete this task?')) {
        fetch('delete_task.php', {
            method: 'POST',
            body: new URLSearchParams({ id: id }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(response => {
                if (response.status === 200) {
                    loadTasks();
                } else {
                    console.error('Error deleting task: ' + response.statusText);
                }
            })
    }
}
