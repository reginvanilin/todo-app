// anton been here
const createTodoModal = document.getElementById("myModal");
const openModalButton = document.getElementById("createButton");
const closeButton = document.getElementsByClassName("close")[0];
const createModalButton = document.getElementById("modalButton");
const modalInput = document.getElementById("modal-input");
const todoContainer = document.getElementById("todoContainer");
const themeSwitcher = document.getElementById("slider");

const savedTodos = localStorage.getItem("todos");
let todos = savedTodos ? JSON.parse(savedTodos) : [];

const updateTodos = (newTodos) => {
    if (newTodos) todos = newTodos;
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos(todos);
};

const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    updateTodos(newTodos);
};

const doTodo = (id) => {
    const newTodos = todos.map((todo) => {
        if (todo.id === id) todo.completed = true;

        return todo;
    });
    updateTodos(newTodos);
};

const createTodo = () => {
    const inputValue = modalInput.value;

    todos.push({
        id: Math.random() * 10,
        userId: 1,
        title: inputValue,
        completed: false,
    });

    updateTodos();
    closeTodoModal();
};

function renderTodos(todos) {
    todoContainer.innerHTML = "";

    todos.forEach((todo) => {
        const todoElement = `
        <div class="todo" id="todo${todo.id}">
            <h2 class="todo-title">${todo.title}</h2>
            <div class="todo-buttons-delete" id="deleteButton${todo.id}"></div>
            <div class="todo-buttons">
                <button
                    class="todo-buttons-done custom-button"
                    id="doneButton${todo.id}"
                >
                    DONE
                </button>              	
                
            </div>
        </div>
        `;

        todoContainer.insertAdjacentHTML("beforeend", todoElement);

        document
            .getElementById(`deleteButton${todo.id}`)
            .addEventListener("click", () => deleteTodo(todo.id));

        if (todo.completed) {
            const todoElement = document.getElementById("todo" + todo.id);
            todoElement.classList.add("todo-completed");
        } else {
            document
                .getElementById(`doneButton${todo.id}`)
                .addEventListener("click", () => doTodo(todo.id));
        }
    });
}

renderTodos(todos);

const closeTodoModal = () => {
    createTodoModal.style.display = "none";
    modalInput.value = "";
};

function setTheme(themeName) {
    localStorage.setItem("theme", themeName);
    document.documentElement.className = themeName;
    if (themeName === "theme-light") themeSwitcher.checked = true;
}

function toggleTheme() {
    if (localStorage.getItem("theme") === "theme-dark") {
        setTheme("theme-light");
    } else {
        setTheme("theme-dark");
    }
}

(function () {
    if (localStorage.getItem("theme") === "theme-dark") {
        setTheme("theme-dark");
    } else {
        setTheme("theme-light");
    }
})();

openModalButton.onclick = () => {
    createTodoModal.style.display = "block";
};

closeButton.onclick = () => closeTodoModal();

createTodoModal.onclick = (event) => {
    if (event.target == createTodoModal) closeTodoModal();
};

createModalButton.onclick = () => {
    if (modalInput.value === "") alert("Введите что-нибудь");
    else createTodo();
};

modalInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") createTodo();
});

themeSwitcher.addEventListener("change", toggleTheme);
