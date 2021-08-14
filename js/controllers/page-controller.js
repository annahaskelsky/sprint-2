'use strict'

const onOpenCanvas = image => {
    document.querySelector('.editor-page').classList.add('active')
    resizeCanvas()
    createMeme(image)
    renderCanvas()
}

const onPageChange = (page, elImg) => {
    document.querySelector('.active').classList.remove('active')
    document.querySelector('body').classList.remove('menu-open')
    switch (page) {
        case 'gallery':
            document.querySelector('.gallery-page').classList.add('active')
            break;

        case 'memes':
            document.querySelector('.memes-page').classList.add('active')
            break;

        case 'about':
            document.querySelector('.about-page').classList.add('active')
            break;

        case 'editor':
            if (!elImg) break
            const imgId = +elImg.dataset.id
            const image = findImgById(imgId)
            onOpenCanvas(image)
            break;

        default:
            break;
    }
}