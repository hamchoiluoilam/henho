// ==============================================================================
// CẤU HÌNH SỐ ĐIỆN THOẠI ZALO CỦA BẠN:
// 👉 Đã cập nhật số điện thoại Zalo của bạn:
const MY_ZALO_PHONE = "0915852023"; 
// ==============================================================================

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const step1 = document.getElementById('step1');
  const step2 = document.getElementById('step2');
  const step3 = document.getElementById('step3');
  const step4 = document.getElementById('step4');

  const openLetterBtn = document.getElementById('openLetterBtn');
  const envelope = document.getElementById('envelope');
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const buttonsArea = document.getElementById('buttonsArea');
  const evadeHint = document.getElementById('evadeHint');
  const confirmChoicesBtn = document.getElementById('confirmChoicesBtn');
  const restartBtn = document.getElementById('restartBtn');

  // Summary Elements
  const summaryFood = document.getElementById('summaryFood');
  const summaryTime = document.getElementById('summaryTime');
  const summaryNote = document.getElementById('summaryNote');
  const noteRow = document.getElementById('noteRow');
  const sendZaloBtn = document.getElementById('sendZaloBtn');
  const copyMsgBtn = document.getElementById('copyMsgBtn');
  const toastMessage = document.getElementById('toastMessage');

  // Music Controller
  const musicToggle = document.getElementById('musicToggle');
  let audioCtx = null;
  let isPlayingMusic = false;
  let musicInterval = null;

  // ==========================================
  // 1. BACKGROUND FLOATING HEARTS & CANVAS
  // ==========================================
  const canvas = document.getElementById('heartCanvas');
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const hearts = [];
  const heartColors = ['#ff758f', '#ff4d6d', '#ffb3c1', '#c9184a', '#ff85a1', '#ffccd5'];

  class HeartParticle {
    constructor(x, y, isBurst = false) {
      this.x = x || Math.random() * width;
      this.y = y || height + Math.random() * 50;
      this.size = isBurst ? Math.random() * 16 + 10 : Math.random() * 14 + 8;
      this.color = heartColors[Math.floor(Math.random() * heartColors.length)];
      this.speedY = isBurst ? (Math.random() - 0.7) * 9 : -Math.random() * 1.5 - 0.8;
      this.speedX = isBurst ? (Math.random() - 0.5) * 8 : (Math.random() - 0.5) * 1.2;
      this.opacity = isBurst ? 1 : Math.random() * 0.7 + 0.3;
      this.fade = isBurst ? Math.random() * 0.02 + 0.015 : 0;
      this.swing = Math.random() * Math.PI * 2;
      this.swingSpeed = Math.random() * 0.03 + 0.01;
      this.isBurst = isBurst;
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.swing) * 0.4;
      this.swing += this.swingSpeed;

      if (this.isBurst) {
        this.opacity -= this.fade;
        this.speedY += 0.15; // gravity for burst
      } else {
        if (this.y < -30) {
          this.y = height + 30;
          this.x = Math.random() * width;
        }
      }
    }

    draw() {
      if (this.opacity <= 0) return;
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.opacity);
      ctx.fillStyle = this.color;
      ctx.beginPath();
      const topCurveHeight = this.size * 0.3;
      ctx.moveTo(this.x, this.y + topCurveHeight);
      // Heart path
      ctx.bezierCurveTo(
        this.x, this.y, 
        this.x - this.size / 2, this.y, 
        this.x - this.size / 2, this.y + topCurveHeight
      );
      ctx.bezierCurveTo(
        this.x - this.size / 2, this.y + (this.size + topCurveHeight) / 2, 
        this.x, this.y + (this.size + topCurveHeight) / 1.3, 
        this.x, this.y + this.size
      );
      ctx.bezierCurveTo(
        this.x, this.y + (this.size + topCurveHeight) / 1.3, 
        this.x + this.size / 2, this.y + (this.size + topCurveHeight) / 2, 
        this.x + this.size / 2, this.y + topCurveHeight
      );
      ctx.bezierCurveTo(
        this.x + this.size / 2, this.y, 
        this.x, this.y, 
        this.x, this.y + topCurveHeight
      );
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  }

  // Khởi tạo trái tim nền
  for (let i = 0; i < 28; i++) {
    const h = new HeartParticle();
    h.y = Math.random() * height;
    hearts.push(h);
  }

  function renderHearts() {
    ctx.clearRect(0, 0, width, height);
    for (let i = hearts.length - 1; i >= 0; i--) {
      const h = hearts[i];
      h.update();
      h.draw();
      if (h.isBurst && h.opacity <= 0) {
        hearts.splice(i, 1);
      }
    }
    requestAnimationFrame(renderHearts);
  }
  renderHearts();

  // Burst effect khi click vào bất cứ đâu
  window.addEventListener('click', (e) => {
    // Không nổ khi bấm nút chức năng chính để tránh rối
    if (e.target.tagName !== 'BUTTON' && !e.target.closest('button') && !e.target.closest('input')) {
      for (let i = 0; i < 8; i++) {
        hearts.push(new HeartParticle(e.clientX, e.clientY, true));
      }
    }
  });

  // ==========================================
  // 2. ROMANTIC SYNTHESIZER MUSIC (Du dương)
  // ==========================================
  // Tạo giai điệu piano ngọt ngào tự động mà không cần tải file mp3 nặng
  const melodyNotes = [
    523.25, 659.25, 783.99, 987.77, // C5, E5, G5, B5
    880.00, 783.99, 659.25, 587.33, // A5, G5, E5, D5
    659.25, 783.99, 880.00, 1046.50,// E5, G5, A5, C6
    987.77, 783.99, 659.25, 523.25  // B5, G5, E5, C5
  ];
  let noteIndex = 0;

  function playSweetTone(freq, timeOffset = 0, duration = 1.2) {
    if (!audioCtx) return;
    try {
      const now = audioCtx.currentTime + timeOffset;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.12, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {
      console.log('Audio note error', e);
    }
  }

  function startRomanticBgm() {
    if (isPlayingMusic) return;
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    isPlayingMusic = true;
    musicToggle.classList.add('playing');

    // Chơi chu kỳ nốt êm dịu
    musicInterval = setInterval(() => {
      if (!isPlayingMusic) return;
      const f1 = melodyNotes[noteIndex % melodyNotes.length];
      const f2 = f1 * 0.5; // bè bass nhẹ
      playSweetTone(f1, 0, 1.4);
      playSweetTone(f2, 0.05, 1.8);
      noteIndex++;
    }, 450);
  }

  function stopRomanticBgm() {
    isPlayingMusic = false;
    musicToggle.classList.remove('playing');
    if (musicInterval) {
      clearInterval(musicInterval);
      musicInterval = null;
    }
  }

  musicToggle.addEventListener('click', () => {
    if (isPlayingMusic) {
      stopRomanticBgm();
    } else {
      startRomanticBgm();
    }
  });

  // ==========================================
  // 3. STEP TRANSITIONS
  // ==========================================
  function switchStep(fromStep, toStep) {
    fromStep.classList.remove('active');
    toStep.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Step 1 -> Step 2
  openLetterBtn.addEventListener('click', () => {
    envelope.style.transform = 'translateY(-10px) scale(1.05)';
    startRomanticBgm(); // Khởi động nhạc khi chạm mở thư
    setTimeout(() => {
      switchStep(step1, step2);
    }, 400);
  });

  // ==========================================
  // 4. EVADING "HONG THÈM" BUTTON (Trò né tránh)
  // ==========================================
  const evadeMessages = [
    "Ủa sao bấm hong được dạ? 😜",
    "Nút này biểu tình rùi, hong cho bấm đâu! 🙅‍♂️",
    "Bấm nút 'Dạ đi chớ' bên cạnh kìa em 🥺",
    "Anh biết thừa là em muốn đi mà đúng hong nè? 💖",
    "Đừng né nữa mà, chịu đi ăn với anh đi nhaaa! 🌹",
    "Nút này sắp biến mất luôn rồi á nhaaa 😝"
  ];

  let evadeCount = 0;
  let yesScale = 1.0;

  function moveNoButton() {
    evadeCount++;

    // Thay đổi thông báo trêu chọc
    const msg = evadeMessages[(evadeCount - 1) % evadeMessages.length];
    evadeHint.textContent = msg;

    // Nút Yes phóng to dần lên kích thích bấm
    yesScale += 0.12;
    yesBtn.style.transform = `scale(${Math.min(yesScale, 1.8)})`;

    // Tính toán toạ độ ngẫu nhiên trong khung buttonsArea
    const areaRect = buttonsArea.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // Giới hạn di chuyển thông minh
    const maxShiftX = Math.min(window.innerWidth - btnRect.width - 40, 240);
    const maxShiftY = 120;

    const randomX = (Math.random() - 0.5) * maxShiftX;
    const randomY = (Math.random() - 0.5) * maxShiftY;

    noBtn.style.position = 'relative';
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
    noBtn.style.transition = 'transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)';

    // Thêm tim bay nhỏ từ chỗ nút
    for (let i = 0; i < 4; i++) {
      hearts.push(new HeartParticle(btnRect.left + btnRect.width / 2, btnRect.top, true));
    }
  }

  // Hỗ trợ cả di chuột lẫn chạm trên điện thoại
  noBtn.addEventListener('mouseenter', moveNoButton);
  noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
  }, { passive: false });

  // Nếu bằng cách thần kỳ nào đó bấm trúng nút No
  noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton();
  });

  // ==========================================
  // 5. YES BUTTON -> STEP 3 (CELEBRATION)
  // ==========================================
  function burstCelebration() {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    for (let i = 0; i < 45; i++) {
      hearts.push(new HeartParticle(cx, cy, true));
    }
  }

  yesBtn.addEventListener('click', () => {
    burstCelebration();
    // Tạo âm thanh chúc mừng vui nhộn
    if (audioCtx) {
      playSweetTone(783.99, 0, 0.5);
      playSweetTone(1046.50, 0.15, 0.8);
      playSweetTone(1318.51, 0.3, 1.2);
    }
    setTimeout(() => {
      switchStep(step2, step3);
    }, 450);
  });

  // ==========================================
  // 6. FOOD SELECTION STYLING
  // ==========================================
  const foodCards = document.querySelectorAll('.food-card');
  foodCards.forEach(card => {
    card.addEventListener('click', () => {
      foodCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });

  // ==========================================
  // 7. CONFIRM CHOICES -> STEP 4 (TICKET)
  // ==========================================
  confirmChoicesBtn.addEventListener('click', () => {
    // Lấy món ăn đã chọn
    const selectedFood = document.querySelector('input[name="foodChoice"]:checked')?.value || 'Lẩu nướng ấm áp';
    const selectedTime = document.getElementById('dateTimeInput').value;
    const sweetNoteVal = document.getElementById('sweetNote').value.trim();

    summaryFood.textContent = selectedFood;
    summaryTime.textContent = selectedTime;

    if (sweetNoteVal) {
      summaryNote.textContent = `"${sweetNoteVal}"`;
      noteRow.style.display = 'flex';
    } else {
      noteRow.style.display = 'none';
    }

    burstCelebration();
    switchStep(step3, step4);
  });

  // ==========================================
  // 8. ACTIONS: ZALO & COPY MESSAGE
  // ==========================================
  function generateConfirmationMessage() {
    const receiver = document.getElementById('receiverName')?.textContent?.trim() || 'Em';
    const sender = document.getElementById('senderName')?.textContent?.trim() || 'Anh';
    const food = summaryFood.textContent;
    const time = summaryTime.textContent;
    const note = document.getElementById('sweetNote').value.trim();

    let text = `💌 Dạ em đồng ý đi ăn cùng anh rùi nè!\n`;
    text += `👑 Người đi cùng: ${receiver}\n`;
    text += `🚗 Người đưa đón: ${sender}\n`;
    text += `🍽️ Món em chọn: ${food}\n`;
    text += `⏰ Thời gian: ${time}\n`;
    if (note) {
      text += `💬 Lời dặn dò: "${note}"\n`;
    }
    text += `💖 Chuẩn bị qua đón người ta đúng giờ nha! ✨`;
    return text;
  }

  function showToast(msg) {
    toastMessage.textContent = msg;
    toastMessage.classList.add('show');
    setTimeout(() => {
      toastMessage.classList.remove('show');
    }, 3200);
  }

  // Sao chép tin nhắn
  copyMsgBtn.addEventListener('click', () => {
    const text = generateConfirmationMessage();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast('Đã sao chép lời nhắn ngọt ngào! Dán gửi cho anh ngay nha 💕');
      }).catch(() => {
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
  });

  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showToast('Đã sao chép lời nhắn ngọt ngào! Dán gửi cho anh ngay nha 💕');
    } catch (err) {
      alert(text);
    }
    document.body.removeChild(ta);
  }

  // Gửi qua Zalo
  sendZaloBtn.addEventListener('click', () => {
    const text = generateConfirmationMessage();
    // Copy trước vào clipboard để người yêu chỉ việc bấm Dán
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text);
    } else {
      fallbackCopy(text);
    }

    // Kiểm tra đã điền số điện thoại hay chưa
    const hasPhone = MY_ZALO_PHONE && MY_ZALO_PHONE !== "09xxxxxxxx" && MY_ZALO_PHONE.length >= 9;
    const zaloUrl = hasPhone ? `https://zalo.me/${MY_ZALO_PHONE}` : 'https://chat.zalo.me/';

    showToast('Đã copy lời nhắn! Đang mở Zalo của anh, em bấm Dán (Paste) nha 💕');
    
    setTimeout(() => {
      window.open(zaloUrl, '_blank');
    }, 700);
  });

  // Chọn lại từ đầu
  restartBtn.addEventListener('click', () => {
    evadeCount = 0;
    yesScale = 1.0;
    yesBtn.style.transform = 'scale(1)';
    noBtn.style.transform = 'translate(0, 0)';
    evadeHint.textContent = '';
    document.getElementById('sweetNote').value = '';
    switchStep(step4, step1);
  });

});
