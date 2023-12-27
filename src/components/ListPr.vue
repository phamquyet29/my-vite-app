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
          <td>
            <img
              style="width: 100px; height: 100px"
              :src="product.img"
              alt=""
            />
          </td>
          <td>{{ product.description }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.stock }}</td>
          <td>{{ product.category }}</td>
          <td>{{ product.brand }}</td>
          <td>
            <Button class="xoa" @click="deleteProduct(product.id)"
              ><i class="bi bi-trash"></i
            ></Button>
          </td>
          <td>
            <Button class="btn-warning">
              <router-link :to="`/${product.id}/edit`">
                <i class="bi bi-pencil"></i>
              </router-link>
            </Button>
          </td>
        </tr>
      </tbody>
    </table>
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
        this.products = response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    async deleteProduct(productId) {
      try {
        const userConfirmed = window.confirm("Bạn có muốn xoá không ?");

        if (userConfirmed) {
          await axios.delete(`http://localhost:3000/product/${productId}`);

          this.products = this.products.filter(
            (product) => product.id !== productId
          );

          console.log("Sản phẩm đã được xóa");
        }
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
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

th,
td {
  padding: 10px;
  border: 1px solid #ddd; /* Để giữ cấu trúc của bảng */
}
.xoa {
  background-color: red;
}
.btn-warning {
  background-color: green;
}
.bi-pencil {
  color: white;
}
th:first-child,
td:first-child {
  border-top-left-radius: 10px; /* Điều chỉnh giá trị để đáp ứng nhu cầu của bạn */
  border-bottom-left-radius: 10px; /* Điều chỉnh giá trị để đáp ứng nhu cầu của bạn */
}

th:last-child,
td:last-child {
  border-top-right-radius: 10px; /* Điều chỉnh giá trị để đáp ứng nhu cầu của bạn */
  border-bottom-right-radius: 10px; /* Điều chỉnh giá trị để đáp ứng nhu cầu của bạn */
}
/* Your component-specific styles go here */
</style>
