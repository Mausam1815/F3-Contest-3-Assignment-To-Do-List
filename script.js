let todayCounter = 0;
let futureCounter = 0;
let completedCounter = 0;

// Event listener to execute when DOM content is loaded
document.addEventListener("DOMContentLoaded", function() {
    // Function call to display tasks
    displayTasks();
});


// Function to add a new item to the todo list
function addItem() {
    // Get input values
    const itemName = document.getElementById("itemName").value;
    const itemDate = document.getElementById("itemDate").value;
    const priority = document.getElementById("priority").value;

    // Check if all fields are filled
    if (itemName && itemDate && priority) {
        // Create a new item object
        const newItem = {
            name: itemName,
            date: itemDate,
            priority: priority,
            completed: false
        };

        // Retrieve todoList from localStorage or initialize an empty array
        let todoList = JSON.parse(localStorage.getItem("todoList")) || [];

        // Add the new item to todoList
        todoList.push(newItem);

        // Update todoList in localStorage
        localStorage.setItem("todoList", JSON.stringify(todoList));

        // Call displayTasks with the updated todoList and the newly added item
        displayTasks(todoList, newItem);
    } else {
        // Alert if any field is empty
        alert("Please fill out all fields.");
    }
}

// Function to display tasks
function displayTasks(todoList, newItem) {
    // Get today's date
    const today = new Date().toISOString().split('T')[0];

    // Get containers for today's, future, and completed tasks
    const todayTasksContainer = document.getElementById("todayTasks");
    const futureTasksContainer = document.getElementById("futureTasks");
    const completedTasksContainer = document.getElementById("completedTasks");

    // Reset counters for each section
    todayCounter = 0;
    futureCounter = 0;
    completedCounter = 0;

    // Check if a new item is being added
    if (newItem) {
        // Extract task date and format it as dd/mm/yyyy
        const taskDate = new Date(newItem.date).toISOString().split('T')[0];
        const formattedDate = `${new Date(taskDate).getDate()}/${new Date(taskDate).getMonth() + 1}/${new Date(taskDate).getFullYear()}`;
        // Determine the CSS class for the task item based on its completion status
        const taskClass = newItem.completed ? "completed" : "";
        // Determine the CSS class for an overdue task (if not completed and due date is before today)
        const overdueClass = !newItem.completed && taskDate < today ? "overdue" : "";

        // Create a new <div> element to represent the task item
        const taskItem = document.createElement("div");
        // Add the base CSS class for all task items
        taskItem.classList.add("todo-item");
        // Add the specific CSS class based on the task completion status
        if (taskClass) taskItem.classList.add(taskClass);
        // Add the specific CSS class based on whether the task is overdue
        if (overdueClass) taskItem.classList.add(overdueClass);
        
        // Check if the new item is completed
        if (newItem.completed) {
            // Increment completed counter
            completedCounter++;
            // Create HTML for completed task item
            taskItem.innerHTML = `
                <span>${completedCounter}. ${newItem.name}</span>
                <div class="task-details">
                    <div id="task-date">${formattedDate}</div> 
                    <div id="task-priority">${newItem.priority}</div>
                </div>
                <div class="task-actions">
                    <button onclick="deleteItem(${todoList.length - 1})" id="task-btn"><i class="fa-regular fa-trash-can"></i></button>
                    <button onclick="toggleCompleted(${todoList.length - 1})" id="task-btn">${newItem.completed ? "<i class='fas fa-undo'></i>" : "<i class='fa-regular fa-circle-check'></i>"}</button>
                </div>
            `;

            // Append the task item to the completed tasks container
            completedTasksContainer.appendChild(taskItem);
        } else {
            // Check if the task date is today
            if (taskDate === today) {
                // Increment today counter
                todayCounter++;
                // Create HTML for today's task item
                taskItem.innerHTML = `
                    <span>${todayCounter}. ${newItem.name}</span>
                    <div class="task-details">
                        <div id="task-date">${formattedDate}</div>
                        <div id="task-priority">${newItem.priority}</div>
                    </div>
                    <div class="task-actions">
                        <button onclick="deleteItem(${todoList.length - 1})" id="task-btn"><i class="fa-regular fa-trash-can"></i></button>
                        <button onclick="toggleCompleted(${todoList.length - 1})" id="task-btn">${newItem.completed ? "<i class='fas fa-undo'></i>" : "<i class='fa-regular fa-circle-check'></i>"}</button>
                    </div>
                `;

                // Append the task item to today's tasks container
                todayTasksContainer.appendChild(taskItem);
            } else if (taskDate > today || (taskDate < today && !newItem.completed)) {
                // Increment future counter
                futureCounter++;
                // Create HTML for future task item
                taskItem.innerHTML = `
                    <span>${futureCounter}. ${newItem.name}</span>
                    <div class="task-details">
                        <div id="task-date">${formattedDate}</div>
                        <div id="task-priority">${newItem.priority}</div>
                    </div>
                    <div class="task-actions">
                        <button onclick="deleteItem(${todoList.length - 1})" id="task-btn"><i class="fa-regular fa-trash-can"></i></button>
                        <button onclick="toggleCompleted(${todoList.length - 1})" id="task-btn">${newItem.completed ? "<i class='fas fa-undo'></i>" : "<i class='fa-regular fa-circle-check'></i>"}</button>
                    </div>
                `;

                // Append the task item to future tasks container
                futureTasksContainer.appendChild(taskItem);
            }
        }
    } else {
        // Clear existing tasks from all containers
        todayTasksContainer.innerHTML = "";
        futureTasksContainer.innerHTML = "";
        completedTasksContainer.innerHTML = "";

        // Retrieve todoList from localStorage or initialize an empty array
        const todoList = JSON.parse(localStorage.getItem("todoList")) || [];

        if (todoList) { // Check if todoList is defined
            // Iterate over each task in todoList
            todoList.forEach(function(task, index) {
                // Extract task date and format it as dd/mm/yyyy
                const taskDate = new Date(task.date).toISOString().split('T')[0];
                const formattedDate = `${new Date(taskDate).getDate()}/${new Date(taskDate).getMonth() + 1}/${new Date(taskDate).getFullYear()}`;
                // Determine the CSS class for the task item based on its completion status
                const taskClass = task.completed ? "completed" : "";
                // Determine the CSS class for an overdue task (if not completed and due date is before today)
                const overdueClass = !task.completed && taskDate < today ? "overdue" : "";

                // Create a new <div> element to represent the task item
                const taskItem = document.createElement("div");
                // Add the base CSS class for all task items
                taskItem.classList.add("todo-item");
                // Add the specific CSS class based on the task completion status
                if (taskClass) taskItem.classList.add(taskClass);
                // Add the specific CSS class based on whether the task is overdue
                if (overdueClass) taskItem.classList.add(overdueClass);
                
                // Check if the task is completed
                if (task.completed) {
                    // Increment completed counter
                    completedCounter++;
                    // Create HTML for completed task item
                    taskItem.innerHTML = `
                        <span>${completedCounter}. ${task.name}</span>
                        <div class="task-details">
                            <div id="task-date">${formattedDate}</div>
                            <div id="task-priority">${task.priority}</div>
                        </div>
                        <div class="task-actions">
                            <button onclick="deleteItem(${index})" id="task-btn"><i class="fa-regular fa-trash-can"></i></button>
                            <button onclick="toggleCompleted(${index})" id="task-btn"><i class='fas fa-undo'></i></button>
                        </div>
                    `;

                    // Append the task item to the completed tasks container
                    completedTasksContainer.appendChild(taskItem);
                } else {
                    // Check if the task date is today
                    if (taskDate === today) {
                        // Increment today counter
                        todayCounter++;
                        // Create HTML for today's task item
                        taskItem.innerHTML = `
                            <span>${todayCounter}. ${task.name}</span>
                            <div class="task-details">
                                <div id="task-date">${formattedDate}</div>
                                <div id="task-priority">${task.priority}</div>
                            </div>
                            <div class="task-actions">
                                <button onclick="deleteItem(${index})" id="task-btn"><i class="fa-regular fa-trash-can"></i></button>
                                <button onclick="toggleCompleted(${index})" id="task-btn"><i class='fa-regular fa-circle-check'></i></button>
                            </div>
                        `;

                        // Append the task item to today's tasks container
                        todayTasksContainer.appendChild(taskItem);
                    } else if (taskDate > today || (taskDate < today && !task.completed)) {
                        // Increment future counter
                        futureCounter++;
                        // Create HTML for future task item
                        taskItem.innerHTML = `
                            <span>${futureCounter}. ${task.name}</span>
                            <div class="task-details">
                                <div id="task-date">${formattedDate}</div>
                                <div id="task-priority">${task.priority}</div>
                            </div>
                            <div class="task-actions">
                                <button onclick="deleteItem(${index})" id="task-btn"><i class="fa-regular fa-trash-can"></i></button>
                                <button onclick="toggleCompleted(${index})" id="task-btn"><i class='fa-regular fa-circle-check'></i></button>
                            </div>
                        `;

                        // Append the task item to future tasks container
                        futureTasksContainer.appendChild(taskItem);
                    }
                }
            });
        }
    }
}

// Function to delete a task item
function deleteItem(index) {
    // Retrieve todoList from localStorage or initialize an empty array
    let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
    // Remove the task at the given index from todoList
    todoList.splice(index, 1);
    // Update todoList in localStorage
    localStorage.setItem("todoList", JSON.stringify(todoList));
    // Refresh the display of tasks
    displayTasks(todoList);
}

// Function to toggle the completion status of a task item
function toggleCompleted(index) {
    // Retrieve todoList from localStorage or initialize an empty array
    let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
    // Toggle the completion status of the task at the given index in todoList
    todoList[index].completed = !todoList[index].completed;
    // Update todoList in localStorage
    localStorage.setItem("todoList", JSON.stringify(todoList));
    // Refresh the display of tasks
    displayTasks(todoList);
}
