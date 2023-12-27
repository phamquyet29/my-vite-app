<template>
    <!-- Your HTML template goes here -->
    <div>
    <h2>Ứng Dụng Bán Quần Áo</h2>
    <a href="/add">Thêm Sản Phẩm</a>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Image</th>
          <th>description</th>
          <th>price</th>
          <th>stock</th>
          <th>category</th>
          <th>brand</th>
          <th>Xóa</th>
          <th>Sửa</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.name }}</td>
          <td><img style="width: 100px; height: 100px;" :src="product.img" alt=""></td>
          <td>{{ product.description }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.stock }}</td>
          <td>{{ product.category }}</td>
          <td>{{ product.brand }}</td>
          <td><Button><img  style="width: 50px; height: 50px;" src="https://tse2.mm.bing.net/th?id=OIP.PAdJmX_PTIvVcmQBSLUPXAHaFj&pid=Api&P=0&h=180" alt=""></Button></td>
          <td><button><img  style="width: 50px; height: 50px;" src="https://tse3.mm.bing.net/th?id=OIP.MVuhE68y96tX3XPbVCLs-gAAAA&pid=Api&P=0&h=180" alt=""></button></td>
        </tr>
      </tbody>
    </table>
  </div>
  </template>
  
  <script>

import axios from 'axios';

export default {
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3000/product');
        this.products = response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
  },
};
  </script>
  
  <style scoped>
table {
  border-collapse: collapse;
  overflow: hidden;
}

th, td {
  border: 1px solid #ddd; /* Để giữ cấu trúc của bảng */
}

th:first-child, td:first-child {
  border-top-left-radius: 10px; /* Điều chỉnh giá trị để đáp ứng nhu cầu của bạn */
  border-bottom-left-radius: 10px; /* Điều chỉnh giá trị để đáp ứng nhu cầu của bạn */
}

th:last-child, td:last-child {
  border-top-right-radius: 10px; /* Điều chỉnh giá trị để đáp ứng nhu cầu của bạn */
  border-bottom-right-radius: 10px; /* Điều chỉnh giá trị để đáp ứng nhu cầu của bạn */
}
  /* Your component-specific styles go here */
  </style>