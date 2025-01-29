document.addEventListener('DOMContentLoaded', () => {
    const daySelect = document.getElementById('daySelect');
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const clearTasksBtn = document.getElementById('clearTasksBtn');
    const searchInput = document.getElementById('searchInput');

   
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '{}');
        return tasks;
    }

    
    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

   
    function renderTasks(day) {
        taskList.innerHTML = '';
        const tasks = loadTasks();
        const dayTasks = tasks[day] || [];

        dayTasks.forEach((task, index) => {
            const taskItem = document.createElement('div');
            taskItem.classList.add('task-item');
            taskItem.innerHTML = `
                <span>${task}</span>
                <span class="task-delete" onclick="deleteTask('${day}', ${index})">🗑️</span>
            `;
            taskList.appendChild(taskItem);
        });
    }

   
    addTaskBtn.addEventListener('click', () => {
        const day = daySelect.value;
        const task = taskInput.value.trim();

        if (day && task) {
            const tasks = loadTasks();
            if (!tasks[day]) tasks[day] = [];
            tasks[day].push(task);
            saveTasks(tasks);
            taskInput.value = '';
            renderTasks(day);
        } else {
            alert('Please select a day and enter a task');
        }
    });

  
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const day = daySelect.value;
        
        if (day) {
            const tasks = loadTasks();
            const dayTasks = tasks[day] || [];
            
            const filteredTasks = dayTasks.filter(task => 
                task.toLowerCase().includes(searchTerm)
            );

            taskList.innerHTML = '';
            filteredTasks.forEach((task, index) => {
                const taskItem = document.createElement('div');
                taskItem.classList.add('task-item');
                taskItem.innerHTML = `
                    <span>${task}</span>
                    <span class="task-delete" onclick="deleteTask('${day}', ${index})">🗑️</span>
                `;
                taskList.appendChild(taskItem);
            });
        }
    });

    
    daySelect.addEventListener('change', (e) => {
        renderTasks(e.target.value);
    });

    
    clearTasksBtn.addEventListener('click', () => {
        const day = daySelect.value;
        if (day) {
            const tasks = loadTasks();
            tasks[day] = [];
            saveTasks(tasks);
            renderTasks(day);
        }
    });
});


function deleteTask(day, index) {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '{}');
    tasks[day].splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks(day);
}