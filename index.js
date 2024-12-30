let isAnimating = false;
let pullDeltaX = 0;
const DESICION_THRESHOLD = 110;

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

    function onMove(event){
        const currentX = event.pageX || event.touches[0].pageX;
        
        pullDeltaX = currentX - startX;

        const deg = pullDeltaX / 14;

        actualCard.style.cursor = 'grabbing';
        actualCard.style.transform = `translateX(${pullDeltaX}px) rotate(${deg}deg)`;
    }

    function onEnd(){
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('touchmove', onMove);

        document.removeEventListener('mouseup', onEnd);
        document.removeEventListener('touchend', onEnd);

       // saber si el usuario tomo una desicion

       const desicionMade = Math.abs(pullDeltaX) > DESICION_THRESHOLD;

       if(desicionMade){
        const goRight = pullDeltaX >= 0;
        const goLeft = !goRight;

        //add the class acording to the desicion
        actualCard.classList.add(goRight ? 'go-right' : 'go-left');
        actualCard.addEventListener('transitionend', ()=>{
            actualCard.remove();
        });
       }else{
        actualCard.classList.add('reset');
        actualCard.classList.remove('go-right', 'go-left');
       }

       //reset the variables
       actualCard.addEventListener('transitionend', ()=>{
            actualCard.removeAttribute('style');
            actualCard.classList.remove('reset');

            pullDeltaX = 0;
            isAnimating = false;
       });

    }
}




document.addEventListener('mousedown', startDrag);
document.addEventListener('touchstart', startDrag, {passive: true});

