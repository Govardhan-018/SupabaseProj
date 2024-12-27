import React, { useState, useEffect } from 'react';
import { supabase } from './CreatClient';
import './app.css'

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({ name: '', age: '' });
  const [user2, setUser2] = useState({ id: '', name: '', age: '' }); // State for editing

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users from the Supabase database
  async function fetchUsers() {
    const { data } = await supabase
      .from('users')
      .select('*');
    setUsers(data);
  }

  // Handle input changes for creating a user
  function handleChange(event) {
    const { name, value } = event.target;
    setUser(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  }

  // Handle input changes for editing a user
  function handleEditChange(event) {
    const { name, value } = event.target;
    setUser2(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  }

  // Create a new user
  async function createUser(event) {
    event.preventDefault();
    await supabase
      .from('users')
      .insert([{ name: user.name, age: user.age }]);
    setUser({ name: '', age: '' });
    fetchUsers();
  }

  // Update an existing user
  async function updateUser(event) {
    event.preventDefault();
    await supabase
      .from('users')
      .update({ name: user2.name, age: user2.age })
      .eq('id', user2.id);
    setUser2({ id: '', name: '', age: '' }); // Clear the edit form
    fetchUsers();
  }

  // Delete a user
  async function deleteUser(userId) {
    await supabase
      .from('users')
      .delete()
      .eq('id', userId);
    fetchUsers();
  }

  // Load user data into the edit form
  function displayUser(userId) {
    const userToEdit = users.find(user => user.id === userId);
    setUser2({ id: userToEdit.id, name: userToEdit.name, age: userToEdit.age });
  }

  return (
    <div>
      {/* Create User Form */}
      <form onSubmit={createUser}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={user.name}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Age"
          name="age"
          value={user.age}
          onChange={handleChange}
        />
        <button type="submit">Create</button>
      </form>

      {/* Edit User Form */}
      <form onSubmit={updateUser}>
        <input
          type="text"
          name="name"
          value={user2.name}
          onChange={handleEditChange}
        />
        <input
          type="number"
          name="age"
          value={user2.age}
          onChange={handleEditChange}
        />
        <button type="submit">Save Changes</button>
      </form>

      {/* Users Table */}
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
                <button onClick={() => displayUser(user.id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
