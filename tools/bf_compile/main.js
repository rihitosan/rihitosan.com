
var code = ""; //ソースコード
var asm_main = ""; //アセンブラのメイン処理のソースコード。

var plus_n = 0; //"+"の記号が連続したときの"+"の個数（一度にポインタに代入する値）
var minus_n = 0; //plus_nの"+"が"-"になっただけ
var loop_n = 0; //今まで読み込んだループ"["の数
var input_n = 0; //今まで読み込んだ","入力の数

function compile(){
    //初期化
    code = ""
    asm_main = ""
    plus_n = 0
    minus_n = 0
    loop_n = 0
    input_n = 0
    get_code = document.getElementById("codearea").value

    //不要なものを抜く
    for(var i = 0;i < get_code.length;i++){
        if(get_code[i]=="+"||get_code[i]=="-"||get_code[i]==">"||get_code[i]=="<"||get_code[i]=="["||get_code[i]=="]"||get_code[i]=="."||get_code[i]==","){
            code += get_code[i]
        }
    }
    
    //compile
    for(var i = 0;i < code.length;i++){
        switch(code[i]){
            case "+":
                if(code.length - i != 1){　//これが一番最後の文字でないなら

                    if(code[i+1] == "+"){ //次の記号が+なら
                        plus_n += 1
                    }else{
                        //一度の代入を終わる
                        plus_n += 1
                        asm_main += "MOV CL,[SI]\n"
                        +"ADD CL,"+plus_n+"\n"
                        +"MOV BYTE [SI],CL\n\n"
                        plus_n = 0
                    }
                }else{
                    plus_n += 1
                    asm_main += "MOV CL,[SI]\n"
                    +"ADD CL,"+plus_n+"\n"
                    +"MOV BYTE [SI],CL\n\n"
                }
                break;

                case "-":
                    if(code.length - i != 1){　//これが一番最後の文字でないなら
    
                        if(code[i+1] == "-"){ //次の記号が-なら
                            minus_n += 1
                        }else{
                            //一度の代入を終わる
                            minus_n += 1
                            asm_main += "MOV CL,[SI]\n"
                            +"SUB CL,"+minus_n+"\n"
                            +"MOV BYTE [SI],CL\n\n"
                            minus_n = 0
                        }
                    }else{
                        minus_n += 1
                        asm_main += "MOV CL,[SI]\n"
                        +"SUB CL,"+minus_n+"\n"
                        +"MOV BYTE [SI],CL\n\n"
                    }
                    break;

            case ">":
                asm_main += "ADD SI,1\n\n"
                break;
            case "<":
                asm_main += "SUB SI,1\n\n"
                break;
            case "[":
                loop_n += 1
                asm_main += "loop"+loop_n+":\n"
                break;
            case "]":
                asm_main += "MOV CL,[SI]\n"
                +"CMP CL,0\n"
                +"JNE loop"+loop_n+"\n\n"
                break;
            case ".":
                asm_main += "MOV AL,[SI]\n"
                +"MOV AH,0x0e\n"
                +"MOV BX,15\n"
                +"INT 0x10\n\n"
                break;
            case ",":
                input_n += 1
                asm_main += "input"+input_n+":\n"
                +"MOV AH,0x01\n"
                +"INT 0x16\n"
                +"JE input"+input_n+"\n"
                +"XOR AH,AH\n"
                +"INT 0x16\n"
                +"MOV BYTE [SI],AL\n\n"
                break;
            default:
                break;
        }
    }

    //出力
    document.getElementById("outarea").value = "ORG 0x7c00\n\n"

    +"MOV CL,0\n"
    +"MOV SI,pointer ;pointer\n\n"
    
    +";main program\n"
    +"main:\n"

    +asm_main+"\n"

    +";finish program\n"
    +"fin:\n"
    +"HLT\n"
    +"JMP fin\n\n"
    
    +";pointer\n"
    +"pointer:\n\n"
    
    +"TIMES 510-($-$$) DB 0\n\n"
    
    +"DB 0x55,0xAA"
}