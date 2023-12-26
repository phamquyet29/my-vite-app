<template>
   <h1 class="item" >ToDoApp</h1>

    <div class="container">
      <div class="button">
    <label for="searchTodo">Search Todo:</label>
<input type="text" id="searchTodo" v-model="searchKeyword" />
</div>
<br>
<br>
   <div class="button">
    <form @submit.prevent="addTodo">
      <label for="newTodo">New Todo:</label>
      <input type="text" id="newTodo" v-model="newTodoText" />
      <button type="submit">Add Todo</button>
    </form>
  </div>
    <br>
    <br>
     <!-- <div class="button">
    <label for="filterStatus">Filter Status:</label>
<select id="filterStatus" v-model="filterStatus">
  <option value="all">All</option>
  <option value="completed">Completed</option>
  <option value="uncompleted">Uncompleted</option>
</select>
</div> -->
<br>
<br>
    <button @click="toggleSortOrder">Xắp Sếp</button>
    <div>
      <br>
    
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Todo</th>
            <th>Completed</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="todo in filteredTodos" :key="todo.id">
            <td>{{ todo.id }}</td>
            <td>{{ todo.text }}</td>
            <td>{{ todo.completed }}</td>
            <td>
              <button @click="deleteTodo(todo.id)">Delete</button>
              <button @click="editTodo(todo)">Edit</button>
            

            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="isEditing">
  <label for="editTodo">Edit Todo:</label>
  <input type="text" id="editTodo" v-model="editTodoText" />
  <button @click="saveEditedTodo">Save</button>
  <button @click="cancelEdit">Cancel</button>
</div>
    </div>
  </div>
</template>

<script>



export default {

  computed: {
  filteredTodos() {
    const keyword = this.searchKeyword.toLowerCase();
    return this.todos.filter(todo => todo.text.toLowerCase().includes(keyword));
  },
},

  data() {
    return {
      todos: [
        { id: 1, text: 'Learn Vue',completed: false },
        { id: 2, text: 'Build a Todo app',completed: true },
      ],
      newTodoText: '',
      editingTodo: null, // Todo đang được sửa
    editTodoText: '', // Nội dung mới của todo đang được sửa
    isEditing: false, // Kiểm tra xem có đang ở chế độ sửa không
    sortOrder: 'asc',
    searchKeyword: '',
    filterStatus: 'all',
    };
  },
  methods: {

    filterByStatus() { // Đổi tên của method thành filterByStatus
      if (this.filterStatus === 'all') {
        return this.todos;
      } else if (this.filterStatus === 'completed') {
        return this.todos.filter(todo => todo.completed);
      } else {
        return this.todos.filter(todo => !todo.completed);
      }
    },

    deleteTodo(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    },
    addTodo() {
      if (this.newTodoText.trim() !== '') {
        const newTodo = {
          id: this.todos.length + 1,
          text: this.newTodoText,
        };
        this.todos.push(newTodo);
        this.newTodoText = '';
        console.log('Updated todos:', this.todos);
      }
    },

    editTodo(todo) {
    // Lưu lại todo đang được sửa để cập nhật sau khi người dùng thay đổi thông tin
    this.editingTodo = todo;
    this.editTodoText = todo.text;
    this.isEditing = true;
  },

  saveEditedTodo() {
    if (this.editTodoText.trim() !== '') {
      this.editingTodo.text = this.editTodoText;
      this.cancelEdit();
    }
  },

  cancelEdit() {
    this.editingTodo = null;
    this.editTodoText = '';
    this.isEditing = false;
  },

  sortTodos() {
    if (this.sortOrder === 'asc') {
      this.todos.sort((a, b) => a.text.localeCompare(b.text));
    } else {
      this.todos.sort((a, b) => b.text.localeCompare(a.text));
    }
  },
  toggleSortOrder() {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.sortTodos();
  },
  },
};
</script>
<style scoped>
.item {
  display: block;
  align-items: center;
  width: calc(33.33% - 10px); /* 10px là khoảng cách giữa các thẻ */
  vertical-align: top;
  margin-right: 5px;
}
.container {
  overflow: hidden; /* Tạo ra BFC */
}

.button {
  float: left; /* Các nút sẽ nằm ngang bên cạnh nhau */
  margin-right: 10px; /* Khoảng cách giữa các nút */
}
table {
  border-collapse: separate;
  border-spacing: 10px; /* Khoảng cách giữa các ô */
}

td, th {
  padding: 10px; /* Kích thước padding cho mỗi ô */
  border: 1px solid #ddd; /* Đường viền giữa các ô */
}
</style>
