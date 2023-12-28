<template>
  <div class="container">
    <a href="/" class="back-link">← Quay lại danh sách sản phẩm</a>
    <div class="product-form">
      <h2>Thêm Sản Phẩm</h2>
      <form @submit.prevent="submitForm" class="form">
        <div class="form-group">
          <label for="productName">Tên Sản Phẩm</label>
          <input type="text" v-model="productName" id="productName" class="form-control" required />
        </div>

        <div class="form-group">
          <label for="productImage">Ảnh Sản Phẩm</label>
          <input type="text" v-model="productImage" id="productImage" class="form-control" required />
        </div>

        <div class="form-group">
          <label for="productDescription">Mô Tả Sản Phẩm</label>
          <textarea
            v-model="productDescription"
            id="productDescription"
            rows="3"
            class="form-control"
            required
          ></textarea>
        </div>

        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="productPrice">Giá</label>
            <input
              type="number"
              v-model="productPrice"
              id="productPrice"
              class="form-control"
              required
            />
          </div>

          <div class="form-group col-md-6">
            <label for="productStock">Stock</label>
            <input type="text" v-model="productStock" id="productStock" class="form-control" required />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="productCategory">Category</label>
            <input
              type="text"
              v-model="productCategory"
              id="productCategory"
              class="form-control"
              required
            />
          </div>

          <div class="form-group col-md-6">
            <label for="productBrand">Brand</label>
            <input type="text" v-model="productBrand" id="productBrand" class="form-control" required />
          </div>
        </div>

        <button type="submit" class="btn btn-success">Thêm Sản Phẩm</button>
      </form>
    </div>
  </div>
</template>

<style>
.container {
  max-width: 1300px;
  margin: auto;
  padding: 40px;
}

.product-form {
  background-color: #f6f9ff;
  padding: 20px;
  border: 1px solid #ced4da;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #343a40;
}

.form-group {
  margin-bottom: 20px;
}

label {
  color: #495057;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-row {
  display: flex;
  justify-content: space-between;
}

.btn {
  background-color: #28a745;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

.btn:hover {
  background-color: #218838;
}
</style>

<script>
import axios from "axios";

export default {
  data() {
    return {
      productName: "",
      productImage: "",
      productDescription: "",
      productPrice: 0,
      productStock: "",
      productCategory: "",
      productBrand: "",
    };
  },
  methods: {
    async submitForm() {
      const newProduct = {
        name: this.productName,
        price: this.productPrice,
        description: this.productDescription,
        img: this.productImage,
        stock: this.productStock,
        category: this.productCategory,
        brand: this.productBrand,
      };

      try {
        const response = await axios.post(
          "http://localhost:3000/product",
          newProduct
        );

        console.log("Sản phẩm đã được thêm:", response.data);

        this.resetForm();
      } catch (error) {
        console.error("Lỗi khi thêm sản phẩm:", error);
      }
    },
    resetForm() {
      this.productName = "";
      this.productPrice = null;
      this.productDescription = "";
      this.productImage = "";
      this.productStock = "";
      this.productCategory = "";
      this.productBrand = "";
    },
  },
};
</script>
