self.addEventListener("push", function (event) {
  const data = event.data.json();
  const title = data.title || "스마트 소비진단 도착!";
  const options = {
    body:
      data.body ||
      "손님의 이번 결제, 과연 현명했을까요? 하나로에서 확인해보세요!",
    icon: data.icon || "/img/logo192.png",
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow("/") // 클릭 시 열릴 URL 설정
  );
});
