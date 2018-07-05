function aktualisido() {

  var d = new Date().getTime();
  return d/1000;
  
}
	
function datesc(b) {
  var b = b.substring(0, 16)+":00Z";
  var utcDate= b;
  var localDate = new Date(utcDate);
  
  var ora = localDate.getHours();
  var perc = localDate.getMinutes();
  var honap = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]; 
  var honapnap = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
  var dat= localDate.getFullYear()+"."+honap[localDate.getMonth()]+"."+honapnap[localDate.getDate()];
  
  return dat;
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

function calcTime(offset) {
  /*Szerveridőbe konvertál*/
  var nd = new Date();
  var utc = nd.getTime() + (nd.getTimezoneOffset() * 60000);
  var d = new Date(utc + (3600000*offset));
  var hour = d.getHours();
  var min = d.getMinutes();
  var aktido = hour*60+min;
  var honap = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]; 
  var honapnap = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"];
  var aktdatum = d.getFullYear()+"-"+honap[d.getMonth()]+"-"+honapnap[d.getDate()]+"T"+honapnap[hour]+":"+honapnap[min]+":00Z";
  return aktdatum; 
}

function timestamp(b) {
  var b = b.substring(0, 16)+":00Z";
  var utcDate= b;
  var localDate = new Date(utcDate);
  var localDate = localDate.getTime()/1000;
  return localDate;
}

function TimeConvert(a) {
  var a = a.substring(0, 16)+":00Z";
  var utcDate= a;
  var localDate = new Date(utcDate);
  
  var ora = localDate.getHours();
  var perc = localDate.getMinutes();
  var masodperc = localDate.getSeconds();
  var honap = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]; 
  var honapnap = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"];
  var dat= localDate.getFullYear()+"."+honap[localDate.getMonth()]+"."+honapnap[localDate.getDate()];
  
  var perc = honapnap[localDate.getMinutes()];
  var ido = ora+":"+perc;
  var kezdes = dat+"<br>"+ido;
  
  
  return kezdes;
}

function http_post(url, callback) {
var http = new XMLHttpRequest();
var params = "[{\"variables\":{\"channelLogin\":\"wearethevr\",\"limit\":20,\"before\":null,\"after\":\""+mikortol+"\",\"sortOrder\":\"ASC\",\"following\":true},\"extensions\":{},\"operationName\":\"EventsPage_EventScheduleQuery\",\"query\":\"query EventsPage_EventScheduleQuery($channelLogin: String!, $limit: Int, $cursor: Cursor, $before: Time, $after: Time, $following: Boolean!, $sortOrder: SortOrder) {  user(login: $channelLogin) {    id    eventLeaves(first: $limit, after: $cursor, criteria: {endsBefore: $before, endsAfter: $after, sortOrder: $sortOrder}) {      pageInfo {        hasNextPage        __typename      }      edges {        cursor        node {          id          self @include(if: $following) {            isFollowing            __typename          }          ... on EventLeaf {            title            startAt            endAt            game {              id              displayName              __typename            }            channel {              id              login              displayName              __typename            }            imageURL(width: 320, height: 180)            __typename          }          __typename        }        __typename      }      __typename    }    __typename  }}\"}]";
http.open('POST', url, true);
/*kérésküldés*/
http.setRequestHeader('Client-ID', 'vpyy1j86wtuetq8b6vbxlmubi0jxoe');
http.setRequestHeader('Content-type', 'application/json');
http.send(params);
http.onreadystatechange = function() {
    if(http.readyState == 4 && http.status == 200) {
			callback(http.responseText);	
	}
}

}

function http_post2(url, params, callback) {
var http = new XMLHttpRequest();
http.open('POST', url, true);
/*kérésküldés*/
http.setRequestHeader('Client-ID', 'vpyy1j86wtuetq8b6vbxlmubi0jxoe');
http.setRequestHeader('Content-type', 'application/json');
http.send(params);
http.onreadystatechange = function() {
    if(http.readyState == 4 && http.status == 200) {
			callback(http.responseText);	
	}
}

}

function http_get(url, callback) {
var http = new XMLHttpRequest();
http.open('GET', url, true);
/*Kérésküldés*/
http.setRequestHeader('Client-ID', 'vpyy1j86wtuetq8b6vbxlmubi0jxoe');
http.setRequestHeader('Content-type', 'application/json');
http.send();
    http.onreadystatechange = function() {
		if(http.readyState == 4 && http.status == 200) {
			callback(http.responseText);		
		}
	}
}

var mikortol = calcTime(0);
var events,live_adat,description_event,events_hossz,livetimestamp,live_allapot,cim_live,cover_live,game_id_s,cim_live,cover_live,modal,span,btn,cookie_settings,theme_status;
var google_calendar_link = [];
var ical_calendar_link = [];
var outlook_calendar_link = [];
var yahoo_calendar_link = [];

