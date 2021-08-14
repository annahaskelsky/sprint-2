'use strict'

const gStickers = [
    {
        id: 1,
        src: 'images-square/stickers/1.png',
        pos: { x: 200, y: 200 },
        mobilePos:{ x: 90, y: 95 },
        tabletPos: { x: 185, y: 200 },
        isDrag: false
    },
    {
        id: 2,
        src: 'images-square/stickers/2.png',
        pos: { x: 200, y: 200 },
        mobilePos:{ x: 90, y: 95 },
        tabletPos: { x: 185, y: 200 },
        isDrag: false
    },
    {
        id: 3,
        src: 'images-square/stickers/3.png',
        pos: { x: 200, y: 200 },
        mobilePos:{ x: 90, y: 95 },
        tabletPos: { x: 185, y: 200 },
        isDrag: false
    },
    {
        id: 4,
        src: 'images-square/stickers/4.webp',
        pos: { x: 200, y: 200 },
        mobilePos:{ x: 90, y: 95 },
        tabletPos: { x: 185, y: 200 },
        isDrag: false
    }
]

const getStickers = () => {
    return gStickers
}

const findStickerById = id => {
    return gStickers.find(sticker => sticker.id === id)
}