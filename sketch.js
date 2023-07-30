//Variáveis da Bolinha

let xBolinha=300;
let yBolinha=200;
let diametro=15;
let raio = diametro / 2;

//Velocidade da Bolinha

let velocidadeXBolinha=6;
let velocidadeYBolinha=6;

//Variáveis da Raquete

let xRaquete=5;
let yRaquete=150;
let raqueteComprimento=10;
let raqueteAltura=90;

//Variáveis do Oponente
let xRaqueteOponente=585;
let yRaqueteOponente=150;
let velocidadeYOponente;

let colidiu = false

//Variável Placar do jogo

let meusPontos=0;
let pontosDoOponente=0;

//Variaveis Som do Jogo

let raquetada;
let ponto;
let ost;

function preload () {
  ost = loadSound("trilha.mp3")
  ponto = loadSound ("ponto.mp3")
  raquetada = loadSound ("raquetada.mp3")
}

function setup() {
  createCanvas(600, 400);
  ost.loop();
}

function draw() {
  background(0);
  mostrabolinha();
  movimentabolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  //verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
  bolinhaNaoFicaPresa();
}

function mostrabolinha(){
    circle (xBolinha,yBolinha,diametro);
}

function movimentabolinha(){
  xBolinha += velocidadeXBolinha
  yBolinha += velocidadeYBolinha
}

function verificaColisaoBorda() {
  if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1
  }
  if (yBolinha + raio > height || yBolinha - raio <0){
    velocidadeYBolinha *= -1
  }
}

function mostraRaquete(x, y) {
    rect (x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
  // Vamos limitar a movimentação da raquete para que ela não ultrapasse as bordas:
    yRaquete = constrain(yRaquete, 0, 310);
}

function verificaColisaoRaquete() {
  if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1
    raquetada.play();
  }
}

function verificaColisaoRaquete (x, y) {
  colidiu =
  collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXBolinha *= -1
    raquetada.play();
  }
}

function movimentaRaqueteOponente() {
  //Caso queira Ativar Oponente IA
  //velocidadeYOponente = yBolinha - yRaqueteOponente -raqueteComprimento /2 -30;
  //yRaqueteOponente += velocidadeYOponente
  
  if (keyIsDown(87)){
    yRaqueteOponente -= 10;
  }
  if (keyIsDown(83)){
    yRaqueteOponente += 10;
  }
  // Vamos limitar a movimentação da raquete para que ela não ultrapasse as bordas:
    yRaqueteOponente = constrain(yRaqueteOponente, 0, 310);
}

function incluiPlacar () {
  stroke(255)
  textAlign(CENTER);
  textSize (16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosDoOponente, 470, 26);
}

function marcaPonto () {
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10){
    pontosDoOponente += 1;
    ponto.play();
  }
}

function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 20;
    }
    if (xBolinha + raio > 600){
    xBolinha = 580;
    }
}

