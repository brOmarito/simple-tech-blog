const handleRegisterForm = async (event) => {
    event.preventDefault();

    const first_name = document.querySelector('#first-name').value.trim();
    const last_name = document.querySelector('#last-name').value.trim();
    const username = document.querySelector('#username').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#floatingPassword').value.trim();

    if (first_name && last_name && username && email && password) {
        const response = await fetch('/api/users/', {
            method: 'POST',
            body: JSON.stringify({ first_name, last_name, username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            // If successful, redirect the browser to the profile page
            document.location.replace('/');
        } else {
            alert("Error creating the user. Please Try Again.");
        }
    }
}

document
    .querySelector('.form-register')
    .addEventListener('submit', handleRegisterForm);
