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
        this.waveGroup = new WaveGroup();
        this.waterdrop = new Waterdrop(230, 1000, 30,'red',0);

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
        this.color = ballColor[coffeeN][check];
        this.speed = 0.0001;
        
    }
    draw(ctx, waveGroup) {
        this.move(waveGroup);
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        if(this.color=="white"){
            ctx.strokeStyle = "black";
        }
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
            
            const navText = document.querySelector(".recipe");
            navText.innerHTML = navText.innerHTML + material[coffeeN][check-1];
            waveGroup.setCoffee(0,0.5, stack);
            this.setBall();

            // waveGroup.setCoffee(0, -3);
        }
    }
    setBall() {
        this.setColor(ballColor[coffeeN][check]);

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
            this.waves[waveNum].setWaveColor(array[check-1]);
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
                if(check!=0){reset();return;}
                coffeeWaveArray(62,29,8,106,60,0,10,array);
                coffeeN = 1;
                stack_per=0.09;
                console.log("americano");
                contents.waterdrop.setBall();
            }
            if (button.id == "capuccino") {
                if(check!=0){
                    reset();
                    return;
                }
                coffeeWaveArray(62,29,8,255,208,0,14,array);
                coffeeN = 2;
                stack_per=0.065;
                console.log("capuccino");
                contents.waterdrop.setBall();
            }
            if (button.id == "au_lait") {
                if(check!=0){
                    reset();
                    return;
                }
                coffeeWaveArray(253,253,253,255, 250, 235,12,array);
                coffeeN = 3;
                stack_per=0.075;
                console.log("au_lait");
                contents.waterdrop.setBall();
            }
            if (button.id == "makiyato") {
                if(check!=0){
                    reset();
                    return;
                }
                coffeeWaveArray(62,29,8,106,60,0,10,array);
                coffeeN = 4;
                stack_per=0.09;
                console.log("makiyato");
                contents.waterdrop.setBall();
            }
            if (button.id == "reset") {
                reset();
            }
            function reset() {  
                console.log("reset");
                deleteArray(array);
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
let coffeeN=0;
//0
//에스프레소 #3E1D08  
const array = new Array();
function coffeeWaveArray(r,g,b,mr,mg,mb,N , array){
    array.push(`rgb(${r}, ${g}, ${b})`)
    let tmpR ,tmpG,tmpB = 0;
    for(let i=1;i<N;i++){
        tmpR=Math.round(r-(r-mr)/N*i);
        tmpG=Math.round(g-(g-mg)/N*i);
        tmpB=Math.round(b-(b-mb)/N*i);
        array.push(`rgb(${tmpR}, ${tmpG}, ${tmpB})`)
    }
}
function deleteArray(array){
    if(array.length===null){return}
    for (let index = 0; index < array.length; ) {
        array.pop();
    }
}
let ballColor = [
    //ball color
    [
        //wawter
        'cornflowerblue',
        //coffee
        '#3E1D08',
        //milk
        'white',
        //milkform
        '#fffaeb',
        //caramel
        '#c14900',
    ],
    //americano
    [
        '#3E1D08','#3E1D08','#3E1D08',
        'cornflowerblue','cornflowerblue',
        'cornflowerblue','cornflowerblue',
        'cornflowerblue','cornflowerblue',
    ],
    //ca
    [
        '#3E1D08','#3E1D08',
        'white','white','white','white',//6
        '#fffaeb','#fffaeb','#fffaeb',
        '#fffaeb','#fffaeb','#fffaeb',
        '#fffaeb','#fffaeb',
    ],
    //라뗴
    [
        'white','white','white','white',
        'white','white','white','white',
        '#3E1D08','#3E1D08',
        '#fffaeb','#fffaeb',
    ],
    //마키아토
    [
        '#3E1D08','#3E1D08',
        'white','white','white','white',
        '#fffaeb','#fffaeb',
        '#c14900','#c14900',

    ]
]


let material = [
    //ball color
    [
        '<span class="water">●</span>water ',
        '<span class="coffeee">●</span>espresso ',
        '<span class="milk">○</span>milk ',
        '<span class="milkform">●</span>milkform ',
        '<span class="caramel">●</span>caramel ',
        '',
    ],
    //americano
    [
        '<span class="coffeee">●</span>espresso ',   '',   '',
        '<span class="water">●</span>water ',  '','','', '', '', '',
    ],
    //cafucino
    [
        '<span class="coffeee">●</span>espresso ',  '',
        '<span class="milk">○</span>milk ',  '',  '',  '',
        '<span class="milkform">●</span>milkform ',
        '',   '',   '',  '',  '',  '',  '',  '',  '',
    ],
        //라떼는말이야
    [

        '<span class="milk">○</span>milk ',  '',  '',  '', '', '','','',
        '<span class="coffeee">●</span>espresso ',   '',
        '<span class="milkform">●</span>milkform ','',
    ],        //마키야토
    [

        '<span class="coffeee">●</span>espresso ','',
        '<span class="milk">○</span>milk ','','','',
        '<span class="milkform">●</span>milkform ','',
        '<span class="caramel">●</span>caramel ','',

    ],
]