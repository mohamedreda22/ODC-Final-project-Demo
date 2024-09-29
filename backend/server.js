const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Booking = require('./models/Booking');
const Contact = require('./models/Contact');
const MenuItem = require('./models/MenuItem');
const User = require('./models/User.js'); 
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');

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

app.get('/api/categories', (req, res) => {
    // Fetch or return categories here
    res.json([
        { id: 1, name: 'Breakfast' },
        { id: 2, name: 'Main Dishes' }, 
        { id: 3, name: 'Desserts' },
        { id: 4, name: 'Drinks' }
    ]);
});

// Set up storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Uploads folder where images are stored
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

  // Init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // Limit size to 1MB
    fileFilter: function (req, file, cb) {
      // Check file type
      const filetypes = /jpeg|jpg|png|gif/;
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = filetypes.test(file.mimetype);
  
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb('Error: Images Only!');
      }
    }
  }).single('image'); // 'image' should match the form field name
  

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

// Get Contacts for admin only
app.get('/api/contact', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

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
// Add new menu item (with file upload)
app.post('/api/menu', (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        return res.status(400).json({ message: err });
      }
        // Ensure `req.file` exists before trying to access it
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
          }

      // Create a new menu item with the file path
      const { name, description, price, category } = req.body;
      const newItem = new MenuItem({
        name,
        description,
        price,
        category,
        image: req.file.filename // Save only the filename in the database
      });
  
      newItem.save()
        .then(item => res.status(201).json(item))
        .catch(err => res.status(500).json({ message: err.message }));
    });
  });

  // Serve static files (uploads)
app.use('/uploads', express.static('uploads'));
/* app.post('/api/menu', async (req, res) => {
    try {
        const newItem = new MenuItem(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}); */

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
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Token generation is removed
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Get all users 
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Logout
app.post('/api/logout', (req, res) => {
    res.json({ message: 'Logged out successfully' });
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
app.delete('/api/booking/:id', async (req, res) => {
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
