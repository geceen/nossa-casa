// Service worker do app Nossa Casa — deixa o app instalável e funcionando sem internet.
// A página (index.html) e o config.js vêm sempre da internet quando houver conexão;
// sem internet, abre a última versão guardada. Os dados sincronizam pelo Firebase quando a conexão voltar.
const VERSAO = "nossa-casa-v1";
const APP = VERSAO + "-app", LIBS = "nossa-casa-libs-v1";
const PRE_APP = ["./", "config.js", "manifest.webmanifest", "icon-192.png", "icon-512.png", "icon-maskable.png"];
const PRE_LIBS = [
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js",
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js",
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth-compat.js",
  "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,800&family=Nunito:wght@400;600;700;800&display=swap"
];
const LIB_HOSTS = ["www.gstatic.com", "fonts.googleapis.com", "fonts.gstatic.com"];

self.addEventListener("install", e => {
  e.waitUntil(Promise.all([
    caches.open(APP).then(c => Promise.all(PRE_APP.map(u => fetch(u, { cache: "no-store" }).then(r => { if (r && r.ok) return c.put(u, r); }).catch(() => {})))),
    caches.open(LIBS).then(c => Promise.all(PRE_LIBS.map(u => fetch(u, { mode: "no-cors" }).then(r => c.put(u, r)).catch(() => {}))))
  ]).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== APP && k !== LIBS).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
function comPrazo(p, ms) { return new Promise((ok, erro) => { const t = setTimeout(() => erro(new Error("lento")), ms); p.then(r => { clearTimeout(t); ok(r); }, x => { clearTimeout(t); erro(x); }); }); }
function ehPagina(req, url) {
  if (req.mode === "navigate") return true;
  if (url.origin !== self.location.origin) return false;
  const p = url.pathname;
  return p.endsWith("/") || p.endsWith("/index.html");
}
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // bibliotecas (Firebase, fontes): do cache, e guarda as novas. Nunca intercepta o tráfego de dados do Firestore.
  if (LIB_HOSTS.includes(url.hostname)) {
    e.respondWith(caches.open(LIBS).then(c => c.match(req, { ignoreVary: true }).then(r => r || fetch(req).then(res => { if (res && (res.ok || res.type === "opaque")) c.put(req, res.clone()); return res; }))));
    return;
  }
  if (url.origin !== self.location.origin) return;
  if (ehPagina(req, url)) {
    const rede = fetch(req.url, { cache: "no-store", credentials: "same-origin" }).then(res => {
      if (res && res.ok) { const copia = res.clone(); caches.open(APP).then(c => c.put("./", copia)); }
      return res;
    });
    e.respondWith(comPrazo(rede, 7000).catch(() => caches.open(APP).then(c => c.match("./").then(x => x || rede))));
    return;
  }
  const rede = fetch(req, { cache: "no-store" }).then(res => { if (res && res.ok) { const copia = res.clone(); caches.open(APP).then(c => c.put(req, copia)); } return res; });
  e.respondWith(comPrazo(rede, 10000).catch(() => caches.open(APP).then(c => c.match(req, { ignoreSearch: true }).then(r => r || rede))));
});
