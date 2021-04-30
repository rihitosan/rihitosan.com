var url = "https://rihitosan.com/"

logo_img_html = ''
+ '<a href="'+url+'" class="menu_link" style="float:left;">Home</a>'
+ '<a href="'+url+'/game" class="menu_link">Game</a>'
+ '<a href="'+url+'/blog" class="menu_link">Blog</a>'
+ '<a href="qiita.com/rihitosan" class="menu_link">Qiita</a>'
+ '<a href="github.com/rihitosan" class="menu_link">Github</a>'

if(document.getElementById("logo_img").innerHTML != null){
    document.getElementById("logo_img").innerHTML = logo_img_html
}

sita_menu_html = ''
+'<span style="margin-left:70px;">© 2021 Rihtito</span>'

if(document.getElementById("sita_menu") != null){
    document.getElementById("sita_menu").innerHTML = sita_menu_html
}
