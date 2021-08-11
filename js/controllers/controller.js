'use strict'

let gCanvas
let gCtx
let gStartPos

const gTouchEvents = ['touchstart', 'touchend', 'touchmove']

function onInit() {
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')
    document.querySelector('#gallery').classList.add('active')
    // addListeners()
    pickr.on('change', (color) => {
        onChangeColor(color)
    })
}

function onOpenCanvas(elImg) {
    var imgId = +elImg.dataset.id
    var image = findImgById(imgId)
    document.querySelector('.active').classList.remove('active')
    document.querySelector('#canvas').classList.add('active')
    createMeme(image)
    renderCanvas()
}

function onInsertTxt(elInput) {
    let txt = elInput.value
    console.log(txt);
    gCtx.font = '30px impact'
    gCtx.strokeStyle = 'white'
    gCtx.strokeText(txt, 10, 50)
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
}

function addMouseListeners() {
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mouseUp', onUp)
}

function addTouchListeners() {
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchend', onUp)
}

function setInputTxt() {
    var meme = getMeme()
    document.querySelector('[name=text-line]').value = meme.lines[0].txt
}

function drawText({ color, pos, size, font, align, txt }) {
    gCtx.lineWidth = 5
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.font = `${size}px ${font}`
    console.log(gCtx.font);
    gCtx.textAlign = align
    gCtx.strokeText(txt, pos.x, pos.y)
    gCtx.fillText(txt, pos.x, pos.y)
}


function onSetAlign(direction) {
    setAlign(direction)
    renderCanvas()
}

function renderCanvas() {
    var meme = getMeme()
    var image = findImgById(+meme.selectedImgId)
    const img = new Image()
    img.src = image.url
    img.onload = () => {
        clearCanvas()
        gCtx.drawImage(img, 0, 0)
        setInputTxt()
        meme.lines.forEach(line => {
            drawText(line)
        })
    }
}

function onSetText(elInput) {
    var txt = elInput.value
    setText(txt)
    renderCanvas()
}

function onChangeColor(color) {
    var newColor = color.toRGBA().toString()
    changeColor(newColor)
    renderCanvas()
}

function onChangeFontSize(direction) {
    changeFontSize(direction)
    renderCanvas()
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
}

function onChangeFont(font) {
    changeFont(font)
    renderCanvas()
}

function onAddLine() {
    addLine()
    renderCanvas()
}
