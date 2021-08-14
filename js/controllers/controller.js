'use strict'

let gCanvas
let gCtx
let gStartPos

const gTouchEvents = ['touchstart', 'touchend', 'touchmove']

const onInit = () => {
    setGMemes()
    const images = getImgs()
    renderImgs(images)
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')
    document.querySelector('.gallery-page').classList.add('active')
    addListeners()
    pickr.on('change', (color) => {
        onChangeColor(color)
    })
    renderMemes()
    renderStickers()
}

const addListeners = () => {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
    })
}

const addMouseListeners = () => {
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mouseup', onUp)
}

const addTouchListeners = () => {
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchend', onUp)
}

const onDown = ev => {
    const pos = getEvPos(ev)
    const isTouch = checkIfTouch(ev)
    const currLine = getCurrLine()
    checkStickerClicked(pos, isTouch)
    const currSticker = getCurrSticker()
    if (currSticker) {
        gStartPos = pos
        document.querySelector('canvas').style.cursor = 'grabbing'
    }
    if (checkLineClicked(pos, isTouch)) {
        currLine.isDrag = true
        gStartPos = pos
        document.querySelector('canvas').style.cursor = 'grabbing'
    }
}

const checkIfTouch = (ev) => {
    return gTouchEvents.includes(ev.type)
}

const onMove = ev => {
    const currLine = getCurrLine()
    const currSticker = getCurrSticker()
    
    if (!currLine?.isDrag && !currSticker) return
    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    if (currLine?.isDrag) {
        currLine.pos.x += dx
        currLine.pos.y += dy
    } else {
        currSticker.pos.x += dx
        currSticker.pos.y += dy
    }
    gStartPos = pos
    renderCanvas()
}

const onUp = () => {
    const meme = getMeme()
    meme.currStickerIdx = null
    const currLine = getCurrLine()
    if (!currLine) return
    currLine.isDrag = false
    document.querySelector('canvas').style.cursor = 'grab'
}

const setInputTxt = () => {
    const meme = getMeme()
    const idx = getCurrLineIdx()
    if (!meme.lines[idx]) {
        document.querySelector('[name=text-line]').value = ''
        return
    }
    if (idx >= 0) document.querySelector('[name=text-line]').value = meme.lines[idx].txt
    else return
}

const drawText = ({ color, pos, size, font, align, txt }) => {
    gCtx.lineWidth = 5
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = color
    gCtx.font = `${size}px ${font}`
    gCtx.textAlign = align
    gCtx.strokeText(txt, pos.x, pos.y)
    gCtx.fillText(txt, pos.x, pos.y)
}

const drawSticker = sticker => {
    const img = new Image()
    img.src = sticker.src
    img.onload = () => {
        gCtx.drawImage(img, sticker.pos.x, sticker.pos.y, 100, 100)
    }
}

const checkLineClicked = ({ x, y }, isTouch) => {
    const currLine = getCurrLine()
    if (!currLine) return
    const isDesktop = window.innerWidth > 1150
    let linePos
    if (isTouch && !isDesktop) linePos = currLine.mobilePos
    else if (isTouch && isDesktop) linePos = currLine.tabletPos
    else linePos = currLine.pos
    const width = getTextWidth() + 40
    const height = currLine.size + 40
    const startX = linePos.x - (width / 2) - 5
    const endX = linePos.x + (width / 2) + 10
    const startY = linePos.y - (height / 2) - 20
    const endY = linePos.y + (height / 2) + 10
    return (x >= startX && x <= endX && y >= startY && y <= endY)
}

const checkStickerClicked = ({ x, y }, isTouch) => {
    const meme = getMeme()
    const stickers = getMemeStickers()
    const elCanvas = document.querySelector('canvas')
    const canvasWidth = +window.getComputedStyle(elCanvas, null).getPropertyValue('width').slice(0, 3)
    const isMobile = (canvasWidth < 400)
    let stickerPos

    const currentStickerIdx = stickers.findIndex(sticker => {
        if (isTouch && isMobile) stickerPos = sticker.mobilePos
        else if (isTouch && !isMobile) stickerPos = sticker.tabletPos
        else stickerPos = sticker.pos
        const startX = stickerPos.x
        const endX = startX + 100
        const startY = stickerPos.y
        const endY = startY + 100
        return x >= startX && x <= endX && y >= startY && y <= endY
    })

    meme.currStickerIdx = currentStickerIdx >= 0 ? currentStickerIdx : null
    meme.lastStickerClickedIdx = currentStickerIdx
    renderCanvas()
}

const onChangeLine = () => {
    changeLine()
    renderCanvas()
}

const onDeleteLine = () => {
    deleteLine()
    renderCanvas()
}

const onSetAlign = direction => {
    setAlign(direction)
    renderCanvas()
}

const onShareMeme = () => {
    shareMeme()
}

const onDownloadMeme = elLink => {
    const meme = getMeme()
    meme.isSave = true
    renderCanvas()
    setTimeout(() => {
        const imgContent = gCanvas.toDataURL('image/jpeg')
        elLink.href = imgContent
        elLink.download = "my-meme.jpeg"
        meme.isSave = false
        renderCanvas()
    }, 100)
}

