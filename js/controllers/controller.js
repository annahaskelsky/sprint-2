'use strict'

let gCanvas
let gCtx
let gStartPos

const gTouchEvents = ['touchstart', 'touchend', 'touchmove']

function onInit() {
    const images = getImgs()
    renderImgs(images)
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')
    document.querySelector('#gallery').classList.add('active')
    addListeners()
    pickr.on('change', (color) => {
        onChangeColor(color)
    })
    renderMemes()
}

function onOpenCanvas(elImg) {
    var imgId = +elImg.dataset.id
    var image = findImgById(imgId)
    document.querySelector('.active').classList.remove('active')
    document.querySelector('#canvas').classList.add('active')
    resizeCanvas()
    createMeme(image)
    renderCanvas()
}


function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
    })
}

function addMouseListeners() {
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    var currLine = getCurrLine()
    if (checkLineClicked(pos)) {
        currLine.isDrag = true
        gStartPos = pos
        document.querySelector('canvas').style.cursor = 'grabbing'
    }
}

function onMove(ev) {
    var currLine = getCurrLine()
    if (!currLine || !currLine.isDrag) return
    var pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    currLine.pos.x += dx
    currLine.pos.y += dy
    gStartPos = pos
    renderCanvas()
}

function onUp() {
    var currLine = getCurrLine()
    currLine.isDrag = false
    document.querySelector('canvas').style.cursor = 'grab'
}

function setInputTxt() {
    var meme = getMeme()
    var idx = getCurrLineIdx()
    if (idx >= 0) document.querySelector('[name=text-line]').value = meme.lines[idx].txt
    else return
}

function drawText({ color, pos, size, font, align, txt }) {
    gCtx.lineWidth = 5
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.font = `${size}px ${font}`
    gCtx.textAlign = align
    gCtx.strokeText(txt, pos.x, pos.y)
    gCtx.fillText(txt, pos.x, pos.y)
}

function checkLineClicked({ x, y }) {
    var currLine = getCurrLine()
    var linePos = currLine.pos
    var width = getTextWidth() + 40
    var height = currLine.size + 40
    var startX = linePos.x - (width / 2) - 5
    var endX = linePos.x + (width / 2) + 10
    var startY = linePos.y - (height / 2) - 20
    var endY = linePos.y + (height / 2) + 10
    return (x >= startX && x <= endX && y >= startY && y <= endY)
}

function onChangeLine() {
    changeLine()
    renderCanvas()
}

function onDeleteLine() {
    deleteLine()
    renderCanvas()
}

function onSetAlign(direction) {
    setAlign(direction)
    renderCanvas()
}

function onShareMeme() {
    shareMeme()
}

function onDownloadMeme(elLink) {
    var meme = getMeme()
    meme.isSave = true
    renderCanvas()
    setTimeout(() => {
        var imgContent = gCanvas.toDataURL('image/jpeg')
        elLink.href = imgContent
        meme.isSave = false
        renderCanvas()
    }, 1000)
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
            if (!meme.isSave) drawRect()
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

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvents.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

function resizeCanvas() {
    gCanvas.style.width = '100%'
    gCanvas.style.height = '100%'
}

function onSaveMeme() {
    getMeme().isSave = true
    renderCanvas()
    setTimeout(() => {
        saveMeme()
        getMeme().isSave = false
    }, 500)
}

// function openMemes() {
//     document.querySelector('.active').classList.remove('active')
//     document.querySelector('#memes').classList.add('active')
// }

function drawRect() {
    const meme = getMeme()
    if (meme.isSave) return
    const currLine = getCurrLine()
    const width = getTextWidth()
    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'black'
    gCtx.strokeRect(currLine.pos.x - width / 2 - 20, currLine.pos.y - currLine.size, width + 40, currLine.size + 10)
}

function renderImgs(images) {
    let strHTMLs = ''
    images.forEach(img => {
        strHTMLs += `<div><img class="gallery-item" src="${img.url}" data-id="${img.id}" onclick="onOpenCanvas(this)"></div>`
    })
    document.querySelector('.gallery').innerHTML = strHTMLs
}

function onHandleSearch(searchStr) {
    const images = getImgsToRender(searchStr)
    renderImgs(images)
}