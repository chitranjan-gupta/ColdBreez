console.log("Service worker loaded");
self.addEventListener("push", e => {
    const data = e.data.json();
    console.log("Push Received")
    self.registration.showNotification(data.title, {
        body:'Notified by help',
        icon:'https://wrenchworks.tech/favicon-16x16.png'
    })
})