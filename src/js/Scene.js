// Scene.js
import { Clock } from "./components/Clock.js";

export class Scene {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.clock = new Clock(this.ctx);
    console.log(this.ctx);
  }

  init() {
    this.draw();
  }

  draw() {
    this.clock.draw();
  }
}
