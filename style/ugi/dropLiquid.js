export class Liquid {
    constructor(radius, speed) {
        this.x = 0;
        this.y = 250;
        this.radius = radius;
        this.vy = speed;

        const diameter = this.radius * 2;
    }
    draw(ctx) {
        
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}