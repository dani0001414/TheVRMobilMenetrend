/**MobilBarát Menetrend Testreszabása. */

/*Streamer adatok megadása*/
var streamer = "wearethevr";
var twitchLink = "https://www.twitch.tv/" + streamer;
var streamerID = "63493039";
var noEventsPic = "https://i.imgur.com/5dZn6sc.png";
var offlinePic = "https://i.imgur.com/5dZn6sc.png";
var offlineText = "Kihúztad az UTP Kábelt!<br><span style=\"cursor: pointer; color: grey; text-decoration: underline;\" onclick=\"OfflineSite()\">OFFLINE MENETREND MEGTEKINTÉSE</span></span>";
var noEventsText = "Jelenleg nincs egy stream sem a menetrendben! Elszívták az UTP-vel együtt! <img src=\"http://static-cdn.jtvnw.net/emoticons/v1/25/1.0\" alt=\"23\"><br>Hamarosan újabb szálítmány!";


/*Cookiek megadása*/
var policyAgreementCookie = "thevrmmcookiepolicysagreement";
var themeCookie = "thevrmm_theme";
var newFeatureCookie = "thevrmm_new_feature";
var theVRmmNewInfoCookie = "thevrmm_new_info";

/*theVRmmNewInfoCookie részt zárjam ki más streamer megadásakor cookie info résznél és cookie létrehozásnál*/
/*Szünet Cover 490 sor környékén kikommentelés ha nem a TheVR-ra specializálom */
/***********************************************************************************************************************/
/*A visszaszámláló, valamint a Cookie olvasás/létrehozás/törlés és modal funkció mind a w3schools oldalról származnak.*/
CreateValidManifest();

function convertTwitchChat(message) {
	var twitchMessage;
	var twitchUser;
	var emotes;
	var streamerChat = streamer;

	/**Split függvényel ésegyébb eljárásokkal az egybefüggő szöveg lekérdezést tömbösítjük. */
	message = message.split(";");

	for (var i = 0; i < message.length; i++) {
		message[i] = message[i].split("=");
		message[i][0] = message[i][0].replace("-", "");
		if (message[i][1] == "") { message[i][1] = "none"; }
		if (message[i][0] == "usertype") {
			twitchMessage = message[i][1].substring(message[i][1].search("PRIVMSG") + "PRIVMSG".length + streamerChat.length + 4);
		}
		/**A split függvényel szétszedett adatokat tovább rendszerezzük és alakítjuk a célnak. */
		if (message[i][0] == "displayname") { twitchUser = message[i][1]; }
		if (message[i][0] == "emotes") {
			emotes = message[i][1];
			if (emotes != "none") {
				emotes = emotes.split("/");
				for (var j = 0; j < emotes.length; j++) {
					emotes[j] = emotes[j].split(",");
					var temp = emotes[j][0].split(":");
					emotes[j].unshift(temp[0]);
					emotes[j][1] = temp[1];
				}

			}
		}
	}
	/**ChatArray Json struktúrába rakjuk(emotes rész valószínűleg felesleges majd átalakítom másként de így is működik) */
	var chatArray = {
		"twitchUser": twitchUser,
		"twitchMessage": twitchMessage,
		"emotes": emotes,
	};

	var link, emotePosition;
	var emoteName = [];
	var emoteLink = [];

	/**Az Emotikonokon tovább gyúrúnk. Az emotikonok helyzetét leíró részt a célnak megfelelően formázzuk és substringel a nevét és linkhez használatós kódját eltároljuk.*/
	if (emotes != "none") {
		var emotesLength = Object.keys(chatArray.emotes).length;
		for (var i = 0; i < emotesLength; i++) {
			var insideEmotesLength = Object.keys(chatArray.emotes[i]).length;
			for (var j = 0; j < insideEmotesLength; j++) {
				if (j != 0) {
					emotePosition = chatArray.emotes[i][j].split("-");
					emoteName.push(twitchMessage.substring(parseInt(emotePosition[0]), parseInt(emotePosition[1]) + 1));
					emoteLink.push(chatArray.emotes[i][0]);
				}
			}
		}
		/**Az eltárolt emote nevek és kódok alapján az emotikon neveket lecseréljük az emitokonra mutató képre. */
		for (var i = 0; i < emoteName.length; i++) {
			link = " <img  src=\"https://static-cdn.jtvnw.net/emoticons/v1/" + emoteLink[i] + "/1.0\"></img> ";
			twitchMessage = twitchMessage.replace(emoteName[i], link);
			chatArray.twitchMessage = twitchMessage;
		}
	}

	return chatArray;
}

function CurrentTime() {
	var currentMillisecTimestamp = new Date().getTime();
	return currentMillisecTimestamp / 1000;
}

function Countdown(countDownTime) {
	// Set the date we're counting down to
	var countDownDate = countDownTime * 1000;

	// Update the count down every 1 second
	var x = setInterval(function () {

		// Get todays date and time
		var now = new Date().getTime();

		// Find the distance between now an the count down date
		var distance = countDownDate - now;

		// Time calculations for days, hours, minutes and seconds
		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);

		// Output the result in an element with id="demo"
		document.getElementById("0_time").innerHTML = "Hamarosan kezdünk!<br>" + hours + "h "
			+ minutes + "m " + seconds + "s ";


		// If the count down is over, write some text 
		if (distance < 0) {
			clearInterval(x);
			document.getElementById("0_time").innerHTML = "MOST!";
			window.top.location.reload();
		}
	}, 1000);
}

function OnlyDate(b) {
	var twitchServerTime = b.substring(0, 16) + ":00Z";
	var utcDate = twitchServerTime;
	var localDate = new Date(utcDate);

	var months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
	var days = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
	var date = localDate.getFullYear() + "." + months[localDate.getMonth()] + "." + days[localDate.getDate()];

	return date;
}

function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = document.cookie;
	var ca = decodedCookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return 0;
}

function CurrentTimeTwitchServerFormat(offset) {
	/*Szerveridőbe konvertál*/
	var nd = new Date();
	var utc = nd.getTime() + (nd.getTimezoneOffset() * 60000);
	var d = new Date(utc + (3600000 * offset));
	var hour = d.getHours();
	var min = d.getMinutes();
	var months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
	var days = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"];
	var serverTime = d.getFullYear() + "-" + months[d.getMonth()] + "-" + days[d.getDate()] + "T" + days[hour] + ":" + days[min] + ":00Z";
	return serverTime;
}

function Timestamp(b) {
	var twitchServerTime = b.substring(0, 16) + ":00Z";
	var utcDate = twitchServerTime;
	var localDate = new Date(utcDate);
	var localDate = localDate.getTime() / 1000;
	return localDate;
}

function TimeConvert(a) {
	var twitchServerTime = a.substring(0, 16) + ":00Z";
	var utcDate = twitchServerTime;
	var localDate = new Date(utcDate);

	var hour = localDate.getHours();
	var minutes = localDate.getMinutes();
	var months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
	var days = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"];
	var date = localDate.getFullYear() + "." + months[localDate.getMonth()] + "." + days[localDate.getDate()];

	var minutes = days[localDate.getMinutes()];
	var time = hour + ":" + minutes;
	var convertedTime = date + "<br>" + time;

	return convertedTime;
}

function Light() {

	for (var i = 0; i < eventsLength; i++) {
		if ((i == 0) & (liveStatus == "live") & ((liveTimestamp < streamEndZeroElement + 3000) & (liveTimestamp > streamStartZeroElement - 3000))) {
			document.getElementById(i + "_description").style.backgroundColor = "white";
			document.getElementById(i + "_description").style.border = "1px solid #e5e3e8";
			document.getElementById(i + "_description").style.color = "black";
		} else {
			document.getElementById(i).style.backgroundColor = "white";
			document.getElementById(i).style.border = "1px solid #e5e3e8";
			document.getElementById(i).style.color = "black";
			document.getElementById(i + "_description").style.backgroundColor = "white";
			document.getElementById(i + "_description").style.border = "1px solid #e5e3e8";
			document.getElementById(i + "_description").style.color = "black";
		}

	}
	document.body.style.Color = "black";
	document.body.style.backgroundColor = "#faf9fa";
	document.getElementsByClassName("modal-content")[0].style.color = "black";
	document.getElementsByClassName("modal-content")[0].style.backgroundColor = "white";



}

