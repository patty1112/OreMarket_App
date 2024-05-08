import express from 'express';

const AuthRouter = express.Router();


AuthRouter.use(express.json());

// POST /login - Authenticate a user
AuthRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const db = req.app.get('db');  // Assuming you've set up your db in the main app

    try {
        // Retrieve user by username
        const user = await db.collection('users').findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check password
        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Respond with success if passwords match
        res.json({ message: 'Login successful', user: { id: user._id, username: user.username }});
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during authentication' });
    }
});

export default AuthRouter;