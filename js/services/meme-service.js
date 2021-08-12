'use strict'

var gMeme
var gMemes = []

function createMeme(image) {
    gMeme = {
        selectedImgId: image.id,
        currLineIdx: 0,
        isSave: false,
        lines: [
            {
                txt: 'Your Text Here',
                size: 40,
                align: 'center',
                color: 'white',
                font: 'impact',
                pos: { x: 250, y: 100 },
                isDrag: false
            }
        ]
    }
}

function getMeme() {
    return gMeme
}

function setText(txt) {
    gMeme.lines[gMeme.currLineIdx].txt = txt
}

function setAlign(direction) {
    gMeme.lines[gMeme.currLineIdx].align = direction
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
            txt: 'Your Text Here',
            size: 40,
            align: 'center',
            color: 'white',
            font: 'impact',
            pos: { x: 250, y: 100 },
            isDrag: false
        }
    } else if (gMeme.lines.length === 1) {
        line = {
            txt: 'Your Text Here',
            size: 40,
            align: 'center',
            color: 'white',
            font: 'impact',
            pos: { x: 250, y: 450 },
            isDrag: false
        }
    } else {
        line = {
            txt: 'Your Text Here',
            size: 40,
            align: 'center',
            color: 'white',
            font: 'impact',
            pos: { x: 250, y: 275 },
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
    gMemes.push(imgContent)
    saveToStorage('memesDB', gMemes)
}

function renderMemes() {
    var memes = loadFromStorage('memesDB')
    if (!memes || !memes.length) return
    var strHTMLs = ''
    memes.forEach(meme => {
        strHTMLs += `<div class="meme-holder"><img src=${meme}></div>`
    })
    document.querySelector('#memes').innerHTML = strHTMLs
}