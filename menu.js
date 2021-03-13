 /**menu html */
 var html = ""

if(document.getElementById("menu") != null){
  document.getElementById("menu").innerHTML=html
}
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
+'<div class="ue_menu">'
+'<a class="ue_ml" href="https://rihitosan.com/game">Game</a>'
+'<a class="ue_ml" href="https://rihitosan.com/blog">blog</a>'
+'<a class="ue_ml" href="https://qiita.com/rihitosan">qiita</a>'
+'<a class="ue_ml" href="https://rihitosan.com">Home</a>'
+'</div>'

if(document.getElementById("d_menu") != null){
  document.getElementById("d_menu").innerHTML=d_menu_html
}

document.bgColor = "#dfe6f0";


//下のメニュー
var menu_sita = ''
+'<h2 style="color:#ffffff;">Menu</h2>'
+'<h3>記事一覧</h3>'
+'<li><a href="https://rihitosan.com/blog/js_shooting2.html">javascriptでシューティングゲームみたいなものを作る②</li>'
+'<li><a href="https://rihitosan.com/blog/js_shooting3.html">javascriptでシューティングゲームみたいなものを作る③</li>'
+'<li><a href="https://rihitosan.com/blog/new-tab-kakkoyoku.html">新規タブをかっこよくする拡張機能を作ろう</li>'

if(document.getElementById("menu_sita") != null){
  document.getElementById("menu_sita").innerHTML = menu_sita
}