function dynamicallyLoadScript(url) {
	var script = document.createElement("script"); // Make a script DOM node
	script.src = url; // Set it's src to the provided URl
	document.head.appendChild(script); // Add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
}

function CreateValidManifest() {
	if (streamer == "wearethevr") {
		var manifest = document.getElementsByTagName("link")[0];
		//var manifest = createElement("link");
		manifest.rel = "manifest";
		manifest.href = "data:application/manifest+json;base64, eyJuYW1lIjoiVGhlVlIgTW9iaWxCYXLDoXQgTWVuZXRyZW5kIiwic2hvcnRfbmFtZSI6IlRoZVZSIE1vYmlsIE1lbmV0cmVuZCIsImRpc3BsYXkiOiJzdGFuZGFsb25lIiwib3JpZW50YXRpb24iOiJuYXR1cmFsIiwic3RhcnRfdXJsIjoiaHR0cHM6Ly90aGV2ci5odS9tbS9tbS5odG1sIiwiYmFja2dyb3VuZF9jb2xvciI6IiNmN2Y3ZjciLCJ0aGVtZV9jb2xvciI6IiM2NDQxQTQiLCJpY29ucyI6W3sic3JjIjoiaHR0cHM6Ly9pLmltZ3VyLmNvbS9sRW9Wa2p0LnBuZyIsInNpemVzIjoiMTQ0eDE0NCIsInR5cGUiOiJpbWFnZS9wbmcifV19";
	}
}

function dynamicallyLoadScript_content(content) {
	var script = document.createElement("script"); // Make a script DOM node
	script.text = content; // Set it's src to the provided URL
	document.head.appendChild(script); // Add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
}

function HttpPost(url, callback) {
	var http = new XMLHttpRequest();
	/*fromTime = "2018-06-10T14:26:00Z";*/
	var params = "[{\"variables\":{\"channelLogin\":\"" + streamer + "\",\"limit\":20,\"before\":null,\"after\":\"" + fromTime + "\",\"sortOrder\":\"ASC\",\"following\":true},\"extensions\":{},\"operationName\":\"EventsPage_EventScheduleQuery\",\"query\":\"query EventsPage_EventScheduleQuery($channelLogin: String!, $limit: Int, $cursor: Cursor, $before: Time, $after: Time, $following: Boolean!, $sortOrder: SortOrder) {  user(login: $channelLogin) {    id    eventLeaves(first: $limit, after: $cursor, criteria: {endsBefore: $before, endsAfter: $after, sortOrder: $sortOrder}) {      pageInfo {        hasNextPage        __typename      }      edges {        cursor        node {          id          self @include(if: $following) {            isFollowing            __typename          }          ... on EventLeaf {            title            startAt            endAt            game {              id              displayName              __typename            }            channel {              id              login              displayName              __typename            }            imageURL(width: 320, height: 180)            __typename          }          __typename        }        __typename      }      __typename    }    __typename  }}\"},{\"operationName\":\"ChannelPage_ChannelInfoBar_User_RENAME1\",\"variables\":{\"login\":\"" + streamer + "\"},\"extensions\":{\"persistedQuery\":{\"version\":1,\"sha256Hash\":\"af26d8d34bc0a201c463bd83b00b07d48c6dd7595993aad579cb5a8347386f83\"}}},{\"operationName\":\"VideoMarkersChatCommand\",\"variables\":{\"channelLogin\":\"" + streamer + "\"},\"extensions\":{\"persistedQuery\":{\"version\":1,\"sha256Hash\":\"c65f8b33e3bcccf2b16057e8f445311d213ecf8729f842ccdc71908231fa9a78\"}}}]";
	if (needSecondPostRequest) { params = "[{\"variables\":{\"channelLogin\":\"" + streamer + "\",\"limit\":20,\"before\":null,\"after\":\"" + fromTime + "\",\"sortOrder\":\"ASC\",\"following\":true},\"extensions\":{},\"operationName\":\"EventsPage_EventScheduleQuery\",\"query\":\"query EventsPage_EventScheduleQuery($channelLogin: String!, $limit: Int, $cursor: Cursor, $before: Time, $after: Time, $following: Boolean!, $sortOrder: SortOrder) {  user(login: $channelLogin) {    id    eventLeaves(first: $limit, after: $cursor, criteria: {endsBefore: $before, endsAfter: $after, sortOrder: $sortOrder}) {      pageInfo {        hasNextPage        __typename      }      edges {        cursor        node {          id          self @include(if: $following) {            isFollowing            __typename          }          ... on EventLeaf {            title            startAt            endAt            game {              id              displayName              __typename            }            channel {              id              login              displayName              __typename            }            imageURL(width: 320, height: 180)            __typename          }          __typename        }        __typename      }      __typename    }    __typename  }}\"}]"; }
	http.open('POST', url, true);
	/*kérésküldés*/
	http.setRequestHeader('Client-ID', 'vpyy1j86wtuetq8b6vbxlmubi0jxoe');
	http.setRequestHeader('Content-type', 'application/json');
	http.send(params);
	http.onreadystatechange = function () {
		if (http.readyState == 4) {
			if (http.status == 200) {
				callback(http.responseText);
			} else {
				document.getElementById("no_stream").innerHTML = "<img src=\"" + offlinePic + "\" alt=\"23\" width=\"320\"><br><h3 style=\"font-family:rockwell;\">" + offlineText + "</h3>";
			}
		}
	}
}

function HttpPost2(url, params, callback) {
	var http = new XMLHttpRequest();
	http.open('POST', url, true);
	/*kérésküldés*/
	http.setRequestHeader('Client-ID', 'vpyy1j86wtuetq8b6vbxlmubi0jxoe');
	http.setRequestHeader('Content-type', 'application/json');
	http.send(params);
	http.onreadystatechange = function () {
		if (http.readyState == 4 && http.status == 200) {
			callback(http.responseText);
		}
	}

}

function HttpGet(url, callback) {
	var http = new XMLHttpRequest();
	http.open('GET', url, true);
	/*Kérésküldés*/
	http.setRequestHeader('Client-ID', 'vpyy1j86wtuetq8b6vbxlmubi0jxoe');
	http.setRequestHeader('Content-type', 'application/json');
	http.send();
	http.onreadystatechange = function () {
		if (http.readyState == 4) {
			if (http.status == 200) {
				callback(http.responseText);
			} else {
				document.getElementById("no_stream").innerHTML = "<img src=\"" + offlinePic + "\" alt=\"23\" width=\"320\"><br><h3 style=\"font-family:rockwell;\">" + offlineText + "</h3>";
			}
		}
	}

}

function HttpGetFeature(url, callback) {

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			callback(xhttp.responseText);

		}
	};
	xhttp.open("GET", url, true);
	xhttp.send();

}

function HttpGetNorm(url) {
	if (cookieSettings == 1) {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
			}
		};
		xhttp.open("GET", url, true);
		xhttp.send();
	}
}

/*Változtatás : streamEndZeroElement, streamStartZeroElement változók deklarálása itt. */
var fromTime = CurrentTimeTwitchServerFormat(0);
var events, liveData, streamEndZeroElement, needSecondPostRequest, calendarFunc, googleFunc, icalFunc, yahooFunc, detailFunc, whiteThemeFunc, blackThemeFunc, curentUserID, currenttime, theVRmmNewFeature, theVRmmNewInfo, stramStartFirstElement, streamEndFirstElement, streamStartZeroElement, eventsDescriptions, eventsLength, liveTimestamp, liveStatus, titleLive, coverLive, gameLiveStatus, titleLive, modal, span, btn, cookieSettings, themeStatus, liveDateStart, liveStart, newFunction;
var PUBGStat = "Töltődik a statisztika!"
var gCalendarLink = [];
var icalCalendarLink = [];
var outlook_calendar_link = [];
var yahooCalendarLink = [];

