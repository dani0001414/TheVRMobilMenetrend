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

function idGenerator() {
    var array = new Uint32Array(2);
    window.crypto.getRandomValues(array);
    return array[0].toString(36).substr(0, 16) + array[1].toString(36).substr(0, 16);
}

for (var i; i < 100; i++) {
    HttpGetNorm("https://script.google.com/macros/s/AKfycbwCuXEIW0pJo4aL8f09tvzPoaJ76t99aPT26kSw1Iji2K39WxNy/exec?func=open-details&user=" + idGenerator());
}