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
const btn2 = document.querySelector('#btn2')
btn2.addEventListener('click', () => {
    console.log('btn2')
    window.myApi.copy()
})
const btn3 = document.querySelector('#btn3')
btn3.addEventListener('click', () => {
    console.log('btn3')
    window.myApi.paste()
})
const btn4 = document.querySelector('#btn4')
btn4.addEventListener('click', () => {
    console.log('btn3')
    window.myApi.captureFunc().then(res => {
        document.querySelector('#img').src = res
    })
})
const btn5 = document.querySelector('#btn5')
btn5.addEventListener('click', () => {
    console.log('btn5')
    const image = window.myApi.testNativeImage()
    console.log(image)
})
