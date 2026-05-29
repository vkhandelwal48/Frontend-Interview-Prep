const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    methods: ['GET', 'POST'], // Allow these HTTP methods
}));

app.use(express.json());

app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from Express! CORS is working.' });
});

app.post('/api/user', (req, res) => {
  res.json({ received: req.body });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
