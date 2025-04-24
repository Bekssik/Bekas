let cartItems = [];

function toggleCart() {
    const cartPanel = document.getElementById('cart-panel');
    cartPanel.classList.toggle('hidden');
}

function addToCart(button) {
    const card = button.closest('.shop_card');
    const title = card.querySelector('.shop_sub').textContent;
    const subtitle = card.querySelector('.shop_sub').textContent;
    const price = parseInt(card.querySelector('.price').textContent.replace('€', ''));
    const image = card.querySelector('img').src;

    const existingItem = cartItems.find(item => item.title === title);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({
            title,
            subtitle,
            price,
            image,
            quantity: 1
        });
    }

    updateCart();
    updateCartCount();
}

function removeFromCart(index) {
    cartItems.splice(index, 1);
    updateCart();
    updateCartCount();
}

function updateQuantity(index, change) {
    const item = cartItems[index];
    const newQuantity = item.quantity + change;
    
    if (newQuantity < 1) {
        removeFromCart(index);
    } else {
        item.quantity = newQuantity;
        updateCart();
        updateCartCount();
    }
}

function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    cartItemsContainer.innerHTML = cartItems.map((item, index) => `
        <div class="cart-item">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="cart-item-details">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">€${item.price}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                    <button onclick="removeFromCart(${index})" style="margin-left: 10px">Remove</button>
                </div>
            </div>
        </div>
    `).join('');

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `€${total}`;
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function checkout() {
    if (cartItems.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    alert('Thank you for your purchase! This is where the checkout process would begin.');
    cartItems = [];
    updateCart();
    updateCartCount();
    toggleCart();
}

// Add smooth scrolling
document.addEventListener('DOMContentLoaded', () => {
    const scrollAnimationDuration = 1000;
    
    function scrollToTop() {
        const scrollStep = -window.scrollY / (scrollAnimationDuration / 15);
        
        const scrollInterval = setInterval(() => {
            if (window.scrollY !== 0) {
                window.scrollBy(0, scrollStep);
            } else {
                clearInterval(scrollInterval);
            }
        }, 15);
    }

    // Show/hide scroll-to-top button based on scroll position
    window.addEventListener('scroll', () => {
        const scrollButton = document.querySelector('.scroll-top');
        if (scrollButton) {
            if (window.scrollY > 300) {
                scrollButton.style.display = 'block';
            } else {
                scrollButton.style.display = 'none';
            }
        }
    });
});