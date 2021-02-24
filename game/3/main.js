var canvas = document.getElementById("main")
var ctx = canvas.getContext("2d")

//canvasの大きさを画面サイズに合わせる
canvas.width = document.documentElement.clientWidth-10;
canvas.height = document.documentElement.clientHeight-25;

var game_play = true   //gameを実行する変数

//map
var map_data;

//block
var block_x = []  //blockのx座標
var block_y = []  //blockのy座標
var block_s = canvas.height / 13    //blockのサイズ
var block_dis = canvas.height / 13.5  //blockとblockの距離

//enemyのいろいろ
//enemyの座標
var enemy_x = [0,0,0]
var enemy_y = [0,0,0]
//enemyの速さ
var enemy_dx = [-2,-2,-2]
var enemy_dy = [0,-2,0]
//enemyのサイズ
var enemy_s = block_s/1.2

//move_enemy
var move_enemy_x = []
var move_enemy_y = []

var move_enemy_dx = [0,0,0,0,0,0,0,0,0,0]
var move_enemy_dy = [-2,-2,-2,-2,-3,-3,-3,-3,-3]
var move_enemy_s = block_s

//sniperのいろいろ
//sniperを描く
var sniper_x = []
var sniper_y = []

//sniperのサイズ
var sniper_s = block_s

//goal
var goal_x = []
var goal_y = []

//blockの座標
var goal_s = block_s
var goal_n = 1  //goalの個数

//playerのいろいろ
var player_w = block_s - 2  //playerの横
var player_h = block_s - 2  //playerの縦
var player_x = 150  //playerのx
var player_y = 200  //player のy
var player_speed = 2
var player_dx = player_speed
var player_dy = 0

var d_px = 0    //playerのデフォルト座標x
var d_py = 0    //playerのデフォルト座標y

var life = 3    //playerのlife

var level_now = 1

// ビジーwaitを使う方法
function sleep(waitMsec) {
    var startMsec = new Date();
   
    // 指定ミリ秒間だけループさせる（CPUは常にビジー状態）
    while (new Date() - startMsec < waitMsec);
}

//player描画
function player_draw(){
    ctx.beginPath()
    ctx.rect(player_x,player_y,player_w,player_h)
    ctx.fillStyle="#00ff00"
    ctx.fill()
    ctx.closePath()
}

//block描画
function block_draw(){
    for (var i = 0;i < block_x.length;i++){//複数描画する為forを使っていいる
        ctx.beginPath()
        ctx.rect(block_x[i],block_y[i],block_s,block_s)
        ctx.fillStyle="#aaaaaa"
        ctx.fill()
        ctx.closePath()
    }
}
//enemyを描画 
function enemy_draw(){
    for(var i = 0;i < enemy_x.length;i++){
        ctx.beginPath()
        ctx.rect(enemy_x[i],enemy_y[i],enemy_s,enemy_s)
        ctx.fillStyle = "#ff0000"
        ctx.fill()
        ctx.closePath()
    }
}
//move_enemy
function move_enemy_draw(){
    for(var i = 0;i < move_enemy_x.length;i++){
        ctx.beginPath()
        ctx.rect(move_enemy_x[i],move_enemy_y[i],move_enemy_s,move_enemy_s,)
        ctx.fillStyle="#ff5500"
        ctx.fill()
        ctx.closePath()
    }
}
//sniperを描画
function sniper_draw(){
    for(var i = 0;i < sniper_x.length;i++){
        ctx.beginPath()
        ctx.rect(sniper_x[i],sniper_y[i],sniper_s,sniper_s)
        ctx.fillStyle="#ff00ff"
        ctx.fill()
        ctx.closePath()
    }
}
//goalを描画
function goal_draw(){
    for(i = 0;i < goal_x.length;i++){
        ctx.beginPath()
        ctx.rect(goal_x[i],goal_y[i],goal_s,goal_s)
        ctx.fillStyle="#ffff00"
        ctx.fill()
        ctx.closePath()
    }
}

//残りのlifeを描画
function life_draw(){
    ctx.font = "48px UTF-8"
    ctx.fillStyle = "#0000ff"
    ctx.fillText("life:"+life,10,50)

}

