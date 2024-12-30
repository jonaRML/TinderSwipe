let isAnimating = false;
let pullDeltaX = 0;

function startDrag(event){
    if (isAnimating) return;

    //get the first article element
    const actualCard = event.target.closest('article');

    //gte initial position of mause of finger

    const startX = event.pageX || event.touches[0].pageX;

    document.addEventListener('mousemove', onMove);
    document.addEventListener('touchmove', onMove, {passive: true});

    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchend', onEnd, {passive: true});
}

function onMove(event){
    const eventX = event.pageX || event.touches[0].pageX;
    pullDeltaX = eventX - startX;

    if (pullDeltaX > 0) {
        actualCard.style.transform = `translateX(${pullDeltaX}px)`;
    }
}


document.addEventListener('mousedown', startDrag);
document.addEventListener('touchstart', startDrag, {passive: true});

