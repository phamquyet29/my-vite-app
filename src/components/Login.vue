<!-- Login.vue -->
<template>
    <div class="login-container">
      <h2>Login</h2>
      <form >
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
  
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
  
        <button type="submit"  @click="login1">Login</button>
       
      </form>
    </div>
  </template>
  
  <script>
 export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {

    login1() {
      // Chuyển hướng đến trang khác sau khi đăng nhập thành công
      this.$router.push('/manchinh') // Đổi '/dashboard' thành đường dẫn của trang bạn muốn chuyển đến
    },

    async login() {
      try {
        const response = await this.$axios.post('http://localhost:3000/user', {
          username: this.userName,
          password: this.password,
        });

        // Xử lý khi đăng nhập thành công
        console.log('Login successful!', response.data);

        // Chuyển màn hình hoặc thực hiện các thao tác khác ở đây
      } catch (error) {
        console.error('Login failed!', error);
      }
    },
  },
};
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  form {
    display: flex;
    flex-direction: column;
  }
  
  label {
    margin-bottom: 8px;
  }
  
  input {
    padding: 8px;
    margin-bottom: 16px;
  }
  
  button {
    background-color: #4caf50;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>
  