export class Clock {
  constructor(ctx) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.scaleClock();
    this.centerClock();
    this.ctx.imageSmoothingEnabled = true;
  }

  scaleClock() {
    this.ctx.scale(1, 1);
  }
  centerClock() {
    this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
  }

  draw() {
    this.ctx.clearRect(
      -this.canvas.width / 2,
      -this.canvas.height / 2,
      this.canvas.width,
      this.canvas.height
    );
    this.drawMinuteTicks();
    this.drawRomanHours();
    this.drawRotatingHands();
    requestAnimationFrame(() => this.draw());
  }

  drawMinuteTicks() {
    const radius = 100;
    const tickLength = 10;
    const numTicks = 60;

    for (let i = 0; i < numTicks; i++) {
      const angle = ((2 * Math.PI) / numTicks) * i;

      const vibrationFactor = Math.sin(Date.now() / 1000) * 2;

      const x = radius * Math.cos(angle) + vibrationFactor;
      const y = radius * Math.sin(angle) + vibrationFactor;
      let newTickLength = tickLength;

      if (i % 5 === 0) {
        newTickLength = 20;
      } else {
        newTickLength = 10 + Math.sin(Date.now() / 1000) * 5;
      }

      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(
        x + newTickLength * Math.cos(angle),
        y + newTickLength * Math.sin(angle)
      );

      this.ctx.stroke();
    }
  }

  drawRomanHours() {
    const romanNumerals = ["XII", "III", "VI", "IX"];
    const angles = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];
    const radius = 150;
    const fontSize = 30;

    this.ctx.font = `${fontSize}px Arial`;

    romanNumerals.forEach((hour, index) => {
      const angle = angles[index];
      const x = radius * Math.cos(angle) - 15;
      const y = radius * Math.sin(angle) + 15;

      this.ctx.fillText(hour, x, y);
    });
  }

  drawRotatingHands() {
    const now = new Date();
    const parisTime = new Date(
      now.toLocaleString("en-US", { timeZone: "Europe/Paris" })
    );
    const hours = parisTime.getHours();
    const minutes = parisTime.getMinutes();
    const seconds = parisTime.getSeconds();
    const radius = 100;
    const hoursHandLength = 50;
    const handLength = 100;

    const hourAngle =
      ((2 * Math.PI) / 12) * (hours % 12) +
      ((2 * Math.PI) / 12 / 60) * minutes -
      Math.PI / 2;

    const pulsationFactor = Math.sin(Date.now() / 1000) * 0.1 + 1;

    const hourX = hoursHandLength * pulsationFactor * Math.cos(hourAngle);
    const hourY = hoursHandLength * pulsationFactor * Math.sin(hourAngle);

    const minuteAngle = ((2 * Math.PI) / 60) * minutes - Math.PI / 2;
    const minuteX = handLength * pulsationFactor * Math.cos(minuteAngle);
    const minuteY = handLength * pulsationFactor * Math.sin(minuteAngle);

    const secondAngle = ((2 * Math.PI) / 60) * seconds - Math.PI / 2;
    const secondX = handLength * pulsationFactor * Math.cos(secondAngle);
    const secondY = handLength * pulsationFactor * Math.sin(secondAngle);

    const colors = [
      "red",
      "orange",
      "yellow",
      "green",
      "blue",
      "indigo",
      "violet",
    ];
    const colorIndex = Math.floor(Date.now() / 1000) % colors.length;
    this.ctx.strokeStyle = colors[colorIndex];

    this.ctx.strokeStyle = "black";

    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(hourX, hourY);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(minuteX, minuteY);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(secondX, secondY);
    this.ctx.stroke();
  }
}
