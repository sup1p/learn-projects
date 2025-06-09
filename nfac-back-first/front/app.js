document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'http://localhost:8000'; // Replace with your backend URL

    // UI Elements
    const authContainer = document.getElementById('auth-container');
    const todoContainer = document.getElementById('todo-container');
    const loginFormContainer = document.getElementById('login-form-container');
    const registerFormContainer = document.getElementById('register-form-container');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');

    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const todoForm = document.getElementById('todo-form');
    const todoList = document.getElementById('todo-list');
    const logoutBtn = document.getElementById('logout-btn');
    const usernameDisplay = document.getElementById('username-display');
    
    // --- UI Navigation ---
    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginFormContainer.style.display = 'none';
        registerFormContainer.style.display = 'block';
    });

    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        registerFormContainer.style.display = 'none';
        loginFormContainer.style.display = 'block';
    });

    // --- State ---
    let token = localStorage.getItem('token');
    let username = localStorage.getItem('username');

    const showAuth = () => {
        authContainer.style.display = 'block';
        todoContainer.style.display = 'none';
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        token = null;
        username = null;
    };

    const showTodos = () => {
        authContainer.style.display = 'none';
        todoContainer.style.display = 'block';
        usernameDisplay.textContent = username;
        fetchTodos();
    };

    // --- API Calls ---
    const apiRequest = async (endpoint, method, body = null, isFormData = false) => {
        const headers = {};
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const config = {
            method,
            headers,
        };

        if (body) {
            if (isFormData) {
                config.body = new URLSearchParams(body);
            } else {
                headers['Content-Type'] = 'application/json';
                config.body = JSON.stringify(body);
            }
        }

        try {
            const response = await fetch(`${API_URL}${endpoint}`, config);
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'An error occurred' }));
                alert(errorData.detail || errorData.message);
                throw new Error(errorData.detail || errorData.message);
            }
            if (response.status === 204) { // No Content
                return;
            }
            return await response.json();
        } catch (error) {
            console.error(`API Error on ${method} ${endpoint}:`, error);
            throw error;
        }
    };

    // --- Authentication ---
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;

        try {
            await apiRequest('/register', 'POST', { username, password });
            alert('Registration successful! Please log in.');
            showLoginLink.click();
            registerForm.reset();
        } catch (error) {
            // Error is already alerted in apiRequest
        }
    });

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const loginUsername = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        try {
            const data = await apiRequest('/login', 'POST', { username: loginUsername, password }, true);
            token = data.access_token;
            username = loginUsername;
            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
            loginForm.reset();
            showTodos();
        } catch (error) {
             // Error is already alerted in apiRequest
        }
    });

    logoutBtn.addEventListener('click', () => {
        showAuth();
    });


    // --- Todos ---
    const fetchTodos = async () => {
        try {
            const todos = await apiRequest('/secure/get_my_tasks', 'GET');
            todoList.innerHTML = '';
            todos.forEach(todo => {
                renderTodo(todo);
            });
        } catch (error) {
            // Error handling
        }
    };

    const renderTodo = (todo) => {
        const li = document.createElement('li');
        li.dataset.id = todo.id;

        // Header
        const header = document.createElement('div');
        header.className = 'task-header';

        const titleSpan = document.createElement('span');
        titleSpan.className = 'task-title';
        titleSpan.textContent = todo.title;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '✖';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', async () => {
            try {
                await apiRequest(`/tasks/${todo.id}/delete`, 'DELETE');
                li.remove();
            } catch(error) {
                // error handling
            }
        });

        header.appendChild(titleSpan);
        header.appendChild(deleteBtn);

        // Details
        const details = document.createElement('div');
        details.className = 'task-details';
        let detailsText = '';
        if (todo.description) {
            detailsText += `${todo.description}`;
        }
        if (todo.deadline) {
            detailsText += `${todo.description ? ' | ' : ''}Due: ${new Date(todo.deadline).toLocaleDateString()}`;
        }
        details.textContent = detailsText;

        li.appendChild(header);
        if (detailsText) {
            li.appendChild(details);
        }

        todoList.appendChild(li);
    };
    
    todoForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const titleInput = document.getElementById('todo-title');
        const descriptionInput = document.getElementById('todo-description');
        const deadlineInput = document.getElementById('todo-deadline');

        const todoData = {
            title: titleInput.value,
            description: descriptionInput.value || null,
            deadline: deadlineInput.value || null,
        };

        try {
            const newTodo = await apiRequest('/secure/create', 'POST', todoData);
            renderTodo(newTodo);
            titleInput.value = '';
            descriptionInput.value = '';
            deadlineInput.value = '';
        } catch (error) {
            // error
        }
    });

    // --- Initial Check ---
    if (token && username) {
        showTodos();
    } else {
        showAuth();
    }
}); 