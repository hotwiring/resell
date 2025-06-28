// Scroll reveal
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
}
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// ===== Cart Logic =====
const cartCountEl = document.getElementById("cart-count");
const addToCartButtons = document.querySelectorAll(".add-to-cart");

function getCart() {
  const cart = localStorage.getItem("sxar-cart");
  return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
  localStorage.setItem("sxar-cart", JSON.stringify(cart));
}

function updateCartCount() {
  const cart = getCart();
  let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountEl.textContent = totalItems;
}

function addItemToCart(id, name, price, image) {
  let cart = getCart();
  const existingItem = cart.find(item => item.id === id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id, name, price, image, quantity: 1 });
  }
  saveCart(cart);
  updateCartCount();
}

addToCartButtons.forEach(btn => {
  btn.addEventListener("click", e => {
    const card = e.target.closest(".product-card");
    const id = card.dataset.id;
    const name = card.dataset.name;
    const price = parseFloat(card.dataset.price);
    const image = card.dataset.image;
    addItemToCart(id, name, price, image);
  });
});

// Initialize count on page load
updateCartCount();
