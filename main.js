
console.log(document.getElementById("code").innerHTML)
var text_code = document.getElementById("code").innerHTML

var a_type,aaa_type

function a(){
    while(true){
        if(text_code[0] == "\n"){
            document.getElementById("main").innerHTML += text_code[0]+"<br>"
            text_code = text_code.slice(1)
            break;
        }else{
            if(text_code == ""){
                break;
            }else{
                document.getElementById("main").innerHTML += text_code[0]
                text_code = text_code.slice(1)
                break;
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
    location.href="./home.html"
}
}
var a_type = setInterval(a,20)
