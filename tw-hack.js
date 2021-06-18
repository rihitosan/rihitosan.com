/*
これはjavascriptから取得できるtwitter乗っ取りアプリ名リストです。
不適切な言葉が含まれておりますが、ご了承ください。
定期的に変更していきます。
*/

var app_info = document.getElementsByClassName("app-info")[0].textContent //アプリ名が入ってる要素を取得

var n_list = ["あなたの価値早見表",
"コミュニケーション能力テスト",
"あなたの性的情報一覧",
"あなたにあるもの、ないもの",
"リアル結婚年齢",
"世界最強の顔採点大診断！",
"顔面センター試験",
"セック○診断",
"あなたは一生何人と♡♡をする？",
"エッチ度検査",
"あなたの顔採点",
"最新型 『顔面採点診断』",
"あなたの性的嗜好一覧",
"Popularity App.",
"twinewss",
"バズ情報局！",
"TWIPICKS"]
    
    
    for(var i = 0;i < n_list.length;i++){ //n_listの数回ループ
       if(app_info.indexOf(n_list[i]) != -1){ //乗っ取りアプリの名前が含まれてたら
        document.getElementById("var_share").textContent = "1"
       }
    }