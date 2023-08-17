document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const taskCountElement = document.getElementById("taskCount");
    const remainingCountElement = document.getElementById("remainingCount");
    const completedCountElement = document.getElementById("completedCount");
  
    let taskCount = 0;
    let completedCount = 0;
  
    function updateTaskCount() {
      taskCountElement.textContent = `Total tasks: ${taskCount}`;
      remainingCountElement.textContent = `Remaining tasks: ${taskCount - completedCount}`;
      completedCountElement.textContent = `Completed tasks: ${completedCount}`;
    }
  
    addTaskBtn.addEventListener("click", function () {
      const taskText = taskInput.value.trim();
  
      if (taskText !== "") {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
          <span>${taskText}</span>
          <button class="deleteBtn">Remove</button>
          <button class="checkmark">&#10003;</button>
        `;
        taskList.appendChild(taskItem);
        taskInput.value = "";
        taskCount++;
        updateTaskCount();
  
        // Apply fade-in animation
        taskItem.classList.add("active");
      }
    });
  
    taskList.addEventListener("click", function (event) {
      if (event.target.classList.contains("deleteBtn")) {
        const parentLi = event.target.closest("li");
        if (parentLi) {
          parentLi.classList.add("removing"); // Apply fade-out animation
          if (parentLi.querySelector("span").classList.contains("completed")) {
            completedCount--;
          }
          setTimeout(() => {
            parentLi.remove();
            taskCount--;
            updateTaskCount();
          }, 400); // Wait for animation to complete (500ms)
        }
      } else if (event.target.classList.contains("checkmark")) {
        const parentLi = event.target.closest("li");
        if (parentLi) {
          const span = parentLi.querySelector("span");
          span.classList.toggle("completed");
          if (span.classList.contains("completed")) {
            event.target.textContent = "❌";
            completedCount++;
          } else {
            event.target.textContent = "✓";
            completedCount--;
          }
          updateTaskCount();
        }
      }
    });
  });
  