http_get("https://api.twitch.tv/helix/streams?user_id=63493039", events_array);

/*Cookie lekérdezések*/
cookie_settings = getCookie("thevrmmcookiepolicysagreement");
if(cookie_settings == 1) {theme_status = getCookie("thevrmm_theme");}

/*http_get live api lekérő meghívja a funkciót és átadja a callback változót*/
function events_array(data) {
	/*Ha még nem erősítette meg a felhasználó, hogy elfogadja e a cookie-kat vagy sem akkor megjeleníti az alsó bannert már itt, hogy gyorsabban megjelenjen!*/
	if((cookie_settings != 1)&(cookie_settings != -1)) { document.getElementById("myCookie").style.display='block';}
	if(theme_status == "light") {
			document.getElementsByClassName("elem").style.backgroundColor="white";
			document.getElementsByClassName("elem").style.border="1px solid #e5e3e8";
			document.getElementsByTagName("body").style.Color="black";
			document.getElementsByTagName("body").style.backgroundColor="#faf9fa";
	}
	live_adat = data;
	live_adat = JSON.parse(live_adat); 
	cover_live=null;
	cim_live=null;
	live_allapot=null;
	game_id_s =null;
	if(live_adat.data.length > 0) {
    cover_live = live_adat.data['0'].thumbnail_url;
    cim_live = live_adat.data['0'].title;
    live_allapot = live_adat.data['0'].type;
    cover_live = cover_live.replace("{width}", "640");
    cover_live = cover_live.replace("{height}", "360");
    game_id_s = live_adat.data['0'].game_id;  /*493057==PUBG*/
	
	var live_start = TimeConvert(live_adat.data['0'].started_at).split("<br>");
	var live_dat = datesc(live_adat.data['0'].started_at);
    livetimestamp = timestamp(live_adat.data['0'].started_at);
	
  }   	
 
   if(live_allapot == "live"){ mikortol = live_adat.data['0'].started_at; }
  
   http_post("https://gql.twitch.tv/gql", events_array2);
}

/*http_post menetrend api lekérő meghívja a funkciót és átadja a callback változót*/
function events_array2(data) {
	events = data;
	events = JSON.parse(events);
	events = events["0"].data.user.eventLeaves.edges;
	events_hossz = events.length;
	
	var jsonstring_d = "[";
  
	for(var i=0; i < events_hossz; i++)
	{
		jsonstring_d += "{\"variables\":{\"eventName\":\""+events[i].node.id+"\"},\"extensions\":{},\"operationName\":\"EventLandingPage_Event\",\"query\":\"query EventLandingPage_Event($eventName: ID!) {  event(id: $eventName) {    __typename    ... on EventLeaf {      ...EventLeafContent      premiere {        ...PremiereContent        __typename      }      __typename    }    ... on EventCollection {      ...EventCollectionContent      __typename    }  }}fragment PremiereContent on Premiere {  status  pastPremiere {    description    __typename  }  __typename}fragment EventLeafContent on EventLeaf {  description  __typename}fragment EventCollectionContent on EventCollection {  description  __typename}\"}";
		if(i < events_hossz-1) { jsonstring_d += ","; }
	}
	jsonstring_d += "]";
	
	http_post2("https://gql.twitch.tv/gql", jsonstring_d, events_array3); 
}

/*http_post2 menetrend részletek api lekérő meghívja a funkciót és átadja a callback változót*/
function events_array3(data) {
description_events = data;
description_events = JSON.parse(description_events);
html_start();
}

	
	
