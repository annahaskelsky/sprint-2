'use strict'

let gMeme
let gMemes = []

const setGMemes = () => {
    gMemes = loadFromStorage('memesDB') || []
}

const createMeme = image => {
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
                mobilePos: { x: 105, y: 36 },
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

const getMeme = () => gMeme

const setGMeme = meme => {
    gMeme = meme
}

const setText = (txt) => {
    if (!gMeme.lines.length) onAddLine()
    gMeme.lines[gMeme.currLineIdx].txt = txt
}

const setAlign = (direction) => {
    const currLine = gMeme.lines[gMeme.currLineIdx]
    const width = getTextWidth()
    if (direction === 'left') currLine.pos.x = 500 - (width / 2) - 10
    else if (direction === 'right') currLine.pos.x = (width / 2) + 10
    else currLine.pos.x = 250
}

const changeFontSize = direction => {
    const diff = (direction === 'up') ? 5 : -5
    gMeme.lines[gMeme.currLineIdx].size += diff
}

const changeColor = color => {
    gMeme.lines[gMeme.currLineIdx].color = color
}

const changeFont = font => {
    gMeme.lines[gMeme.currLineIdx].font = font
}

const addLine = () => {
    let line
    if (!gMeme.lines.length) {
        line = {
            txt: 'Your Caption Here',
            size: 40,
            align: 'center',
            color: 'white',
            font: 'impact',
            pos: { x: 250, y: 100 },
            mobilePos: { x: 105, y: 36 },
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
            mobilePos: { x: 105, y: 187 },
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
            mobilePos: { x: 105, y: 110 },
            tabletPos: { x: 225, y: 240 },
            isDrag: false
        }
    }
    gMeme.lines.push(line)
    gMeme.currLineIdx = gMeme.lines.length - 1
}

const getCurrLineIdx = () => gMeme.currLineIdx

const getCurrLine = () => gMeme.lines[gMeme.currLineIdx]

const getCurrSticker = () => gMeme.stickers[gMeme.currStickerIdx]

const getTextWidth = () => gCtx.measureText(gMeme.lines[gMeme.currLineIdx].txt).width

const changeLine = () => {
    const newIdx = gMeme.currLineIdx + 1
    if (!gMeme.lines[newIdx]) gMeme.currLineIdx = 0
    else gMeme.currLineIdx = newIdx
}

const deleteLine = () => {
    gMeme.lines.splice(gMeme.currLineIdx, 1)
    gMeme.currLineIdx = 0
}

const saveMeme = () => {
    const imgContent = gCanvas.toDataURL('image/jpeg')
    const memeToSave = {
        imgContent,
        gMeme
    }
    gMemes.push(memeToSave)
    saveToStorage('memesDB', gMemes)
    renderMemes()
}

const renderMemes = () => {
    const memes = loadFromStorage('memesDB')
    if (!memes?.length) return
    let strHTMLs = ''
    memes.map((meme, i) => {
        strHTMLs += `<div class="meme-holder"><img src=${meme.imgContent} onclick="onOpenEditor(${i})"></div>`
    })
    document.querySelector('.memes-container').innerHTML = strHTMLs
}

const deleteSticker = () => {
    const idx = gMeme.lastStickerClickedIdx
    const currSticker = gMeme.stickers[idx]
    if (!currSticker) return
    gMeme.stickers.splice(idx, 1)
}