class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);


        window.addEventListener('resize', this.resize.bind(this), {
            once: false,
            passive: false,
            capture: false,
        });

        this.waveGroup = new WaveGroup();

        this.resize();

        requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;

        this.ctx.scale(2, 2);

        this.waveGroup.resize(this.stageWidth, this.stageHeight);
    }

    animate(t) {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.waveGroup.draw(this.ctx);

        requestAnimationFrame(this.animate.bind(this));
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

    init() {
        for (let i = 0; i < this.totalPoints; i++) {
            this.points[i] = new Point(this.index + i, this.pointGap * i, this.centerY);

        }
    }
    raisePointY(force,limit) {
        
        for (let i = 0; i < this.totalPoints; i++) {
            this.points[i].resetLimit(limit);
            this.points[i].raiseY(force,limit);
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
        this.floor = y+y+20;
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
        this.limit = (this.floor-this.floor*limit);
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
            console.log(this.fixedY);
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
            '#f0ebe5',
            '#b1dce2',
            '#ffd7b3',
            ];

        this.num = 0;
        this.test = 0;
        this.limit= 0;
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
        this.limit =limit;
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
        this.vertical(this.num, this.test,this.limit);
    }
    vertical(waveNum, force, limit) {
        if (force > 0) {
            this.waves[waveNum].raisePointY(force,limit);
        }
        else {
            for (let i = 0; i < this.totalWaves; i++) {
                this.waves[i].decreasePointY(force);
            }
        }
    }
}

let check = 0;
window.onload = () => {
    const contents = new App();
    const buttons = document.querySelectorAll("button");
    [...buttons].forEach((button) => {
        button.addEventListener("click", () => {
            if (button.id == "Americano") {
                contents.waveGroup.setCoffee(0, 5, 0.9);
            }
            if (button.id == "au_lait") {
                contents.waveGroup.setCoffee(1, 5,0.8);
            }
            if (button.id == "capuccino") {
                contents.waveGroup.setCoffee(2, 1,0.2);
            }
            
            if (button.id == "reset") {
                contents.waveGroup.setCoffee(0, -3);
                console.log("a");
            }
        });
    });
}