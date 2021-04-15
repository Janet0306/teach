const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const router = require('./routes/api/topics');
const cors = require('cors');

const app = express();


// Connect Database
connectDB();

// Init Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/topics', require('./routes/api/topics'));


//app.use('client/public/uploads', express.static(path.join(__dirname, "/public/uploads")))

app.use('/uploads', express.static('uploads'));


router.get('/download/:name', async (req, res) => {
  try {
    var file = __dirname + '/public/download/' + req.params.name + '.txt';
    res.download(file);
    
  } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
  }
})


//Serve static assets in production
if (process.env.NODE_ENV === 'production') {
   //Set static folder
  app.use(express.static('client/build'));

  app.get('/*', (req, res) => {
   res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
