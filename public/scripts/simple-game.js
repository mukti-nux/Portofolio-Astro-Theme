// Simple Teh Kota Game - Fixed Version
console.log('🎮 Loading Teh Kota Game...');

// Tunggu sampai semua element tersedia
function initGame() {
    console.log('🚀 Initializing game...');
    
    // Canvas setup
    const canvas = document.getElementById('gameCanvas');
    if (!canvas) {
        console.error('❌ Canvas not found!');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    console.log('✅ Canvas found:', canvas.width, canvas.height);

    // Game state
    let money = 0;
    let score = 0;
    let day = 1;
    let running = false;
    let lastTime = 0;
    let spawnTimer = 0;
    let spawnInterval = 1800;
    let customers = [];

    // Upgrades
    let pricePerCup = 10;
    let customerPatience = 6000;
    let promoActive = false;
    let nextPriceCost = 50;
    let nextSpeedCost = 80;
    let nextPromoCost = 120;

    // DOM elements
    const moneyEl = document.getElementById('money');
    const scoreEl = document.getElementById('score');
    const dayEl = document.getElementById('day');
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resetBtn = document.getElementById('resetBtn');
    const costPriceEl = document.getElementById('costPrice');
    const costSpeedEl = document.getElementById('costSpeed');
    const costPromoEl = document.getElementById('costPromo');
    const buyPriceBtn = document.getElementById('buyPrice');
    const buySpeedBtn = document.getElementById('buySpeed');
    const buyPromoBtn = document.getElementById('buyPromo');

    console.log('✅ DOM elements loaded');

    // Utility functions
    function rand(min, max) {
        return Math.random() * (max - min) + min;
    }

    function roundRect(ctx, x, y, w, h, r, fill, stroke) {
        if (typeof r === 'undefined') r = 5;
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
        if (fill) ctx.fill();
        if (stroke) ctx.stroke();
    }

    // Game functions
    function spawnCustomer() {
        const r = rand(18, 36);
        const x = rand(40, canvas.width - 40);
        const y = rand(60, canvas.height - 90);
        const patience = customerPatience + rand(-1000, 1000) - (score * 10);
        const id = Date.now() + Math.random();
        const level = Math.floor(score / 10) + 1;
        
        customers.push({ id, x, y, r, patience, created: Date.now(), level });
        console.log('👤 Spawned customer at:', x, y);
    }

    function update(dt) {
        if (!running) return;
        
        spawnTimer += dt;
        if (spawnTimer > spawnInterval) {
            spawnTimer = 0;
            const count = promoActive ? 2 : 1;
            for (let i = 0; i < count; i++) spawnCustomer();
        }

        const now = Date.now();
        for (let i = customers.length - 1; i >= 0; i--) {
            const c = customers[i];
            if (now - c.created > c.patience) {
                customers.splice(i, 1);
                score = Math.max(0, score - 1);
            }
        }

        const newDay = Math.floor(score / 20) + 1;
        if (newDay !== day) {
            day = newDay;
            if (dayEl) dayEl.textContent = day;
        }

        updateUI();
    }

    function draw() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw ground
        ctx.fillStyle = 'rgba(239, 230, 216, 0.8)';
        ctx.fillRect(0, canvas.height - 80, canvas.width, 80);
        
        // Draw cart - PASTIIN INI DIEKSEKUSI
        console.log('🚐 Drawing cart...');
        drawCart(60, canvas.height - 100);

        // Draw customers
        customers.forEach(c => {
            const elapsed = Date.now() - c.created;
            const pct = Math.min(1, elapsed / c.patience);
            
            // Body
            ctx.beginPath();
            ctx.fillStyle = '#ffd9b3';
            ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
            ctx.fill();
            
            // Eyes
            ctx.fillStyle = '#222';
            ctx.beginPath();
            ctx.arc(c.x - 6, c.y - 4, 2.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(c.x + 6, c.y - 4, 2.5, 0, Math.PI * 2);
            ctx.fill();
            
            // Cup
            ctx.fillStyle = '#7fb3c9';
            ctx.fillRect(c.x - 8, c.y + 6, 16, 10);
            
            // Patience bar
            ctx.fillStyle = '#ddd';
            ctx.fillRect(c.x - c.r, c.y + c.r + 8, c.r * 2, 6);
            ctx.fillStyle = '#2a9d8f';
            ctx.fillRect(c.x - c.r, c.y + c.r + 8, c.r * 2 * (1 - pct), 6);
        });

        if (!running) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#e2e8f0';
            ctx.font = '20px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('Tekan "Mulai" untuk bermain', canvas.width / 2, canvas.height / 2);
        }
    }

    function drawCart(x, y) {
        console.log('🎨 Drawing cart at:', x, y);
        
        // Cart body - WARNA MERAH
        ctx.fillStyle = '#b7410e';
        roundRect(ctx, x, y, 220, 72, 12, true, false);
        
        // Canopy - WARNA ORANGE
        ctx.fillStyle = '#e76f51';
        ctx.fillRect(x + 10, y - 28, 200, 28);
        
        // Wheels - WARNA HITAM
        ctx.fillStyle = '#333';
        ctx.beginPath();
        ctx.arc(x + 30, y + 72, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x + 190, y + 72, 14, 0, Math.PI * 2);
        ctx.fill();
        
        // Sign - WARNA PUTIH
        ctx.fillStyle = '#fff3e6';
        ctx.fillRect(x + 60, y + 8, 120, 40);
        
        // Text - WARNA MERAH
        ctx.fillStyle = '#b7410e';
        ctx.font = 'bold 18px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('TEH KOTA', x + 120, y + 28);
        
        console.log('✅ Cart drawn successfully');
    }

    function gameLoop(timestamp) {
        const dt = timestamp - lastTime;
        lastTime = timestamp;
        update(dt);
        draw();
        if (running) requestAnimationFrame(gameLoop);
    }

    // Event handlers
    function handleCanvasClick(e) {
        if (!running) return;
        
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;
        
        for (let i = customers.length - 1; i >= 0; i--) {
            const c = customers[i];
            const d = Math.hypot(c.x - x, c.y - y);
            if (d <= c.r) {
                customers.splice(i, 1);
                const earned = Math.floor(pricePerCup * (1 + c.level * 0.1));
                money += earned;
                score += 1;
                if (Math.random() < 0.12) money += 5;
                updateUI();
                return;
            }
        }
    }

    // Control functions
    function startGame() {
        running = true;
        lastTime = performance.now();
        gameLoop(lastTime);
        console.log('▶️ Game started');
    }

    function togglePause() {
        running = !running;
        if (pauseBtn) pauseBtn.textContent = running ? 'Jeda' : 'Lanjut';
        if (running) {
            lastTime = performance.now();
            gameLoop(lastTime);
        }
        console.log('⏸️ Game paused:', !running);
    }

    function resetGame() {
        money = 0;
        score = 0;
        day = 1;
        customers = [];
        pricePerCup = 10;
        customerPatience = 6000;
        promoActive = false;
        nextPriceCost = 50;
        nextSpeedCost = 80;
        nextPromoCost = 120;
        running = false;
        
        if (pauseBtn) pauseBtn.textContent = 'Jeda';
        
        updateUI();
        draw();
        console.log('🔄 Game reset');
    }

    function updateUI() {
        if (moneyEl) moneyEl.textContent = money;
        if (scoreEl) scoreEl.textContent = score;
        if (dayEl) dayEl.textContent = day;
        if (costPriceEl) costPriceEl.textContent = nextPriceCost;
        if (costSpeedEl) costSpeedEl.textContent = nextSpeedCost;
        if (costPromoEl) costPromoEl.textContent = nextPromoCost;
    }

    // Shop functions
    function buyPriceUpgrade() {
        if (money >= nextPriceCost) {
            money -= nextPriceCost;
            pricePerCup += 5;
            nextPriceCost = Math.floor(nextPriceCost * 1.7);
            updateUI();
        }
    }

    function buySpeedUpgrade() {
        if (money >= nextSpeedCost) {
            money -= nextSpeedCost;
            customerPatience = Math.max(2500, Math.floor(customerPatience * 0.85));
            nextSpeedCost = Math.floor(nextSpeedCost * 1.6);
            updateUI();
        }
    }

    function buyPromoUpgrade() {
        if (money >= nextPromoCost) {
            money -= nextPromoCost;
            promoActive = true;
            nextPromoCost = Math.floor(nextPromoCost * 2);
            updateUI();
            setTimeout(() => { promoActive = false; }, 20000);
        }
    }

    // Setup event listeners
    if (startBtn) startBtn.addEventListener('click', startGame);
    if (pauseBtn) pauseBtn.addEventListener('click', togglePause);
    if (resetBtn) resetBtn.addEventListener('click', resetGame);
    if (buyPriceBtn) buyPriceBtn.addEventListener('click', buyPriceUpgrade);
    if (buySpeedBtn) buySpeedBtn.addEventListener('click', buySpeedUpgrade);
    if (buyPromoBtn) buyPromoBtn.addEventListener('click', buyPromoUpgrade);
    canvas.addEventListener('click', handleCanvasClick);

    window.addEventListener('keydown', (e) => {
        if (e.key === ' ') togglePause();
        if (e.key === 'r') resetGame();
    });

    // Initial draw
    updateUI();
    draw();
    
    console.log('🎯 Game fully initialized!');
}

// Multiple initialization attempts
function initializeGameWithRetry() {
    if (document.getElementById('gameCanvas') && document.getElementById('startBtn')) {
        initGame();
    } else {
        console.log('⏳ Waiting for DOM elements...');
        setTimeout(initializeGameWithRetry, 100);
    }
}

// Start initialization
document.addEventListener('DOMContentLoaded', initializeGameWithRetry);

// Fallback: try after 2 seconds
setTimeout(initializeGameWithRetry, 2000);