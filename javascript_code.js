	 	function darkt_theme() {
			document.getElementsByTagName("HTML")[0].innerHTML=document.getElementsByTagName("HTML")[0].innerHTML.replace(/#faf9fa/g , "#0e0c13");
			document.getElementsByTagName("HTML")[0].innerHTML=document.getElementsByTagName("HTML")[0].innerHTML.replace(/white/g , "#17141f");
			document.getElementsByTagName("HTML")[0].innerHTML=document.getElementsByTagName("HTML")[0].innerHTML.replace(/black/g , "#c3c1c8");
			document.getElementsByTagName("HTML")[0].innerHTML=document.getElementsByTagName("HTML")[0].innerHTML.replace(/#e5e3e8/g , "#2e2b35");
		}
		
		function light_theme() {
			document.getElementsByTagName("HTML")[0].innerHTML=document.getElementsByTagName("HTML")[0].innerHTML.replace(/#0e0c13/g , "#faf9fa");
			document.getElementsByTagName("HTML")[0].innerHTML=document.getElementsByTagName("HTML")[0].innerHTML.replace(/#17141f/g , "white");
			document.getElementsByTagName("HTML")[0].innerHTML=document.getElementsByTagName("HTML")[0].innerHTML.replace(/#c3c1c8/g , "black");
			document.getElementsByTagName("HTML")[0].innerHTML=document.getElementsByTagName("HTML")[0].innerHTML.replace(/#2e2b35/g , "#e5e3e8");
		}

		function getCookie(cname) {
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for(var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
			}
		}
		return "";
	}

    var user=getCookie("theme");
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {  
    document.getElementsByTagName("HTML")[0].innerHTML = this.responseText;
    if (user == "dark") { 
		darkt_theme();
    }
	}
  };
  xhttp.open("GET", "https://script.google.com/macros/s/AKfycbyn-ObGJyWxvfQqMTW3RdjuLbm_gZrJ816wQhvLRkRMFIewGKU/exec", true);
  xhttp.send();

	if (user == "dark") { 
			darkt_theme();
	}
	if (user == "light") { 
			light_theme();
    }
	