//blockとplayerの衝突感知sys
//return false・・・衝突していない true・・・している
function b_collision(){
    var collision = false //衝突判定 
    for(var i = 0;i < block_x.length;i++){
        if(/*blockより上にいるかつ左にいる*/block_y[i] + block_s > player_y&& /*blockより下にいるかつ右にいる*/block_x[i] + block_s >player_x &&block_y[i] < player_y+player_h&& block_x[i] <player_x+player_w){
            console.log("衝突しました!")
            collision = true
        }
    }
    //sniperの衝突判定
    for(var i = 0;i < sniper_x.length;i++){
        if(/*sniperより上にいるかつ左にいる*/sniper_y[i] + sniper_s > player_y&& /*sniperより下にいるかつ右にいる*/sniper_x[i] + sniper_s >player_x &&sniper_y[i] < player_y+player_h&& sniper_x[i] <player_x+player_w){
            console.log("衝突しました!")
            collision = true
        }
    }
    return collision
}

//enemyとplayerが衝突した。
function e_collision(){
    var collision = false //衝突判定
    var c_list_n = 0 //あたったenemyの個体番号(リストの番号)
    for(var i = 0;i < enemy_x.length;i++){
        if(/*blockより上にいるかつ左にいる*/enemy_y[i] + enemy_s > player_y&& enemy_x[i] + enemy_s >player_x &&/*blockより下にいるかつ右にいる*/enemy_y[i] < player_y+player_h&& enemy_x[i] <player_x+player_w){
            console.log("enemyとplayerが衝突しました。")
            collision = true
            c_list_n = i
        }
    }
    return [collision,c_list_n] //戻り値を複数にするためにリストにしている
}

//goal
function g_collision(){
    var collision = false //衝突判定
    var c_list_n = 0 //あたったgoalの個体番号(リストの番号)
    for(var i = 0;i < goal_x.length;i++){
        if(/*goalより上にいるかつ左にいる*/goal_y[i] + goal_s > player_y&& goal_x[i] + goal_s >player_x &&/*goalより下にいるかつ右にいる*/goal_y[i] < player_y+player_h&& goal_x[i] <player_x+player_w){
            console.log("goalとplayerが衝突しました。")
            collision = true
            c_list_n = i
        }
    }
    return [collision,c_list_n] //戻り値を複数にするためにリストにしている
}

//move_enemyがplayerに触れたら
function me_collision(){
    var collision = false //衝突判定
    var c_list_n = 0 //あたったenemyの個体番号(リストの番号)
    for(var i = 0;i < move_enemy_x.length;i++){
        if(/*blockより上にいるかつ左にいる*/move_enemy_y[i] + move_enemy_s > player_y&& move_enemy_x[i] + move_enemy_s >player_x &&/*blockより下にいるかつ右にいる*/move_enemy_y[i] < player_y+player_h&& move_enemy_x[i] <player_x+player_w){
            console.log("move enemyとplayerが衝突しました。")
            collision = true
            c_list_n = i
        }
    }
    return [collision,c_list_n] //戻り値を複数にするためにリストにしている
}

//move_enemyがblockに触れたら
function me_b_collision(){
    var collision = false //衝突判定
    var c_list_n = 0 //あたったenemyの個体番号(リストの番号)
    for(var j = 0;j < block_x.length;j++){
        for(var i = 0;i < move_enemy_x.length;i++){
            if(/*blockより上にいるかつ左にいる*/move_enemy_y[i] + move_enemy_s > block_y[j]&& move_enemy_x[i] + move_enemy_s >block_x[j] &&/*blockより下にいるかつ右にいる*/move_enemy_y[i] < block_y[j]+block_s&& move_enemy_x[i] <block_x[j]+block_s){
                console.log("enemyとblockが衝突しました。")
                collision = true
                c_list_n = i
            }
        }
    }
    return [collision,c_list_n] //戻り値を複数にするためにリストにしている
}

//memo***************

//休憩(衝突の図解)
/*
    block_x[i]+block_s   O
    block_y[i]+block_s   O
            ↓            O
            Paaaaaaaaaaaaaaaaaaaaaa
            a            O
            a            O
            a            O
  OOOOOOOOOOaOOOOOOOOOOOOP ← block_x[i]
            a            ↑
            a            ↑
            a            ↑
            a            block_y[i]                   こんな感じ（´・ω・｀）つ www ニンジン
 o                                                                           OOO
*/

