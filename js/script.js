$(document).ready(function () {
  console.log("js");

  if (Notification.permission === "default") {
    console.log("can request permission");
  }

  const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register(
          '/js/push-worker.js',
          {
            scope: '/js/',
          }
        );
        if (registration.installing) {
          console.log('Service worker installing');
        } else if (registration.waiting) {
          console.log('Service worker installed');
        } else if (registration.active) {
          console.log('Service worker active');
        }
      } catch (error) {
        console.error(`Registration failed with ${error}`);
      }
    }
  };

  $(".popup").hide();

  const acceptNotif = () => {
    $(".popup").hide();
    Notification.requestPermission(result => {
      if (result === "granted") {
        // window.UA.then(sdk => {
        //   sdk.register();
        // });

        console.log("granted");
      }
    });
  };

  const showPopup = () => {
    $(".popup").show();
  }

  const sendNotif = () => {
    new Notification("hello");
  }

  $(".show_popup").click(() => {
    showPopup();
  });

  $(".yes_btn").click(() => {
    acceptNotif();
  });

  $(".no_btn").click(() => {
    $(".popup").hide();
  });

  $(".send_notif").click(() => {
    sendNotif();
  })

  // console.log(ServiceWorkerRegistration.prototype);
  // if (ServiceWorkerRegistration.prototype) {
  //   Notification.requestPermission(result => {
  //     console.log("res: ", result);
  //     if (result === "granted") {
  //       navigator.serviceWorker.ready.then(function (registration) {
  //         console.log("reg: ", registration);
  //         registration.showNotification("Notification with ServiceWorker");
  //       }).catch(err => { console.log("error: ", err) });
  //     }
  //   })
  // }

  // if (window.Notification && Notification.permission === "granted") {
  //   ServiceWorkerRegistration.prototype.showNotification("test test");
  // }
  
  registerServiceWorker();
})