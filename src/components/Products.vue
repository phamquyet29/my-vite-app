<template>
  <h2>Sản Phẩm</h2>
  <a href="/products">Thêm Sản Phẩm</a>

  <div>
      <br>
      <Button @click="open()"
              ><i class="bi bi-cart"></i>
            
            </Button>
            <h2 style="margin-top: -40px;margin-left: 80px;"> {{ cartTotalQuantity }}</h2>

            <div v-if="isopen">
  <table style="justify-content: center;align-items: center;">
    <thead>
      <tr>
        <th>Tên</th>
        <th>Số Lượng</th>
        <th>Giá</th>
        <th>Thành Tiền</th>
        <th>Xóa</th>
        <th>Giảm Số Lượng</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in cartList" :key="item.id">
        <td>{{ item.name }}</td>
        <td>{{ item.quantity }}</td>
        <td>{{ item.price }}</td>
        <td>{{ formatPrice(item.price * item.quantity) }}</td>
        <td>
            <Button  class="xoa" @click="deleteCart(item.id)"
              ><i class="bi bi-trash"></i
            ></Button>
          </td>
          <td>
            <Button @click="updateSoLuongCart(item)"
              ><i class="bi bi-dash "></i
            ></Button>
          </td>
      </tr>
    </tbody>
  </table>
  <button @click="closeCartModal"><i class="bi bi-close"></i>Đóng</button>
</div>
  </div>


  <div class="d-flex flex-wrap">
    <div
      class="d-flex flex-row mb-3 p-1"
      v-for="product in products"
      :key="product.id"
    
    >
      <!-- <router-link :to="'/product/:id'"> -->
        <div class="card" style="width: 18rem">
          <img :src="product.img" alt=" Image"   @click="handleProductClick(product)" />
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">
              {{ product.price }}
            </p>
            <!-- <a href="#" class="btn btn-primary">Add to card</a> -->
          </div>
          <button class="btn btn-danger text-uppercase mr-2 px-4" @click="addToCart(product)">Thêm vào giỏ hàng</button>
        </div>
      <!-- </router-link> -->
    
      
    </div>
  </div>
</template>

<script>
import axios from "axios";



export default {

  computed: {
  cartTotalQuantity() {
    return this.cartList.reduce((total, item) => total + item.quantity, 0);
  },
},


  data() {
    return {
      products: [],
      isopen : false,
      cart: [],
      cartList:[],
    };
  },
  mounted() {
    this.fetchProducts();
    this.fetchCart();

  },
  methods: {


    async deleteCart(cartID) {
      try {
        const userConfirmed = window.confirm("Bạn có muốn xoá không ?");

        if (userConfirmed) {
          await axios.delete(`http://localhost:3000/cart/${cartID}`);

          this.cartList = this.cartList.filter(
            (product) => product.id !== cartID
          );

          console.log("Sản phẩm đã được xóa");
        }
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
      }
    },

    formatPrice(value) {
      // Sử dụng toFixed(2) để giới hạn số lượng chữ số sau dấu thập phân thành 2
      return (value || 0).toFixed(2);
    },

        closeCartModal() {
          this.isopen = false;
        },

    open() {
     // Lưu lại todo đang được sửa để cập nhật sau khi người dùng thay đổi thông tin
   this.isopen = true;
   },


    async updateProductInCart(products) {
    try {
      // Sử dụng axios.put để cập nhật thông tin cho sản phẩm cụ thể
      await axios.put(`http://localhost:3000/cart/${products.id}`, products);

      console.log('Sản phẩm đã được cập nhật trong giỏ hàng:', products);
    } catch (error) {
      console.error('Lỗi khi cập nhật sản phẩm trong giỏ hàng:', error);
    }
  },

  async updateSoLuongCart(products) {

      products.quantity --;

      if(products.quantity ==0){
        this.deleteCart(products.id);
      }

    try {
      // Sử dụng axios.put để cập nhật thông tin cho sản phẩm cụ thể
      await axios.put(`http://localhost:3000/cart/${products.id}`, products);

      console.log('Sản phẩm đã được cập nhật trong giỏ hàng:', products);
    } catch (error) {
      console.error('Lỗi khi cập nhật sản phẩm trong giỏ hàng:', error);
    }
  },

    // giỏ hàng 
   async addToCart(products) {
    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
    const existingProduct = this.cartList.find(item => item.id === products.id);

    if (existingProduct) {
      // Nếu sản phẩm đã tồn tại, tăng số lượng
      existingProduct.quantity++;
      await this.updateProductInCart(existingProduct);
    } else {
    
      // Nếu sản phẩm chưa tồn tại, thêm mới vào giỏ hàng
  
      const newProduct = {
        id: products.id,
        name: products.name,
        price: products.price,
        quantity: 1,
      };
      const response = await axios.post('http://localhost:3000/cart', newProduct);
      this.fetchCart();
    }
  },
    // giỏ hàng 

    async fetchCart() {
      try {
        const response = await axios.get("http://localhost:3000/cart");
        this.cartList = response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },



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
      this.$router.push({ path: `/product/${product.id}` });
    },
  },
};
</script>
<style scoped>
table {
  margin-top: 20px;
  border-collapse: collapse;
  overflow: hidden;
}

th,
td {
  padding: 10px;
  border: 1px solid #ddd; /* Để giữ cấu trúc của bảng */
}
.add {
  margin: 10px;
  background-color: aqua;
  padding: 10px;
  border-radius: 4px;
  color: black;
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