//キー押されたときの処理
document.onkeydown = function(e){
    console.log(e.key)
    if(e.key == "ArrowRight" || e.key == "Right"){//→
        player_dx = player_speed
        player_dy = 0
    }
    if(e.key == "ArrowLeft" || e.key == "Left"){//←
        player_dx = -player_speed
        player_dy = 0
    }
    if(e.key == "ArrowUp" || e.key == "Up"){//↑
        player_dx = 0
        player_dy = -player_speed
    }
    if(e.key == "ArrowDown" || e.key == "Down"){//↓
        player_dx = 0
        player_dy = player_speed
    }
}
//描画処理
function draw(){
    if(game_play){

        ctx.clearRect(0,0,canvas.width,canvas.height)
        block_draw()    //block描画
        player_draw()   //player
        enemy_draw()    //enemy
        sniper_draw()   //sniper
        life_draw()     //life
        goal_draw()     //goal
        move_enemy_draw()

    
        //はじに触れたら跳ね返る
        //上下
        if(player_y + player_dy < 0 || player_y + player_dy > canvas.height-player_h){
            player_dy = -player_dy
        }
        //左右
        if(player_x + player_dx < 0 || player_x + player_dx > canvas.width-player_w){
            player_dx = -player_dx
        }

        //blockに触れたら
        if(b_collision()){
            player_dx = -player_dx 
            player_dy = -player_dy
        }

        var e_return = e_collision()    //enemyの戻り値
        //playerとenemyがあたったら
        if(e_return[0]){
            //ぶつかったenemyを削除
            /*
            enemy_x.splice(e_return[1],1)
            enemy_y.splice(e_return[1],1)
            enemy_dx.splice(e_return[1],1)
            enemy_dy.splice(e_return[1],1)
            */
            //playerのlifeを削る
            restart()
    
            //使い方間違っていたのでmemo
            //list.splice(開始位置,指定文字数)
        }

        //move_enemyに触れたら
        var me_return = me_collision()
        if(me_return[0]){
          //playerのlifeを削る
          restart()
        }
        //goalに触れたら
        var g_return = g_collision()
        if(g_return[0]){
            //当たったgoalを削除
            goal_x.splice(g_return[1],1)
            goal_y.splice(g_return[1],1)
            //goalの残りの個数をなくす
            goal_n -= 1
        }

        //move enemyがblockに触れたら
        var me_b_return = me_b_collision()
        if(me_b_return[0]){
            move_enemy_dx[me_b_return[1]] = -move_enemy_dx[me_b_return[1]]
            move_enemy_dy[me_b_return[1]] = -move_enemy_dy[me_b_return[1]]
        }
        //enemyを動かす
        for(var e = 0;e < enemy_x.length;e++){
    
            enemy_x[e] += enemy_dx[e]
            enemy_y[e] += enemy_dy[e]
        }
        //move_enemyを動かす
        for(var me = 0;me < move_enemy_x.length;me++){
            move_enemy_x[me] += move_enemy_dx[me]
            move_enemy_y[me] += move_enemy_dy[me]
        }

        //playerを動かす
        player_x += player_dx
        player_y += player_dy

        //game over
        if(life <= 0){
            game_play = false   //ゲームを止める
            game_over()
        }

        //game clear
        if(goal_n <= 0){
            game_clear()
        }

    }
}
var draw_Interval = setInterval(draw,10)

//sniperからレーザー(enemy)を発射する関数
function make_enemy(){
    for(var e = 0;e < sniper_x.length;e++){
        enemy_x.push(sniper_x[e])
        enemy_y.push(sniper_y[e])
        enemy_dx.push(enemy_dx[e])
        enemy_dy.push(enemy_dy[e])
    }
}
setInterval(make_enemy,1200)//1秒おきに実行

function restart(){
    life -= 1
    player_x = d_px
    player_y = d_py
}
function game_over(){
    ctx.font = canvas.height/9+"px UTF-8"
    ctx.fillStyle="#ff0000"
    ctx.fillText("GAME OVER",canvas.width/3,canvas.height/2)
}

