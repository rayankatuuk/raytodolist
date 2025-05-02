// Inisialisasi variabel
let todoList = [];
let doneList = [];

// Fungsi untuk menampilkan waktu
function displayTime() {
  const date = new Date();
  const hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const hariIni = hari[date.getDay()];
  const tanggal = date.getDate();
  const bulanIni = bulan[date.getMonth()];
  const tahun = date.getFullYear();
  document.getElementById('hari-tanggal').innerHTML = `${hariIni}, ${tanggal} ${bulanIni} ${tahun}`;
}

// Fungsi untuk menambahkan todo
function addTodo() {
  const todoInput = document.getElementById('todo-input');
  const prioritas = document.getElementById('prioritas').value;
  const date = new Date();
  const hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const hariIni = hari[date.getDay()];
  const tanggal = date.getDate();
  const bulanIni = bulan[date.getMonth()];
  const tahun = date.getFullYear();
  const todo = {
    text: todoInput.value,
    prioritas: prioritas,
    tanggal: `${hariIni}, ${tanggal} ${bulanIni} ${tahun}`
  };
  todoList.push(todo);
  todoInput.value = '';
  displayTodo();
}

// Fungsi untuk menampilkan todo
function displayTodo() {
  const todoUl = document.getElementById('todo-ul');
  todoUl.innerHTML = '';
  todoList.forEach((todo, index) => {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `checkbox-${index}`;
    const label = document.createElement('label');
    label.htmlFor = `checkbox-${index}`;
    label.innerHTML = `${todo.text} (${todo.prioritas}) - ${todo.tanggal}`;
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('bg-blue-500/20', 'hover:bg-blue-700', 'text-white', 'font-bold', 'py-1', 'px-2', 'rounded', 'my-2', 'gap-2', 'bg-main/10', 'hover:bg-blue-700');
    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(editButton);
    todoUl.appendChild(li);
    li.classList.add('flex', 'items-center', 'gap-2');
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        doneList.push(todo);
        todoList.splice(index, 1);
        displayTodo();
        displayDone();
      }
    });
    editButton.addEventListener('click', () => {
      editTodo(index);
    });
  });
}

// Fungsi untuk edit todo
function editTodo(index) {
  const todo = todoList[index];
  const newText = prompt('Masukkan teks baru:', todo.text);
  if (newText !== null) {
    todoList[index].text = newText;
    displayTodo();
  }
}

// Fungsi untuk menampilkan done
function displayDone() {
  const doneUl = document.getElementById('done-ul');
  doneUl.innerHTML = '';
  doneList.forEach((todo, index) => {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = true;
    checkbox.dataset.index = index;
    const label = document.createElement('label');
    label.htmlFor = `checkbox-done-${index}`;
    label.innerHTML = `${todo.text} (${todo.prioritas}) - ${todo.tanggal}`;
    label.style.textDecoration = 'line-through';
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('bg-red-500/20', 'hover:bg-red-700', 'text-white', 'font-bold', 'py-1', 'px-2', 'rounded', 'my-2', 'gap-2');
    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(deleteButton);
    li.classList.add('flex', 'items-center', 'gap-2');
    doneUl.appendChild(li);
    checkbox.addEventListener('change', (e) => {
      if (!e.target.checked) {
        const index = parseInt(e.target.dataset.index);
        todoList.push(doneList[index]);
        doneList.splice(index, 1);
        displayTodo();
        displayDone();
      }
    });
    deleteButton.addEventListener('click', () => {
      doneList.splice(index, 1);
      displayDone();
    });
  });
}

// Fungsi untuk menghapus semua todo
function deleteAll() {
  todoList = [];
  doneList = [];
  displayTodo();
  displayDone();
}

// Event listener
document.getElementById('delete-btn').addEventListener('click', deleteAll);
document.getElementById('submit-btn').addEventListener('click', () => {
  const nama = document.getElementById('nama').innerHTML;
  const jabatan = document.getElementById('jabatan').innerHTML;
  const todoInput = document.getElementById('todo-input').value.trim();
  if (nama !== '' && jabatan !== '') {
    if (todoInput !== '') {
      addTodo();
    } else {
      alert('Tugas tidak boleh kosong!');
    }
  } else {
    alert('Silahkan Masukkan Nama dan Jabatan Terlebih Dahulu!');
  }
});

document.getElementById('save-profile-btn').addEventListener('click', () => {
  const nama = document.getElementById('nama-input').value.trim();
  const jabatan = document.getElementById('jabatan-input').value.trim();
  if (nama !== '' && jabatan !== '') {
    document.getElementById('nama').innerHTML = nama;
    document.getElementById('jabatan').innerHTML = jabatan;
    document.getElementById('profile-input').style.display = 'none';
    document.getElementById('profile-display').style.display = 'block';
  }
});

document.getElementById('edit-profile-btn').addEventListener('click', () => {
  const nama = document.getElementById('nama').innerHTML;
  const jabatan = document.getElementById('jabatan').innerHTML;
  document.getElementById('nama-input-edit').value = nama;
  document.getElementById('jabatan-input-edit').value = jabatan;
  document.getElementById('profile-display').style.display = 'none';
  document.getElementById('profile-edit').style.display = 'block';
});

document.getElementById('save-profile-edit-btn').addEventListener('click', () => {
  const nama = document.getElementById('nama-input-edit').value.trim();
  const jabatan = document.getElementById('jabatan-input-edit').value.trim();
  if (nama !== '' && jabatan !== '') {
    document.getElementById('nama').innerHTML = nama;
    document.getElementById('jabatan').innerHTML = jabatan;
    document.getElementById('profile-edit').style.display = 'none';
    document.getElementById('profile-display').style.display = 'block';
  }
});

document.getElementById('cancel-profile-edit-btn').addEventListener('click', () => {
  document.getElementById('profile-edit').style.display = 'none';
  document.getElementById('profile-display').style.display = 'block';
});

// Inisialisasi
displayTime();
setInterval(displayTime, 1000);