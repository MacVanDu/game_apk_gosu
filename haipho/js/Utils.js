const Utils = {
  images: {
    bg: new Image(),
    house: new Image(),
    winNormal: new Image(),
    winFreeze: new Image(),
    winShock: new Image(),
    loseDog: new Image(),
    loseNormal: new Image()
  },

  loadSounds() {
    this.sounds = {
      win: new Audio("./sounds/win.mp3"),
      lose: new Audio("./sounds/lose.mp3"),
      trap: new Audio("./sounds/trap.mp3")
    };
  },

  playSound(name) {
    const s = this.sounds[name];
    if (s) {
      s.currentTime = 0;
      s.play();
    }
  },

  checkCollision(a, b) {
    return a.x < b.x + b.w &&
           a.x + a.w > b.x &&
           a.y < b.y + b.h &&
           a.y + a.h > b.y;
  },
  showToast(message) {
    const toast = document.createElement('div');
    toast.innerText = message;
    toast.style.position = 'absolute';
    toast.style.bottom = '50px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.background = 'rgba(0,0,0,0.7)';
    toast.style.color = 'white';
    toast.style.padding = '12px 20px';
    toast.style.borderRadius = '10px';
    toast.style.fontFamily = 'Arial';
    toast.style.fontSize = '18px';
    toast.style.opacity = '1';
    toast.style.transition = 'opacity 0.6s ease';
    toast.style.zIndex = '999';
    document.body.appendChild(toast);

    setTimeout(() => { toast.style.opacity = '0'; }, 1200);
    setTimeout(() => { toast.remove(); }, 2000);
  }
};

// Nạp ảnh nền và màn hình win/lose
Utils.images.bg.src = "./images/bg.png";
Utils.images.house.src = "./images/house.png";
Utils.images.winNormal.src = "./images/win_normal.png";
Utils.images.winFreeze.src = "./images/win_freeze.png";
Utils.images.winShock.src = "./images/win_shock.png";
Utils.images.loseDog.src = "./images/lose_dog.png";
Utils.images.loseNormal.src = "./images/lose_normal.png";

export default Utils;
