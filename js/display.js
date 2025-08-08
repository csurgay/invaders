class Display {
    constructor() {
        this.bg = new Image();
        this.bg.src = 'rsc/background.png';
        this.digits = [];
    }

    init() {
        const dx = 40, d = 115, dd = 25;
        for (let i = 0; i < 6; i++) {
            this.digits.push(new Segment7([
                dx, dx+d, dx+2*d+dd, dx+3*d+dd, 
                dx+4*d+dd, dx+5*d+dd,][i], 
                150, 80, 80, 0.2));
            this.digits[i].digit = "447066"[i];
        }
        this.digits[6] = new Segment7(670, 20, 80, 80, 0.13);
        this.digits[6].digit = "L3";
        this.digits[7] = new Segment7(570, 20, 80, 80, 0.13);
        this.digits[7].digit = "0";
        this.digits[8] = new Segment7(40, 20, 80, 80, 0.13);
        this.digits[8].digit = "C";
        this.digits[9] = new Segment7(85, 20, 80, 80, 0.13);
        this.digits[9].digit = "G";
        this.digits[10] = new Segment7(170, 20, 80, 80, 0.13);
        this.digits[10].digit = "A";
    }

    draw() {
        ctx.drawImage(this.bg, 0, 0, canvas.width, canvas.height);
        for (let i = 0; i < this.digits.length; i++) {
            this.digits[i].draw();
        }
        if (Math.random() < 0.05) {
            this.digits[Math.floor(6 * Math.random())].digit = 
                Math.floor(Math.random() * 10).toString();
        }
    }
}
