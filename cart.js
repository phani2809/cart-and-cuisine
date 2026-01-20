document.addEventListener('DOMContentLoaded', () => {
    const cartButton = document.getElementById('cart-button');
    const cartCountElement = document.getElementById('cart-count');
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-button');
    let cart = [];

    // Function to update the cart count
    function updateCartCount() {
        const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalQuantity;
    }

    // Function to update the cart total
    function updateCartTotal() {
        let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
    }

    // Function to render cart items
    function renderCartItems() {
        cartItemsElement.innerHTML = '';
        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>${item.description}</p>
                    <span>$${item.price} x ${item.quantity}</span>
                    <span>Total: $${(item.price * item.quantity).toFixed(2)}</span>
                </div>
                <button class="remove-button" data-index="${index}">Remove</button>
            `;
            cartItemsElement.appendChild(itemElement);
        });

        // Add event listeners to remove buttons
        const removeButtons = document.querySelectorAll('.remove-button');
        removeButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.dataset.index;
                cart.splice(index, 1);
                updateCartCount();
                updateCartTotal();
                renderCartItems();
            });
        });
    }

    // Add event listeners to "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.product button');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productElement = button.parentElement;
            const productName = productElement.querySelector('h3').textContent;
            const productDescription = productElement.querySelector('p').textContent;
            const productPrice = parseFloat(productElement.querySelector('p').textContent.substring(1));
            const productImage = productElement.querySelector('img').src;

            const productIndex = cart.findIndex(item => item.name === productName);

            if (productIndex !== -1) {
                cart[productIndex].quantity += 1;
            } else {
                const product = {
                    name: productName,
                    description: productDescription,
                    price: productPrice,
                    image: productImage,
                    quantity: 1
                };
                cart.push(product);
            }

            updateCartCount();
            updateCartTotal();
            renderCartItems();
        });
    });

    // Event listener for the checkout button
    checkoutButton.addEventListener('click', () => {
        alert('Checkout functionality is not implemented yet.');
    });

    // Initialize the cart display
    updateCartCount();
    updateCartTotal();
});
