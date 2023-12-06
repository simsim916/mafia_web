'use strict';

let playerStatus;
let gameChatBox = document.getElementById('gameChatBox'),
  chatInputBox = document.getElementById('chatInputBox'),
  timeBoxSky = document.getElementById('timeBoxSky'),
  timeBoxSun = document.getElementById('timeBoxSun'),
  timeBoxMoon = document.getElementById('timeBoxMoon'),
  playerBox = document.getElementById('playerBox')

  
let selectedPlayer;
let username = "홍길동"
let usertext = '하하하'
let c;
let nightTime = 10,
  dayTime = 10;

makeUserBox()

function makeNight() {
  timeBoxMoon.style.transition =`${dayTime}s`
  timeBoxMoon.style.transform ="translateX(900px)"
  timeBoxSky.style.transition = `${dayTime}s`
  timeBoxSky.style.backgroundPosition ="0px"
  setTimeout(()=>{
    timeBoxSun.style.transition = "0s"
    timeBoxSun.style.transform ="translateX(0px)";
  },dayTime*1000)
}

function makeDay() {
  timeBoxSky.style.transition = `${nightTime}s`
  timeBoxSky.style.backgroundPosition = "900px"
  timeBoxSun.style.transition = `${nightTime}s`
  timeBoxSun.style.transform = "translateX(900px)"
  timeBoxSun.style.zIndex = "2"
  setTimeout(() => {
    timeBoxSun.style.zIndex = "0"
    timeBoxMoon.style.transition = "0s"
    timeBoxMoon.style.transform = "translateX(0px)";
    timeBoxSky.style.transition = "0s"
    timeBoxSky.style.backgroundPosition = "-900px"
  }, nightTime*1000)
}

function showVoted(){

}

function makeVote(){
  for(let i = 0 ; i < playerStatus.length ; i++){
    playerStatus[i].setAttribute('onclick', "votePlayer(event)");
  }
}

function removeVote(){
  for (let i = 0; i < playerStatus.length; i++) {
    playerStatus[i].removeAttribute('onclick');
  }
}

// function getVote(){
//   fetch("http://localhost:3000/user")
//   .then(response=>response.json())
//   .then(user=>{
//     for(const i in user){
//       if (user[i].name == selectedPlayer.children[1].innerText){
//         user[i].select.
//       }
//     }
//   })
//   // fetch("http://localhost:3000/user", {
//   //   method: "PUT",
//   //   headers: {
//   //     "Content-Type": "application/json",
//   //   },
//   //   body: JSON.stringify({
//   //      })
//   // })
  

// }

function votePlayer(event){
  let targetBOX = event.target.closest('.playerStatus');
  if(selectedPlayer)selectedPlayer.classList.remove("selected")
  targetBOX.classList.add("selected")
  selectedPlayer=targetBOX;
}

function makeUserBox() {
  fetch("http://localhost:3000/user")
    .then(response => response.json())
    .then((userData) => {
      playerBox.innerHTML = ``;
      for (let i = 0; i < userData.length; i++) {
        playerBox.innerHTML += `
        <div class="playerStatus">
            <img src="${userData[i].img}">
            <p>${userData[i].name}</p>
        </div>
      `;
      }
    })
    .then(()=>playerStatus = document.getElementsByClassName('playerStatus')
    )
}

function refreshChatBox() {
  fetch("http://localhost:3000/chating")
    .then(response => response.json())
    .then((json) => {
      gameChatBox.innerHTML = '';
      for (let i = 0; i < json.length; i++) {
        gameChatBox.innerHTML += `<p><span>${json[i].name}</span>${json[i].text}</p>`
      }
    })
    .then(() => {
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
    .then(() => {
      refreshChatBox()
      chatInputBox.value = '';
    })
}

async function deleteChat(num) {
  fetch("http://localhost:3000/chating")
    .then(response => response.json())
    .then((chating) => {

    })
}
function a() {
  fetch("http://localhost:3000/chating")
    .then(response => response.json())
    .then((json) => {
      json.splice(1, 10)
    })
}

