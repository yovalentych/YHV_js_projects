const addBtn = document.querySelector('.add_button');
const inputToDo = document.querySelector('#todo_input');

const addTask = (content) => {
  const newItem = document.createElement('div');

  newItem.className = 'todo_item';
  newItem.textContent = content;
  document.querySelector('.todo_list').appendChild(newItem);
  document.querySelector('#todo_input').value = '';

  newItem.addEventListener('click', () => {
    newItem.classList.toggle('red');
  });
  newItem.addEventListener('dblclick', () => {
    newItem.classList.toggle('green');
  });
};

addBtn.addEventListener('click', () => {
  const inpText = document.querySelector('#todo_input').value;
  if (inpText.length == 0) {
    alert('Type what you should do');
  } else {
    addTask(inpText);
  }
});
inputToDo.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    const inpText = document.querySelector('#todo_input').value;
    if (inpText.length == 0) {
      alert('Type what you should do');
    } else {
      addTask(inpText);
    }
  }
});
