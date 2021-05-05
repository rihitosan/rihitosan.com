
console.log(document.getElementById("code").innerHTML)
var text_code = document.getElementById("code").innerHTML
var read = ""

var a_type,aaa_type

function redirect(){
    location.href="./home.html";
}

function a(){
    var i = 0
    while(true){
        if(text_code[0] == "\n"){
            document.getElementById("main").innerHTML += read+"<br>"
            read = ""
            text_code = text_code.slice(1)
            break;
        }else{
            if(text_code == ""){
                break;
            }else{
                read += text_code[0]
                text_code = text_code.slice(1)
                i += 1
            }
        }
    }
var elm = document.documentElement;
//scrollHeight ページの高さ clientHeight ブラウザの高さ
var bottom = elm.scrollHeight - elm.clientHeight;
//垂直方向へ移動
window.scroll(0, bottom);
if(text_code == ""){
    clearInterval(a_type);
    setTimeout("redirect()",5)
}
}


var a_type = setInterval(a,20)