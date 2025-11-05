export default class Dog {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    // 🐕 To hơn
    this.w = 100;  // trước là 100
    this.h = 100;

    // 🐾 Di chuyển chậm hơn
    this.dx = 0.8;  // trước là 1
    this.dy = 0.8;

    this.image = new Image();
    this.image.src = "./images/dog.png";
  }

  move(canvasW, canvasH) {
    this.x += this.dx;
    this.y += this.dy;

    // Giới hạn vùng di chuyển (nới rộng một chút)
    if (this.x < canvasW - 350 || this.x > canvasW - 120) this.dx *= -1;
    if (this.y < 80 || this.y > canvasH - 180) this.dy *= -1;
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
  }
}
