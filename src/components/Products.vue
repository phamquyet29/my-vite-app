<template>
  <h2>Sản Phẩm</h2>
  <div class="d-flex flex-wrap">
    <div
      class="d-flex flex-row mb-3 p-1"
      v-for="product in products"
      :key="product.id"
      @click="handleProductClick(product)"
    >
      <div class="card" style="width: 18rem">
        <img :src="product.img" alt=" Image" />
        <div class="card-body">
          <h5 class="card-title">{{ product.name }}</h5>
          <p class="card-text">
            {{ product.price }}
          </p>
          <a href="#" class="btn btn-primary">Add to card</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

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
        const response = await axios.get("http://localhost:3000/product");
        console.log("Data:", response.data);
        this.products = response.data; // Lưu ý sự thay đổi ở đây
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
      }
    },
    handleProductClick(product) {
      // Xử lý khi sản phẩm được nhấp vào
    },
  },
};
</script>
