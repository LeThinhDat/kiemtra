document.addEventListener('keydown', function(event) {
    const key = event.key.toLowerCase();
    if (
        key === 'f12' || 
        (event.ctrlKey && event.shiftKey && key === 'i') ||
        (event.ctrlKey && key === 'u') ||
        (event.ctrlKey && event.shiftKey && key === 'c')
    ) {
        event.preventDefault();
        event.stopPropagation();
        handleDevToolsAttempt();
        return false;
    }
});


// VĂ´ hiá»‡u hĂ³a menu chuá»™t pháº£i
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    event.stopPropagation();
});

// Kiá»ƒm tra tráº¡ng thĂ¡i cáº¥m ngay khi trang táº£i
document.addEventListener('DOMContentLoaded', function() {
    const banUntil = localStorage.getItem('devToolsBanUntil');
    if (banUntil && new Date().getTime() < parseInt(banUntil)) {
        showBanMessage();
    }
});

// HĂ m xá»­ lĂ½ khi cá»‘ gáº¯ng má»Ÿ DevTools
function handleDevToolsAttempt() {
    // Kiá»ƒm tra náº¿u Ä‘ang bá»‹ khĂ³a
    const banUntil = localStorage.getItem('devToolsBanUntil');
    if (banUntil && new Date().getTime() < parseInt(banUntil)) {
        showBanMessage();
        return;
    }

    // Äáº¿m sá»‘ láº§n vi pháº¡m
    let attempts = parseInt(localStorage.getItem('devToolsAttempts') || '0');
    attempts += 1;
    localStorage.setItem('devToolsAttempts', attempts);

    if (attempts === 1) {
        // Láº§n Ä‘áº§u: Hiá»ƒn thá»‹ thĂ´ng bĂ¡o vi pháº¡m
        showViolationMessage();
    } else {
        // Láº§n thá»© hai: KhĂ³a 5 phĂºt vĂ  hiá»ƒn thá»‹ thá»i gian cáº¥m
        const banDuration = 5 * 60 * 1000; // 5 phĂºt
        const banUntilTime = new Date().getTime() + banDuration;
        localStorage.setItem('devToolsBanUntil', banUntilTime);
        showBanMessage();
    }
}

// Hiá»ƒn thá»‹ thĂ´ng bĂ¡o vi pháº¡m láº§n Ä‘áº§u
function showViolationMessage() {
    // XĂ³a overlay hoáº·c message box cÅ© náº¿u tá»“n táº¡i
    removeExistingMessages();
    
    const overlay = createOverlay();
    const messageBox = document.createElement('div');
    messageBox.style.position = 'fixed';
    messageBox.style.top = '50%';
    messageBox.style.left = '50%';
    messageBox.style.transform = 'translate(-50%, -50%)';
    messageBox.style.backgroundColor = 'white';
    messageBox.style.padding = '20px';
    messageBox.style.border = '2px solid #8B0000';
    messageBox.style.borderRadius = '10px';
    messageBox.style.zIndex = '10001';
    messageBox.style.textAlign = 'center';
    messageBox.style.color = '#222'; // MĂ u chá»¯ chĂ­nh Ä‘áº­m hÆ¡n
    messageBox.style.fontFamily = 'Arial, Helvetica, sans-serif'; // Font chá»¯ rĂµ nĂ©t
    messageBox.style.fontWeight = '600'; // Chá»¯ Ä‘áº­m hÆ¡n
    messageBox.style.fontSize = '18px'; // TÄƒng kĂ­ch thÆ°á»›c chá»¯
    messageBox.style.textShadow = '0 0 2px rgba(0,0,0,0.2)'; // ThĂªm bĂ³ng chá»¯
    messageBox.innerHTML = `
        <h2 style="color: #8B0000; font-size: 24px; font-weight: 700; text-shadow: 0 0 2px rgba(0,0,0,0.2);">Vi phạm!</h2>
        <p>Bạn đã cố gắng sử dụng F12 hoặc Ctrl+U!</p>
        <p>Lần vi phạm tiếp theo sẽ bị cấm 5 phút.</p>
        <button id="okButton" style="padding: 10px 20px; cursor: pointer; background-color: #8B0000; color: white; border: none; border-radius: 5px; font-weight: 600; font-size: 16px;">OK</button>
    `;
    document.body.appendChild(messageBox);

    document.getElementById('okButton').addEventListener('click', () => {
        document.body.removeChild(messageBox);
        document.body.removeChild(overlay);
    });
}

