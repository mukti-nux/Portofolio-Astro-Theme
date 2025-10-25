// Teh Kota Mini Game - Fixed Canvas Scaling
class TehKotaGame {
    constructor() {
        this.initializeGame();
        this.setupEventListeners();
        this.updateUI();
        this.draw();
    }

    initializeGame() {
        // Game state
        this.money = 0;
        this.score = 0;
        this.day = 1;
        this.running = false;
        this.lastTime = 0;
        this.spawnTimer = 0;
        this.spawnInterval = 1800;
        this.customers = [];
        
        // Upgrades
        this.pricePerCup = 10;
        this.customerPatience = 6000;
        this.promoActive = false;
        this.nextPriceCost = 50;
        this.nextSpeedCost = 80;
        this.nextPromoCost = 120;
        
        // DOM elements
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.moneyEl = document.getElementById('money');
        this.scoreEl = document.getElementById('score');
        this.dayEl = document.getElementById('day');
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.costPriceEl = document.getElementById('costPrice');
        this.costSpeedEl = document.getElementById('costSpeed');
        this.costPromoEl = document.getElementById('costPromo');
        this.buyPriceBtn = document.getElementById('buyPrice');
        this.buySpeedBtn = document.getElementById('buySpeed');
        this.buyPromoBtn = document.getElementById('buyPromo');

        // Setup canvas - FIX: No scaling issues
        this.setupCanvas();
    }

