export default class Thief {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    // 🦹‍♂️ Kích thước mới (chuẩn theo ảnh 333x262)
    this.w = 200;
    this.h = 131;

    // 🏃‍♂️ Tốc độ hợp lý (ảnh to hơn => đi chậm hơn)
    this.speed = 2.3 + Math.random() * 1.2; // dao động 2.3–3.5
    this.dy = Math.random() > 0.5 ? 1 : -1;

    // 🖼️ Ảnh trộm
    this.image = new Image();
    this.image.src = "./images/thief.png";
  }

  move(canvasW, canvasH) {
    this.x += this.speed;
    this.y += this.dy * 2;

    // Giới hạn di chuyển dọc (không vượt đường)
    if (this.y < 80 || this.y > canvasH - this.h - 120) {
      this.dy *= -1;
    }
  }

  reset() {
    // Khi reset, trộm xuất hiện lại từ trái ngoài màn hình
    this.x = -this.w;
    this.y = Math.random() * (window.innerHeight - this.h - 200) + 100;
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
  }
}
