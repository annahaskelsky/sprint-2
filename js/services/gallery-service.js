'use strict'

const gImages = [
    {
        id: 1,
        url: 'images-square/1.jpg',
        keywords: ['politics', 'funny', 'men', 'comic', 'trump']
    },
    {
        id: 2,
        url: 'images-square/2.jpg',
        keywords: ['animal', 'dog', 'cute']
    },
    {
        id: 3,
        url: 'images-square/3.jpg',
        keywords: ['baby', 'puppy', 'dog', 'cute', 'animal']
    },
    {
        id: 4,
        url: 'images-square/4.jpg',
        keywords: ['cat', 'animal', 'tired', 'cute']
    },
    {
        id: 5,
        url: 'images-square/5.jpg',
        keywords: ['kid', 'funny', 'child', 'victory', 'win', 'comic']
    },
    {
        id: 6,
        url: 'images-square/6.jpg',
        keywords: ['science', 'funny', 'men', 'history', 'comic']
    },
    {
        id: 7,
        url: 'images-square/7.jpg',
        keywords: ['kid', 'funny', 'child', 'comic', 'excited']
    },
    {
        id: 8,
        url: 'images-square/8.jpg',
        keywords: ['tell me more', 'funny', 'men', 'comic', 'interested']
    },
    {
        id: 9,
        url: 'images-square/9.jpg',
        keywords: ['kid', 'funny', 'child', 'mean', 'evil', 'vicious', 'plot']
    },
    {
        id: 10,
        url: 'images-square/10.jpg',
        keywords: ['politics', 'funny', 'men', 'obama', 'comic', 'laugh', 'smile']
    },
    {
        id: 11,
        url: 'images-square/11.jpg',
        keywords: ['rassling', 'funny', 'men', 'comic', 'close']
    },
    {
        id: 12,
        url: 'images-square/12.jpg',
        keywords: ['surprise', 'funny', 'men', 'comic', 'blame']
    },
    {
        id: 13,
        url: 'images-square/13.jpg',
        keywords: ['cheers', 'funny', 'men', 'comic', 'salute']
    },
    {
        id: 14,
        url: 'images-square/14.jpg',
        keywords: ['men in black', 'funny', 'men', 'comic']
    },
    {
        id: 15,
        url: 'images-square/15.jpg',
        keywords: ['one does not simply', 'funny', 'men', 'comic']
    },
    {
        id: 16,
        url: 'images-square/16.jpg',
        keywords: ['laugh', 'funny', 'men', 'comic']
    },
    {
        id: 17,
        url: 'images-square/17.jpg',
        keywords: ['politics', 'funny', 'men', 'comic', 'putin']
    },
    {
        id: 18,
        url: 'images-square/18.jpg',
        keywords: ['toy story', 'funny', 'kids', 'comic', 'everywhere']
    }
]

const findImgById = id => gImages.find(img => img.id === id)

const getImgs = () => gImages

const getImgsToRender = searchStr => {
    const filteredImages = gImages.filter(image => (
        image.keywords.some(keyword => keyword.includes(searchStr.toLowerCase()))
    ))

    return filteredImages
}