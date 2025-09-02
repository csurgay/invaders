class Display {
    static livesDisplayText = [" ", "L1", "L2", "L3"];
    static delay = 1500;
    static days = ["MO","TU","WE","TH","FR","SA","SU"];
    constructor() {
        this.mainRowText = "      ";
        this.digits = [];
        this.lastShift = Date.now();
        this.lives = 3;
        this.dots = false;
    }

    init() {
        const dx = 35, d = 115, dd = 35;
        for (let i = 0; i < 6; i++) {
            this.digits.push(new Segment7([
                dx, dx+d, dx+2*d+dd, dx+3*d+dd, 
                dx+4*d+dd, dx+5*d+dd,][i], 
                150, 80, 80, 0.2));
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

    setDate(d="  ") {
        this.digits[7].digit = d[0];
        this.digits[6].digit = d[1];
    }

    restart() {
        this.lives = 3;
        this.setMainRow("      ");
        this.digits[7].digit = "0";
    }

    shiftDisplay() {
        this.mainRowText = this.mainRowText.slice(1) + 
            "0123456789n"[Math.floor(Math.random() * 11)];
    }

    stepAim() {
        let i =  "0123456789n".indexOf(this.digits[7].digit);
        i = (i + 1) % 11;
        this.digits[7].digit = "0123456789n"[i];
    }

    shoot() {
        let i = this.mainRowText.indexOf(this.digits[7].digit);
        if (i >= 0) {
            this.mainRowText = " " + this.mainRowText.slice(0, i) + 
                this.mainRowText.slice(i + 1);
            this.setMainRow();
        }
    }

    setMainRow(text = this.mainRowText) {
        this.mainRowText = text;
        for (let i = 0; i < 6; i++) {
            this.digits[i].digit = text[i];
        }
    }

    draw() {
        if (modes[mode] == "clock") {
            this.setMainRow(getTime());
            this.setDate(getDate());
            if (Date.now() - this.lastShift > 500) {
                this.dots = !this.dots;
                this.lastShift = Date.now();
            }
        }
        else if (modes[mode] == "game") {
            if (Date.now() - this.lastShift > Display.delay) {
                if (this.mainRowText[0] != " ") {
                    this.setMainRow("      ");
                    this.lives--;
                    if (this.lives <= 0) {
                        this.restart();
                    }
                }
                else {
                    this.shiftDisplay();
                }
                this.lastShift = Date.now();
            }
            this.digits[6].digit = Display.livesDisplayText[this.lives];
            this.setMainRow(this.mainRowText);
        }

        ctx.save();
        ctx.translate(bgw/2, bgh/2);
        ctx.rotate(0.7*Math.PI/180);
        ctx.translate(-bgw/2, -bgh/2);
        ctx.shadowBlur = 0;
        ctx.shadowColor = "white";
        ctx.drawImage(bg, 0, 0, bgw, bgh);
        ctx.restore();
        ctx.beginPath();
        ctx.shadowBlur = 3;
        ctx.shadowColor = "black";
        ctx.fillStyle = 'rgba(165, 167, 155, 1)';
        ctx.roundRect(dx, dy, dw, dh, [10]);
        ctx.fill();

        ctx.fillStyle = 'rgba(40, 32, 23, 0.9)';
        if (modes[mode] == "clock" && this.dots) {
            ctx.beginPath();
            ctx.arc(dx+112, dy+85, 3, 0, 2*Math.PI);
            ctx.arc(dx+112, dy+115, 3, 0, 2*Math.PI);
            ctx.fill();
        }
        
        ctx.beginPath();
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 3;
        ctx.fillRect(dx, dy-4, dw, 4);
        ctx.fill();

        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;

        if (true) for (let i = 0; i < this.digits.length; i++) {
            this.digits[i].draw();
        }
    }
}
