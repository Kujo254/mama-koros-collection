
const products = [
  {
    id: 1,
    name: "Classic Everyday Shirt",
    category: "Clothing",
    price: 1800,
    symbol: "👔",
    background: "#eee0ce",
    tag: "POPULAR"
  },
  {
    id: 2,
    name: "Modern Casual Outfit",
    category: "Clothing",
    price: 2500,
    symbol: "👗",
    background: "#e8d9d2",
    tag: "NEW"
  },
  {
    id: 3,
    name: "Everyday Sneakers",
    category: "Shoes",
    price: 3200,
    symbol: "👟",
    background: "#e0e5db",
    tag: "FAVORITE"
  },
  {
    id: 4,
    name: "Classic Handbag",
    category: "Travel",
    price: 2800,
    symbol: "👜",
    background: "#eadcc8",
    tag: "POPULAR"
  },
  {
    id: 5,
    name: "Travel Suitcase",
    category: "Travel",
    price: 5500,
    symbol: "🧳",
    background: "#dfe3e8",
    tag: "ESSENTIAL"
  },
  {
    id: 6,
    name: "Elegant Shoes",
    category: "Shoes",
    price: 2900,
    symbol: "👞",
    background: "#e8dfd8",
    tag: "NEW"
  }
];

let cartCount = 0;
let currentFilter = "All";

const productGrid = document.querySelector("#product-grid");
const cartCountElement = document.querySelector("#cart-count");

function formatPrice(price) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0
  }).format(price);
}

function renderProducts() {
  const visibleProducts = products.filter(product =>
    currentFilter === "All" ||
    product.category === currentFilter
  );

  productGrid.innerHTML = visibleProducts.map(product => `
    <article class="product-card">
      <div class="product-art"
           style="--product-bg: ${product.background}">
        <span class="product-tag">${product.tag}</span>
        <span class="product-symbol" aria-hidden="true">
          ${product.symbol}
        </span>
      </div>

      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3>${product.name}</h3>
        <p class="product-price">${formatPrice(product.price)}</p>
        <button class="add-button" data-add="${product.id}">
          Add to bag +
        </button>
      </div>
    </article>
  `).join("");
}

function setFilter(category) {
  currentFilter = category;

  document.querySelectorAll(".filter").forEach(button => {
    const active = button.dataset.filter === category;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  renderProducts();
}

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    setFilter(button.dataset.filter);
  });
});

document.querySelectorAll("[data-category]").forEach(link => {
  link.addEventListener("click", () => {
    setFilter(link.dataset.category);
  });
});

document.querySelector("#show-all").addEventListener("click", () => {
  setFilter("All");
});

productGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-add]");

  if (!button) return;

  cartCount++;
  cartCountElement.textContent = cartCount;

  button.textContent = "Added to bag ✓";

  setTimeout(() => {
    button.textContent = "Add to bag +";
  }, 1200);
});

document.querySelector("#year").textContent =
  new Date().getFullYear();

renderProducts();
