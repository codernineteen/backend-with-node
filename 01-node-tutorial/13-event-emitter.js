const EventEmitter = require('events');

const customEmitter = new EventEmitter() //invoke module

customEmitter.on('response', (name, id) => {
    console.log('data recieved' + `${id}:${name}`)
})

customEmitter.on('response', () => {
    console.log('some other logic here')
})

customEmitter.emit('response', 'yechan', 21)