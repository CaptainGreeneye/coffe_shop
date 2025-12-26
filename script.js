let cart = JSON.parse(localStorage.getItem("cart")) || [];
let popupTimer = null;

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function showPopup(text) {
    const popup = document.getElementById("popup");
    if (!popup) return;

    popup.textContent = text;
    popup.classList.remove("show");
    void popup.offsetWidth;
    popup.classList.add("show");

    if (popupTimer) clearTimeout(popupTimer);
    popupTimer = setTimeout(() => popup.classList.remove("show"), 1200);
}

function addItem(id, name, price, img, qty) {
    if (qty <= 0) return;

    const item = cart.find(i => i.id === id);
    if (item) item.qty += qty;
    else cart.push({ id, name, price, img, qty });

    saveCart();
    showPopup(`Додано: ${qty}`);
}

function changeQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
        cart = cart.filter(i => i.id !== id);
    }

    saveCart();
    renderCart();
}

function removeItem(id) {
    cart = cart.filter(i => i.id !== id);
    saveCart();
    renderCart();
}

function renderCart() {
    const cartDiv = document.getElementById("cart");
    const totalDiv = document.getElementById("total");
    if (!cartDiv) return;

    cartDiv.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.qty;

        cartDiv.innerHTML += `
        <div class="cart-item">
            <img src="${item.img}">
            <div class="cart-info">
                <h4>${item.name}</h4>
                <p>${item.price}$</p>
                <div class="qty">
                    <button onclick="changeQty('${item.id}',-1)">−</button>
                    <span>${item.qty}</span>
                    <button onclick="changeQty('${item.id}',1)">+</button>
                </div>
                <button class="delete" onclick="removeItem('${item.id}')">
                    Видалити
                </button>
            </div>
        </div>`;
    });

    totalDiv.textContent = total + "$";
}

function toggleAddress(val) {
    document.getElementById("address").style.display =
        val === "delivery" ? "block" : "none";
}

function submitOrder(e) {
    e.preventDefault();
    alert("Замовлення прийнято ❤️");
    cart = [];
    saveCart();
    renderCart();
}

window.onload = renderCart;