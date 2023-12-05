'use strict';

let gameChatBox = document.getElementById('gameChatBox'),
    chatInputBox = document.getElementById('chatInputBox'),
    playerBox = document.getElementById('playerBox')


let username = "홍길동"
let usertext = '하하하'
let c;

makeUserBox()

function makeUserBox() {
  fetch("http://localhost:3000/user")
  .then(response => response.json())
  .then( (userData)=>{
    console.log(userData)
    playerBox.innerHTML=``;
    for (let i = 0 ; i < userData.length ; i++){
      playerBox.innerHTML += `
        <div class="playerStatus">
            <img src="${userData[i].img}">
            <p>${userData[i].name}</p>
        </div>
      `;
    }
  })
}

function refreshChatBox() {
    fetch("http://localhost:3000/chating")
    .then(response => response.json())
    .then( (json) => {
      gameChatBox.innerHTML='';
        for (let i = 0 ; i < json.length ; i++){
            gameChatBox.innerHTML+=`<p><span>${json[i].name}</span>${json[i].text}</p>`
        }
    })
    .then(()=>{
      gameChatBox.scrollTop = gameChatBox.scrollHeight;
    })
}

function postChat() {
    fetch("http://localhost:3000/chating", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: username,
    text: chatInputBox.value
  })
})
.then(()=>{
  refreshChatBox()
  chatInputBox.value='';
})
}

async function deleteChat(num) {
  fetch("http://localhost:3000/chating")
  .then(response => response.json())
  .then((chating) => {
    
  })
}
function a(){
  fetch("http://localhost:3000/chating")
  .then(response => response.json())
  .then( (json) => {
    json.splice(1,10)
  })
} 

