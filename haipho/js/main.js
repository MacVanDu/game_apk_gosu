import Game from './Game.js';

window.onload = () => {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const game = new Game(canvas, ctx);

  // 🧩 Tạo màn hình chào + hướng dẫn
  const startScreen = document.createElement('div');
  startScreen.id = 'start-screen';
  startScreen.style = `
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom right, #222, #000);
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-family: 'Arial';
    z-index: 999;
    transition: opacity 0.8s ease;
  `;

  startScreen.innerHTML = `
    <h1 style="font-size: 48px; margin-bottom: 20px;">🐕 BẮT TRỘM CÙNG CHÓ GIỮ NHÀ 🦴</h1>
    <p style="font-size: 20px; line-height: 1.6; max-width: 600px;">
      <strong>Hướng dẫn chơi:</strong><br>
      🐾 Nhấn chuột để đặt bẫy vào vị trí bạn muốn.<br>
      🧠 Mỗi lần trộm bị bẫy, bạn được +10 điểm.<br>
      🚫 Nếu trộm thoát khỏi màn hình, bạn sẽ mất 1 mạng.<br>
      💥 Khi đạt 120 điểm, bạn sẽ chiến thắng!
    </p>
    <button id="btnStart" style="
      margin-top: 40px;
      padding: 15px 35px;
      font-size: 26px;
      border: none;
      border-radius: 12px;
      background: #ff9800;
      color: #fff;
      cursor: pointer;
      transition: 0.3s;
    ">🎮 BẮT ĐẦU CHƠI</button>
  `;

  document.body.appendChild(startScreen);

  const btnStart = document.getElementById('btnStart');
  btnStart.addEventListener('mouseenter', () => {
    btnStart.style.transform = 'scale(1.05)';
  });
  btnStart.addEventListener('mouseleave', () => {
    btnStart.style.transform = 'scale(1)';
  });

  // 🕹️ Khi nhấn nút "Bắt đầu chơi"
  btnStart.addEventListener('click', () => {
    startScreen.style.opacity = '0'; // mờ dần
    setTimeout(() => {
      startScreen.remove(); // xóa hoàn toàn sau 0.8s
      game.start(); // khởi động game
    }, 800);
  });
};
