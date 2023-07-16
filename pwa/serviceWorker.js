const siteCache = "site-cache-v2";
const dynamicCache = "dynamic-cache-v1";
const assets = [
	"/",
	"/manifest.json",

	"https://code.jquery.com/jquery-3.6.0.min.js",
	"https://foreverinc.github.io/redo_static_files/js/main.js",
	"https://foreverinc.github.io/redo_static_files/js/app_theming.js",
	"https://foreverinc.github.io/redo_static_files/images/logo.svg",
	"https://foreverinc.github.io/redo_static_files/images/badge.svg",
	"https://foreverinc.github.io/redo_static_files/images/favicon.ico",
	"https://foreverinc.github.io/redo_static_files/images/coins.png",
	"https://foreverinc.github.io/redo_static_files/images/banner.png",
	"https://foreverinc.github.io/redo_static_files/images/default_avater.webp",
	"https://foreverinc.github.io/redo_static_files/css/output.css",
	"https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;1,100;1,300;1,400;1,500;1,700&display=swap",
	"/accounts/login/",
	"accounts/signup/",
	"https://foreverinc.github.io/redo_static_files/pwa/icons/pwa-192x192.png",
	"https://foreverinc.github.io/redo_static_files/pwa/icons/pwa-64x64.png",
	"https://foreverinc.github.io/redo_static_files/pwa/icons/pwa-512x512.png",
	"https://foreverinc.github.io/redo_static_files/pwa/icons/apple-splash-2048-2732.jpg",
	"https://foreverinc.github.io/redo_static_files/pwa/icons/apple-splash-2732-2048.jpg",
	"https://foreverinc.github.io/redo_static_files/pwa/icons/apple-splash-1668-2388.jpg",
	"https://foreverinc.github.io/redo_static_files/pwa/icons/apple-splash-2388-1668.jpg",
	"https://foreverinc.github.io/redo_static_files/pwa/icons/apple-splash-1536-2048.jpg",
	"https://foreverinc.github.io/redo_static_files/pwa/icons/apple-splash-2048-1536.jpg",
	"https://foreverinc.github.io/redo_static_files/pwa/icons/apple-splash-1668-2224.jpg",
	"https://foreverinc.github.io/redo_static_files/pwa/icons/apple-splash-2224-1668.jpg",
	"https://foreverinc.github.io/redo_static_files/pwa/icons/apple-splash-1620-2160.jpg",
	"https://foreverinc.github.io/redo_static_files/pwa/icons/apple-splash-2160-1620.jpg",
	"https://foreverinc.github.io/redo_static_files/pwa/icons/apple-splash-1290-2796.jpg",
	"https://foreverinc.github.io/redo_static_files/pwa/icons/apple-splash-2796-1290.jpg",
	"https://foreverinc.github.io/redo_static_files/pwa/icons/apple-splash-1179-2556.jpg",
	"https://foreverinc.github.io/redo_static_files/pwa/icons/apple-splash-2556-1179.jpg",
	"https://foreverinc.github.io/redo_static_files/pwa/icons/apple-splash-1284-2778.jpg",
	"https://foreverinc.github.io/redo_static_files/pwa/icons/apple-splash-2778-1284.jpg",
	"https://foreverinc.github.io/redo_static_files/pwa/icons/apple-splash-1170-2532.jpg",
	"https://foreverinc.github.io/redo_static_files/pwa/icons/apple-splash-2532-1170.jpg",
	"https://foreverinc.github.io/redo_static_files/pwa/icons/apple-splash-1125-2436.jpg",
	"https://foreverinc.github.io/redo_static_files/pwa/icons/apple-splash-2436-1125.jpg",
	"https://foreverinc.github.io/redo_static_files/pwa/icons/apple-splash-1242-2688.jpg",
	"https://foreverinc.github.io/redo_static_files/pwa/icons/apple-splash-2688-1242.jpg",
	"https://foreverinc.github.io/redo_static_files/pwa/icons/apple-splash-828-1792.jpg",
	"https://foreverinc.github.io/redo_static_files/pwa/icons/apple-splash-1792-828.jpg",
	"https://foreverinc.github.io/redo_static_files/pwa/icons/apple-splash-1242-2208.jpg",
	"https://foreverinc.github.io/redo_static_files/pwa/icons/apple-splash-2208-1242.jpg",
	"https://foreverinc.github.io/redo_static_files/pwa/icons/apple-splash-750-1334.jpg",
	"https://foreverinc.github.io/redo_static_files/pwa/icons/apple-splash-1334-750.jpg",
	"https://foreverinc.github.io/redo_static_files/pwa/icons/apple-splash-640-1136.jpg",
	"https://foreverinc.github.io/redo_static_files/pwa/icons/apple-splash-1136-640.jpg",
];


