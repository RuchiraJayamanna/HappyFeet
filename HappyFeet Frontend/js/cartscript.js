function fetchCartItems() {
    fetch('http://localhost:8080/api/cart')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(items => {
            const cartItemsContainer = document.getElementById('cartItemsContainer');
            cartItemsContainer.innerHTML = '';

            if (items.length === 0) {
                cartItemsContainer.innerHTML = '<p class="lead fw-normal mb-0" style="color:black">Your cart is empty.</p>';
            } else {
                items.forEach(item => {
                    cartItemsContainer.innerHTML += `
                        <center>
                        <div class="col mb-5 ">
                        <div class="card h-350">
                            <div class="row no-gutters">
                                <div class="col-md-4">
                                    <img class="card-img-top" src="${item.product.imageUrl}" alt="${item.product.name}" />
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body p-4">
                                        <div>
                                            <h5 class="fw-bolder">${item.product.name}</h5>
                                            <span class="fw-bolder">LKR ${item.product.price.toFixed(2)}</span>
                                        </div>
                                        <div class="text-right">
                                            <br>
                                            <br>
                                            <br>
                                            <button class="btn btn-danger mt-2" onclick="removeItem(${item.id})">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                        </center>
                    `;
                });
            }

            const cartItemCountSpan = document.getElementById('cartItemCount');
            cartItemCountSpan.textContent = items.length;
        })
        .catch(error => {
            console.error('Error fetching cart items:', error);
        });
}


function removeItem(itemId) {

    fetch(`http://localhost:8080/api/cart/${itemId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        fetchCartItems();
    })
    .catch(error => {
        console.error('Error removing item:', error);
    });
}

if (window.location.pathname === '/cart.html') {
    fetchCartItems(); 
}

function openCartPage() {
    window.location.href = 'cart.html';
}

function openAccountPage() {
    window.location.href = 'account.html';
}
