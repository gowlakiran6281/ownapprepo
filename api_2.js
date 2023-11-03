document.addEventListener('DOMContentLoaded', () => {
  const userList = document.getElementById('user-list');
  const addForm = document.getElementById('add-user-form');
  const editForm = document.getElementById('edit-user-form');
  const deleteForm = document.getElementById('delete-user-form');

  const apiUrl = 'http://localhost:3000/users';

  // Function to display users in the list
  function displayUsers() {
      fetch(apiUrl)
          .then(response => response.json())
          .then(users => {
              userList.innerHTML = '';
              users.forEach(user => {
                  const li = document.createElement('li');
                  li.textContent = `ID: ${user.id}, Name: ${user.name}, Email: ${user.email}`;
                  userList.appendChild(li);
              });
          })
          .catch(error => {
              console.error('Error:', error);
          });
  }

  // Display users on page load
  displayUsers();

  // Add a new user
  addForm.addEventListener('submit', event => {
      event.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;

      fetch(apiUrl, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email }),
      })
          .then(response => response.json())
          .then(newUser => {
              displayUsers();
              addForm.reset();
          })
          .catch(error => {
              console.error('Error:', error);
          });
  });

  // Edit a user
  editForm.addEventListener('submit', event => {
      event.preventDefault();

      const id = parseInt(document.getElementById('edit-id').value);
      const name = document.getElementById('edit-name').value;
      const email = document.getElementById('edit-email').value;

      fetch(`${apiUrl}/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email }),
      })
          .then(response => response.json())
          .then(updatedUser => {
              displayUsers();
              editForm.reset();
          })
          .catch(error => {
              console.error('Error:', error);
          });
  });

  // Delete a user
  deleteForm.addEventListener('submit', event => {
      event.preventDefault();

      const id = parseInt(document.getElementById('delete-id').value);

      fetch(`${apiUrl}/${id}`, {
          method: 'DELETE',
      })
          .then(response => response.json())
          .then(data => {
              displayUsers();
              deleteForm.reset();
          })
          .catch(error => {
              console.error('Error:', error);
          });
  });
});