self.addEventListener("install", (evt) => {
	evt.waitUntil(
		caches.open(siteCache).then((cache) => {
			return cache.addAll(assets);
		})
	);
});

self.addEventListener("activate", (evt) => {
	evt.waitUntil(
		caches.keys().then((keys) => {
			return Promise.all(
				keys
					.filter((key) => key !== siteCache && key !== dynamicCache)
					.map((key) => caches.delete(key))
			);
		})
	);
});

self.addEventListener("fetch", (evt) => {
	// Handle fetch request
	// Check if online, external, font, CSS, HTML
	const isOnline = self.navigator.onLine;
	const url = new URL(evt.request.url);
	const isImage =
		url.pathname.includes(".png") ||
		url.pathname.includes(".jpg") ||
		url.pathname.includes(".jpeg") ||
		url.pathname.includes(".gif");
	const isSVG = url.pathname.includes(".svg");
	const isStaticImg = url.pathname.includes("/static/images");
	const isDefaultAvatar = url.pathname.includes("default_avater.webp");
	const isCss =
		url.pathname.endsWith(".css") ||
		url.hostname.includes("googleapis.com");
	const isFont =
		url.hostname.includes("gstatic") || url.pathname.endsWith("woff2");
	const selfUrl = new URL(self.location);
	const isExternal =
		evt.request.mode === "cors" || selfUrl.hostname !== url.hostname;

	// Respond with appropriate strategy
	if (isOnline) {
		if (isDefaultAvatar || isCss || isFont || isSVG || isStaticImg) {
			evt.respondWith(cacheFirst(evt));
		} else if (isImage) {
			evt.respondWith(
				networkRevalidateAndCache(evt) || offlineResponse(evt)
			);
		} else {
			evt.respondWith(cacheFirst(evt)); // Handle other resources with cache-first strategy
		}
	} else {
		evt.respondWith(offlineResponse(evt));
	}
});

async function cacheOnly(evt) {
	// Cache only strategy: Return the response from cache if available, otherwise, respond with cache
	return await caches.match(evt.request);
}

async function cacheFirst(evt) {
	// Cache first strategy: Attempt to fetch the response from cache, if available, return it. Otherwise, fetch it from the network and cache the response for future use.
	const cacheResponse = await caches.match(evt.request);
	return cacheResponse || fetch(evt.request);
}

async function networkOnly(evt) {
	// Network only strategy: Always fetch the response from the network without caching it.
	return await fetch(evt.request);
}

async function networkRevalidateAndCache(evt) {
	// Cache with network fallback strategy: First, attempt to fetch the response from cache. If available, return it. If not, fetch it from the network and cache the response for future use.
	const fetchResponse = await fetch(evt.request);
	if (fetchResponse.ok) {
		const cache = await caches.open(siteCache);
		cache.put(evt.request, fetchResponse.clone());
		return fetchResponse;
	} else {
		return await caches.match(evt.request);
	}
}

async function networkFirst(evt) {
	// Network first strategy: First, attempt to fetch the response from the network. If successful, return it and cache the response for future use. If the network request fails, fallback to the cache and return the response if available.
	const fetchResponse = await fetch(evt.request);
	if (fetchResponse.ok) {
		return fetchResponse;
	} else {
		return await caches.match(evt.request);
	}
}

async function staleWhileRevalidate(evt) {
	// Stale-while-revalidate strategy: Return the response from the cache while simultaneously sending a request to the network to check for an updated response. If an updated response is received, cache it and return the updated response.
	const cacheResponse = await caches.match(evt.request);
	const fetchResponse = await fetch(evt.request);
	if (fetchResponse.ok) {
		const cache = await caches.open(siteCache);
		cache.put(evt.request, fetchResponse.clone());
		return fetchResponse;
	} else {
		return cacheResponse;
	}
}

async function offlineResponse(evt) {
	// Return a specific placeholder image from the cache
	return await caches.match("/offline/");
}

async function fakeServerError(evt) {
	// Pretend to have a server-side error
}
