//game main file
'use strict';

var canvas = document.getElementById("main")
var ctx = canvas.getContext("2d")

var paddleWidth = canvas.width/1.6;   //paddle横
var paddleHeight = canvas.height/5;  //paddle縦
var px = canvas.width;  //paddle 位置
var rightPressed = false;   //paddle右に移動
var leftPressed = false;    //paddle左に移動

var ball_x = [canvas.width/2];
var ball_y = [canvas.height - 30];
var ball_dx = [2];  //ball動き速さx
var ball_dy = [-2]; //ball動き速さy
var ballRadius = 10;    //ball半径
var score = 0;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//paddle描画
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(px, canvas.height/1.05, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

//ball描画
function drawBall(){
  for(var i = 0;i < ball_x.length;i++){
    ctx.beginPath();
    ctx.arc(ball_x[i],ball_y[i],ballRadius,0,Math.PI*2)
    ctx.fillStyle = "ffff00";
    ctx.fill();
    ctx.closePath();
  }
}

//キーが押されたとき
function keyDownHandler(e) {
  //→キー
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    //←キー
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

//キーが離された時
function keyUpHandler(e) {
  //→キー
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    //←キー
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}
function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = ""+canvas.height/13+"px UTF-8";
  ctx.fillText("score:"+score, 10, canvas.height/13+2);

  if(score % 3 == 0){
    
  }
  for(var i = 0;i < ball_x.length;i++){
      drawBall();
  drawPaddle();
  //移動
    if(rightPressed && px < canvas.width-paddleWidth) {
        px += 7;  //右
    }
    else if(leftPressed && px > 0) {
        px -= 7;  //左
    }
    //壁に当たったら跳ね返る
    //横
    if(ball_x[i] + ball_dx[i] > canvas.width-ballRadius || ball_x[i] + ball_dx[i] < ballRadius) {
        ball_dx[i] = -ball_dx[i];
    }
    //縦
    if(ball_y[i] + ball_dy[i] < ballRadius) {
        ball_dy[i] = -ball_dy[i];
    }else if(ball_y[i] + ball_dy[i] > canvas.height - ballRadius){// 下に触れた
       if(ball_x[i] > px && ball_x[i] < px + paddleWidth){  //paddleに触れた
         ball_dy[i] = -ball_dy[i];
         score += 1;

         //ballをもう一つ作る
         var x = Math.floor( Math.random() * (3 + -3 - -3) ) + -3 ;
         var y = Math.floor( Math.random() * (3 + -3 - -3) ) + -3 ;

         ball_x.push(canvas.width/2)
         ball_y.push(canvas.height - 30)
         ball_dx.push(x)
         ball_dy.push(y)
         console.log(ball_x)
       }else{
         alert("GAME OVER")
         document.location.reload();
         clearInterval(interval);
       }
    }


    ball_x[i] += ball_dx[i];
    ball_y[i] += ball_dy[i];
  }
}
var interval = setInterval(draw, 10);
//初期化
window.onload = function()
{
  //canvasを画面のサイズに合わせる
  //height
  canvas.height=document.documentElement.clientHeight-25;
  //width
  canvas.width=document.documentElement.clientWidth-25;
  draw();
}