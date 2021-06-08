class App {
    constructor() {

        this.canvas = document.getElementsByTagName('canvas')[0];
        this.ctx = this.canvas.getContext('2d');
        this.mini = document.getElementById('mini');
        this.mini.appendChild(this.canvas);

        window.addEventListener('resize', this.resize.bind(this), {
            once: false,
            passive: false,
            capture: false,
        });
        this.waterdrop = new Waterdrop(230, 1000, 30, 0);
        this.waveGroup = new WaveGroup();

        this.resize();

        requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        // this.stageWidth = document.body.clientWidth;
        // this.stageHeight = document.body.clientHeight;
        // this.canvas.width = this.stageWidth*2;
        // this.canvas.height = this.stageHeight*2;
        // this.ctx.scale(2,2);

        this.stageWidth = this.mini.offsetWidth;
        this.stageHeight = this.mini.offsetWidth;

        this.canvas.width = this.stageWidth - 4;
        this.canvas.height = this.stageWidth -1;
        this.ctx.scale(1, 1);

        let temp = document.body.clientHeight;
        //temp=temp*0.0008;
        temp = temp * 0.0008;

        this.mini.style.transform = `scale(${temp})`;


        this.waveGroup.resize(this.stageWidth, this.stageHeight);

    }

    animate(t) {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.waterdrop.draw(this.ctx, this.waveGroup);
        this.waveGroup.draw(this.ctx);
        requestAnimationFrame(this.animate.bind(this));
    }
}
class Waterdrop {
    constructor(x, y, radius, color, speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = ame[0][0];
        this.speed = 0.0001;
        
    }
    draw(ctx, waveGroup) {
        this.move(waveGroup);
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
    move(waveGroup) {
        if(this.y>900){
            return
        }
        if (this.y < 550) {
            this.y = this.y + this.speed;
            this.speed += this.speed / 12;
        }
        else {
            stack += stack_per;
            check += 1;
            
            this.setColor(ame[0][check]);
            
            const navText = document.querySelector(".recipe");
            navText.innerHTML = navText.innerHTML + material[0][check-1];
            waveGroup.setCoffee(0,0.5, stack);
            this.setBall();

            // waveGroup.setCoffee(0, -3);
        }
    }
    setBall() {
        if(this.color==undefined){
            this.y = 1000;
            this.speed =0;
            return;
        }
        this.speed = 0.0001;
        this.x = 230;
        // 안보이게
        this.y = -28;
    }
    resetBall() {
        const navText = document.querySelector(".recipe");
        navText.innerHTML = "";

        this.y = 1000;
        this.speed =0;
    }
    setColor(color) {
        this.color = color;
    }
}
class Wave {
    constructor(index, totalPoints, color) {
        this.index = index;
        this.totalPoints = totalPoints;
        this.color = color;
        this.points = [];
    }

    resize(stageWidth, stageHeight) {
        // this.stageWidth = stageWidth;
        // this.stageHeight = stageHeight;

        //가로
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        this.centerX = stageWidth / 2;
        this.centerY = stageHeight / 2;

        this.pointGap = this.stageWidth / (this.totalPoints - 1);

        this.init();
    }
    setWaveColor(color) {
        this.color = color;
    }
    init() {
        for (let i = 0; i < this.totalPoints; i++) {
            this.points[i] = new Point(this.index + i, this.pointGap * i, this.centerY);

        }
    }
    raisePointY(force, limit) {

        for (let i = 0; i < this.totalPoints; i++) {
            this.points[i].resetLimit(limit);
            this.points[i].raiseY(force, limit);
        }
    }
    decreasePointY(force) {
        for (let i = 0; i < this.totalPoints; i++) {
            this.points[i].decreaseY(force);
        }
    }
    //y축을바꾸기위함
    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;

        let prevX = this.points[0].x;
        let prevY = this.points[0].y;

        ctx.moveTo(prevX, prevY);

        for (let i = 0; i < this.totalPoints; i++) {
            const cx = (prevX + this.points[i].x) / 2;
            const cy = (prevY + this.points[i].y) / 2;

            ctx.quadraticCurveTo(prevX, prevY, cx, cy);

            prevX = this.points[i].x;
            prevY = this.points[i].y;

            if (i > 0 && i < this.totalPoints - 1) {
                this.points[i].update();
            }
        }

