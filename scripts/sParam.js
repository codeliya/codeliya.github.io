
      var jqs = function(sParam) {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split("&");
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split("=");
            if (sParameterName[0] === sParam) {
              return sParameterName[1];
            }
          }
      };
    window.jqs = jqs;
    var name = decodeURI(jqs("sender"));
    if (typeof jqs("sender") === "undefined") {
      name = "";
    }
    var checkName = function() {
      if (name.length !== 0) {
        name = name.replace(/-/g, " ");
        // console.log("name is there", name);
        document.querySelector("#user_name").innerHTML = name;
        document.querySelector("#user_slide").innerHTML = name+" की तरफ से आपको और आपके परिवार को नववर्ष 2025 की हार्दिक शुभकामनायें !!";
        document.querySelector("#codeliya_it-show-name").innerHTML = name;
        document.querySelector("#codeliya_it-fromMessage").innerHTML= ""
      } else {

      }
    };

    checkName();

    var createGreeting=function(){
      gtag('event', 'click', {
            'event_category': 'interaction',
            'event_label': 'goButtonClicked',
      });

      sname=document.getElementById("nameTextBox").value;
      sname=sname.replace(/@/g,"-")
      sname=sname.replace(/%40/g,"-")
      sname=sname.replace(/\./g,"-")
      if(sname.trim()!=""){
        document.querySelector("#formBox").style.display = "none";
        document.querySelector(".footerbtn").style.display = "block";
        document.querySelector("#user_name").innerHTML = sname;
        document.querySelector("#user_slide").innerHTML = sname+" की तरफ से आपको और आपके परिवार को नववर्ष 2025 की हार्दिक शुभकामनायें !!";
        document.querySelector("#codeliya_it-show-name").innerHTML = sname;
        document.querySelector("#codeliya_it-fromMessage").innerHTML= ""
        window.scrollTo(0,0);
      }else {
        alert ("कृपया पहले अपना नाम टाइप करें");
        document.getElementById("nameTextBox").focus();
      }
    }

    var shareActionWA = function() {
      gtag('event', 'click', {
            'event_category': 'interaction',
            'event_label': 'shareOnWhatsAppClicked',
      });

      var shareString = "";
      var whatsappHref;
      shareString += "*"+sname+"*";

      
      shareString +=" ने आपको एक 🤩 *मजेदार* संदेश भेजा है, इस खास *संदेश* ✉ को देखने के लिए नीचे दिये गए *ब्लू लाइन* को टच करके देखो%0A👇👇"
      shareString +=(window.location.href.split("?")[0] + "?sender=" + sname).replace("#", "").replace(/ /g, "-");
     

      whatsappHref = "whatsapp://send?text=" + shareString;
      window.location.href = whatsappHref;

    };
    var countDownDate=new Date("01 January, 2025 00:00:00").getTime(),x=setInterval(function(){var e=(new Date).getTime(),o=countDownDate-e,t=Math.floor(o/864e5),n=Math.floor(o%864e5/36e5),a=Math.floor(o%36e5/6e4),l=Math.floor(o%6e4/1e3);document.getElementById("codeliya_it").innerHTML=t+"<font color='black'> दिन,</font> "+n+"<font color='black'> घंटे,</font> "+a+"<font color='black'>  मिनट,<br></font> "+l+"<font color='black'> सेकंड <spna style='color:red'>पहले</span> </font>",o<0&&(clearInterval(x),document.getElementById("codeliya_it").innerHTML="")},1e3);
