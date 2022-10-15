/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import { clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute, createHandlerBoundToURL } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";

clientsClaim();

// Precache all of the assets generated by your build process.
// Their URLs are injected into the manifest variable below.
// This variable must be present somewhere in your service worker file,
// even if you decide not to use precaching. See https://cra.link/PWA
precacheAndRoute(self.__WB_MANIFEST);

// Set up App Shell-style routing, so that all navigation requests
// are fulfilled with your index.html shell. Learn more at
// https://developers.google.com/web/fundamentals/architecture/app-shell
const fileExtensionRegexp = new RegExp("/[^/?]+\\.[^/]+$");
registerRoute(
  // Return false to exempt requests from being fulfilled by index.html.
  ({ request, url }) => {
    // If this isn't a navigation, skip.
    if (request.mode !== "navigate") {
      return false;
    } // If this is a URL that starts with /_, skip.

    if (url.pathname.startsWith("/_")) {
      return false;
    } // If this looks like a URL for a resource, because it contains // a file extension, skip.

    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    } // Return true to signal that we want to use the handler.

    return true;
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + "/index.html")
);

// An example runtime caching route for requests that aren't handled by the
// precache, in this case same-origin .png requests like those from in public/
registerRoute(
  // Add in any other file extensions or routing criteria as needed.
  ({ url }) =>
    url.origin === self.location.origin && url.pathname.endsWith(".png"), // Customize this strategy as needed, e.g., by changing to CacheFirst.
  new StaleWhileRevalidate({
    cacheName: "images",
    plugins: [
      // Ensure that once this runtime cache reaches a maximum size the
      // least-recently used images are removed.
      new ExpirationPlugin({ maxEntries: 50 }),
    ],
  })
);

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Any other custom service worker logic can go here.
self.addEventListener("push", (e) => {
  console.log(e.data);
  let data = JSON.parse(e.data.text());
  var options = {
    body: data.body,
    icon: "https://www.celhoio.it/logo.png",
    //image: "https://www.celhoio.it/logo.png",
    badge: "https://www.celhoio.it/logo64.png",
    lang: "it",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 2,
      url: data.url,
    },
    actions: [
      /*{
        action: "open",
        title: data.action1,
        icon: "images/checkmark.png",
      },*/
      {
        action: "close",
        title: data.action1,
        icon: "images/xmark.png",
      },
    ],
  };
  e.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener(
  "notificationclick",
  function (e) {
    // Close the notification popout
    e.notification.close();
    // Get all the Window clients

    e.waitUntil(
      self.clients.matchAll({ type: "window" }).then((clientsArr) => {
        // If a Window tab matching the targeted URL already exists, focus that;
        const hadWindowToFocus = clientsArr.some((windowClient) =>
          windowClient.url === e.notification.data.url
            ? (windowClient.focus(), true)
            : false
        );
        // Otherwise, open a new tab to the applicable URL and focus it.
        if (!hadWindowToFocus)
          self.clients
            .openWindow(e.notification.data.url)
            .then((windowClient) =>
              windowClient ? windowClient.focus() : null
            );
      })
    );

    if (e.action === "close") {
      e.notification.close();
    }
  },
  false
);

self.addEventListener(
  "pushsubscriptionchange",
  (e) => {
    /*e.waitUntil(
    fetch("https://www.celhoio.it/pushsubchange", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        old_endpoint: e.oldSubscription ? e.oldSubscription.endpoint : null,
        new_endpoint: e.newSubscription ? e.newSubscription.endpoint : null,
        new_p256dh: e.newSubscription
          ? e.newSubscription.toJSON().keys.p256dh
          : null,
        new_auth: e.newSubscription
          ? e.newSubscription.toJSON().keys.auth
          : null,
      }),
    })
  );*/
    const subscription = self.registration.pushManager.subscribe(
      e.oldSubscription.options
    );
    console.log("SUBSCRIPTION CHANGE");
    console.log(subscription);
    /*.then((subscription) =>
        fetch("https://www.celhoio.it/pushsubchange", {
          method: "post",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            endpoint: subscription.endpoint,
          }),
        })
      );*/
    e.waitUntil(subscription);
  },
  false
);
