const express = require('express');
const path = require('path');
const http = require('http');

let Users = require('./server/models/users');

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

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
  Users.push(newUser);
    
  io.emit('userData', Users);
  socket.emit('currentUser', Users[Users.length - 1]);

  socket.on('join', data => {
    socket.join(data.room);
    console.log(data.user + " joined")
  });

  socket.on('message', data => {

    let date = new Date().toLocaleString('en-US', { 
      hour: 'numeric', 
      minute: 'numeric', 
      hour12: true 
    });

    newMessage = {
      id: Date.now(),
      author:data.currentUserName,
      text:data.message,
      date: data.date 
    }
    console.log(newMessage);
   
    Users.forEach((user) => {
      if(data.toid == user.id){
        switch (data.toid) {
        case 11:
          return io.in(data.currentUserId).emit('new message', {
            author: user.name, 
            text:data.message, 
            date: date
          })
          break;
        case 12:
          return setTimeout(() => io.in(data.currentUserId).emit('new message', {
            author: user.name, 
            text:data.message.split("").reverse().join(""), 
            date: date
          }), 3000);
          break;
        }
      return user.messages.push(newMessage);
    }});
            
    console.log(data);
    socket.broadcast.to(data.toid).emit('new message', newMessage);
  });

  socket.on('disconnect', () => {
    console.log('user gone');
      Users = Users.filter(user => {
        return newUserId !== user.id;
      });
  });

  setInterval(() => {
    io.in(newUserId).emit('new message', {
      author: "Spam Bot", 
      text:"Спам", 
      date: new Date().toLocaleString('en-US', { 
        hour: 'numeric', minute: 'numeric', hour12: true 
      })
    })}, randomInteger(10000, 120000));

  function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }

});


/// Listen on provided port, on all network interfaces.
server.listen(port, () => console.log(`Server running on localhost:${port}`));

