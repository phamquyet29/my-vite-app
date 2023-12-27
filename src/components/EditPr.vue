<template>
  <div>
    <a href="/">List Sản Phẩm</a>
    <div class="product-form">
      <h2>{{ isUpdating ? "Cập Nhật" : "Thêm" }} Sản Phẩm</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label>Tên Sản Phẩm:</label>
          <input type="text" v-model="productName" id="productName" required />
        </div>

        <div class="form-group">
          <label>Ảnh Sản Phẩm:</label>
          <input
            type="text"
            v-model="productImage"
            id="productImage"
            required
          />
        </div>

        <div class="form-group">
          <label>Mô Tả Sản Phẩm:</label>
          <textarea
            v-model="productDescription"
            id="productDescription"
            rows="3"
            required
          ></textarea>
        </div>

        <div class="form-group">
          <label>Giá:</label>
          <input
            type="number"
            v-model="productPrice"
            id="productPrice"
            required
          />
        </div>

        <div class="form-group">
          <label>Stock:</label>
          <input
            type="text"
            v-model="productStock"
            id="productStock"
            required
          />
        </div>

        <div class="form-group">
          <label>Category:</label>
          <input
            type="text"
            v-model="productCategory"
            id="productCategory"
            required
          />
        </div>

        <div class="form-group">
          <label>Brand:</label>
          <input
            type="text"
            v-model="productBrand"
            id="productBrand"
            required
          />
        </div>

        <button type="submit">Cập nhật Sản Phẩm</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      isUpdating: false, // Dùng để xác định xem đang cập nhật hay thêm mới
      productIdToUpdate: null, // ID của sản phẩm cần cập nhật
      productName: "",
      productImage: "",
      productDescription: "",
      productPrice: 0,
      productStock: "",
      productCategory: "",
      productBrand: "",
    };
  },
  created() {
    // Nếu có ID sản phẩm được chuyển vào (đang cập nhật)
    const productId = this.$route.params.id;
    if (productId) {
      this.isUpdating = true;
      this.productIdToUpdate = productId;
      this.loadProductData();
    }
  },
  methods: {
    async loadProductData() {
      try {
        // Gửi GET request để lấy dữ liệu sản phẩm cần cập nhật
        const response = await axios.get(
          `http://localhost:3000/product/${this.productIdToUpdate}`
        );

        // Gán dữ liệu từ response vào biến data
        const productData = response.data;

        // Gán dữ liệu từ response vào các trường dữ liệu để hiển thị trên form
        this.productName = productData.name;
        this.productPrice = productData.price;
        this.productDescription = productData.description;
        this.productImage = productData.img;
        this.productStock = productData.stock;
        this.productCategory = productData.category;
        this.productBrand = productData.brand;
      } catch (error) {
        // Xử lý lỗi nếu có
        console.error("Lỗi khi tải dữ liệu sản phẩm:", error);
      }
    },
    async submitForm() {
      // Dữ liệu sản phẩm từ form
      const productData = {
        name: this.productName,
        price: this.productPrice,
        description: this.productDescription,
        img: this.productImage,
        stock: this.productStock,
        category: this.productCategory,
        brand: this.productBrand,
      };

      try {
        // Gửi request dựa vào việc đang cập nhật hay thêm mới
        const response = this.isUpdating
          ? await axios.patch(
              `http://localhost:3000/product/${this.productIdToUpdate}`,
              productData
            )
          : await axios.post("http://localhost:3000/product", productData);

        // Xử lý response nếu cần

        // Reset form sau khi thêm/cập nhật sản phẩm thành công
        this.productName = "";
        this.productPrice = null;
        this.productDescription = "";
        this.productImage = "";
        this.productStock = "";
        this.productCategory = "";
        this.productBrand = "";
      } catch (error) {
        // Xử lý lỗi nếu có
        console.error(
          `Lỗi khi ${this.isUpdating ? "cập nhật" : "thêm"} sản phẩm:`,
          error
        );
      }
    },
  },
};
</script>

<style>
/* CSS styles */
</style>