const renderCanvas = () => {
    const meme = getMeme()
    const image = findImgById(+meme.selectedImgId)
    const img = new Image()
    img.src = image.url
    img.onload = () => {
        clearCanvas()
        gCtx.drawImage(img, 0, 0)
        setInputTxt()
        meme.lines.forEach(line => {
            drawText(line)
        })
        if (!meme.isSave) drawRect(true)
        meme.stickers.forEach(sticker => {
            drawSticker(sticker)
            if (!meme.isSave) drawRect(false)
        })
    }
}

const onSetText = elInput => {
    const txt = elInput.value
    setText(txt)
    renderCanvas()
}

const onBlurCheck = () => {
    const currLine = getCurrLine()
    if (!currLine?.txt.length) onDeleteLine()
}

const onChangeColor = color => {
    const newColor = color.toRGBA().toString()
    changeColor(newColor)
    renderCanvas()
}

const onChangeFontSize = direction => {
    changeFontSize(direction)
    renderCanvas()
}

const clearCanvas = () => {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
}

const onChangeFont = font => {
    changeFont(font)
    renderCanvas()
}

const onAddLine = () => {
    addLine()
    renderCanvas()
}

const getEvPos = ev => {

    const pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvents.includes(ev.type)) {
        const rect = ev.target.getBoundingClientRect()
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos.x = ev.clientX - rect.x
        pos.y = ev.clientY - rect.y
    }
    return pos
}

const resizeCanvas = () => {
    gCanvas.style.width = '100%'
    gCanvas.style.height = '100%'
}

const onSaveMeme = (elBtn) => {
    elBtn.innerHTML = `<i class="fas fa-check"></i>Saved`
    setTimeout(() => {
        elBtn.innerHTML = `<i class="fas fa-save"></i>Save`
    }, 1000)
    getMeme().isSave = true
    renderCanvas()
    setTimeout(() => {
        saveMeme()
        getMeme().isSave = false
    }, 500)
}

const drawRect = (isLine) => {
    const meme = getMeme()
    if (meme.isSave) return
    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'black'
    if (isLine) {
        const currLine = getCurrLine()
        if (!currLine) return
        const width = getTextWidth()
        gCtx.strokeRect(currLine.pos.x - width / 2 - 20, currLine.pos.y - currLine.size, width + 40, currLine.size + 10)
    } else {
        const currSticker = meme.stickers[meme.lastStickerClickedIdx]
        if (!currSticker) return
        gCtx.strokeRect(currSticker.pos.x, currSticker.pos.y, 100, 100)
    }
}

const renderImgs = images => {
    let strHTMLs = ''
    images.forEach(img => {
        strHTMLs += `<div><img class="gallery-item" src="${img.url}" data-id="${img.id}" onclick="onPageChange('editor' ,this)"></div>`
    })
    document.querySelector('.gallery').innerHTML = strHTMLs
}

const onHandleSearch = searchStr => {
    const images = getImgsToRender(searchStr)
    renderImgs(images)
}

const onKeywordClick = (elKeyword) => {
    const keyword = elKeyword.innerText
    const keywordStyle = window.getComputedStyle(elKeyword, null).getPropertyValue('font-size')
    const keywordFontSize = parseFloat(keywordStyle)
    if (keywordFontSize < 22) elKeyword.style.fontSize = (keywordFontSize + 1) + 'px'
    const images = getImgsToRender(keyword)
    renderImgs(images)
    document.querySelector('[name=search]').value = keyword
}

const onClearFilters = () => {
    const images = getImgs()
    renderImgs(images)
    document.querySelector('[name=search]').value = ''
}

const renderStickers = () => {
    const stickers = getStickers()
    let strHTMLs = ''
    stickers.forEach(sticker => {
        strHTMLs += `<img class="sticker-item" src="${sticker.src}" data-id="${sticker.id}" onclick="onStickerClicked(this)">`
    })
    strHTMLs += `<button class="delete-sticker-btn flex align-center justify-center" onclick="onDeleteSticker()">
        <img src="./images-square/icons/delete.png" alt="" />
    </button>`
    document.querySelector('.sticker-container').innerHTML = strHTMLs
}

const onStickerClicked = elSticker => {
    const id = +elSticker.dataset.id
    const sticker = findStickerById(id)
    addSticker(sticker)
    const img = new Image()
    img.src = sticker.src
    img.onload = () => {
        gCtx.drawImage(img, sticker.pos.x, sticker.pos.y, 100, 100)

    }
    renderCanvas()
}

const onOpenEditor = (idx) => {
    const memes = loadFromStorage('memesDB')
    const currMeme = memes[idx].gMeme
    renderEditor(currMeme)
}

const renderEditor = meme => {
    meme.isSave = false
    setGMeme(meme)
    const currMeme = getMeme()
    const image = findImgById(+currMeme.selectedImgId)
    const img = new Image()
    img.src = image.url
    document.querySelector('.active').classList.remove('active')
    document.querySelector('.editor-page').classList.add('active')
    img.onload = () => {
        clearCanvas()
        gCtx.drawImage(img, 0, 0)
        const memeFirstLine = currMeme.lines[0]?.txt
        if (memeFirstLine) document.querySelector('[name=text-line]').value = memeFirstLine
        currMeme.lines.forEach(line => {
            drawText(line)
            if (!currMeme.isSave) drawRect(true)
        })
        currMeme.stickers.forEach(sticker => {
            drawSticker(sticker)
        })
    }
    resizeCanvas()
}

const toggleMenu = () => {
    document.body.classList.toggle('menu-open')
}

const onDeleteSticker = () => {
    deleteSticker()
    renderCanvas()
}