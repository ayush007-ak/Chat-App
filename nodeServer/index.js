//Node server jo handle karega sab socket io connections

const io = require('socket.io')(8000)

const users ={};
//if any user joins, let other users connected to the server know
io.on('connection', socket=>{
    socket.on('new-user-joined', name=>{
       // console.log("New user", name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined' , name);
    });

                                                                         //if someone is sending chat mesaage
    socket.on('send', message=>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]}) //sabko bata do message recieve kr wado
    });
           
    //some leaves the chat 
    socket.on('disconnect', message=>{
        socket.broadcast.emit('left',  users[socket.id]); //user ko bataega ki chat chodh chuka ha
        delete users[socket.id];
    });







})






