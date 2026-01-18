// logvisit.js — Secure visitor tracker with better client info
(function () {
  const ENDPOINT = "save_visit.php";
  const KEY = "visit_start_time";
  const API_KEY = "YOUR_SECRET_KEY"; // must match save_visit.php

  function getDeviceType() {
    const ua = navigator.userAgent;
    if (/mobile/i.test(ua)) return "Mobile";
    if (/tablet/i.test(ua)) return "Tablet";
    return "Desktop";
  }

  if (!sessionStorage.getItem(KEY)) {
    const payload = {
      api_key: API_KEY,
      event: "start",
      timestamp_client: new Date().toISOString(),
      client: {
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        deviceType: getDeviceType(),
        cookieEnabled: navigator.cookieEnabled,
        screen: { width: screen.width, height: screen.height },
        viewport: { width: innerWidth, height: innerHeight },
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        referrer: document.referrer || "direct",
        location: window.location.href
      }
    };
    navigator.sendBeacon(ENDPOINT, JSON.stringify(payload));
    sessionStorage.setItem(KEY, Date.now().toString());
  }

  function sendEndEvent() {
    const start = parseInt(sessionStorage.getItem(KEY));
    if (!start) return;
    const duration = Math.round((Date.now() - start) / 1000);
    const payload = {
      api_key: API_KEY,
      event: "end",
      timestamp_client: new Date().toISOString(),
      duration_seconds: duration
    };
    navigator.sendBeacon(ENDPOINT, JSON.stringify(payload));
    sessionStorage.removeItem(KEY);
  }

  window.addEventListener("pagehide", sendEndEvent);
  window.addEventListener("beforeunload", sendEndEvent);
})();
