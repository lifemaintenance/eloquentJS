let promise = Promise.reject(new Error('Promise Error!'))

promise.catch(error => console.log('caught!'))

// Не сработает, ошибка поймана!
window.addEventListener('unhandledrejection', event => console.log(event.reason))

setTimeout(() => console.log('set time out'))
console.log('console log')
Promise.resolve(console.log('promise'))


