'use strict'

const shareMeme = () => {
    const imgDataUrl = gCanvas.toDataURL("image/jpeg");

    // A function to be called if request succeeds
    const onSuccess = uploadedImgUrl => {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        const isDesktop = window.innerWidth > 1100
        if (isDesktop) {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`, '_blank')
        } else {
            navigator.share({ title: "Example Page", url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}` })
        }
    }
    doUploadImg(imgDataUrl, onSuccess);
}

const doUploadImg = (imgDataUrl, onSuccess) => {

    const formData = new FormData();
    formData.append('img', imgDataUrl)

    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url);
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
}