//recuperar o canvas
const canvas = document.querySelector('#meuCanvas');

//gerar o contexto
const ctx = canvas.getContext('2d');

//canvas
canvas.width = 1000;
canvas.height = 500;

const keys = [];
//Player 
const player = {
  x: 310,
  y: 280,
  width: 27,//32
  height: 26,//48
  frameX: 0,
  frameY: 0,
  speed: 9,
  moving: false
};

//Player-2
const player2 = {
  x: 670,
  y: 280,
  width: 27,//32
  height: 26,//48
  frameX: 0,
  frameY: 0,
  speed: 9,
  moving: false
};

//IMAGENS USADAS
const playrSprite = new Image();
playrSprite.src = "./src/assets/img/characters/robot1.png";//c3po1.png

const playrSprite2 = new Image();
playrSprite2.src = "./src/assets/img/characters/robot2.png";

const background = new Image();
background.src = "./src/assets/img/backgrond/boxring.png";

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
  ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}
//IMAGENS USADAS

//MOVIMENTAÇÃO
window.addEventListener("keydown", function (e) {
  keys[e.keyCode] = true;
  player.moving = true;
  player2.moving = true;
});

window.addEventListener("keyup", function (e) {
  delete keys[e.keyCode];
  player.moving = false;
  player2.moving = false;
});

//player 1
function movePlayer() {
  if (keys[38] && player.y > 200) {//up
    player.y -= player.speed;
    player.frameY = 3;
    player.moving = true;
  }
  if (keys[37] && player.x > 0) {//left
    player.x -= player.speed;
    player.frameY = 1;
    player.moving = true;
  }
  if (keys[40] && player.y < canvas.height - player.height) {//down
    player.y += player.speed;
    player.frameY = 0;
    player.moving = true;
  }
  if (keys[39] && player.x < canvas.width - player.width) {//right
    player.x += player.speed;
    player.frameY = 2;
    player.moving = true;
  }
}

//player 2
function movePlayer2() {
  if (keys[87] && player2.y > 200) {//up
    player2.y -= player2.speed;
    player2.frameY = 3;
    player2.moving = true;
  }
  if (keys[65] && player2.x > 0) {//left
    player2.x -= player2.speed;
    player2.frameY = 1;
    player2.moving = true;
  }
  if (keys[83] && player2.y < canvas.height - player2.height) {//down
    player2.y += player2.speed;
    player2.frameY = 0;
    player2.moving = true;
  }
  if (keys[68] && player2.x < canvas.width - player2.width) {//right
    player2.x += player2.speed;
    player2.frameY = 2;
    player2.moving = true;
  }
}
//MOVIMENTAÇÃO

function handlePlayerFrame() {
  if (player.frameX < 3 && player.moving) player.frameX++
  else player.frameX = 0;

  if (player2.frameX < 3 && player2.moving) player2.frameX++
  else player2.frameX = 0;
}

let fps, fpsInterval, startTime, now, then, elapsed;

function startAnimating(fps) {
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;
  animate();
}

function animate() {
  requestAnimationFrame(animate);
  now = Date.now();
  elapsed = now - then;
  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    drawSprite(
      playrSprite,
      player.width * player.frameX,
      player.height * player.frameY,
      player.width,
      player.height,
      player.x, player.y,
      player.width,
      player.height
    );
    drawSprite(
      playrSprite2,
      player2.width * player2.frameX,
      player2.height * player2.frameY,
      player2.width,
      player2.height,
      player2.x, player2.y,
      player2.width,
      player2.height
    );
    movePlayer();
    movePlayer2();
    handlePlayerFrame()
  }
}
startAnimating(10);

/* função para a atualizar a tela - requestAnimationFrame(chamar a propria , meuCanvas)
function animate() {
  ctx2.clearRect(0, 0, meuCanvas2.width, meuCanvas2.height);
  ctx2.drawImage(background, 0, 0, meuCanvas2.width, meuCanvas2.height);
  drawSprite(
    playrSprite,
    player.width * player.frameX,
    player.height * player.frameY,
    player.width,
    player.height,
    player.x, player.y,
    player.width,
    player.height
  );
  movePlayer();
  handlePlayerFrame()
  requestAnimationFrame(animate);
}
animate(); */

//audio
var music = document.getElementById("music");
var isPlaying = false;
music.volume = 0.2;
function togglePlay() {
  if (isPlaying) {
    music.pause()
  } else {
    music.play();
  }
};
music.onplaying = function() {
  isPlaying = true;
  document.getElementById("music-animation").classList.add('on')
};
music.onpause = function() {
  isPlaying = false;
  document.getElementById("music-animation").classList.remove('on')
};

var button = document.getElementById("toggle");
button.addEventListener('click', function() {
  if (button.getAttribute("data-text-swap") == button.innerHTML) {
    button.innerHTML = button.getAttribute("data-text-original");
  } else {
    button.setAttribute("data-text-original", button.innerHTML);
    button.innerHTML = button.getAttribute("data-text-swap");
  }
}, false);