function idGenerator() {
	var array = new Uint32Array(2);
	window.crypto.getRandomValues(array);
	return array[0].toString(36).substr(0, 16) + array[1].toString(36).substr(0, 16);
}

/*Ha a manifest ki lesz javítva akkor*/

if (location.protocol != 'file:') {
	if (location.protocol != 'https:') {
		location.protocol = "https:";
	}
	CreateValidManifest();
	console.log('servicemanifest_locationprotocol');
}


/*Cookie lekérdezések*/
cookieSettings = getCookie(policyAgreementCookie);
if (cookieSettings == 1) {
	themeStatus = getCookie(themeCookie);
	theVRmmNewFeature = getCookie(newFeatureCookie);
	if (streamer == "wearethevr") { theVRmmNewInfo = getCookie(theVRmmNewInfoCookie); }
	curentUserID = getCookie(streamer + "userid");
}


document.onload = function () {
	CreateValidManifest();
	console.log('servicemanifest_window_onload');
}

if (cookieSettings == 1) {
	window.onload = function () {
		dynamicallyLoadScript("https://www.googletagmanager.com/gtag/js?id=UA-121876941-1");
		dynamicallyLoadScript_content("window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'UA-121876941-1');");
	}

}

document.addEventListener("DOMContentLoaded", function (event) {
	if ((themeStatus == "light") & (cookieSettings == 1)) {
		document.body.style.Color = "black";
		document.body.style.backgroundColor = "#faf9fa";
		document.getElementsByClassName("modal-content")[0].style.color = "black";
		document.getElementsByClassName("modal-content")[0].style.backgroundColor = "white";
	}

	if ((cookieSettings != 1) & (cookieSettings != -1)) {
		document.getElementById("myCookie").style.display = 'block';
	}

	document.body.innerHTML = document.body.innerHTML.replace("forum.thevr.hu/u/dani0001414/", "forum.thevr.hu/u/danx27/");
	document.body.innerHTML = document.body.innerHTML.replace("dani0001414 Ninjon", "DanX27 Ninjon");
	//	document.body.innerHTML = document.body.innerHTML.replace(/dani0001414/g, "DanX27");
	console.log("DOM fully loaded and parsed");
	var head = document.getElementsByTagName('head')[0];
	var fontPUBG = document.createElement('link');
	fontPUBG.rel = "stylesheet";
	fontPUBG.href = "https://fonts.googleapis.com/css?family=Squada+One";
	head.appendChild(fontPUBG);

});

var getLink = "https://api.twitch.tv/helix/streams?user_id=" + streamerID;
//HttpGet(getLink, EventsArray);
needSecondPostRequest = false;
HttpPost("https://gql.twitch.tv/gql", EventsArray2);
HttpGetFeature("https://script.google.com/macros/s/AKfycbxCbGnpDeEjNd7Nwpm76MrIfc2efatkbGZyXszSgA45-e1d87M/exec", new_features);


function PUBGStatDownload(data) {
	PUBGStat = data;

	if (currenttime > stramStartFirstElement) {
		document.getElementById("1_description").innerHTML = PUBGStat;
	} else {
		document.getElementById("0_description").innerHTML = PUBGStat;
	}
}


/*HttpGet live api lekérő meghívja a funkciót és átadja a callback változót*/
function EventsArray(data) {
	/*Ha még nem erősítette meg a felhasználó, hogy elfogadja e a cookie-kat vagy sem akkor megjeleníti az alsó bannert már itt, hogy gyorsabban megjelenjen!*/


	liveData = data;
	liveData = JSON.parse(liveData);
	coverLive = null;
	titleLive = null;
	liveStatus = null;
	gameLiveStatus = null;
	if (liveData.data.length > 0) {
		coverLive = liveData.data['0'].thumbnail_url;
		titleLive = liveData.data['0'].title;
		liveStatus = liveData.data['0'].type;
		coverLive = coverLive.replace("{width}", "640");
		coverLive = coverLive.replace("{height}", "360");
		gameLiveStatus = liveData.data['0'].game_id;  /*493057==PUBG*/

		liveStart = TimeConvert(liveData.data['0'].started_at).split("<br>");
		liveDateStart = OnlyDate(liveData.data['0'].started_at);
		liveTimestamp = Timestamp(liveData.data['0'].started_at);

	}

	if (liveStatus == "live") { fromTime = liveData.data['0'].started_at; }

	HttpPost("https://gql.twitch.tv/gql", EventsArray2);

}

/*HttpPost menetrend api lekérő meghívja a funkciót és átadja a callback változót*/
function EventsArray2(data) {
	events = data;
	events = JSON.parse(events);
	if (needSecondPostRequest == false) {
		liveData = events["1"].data.user.stream;
		liveStartTime = events["2"].data.user.stream;
		titleLive = liveData.title;
	}
	needSecondPostRequest = false;
	events = events["0"].data.user.eventLeaves.edges;
	eventsLength = events.length;

	if (titleLive != null) { liveStatus = "live"; } else { liveStatus = null }

	if ((liveStatus == "live") & (fromTime != liveStartTime.createdAt)) {
		coverLive = "https://static-cdn.jtvnw.net/previews-ttv/live_user_" + streamer + "-640x360.jpg";
		gameLiveStatus = liveData.game.id;  /*493057==PUBG*/

		liveStart = TimeConvert(liveStartTime.createdAt).split("<br>");
		liveDateStart = OnlyDate(liveStartTime.createdAt);
		liveTimestamp = Timestamp(liveStartTime.createdAt);

		fromTime = liveStartTime.createdAt;
		needSecondPostRequest = true;
		HttpPost("https://gql.twitch.tv/gql", EventsArray2);
		if ((gameLiveStatus == 493057)&(streamer = "wearethevr")) { HttpGetFeature("https://script.google.com/macros/s/AKfycbwaqdvT0_QtH6js2JTAx6gNh1Ep-GJqYaQRqgPvEYlZ_i4FTDTe/exec", PUBGStatDownload); }
	}

	/*Változtatás : Ha az events tömb nem nulla akkor az első elem kezdési és végetérési időpontját beletesszük a streamEndZeroElement és a streamStartZeroElement változókba. */
	if (eventsLength != 0) {
		streamEndZeroElement = Timestamp(events[0].node.endAt);
		streamStartZeroElement = Timestamp(events[0].node.startAt);
		if (eventsLength > 1) {
			stramStartFirstElement = Timestamp(events[1].node.startAt);
			streamEndFirstElement = Timestamp(events[1].node.endAt);
		}

	}

	if ((themeStatus == "light") & (cookieSettings == 1)) {
		Light();
		var meta = document.createElement("meta");
		meta.name = "theme-color";
		meta.content = "#faf9fa";
		document.getElementsByTagName('head')[0].appendChild(meta);
	} else {
		var meta = document.createElement("meta");
		meta.name = "theme-color";
		meta.content = "#0e0c13";
		document.getElementsByTagName('head')[0].appendChild(meta);
	}

	var descriptionJsonStringPlayload = "[";

	for (var i = 0; i < eventsLength; i++) {
		descriptionJsonStringPlayload += "{\"variables\":{\"eventName\":\"" + events[i].node.id + "\"},\"extensions\":{},\"operationName\":\"EventLandingPage_Event\",\"query\":\"query EventLandingPage_Event($eventName: ID!) {  event(id: $eventName) {    __typename    ... on EventLeaf {      ...EventLeafContent      premiere {        ...PremiereContent        __typename      }      __typename    }    ... on EventCollection {      ...EventCollectionContent      __typename    }  }}fragment PremiereContent on Premiere {  status  pastPremiere {    description    __typename  }  __typename}fragment EventLeafContent on EventLeaf {  description  __typename}fragment EventCollectionContent on EventCollection {  description  __typename}\"}";
		if (i < eventsLength - 1) { descriptionJsonStringPlayload += ","; }
	}
	descriptionJsonStringPlayload += "]";
	if (needSecondPostRequest == false) {
		HttpPost2("https://gql.twitch.tv/gql", descriptionJsonStringPlayload, EventsArray3);

	}
	HtmlStart();


}

