import { Router } from 'express';

const UsersRouter = Router();

UsersRouter.use((req, res, next) => {
  req.db = req.app.get('db'); 
  next();
});

// POST /signup - Register a new user
UsersRouter.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check if username already exists
    const existingUser = await req.db.collection('users').findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    // Insert new user if username is not taken
    const result = await req.db.collection('users').insertOne({
      username,
      email,
      password,
    });
    res.status(201).json({ message: 'User created successfully', userId: result.insertedId });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

// GET /users/:username - Retrieve a single user by username
UsersRouter.get('/:username', async (req, res) => {
  try {
    const user = await req.db.collection('users').findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user);
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).send('Failed to get user');
  }
});

// PUT /users/:username - Update a user
UsersRouter.put('/:username', async (req, res) => {
  const updates = req.body;
  try {
    const result = await req.db.collection('users').updateOne({ username: req.params.username }, { $set: updates });
    if (result.modifiedCount === 0) {
      return res.status(404).send('User not found or no updates made');
    }
    res.send('User updated successfully');
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send('Failed to update user');
  }
});

// DELETE /users/:username - Delete a user
UsersRouter.delete('/:username', async (req, res) => {
  try {
    const result = await req.db.collection('users').deleteOne({ username: req.params.username });
    if (result.deletedCount === 0) {
      return res.status(404).send('User not found');
    }
    res.send('User deleted successfully');
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send('Failed to delete user');
  }
});

export default UsersRouter;

