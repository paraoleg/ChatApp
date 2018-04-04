const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
let Users = require('./server/models/users');

// Get our API routes
const api = require('./server/routes/api');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', api);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('new connection');

  const newUserId = Date.now();
    
  const newUser = { 
    id: newUserId,
    name: 'New user' + newUserId,
    description: 'Lorem ipsum dolor sit amet',
    status: true,
    image: 'https://image.flaticon.com/icons/svg/145/145852.svg',
    messages: []
  }
  console.log(newUser.id);
  Users.push(newUser);
  
  socket.emit('userData', Users);

  socket.on('join', data => {
    socket.join(data.room);
    console.log(data.user + " joined")
    socket.emit('userData', Users);
    socket.broadcast.to(data.room).emit('new user joined', {author: data.user, text:"has joined"})
  });

  socket.on('message', data => {

    newMessage = {
      id: Date.now(),
      author:data.currentUserName,
      text:data.message,
      date: data.date 
    }
   
    Users.forEach((user) => {
      if(data.toid == user.id){

      switch (data.toid) {
      case 11:
        io.in(data.currentUserId).emit('new message', {author: user.name, text:data.message, date: Date.now()})
        break;
      case 12:
        setTimeout(() => io.in(data.currentUserId).emit('new message', {author: user.name, text:data.message.replace('x', 'y'), date: Date.now()}), 3000);
        break;
      }
      
      return user.messages.push(newMessage);
    }
    });
    
        
    console.log(data);
    socket.broadcast.to(data.toid).emit('new message', newMessage);

  });

  socket.on('disconnect', () => {
    console.log('user gone');
      Users = Users.filter(user => {
        return newUserId !== user.id;
      });
  });
});



/// Listen on provided port, on all network interfaces.
server.listen(port, () => console.log(`API running on localhost:${port}`));

