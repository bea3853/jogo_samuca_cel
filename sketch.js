let bg;
let tree, treeImg;
let cloud1, cloud2, cloudGroup;
let chao, chaoImg;
let rafaelImg, oliviaImg, wesImg, thauanImg;
let rafael, olivia, thauan;
let pc, pcImg;
let gameState = 1;
let stoneImg;
let pc2;
let subindo1;
let t;
let mariofont;
let perdeu = "Poxa, Perdeu!";
let gameOver;
let gameO;
let customImg; // Variável para a imagem personalizada

function preload() {
  cloud1 = loadImage("assets/nuvens 1.png");
  cloud2 = loadImage("assets/nuvens 2.png");
  chaoImg = loadImage("assets/chao.png");
  treeImg = loadImage("assets/arvore.png");
  pc2 = loadImage("assets/finalruim.png");
  oliviaImg = loadImage("assets/olivia.png");
  rafaelImg = loadImage("assets/rafael.png");
  thauanImg = loadImage("assets/thauan.png");
  wesImg = loadImage("assets/wes.png");
  som1 = loadSound("assets/win.mp3");
  som2 = loadSound("assets/finalfeliz2.mp3");
  pcImg = loadAnimation("assets/andando1.png", "assets/andando2.png", "assets/parado.png");
  stoneImg = loadImage("assets/stone.png");
  heartImg = loadImage("assets/h.png");
  subindo1 = loadAnimation("assets/subindo1.png", "assets/subindo2.png");
  mariofont = loadFont("assets/SuperMario256.ttf");
  customImg = loadImage("assets/customImg.png"); // Carregar a imagem personalizada

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  tree = createSprite(190, 300);
  tree.addImage(treeImg);
  tree.velocityY = 3;

  heart = createSprite(150, 50);
  heart.addImage(heartImg);
  heart.scale = 0.1;

  // gameO = createSprite(200,150);
  // gameO = addImage(gameOver);
  // gameO.scale =  1;
  // gameO.visible  =  false

//   chao = createSprite(700, 500, 250, 20);
//   chao.addImage(chaoImg);
//   chao.scale = 1.9;

  pc = createSprite(500, 539, 15, 15);
  pc.addAnimation("pc", pcImg);
  pc.addAnimation("subindo", subindo1);
  pc.addAnimation("pc2", pc2);
  pc.scale = 0.1;
  pc.setCollider("circle", 0, 0, 200);
  // pc.debug = true;

  stoneGroup = createGroup();
  cloudGroup = createGroup();
}

function draw() {
  background("lightBlue");
  textSize(25);
  textStyle(BOLD);
  textFont(mariofont);
  fill("white");

  // texto adicional


  if (tree.y > 400) {
    tree.y = 190;
  }

  if (gameState === 1) {
    textSize(20);
    textFont(mariofont);
    fill(255, 0, 0);
    textStyle(BOLD);

    if ((keyDown(UP_ARROW) || touches.length > 0) && pc.position.x < 388) {
      pc.changeAnimation("subindo", subindo1);
      pc.position.y -= 2;
      touches = [];
    }

    if (keyDown(DOWN_ARROW)) {
      pc.position.y += 2;
    }

    if (keyDown(LEFT_ARROW)) {
      pc.position.x -= 2;
    }

    if (keyDown(RIGHT_ARROW)) {
      pc.position.x += 2;
    }

    clouds();
    createBox();

    if (heart.isTouching(pc)) {
      pc.changeAnimation("pc2", pc2);
      window.location.href = "https://bea3853.github.io/cartao_samuca/"; // Substitua pela URL desejada
         
    
  
    }

    if (stoneGroup.collide(pc) || cloudGroup.collide(pc)) {
      pc.velocity.y = 10;
      som2.play();
      gameState = 2;
    }
  } else if (gameState === 2) {
    window.location.href = "https://bea3853.github.io/cartao_samuca/";
    pc.changeAnimation("pc2", pc2);
    cloudGroup.setVelocityXEach(0);
    stoneGroup.destroyEach();
    tree.velocityY = 0;
    textSize(30);
    fill(255, 255, 255);
    textStyle(BOLD);
    t = text('Poxa, perdeu', 15, 300);


    
  }

  drawSprites();

    text('Leve o Samuca no S2', 15, 30);
}

function clouds() {
  if (frameCount % 200 === 0) {
    var cloud0 = createSprite(0, 100, 40, 10);
    cloud0.velocity.x = 3;
    cloud0.position.y = random(60, 150);
    cloud0.scale = 0.3;
    var r = Math.round(random(1, 2));
    switch (r) {
      case 1:
        cloud0.addImage(cloud1);
        break;
      case 2:
        cloud0.addImage(cloud2);
        break;
      default:
        break;
    }
    cloud0.lifetime = 390;
    cloudGroup.add(cloud0);
  }
}

function createBox() {
  if (frameCount % 80 == 0) {
    var box = createSprite(50, 90, 60, 60);
    box.addImage(stoneImg);
    box.y = Math.round(random(0, 200)) * 2;
    box.x = Math.round(random(10, 350));
    box.velocityY = 7;
    box.lifetime = 180;
    stoneGroup.add(box);
  }
}

function winmsg() {
  textSize(40);
  fill(255, 0, 0);
  textStyle(BOLD);
  textFont(mariofont);

  te.depth = te2.depth;
  te2.depth = tree;
  te.depth = 0.1;
  te2.depth = 0.1;

  stoneGroup.destroyEach();
  som1.play();
  cloudGroup.velocityX = 0;
  stoneGroup.velocityX = 0;
  stoneGroup.velocityY = 0;
}

function touchMoved() {
  if (touches.length > 0) {
    var touch = touches[touches.length - 1];
    pc.position.x = touch.x;
    pc.position.y = touch.y;
    return false;
  }
}
