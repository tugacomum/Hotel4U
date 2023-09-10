const express = require('express');

const app = express();

const dbConfig = require('./db');
const roomsRoute = require('./routes/roomsRouter');
const usersRoute = require('./routes/usersRouter');
const bookingsRoute = require('./routes/bookingsRouter');
const hotelsRoute = require('./routes/hotelsRouter');

app.use(express.json());
app.use('/api/rooms', roomsRoute);
app.use('/api/users', usersRoute);
app.use('/api/bookings', bookingsRoute);
app.use('/api/hotels', hotelsRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));