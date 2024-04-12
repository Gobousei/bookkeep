        var url     = "https://script.google.com/macros/s/AKfycbxnyXizScM3kaCEaVSodUyfWuOtGhHZDatZnYs5gouj8co0wG8yoIEybbvdfhXyu0z4_g/exec";
        var refarence = {
            "inside": ["error","その他","仕送り","アルバイト","特別報酬",],
        
            "outside": ["error","その他","食費","日用品費","被服費","美容費","医療費","交際費","娯楽費"]
          };

        if(inout==1||inout==2){
        var type;
        var detail;
        var price;
        var modal = document.getElementById('modal');
        modal.style.display = 'none';
        var options;
        if(inout==1){
        options = refarence.inside;
        }else if(inout==2){
        options = refarence.outside;
        };
        var count = options.length-1;
        let i=0;
        var lim =options.length-1;
        const types = document.getElementById('type');
        while(i<lim){
          let now = options[i+1];
          let add_code = `<option value="${i+1}">${now}</option>`;
          types.insertAdjacentHTML( 'beforeend', add_code);
          i++;
        };//End create input options
        
        var requrl = url+'?inout=4';
        fetch(requrl , {
            method: "GET",
          }).then(response => response.text())
          .then(text => {
            var balance = document.getElementById('balance');
            balance.innerText='今月の収支：'+text;
            if(Number(text)<5000){
              balance.classList.add('has-text-danger');
            }else{
              balance.classList.add('has-text-primary');
            }
          });//End fetch

        function show(){
          type    = document.getElementById('type').value;
          detail  = document.getElementById('detail').value;
          price   = document.getElementById('price').value;
          var typenumber = Number(type);
          var typearray = refarence.outside;
          var typestring = typearray[typenumber];
          document.getElementById('typeconfirm').innerText  = typestring;
          document.getElementById('detailconfirm').innerText= detail;
          document.getElementById('priceconfirm').innerText = price;
          modal.style.display = 'flex';
        }

        function hide(){
          modal.style.display = 'none';
        }

        function formsubmit(){
          document.getElementById('submit_button').classList.add('is-loading');
          type    = document.getElementById('type').value;
          detail  = document.getElementById('detail').value;
          price   = document.getElementById('price').value;
          var param   = `?inout=${inout}&type=${type}&detail='${detail}&value=${price}`;
          var fullurl = url+param;
          fetch(fullurl , {
            method: "GET",
          }).then(response => response.text())
          .then(text => {
            if(text=='success'){
              window.location.reload();
            }
          })
        }
        function formclear(){
          window.location.reload();
        }

    }// End input script
    
        //**Service Worker( PWA関係 ) */
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.register('sw.js').then(function(registration) {
            // 登録成功
            console.log('Registering serviceworker was succeed. scope: ', registration.scope);
          }).catch(function(err) {
            // 登録失敗
            console.log('Registering serviceworker was faild. ', err);
          });
        }