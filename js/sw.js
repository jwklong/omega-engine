const cacheName = mod.extraNames[1];

self.addEventListener("fetch", event => {
    event.respondWith((async () => {
        try {
            const res = await fetch(event.request);
            (await caches.open(cacheName)).put(event.request, res.clone());
            return res;
        }
        catch (err) {
            return await caches.match(event.request);
        }
    })());
});
