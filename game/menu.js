 /**menu html */
 var html = "<p>menu</p>"
            +"hello"

 document.getElementById("menu").innerHTML=html
/**************************************************************** */

 /**dropdown menu html */
 /**<nav class="nav">
            <ul class="drop_menu">
            <li><a href="リンク先URL">メニュー1</a>
              <ul>
              <li><a href="リンク先URL">子メニュー1</a>
              <li><a href="リンク先URL">子メニュー2</a>
              </ul>
            <li><a href="リンク先URL">メニュー2</a>
            <li><a href="リンク先URL">メニュー3</a>
            </ul>
            </nav> */
var d_menu_html = '<nav class="nav">'
+'<ul class="drop_menu">'
+'<li><a href="https://rihitosan.github.io/game">Game</a>'
+'  <ul>'
+  '<li><a href="game/1">敵を棒で叩いて倒すやつ</a>'
+ '</ul>'
+'<li><a href="blog">blog</a>'
+'<li><a href="https://rihitosan.github.io">Home</a>'
+'  <ul>'
+'</nav>'

 document.getElementById("d_menu").innerHTML=d_menu_html
