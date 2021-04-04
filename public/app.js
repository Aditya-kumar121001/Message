const socket = io();

let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message_area');


textarea.addEventListener('keyup', (e) =>{
    if(e.key === "Enter"){
        sendMessage(e.target.value);
    }
});

function sendMessage(message){
    let msg = {
        message: message.trim()
    }
    //append
    appendMessage(msg, 'outgoing');
    textarea.value = '';
    scrollToBotttom();

    //send to server
    socket.emit('message', msg)
}

function appendMessage(msg, type){
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');

    let markup = `
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup;

    messageArea.appendChild(mainDiv);
}

//receive

socket.on('message', (msg) => {
    appendMessage(msg, 'incoming');
    scrollToBotttom();
});

function scrollToBotttom(){
    messageArea.scrollTop = messageArea.scrollHeight;
}