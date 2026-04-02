const tiers = [
    { name: "Beginner", start: 1, end: 10 }, 
    { name: "Intermediate", start: 11, end: 20 },
    { name: "Hard", start: 21, end: 30 }, 
    { name: "Tourist", start: 31, end: 40 },
    { name: "Child", start: 41, end: 50 }, 
    { name: "Elementary", start: 51, end: 60 },
    { name: "Middle School", start: 61, end: 70 }, 
    { name: "High School", start: 71, end: 80 },
    { name: "University", start: 81, end: 90 }, 
    { name: "Business", start: 91, end: 100 }
];

const enemyNames = ["Slime", "Goblin", "Orc", "Troll", "Bandit", "Golem", "Dark Knight", "Dragon", "Demon", "Titan"];

let save = JSON.parse(localStorage.getItem('cantoRPG_save')) || { 
    maxLevel: 1, 
    coins: 0, 
    upgHp: 0, 
    upgDmg: 0,
    playerColor: "#1a2c4a",
    playerShape: "50%",
    ownedShapes: []
};

let currentLevel = 1; 
let currentQuestion = null; 
let currentOptions = []; 
let buttonsLocked = false;
let player = { hp: 100, maxHp: 100, dmg: 2, xp: 0, requiredXp: 15 };
let enemy = { hp: 30, maxHp: 30, dmg: 15 };

function saveGame() { 
    localStorage.setItem('cantoRPG_save', JSON.stringify(save)); 
}

function playCantoneseVoice(text) {
    if (!window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text.replace(/\s*\(.*?\)\s*/g, ''));
    utterance.lang = 'zh-HK'; 
    utterance.rate = 0.85;
    window.speechSynthesis.cancel(); 
    window.speechSynthesis.speak(utterance);
}

function initApp() { 
    updateShopUI(); 
    showLevelSelect(); 
}

function updateShopUI() {
    document.getElementById('coin-count').textContent = save.coins;
    let costHp = 50 + (save.upgHp * 25); 
    let costDmg = 75 + (save.upgDmg * 50);
    document.getElementById('cost-hp').textContent = costHp;
    document.getElementById('cost-dmg').textContent = costDmg;
    document.getElementById('btn-upg-hp').disabled = save.coins < costHp;
    document.getElementById('btn-upg-dmg').disabled = save.coins < costDmg;
}

function buyUpgrade(type) {
    let cost = type === 'hp' ? 50 + (save.upgHp * 25) : 75 + (save.upgDmg * 50);
    if (save.coins >= cost) {
        save.coins -= cost;
        if (type === 'hp') save.upgHp++; else save.upgDmg++;
        saveGame(); 
        updateShopUI();
    }
}

