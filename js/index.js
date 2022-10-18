const player = document.querySelector('#player');
const ground = document.querySelector('#ground');

let dx = 0;
let dy = 5;
let accelaration = 0.3;
let index = 0;

const draw = () => {
    if (dy != 0) {
        player.style.backgroundImage = `url(../img/templerun/Jump__00${index++}.png)`;
    }
    else if (dx != 0) {
        player.style.backgroundImage = `url(../img/templerun/Run__00${index++}.png)`;
    }
    else {
        player.style.backgroundImage = `url(../img/templerun/Idle__00${index++}.png)`;
    }
    if (index > 8) index = 0;
    requestAnimationFrame(draw);
};

const animate = () => {
    if ((player.offsetLeft + player.offsetWidth) > innerWidth) {
        dx = 0;
        player.style.left = `${innerWidth - player.offsetWidth}px`;
    }
    else if (player.offsetLeft < 0) {
        dx = 0;
        player.style.left = '0';
    }
    else {
        player.style.left = `${player.offsetLeft + dx}px`;
    }
    dy += accelaration;
    if ((player.offsetTop + player.offsetHeight) > ground.offsetTop) {
        dy = 0;
        accelaration = 0
        player.style.top = `${ground.offsetTop - player.offsetHeight}px`;
    }
    player.style.top = `${player.offsetTop + dy}px`;
    requestAnimationFrame(animate);
};

addEventListener('keydown', ({ key }) => {
    if (key === "e") {
        player.classList.remove('turn');
        index = 0;
        dx = 10;
    }
    else if (key === "q") {
        player.classList.add('turn');
        index = 0;
        dx = -10;
    }
});

addEventListener('keyup', ({ key }) => {
    if (key === "e" || key === "q") {
        dx = 0;
    }
});

addEventListener('keypress', ({ key }) => {
    if (key === ' ') {
        index = 0;
        dy = -10;
        accelaration = 0.2;
    }
});

requestAnimationFrame(draw);
requestAnimationFrame(animate);

let j = 0;
let t1 = 0;
const interval = 2;

function repaint(timestamp) {
    if (!t1) t1 = timestamp;
    const diff = timestamp - t1;
    if (diff >= (interval * 1000)) {
        t1 = timestamp;
        console.log('Painted: ' + j++, timestamp);  
    }
    requestAnimationFrame(repaint); 
}
requestAnimationFrame(repaint);