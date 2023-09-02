if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(reg => { return })
        .catch(errr => console.log('Service Worker NOT Registered !' + errr));
}