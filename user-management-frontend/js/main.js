const API_URL = "http://localhost:5000/api/users";

// Function to Fetch and Display Users
function fetchUsers() {
    fetch(API_URL)
        .then(response => response.json())
        .then(users => {
            const userTable = document.getElementById("userTable");
            userTable.innerHTML = ""; // Clear existing rows
            users.forEach(user => {
                userTable.innerHTML += `
                    <tr>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${user.phone}</td>
                        <td>
                            <button onclick="editUser('${user._id}')">Edit</button>
                            <button onclick="deleteUser('${user._id}')">Delete</button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(error => console.error("Error fetching users:", error));
}

// Function to Handle Form Submission (Create/Update User)
document.getElementById("userForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const userId = document.getElementById("userId").value; // Get user ID if updating
    const userData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        password: document.getElementById("password").value,
        role: document.getElementById("role").value,
    };

    if (userId) {
        // If userId exists, update the user
        updateUser(userId, userData);
    } else {
        // Otherwise, create a new user
        createUser(userData);
    }
});

// Function to Create a New User
function createUser(userData) {
    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    })
    .then(response => response.json())
    .then(() => {
        alert("User created successfully!");
        resetForm(); // Clear form fields after creation
        fetchUsers(); // Refresh user list
    })
    .catch(error => console.error("Error creating user:", error));
}

// Function to Load User Data into Form for Editing
function editUser(userId) {
    fetch(`${API_URL}/${userId}`)
        .then(response => response.json())
        .then(user => {
            document.getElementById("userId").value = user._id; // Set hidden user ID field
            document.getElementById("name").value = user.name;
            document.getElementById("email").value = user.email;
            document.getElementById("phone").value = user.phone;
            document.getElementById("password").value = ""; // Keep password empty for security
            document.getElementById("role").value = user.role;

            // Change form heading and button text to indicate update mode
            document.getElementById("formHeading").innerText = "Update User";
            document.getElementById("submitButton").innerText = "Update User";
        })
        .catch(error => console.error("Error fetching user for update:", error));
}

// Function to Update an Existing User
function updateUser(userId, updatedUserData) {
    fetch(`${API_URL}/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUserData),
    })
    .then(response => response.json())
    .then(() => {
        alert("User updated successfully!");
        resetForm(); // Reset form to default
        fetchUsers(); // Refresh user list
    })
    .catch(error => console.error("Error updating user:", error));
}

// Function to Delete a User
function deleteUser(userId) {
    fetch(`${API_URL}/${userId}`, {
        method: "DELETE",
    })
    .then(() => {
        alert("User deleted successfully!");
        fetchUsers(); // Refresh the user list
    })
    .catch(error => console.error("Error deleting user:", error));
}

// Function to Reset Form Fields and Switch to Create Mode
function resetForm() {
    document.getElementById("userForm").reset(); // Clear all input fields
    document.getElementById("userId").value = ""; // Clear hidden user ID
    document.getElementById("formHeading").innerText = "Create User"; // Reset heading
    document.getElementById("submitButton").innerText = "Create User"; // Reset button text
}

// Fetch users when the page loads
fetchUsers();
