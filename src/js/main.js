// main.js
import { Scene } from "./Scene.js";
// main.js
document.addEventListener("DOMContentLoaded", (event) => {
  const canvas = document.getElementById("canvas-scene");
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = true;
  // main.js
  canvas.width = canvas.clientWidth - 150;
  console.log(canvas.width);
  canvas.height = canvas.clientHeight - 200;

  const clockScene = new Scene(canvas);
  clockScene.init();
});
