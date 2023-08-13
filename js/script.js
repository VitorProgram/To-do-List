// Elementos HTML relevantes
const inputToDo = document.getElementById('input-adicionar');
const botaoAdd = document.getElementById('botao-adicionar');
const ul = document.getElementById('list');
let indexToDo = 0;

// Atualiza o Local Storage com os to-dos e checkboxes
function updateLocalStorage() {
    const todos = [];
    const lis = ul.querySelectorAll('.to-do');

    lis.forEach(li => {
        const checkbox = li.querySelector('input[type="checkbox"]');
        todos.push({
            id: li.id,
            text: li.innerText,
            checked: checkbox.checked
        });
    });

    localStorage.setItem('todos', JSON.stringify(todos));
}

// Carrega os to-dos do Local Storage
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];

    todos.forEach(todo => {
        const newLi = document.createElement('li');
        newLi.classList.add('to-do');
        newLi.id = todo.id;

        const newSpan = document.createElement('span')
        newSpan.innerText = todo.text;

        const inputCheck = document.createElement('input');
        inputCheck.type = 'checkbox';
        inputCheck.id = `check-${todo.id}`;
        inputCheck.checked = todo.checked;

        const buttonRemove = document.createElement('button');
        buttonRemove.id = `removeBtn-${todo.id}`;
        buttonRemove.classList.add('botao-remover');

        // Funcionalidade de remover tarefa
        buttonRemove.addEventListener('click', () => {
            newLi.remove();
            updateLocalStorage();

            if (ul.children.length === 0) {
                ul.style.display = 'none';
            }
        });

        newLi.prepend(inputCheck);
        newLi.append(newSpan, buttonRemove);
        ul.appendChild(newLi);
        ul.style.display = 'block';
    });
}

// Carrega os to-dos ao carregar a página
loadTodos();

// Evento de clique para adicionar tarefa
botaoAdd.addEventListener('click', () => {
    if (inputToDo.value != '') {
        // Aumenta +1 ao valor do indexToDo
        indexToDo++;

        // Cria um novo elemento de tarefa
        const newLi = document.createElement('li');
        newLi.classList.add('to-do');
        newLi.id = `todo-${indexToDo}`;

        const newSpan = document.createElement('span')
        newSpan.innerText = inputToDo.value;

        const inputCheck = document.createElement('input');
        inputCheck.type = 'checkbox';
        inputCheck.id = `check-${indexToDo}`;

        const buttonRemove = document.createElement('button');
        buttonRemove.id = `removeBtn-${indexToDo}`;
        buttonRemove.classList.add('botao-remover');

        // Funcionalidade de remover tarefa
        buttonRemove.addEventListener('click', () => {
            newLi.remove();
            updateLocalStorage();

            if (ul.children.length === 0) {
                ul.style.display = 'none';
            }
        });

        newLi.prepend(inputCheck);
        newLi.append(newSpan, buttonRemove);

        inputToDo.value = '';
        ul.style.display = 'block';
        ul.appendChild(newLi);

        updateLocalStorage();
    } else if (inputToDo.value === '') {
        alert('Adicione algo à lista.');
    }
});

// Adiciona um evento de mudança para as checkboxes
ul.addEventListener('change', (event) => {
    const checkbox = event.target;
    if (checkbox.type === 'checkbox') {
        updateLocalStorage();
    }
});