        ctx.lineTo(prevX, prevY);
        ctx.lineTo(this.stageWidth, this.stageHeight);
        ctx.lineTo(this.points[0].x, this.stageHeight);

        ctx.fill();
        ctx.closePath();
    }


}
class Point {
    constructor(index, x, y) {
        this.floor = y + y + 20;
        this.x = x;
        this.y = this.floor;
        this.fixedY = this.floor;
        this.speed = 0.1;
        this.cur = index;
        this.max = Math.random() * 30;
        this.limit = 0;
        //limit=0.5~820
    }
    resetLimit(limit) {
        this.limit = (this.floor - this.floor * limit);
    }
    //y축을 바꾸기위함
    raiseY(force) {
        if (this.fixedY > this.limit) {
            this.fixedY = this.fixedY - force;
        }
        this.y = this.fixedY + (Math.sin(this.cur) * this.max);
    }
    decreaseY(force) {
        if (this.fixedY < this.floor) {
            this.fixedY = this.fixedY - force;
        }
        this.y = this.fixedY + (Math.sin(this.cur) * this.max);

    }
    update() {
        this.cur += this.speed;
        this.y = this.fixedY + (Math.sin(this.cur) * this.max);
    }
}

class WaveGroup {
    constructor() {
        this.totalWaves = 3;
        this.totalPoints = 8;
        this.color = [
            'red',
            '#b1dce2',
            '#ffd7b3',
        ];

        this.num = 0;
        this.test = 0;
        this.limit = 0;
        this.waves = [];

        for (let i = 0; i < this.totalWaves; i++) {
            const wave = new Wave(
                i,
                this.totalPoints, 
                this.color[i],
            );
            this.waves[i] = wave;
        }
    }
    setCoffee(num, test, limit) {
        this.num = num;
        this.test = test;
        this.limit = limit;
    }
    resize(stageWidth, stageHeight) {
        for (let i = 0; i < this.totalWaves; i++) {
            const wave = this.waves[i];
            wave.resize(stageWidth, stageHeight);
        }
    }

    draw(ctx) {
        for (let i = 0; i < this.totalWaves; i++) {
            const wave = this.waves[i];
            wave.draw(ctx);
        }
        this.vertical(this.num, this.test, this.limit);
    }
    vertical(waveNum, force, limit) {
        if (force > 0) {
            this.waves[waveNum].setWaveColor(ame[coffeeN][check]);
            this.waves[waveNum].raisePointY(force, limit);
        }
        else {
            for (let i = 0; i < this.totalWaves; i++) {
                this.waves[i].decreasePointY(force);
            }
        }
    }
}

window.onload = () => {
    const contents = new App();
    const buttons = document.querySelectorAll("button");
    [...buttons].forEach((button) => {
        button.addEventListener("click", () => {
            if (button.id == "Americano") {
                stack_per=0.09;
                if(check!=0){
                    reset();
                    return;
                }
                console.log("americano");
                coffeeN = 1;
                contents.waterdrop.setBall();
            }
            if (button.id == "au_lait") {
                navText.innerText=ame[0][check];
                coffeeN = 1;
                contents.waterdrop.setBall();
            }
            if (button.id == "capuccino") {
                navText.innerText=ame[0][check];
                coffeeN = 1;
                contents.waterdrop.setBall();
            }
            if (button.id == "reset") {
                reset();
            }
            function reset() {
                console.log("reset");
                contents.waterdrop.resetBall();
                contents.waveGroup.setCoffee(0, -3);
                stack = 0;
                check = 0;
            }
        });
    });
}

//wave height 100% 
let stack = 0;
let stack_per = 0;
//n 번째 돌아가는중
let check = 0;
let coffeeN=1;
//
//에스프레소 #3E1D08  

let ame = [
    //ball color
    [
        'skyblue',
        'brown',
        'brown',
        'brown',
        'gray',
        'gray',
    ],
    [
        'red',
        'yellow',
        'orange',
        'black',
        '#b1dce2',
        '#ffd7b3',
    ],
    [
        'yellow',
        'yellow',
        'yellow',
        '#green',
        '#b1dce2',
        '#ffd7b3',
    ],
    [
        'black',
        'black',
        'black',
        '#green',
        '#b1dce2',
        '#ffd7b3',
    ],
]

let material = [
    //ball color
    [
        '<span class="water">●</span>water ',
        '<span class="coffeee">●</span>coffee ',
        '',
        '',
        '<span class="milk">●</span>milk ',
        '',
    ]
]