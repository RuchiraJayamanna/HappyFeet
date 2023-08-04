const cartItems = [];

function fetchProducts() {
    fetch('http://localhost:8080/api/products')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(products => {
            const productList = document.getElementById('product-list');
            productList.innerHTML = ''; 
            products.forEach(product => {
                productList.innerHTML += `
                    <div class="col mb-5">
                        <div class="card h-100">
                            <img class="card-img-top" src="${product.imageUrl}" alt="${product.name}" />
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <h5 class="fw-bolder">${product.name}</h5>
                                    <span class="fw-bolder">LKR ${product.price.toFixed(2)}</span>
                                    <p>${product.description}</p>
                                    <button class="btn btn-primary" onclick="addToCart(${product.id})">Add</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
}


document.addEventListener('DOMContentLoaded', fetchProducts);

function addToCart(itemId) {
    fetch('http://localhost:8080/api/cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            productId: itemId,
            quantity: 1, 
        }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(cartItem => {
            cartItems.push(cartItem);
            updateCartItemCount();
        })
        .catch(error => {
            console.error('Error saving item to cart:', error);
        });
}

function updateCartItemCount() {
    const cartItemCountSpan = document.getElementById('cartItemCount');
    cartItemCountSpan.innerText = cartItems.length;
}

function fetchCartItems() {
    fetch('http://localhost:8080/api/cart')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(items => {
            cartItems.push(...items);
            updateCartItemCount();
            renderCartItems();
        })
        .catch(error => {
            console.error('Error fetching cart items:', error);
        });
}


function renderCartItems() {
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    cartItemsContainer.innerHTML = '';

    cartItems.forEach(item => {
        cartItemsContainer.innerHTML += `
            <div class="row align-items-center mb-4">
                <div class="col-md-3">
                    <img src="${item.product.imageUrl}" alt="${item.product.name}" class="img-fluid rounded shadow-sm" />
                </div>
                <div class="col-md-6">
                    <h5 class="mb-0">${item.product.name}</h5>
                    <span class="text-muted">Price: $${item.product.price.toFixed(2)}</span>
                </div>
            </div>
        `;
    });
}


if (window.location.pathname === '/cart.html') {
    document.addEventListener('DOMContentLoaded', fetchCartItems);
}

function openCartPage() {
    window.location.href = 'cart.html';
}

function openAccountPage() {
    window.location.href = 'account.html';
}
