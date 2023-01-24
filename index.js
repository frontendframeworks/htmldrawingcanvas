window.onload = () => {
    var canvas = document.getElementById('my-canvas');



    // SET CANVAS WIDTH
    canvas.width = canvas.height = 600
    canvas.style.width = canvas.style.height = "600px"

    var ctx = canvas.getContext('2d');

    let isPainting = false;
    let lineWidth = 8;

    let startX;
    let startY;

    // DRAW SINGLE CIRCLE
    const draw = (e) => {
        e.preventDefault()

        if (!isPainting) {
            return;
        }
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        if (e.type == "touchstart" || e.type == "touchend" || e.type == "touchmove") {
            ctx.lineTo(e.touches[0].clientX - canvas.getBoundingClientRect().left, e.touches[0].clientY - canvas.getBoundingClientRect().top);
        } else {
            ctx.lineTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
        }

        ctx.stroke();
    }


    // DETECT MOUSE EVENTS 
    canvas.addEventListener('mousedown', (e) => {
        isPainting = true;
        startX = e.clientX;
        startY = e.clientY;
        draw(e)
    });

    canvas.addEventListener('mouseup', e => {
        isPainting = false;
        ctx.stroke();
        ctx.beginPath();
    });

    // DRAW CIRCLE EACH TIME MOUSE MOVES
    canvas.addEventListener('mousemove', draw);


    // DETECT TOUCHES SO IT WORKS ON MOBILE
    canvas.addEventListener('touchstart', (e) => {
        isPainting = true;
        startX = e.touches[0].screenX;
        startY = e.touches[0].screenY;
    });

    canvas.addEventListener('touchend', e => {
        isPainting = false;
        ctx.stroke();
        ctx.beginPath();
    });

    // DRAW CIRCLE EACH TIME TOUCHING FINGER MOVES
    canvas.addEventListener('touchmove', draw);
}