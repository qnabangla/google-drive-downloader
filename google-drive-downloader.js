        var flag = 0;
        $(document).ready(function () {
          blackKit.initDatePicker();
          blackKit.initSliders();
        });

        document.getElementById("link").addEventListener('input', (e)=>{
          document.getElementById("lol").innerHTML = "Start Download"
        })
        function check() {
        if(document.getElementById("lol").innerHTML == "Click here to download" || document.getElementById("lol").innerHTML == "Invalid Link, and Make sure your google drive link visibility is public.")
        {
          return;
        }
          let link = document.getElementById("link").value;
          if (!isValidHttpUrl(link)) {
            document.getElementById("display").click();
            document.getElementById("modal-body").innerHTML = "<h6 style='color: red'>Please enter a valid link. </h6>";
            return

          }

          for (let i = 0; i < 5; i++) {
            setTimeout(function () {
              document.getElementById("lol").innerHTML = "Please Wait " + (6 - i - 1) + " seconds... ";
              if (i == 4) {
                download(link);
              }
            }, i * 1000);

          }
        }
        function isValidHttpUrl(string) {
          let url;

          try {
            url = new URL(string);
          } catch (_) {
            return false;
          }

          return url.protocol === "http:" || url.protocol === "https:";
        }
        function download(link) {
          let file_id = process_link(link);
        
          if (file_id) {
            document.getElementById("lol").href = `https://www.googleapis.com/drive/v3/files/${file_id}?alt=media&key=AIzaSyAA9ERw-9LZVEohRYtCWka_TQc6oXmvcVU&supportsAllDrives=True`;
            document.getElementById("lol").innerHTML = `Click here to download`;
          }
          else {
            document.getElementById("lol").innerHTML = "Sorry! Invalid Link!";
            document.getElementById("lol").href = "#"
            setTimeout(function () {
           location.reload();
            }, 2000);
          }


        }
        function process_link(link) {
          var pattern = /\/d\/(.+?)\//i;
          var results = pattern.exec(link);

          link = (results) ? results[1] : null;

          return link;
        }
