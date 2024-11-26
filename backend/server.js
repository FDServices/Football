const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const Message = require('./models/message');
const setupRoutes = require('./models/setup');
const authMiddleware = require('./middleware/auth');
const Login = require('./models/login');
const Equipment = require('./models/equipment');
const Coach = require('./models/acoaches');
const Schedule = require('./models/schedule');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://foy:foycreationgroup0@ccdemo.gzdydnm.mongodb.net/?retryWrites=true&w=majority&appName=CCDemo', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

  const playerSchema = new mongoose.Schema({
    name: String,
    position: String,
    height: String,
    weight: Number,
    squat: Number,
    bench: Number,
    clean: Number,
    jerk: Number,
    vertical: Number,
    broad: Number,
    mball: Number,
    tenYard: Number,
    tenFly: Number,
    forty: Number,  
    notes: Array,
    userid: String
  });

  const Player = mongoose.model('Player', playerSchema);



  app.post('/players', async (req, res) => {
    const player = new Player(req.body);
    try {
      await player.save();
      res.status(201).send(player);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  // Read Players
  app.get('/players', async (req, res) => {
    try {
      const players = await Player.find();
      res.send(players);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  // Update Player
  app.patch('/players/:id', async (req, res) => {
    try {
      const player = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!player) return res.status(404).send();
      res.send(player);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  // Delete Player
  app.delete('/players/:id', async (req, res) => {
    try {
      const player = await Player.findByIdAndDelete(req.params.id);
      if (!player) return res.status(404).send();
      res.send(player);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  // Assistant Coach CRUD
  app.post('/acoaches', async (req, res) => {
    const coach = new Coach(req.body);
    try {
      await coach.save();
      res.status(201).send(coach);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  app.get('/acoaches', async (req, res) => {
    try {
      const coach = await Coach.find();
      res.send(coach);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  app.patch('/acoaches/:id', async (req, res) => {
    try {
      const coach = await Coach.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!coach) return res.status(404).send();
      res.send(coach);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  app.delete('/acoaches/:id', async (req, res) => {
    try {
      const coach = await Coach.findByIdAndDelete(req.params.id);
      if (!coach) return res.status(404).send();
      res.send(coach);
    } catch (error) {
      res.status(500).send(error);
    }
  });

app.get('/login', async (req,res) => {
  try {
    const user = await Login.find();
  res.send(user);
} catch (error) {
  res.status(500).send(error);

}}
)

  // Create Equipment
  app.post('/equipment', async (req, res) => {
    const equipmentList = req.body;
  
    if (!Array.isArray(equipmentList) || equipmentList.length === 0) {
      return res.status(400).json({ message: 'No equipment data received.' });
    }
  
    try {
      const savedEquipment = [];
  
      // Loop through the equipment list
      for (let i = 0; i < equipmentList.length; i++) {
        const equipment = equipmentList[i];
  
  
        // Instantiate and save each equipment item
        const newEquipment = new Equipment(equipment);
        const savedItem = await newEquipment.save(); // Save and get the saved document
  
        savedEquipment.push(savedItem); // Store the saved document in the array
      }
  
      // Return the full list of saved equipment
      res.status(201).json(savedEquipment);  // Return the entire saved equipment list
    } catch (error) {
      console.error('Error saving equipment:', error);
      res.status(500).json({ message: 'Error saving equipment', error: error.message });
    }
  });
  

// Read Equipment
app.get('/equipment', async (req, res) => {
  try {
    const equipment = await Equipment.find();
    res.send(equipment);
  } catch (error) {
    res.status(500).send(error);
  }
});

 // Delete Equipment
 app.delete('/equipment/:id', async (req, res) => {
  try {
    const equipment = await Equipment.findByIdAndDelete(req.params.id);
    if (!equipment) return res.status(404).send();
    res.send(equipment);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update Equipment
app.patch('/equipment/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
      const equipment = await Equipment.findByIdAndUpdate(id, updates, { new: true });
      if (!equipment) return res.status(404).send('Equipment not found');
      res.json(equipment);
  } catch (error) {
      res.status(500).send('Error updating equipment');
  }
});


//Schedule CRUD
app.post('/schedule', async (req, res) => {
  const schedule = new Schedule(req.body);
  try {
    await schedule.save();
    res.status(201).send(schedule);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/schedule', async (req, res) => {
  try {
    const schedule = await Schedule.find();
    res.send(schedule);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.patch('/schedule/:id', async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!schedule) return res.status(404).send();
    res.send(schedule);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete('/schedule/:id', async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndDelete(req.params.id);
    if (!schedule) return res.status(404).send();
    res.send(coach);
  } catch (error) {
    res.status(500).send(error);
  }
});


// Login Route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Login.findOne({ username });
    if (!user) return res.status(404).send('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid password');

    // Generate JWT
    const token = jwt.sign({ id: user._id, role: user.role }, 'b7bcb99b7f5b42133a0ed4d54969e859cce95d129944350f71c86e1a86a0cf96cebf508cee2b3d9cfbdcb86d356a8222010a72936d617b1f3da504399006667f49113c228a769f16a17c97793ff541c06ddf76220437ad374abdbda2aa05f0abfb94f81372e88f5800029ec9f91cf2eaae063b254c434a1c1c62c9f856d4078f27fc13947b1badc29619dafe711774cdffe7d952d8bf5e0d841ec97a4fe2e76eeb92e8a7c4c3085c8868c91962407e066be0cb5ab20d567e440a56dffda8a189c0907a2ea3387c26a94c4927c395ca1716d8a4a2345d150f3014e0e0558ef38bd9d0e743f326bbe067ec543ab3bcd00664d28c77c80bcba3c196442045bb4729', { expiresIn: '1h' });
    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).send('Error logging in');
  }
});

// Get all messages with user information
app.get('/message', async (req, res) => {
  try {
    // Populate the 'user' field with 'username' and 'role' from the Login model
    const messages = await Message.find().populate('user', 'username role');
    res.send(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).send(error);
  }
});



// Create a message (with user association)
app.post('/message',authMiddleware(['Coach', 'Player']), async (req, res) => {
  const { content } = req.body;
  const userId = req.user.id; // This comes from the decoded token

  const message = new Message({ content, user: userId });
  try {
    // Save the message
    await message.save();
    // Populate the user field after saving
    const populatedMessage = await Message.findById(message._id).populate('user', 'username role');
    res.status(201).send(populatedMessage);
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(400).send(error);
  }
});

// Delete a message
app.delete('/message', async (req, res) => {
  try {
    const messageId = req.query.id; // Access the ID from the query parameters
    console.log('Attempting to delete message with ID:', messageId); // Log the ID being used

    // Check if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(messageId)) {
      console.log('Invalid ObjectId format');
      return res.status(400).send('Invalid ID format');
    }

    const deletedMessage = await Message.findByIdAndDelete(messageId);

    if (!deletedMessage) {
      console.log('Message not found');
      return res.status(404).send('Message not found');
    }

    console.log('Message deleted successfully');
    res.status(200).send('Message deleted');
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).send(error);
  }
});

// Welcome Route
app.get('/', (req, res) => {
  res.send('Welcome to the Football Player Management API!');
});

app.use('/setup', setupRoutes); 

  // Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  