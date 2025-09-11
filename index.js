const app = require('./app');
const connectDB = require('./config/db');
const port = 3001;


// Connect to MongoDB
connectDB();

app.listen(port, ()=> {
    console.log('running on http://localhost:3001')
});