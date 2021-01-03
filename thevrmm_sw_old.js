//Ez a ServiceWorker a https://css-tricks.com/serviceworker-for-offline/ oldalról származik.
//This ServiceWorker originated from this article: https://css-tricks.com/serviceworker-for-offline/ 

const cacheName = 'v3';
self.addEventListener("install", function (event) {
  console.log('WORKER: install event in progress.');
  event.waitUntil(

    caches.open(cacheName + 'fundamentals').then(function (cache) {
//Itt van az a rész amelyet be kell állítanod:
      return cache.addAll([
        'blyyy_logo.png', //streamerdata.js-ben megadott offlinePic. Vagyis az Offline-nak szánt kép elérési útját illeszd be ide. Mást ne módosíts!
      ]);
    })
      .then(function () {
        console.log('WORKER: install completed');
      })
  );
});

self.addEventListener('activate', e => {
  console.log('Service Worker: Aktiválva!');
  //Töröljük a nemkívánt gyorsítótárakat.
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('ServiceWorker: Töröli a régi gyorítótárat!');
            return caches.delete(cache);
          }
        })
      )
    })
  )
});

//Fetch event meghívása
self.addEventListener('fetch', event => {
  console.log('ServiceWorker: Fetchelés!');
  var twitch_cover = event.request.url.startsWith('https://static-cdn.jtvnw.net/twitch-event');
  if ((event.request.method !== 'GET') | (twitch_cover == true)) {
    console.log('Service Worker: Ne listázd a Post Request és Twitch Cover-eket'); //Azért nem mentjük őket, még ha jobb is lenne így az Offline mód, mert a letárolásuk módja a ServiceWorkerben sok helyet foglal.
    //Tesztelésem során volt amikor 130MB-ra hízott a cache. 
    return;
  }

  event.respondWith(
    caches
      /* This method returns a promise that resolves to a cache entry matching
         the request. Once the promise is settled, we can then provide a response
         to the fetch request.
      */
      .match(event.request)
      .then(function (cached) {
        /* Even if the response is in our cache, we go to the network as well.
           This pattern is known for producing "eventually fresh" responses,
           where we return cached responses immediately, and meanwhile pull
           a network response and store that in the cache.
           Read more:
           https://ponyfoo.com/articles/progressive-networking-serviceworker
        */
        var networked = fetch(event.request)
          // We handle the network request with success and failure scenarios.
          .then(fetchedFromNetwork, unableToResolve)
          // We should catch errors on the fetchedFromNetwork handler as well.
          .catch(unableToResolve);

        /* We return the cached response immediately if there is one, and fall
           back to waiting on the network as usual.
        */
        console.log('WORKER: fetch event', cached ? '(cached)' : '(network)', event.request.url);
        return cached || networked;

        function fetchedFromNetwork(response) {
          /* We copy the response before replying to the network request.
             This is the response that will be stored on the ServiceWorker cache.
          */
          var cacheCopy = response.clone();

          console.log('WORKER: fetch response from network.', event.request.url);

          caches
            // We open a cache to store the response for this request.
            .open(cacheName + 'pages')
            .then(function add(cache) {
              /* We store the response for this request. It'll later become
                 available to caches.match(event.request) calls, when looking
                 for cached responses.
              */
              cache.put(event.request, cacheCopy);
            })
            .then(function () {
              console.log('WORKER: fetch response stored in cache.', event.request.url);
            });

          // Return the response so that the promise is settled in fulfillment.
          return response;
        }

        /* When this method is called, it means we were unable to produce a response
           from either the cache or the network. This is our opportunity to produce
           a meaningful response even when all else fails. It's the last chance, so
           you probably want to display a "Service Unavailable" view or a generic
           error response.
        */
        function unableToResolve() {
          /* There's a couple of things we can do here.
             - Test the Accept header and then return one of the `offlineFundamentals`
               e.g: `return caches.match('/some/cached/image.png')`
             - You should also consider the origin. It's easier to decide what
               "unavailable" means for requests against your origins than for requests
               against a third party, such as an ad provider
             - Generate a Response programmaticaly, as shown below, and return that
          */

          console.log('WORKER: fetch request failed in both cache and network.');

          /* Here we're creating a response programmatically. The first parameter is the
             response body, and the second one defines the options for the response.
          */
          return new Response('<h1>Service Unavailable</h1>', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/html'
            })
          });
        }
      })
  );
})