/*HttpPost2 menetrend részletek api lekérő meghívja a funkciót és átadja a callback változót*/
function EventsArray3(data) {
	eventsDescriptions = data;
	eventsDescriptions = JSON.parse(eventsDescriptions);
	var titleId;
	for (var i = 0; i < eventsLength; i++) {
		titleId = i + "_cim";
		if (eventsDescriptions[i].data.event.premiere != null) {
			if ((eventsDescriptions[i].data.event.premiere.__typename == "Premiere")) {
				document.getElementById(i).style.backgroundColor = "#e52e26";
				document.getElementById(i).style.border = "1px solid #0c3033";
				document.getElementById(i).style.color = "white";
				document.getElementById(titleId).innerHTML = "<div style=\"color: #fafbff\" ><img src=\"https://i.imgur.com/VFXLMAL.png\"><br><b>" + events[i].node.title + "</b></div></p>";
			}
		}
	}



}

/*Feltölti az üres DIV-eket a menetrendi információkkal*/
function HtmlStart() {
	/**WebSocket rész a TheVR Chat-hez. Itt most jelenleg tesztként Shroud betéve */
	if ((liveStatus == "live") & (gameLiveStatus != 493057)) {
		var streamerChat = "JOIN #" + streamer;
		var formatedChatArray = ["", "", "", "", ""];
		var ws = new WebSocket('wss://irc-ws.chat.twitch.tv/');

		ws.onopen = function () {
			ws.send("CAP REQ :twitch.tv/tags twitch.tv/commands"); // send a message
			ws.send("PASS SCHMOOPIIE"); // send a message
			ws.send("NICK justinfan42461"); // send a message
			ws.send("USER justinfan42461 8 * :justinfan42461"); // send a message 
			ws.send(streamerChat);
		};

		ws.onmessage = function (evt) {
			/**WebSocket adatok olvasása*/
			var chatArray = convertTwitchChat(evt.data);

			/**HTML-formában a tömbben shiftelgetjük, hogy szépen felfelé irányúan megjelenjen. */
			formatedChatArray.shift();
			formatedChatArray.push("<p style=\"margin-left: 5px; margin-right: 5px\" align=\"left\"><font size=\"2\">" + "<b>" + chatArray.twitchUser + "</b>: " + chatArray.twitchMessage + "</font></p>");
			document.getElementById("0_description").innerHTML = "Chat pillanatok a stream-ből:" + formatedChatArray[0] + formatedChatArray[1] + formatedChatArray[2] + formatedChatArray[3] + formatedChatArray[4];
		};
	}

	currenttime = CurrentTime();
	var cachedStreamStart, cachedTitles, k = 0, l = 0, m = 0, n = 0;
	var titles = [];
	var id = [];
	var cachedStreamEnd = [];
	var streamStart = [];
	var streamEnd = [];
	var newEventsPosition = [];
	var changedTimePosition = [];
	var changedTitlePosition = [];
	var changedAllPosition = [];
	var readyCheck = true;
	if (needSecondPostRequest) { readyCheck = false }

	if (cookieSettings == 1) {
		for (var i = 0; i < eventsLength; i++) {
			streamStart[i] = Timestamp(events[i].node.startAt);
			streamEnd[i] = Timestamp(events[i].node.endAt);
			titles[i] = events[i].node.title;
			id[i] = events[i].node.id;
		}

		var cachedStreamStart = JSON.parse(getCookie("cachedStreamStart"));                        //Az előző menetrendi elemek idejét nyitja meg egy tömbbe.
		var cachedTitles = JSON.parse(getCookie("cachedTitles"));                         //Az előző memnetrendi elemek címét nyitja meg egy tömbe.
		var cachedIDs = JSON.parse(getCookie("cachedIDs"));
		var emptyArrayIdicator = getCookie("cachedIDs");
		//var cachedStreamEnd = JSON.parse(getCookie("thvr_ese_v_c"));

		if (((cachedStreamStart == 0) | (cachedTitles == 0) | (cachedIDs == 0)) & (emptyArrayIdicator != "[]")) {
			cachedStreamStart = streamStart;
			cachedTitles = titles;
			cachedIDs = id;
			//cachedStreamEnd = streamEnd;
			//cached variables	

			createcookie('cachedStreamStart', JSON.stringify(cachedStreamStart), 365);
			createcookie('cachedTitles', JSON.stringify(cachedTitles), 365);
			createcookie('cachedIDs', JSON.stringify(cachedIDs), 365);
			createcookie('cachedStreamEnd', JSON.stringify(cachedStreamEnd), 365);
		}
		if (curentUserID == 0) {
			curentUserID = idGenerator();
			createcookie(streamer + 'userid', curentUserID, 365);
		}
	}

	calendarFunc = "https://script.google.com/macros/s/AKfycbwCuXEIW0pJo4aL8f09tvzPoaJ76t99aPT26kSw1Iji2K39WxNy/exec?func=open-calendar&user=" + curentUserID;
	googleFunc = "https://script.google.com/macros/s/AKfycbwCuXEIW0pJo4aL8f09tvzPoaJ76t99aPT26kSw1Iji2K39WxNy/exec?func=add-google-calendar&user=" + curentUserID;
	icalFunc = "https://script.google.com/macros/s/AKfycbwCuXEIW0pJo4aL8f09tvzPoaJ76t99aPT26kSw1Iji2K39WxNy/exec?func=add-ical-calendar&user=" + curentUserID;
	yahooFunc = "https://script.google.com/macros/s/AKfycbwCuXEIW0pJo4aL8f09tvzPoaJ76t99aPT26kSw1Iji2K39WxNy/exec?func=add-yahoo-calendar&user=" + curentUserID;
	detailFunc = "https://script.google.com/macros/s/AKfycbwCuXEIW0pJo4aL8f09tvzPoaJ76t99aPT26kSw1Iji2K39WxNy/exec?func=open-details&user=" + curentUserID;
	whiteThemeFunc = "https://script.google.com/macros/s/AKfycbwCuXEIW0pJo4aL8f09tvzPoaJ76t99aPT26kSw1Iji2K39WxNy/exec?func=light-theme-set&user=" + curentUserID;
	blackThemeFunc = "https://script.google.com/macros/s/AKfycbwCuXEIW0pJo4aL8f09tvzPoaJ76t99aPT26kSw1Iji2K39WxNy/exec?func=dark-theme-set&user=" + curentUserID;

	for (var i = 0; i < eventsLength; i++) {

		if (eventsLength > 1) {
			if ((currenttime > stramStartFirstElement) & (i == 0)) {
				i = 1;
			}
		} else {
			stramStartFirstElement = Timestamp(events[0].node.endAt) + 7200;
			streamEndFirstElement = Timestamp(events[0].node.endAt) + 7200;
		}

		var titleId = i + "_cim";
		var coverId = i + "_cover";
		var timeId = i + "_time";
		var brId = i + "_br";
		var blankCover = "https://static-cdn.jtvnw.net/twitch-event-images-v2/default/town-320x180";

		if (cookieSettings != 1) {
			streamStart[i] = Timestamp(events[i].node.startAt);
			streamEnd[i] = Timestamp(events[i].node.endAt);
		}

		if (cookieSettings == 1) {
			//////
			var changedTitleCount = 0, changedTimeCount = 0, changeAllCount = 0;
			existElementCount = 0;

			if ((cachedStreamStart.length == 0) & (eventsLength > 0)) {
				newEventsPosition[k] = i; k++;
			}

			for (j = 0; j < cachedStreamStart.length; j++) {
				if ((cachedIDs[j] == id[i])) {
					existElementCount++;                                                                   //Öszehasonllítja az esemény dátum, idő, és címe alapján, hogy szerepel e már a menetrendben.  
				}
				if ((cachedStreamStart[j] != streamStart[i]) & (titles[i] == cachedTitles[j]) & (cachedIDs[j] == id[i])) {
					changedTimeCount++;                                                                      //Megnézi, hogy talál e olyan eseményt a menetrendben aminek a címe azonos de a dátumát megváltoztatták

				}
				if ((cachedStreamStart[j] == streamStart[i]) & (titles[i] != cachedTitles[j]) & (cachedIDs[j] == id[i])) {
					changedTitleCount++;                                                                         //Megnézi, hogy talál e olyan eseményt a menetrendben aminek az időpontja nem változott de a címe igen.
				}
				if ((cachedStreamStart[j] != streamStart[i]) & (titles[i] != cachedTitles[j]) & (cachedIDs[j] == id[i])) {
					changeAllCount++;                                                                         //Megnézi, hogy talál e olyan eseményt a menetrendben aminek az időpontja nem változott de a címe igen.
				}
			}
			if ((existElementCount == 0)) { newEventsPosition[k] = i; k++; }
			if ((changedTimeCount > 0)) { changedTimePosition[l] = i; l++; }
			if ((changedTitleCount > 0)) { changedTitlePosition[m] = i; m++; }
			if ((changeAllCount > 0)) { changedAllPosition[n] = i; n++; }
			////
		}
		var elapsed = parseInt((currenttime - streamEnd[i]) / 60, 10);

		var cover = events[i].node.imageURL;


		var startTime = TimeConvert(events[i].node.startAt).split("<br>");
		var endTime = TimeConvert(events[i].node.endAt).split("<br>");

		/*calendar kompatibilis idők*/
		var gCalendarStartTime = events[i].node.startAt.substring(0, 16) + ":00Z";
		gCalendarStartTime = gCalendarStartTime.replace(/-/g, "");
		gCalendarStartTime = gCalendarStartTime.replace(/:/g, "");


		var gCalendarEndTime = events[i].node.endAt.substring(0, 16) + ":00Z";
		gCalendarEndTime = gCalendarEndTime.replace(/-/g, "");
		gCalendarEndTime = gCalendarEndTime.replace(/:/g, "");


		var gCalendarTitle = events[i].node.title.replace(/ /g, "+");
		var icalCalendarTitle = events[i].node.title.replace(/ /g, "%20");
		gCalendarTitle = gCalendarTitle.replace(/#/g, "");
		icalCalendarTitle = icalCalendarTitle.replace(/#/g, "");

		/*Calendar Linkek létrehozása*/
		gCalendarLink[i] = "https://calendar.google.com/calendar/r/eventedit?dates=" + gCalendarStartTime + "/" + gCalendarEndTime + "&details&location&text=" + gCalendarTitle + "&trp=false&sf=true"
		icalCalendarLink[i] = "https://maestro.io/pkg/lt3-api/4.0/api/calendar/event.ics?alarm=" + gCalendarEndTime + "&details=&end=" + gCalendarEndTime + "&location=&stamp=20180704T213131Z&convertedTime=" + gCalendarStartTime + "&title=" + icalCalendarTitle;
		yahooCalendarLink[i] = "https://calendar.yahoo.com/?v=60&view=d&type=20&title=" + gCalendarTitle + "&st=" + gCalendarStartTime + "&et=" + gCalendarEndTime + "&uid=";

		/*Szünet Cover létrehozás*/
		if (streamer == "wearethevr") {
			var brakeTitle = events[i].node.title;
			var breakIndicator = brakeTitle.search("SZÜNET");
			if ((cover == blankCover) & (breakIndicator > -1)) { cover = "https://dani0001414.github.io/TheVRMobilMenetrend/brake.png"; }
		}

		/*Feltölteni kívánt Div-ek megjelenítése a rejtésből és adatokkal való feltöltésük*/
		document.getElementById(i).style.display = 'block';
		document.getElementById(brId).style.display = 'block';
		document.getElementById(titleId).innerHTML = "<p><b>" + events[i].node.title + "</b></p>";
		document.getElementById(coverId).innerHTML = "<img src=\"" + cover + "\" class=\"aspect__fill\" width=\"320\">";
		document.getElementById(timeId).innerHTML = startTime[0] + "<br>" + startTime[1] + "-" + endTime[1];

		/*var stream_hossz = streamEnd[i] - streamStart[i];*/
		/*Változtatás: Ha az idő 2400másodpercnél kisebb akkor Premier-ről van szó és átszinezzük.*/



		/*majd 7200 legyen */
		var countdownStart = streamStart[i] - currenttime;
		/*A menetrendi idő jelzésének módjának változtatása ha eltérő dátumú kedés és befejezés és ha a stream tovább tart mint a várt*/
		if ((liveTimestamp < streamEnd[i] + 3000) & (liveTimestamp > streamStart[i] - 3000) & (elapsed > 0) & (startTime[0] == endTime[0])) {
			document.getElementById(timeId).innerHTML = startTime[0] + "<br>" + startTime[1] + "-" + endTime[1] + "<font color=\"yellow\"> + " + elapsed + "p</font>";
		} else if (startTime[0] == endTime[0]) {
			if ((countdownStart < 7200) & (countdownStart > 0) & (liveStatus != "live")) { Countdown(streamStart[i]); } else { document.getElementById(timeId).innerHTML = startTime[0] + "<br>" + startTime[1] + "-" + endTime[1]; }
		} else if ((liveTimestamp < streamEnd[i] + 3000) & (liveTimestamp > streamStart[i] - 3000) & (elapsed > 0)) {
			document.getElementById(timeId).innerHTML = "<div style=\"overflow: hidden; width: 320px;\">    <div style=\"float:left; width: 155px\"><center>" + startTime[0] + "<br>" + startTime[1] + "<font color=\"yellow\"> + " + elapsed + "p</font></center></div>    <div style=\"float:left; margin-left:10px; margin-top:10px\"><center>-</center></div>	<div style=\"overflow: hidden; width: 155px float:right;\"><center>" + endTime[0] + "<br>" + endTime[1] + "</center></div></div>";
		} else {
			if ((countdownStart < 7200) & (countdownStart > 0) & (liveStatus != "live")) { Countdown(streamStart[i]); } else { document.getElementById(timeId).innerHTML = "<div style=\"overflow: hidden; width: 320px;\">    <div style=\"float:left; width: 155px\"><center>" + startTime[0] + "<br>" + startTime[1] + "</center></div>    <div style=\"float:left; margin-left:10px; margin-top:10px\"><center>-</center></div>	<div style=\"overflow: hidden; width: 155px float:right;\"><center>" + endTime[0] + "<br>" + endTime[1] + "</center></div></div>"; }
		}
	}


	/*Ha az első menetrendi elem lefedi a stream indítást akkor az első elem streamelődik. Ha nem akkor meglepi stream.(Változtatás : kivettem a fenti if ágból. streamEndZeroElement és streamStartZeroElement változók használata. ) */
	if ((liveStatus == "live") & ((liveTimestamp < streamEndZeroElement) & (liveTimestamp > streamStartZeroElement - 3000)) & (currenttime < stramStartFirstElement)) {  /*Ha előfordulna, hogy jóval előbb indítják a streamet akkormég vagy-ként liveTimestamp helyett currenttime-al is vizsgálni. */
		document.getElementById("0").style.backgroundColor = "#4b367c";
		document.getElementById("0").style.color = "#c3c1c8";
		document.getElementById("0_cim").innerHTML = "<a target=\"_blank\" href=\"" + twitchLink + "\"><img src=\"https://i.imgur.com/o1kyCnf.png\"></a><br><b>" + titleLive + "</b>";
		document.getElementById("0_cover").innerHTML = "<a target=\"_blank\" href=\"" + twitchLink + "\"><img src=\"" + coverLive + "\" class=\"aspect__fill\" width=\"320\"></a>";
	} else if ((liveStatus == "live") & (currenttime < streamEndFirstElement) & (currenttime > stramStartFirstElement)) {
		document.getElementById("1").style.backgroundColor = "#4b367c";
		document.getElementById("1").style.color = "#c3c1c8";
		document.getElementById("1_cim").innerHTML = "<a target=\"_blank\" href=\"" + twitchLink + "\"><img src=\"https://i.imgur.com/o1kyCnf.png\"></a><br><b>" + titleLive + "</b>";
		document.getElementById("1_cover").innerHTML = "<a target=\"_blank\" href=\"" + twitchLink + "\"><img src=\"" + coverLive + "\" class=\"aspect__fill\" width=\"320\"></a>";
	} else if ((liveStatus == "live") & (currenttime < streamEndZeroElement) & (currenttime > streamStartZeroElement)) {
		document.getElementById("0").style.backgroundColor = "#4b367c";
		document.getElementById("0").style.color = "#c3c1c8";
		document.getElementById("0_cim").innerHTML = "<a target=\"_blank\" href=\"" + twitchLink + "\"><img src=\"https://i.imgur.com/o1kyCnf.png\"></a><br><b>" + titleLive + "</b>";
		document.getElementById("0_cover").innerHTML = "<a target=\"_blank\" href=\"" + twitchLink + "\"><img src=\"" + coverLive + "\" class=\"aspect__fill\" width=\"320\"></a>";
	} else if ((liveStatus != "live") & (currenttime < streamEndZeroElement) & (currenttime > streamStartZeroElement)) {  /*Ha előfordulna, hogy később indítják a streamet akkormég vagy-ként liveTimestamp helyett currenttime-al is vizsgálni. */
		document.getElementById("0_cim").innerHTML = "<img src=\"https://i.imgur.com/ZNlNn8J.png\"><br><b>" + events[0].node.title + "</b>";
	} else if ((liveStatus == "live") & readyCheck) {
		document.getElementById("meglepi").style.display = 'block';
		document.getElementById("meglepi_br").style.display = 'block';
		document.getElementById("meglepi_cim").innerHTML = "<a target=\"_blank\" href=\"" + twitchLink + "\"><img src=\"https://i.imgur.com/gu6M3eu.png\"></a><br><b>" + titleLive + "</b>";
		document.getElementById("meglepi_cover").innerHTML = "<img src=\"" + coverLive + "\" class=\"aspect__fill\" width=\"320\">";
		document.getElementById("meglepi_time").innerHTML = liveDateStart + "<br>" + liveStart[1] + "-Ameddig tart</p>";
	}
	/*Változtatás : Ha az events tömb hosszúsága nulla és élő közvetítés van akkor meglepi stream. Ellenkező esetbeh ha nincs stream és csak a tömb hossza nulla akkor no_stream div feltöltése a rejtés megjelenítés helyett. Html-ben mindig betöltődött a 125kb nagyságú kép rejtésből megjelenítéses módszernél. ) */
	if ((eventsLength == 0) & (liveStatus == "live") & readyCheck) {
		document.getElementById("meglepi").style.display = 'block';
		document.getElementById("meglepi_br").style.display = 'block';
		document.getElementById("meglepi_cim").innerHTML = "<a target=\"_blank\" href=\"" + twitchLink + "\"><img src=\"https://i.imgur.com/gu6M3eu.png\"></a><br><b>" + titleLive + "</b>";
		document.getElementById("meglepi_cover").innerHTML = "<img src=\"" + coverLive + "\" class=\"aspect__fill\" width=\"320\">";
		document.getElementById("meglepi_time").innerHTML = liveDateStart + "<br>" + liveStart[1] + "-Ameddig tart</p>";
	} else if ((eventsLength == 0) & readyCheck) {
		document.getElementById("no_stream").innerHTML = "<img src=\"" + noEventsPic + "\" alt=\"23\" width=\"320\"><br><h3 style=\"font-family:rockwell;\">" + noEventsText + "</h3>";
	}

	// Get the modal ws3school script
	modal = document.getElementById('myModal');

	// Get the button that opens the modal
	btn = document.getElementById("myBtn");

	// Get the <span> element that closes the modal
	span = document.getElementsByClassName("close")[0];
	if (cookieSettings == 1) {
		/*Változtatások színezése!*/
		for (i = 0; i < newEventsPosition.length; i++) {
			j = newEventsPosition[i];
			var titleId = j + "_cim";
			document.getElementById(j).style.backgroundColor = "#3f7186";
			document.getElementById(j).style.border = "1px solid #022e40";
			document.getElementById(j).style.color = "white";
			document.getElementById(titleId).innerHTML = "<div style=\"color: #fafbff\" ><img src=\"https://dani0001414.github.io/TheVRMobilMenetrend/new_stream.png\"><br><b>" + events[j].node.title + "</b></div></p>";
		}
		for (i = 0; i < changedTimePosition.length; i++) {
			j = changedTimePosition[i];
			var titleId = j + "_cim";
			document.getElementById(j).style.backgroundColor = "#b9ac73";
			document.getElementById(j).style.border = "1px solid #3e3922";
			document.getElementById(j).style.color = "white";
			document.getElementById(titleId).innerHTML = "<div style=\"color: #fafbff\" ><img src=\"https://dani0001414.github.io/TheVRMobilMenetrend/time_stream.png\"><br><b>" + events[j].node.title + "</b></div></p>";
		}
		for (i = 0; i < changedAllPosition.length; i++) {
			j = changedAllPosition[i];
			var titleId = j + "_cim";
			document.getElementById(j).style.backgroundColor = "#3f7186";
			document.getElementById(j).style.border = "1px solid #022e40";
			document.getElementById(j).style.color = "white";
			document.getElementById(titleId).innerHTML = "<div style=\"color: #fafbff\" ><img src=\"https://dani0001414.github.io/TheVRMobilMenetrend/new_stream.png\"><br><b>" + events[j].node.title + "</b></div></p>";
		}
		for (i = 0; i < changedTitlePosition.length; i++) {
			j = changedTitlePosition[i];
			var titleId = j + "_cim";
			document.getElementById(j).style.backgroundColor = "#63c27e";
			document.getElementById(j).style.border = "1px solid #417951";
			document.getElementById(j).style.color = "white";
			document.getElementById(titleId).innerHTML = "<div style=\"color: #fafbff\" ><img src=\"https://dani0001414.github.io/TheVRMobilMenetrend/title_stream.png\"><br><b>" + events[j].node.title + "</b></div></p>";
		}


		/*cache elmentése*/
		if ((changedTitlePosition.length > 0) | (changedTimePosition.length > 0) | (newEventsPosition.length > 0) | (changedAllPosition.length > 0) | (cachedIDs.length != id.length)) {
			cachedStreamStart = streamStart;
			cachedTitles = titles;
			cachedIDs = id;
			cachedStreamEnd = streamEnd;

			createcookie('cachedStreamStart', JSON.stringify(cachedStreamStart), 365);
			createcookie('cachedTitles', JSON.stringify(cachedTitles), 365);
			createcookie('cachedIDs', JSON.stringify(cachedIDs), 365);
			createcookie('cachedStreamEnd', JSON.stringify(cachedStreamEnd), 365);
		}
	}

}

function OfflineSite() {
	document.getElementById("no_stream").innerHTML = "Offline menetrend:";
	var streamStart = JSON.parse(getCookie("cachedStreamStart"));                        //Az előző menetrendi elemek idejét nyitja meg egy tömbbe.
	var titles = JSON.parse(getCookie("cachedTitles"));                         //Az előző memnetrendi elemek címét nyitja meg egy tömbe.
	var streamEnd = JSON.parse(getCookie("cachedStreamEnd"));

	for (var i = 0; i < titles.length; i++) {
		var titleId = i + "_cim";
		var coverId = i + "_cover";
		var timeId = i + "_time";
		var brId = i + "_br";

		var startTime = timestampToTime(streamStart).split("<br>");
		var endTime = timestampToTime(streamEnd).split("<br>");

		/*Feltölteni kívánt Div-ek megjelenítése a rejtésből és adatokkal való feltöltésük*/
		document.getElementById(i).style.display = 'block';
		document.getElementById(brId).style.display = 'block';
		document.getElementById(titleId).innerHTML = "<p><b>" + titles[i] + "</b></p>";
		document.getElementById(coverId).innerHTML = "<font size=\"100%\">🖼️</font>";
		document.getElementById(timeId).innerHTML = startTime[0] + "<br>" + startTime[1] + "-" + endTime[1];

		/*var stream_hossz = streamEnd[i] - streamStart[i];*/
		/*Változtatás: Ha az idő 2400másodpercnél kisebb akkor Premier-ről van szó és átszinezzük.*/



		/*majd 7200 legyen */
		var countdownStart = streamStart[i] - currenttime;
		/*A menetrendi idő jelzésének módjának változtatása ha eltérő dátumú kedés és befejezés és ha a stream tovább tart mint a várt*/
		if (startTime[0] == endTime[0]) {
			if ((countdownStart < 7200) & (countdownStart > 0)) { Countdown(streamStart[i]); } else { document.getElementById(timeId).innerHTML = startTime[0] + "<br>" + startTime[1] + "-" + endTime[1]; }
		} else {
			if ((countdownStart < 7200) & (countdownStart > 0) & (liveStatus != "live")) { Countdown(streamStart[i]); } else { document.getElementById(timeId).innerHTML = "<div style=\"overflow: hidden; width: 320px;\">    <div style=\"float:left; width: 155px\"><center>" + startTime[0] + "<br>" + startTime[1] + "</center></div>    <div style=\"float:left; margin-left:10px; margin-top:10px\"><center>-</center></div>	<div style=\"overflow: hidden; width: 155px float:right;\"><center>" + endTime[0] + "<br>" + endTime[1] + "</center></div></div>"; }
		}
	}
}

function new_features(data) {
	newFunction = data;
	newFunction = JSON.parse(newFunction);

	var newFunctionWeek = currenttime - newFunction.timestamp;
	if ((newFunctionWeek < 1209600) & (theVRmmNewFeature < newFunction.timestamp) & (cookieSettings == 1)) {
		modal_open("new");
	}
	if (streamer == "wearethevr") {
		var newInfoHour = currenttime - newFunction.infotimestamp;
		if ((newInfoHour < 10800) & (theVRmmNewInfo < newFunction.infotimestamp) & (cookieSettings == 1)) {
			modal_open("thevrinfo");
		}
	}
}
/*Részletek megjelenítése és elrejtése*/
function hide_and_show(elementId, i) {
	/*Ha nem meglepi stream leírása akkor részletekkel töltjük fel részletek div-et.(Változtatás : else if ágba került egy rész ami a lekért leírást beilleszti ha nem üres. Ha üres akkor kiírja, hogy nem tartozik hozzá leírás.) */
	if (elementId != "meglepi_description") {
		if ((gameLiveStatus == 493057) & (i == 0) & (liveStatus == "live") & ((liveTimestamp < streamEndZeroElement + 3000) & (liveTimestamp > streamStartZeroElement - 3000))) {
			document.getElementById(elementId).innerHTML = PUBGStat;
		} else if ((i == 0) & (liveStatus == "live") & ((liveTimestamp < streamEndZeroElement + 3000) & (liveTimestamp > streamStartZeroElement - 3000))) {
			document.getElementById(elementId).innerHTML = "<b>Chat Töltődik...</b><br>";
			gameLiveStatus = liveData.game.id;
		} else if (eventsDescriptions[i].data.event.description) {
			document.getElementById(elementId).innerHTML = "<b>Részletek:</b><br>" + eventsDescriptions[i].data.event.description + "<br><br><a style=\"cursor: pointer; color: grey; text-decoration: underline;\" onclick=\"modal_open(" + i + ")\" >Hozzáadás a naptárhoz!</a>";
		} else {
			document.getElementById(elementId).innerHTML = "<b>Részletek:</b><br>Az eseményhez nem tartozik részletes leírás!<br><br><a style=\"cursor: pointer; color: grey; text-decoration: underline;\" onclick=\"modal_open(" + i + ")\" >Hozzáadás a naptárhoz!</a> ";
		}
	} else if ((liveStatus == "live") & (gameLiveStatus == 493057)&(streamer = "wearethevr")) {
		document.getElementById(elementId).innerHTML = PUBGStat;

	}


	var x = document.getElementById(elementId);
	if (x.style.display === "none") {
		x.style.display = "block";
		HttpGetNorm(detailFunc);
	} else {
		x.style.display = "none";
	}
}

/*Popup ablak megnyitó*/
function modal_open(i) {
	/*Elfogadó cookie kinyerése majd ha az értéke 1 akkor a téma cookie kinyerése */
	cookieSettings = getCookie(policyAgreementCookie);
	if (cookieSettings == 1) { themeStatus = getCookie(themeCookie); }
	modal.style.display = "block";

	if (typeof i === typeof 3) {
		/*Aktuális menetrendi stream-nek megfelelő naptár linkek*/
		document.getElementById("popup_content").innerHTML = "<b>Hozzáadás a naptáradhoz:</b><br><br><div id=\"light_popup\" ><a onclick=\"HttpGetNorm('" + googleFunc + "')\" href=\"" + gCalendarLink[i] + "\"><img src=\"https://vignette.wikia.nocookie.net/logopedia/images/9/9d/Google_logo_white_2015.svg\" class=\"aspect__fill\" width=\"87\"></a>&nbsp;&nbsp;&nbsp;<a onclick=\"HttpGetNorm('" + icalFunc + "')\" href=\"" + icalCalendarLink[i] + "\"><img src=\"https://dani0001414.github.io/TheVRMobilMenetrend/ical_icon.svg\" class=\"aspect__fill\" width=\"58\"></a>&nbsp;&nbsp;&nbsp;<a onclick=\"HttpGetNorm('" + yahooFunc + "')\"href=\"" + yahooCalendarLink[i] + "\"><img src=\"https://dani0001414.github.io/TheVRMobilMenetrend/Yahooicon.svg\" class=\"aspect__fill\" width=\"58\"></a></div>";
		if (themeStatus == "light") { document.getElementById("light_popup").style.filter = "invert(100%)"; }
		if (themeStatus == "dark") { document.getElementById("light_popup").style.filter = "invert(0%)"; }  /*Világos Témánál az svg ikonok invertálása. */
		HttpGetNorm(calendarFunc);
	}
	if (i == "cookie_settings") {
		/*Cookie és téma beállítására szolgáló rész. */
		var cookieStatusString, themeChangePart;
		if (cookieSettings == 1) { cookieStatusString = "<span id=\"c_gomb\"><span style=\"cursor: pointer; color: grey; text-decoration: underline;\" onclick=\"deleteAllCookies()\">Bekapcsolva</span></span>"; } else { cookieStatusString = "<span id=\"c_gomb\"><span style=\"cursor: pointer; color: grey; text-decoration: underline;\" onclick=\"createcookie('" + policyAgreementCookie + "',1,365)\">Kikapcsolva</span></span>"; }
		if (cookieSettings == 1) {
			if ((themeStatus == "dark") | (themeStatus == 0)) { themeChangePart = "<span id=\"theme_gomb\"><span style=\"cursor: pointer; color: grey; text-decoration: underline;\" onclick=\"createcookie('" + themeCookie + "','light',365);HttpGetNorm('" + whiteThemeFunc + "')\">Sötét</span></span>"; }
			if (themeStatus == "light") { themeChangePart = "<span id=\"theme_gomb\"><span style=\"cursor: pointer; color: grey; text-decoration: underline;\" onclick=\"createcookie('" + themeCookie + "','dark',365);HttpGetNorm('" + blackThemeFunc + "')\">Világos</span></span>"; }
		} else { themeChangePart = "Kikapcsolt Cookie-val nem lehetésges."; }
		document.getElementById("popup_content").innerHTML = "<br><br><b>[Beállítások]</b><br><br>";
		document.getElementById("popup_content").innerHTML += "<font size=\"2\">Téma: " + themeChangePart + "<br><br></font>";
		document.getElementById("popup_content").innerHTML += "<font size=\"2\">Cookie-k állapota: " + cookieStatusString + "</font>";
	}
	if (i == "cookie_information") {
		document.getElementById("popup_content").innerHTML = "<br><br><b>[Cookie Információ]</b><br><br>";
		if (streamer == "wearethevr") {
			document.getElementById("popup_content").innerHTML += "<font size=\"1\"><div align=\"left\">A MobilBarát Menetrend által használt cookie-k:<br><br><span style=\"color: grey;\">" + policyAgreementCookie + ":</span><br>A döntésedet tárolja cookie-k használatával kapcsolatban. Ha nem fogadtad el, akkor a többi cookie nem lesz használatban.<br><br><span style=\"color: grey;\">" + themeCookie + ":</span><br>Az általad választott téma bellítását tárolja<br><br><span style=\"color: grey;\">" + newFeatureCookie + ":</span><br>Azt tárolja mikor láttad az új funkciókról szóló értesítést, hogy feleslegesen ne jelenjen meg újra.<br><br><span style=\"color: grey;\">" + theVRmmNewInfoCookie + ":</span><br>Azt tárolja mikor láttad az új TheVR Stream Infót, hogy feleslegesen ne jelenjen meg újra.<br><br><span style=\"color: grey;\">Google Analytics Cookie-k:</span><br>A Google Analitika szolgáltatása használja. Anoním módon rögzítik, hogy miként használod az oldalt. Ez segíti a későbbi fejlesztéseket.<br><br><span style=\"color: grey;\">cachedIDs, cachedTitles, cachedStreamStart, cachedStreamEnd:</span><br>A menetrend id, cím, kezdési idejét, befejezési idejét tárolják, hogy a legközelebbi megnyitáskor a mobil menetrend ki tudja jelezni, hogy mik a változások.<br><br><span style=\"color: grey;\">wearethevruserid:</span><br>Részletek, Témaválasztás, Naptárhozzáadás funkciók használatának figyeléséhez generált anoním userid.</div></font>";
		} else {
			document.getElementById("popup_content").innerHTML += "<font size=\"1\"><div align=\"left\">A MobilBarát Menetrend által használt cookie-k:<br><br><span style=\"color: grey;\">" + policyAgreementCookie + ":</span><br>A döntésedet tárolja cookie-k használatával kapcsolatban. Ha nem fogadtad el, akkor a többi cookie nem lesz használatban.<br><br><span style=\"color: grey;\">" + themeCookie + ":</span><br>Az általad választott téma bellítását tárolja<br><br><span style=\"color: grey;\">" + newFeatureCookie + ":</span><br>Azt tárolja mikor láttad az új funkciókról szóló értesítést, hogy feleslegesen ne jelenjen meg újra.<br><br><span style=\"color: grey;\">Google Analytics Cookie-k:</span><br>A Google Analitika szolgáltatása használja. Anoním módon rögzítik, hogy miként használod az oldalt. Ez segíti a későbbi fejlesztéseket.<br><br><span style=\"color: grey;\">cachedIDs, cachedTitles, cachedStreamStart, cachedStreamEnd:</span><br>A menetrend id, cím, kezdési idejét, befejezési idejét tárolják, hogy a legközelebbi megnyitáskor a mobil menetrend ki tudja jelezni, hogy mik a változások.</div></font>";
		}
		document.getElementById("popup_content").innerHTML += ""
	}
	if (i == "new") {
		document.getElementById("popup_content").innerHTML = "<br><br><span style=\"color: red\"><b>[Újdonságok]</b></span><br><br>" + newFunction.content;
		createcookie(newFeatureCookie, newFunction.timestamp, 365)
	}
	if (i == "thevrinfo") {
		document.getElementById("popup_content").innerHTML = "<br><br><span style=\"color: red\"><b>[TheVR Stream Infó]</b></span><br><br>" + newFunction.infocontent;
		createcookie(theVRmmNewInfoCookie, newFunction.infotimestamp, 365)
	}
}

/*Cookie létrehozó. Felesleges a negyedik változó. Majd javítanom. name változó alapján azonosítom*/
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
	document.cookie = name + "=" + value + expires;

	if (banner == "banner") { document.getElementById("myCookie").style.display = 'none'; } else if ((name == policyAgreementCookie) | (name == themeCookie)) { modal_open("cookie_settings"); }
	/*Téma választó cookie létrehozásával egyben át is váltjuk az általa képviselt kinézetre*/
	if (name == themeCookie) {
		if (value == "dark") {

			for (var i = 0; i < eventsLength; i++) {
				if ((i == 0) & (liveStatus == "live") & ((liveTimestamp < streamEndZeroElement + 3000) & (liveTimestamp > streamStartZeroElement - 3000))) {
					document.getElementById(i + "_description").style.backgroundColor = "#17141f";
					document.getElementById(i + "_description").style.border = "1px solid #2e2b35";
					document.getElementById(i + "_description").style.color = "#c3c1c8";
				} else {
					document.getElementById(i).style.backgroundColor = "#17141f";
					document.getElementById(i).style.border = "1px solid #2e2b35";
					document.getElementById(i).style.color = "#c3c1c8";
					document.getElementById(i + "_description").style.backgroundColor = "#17141f";
					document.getElementById(i + "_description").style.border = "1px solid #2e2b35"; /*Változtatás ezt itt*/
					document.getElementById(i + "_description").style.color = "#c3c1c8";
				}
			}
			document.body.style.Color = "#c3c1c8";
			document.body.style.backgroundColor = "#0e0c13";
			/*Változtatás : A lenti két dolog, hogy ezek is visszaváltozanak témaváltoztatásnál az oldal újratöltése nélkül, illetve vent a border-t: */
			document.getElementsByClassName("modal-content")[0].style.color = "#c3c1c8";
			document.getElementsByClassName("modal-content")[0].style.backgroundColor = "#17141f";
		}
		if (value == "light") {
			Light();
		}
		modal_open("cookie_settings");
	}
}

function deleteAllCookies(banner) {
	var cookies = document.cookie.split(";");

	for (var i = 0; i < cookies.length; i++) {
		var cookie = cookies[i];
		var eqPos = cookie.indexOf("=");
		var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
		document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
		document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}
	createcookie(policyAgreementCookie, -1, 20, 'banner');
	if (banner == "banner") {
		document.getElementById("myCookie").style.display = 'none';
		createcookie(policyAgreementCookie, -1, 20, 'banner');
	} else { modal_open("cookie_settings"); }


}

function timestampToTime(timestamp) {
	var d = new Date(timestamp * 1000);

	var month = "0" + d.getMonth();
	var day = "0" + d.getDate();
	// Hours part from the timestamp
	var hours = d.getHours();
	// Minutes part from the timestamp
	var minutes = "0" + d.getMinutes();
	// Seconds part from the timestamp
	var seconds = "0" + d.getSeconds();

	var Time = d.getFullYear() + "." + month.substr(-2) + "." + day.substr(-2) + "<br>" + hours + ":" + minutes.substr(-2);
	return Time
}
// When the user clicks on <span> (x), close the modal
function spanonclick() {
	modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}