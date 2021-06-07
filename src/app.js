import { Liquid } from "./dropLiquid.js"
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
        this.waterdrop = new Waterdrop(230, 620, 30, 'blue', 0);
        this.waveGroup = new WaveGroup();
        this.liquid = new Liquid(3, 2);

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
        this.color = color;
        this.speed = 0.0001;
    }
    draw(ctx, waveGroup) {
        this.move(waveGroup.limit);
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
    move(waveGroup) {
        if (this.y < 600) {
            this.y = this.y + this.speed;
            this.speed += this.speed / 12;
        }
        else {
            console.log(this.y);
            this.setColor(ame[0][check]);
        }
    }
    setColor(color) {
        this.color = color;
    }
    setball() {
        this.speed = 0.0001;
        this.x = 230;
        // 안보이게
        this.y = -28;
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
    const navText = document.querySelector(".recipe");
    [...buttons].forEach((button) => {
        button.addEventListener("click", () => {
            if (button.id == "Americano") {
                navText.innerText=ame[0][check];
                const aheight =3;
                coffeeN = 1;
                if (check == -1) {
                    check += 1;
                    t(aheight);
                }

                else{
                    reset();
                }
            }
            if (button.id == "au_lait") {
                coffeeN = 2;
                const height =7;
                if (check == -1) {
                    check += 1;
                    t(height);
                }
                else if (check < -1) {
                    check += 1;
                }
            }
            if (button.id == "capuccino") {
                const height =7;
                coffeeN = 3;
                if (check == -1) {
                    check += 1;
                    t(height);
                }
                else if (check < 0) {
                    check += 1;
                }
            }

            if (button.id == "reset") {
                reset();
            }
            function reset() {
                contents.waveGroup.setCoffee(0, -3);
                stack = 0;
                check = -1;
            }
            function t(height) {
                var testInterval = setInterval(function () {
                    if(check==-1||check>height){return;}
                    s();
                }, 3000);
                setTimeout(function () {
                    clearTimeout(testInterval);
                }, 20000);
            }
            function s() {
                console.log("ball");
                contents.waterdrop.setball();
                setTimeout(function () {
                    console.log("wave up");
                    if(check==-1){
                        return;
                    }
                    stack += 0.1;
                    check += 1;
                    contents.waveGroup.setCoffee(0, 0.8, stack);
                }, 2800);
            }
        });
    });
}

let stack = 0;
let check = -1;
let coffeeN=1;
let ame = [
    //ball color
    [
        'red',
        'blue',
        'yellow',
        '#f0ebe5',
        '#b1dce2',
        '#ffd7b3',
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
