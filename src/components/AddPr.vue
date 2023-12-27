<template>
     <a href="/">List Sản Phẩm</a>
    <div class="product-form">
      <h2>Thêm Sản Phẩm</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label >Tên Sản Phẩm:</label>
          <input type="text" v-model="productName" id="productName" required>
        </div>
  
        <div class="form-group">
          <label >Ảnh Sản Phẩm:</label>
          <input type="text" v-model="productImage" id="productImage" required>
        </div>
  
        <div class="form-group">
          <label >Mô Tả Sản Phẩm:</label>
          <textarea v-model="productDescription" id="productDescription" rows="3" required></textarea>
        </div>

        <div class="form-group">
          <label >Giá:</label>
          <input type="number" v-model="productPrice"  id="productPrice" required>
        </div>

        <div class="form-group">
          <label >Stock:</label>
          <input type="text" v-model="productStock" id="productStock" required>
        </div>

        <div class="form-group">
          <label >Category:</label>
          <input type="text" v-model="productCategory"  id="productCategory" required>
        </div>
  
        <div class="form-group">
          <label>Brand:</label>
          <input type="text" v-model="productBrand"  id="productBrand" required>
        </div>

        <button type="submit">Thêm Sản Phẩm</button>
      </form>
    </div>
  </template>
  
  <style>
  .product-form {
    max-width: 1400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input, textarea {
    width: 600px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    background-color: #4caf50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>
  
  <script>
import axios from 'axios';

  export default {
    data() {
      return {
        productName: '',
        productImage: '',
        productDescription: '',
        productPrice: 0,
        productStock: '',
        productCategory: '',
        productBrand: '',
   
      };
    },
    methods: {
    async submitForm() {
      // Dữ liệu sản phẩm từ form
      const newProduct = {
        name: this.productName,
        price: this.productPrice,
        description: this.productDescription,
        img : this.productImage,
        stock : this.productStock,
        category : this.productCategory,
        brand : this.productBrand
      };

      try {
        // Gửi POST request đến API Server
        const response = await axios.post('http://localhost:3000/product', newProduct);

        // Xử lý response nếu cần
        console.log('Sản phẩm đã được thêm:', response.data);

        // Reset form sau khi thêm sản phẩm thành công
        this.productName = '';
        this.productPrice = null;
        this.productDescription = '';
        this.productImage = '';
        this.productStock ='';
        this.productCategory = '';
        this.productBrand =''
      } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Lỗi khi thêm sản phẩm:', error);
      }
    },
  },
  };
  </script>
  