    setupCanvas() {
        console.log('🔄 Setting up canvas...');
        
        // Set fixed internal dimensions (sesuai dengan HTML asli)
        this.canvas.width = 560;
        this.canvas.height = 420;
        
        // Setup responsive display size
        const resizeCanvas = () => {
            const container = this.canvas.parentElement;
            const containerWidth = container.clientWidth;
            const maxWidth = 560;
            
            // Calculate display size
            let displayWidth = Math.min(containerWidth, maxWidth);
            let displayHeight = (displayWidth * 420) / 560; // Maintain aspect ratio
            
            // Set display size
            this.canvas.style.width = displayWidth + 'px';
            this.canvas.style.height = displayHeight + 'px';
            
            console.log('Canvas display size:', displayWidth, displayHeight);
            console.log('Canvas internal size:', this.canvas.width, this.canvas.height);
            
            this.draw();
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
    }

    setupEventListeners() {
        // Game controls
        this.startBtn?.addEventListener('click', () => this.startGame());
        this.pauseBtn?.addEventListener('click', () => this.togglePause());
        this.resetBtn?.addEventListener('click', () => this.resetGame());
        
        // Shop actions
        this.buyPriceBtn?.addEventListener('click', () => this.buyPriceUpgrade());
        this.buySpeedBtn?.addEventListener('click', () => this.buySpeedUpgrade());
        this.buyPromoBtn?.addEventListener('click', () => this.buyPromoUpgrade());
        
        // Canvas click - FIX: Proper coordinate calculation
        this.canvas?.addEventListener('click', (e) => this.handleCanvasClick(e));
        
        // Keyboard shortcuts
        window.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    // Utility functions
    rand(min, max) {
        return Math.random() * (max - min) + min;
    }

    roundRect(ctx, x, y, w, h, r, fill, stroke) {
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

    // Game logic
    spawnCustomer() {
        const r = this.rand(18, 36);
        const x = this.rand(40, this.canvas.width - 40);
        const y = this.rand(60, this.canvas.height - 90);
        const patience = this.customerPatience + this.rand(-1000, 1000) - (this.score * 10);
        const id = Date.now() + Math.random();
        const level = Math.floor(this.score / 10) + 1;
        
        this.customers.push({
            id, x, y, r, patience,
            created: Date.now(),
            level
        });
    }

    update(dt) {
        if (!this.running) return;
        
        // Spawn customers
        this.spawnTimer += dt;
        if (this.spawnTimer > this.spawnInterval) {
            this.spawnTimer = 0;
            const count = this.promoActive ? 2 : 1;
            for (let i = 0; i < count; i++) {
                this.spawnCustomer();
            }
        }
        
        // Update customers (remove timed out)
        const now = Date.now();
        for (let i = this.customers.length - 1; i >= 0; i--) {
            const c = this.customers[i];
            if (now - c.created > c.patience) {
                this.customers.splice(i, 1);
                this.score = Math.max(0, this.score - 1);
            }
        }
        
        // Update day
        const newDay = Math.floor(this.score / 20) + 1;
        if (newDay !== this.day) {
            this.day = newDay;
        }
        
        this.updateUI();
    }

    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw scene
        this.drawScene();
        
        // Draw customers
        this.customers.forEach(customer => this.drawCustomer(customer));
        
        // Draw pause overlay
        if (!this.running) {
            this.drawPauseOverlay();
        }
    }

    drawScene() {
        // Ground - SESUAI KODE ASLI
        this.ctx.fillStyle = 'rgba(239, 230, 216, 0.8)'; // #efe6d8 dengan transparansi
        this.ctx.fillRect(0, this.canvas.height - 80, this.canvas.width, 80);
        
        // Cart - SESUAI KODE ASLI
        this.drawCart(60, this.canvas.height - 100);
    }

    drawCart(x, y) {
        console.log('🚐 Drawing cart at:', x, y);
        
        // Cart body - SESUAI KODE ASLI
        this.ctx.fillStyle = '#b7410e';
        this.roundRect(this.ctx, x, y, 220, 72, 12, true, false);
        
        // Canopy - SESUAI KODE ASLI
        this.ctx.fillStyle = '#e76f51';
        this.ctx.fillRect(x + 10, y - 28, 200, 28);
        
        // Wheels - SESUAI KODE ASLI
        this.ctx.fillStyle = '#333';
        this.ctx.beginPath();
        this.ctx.arc(x + 30, y + 72, 14, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(x + 190, y + 72, 14, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Sign - SESUAI KODE ASLI
        this.ctx.fillStyle = '#fff3e6';
        this.ctx.fillRect(x + 60, y + 8, 120, 40);
        this.ctx.fillStyle = '#b7410e';
        this.ctx.font = '18px serif';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText('TEH KOTA', x + 120, y + 28);
        
        // Debug: Highlight cart area
        this.ctx.strokeStyle = 'rgba(0, 255, 0, 0.5)';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(x, y, 220, 72);
    }

    drawCustomer(c) {
        const elapsed = Date.now() - c.created;
        const pct = Math.min(1, elapsed / c.patience);
        
        // Body - SESUAI KODE ASLI
        this.ctx.beginPath();
        this.ctx.fillStyle = '#ffd9b3';
        this.ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Eyes - SESUAI KODE ASLI
        this.ctx.fillStyle = '#222';
        this.ctx.beginPath();
        this.ctx.arc(c.x - 6, c.y - 4, 2.5, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(c.x + 6, c.y - 4, 2.5, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Cup - SESUAI KODE ASLI
        this.ctx.fillStyle = '#7fb3c9';
        this.ctx.fillRect(c.x - 8, c.y + 6, 16, 10);
        
        // Patience bar - SESUAI KODE ASLI
        this.ctx.fillStyle = '#ddd';
        this.ctx.fillRect(c.x - c.r, c.y + c.r + 8, c.r * 2, 6);
        this.ctx.fillStyle = '#2a9d8f';
        this.ctx.fillRect(c.x - c.r, c.y + c.r + 8, c.r * 2 * (1 - pct), 6);
    }

    drawPauseOverlay() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#e2e8f0';
        this.ctx.font = '20px Arial, sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText('Tekan "Mulai" untuk bermain', this.canvas.width / 2, this.canvas.height / 2);
    }

    // Event handlers - FIX: Proper coordinate scaling
    handleCanvasClick(e) {
        if (!this.running) return;
        
        const rect = this.canvas.getBoundingClientRect();
        
        // Calculate scale factors
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;
        
        // Convert click coordinates to canvas coordinates
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;
        
        console.log('🖱️ Click at:', x, y, 'Scale:', scaleX, scaleY);
        
        // Find clicked customer
        for (let i = this.customers.length - 1; i >= 0; i--) {
            const c = this.customers[i];
            const d = Math.hypot(c.x - x, c.y - y);
            if (d <= c.r) {
                this.serveCustomer(i);
                return;
            }
        }
    }

    serveCustomer(index) {
        const c = this.customers[index];
        this.customers.splice(index, 1);
        
        const earned = Math.floor(this.pricePerCup * (1 + c.level * 0.1));
        this.money += earned;
        this.score += 1;
        
        // Small chance for bonus
        if (Math.random() < 0.12) {
            this.money += 5;
        }
        
        this.updateUI();
    }

    handleKeyboard(e) {
        if (e.key === ' ') {
            this.togglePause();
        }
        if (e.key === 'r') {
            this.resetGame();
        }
    }

    // Game controls
    startGame() {
        this.running = true;
        this.lastTime = performance.now();
        this.gameLoop();
    }

    togglePause() {
        this.running = !this.running;
        if (this.pauseBtn) {
            this.pauseBtn.textContent = this.running ? 'Jeda' : 'Lanjut';
        }
        if (this.running) {
            this.lastTime = performance.now();
            this.gameLoop();
        }
    }

    resetGame() {
        this.money = 0;
        this.score = 0;
        this.day = 1;
        this.customers = [];
        this.pricePerCup = 10;
        this.customerPatience = 6000;
        this.promoActive = false;
        this.nextPriceCost = 50;
        this.nextSpeedCost = 80;
        this.nextPromoCost = 120;
        this.running = false;
        
        if (this.pauseBtn) {
            this.pauseBtn.textContent = 'Jeda';
        }
        
        this.updateUI();
        this.draw();
    }

    gameLoop(timestamp) {
        if (!this.running) return;
        
        const dt = timestamp - this.lastTime;
        this.lastTime = timestamp;
        
        this.update(dt);
        this.draw();
        
        if (this.running) {
            requestAnimationFrame((ts) => this.gameLoop(ts));
        }
    }

    // Shop functions
    buyPriceUpgrade() {
        if (this.money >= this.nextPriceCost) {
            this.money -= this.nextPriceCost;
            this.pricePerCup += 5;
            this.nextPriceCost = Math.floor(this.nextPriceCost * 1.7);
            this.updateUI();
        }
    }

    buySpeedUpgrade() {
        if (this.money >= this.nextSpeedCost) {
            this.money -= this.nextSpeedCost;
            this.customerPatience = Math.max(2500, Math.floor(this.customerPatience * 0.85));
            this.nextSpeedCost = Math.floor(this.nextSpeedCost * 1.6);
            this.updateUI();
        }
    }

    buyPromoUpgrade() {
        if (this.money >= this.nextPromoCost) {
            this.money -= this.nextPromoCost;
            this.promoActive = true;
            this.nextPromoCost = Math.floor(this.nextPromoCost * 2);
            this.updateUI();
            
            // Promo lasts 20 seconds
            setTimeout(() => {
                this.promoActive = false;
            }, 20000);
        }
    }

    // UI updates
    updateUI() {
        if (this.moneyEl) this.moneyEl.textContent = this.money;
        if (this.scoreEl) this.scoreEl.textContent = this.score;
        if (this.dayEl) this.dayEl.textContent = this.day;
        
        // Shop UI
        if (this.costPriceEl) this.costPriceEl.textContent = this.nextPriceCost;
        if (this.costSpeedEl) this.costSpeedEl.textContent = this.nextSpeedCost;
        if (this.costPromoEl) this.costPromoEl.textContent = this.nextPromoCost;
    }
}

// Initialize game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing Teh Kota Game...');
    setTimeout(() => {
        window.tehKotaGame = new TehKotaGame();
        console.log('✅ Game initialized!');
    }, 1000);
});