function showLevelSelect() {
    document.getElementById('level-select-screen').style.display = 'flex';
    document.getElementById('preview-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('level-modal').style.display = 'none';
    updateShopUI();
    
    const container = document.getElementById('tier-buttons-container');
    container.innerHTML = '';
    tiers.forEach((tier, index) => {
        const btn = document.createElement('button');
        btn.className = 'tier-btn';
        btn.textContent = tier.name;
        btn.onclick = () => openLevelModal(index);
        container.appendChild(btn);
    });
}

function openLevelModal(tierIndex) {
    const tier = tiers[tierIndex];
    document.getElementById('modal-title').textContent = `${tier.name} (Lv ${tier.start}-${tier.end})`;
    
    const grid = document.getElementById('modal-level-grid');
    grid.innerHTML = '';
    for (let i = tier.start; i <= tier.end; i++) {
        const btn = document.createElement('button');
        btn.className = 'level-btn';
        btn.textContent = `${i}`;
        if (i < save.maxLevel) btn.classList.add('completed');
        else if (i > save.maxLevel) btn.disabled = true;
        btn.onclick = () => { openPreview(i); closeLevelModal(); };
        grid.appendChild(btn);
    }
    document.getElementById('level-modal').style.display = 'block';
}

function closeLevelModal() {
    document.getElementById('level-modal').style.display = 'none';
}

function getWordsForLevel(lvl) {
    let words = vocabData.filter(v => v.level === lvl);
    if (words.length < 4) return vocabData.filter(v => v.level === 1); 
    return words;
}

function openPreview(level) {
    currentLevel = level;
    document.getElementById('level-select-screen').style.display = 'none';
    document.getElementById('preview-screen').style.display = 'flex';
    document.getElementById('study-level-text').textContent = currentLevel;
    
    const list = document.getElementById('vocab-list'); 
    list.innerHTML = '';
    getWordsForLevel(currentLevel).forEach(word => {
        const div = document.createElement('div'); 
        div.className = 'vocab-item';
        div.innerHTML = `<div class="vocab-eng">${word.eng}</div><div class="vocab-can">🔊 ${word.cantonese}</div>`;
        div.onclick = () => playCantoneseVoice(word.cantonese);
        list.appendChild(div);
    });
}

function startBattle() {
    document.getElementById('preview-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'flex';
    
    player.maxHp = 100 + (save.upgHp * 20);
    player.dmg = 2 + save.upgDmg;
    player.hp = player.maxHp; 
    player.xp = 0;
    
    enemy.maxHp = Math.floor(30 * Math.pow(1.15, currentLevel - 1));
    enemy.hp = enemy.maxHp;
    enemy.dmg = 15 + Math.floor((currentLevel - 1) * 2.5);
    
    document.getElementById('stat-dmg-disp').textContent = player.dmg;
    const tierIndex = tiers.findIndex(t => currentLevel >= t.start && currentLevel <= t.end);
    document.getElementById('enemy-name').textContent = `${enemyNames[tierIndex]} (Lv ${currentLevel})`;
    
    // Set player appearance
    document.getElementById('player').style.backgroundColor = save.playerColor;
    document.getElementById('player').style.borderRadius = save.playerShape;
    
    // Set enemy color based on level
    const enemyColor = getEnemyColor(currentLevel);
    document.getElementById('enemy').style.backgroundColor = enemyColor;

    updateBattleUI(); 
    generateQuestion();
}

function updateBattleUI() {
    document.getElementById('player-hp-bar').style.width = `${Math.max(0, (player.hp / player.maxHp) * 100)}%`;
    document.getElementById('enemy-hp-bar').style.width = `${Math.max(0, (enemy.hp / enemy.maxHp) * 100)}%`;
    document.getElementById('xp-bar').style.width = `${(player.xp / player.requiredXp) * 100}%`;
    document.getElementById('player-xp-text').textContent = `${player.xp}/${player.requiredXp}`;
}

function generateQuestion() {
    buttonsLocked = false; 
    document.getElementById('message').textContent = "";
    for(let i=0; i<4; i++) { 
        let b = document.getElementById(`btn${i}`); 
        b.className = "option-btn"; 
        b.disabled = false; 
    }

    const words = getWordsForLevel(currentLevel);
    currentQuestion = words[Math.floor(Math.random() * words.length)];
    let wrong = [];
    while(wrong.length < 3) {
        let w = words[Math.floor(Math.random() * words.length)];
        if(w.eng !== currentQuestion.eng && !wrong.includes(w)) wrong.push(w);
    }
    currentOptions = [...wrong, currentQuestion].sort(() => Math.random() - 0.5);
    document.getElementById('question-box').textContent = currentQuestion.eng;
    for(let i=0; i<4; i++) document.getElementById(`btn${i}`).textContent = currentOptions[i].cantonese;
}

function checkAnswer(index) {
    if (buttonsLocked) return; 
    buttonsLocked = true;
    const isCorrect = (currentOptions[index].eng === currentQuestion.eng);
    const btn = document.getElementById(`btn${index}`);
    playCantoneseVoice(currentOptions[index].cantonese);
    const msg = document.getElementById('message');

    if (isCorrect) {
        btn.classList.add("correct-btn"); 
        msg.textContent = "Correct! 💥"; 
        msg.style.color = "#27ae60";
        document.getElementById('player').classList.add('anim-attack');
        setTimeout(() => {
            document.getElementById('player').classList.remove('anim-attack');
            document.getElementById('enemy').classList.add('anim-damage');
            enemy.hp -= player.dmg; 
            updateBattleUI();
            setTimeout(() => {
                document.getElementById('enemy').classList.remove('anim-damage');
                player.xp++; 
                updateBattleUI(); 
                checkCombatState();
            }, 500);
        }, 200);
    } else {
        btn.classList.add("wrong-btn");
        document.getElementById(`btn${currentOptions.findIndex(o => o.eng === currentQuestion.eng)}`).classList.add("correct-btn");
        msg.textContent = `Wrong! It is ${currentQuestion.cantonese}`; 
        msg.style.color = "#c0392b";
        document.getElementById('enemy').style.transform = "translateX(-20px) scale(1.05)";
        setTimeout(() => {
            document.getElementById('enemy').style.transform = "none";
            document.getElementById('player').classList.add('anim-damage');
            player.hp -= enemy.dmg; 
            updateBattleUI();
            setTimeout(() => {
                document.getElementById('player').classList.remove('anim-damage');
                checkCombatState();
            }, 500);
        }, 300);
    }
}

function checkCombatState() {
    if (player.hp <= 0) {
        alert("Game Over! Try upgrading your stats.");
        showLevelSelect(); 
        return;
    }
    if (enemy.hp <= 0 || player.xp >= player.requiredXp) {
        let coinReward = 10 + (currentLevel * 2);
        save.coins += coinReward;
        alert(`Victory! You earned ${coinReward} coins.`);
        if (currentLevel === save.maxLevel && save.maxLevel < 100) save.maxLevel++;
        saveGame(); 
        showLevelSelect(); 
        return;
    }
    setTimeout(generateQuestion, 800);
}

window.onclick = function(event) {
    const shopModal = document.getElementById('shop-modal');
    const levelModal = document.getElementById('level-modal');
    if (event.target === shopModal) closeShopModal();
    if (event.target === levelModal) closeLevelModal();
}

window.onload = () => {
    if (typeof vocabData !== 'undefined') { initApp(); } 
    else { alert("Error: vocab.js not found or not loaded correctly."); }
};