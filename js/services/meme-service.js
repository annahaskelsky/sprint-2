'use strict'

var gMeme

function createMeme(image) {
    gMeme = {
        selectedImgId: image.id,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'Your Text Here',
                size: 40,
                align: 'center',
                color: 'white',
                font: 'impact',
                pos: {x: 250, y:100}
            }
        ]
    }
}

function getMeme() {
    return gMeme
}

function setText(txt) {
    gMeme.lines[0].txt = txt
}

function setAlign(direction) {
    gMeme.lines[0].align = direction
}

function changeFontSize(direction) {
    var diff = (direction==='up') ? 5 : -5
    gMeme.lines[0].size += diff
}

function changeColor(color) {
    gMeme.lines[0].color = color
}

function changeFont(font) {
    gMeme.lines[0].font = font
}

function addLine() {
    var line = {
        txt: 'Your Text Here',
                size: 40,
                align: 'center',
                color: 'white',
                font: 'impact',
                pos: {x: 250, y:450}
    }
    gMeme.lines.push(line)
}