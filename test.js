// const fs = require('fs')

// fs.writeFile('./test.txt', '1244443', e => {
//     console.log(process.platform)
// })
console.log(window.myApi)
const btn = document.querySelector('#btn')
btn.addEventListener('click', () => {
    console.log('btn')
    window.myApi.handleSend()
})
