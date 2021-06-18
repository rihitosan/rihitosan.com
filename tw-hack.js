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

//モーダルウィンドウのhtml
var modal_html = (function() {/*
    <div class="modal-wrapper" id="m">
      <a href="#" class="modal-overlay"></a>
      <div class="modal-window">
        <div class="modal-content">
          <div class="title_bar">
            <img style="width:30px;height:30px;" src="data:image/png;base64,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">
          </div>
          <h1 style="color:#f00;">警告</h1>
          <span style="font-size:20px !important;font-weight:700 !important;">このサイトはTwitterを乗っ取る可能性があります。</span><br>
          <p style="padding-top:10px;">この表示は拡張機能の<strong>ストップTwitter乗っ取り！</strong></p>
          <p style="padding-top:20px;">によって表示されています。</p>
          ご安心ください。詐欺ではありません。<br>
          <div style="padding-top:10px;">
            <a href="#" class="btn" style="background:#cc0000;"><svg style="float:left;" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.9522 16.3536L10.2152 5.85658C10.9531 4.38481 13.0539 4.3852 13.7913 5.85723L19.0495 16.3543C19.7156 17.6841 18.7487 19.25 17.2613 19.25H6.74007C5.25234 19.25 4.2854 17.6835 4.9522 16.3536Z"></path>
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10V12"></path>
              <circle cx="12" cy="16" r="1" fill="currentColor"></circle>
            </svg>無視して進む</a>
    
            <a href="http://twitter.com/" class="btn" style="background:#00C851"><svg style="float:left;" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.75 6.75L19.25 12L13.75 17.25"></path>
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 12H4.75"></path>
            </svg>twitterへ戻る</a><br>
            </div>
            <span style="color:#fff !important;position:relative;top:-235px;">ストップTwitter乗っ取り！</span>
        </div>
        <a href="#" class="modal-close">×</a>
      </div>
    </div>
        */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1].replace(/\n|\r/g, ""); //改行するためにこうしている

//モーダルウィンドウのcss
var modal_css = (function() {/*
    <style>
    
    .btn {
      display: inline-block;
      max-width: 180px;
      text-align: left;
      font-size: 16px;
      color: #FFF !important; 
      text-decoration: none;
      font-weight: bold;
      padding: 8px 32px 8px 32px;
      border-radius: 4px;
      position: relative;
    }
    
    .title_bar{
      padding-right:570px;
      background:#333339;
    }
    
    .modal-wrapper {
      z-index: 999;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      padding: 60px 10px;
      text-align: center
    }
    
    .modal-wrapper:not(:target) {
      opacity: 0;
      visibility: hidden;
      transition: opacity .3s, visibility .3s;
    }
    
    .modal-wrapper:target {
      opacity: 1;
      visibility: visible;
      transition: opacity .4s, visibility .4s;
    }
    
    .modal-wrapper::after {
      display: inline-block;
      height: 100%;
      margin-left: -.05em;
      vertical-align: middle;
      content: ""
    }
    
    .modal-wrapper .modal-window {
      box-sizing: border-box;
      display: inline-block;
      z-index: 20;
      position: relative;
      width: 70%;
      max-width: 600px;
      border-radius: 2px;
      background: #fff;
      box-shadow: 0 0 30px rgba(0, 0, 0, .6);
      vertical-align: middle
    }
    
    .modal-wrapper .modal-window .modal-content {
          font-family: "游ゴシック体", "游ゴシック", "Yu Gothic" !important;
    font-weight: 500;
      max-height: 80vh;
      overflow-y: auto;
    }
    
    .modal-overlay {
      z-index: 10;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: rgba(0, 0, 0, .8)
    }
    
    .modal-wrapper .modal-close {
      z-index: 20;
      position: absolute;
      top: 0;
      right: 0;
      width: 35px;
      color: #95979c !important;
      font-size: 20px;
      font-weight: 700;
      line-height: 35px;
      text-align: center;
      text-decoration: none;
      text-indent: 0
    }
    
    .modal-wrapper .modal-close:hover {
      color: #2b2e38 !important
    }
    </style>
        */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1].replace(/\n|\r/g, ""); //改行するためにこうしている
    
    
    for(var i = 0;i < n_list.length;i++){ //n_listの数回ループ
       if(app_info.indexOf(n_list[i]) != -1){ //乗っ取りアプリの名前が含まれてたら
           //警告（モーダルウィンドウ）
           document.body.innerHTML += modal_html //サイトにモーダルウィンドウのhtmlを突っ込む

           var mc = document.createElement("style") //サイトにモーダルウィンドウのcssを突っ込む
           mc.innerHTML = modal_css
           document.body.appendChild(mc)

           location.href="#m" //モーダルウィンドウを表示
       }
    }