// Hiá»ƒn thá»‹ thĂ´ng bĂ¡o bá»‹ khĂ³a vá»›i Ä‘á»“ng há»“ Ä‘áº¿m ngÆ°á»£c
function showBanMessage() {
    // XĂ³a overlay hoáº·c message box cÅ© náº¿u tá»“n táº¡i
    removeExistingMessages();
    
    const overlay = createOverlay();
    const messageBox = document.createElement('div');
    messageBox.style.position = 'fixed';
    messageBox.style.top = '50%';
    messageBox.style.left = '50%';
    messageBox.style.transform = 'translate(-50%, -50%)';
    messageBox.style.backgroundColor = 'white';
    messageBox.style.padding = '20px';
    messageBox.style.border = '2px solid #8B0000';
    messageBox.style.borderRadius = '10px';
    messageBox.style.zIndex = '10001';
    messageBox.style.textAlign = 'center';
    messageBox.style.color = '#222'; // MĂ u chá»¯ chĂ­nh Ä‘áº­m hÆ¡n
    messageBox.style.fontFamily = 'Arial, Helvetica, sans-serif'; // Font chá»¯ rĂµ nĂ©t
    messageBox.style.fontWeight = '600'; // Chá»¯ Ä‘áº­m hÆ¡n
    messageBox.style.fontSize = '18px'; // TÄƒng kĂ­ch thÆ°á»›c chá»¯
    messageBox.style.textShadow = '0 0 2px rgba(0,0,0,0.2)'; // ThĂªm bĂ³ng chá»¯
    messageBox.id = 'banMessageBox';
    messageBox.innerHTML = `
        <h2 style="color: #8B0000; font-size: 24px; font-weight: 700; text-shadow: 0 0 2px rgba(0,0,0,0.2);">Bị cấm!</h2>
        <p>Bạn đã bị cấm sử dụng website trong 5 phút.</p>
        <p>Còn lại: <span id="countdown" style="color: #8B0000; font-weight: 700; font-size: 20px; text-shadow: 0 0 2px rgba(0,0,0,0.2);">05:00</span></p>
    `;
    document.body.appendChild(messageBox);

    // Cáº­p nháº­t Ä‘á»“ng há»“ Ä‘áº¿m ngÆ°á»£c
    updateCountdown();
}

// Táº¡o overlay Ä‘á»ƒ lĂ m má» ná»n
function createOverlay() {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.zIndex = '10000';
    document.body.appendChild(overlay);
    return overlay;
}

// XĂ³a cĂ¡c overlay vĂ  message box cÅ©
function removeExistingMessages() {
    const existingMessageBox = document.getElementById('banMessageBox');
    const existingOverlay = document.querySelector('div[style*="rgba(0, 0, 0, 0.5)"]');
    if (existingMessageBox) document.body.removeChild(existingMessageBox);
    if (existingOverlay) document.body.removeChild(existingOverlay);
}

// Cáº­p nháº­t Ä‘á»“ng há»“ Ä‘áº¿m ngÆ°á»£c
function updateCountdown() {
    const banUntil = parseInt(localStorage.getItem('devToolsBanUntil'));
    const interval = setInterval(() => {
        const now = new Date().getTime();
        const timeLeft = banUntil - now;

        if (timeLeft <= 0) {
            clearInterval(interval);
            localStorage.removeItem('devToolsBanUntil');
            localStorage.removeItem('devToolsAttempts');
            removeExistingMessages();
            return;
        }

        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        const countdownElement = document.getElementById('countdown');
        if (countdownElement) {
            countdownElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }, 1000);
}