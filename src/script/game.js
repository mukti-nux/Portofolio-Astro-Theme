<script>
    // Simple vanilla JS canvas game "Teh Kota"
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const moneyEl = document.getElementById('money');
    const scoreEl = document.getElementById('score');
    const dayEl = document.getElementById('day');
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resetBtn = document.getElementById('resetBtn');

    // Shop
    const costPriceEl = document.getElementById('costPrice');
    const costSpeedEl = document.getElementById('costSpeed');
    const costPromoEl = document.getElementById('costPromo');
    const buyPriceBtn = document.getElementById('buyPrice');
    const buySpeedBtn = document.getElementById('buySpeed');
    const buyPromoBtn = document.getElementById('buyPromo');

    let money = 0;
    let score = 0;
    let day = 1;
    let running = false;
    let lastTime = 0;
    let spawnTimer = 0;
    let spawnInterval = 1800; // ms
    let customers = [];

    // upgrades state
    let pricePerCup = 10; // base
    let customerPatience = 6000; // ms
    let promoActive = false;

    let nextPriceCost = 50;
    let nextSpeedCost = 80;
    let nextPromoCost = 120;

    function rand(min,max){return Math.random()*(max-min)+min}

    function spawnCustomer(){
      // position along top area
      const r = rand(18,36);
      const x = rand(40, canvas.width-40);
      const y = rand(60, canvas.height-90);
      const patience = customerPatience + rand(-1000,1000) - (score*10);
      const id = Date.now()+Math.random();
      const level = Math.floor(score/10)+1; // increases with score
      customers.push({id,x,y,r,patience,created:Date.now(),level});
    }

    function update(dt){
      if(!running) return;
      spawnTimer += dt;
      if(spawnTimer > spawnInterval){
        spawnTimer = 0;
        // spawn more when promo active
        const count = promoActive ? 2 : 1;
        for(let i=0;i<count;i++) spawnCustomer();
      }

      // remove timed out customers
      const now = Date.now();
      for(let i=customers.length-1;i>=0;i--){
        const c = customers[i];
        if(now - c.created > c.patience){
          customers.splice(i,1);
          // small penalty
          score = Math.max(0, score-1);
        }
      }

      // level/day increase every 20 score -> day++
      const newDay = Math.floor(score/20)+1;
      if(newDay !== day){ day = newDay; dayEl.textContent = day; }

      moneyEl.textContent = money;
      scoreEl.textContent = score;
    }

    function draw(){
      // clear
      ctx.clearRect(0,0,canvas.width,canvas.height);

      // draw scene: simple street + gerobak
      // ground
      ctx.fillStyle = '#efe6d8';
      ctx.fillRect(0, canvas.height-80, canvas.width, 80);

      // gerobak (left bottom)
      drawCart(60, canvas.height-100);

      // draw customers
      customers.forEach(c=>{
        const elapsed = Date.now() - c.created;
        const pct = Math.min(1, elapsed / c.patience);
        // body circle
        ctx.beginPath();
        ctx.fillStyle = '#ffd9b3';
        ctx.arc(c.x, c.y, c.r, 0, Math.PI*2);
        ctx.fill();
        // eyes
        ctx.fillStyle = '#222';
        ctx.beginPath(); ctx.arc(c.x-6, c.y-4, 2.5,0,Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.arc(c.x+6, c.y-4, 2.5,0,Math.PI*2); ctx.fill();
        // cup icon
        ctx.fillStyle = '#7fb3c9';
        ctx.fillRect(c.x-8, c.y+6, 16,10);
        // patience bar
        ctx.fillStyle = '#ddd';
        ctx.fillRect(c.x - c.r, c.y + c.r + 8, c.r*2, 6);
        ctx.fillStyle = '#2a9d8f';
        ctx.fillRect(c.x - c.r, c.y + c.r + 8, c.r*2*(1-pct), 6);
      });

      // HUD text when paused
      if(!running){
        ctx.fillStyle = 'rgba(0,0,0,0.12)';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = '#222';
        ctx.font = '20px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Tekan "Mulai" untuk bermain', canvas.width/2, canvas.height/2);
      }
    }

    function drawCart(x,y){
      // cart body
      ctx.fillStyle = '#b7410e';
      roundRect(ctx, x, y, 220, 72, 12, true, false);
      // canopy
      ctx.fillStyle = '#e76f51';
      ctx.fillRect(x+10, y-28, 200, 28);
      // wheels
      ctx.fillStyle = '#333';
      ctx.beginPath(); ctx.arc(x+30, y+72, 14,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x+190, y+72, 14,0,Math.PI*2); ctx.fill();
      // sign
      ctx.fillStyle = '#fff3e6';
      ctx.fillRect(x+60, y+8, 120, 40);
      ctx.fillStyle = '#b7410e';
      ctx.font = '18px serif'; ctx.textAlign='center';
      ctx.fillText('TEH KOTA', x+120, y+35);
    }

    function roundRect(ctx, x, y, w, h, r, fill, stroke){
      if (typeof r === 'undefined') r = 5;
      ctx.beginPath();
      ctx.moveTo(x+r, y);
      ctx.arcTo(x+w, y, x+w, y+h, r);
      ctx.arcTo(x+w, y+h, x, y+h, r);
      ctx.arcTo(x, y+h, x, y, r);
      ctx.arcTo(x, y, x+w, y, r);
      ctx.closePath();
      if(fill) ctx.fill();
      if(stroke) ctx.stroke();
    }

    function gameLoop(timestamp){
      const dt = timestamp - lastTime;
      lastTime = timestamp;
      update(dt);
      draw();
      requestAnimationFrame(gameLoop);
    }

    // click handling
    canvas.addEventListener('click', (e)=>{
      if(!running) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // find customer clicked
      for(let i=customers.length-1;i>=0;i--){
        const c = customers[i];
        const d = Math.hypot(c.x-x, c.y-y);
        if(d <= c.r){
          // serve
          customers.splice(i,1);
          const earned = Math.floor(pricePerCup * (1 + c.level*0.1));
          money += earned;
          score += 1;
          // small chance to spawn bonus
          if(Math.random() < 0.12) { money += 5; }
          moneyEl.textContent = money;
          scoreEl.textContent = score;
          return;
        }
      }
    });

    // controls
    startBtn.addEventListener('click', ()=>{
      running = true; lastTime = performance.now(); requestAnimationFrame(gameLoop);
    });
    pauseBtn.addEventListener('click', ()=>{ running = !running; pauseBtn.textContent = running ? 'Jeda' : 'Lanjut'; });
    resetBtn.addEventListener('click', ()=>{ resetGame(); });

    function resetGame(){
      money = 0; score = 0; day = 1; customers = []; pricePerCup = 10; customerPatience = 6000; promoActive = false;
      nextPriceCost = 50; nextSpeedCost = 80; nextPromoCost = 120;
      updateUI();
    }

    function updateUI(){
      moneyEl.textContent = money;
      scoreEl.textContent = score;
      dayEl.textContent = day;
      costPriceEl.textContent = nextPriceCost;
      costSpeedEl.textContent = nextSpeedCost;
      costPromoEl.textContent = nextPromoCost;
    }

    // shop actions
    buyPriceBtn.addEventListener('click', ()=>{
      if(money >= nextPriceCost){ money -= nextPriceCost; pricePerCup += 5; nextPriceCost = Math.floor(nextPriceCost * 1.7); updateUI(); }
    });
    buySpeedBtn.addEventListener('click', ()=>{
      if(money >= nextSpeedCost){ money -= nextSpeedCost; customerPatience = Math.max(2500, Math.floor(customerPatience * 0.85)); nextSpeedCost = Math.floor(nextSpeedCost * 1.6); updateUI(); }
    });
    buyPromoBtn.addEventListener('click', ()=>{
      if(money >= nextPromoCost){ money -= nextPromoCost; promoActive = true; nextPromoCost = Math.floor(nextPromoCost * 2); updateUI();
        // promo lasts some seconds
        setTimeout(()=>{ promoActive = false; }, 20000);
      }
    });

    // initial draw
    updateUI();
    draw();

    // small keyboard shortcuts
    window.addEventListener('keydown', (e)=>{
      if(e.key === ' ') { running = !running; }
      if(e.key === 'r') resetGame();
    });
  </script>