'use strict'

var gMeme
let gMemes = []

const setGMemes = () => {
    gMemes = loadFromStorage('memesDB') || []
}

function createMeme(image) {
    gMeme = {
        selectedImgId: image.id,
        currLineIdx: 0,
        currStickerIdx: null,
        lastStickerClickedIdx: null,
        isSave: false,
        lines: [
            {
                txt: 'Your Caption Here',
                size: 40,
                align: 'center',
                color: 'white',
                font: 'impact',
                pos: { x: 250, y: 100 },
                mobilePos:{ x: 105, y: 36 },
                tabletPos: { x: 225, y: 75 },
                isDrag: false
            }
        ],
        stickers: []
    }
}

const addSticker = sticker => {
    gMeme.stickers.push(sticker)
}

const getMemeStickers = () => {
    return gMeme.stickers
}

function getMeme() {
    return gMeme
}

function setGMeme(meme) {
    gMeme = meme
}

function setText(txt) {
    if (!gMeme.lines.length) onAddLine()
    gMeme.lines[gMeme.currLineIdx].txt = txt
}

function setAlign(direction) {
    const elCanvasContainer = document.querySelector('.canvas-container')
    const canvasStyle = window.getComputedStyle(elCanvasContainer, null).getPropertyValue('width');
    const canvasWidth = parseFloat(canvasStyle);
    console.log(canvasWidth);
    // gMeme.lines[gMeme.currLineIdx].align = direction
    const currLine = gMeme.lines[gMeme.currLineIdx]
    const width = getTextWidth()
    if (direction === 'left') currLine.pos.x = 500 - (width / 2) - 10
    else if (direction === 'right') currLine.pos.x = (width / 2) + 10
    else currLine.pos.x = 250
}

function changeFontSize(direction) {
    var diff = (direction === 'up') ? 5 : -5
    gMeme.lines[gMeme.currLineIdx].size += diff
}

function changeColor(color) {
    gMeme.lines[gMeme.currLineIdx].color = color
}

function changeFont(font) {
    gMeme.lines[gMeme.currLineIdx].font = font
}

function addLine() {
    var line
    if (!gMeme.lines.length) {
        line = {
            txt: 'Your Caption Here',
            size: 40,
            align: 'center',
            color: 'white',
            font: 'impact',
            pos: { x: 250, y: 100 },
            mobilePos:{ x: 105, y: 36 },
            tabletPos: { x: 225, y: 75 },
            isDrag: false
        }
    } else if (gMeme.lines.length === 1) {
        line = {
            txt: 'Your Caption Here',
            size: 40,
            align: 'center',
            color: 'white',
            font: 'impact',
            pos: { x: 250, y: 450 },
            mobilePos:{ x: 105, y: 187 },
            tabletPos: { x: 225, y: 400 },
            isDrag: false
        }
    } else {
        line = {
            txt: 'Your Caption Here',
            size: 40,
            align: 'center',
            color: 'white',
            font: 'impact',
            pos: { x: 250, y: 275 },
            mobilePos:{ x: 105, y: 110 },
            tabletPos: { x: 225, y: 240 },
            isDrag: false
        }
    }
    gMeme.lines.push(line)
    gMeme.currLineIdx = gMeme.lines.length - 1
}

function getCurrLineIdx() {
    return gMeme.currLineIdx
}

function getCurrLine() {
    return gMeme.lines[gMeme.currLineIdx]
}

function getCurrSticker() {
    return gMeme.stickers[gMeme.currStickerIdx]
}

function getTextWidth() {
    return gCtx.measureText(gMeme.lines[gMeme.currLineIdx].txt).width
}

function changeLine() {
    var newIdx = gMeme.currLineIdx + 1
    if (!gMeme.lines[newIdx]) gMeme.currLineIdx = 0
    else gMeme.currLineIdx = newIdx
}

function deleteLine() {
    gMeme.lines.splice(gMeme.currLineIdx, 1)
    gMeme.currLineIdx = 0
}

function saveMeme() {
    var imgContent = gCanvas.toDataURL('image/jpeg')
    var memeToSave = {
        imgContent,
        gMeme
    }
    gMemes.push(memeToSave)
    saveToStorage('memesDB', gMemes)
    renderMemes()
}

function renderMemes() {
    var memes = loadFromStorage('memesDB')
    if (!memes?.length) return
    var strHTMLs = ''
    memes.map((meme, i) => {
        strHTMLs += `<div class="meme-holder"><img src=${meme.imgContent} onclick="onOpenEditor(${i})"></div>`
    })
    document.querySelector('.memes-container').innerHTML = strHTMLs
}

function deleteSticker() {
    const idx = gMeme.lastStickerClickedIdx
    console.log(idx);
    const currSticker = gMeme.stickers[idx]
    console.log(currSticker);
    if(!currSticker) return
    gMeme.stickers.splice(idx, 1)
    console.log(gMeme.stickers);
}