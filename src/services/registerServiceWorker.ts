// 서비스 워커 실행 함수
function registerServiceWorker() {
  navigator.serviceWorker
    .register("firebase-messaging-sw.js")
    .then(function (registration) {
      console.log("Service Worker 등록 성공:", registration);
    })
    .catch(function (error) {
      console.log("Service Worker 등록 실패:", error);
    });
}

export { registerServiceWorker };