/*Feltölti az üres DIV-eket a menetrendi információkkal*/
function html_start() {
	var idomost = aktualisido();
	var stream_veg,stream_start,stream_extraveg,streamextrastart;
	for (var i = 0; i < events_hossz; i++) {
		var cim_id = i+"_cim";
		var cover_id = i+"_cover";
		var time_id = i+"_time";
		var br_id = i+"_br";
		stream_veg = timestamp(events[i].node.endAt);
		stream_start = timestamp(events[i].node.startAt);
		stream_extraveg = stream_veg+3000;
		streamextrastart = stream_start-3000;
		var eltelt = parseInt((idomost-stream_veg)/60, 10);
		
		
		var cover = events[i].node.imageURL;
		cover = cover.replace("320", "320");
		cover = cover.replace("180", "180");
		
		var start_time = TimeConvert(events[i].node.startAt).split("<br>");
		var end_time = TimeConvert(events[i].node.endAt).split("<br>");
		
		var g_calendar_s = events[i].node.startAt.replace(/-/g, "");
		g_calendar_s = g_calendar_s.replace(/:/g, "");
		
		var g_calendar_e = events[i].node.endAt.replace(/-/g, "");
		g_calendar_e = g_calendar_e.replace(/:/g, "");
		
		var g_calendar_title = events[i].node.title.replace(/ /g, "+");
		var ical_calendar_title = events[i].node.title.replace(/ /g, "%20");
		
		google_calendar_link[i] = "https://calendar.google.com/calendar/r/eventedit?dates="+g_calendar_s+"/"+g_calendar_e+"&details&location&text="+g_calendar_title+"&trp=false&sf=true"
		ical_calendar_link[i] = "https://maestro.io/pkg/lt3-api/4.0/api/calendar/event.ics?alarm="+g_calendar_e+"&details=&end="+g_calendar_e+"&location=&stamp=20180704T213131Z&start="+g_calendar_s+"&title="+ical_calendar_title;
		yahoo_calendar_link[i] = "https://calendar.yahoo.com/?v=60&view=d&type=20&title="+g_calendar_title+"&st="+g_calendar_s+"&et="+g_calendar_e+"&uid=";
		
		document.getElementById(i).style.display='block';
		document.getElementById(br_id).style.display='block';
		document.getElementById(cim_id).innerHTML="<p><b>"+events[i].node.title+"</b></p>";
		document.getElementById(cover_id).innerHTML= "<img src=\""+cover+"\" class=\"aspect__fill\" width=\"320\">";
		document.getElementById(time_id).innerHTML=start_time[0]+"<br>"+start_time[1]+"-"+end_time[1];
		
		if((livetimestamp < stream_veg+3000)&(livetimestamp > stream_start-3000)&(eltelt > 0)&(start_time[0] == end_time[0])){
		  document.getElementById(time_id).innerHTML=start_time[0]+"<br>"+start_time[1]+"-"+end_time[1]+"<font color=\"yellow\"> + "+eltelt+"p</font>";
		}else if(start_time[0] == end_time[0]){
          document.getElementById(time_id).innerHTML=start_time[0]+"<br>"+start_time[1]+"-"+end_time[1];
        } else if((livetimestamp < stream_veg+3000)&(livetimestamp > stream_start-3000)&(eltelt > 0)){
          document.getElementById(time_id).innerHTML= "<div style=\"overflow: hidden; width: 320px;\">    <div style=\"float:left; width: 155px\"><center>"+start_time[0]+"<br>"+start_time[1]+"<font color=\"yellow\"> + "+eltelt+"p</font></center></div>    <div style=\"float:left; margin-left:10px; margin-top:10px\"><center>-</center></div>	<div style=\"overflow: hidden; width: 155px float:right;\"><center>"+end_time[0]+"<br>"+end_time[1]+"</center></div></div>";
        } else {
		  document.getElementById(time_id).innerHTML= "<div style=\"overflow: hidden; width: 320px;\">    <div style=\"float:left; width: 155px\"><center>"+start_time[0]+"<br>"+start_time[1]+"</center></div>    <div style=\"float:left; margin-left:10px; margin-top:10px\"><center>-</center></div>	<div style=\"overflow: hidden; width: 155px float:right;\"><center>"+end_time[0]+"<br>"+end_time[1]+"</center></div></div>";
		}
		
		 if((live_allapot == "live")|((livetimestamp < stream_extraveg)&(livetimestamp > streamextrastart))){
		 document.getElementById("0").style.backgroundColor="#4b367c";
		 document.getElementById("0_cim").innerHTML="<a target=\"_blank\" href=\"https://www.twitch.tv/wearethevr\"><img src=\"https://i.imgur.com/o1kyCnf.png\"></a><br><b>"+cim_live+"</b>";
		 document.getElementById("0_cover").innerHTML= "<a target=\"_blank\" href=\"https://www.twitch.tv/wearethevr\"><img src=\""+cover_live+"\" class=\"aspect__fill\" width=\"320\"></a>";
		 }
	}
 
  // Get the modal ws3school script
modal = document.getElementById('myModal');

// Get the button that opens the modal
btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
span = document.getElementsByClassName("close")[0];
  }
  
  
 /*Részletek megjelenítése és elrejtése*/ 
  function hide_and_show(element_id,i) {
    document.getElementById(element_id).innerHTML="<b>Részletek:</b><br>"+description_events[i].data.event.description+"<br><br><a style=\"cursor: pointer; color: grey; text-decoration: underline;\" onclick=\"modal_open("+i+")\" >Hozzáadás a naptárhoz!</a> ";
	var x = document.getElementById(element_id);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }

}

  /*Popup ablak megnyitó*/ 
 function modal_open(i) {
	cookie_settings = getCookie("thevrmmcookiepolicysagreement");
    modal.style.display = "block";
	if(typeof i === typeof 3) {document.getElementById("popup_content").innerHTML="<b>Hozzáadás a naptáradhoz:</b><br><br><a href=\""+google_calendar_link[i]+"\"><img src=\"https://vignette.wikia.nocookie.net/logopedia/images/9/9d/Google_logo_white_2015.svg\" class=\"aspect__fill\" width=\"87\"></a>&nbsp;&nbsp;&nbsp;<a href=\""+ical_calendar_link[i]+"\"><img src=\"https://dani0001414.github.io/TheVRMobilMenetrend/ical_icon.svg\" class=\"aspect__fill\" width=\"58\"></a>&nbsp;&nbsp;&nbsp;<a href=\""+yahoo_calendar_link[i]+"\"><img src=\"https://dani0001414.github.io/TheVRMobilMenetrend/Yahooicon.svg\" class=\"aspect__fill\" width=\"58\"></a>";}
	if(i == "cookie_settings")
	{
		
		var cookie_al_string,theme_cookie;
		if(cookie_settings == 1) { cookie_al_string="<span id=\"c_gomb\"><span style=\"cursor: pointer; color: grey; text-decoration: underline;\" onclick=\"deleteAllCookies()\">Bekapcsolva</span></span>"; } else { cookie_al_string="<span id=\"c_gomb\"><span style=\"cursor: pointer; color: grey; text-decoration: underline;\" onclick=\"document.cookie=createcookie('thevrmmcookiepolicysagreement',1,365)\">Kikapcsolva</span></span>"; }
		if(cookie_settings == 1) { 
			theme_status = getCookie("thevrmm_theme");
			if((theme_status == "dark")|(theme_status.length == 0)) {theme_cookie="<span id=\"theme_gomb\"><span style=\"cursor: pointer; color: grey; text-decoration: underline;\" onclick=\"document.cookie=createcookie('thevrmm_theme','light',365)\">Sötét</span></span>";}    
			if(theme_status == "light") { theme_cookie="<span id=\"theme_gomb\"><span style=\"cursor: pointer; color: grey; text-decoration: underline;\" onclick=\"document.cookie=createcookie('thevrmm_theme','dark',365)\">Világos</span></span>";}
		} else {theme_cookie="Kikapcsolt Cookie-val nem lehetésges.";}
		document.getElementById("popup_content").innerHTML="<br><br><b>[Beállítások]</b><br><br>";
		document.getElementById("popup_content").innerHTML +="<font size=\"2\">Téma: "+theme_cookie+"<br><br></font>";
		document.getElementById("popup_content").innerHTML +="<font size=\"2\">Cookie-k állapota: "+cookie_al_string+"</font>";
	}
}


