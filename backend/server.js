const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Booking = require('./models/Booking');
const Contact = require('./models/Contact');
const MenuItem = require('./models/MenuItem');
const jwt = require('jsonwebtoken');
const User = require('./models/User.js'); 
const bcrypt = require('bcrypt');


const app = express();
app.use(express.json()); 

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/restaurantDB')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));


// Server listening
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Split to get token

    if (!token) return res.sendStatus(401); // If there's no token, return Unauthorized

    jwt.verify(token, 'your_secret_key', (err, decoded) => {
        if (err) return res.sendStatus(403); // If token is invalid, return Forbidden
        req.userId = decoded.id; // Attach user ID to request
        next(); // Proceed to the next middleware
    });
};


// Booking route
app.post('/api/booking', (req, res) => {
    const newBooking = new Booking(req.body);
    newBooking.save()
      .then(booking => res.status(201).json(booking))
      .catch(err => res.status(400).json({ error: err.message }));
  });

// Contact route
app.post('/api/contact', async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.status(201).json(newContact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get Contacts for admin only
app.get('/api/contact', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
);

// Get all menu items
app.get('/api/menu', async (req, res) => {
    try {
        const menuItems = await MenuItem.find();
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add new menu item (admin only)
app.post('/api/menu', async (req, res) => {
    try {
        const newItem = new MenuItem(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
        
    }
});

// Delete menu item (admin only)
app.delete('/api/menu/:id', async (req, res) => {
    try {
        const item = await MenuItem.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        await item.remove();
        res.status(200).json({ message: 'Item deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Register route
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10); 
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login route
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user || user.password !== password) {

            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, 'your_secret_key', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get all users 
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// logout
app.post('/api/logout', (req, res) => {
    res.json({ token: null });
});

// Get all bookings
app.get('/api/booking', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete booking by ID
app.delete('/api/booking/:id', authenticateToken, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        await booking.remove();
        res.status(200).json({ message: 'Booking deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


