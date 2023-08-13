const inputToDo = document.getElementById('input-adicionar');
const botaoAdd = document.getElementById('botao-adicionar');
const ul = document.getElementById('list');
let indexToDo = 0;

// Função para atualizar o Local Storage com os to-dos e checkboxes
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

// Função para carregar os to-dos do Local Storage
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    
    todos.forEach(todo => {
        const newLi = document.createElement('li');
        newLi.innerText = todo.text;
        newLi.classList.add('to-do');
        newLi.id = todo.id;

        const inputCheck = document.createElement('input');
        inputCheck.type = 'checkbox';
        inputCheck.id = `check-${todo.id}`;
        inputCheck.checked = todo.checked;

        const buttonRemove = document.createElement('button');
        buttonRemove.id = `removeBtn-${todo.id}`;
        buttonRemove.classList.add('botao-remover');

        // Funcionalidade de remover linha
        buttonRemove.addEventListener('click', () => {
            newLi.remove();
            updateLocalStorage();

            if (ul.children.length === 0) {
                ul.style.display = 'none';
            }
        });

        newLi.prepend(inputCheck);
        newLi.appendChild(buttonRemove);

        ul.appendChild(newLi);
        ul.style.display = 'block';
    });
}

// Carregar os to-dos ao carregar a página
loadTodos();

botaoAdd.addEventListener('click', () => {
    // Aumenta +1 ao valor do indexToDo
    indexToDo++;

    // Nova linha/to-do
    const newLi = document.createElement('li');
    newLi.innerText = inputToDo.value;
    newLi.classList.add('to-do');
    newLi.id = `todo-${indexToDo}`;

    const inputCheck = document.createElement('input');
    inputCheck.type = 'checkbox';
    inputCheck.id = `check-${indexToDo}`;

    const buttonRemove = document.createElement('button');
    buttonRemove.id = `removeBtn-${indexToDo}`;
    buttonRemove.classList.add('botao-remover');

    // Funcionalidade de remover linha
    buttonRemove.addEventListener('click', () => {
        newLi.remove();
        updateLocalStorage();

        if (ul.children.length === 0) {
            ul.style.display = 'none';
        }
    });

    newLi.prepend(inputCheck);
    newLi.appendChild(buttonRemove);

    inputToDo.value = '';
    ul.style.display = 'block';
    ul.appendChild(newLi);

    updateLocalStorage();
});

// Adicionar evento de mudança para os checkboxes
ul.addEventListener('change', (event) => {
    const checkbox = event.target;
    if (checkbox.type === 'checkbox') {
        updateLocalStorage();
    }
});
