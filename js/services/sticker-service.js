'use strict'

const gStickers = [
    {
        id: 1,
        src: 'images-square/stickers/1.png',
        pos: { x: 125, y: 125 },
        isDrag: false
    },
    {
        id: 2,
        src: 'images-square/stickers/2.png',
        pos: { x: 125, y: 125 },
        isDrag: false
    },
    {
        id: 3,
        src: 'images-square/stickers/3.png',
        pos: { x: 125, y: 125 },
        isDrag: false
    },
    {
        id: 4,
        src: 'images-square/stickers/4.webp',
        pos: { x: 125, y: 125 },
        isDrag: false
    }
]

const getStickers = () => {
    const elCanvas = getCanvas()
    gStickers.forEach(sticker => {
        sticker.pos.x = elCanvas.width / 2.5
        sticker.pos.y = elCanvas.height / 2.5
    })
    return gStickers
}

const findStickerById = id => {
    return gStickers.find(sticker => sticker.id === id)
}