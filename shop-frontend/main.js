// Mock Product Data
const products = [
  { id: 1, name: "Smartphone", price: 299.99, category: "electronics", image: "https://via.placeholder.com/150" },
  { id: 2, name: "Headphones", price: 49.99, category: "electronics", image: "https://via.placeholder.com/150" },
  { id: 3, name: "T-Shirt", price: 19.99, category: "clothing", image: "https://via.placeholder.com/150" },
  { id: 4, name: "Sunglasses", price: 99.99, category: "accessories", image: "https://via.placeholder.com/150" },
  { id: 5, name: "Jeans", price: 39.99, category: "clothing", image: "https://via.placeholder.com/150" },
  { id: 6, name: "Smartwatch", price: 199.99, category: "electronics", image: "https://via.placeholder.com/150" },
];

let cart = [];

// Function to render products dynamically
function renderProducts(category = "all", sort = "default", search = "") {
  const productGrid = document.querySelector(".product-grid");
  productGrid.innerHTML = "";

  let filteredProducts = products;

  if (category !== "all") {
    filteredProducts = filteredProducts.filter(p => p.category === category);
  }

  if (search) {
    filteredProducts = filteredProducts.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (sort === "price-asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  if (filteredProducts.length === 0) {
    productGrid.innerHTML = "<p>No products found.</p>";
    return;
  }

  filteredProducts.forEach(product => {
    const productCard = document.createElement("div");
    productCard.classList.add("product");
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>$${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productGrid.appendChild(productCard);
  });
}

// Function to handle adding a product to the cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const cartItem = cart.find(item => item.id === productId);

  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
}

// Function to handle removing a product from the cart
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCart();
}

// Function to update the cart display
function updateCart() {
  const cartItems = document.querySelector(".cart-items");
  const totalItems = document.getElementById("total-items");
  const totalPrice = document.getElementById("total-price");

  cartItems.innerHTML = '';

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>No items in your cart.</p>";
  } else {
    cart.forEach(item => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
        <p>${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}</p>
        <button onclick="removeFromCart(${item.id})">Remove</button>
      `;
      cartItems.appendChild(cartItem);
    });
  }

  totalItems.textContent = cart.reduce((total, item) => total + item.quantity, 0);
  totalPrice.textContent = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
}

// Event listeners for filters and search
document.getElementById("category").addEventListener("change", event => {
  const category = event.target.value;
  const sort = document.getElementById("sort").value;
  const search = document.getElementById("search").value;
  renderProducts(category, sort, search);
});

document.getElementById("sort").addEventListener("change", event => {
  const sort = event.target.value;
  const category = document.getElementById("category").value;
  const search = document.getElementById("search").value;
  renderProducts(category, sort, search);
});

document.getElementById("search").addEventListener("input", event => {
  const search = event.target.value;
  const category = document.getElementById("category").value;
  const sort = document.getElementById("sort").value;
  renderProducts(category, sort, search);
});

// Initial render of products
renderProducts();

