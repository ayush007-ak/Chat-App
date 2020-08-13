const socket =io('http://localhost:8000');
//Get DOM elemts in a js variables 
const form =document.getElementById('send-container');
const messageInput= document.getElementById('messageInp')
 const messageContainer = document.querySelector(".container")
 var audio = new Audio('funny_notification.mp3');



//functio which will apend event info to the container
const append=(message,position )=>{
    const messageElement = document.createElement('div')    //html div jsa ha bs isne createlemt lia ha
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);

    if(position =='left'){
        audio.play();
    }
    
}


//eventlistner  //form submit hue to server ko message bhe dia jaega
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`you: ${message}`, 'right') ;
       socket.emit('send', message);                     //template latral se variable ko stringke beech ma daldo
      messageInput.value=''
    })

    //ask user his her name and let server know
 const name= prompt("Enter your name to join");
socket.emit('new-user-joined', name)  //event ha yeh choda ha jisse dusre activity lele
 

//if new user joined recieve her/her name
 socket.on('user-joined', name=>{

    append(`${name} joined the chat`, 'right')

 })


 //if server sent message receive
 socket.on('receive', data=>{

    append(`${data.name}: ${data.message}`, 'left')

 })



 //if user leaves hows the chat message append info to container
 socket.on('left', name=>{

    append(`${name} left the chat`, 'right')   //event call hora ha index.js ke

 })


 
 