function createcookie(name, value, days, banner) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
	if(banner == "banner"){document.getElementById("myCookie").style.display='none';} else {document.getElementById("c_gomb").innerHTML ="<span style=\"cursor: pointer; color: grey; text-decoration: underline;\" onclick=\"deleteAllCookies()\">Bekapcsolva</span>";}
	if(name == "thevrmm_theme") {
		if(value == "dark") {
			document.getElementById("c_gomb").innerHTML ="<span style=\"cursor: pointer; color: grey; text-decoration: underline;\" onclick=\"document.cookie=createcookie('thevrmm_theme','light',365)\">Sötét</span>";
		}	
		if(value == "light") {
			document.getElementById("theme_gomb").innerHTML ="<span style=\"cursor: pointer; color: grey; text-decoration: underline;\" onclick=\"document.cookie=createcookie('thevrmm_theme','dark',365)\">Világos</span>";
			//document.getElementsByClassName("elem").style.backgroundColor="white";
			//document.getElementsByClassName("elem").style.border="1px solid #e5e3e8";
			document.getElementsByTagName("body").style.Color="black";
			document.getElementsByTagName("body").style.backgroundColor="#faf9fa";
		/*váltás*/
		}
	}
	return name + "=" + value + expires
}
	
function deleteAllCookies(banner) {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
		document.cookie=createcookie('thevrmmcookiepolicysagreement',-1,20,'banner');
		if(banner == "banner")
		{
			document.getElementById("myCookie").style.display='none';
			document.cookie=createcookie('thevrmmcookiepolicysagreement',-1,20,'banner');
		} else {document.getElementById("c_gomb").innerHTML ="<span style=\"cursor: pointer; color: grey; text-decoration: underline;\" onclick=\"document.cookie=createcookie('thevrmmcookiepolicysagreement',0,365)\">Kikapcsolva</span>";
}
} 

// When the user clicks on <span> (x), close the modal
 function spanonclick() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