function game_clear(){
    ctx.font = canvas.height/9+"px UTF-8"
    ctx.fillStyle="#ffff00"
    ctx.fillText("GAME CLEAE!",canvas.width/3,canvas.height/2)

    level_now += 1  //レベルを上げる
    life += 1 //lifeに1追加
    level_change(level_now)
}

//ステージを描画する
function make_map(){
    //iは行 (x座標でもある)
    //jは列 (y座標でもある)
    for(var i = 0;i < map_data.length;i++){     //行を読み込む
        for(var j = 0;j < map_data[i].length;j++){  //列を読み込む
            switch(map_data[i][j]){
                case "#":   //今読んでいる行列が#なら block
                    block_x.push(j * block_dis + block_dis)     //読み込んでいる列 * blockとblockの幅 + blockとblockの幅
                    block_y.push(i * block_dis + block_dis)     //読み込んでいる行 * blockとblockの幅 + blockとblockの幅
                break;

                case "s":   //sniper
                    sniper_x.push(j * block_dis + block_dis)
                    sniper_y.push(i * block_dis + block_dis)
                break;
                case "m":
                    move_enemy_x.push(j * block_dis + block_dis)
                    move_enemy_y.push(i * block_dis + block_dis)
                break;
                case "p":
                    d_px = j * block_dis + block_dis
                    d_py = i * block_dis + block_dis

                    player_x = j * block_dis + block_dis
                    player_y = j * block_dis + block_dis
                break;
                case "g":
                    goal_x.push(j * block_dis + block_dis)
                    goal_y.push(i * block_dis + block_dis)
                default:
                break;

            }
        }
    }
}

