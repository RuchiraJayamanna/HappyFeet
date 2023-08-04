function fetchUserInfo() {
    fetch('http://localhost:8080/api/users/1') 
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(user => {

            const userInfoContainer = document.getElementById('userInfoContainer');

            userInfoContainer.innerHTML = '';

            userInfoContainer.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Your Account Information</h5>
                        <p class="card-text">Username: ${user.username}</p>
                        <p class="card-text">Email: ${user.email}</p>
                    </div>
                </div>
            `;
        })
        .catch(error => {
            console.error('Error fetching user information:', error);
        });
}

function changePassword() {

    const newPassword = document.getElementById('newPassword').value;

    if (newPassword.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
    }

    fetch('http://localhost:8080/api/users/1', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password: newPassword })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        alert('Password changed successfully!');
        fetchUserInfo();
    })
    .catch(error => {
        console.error('Error changing password:', error);
    });
}

function removeUser() {

    const password = document.getElementById('password').value;

    fetch('http://localhost:8080/api/users/1', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password: password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
  
        alert('Account removed successfully!');
 
        window.location.href = 'index.html';
    })
    .catch(error => {
        console.error('Error removing account:', error);
    });
}

function signIn() {

    alert('You are signed in as a user.');
}

function signUp() {

    alert('You are signed up as a new user.');
}

if (window.location.pathname === '/account.html') {
    fetchUserInfo(); 
}

document.getElementById('changePasswordBtn').addEventListener('click', changePassword);
document.getElementById('removeUserBtn').addEventListener('click', removeUser);
document.getElementById('signInBtn').addEventListener('click', signIn);
document.getElementById('signUpBtn').addEventListener('click', signUp);
