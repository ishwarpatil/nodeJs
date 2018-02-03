  var socket = io();
  socket.on('connect',()=>{
    console.log("Connected to server...");
  });

  socket.on('disconnect',()=>{
    console.log("Disconnected from server...");
  });

  socket.on('newMessage',(message)=>{
    console.log("New Message :- ",message);
  });

  // socket.emit('createMessage',{
  //   from:'pooja',
  //   text:'college'
  // },(data)=>{
  //   console.log('Go it :- ',data);
  // });