//レベルを変える
function level_change(level){
    reset()
    switch(level){
        case 2:
            goal_n = 1

            enemy_dx = [0,4,0,-6]
            enemy_dy = [-2,0,1,0]

            map_data = [
                ["#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#"],
                ["#"," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ","#"],
                ["#"," "," "," "," "," "," "," "," "," "," "," "," "," "," ","s"," "," "," "," "," "," "," ","#"],
                ["#"," ","p"," "," "," ","s"," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ","#"],
                ["#"," "," "," "," "," "," "," "," "," "," "," ","s"," "," "," "," "," "," "," "," "," ","g","#"],
                ["#"," "," "," "," "," "," "," "," ","s"," "," "," "," "," "," "," "," "," "," "," "," "," ","#"],
                ["#"," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ","#"],
                ["#"," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ","#"],
                ["#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#"]
            ];
        break;
        case 3:
            goal_n = 2
            move_enemy_dx = [0,0]
            move_enemy_dy = [0.2,2]
            enemy_dx = [-2,2,2,-2]
            enemy_dy = [0,0,0,0]
            map_data = [
                ["#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#"],
                ["#"," "," "," ","#"," ","g"," "," "," ","s","#"," "," "," ","#"," "," ","#"," "," "," "," ","#"],
                ["#"," "," "," ","#"," "," "," "," "," ","#","#"," "," "," "," "," "," "," "," "," "," "," ","#"],
                ["#"," ","p"," ","#"," "," "," "," "," ","s"," "," "," "," "," "," "," "," "," "," "," "," ","#"],
                ["#"," "," "," ","#","#","#","#"," "," ","#"," "," "," ","#","#","#","#","#","#"," "," "," ","#"],
                ["#"," "," "," "," "," "," "," "," "," "," "," "," "," ","#","g"," "," ","#"," "," "," "," ","#"],
                ["#"," "," "," ","m"," "," "," "," "," "," "," "," "," ","#"," "," "," "," "," "," "," "," ","#"],
                ["#"," "," "," "," "," ","#","#","#","#","#","#","#","#","#"," "," "," "," "," "," "," "," ","#"],
                ["#","#","#"," "," "," ","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#"],
                [" "," ","#","#","#","#","#"," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "]
            ];
        break;
        case 4:
            goal_n = 4
            enemy_dx = [2,0,0,-2,-2]
            enemy_dy = [0,2,-2,0,0]
            move_enemy_dx = [0,0,1]
            move_enemy_dy = [-1,-1,0]
            map_data = [
                ["#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#"],
                ["#","s"," "," "," "," "," "," "," ","g"," "," "," "," "," "," "," "," "," "," "," "," ","s","#"],
                ["#"," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ","#"],
                ["#"," "," "," "," "," "," "," ","#"," "," ","#"," "," "," "," "," "," "," "," "," ","m"," ","#"],
                ["#"," "," "," ","#","#","#","#","#"," "," ","#","#","#","#","#"," "," "," "," "," "," ","g","#"],
                ["#"," ","p"," ","#","s","#","#"," "," "," ","#"," "," "," "," "," "," "," "," "," ","#","#","#"],
                ["#"," "," "," ","#","#"," "," "," "," "," ","#"," "," "," "," "," "," "," "," "," "," "," ","#"],
                ["#"," "," "," "," "," "," "," "," "," ","#","#"," "," ","m"," ","#","#","g"," "," ","m"," ","#"],
                ["#"," "," "," "," "," "," "," ","#","#","#"," "," "," "," "," ","#"," "," "," "," "," "," ","#"],
                ["#"," "," "," "," "," "," "," ","#","s"," "," ","g"," ","#","#","#"," "," "," "," "," ","s","#"],
                ["#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#"]
            ];
        break;
        case 5:
            goal_n = 3
            enemy_dx = [-2,2,0,-2,2]
            enemy_dy = [0,0,-2,0,0]
            move_enemy_dx = [0,0,2]
            move_enemy_dy = [1,1,0]
            map_data = [
                ["#","#","#","#","#"," "," "," ","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#"],
                ["#"," "," "," ","#"," "," "," ","#"," "," "," ","#"," ","s"," "," "," "," "," "," "," "," ","#"],
                ["#"," "," "," ","#"," "," "," ","#"," "," ","#"," ","#"," "," ","g"," "," "," "," "," "," ","#"],
                ["#"," ","p"," ","#"," "," "," ","#"," ","#"," "," "," ","#"," "," ","#"," "," ","#"," "," ","#"],
                ["#"," "," "," ","#","#","#","#","#","#"," "," "," "," "," ","#","#","#"," "," ","#"," "," ","#"],
                ["#"," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ","#","#","#","#"," ","g","#"],
                ["#"," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ","#"," "," ","#"," "," ","#"],
                ["#"," "," "," "," "," "," "," "," "," "," "," ","m"," "," "," "," ","#"," "," ","#"," "," ","#"],
                ["#"," "," "," ","#","#","#","#","s","#"," "," "," "," ","#"," "," ","#","#","#","#"," "," ","#"],
                ["#"," "," "," ","#"," "," "," ","#"," ","#"," "," "," ","#"," "," "," "," "," "," "," "," ","#"],
                ["#"," "," ","g","#"," "," "," ","#"," ","s","#","#","s"," "," "," "," "," "," "," "," "," ","#"],
                ["#","#","#","#","#"," "," "," ","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#"]
                
            ];
        break;
        default:
            game_play = false //ゲームを止める
        break;
    }
    sleep(700)
    make_map()
}

//リセット
function reset(){
block_x = []
block_y = []
enemy_x = []
enemy_y = []
enemy_dx = []
enemy_dy = []
move_enemy_x = []
move_enemy_y = []
move_enemy_dx = []
move_enemy_dy = []
sniper_x = []
sniper_y = []
goal_x = []
goal_y = []
}
//このページを読み込んだら
window.onload = function(){
    map_data = [
        ["#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#"],
        ["#"," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ","#"],
        ["#"," "," "," "," "," "," "," "," "," "," "," "," "," "," ","m"," "," "," "," "," "," "," ","#"],
        ["#"," ","p"," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ","#"],
        ["#"," "," "," "," "," "," "," "," "," "," "," ","m"," "," "," "," "," "," "," "," "," ","g","#"],
        ["#"," "," "," "," "," "," "," "," ","m"," "," "," "," "," "," "," "," "," "," "," "," "," ","#"],
        ["#"," "," "," "," "," ","m"," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ","#"],
        ["#"," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," ","#"],
        ["#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#","#"]
    ];
    make_map()
}

/*memo このゲーム改造するためにはmap_dataだけを改造するのではなく
置いたキャラクターにdx dyの要素があるものには、
そのキャラクターのdx dyにキャラクターの数だけ速さを入れなければならない
*/