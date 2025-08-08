class Display {
    static livesDisplayText = [" ", "L1", "L2", "L3"];
    static delay = 1500;
    constructor() {
        this.bg = new Image();
        this.bg.src = 'rsc/background.png';
        this.mainRowText = "      ";
        this.digits = [];
        this.lastShift = Date.now();
        this.lives = 3;
    }

    init() {
        const dx = 40, d = 115, dd = 25;
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

        //ctx.drawImage(this.bg, 0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.fillStyle = 'rgba(165, 167, 155, 0.8)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fill();
        
        for (let i = 0; i < this.digits.length; i++) {
            this.digits[i].draw();
        }
    }
}
