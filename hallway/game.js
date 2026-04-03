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

const tierIcons = ['🫧','👺','👹','🧌','🥷','🗿','⚔️','🐉','😈','👑'];

function updateShopUI() {
    document.getElementById('coin-count').textContent = save.coins;
    let costHp = 50 + (save.upgHp * 25);
    let costDmg = 225 + (save.upgDmg * 150);
    document.getElementById('cost-hp').textContent = costHp;
    document.getElementById('cost-dmg').textContent = costDmg;
    document.getElementById('btn-upg-hp').disabled = save.coins < costHp;
    document.getElementById('btn-upg-dmg').disabled = save.coins < costDmg;
    const tierIdx = tiers.findIndex(t => save.maxLevel >= t.start && save.maxLevel <= t.end);
    const badge = document.getElementById('tier-badge');
    if (badge) badge.textContent = `${tierIcons[tierIdx] || '🫧'} Lv.${save.maxLevel}`;
}

function buyUpgrade(type) {
    let cost = type === 'hp' ? 50 + (save.upgHp * 25) : 225 + (save.upgDmg * 150);
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

    const tierIndex = tiers.findIndex(t => currentLevel >= t.start && currentLevel <= t.end);

    // Enemy HP scales exponentially with level
    enemy.maxHp = Math.floor(30 * Math.pow(1.15, currentLevel - 1));
    enemy.hp = enemy.maxHp;

    // Always takes exactly 13 correct answers with no upgrades to kill enemy
    const BASE_HITS = 13;
    const baseDmg = Math.ceil(enemy.maxHp / BASE_HITS);

    player.maxHp = 100 + (save.upgHp * 20);
    player.hp = player.maxHp;
    player.xp = 0;
    player.requiredXp = BASE_HITS; // Fixed at 13 — never changes with upgrades

    // DMG upgrades add bonus damage — win faster (e.g. 10/13 hits) but bar stays at /13
    player.dmg = baseDmg + Math.floor(baseDmg * save.upgDmg * 0.2);

    // Enemy DMG is based on a fixed 100 HP so HP upgrades genuinely let you survive more hits
    // Difficulty scales both across tiers AND within each tier (gets harder level by level)
    const levelInTier = currentLevel - tiers[tierIndex].start; // 0–9
    const wrongsAllowed = Math.max(3, 8 - tierIndex - Math.floor(levelInTier / 3));
    enemy.dmg = Math.ceil(100 / wrongsAllowed);

    document.getElementById('stat-dmg-disp').textContent = player.dmg;
    document.getElementById('enemy-name').textContent = `${enemyNames[tierIndex]} (Lv ${currentLevel})`;

    setPlayerShape(save.playerColor, save.playerShape);
    const enemyColor = getEnemyColor(currentLevel);
    setEnemyShape(tierIndex, enemyColor);

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
    if (document.activeElement) document.activeElement.blur();
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
    if (enemy.hp <= 0) {
        let coinReward = 5 + Math.floor(currentLevel / 2);
        save.coins += coinReward;
        alert(`Victory! You earned ${coinReward} coins.`);
        if (currentLevel === save.maxLevel && save.maxLevel < 100) save.maxLevel++;
        saveGame(); 
        showLevelSelect(); 
        return;
    }
    setTimeout(generateQuestion, 800);
}

function getPlayerSVG(shape, color) {
    const svgs = {
        'star': `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <polygon points="30,8 36,24 53,24 40,34 45,50 30,40 15,50 20,34 7,24 24,24"
                   fill="${color}" stroke="rgba(0,0,0,0.3)" stroke-width="1.5"/>
          <circle cx="26" cy="28" r="3" fill="rgba(255,255,255,0.75)"/>
          <circle cx="36" cy="28" r="3" fill="rgba(255,255,255,0.75)"/>
        </svg>`,
        'bird': `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <ellipse cx="38" cy="18" rx="14" ry="9" fill="${color}" stroke="rgba(0,0,0,0.3)" stroke-width="1.5"/>
          <ellipse cx="30" cy="34" rx="22" ry="18" fill="${color}" stroke="rgba(0,0,0,0.3)" stroke-width="1.5"/>
          <circle cx="19" cy="29" r="4" fill="rgba(255,255,255,0.75)"/>
          <circle cx="19" cy="29" r="2" fill="#222"/>
          <polygon points="46,31 57,27 49,36" fill="#f39c12"/>
        </svg>`,
        'heart': `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <path d="M30,50 C14,39 4,30 4,20 C4,13 9,8 15,8 C20,8 25,11 30,17 C35,11 40,8 45,8 C51,8 56,13 56,20 C56,30 46,39 30,50 Z"
                fill="${color}" stroke="rgba(0,0,0,0.3)" stroke-width="1.5"/>
          <circle cx="25" cy="25" r="3" fill="rgba(255,255,255,0.75)"/>
          <circle cx="36" cy="25" r="3" fill="rgba(255,255,255,0.75)"/>
        </svg>`,
        'diamond': `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <polygon points="30,6 54,30 30,54 6,30"
                   fill="${color}" stroke="rgba(0,0,0,0.3)" stroke-width="1.5"/>
          <polygon points="30,14 46,30 30,46 14,30" fill="rgba(255,255,255,0.12)"/>
          <circle cx="26" cy="27" r="3" fill="rgba(255,255,255,0.75)"/>
          <circle cx="36" cy="27" r="3" fill="rgba(255,255,255,0.75)"/>
        </svg>`,
        'robot': `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <circle cx="30" cy="8" r="4" fill="${color}" stroke="rgba(0,0,0,0.3)" stroke-width="1.5"/>
          <line x1="30" y1="12" x2="30" y2="16" stroke="rgba(0,0,0,0.4)" stroke-width="2"/>
          <rect x="12" y="16" width="36" height="26" rx="4" fill="${color}" stroke="rgba(0,0,0,0.3)" stroke-width="1.5"/>
          <rect x="17" y="21" width="10" height="8" rx="2" fill="#2196F3"/>
          <rect x="33" y="21" width="10" height="8" rx="2" fill="#2196F3"/>
          <rect x="18" y="33" width="24" height="5" rx="2" fill="rgba(0,0,0,0.2)"/>
          <line x1="22" y1="35.5" x2="24" y2="35.5" stroke="rgba(255,255,255,0.6)" stroke-width="1"/>
          <line x1="26" y1="35.5" x2="28" y2="35.5" stroke="rgba(255,255,255,0.6)" stroke-width="1"/>
          <line x1="30" y1="35.5" x2="32" y2="35.5" stroke="rgba(255,255,255,0.6)" stroke-width="1"/>
          <rect x="4" y="20" width="7" height="16" rx="3" fill="${color}" stroke="rgba(0,0,0,0.3)" stroke-width="1.5"/>
          <rect x="49" y="20" width="7" height="16" rx="3" fill="${color}" stroke="rgba(0,0,0,0.3)" stroke-width="1.5"/>
          <rect x="18" y="44" width="10" height="12" rx="3" fill="${color}" stroke="rgba(0,0,0,0.3)" stroke-width="1.5"/>
          <rect x="32" y="44" width="10" height="12" rx="3" fill="${color}" stroke="rgba(0,0,0,0.3)" stroke-width="1.5"/>
        </svg>`,
        'cat': `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <polygon points="10,28 4,8 20,22" fill="${color}" stroke="rgba(0,0,0,0.3)" stroke-width="1.5"/>
          <polygon points="50,28 56,8 40,22" fill="${color}" stroke="rgba(0,0,0,0.3)" stroke-width="1.5"/>
          <circle cx="30" cy="34" r="22" fill="${color}" stroke="rgba(0,0,0,0.3)" stroke-width="1.5"/>
          <ellipse cx="22" cy="30" rx="5" ry="7" fill="rgba(255,255,255,0.85)"/>
          <ellipse cx="22" cy="30" rx="2" ry="5" fill="#222"/>
          <ellipse cx="38" cy="30" rx="5" ry="7" fill="rgba(255,255,255,0.85)"/>
          <ellipse cx="38" cy="30" rx="2" ry="5" fill="#222"/>
          <ellipse cx="30" cy="38" rx="4" ry="3" fill="rgba(255,182,193,0.7)"/>
          <line x1="14" y1="37" x2="4" y2="34" stroke="rgba(0,0,0,0.4)" stroke-width="1.5"/>
          <line x1="14" y1="39" x2="4" y2="40" stroke="rgba(0,0,0,0.4)" stroke-width="1.5"/>
          <line x1="46" y1="37" x2="56" y2="34" stroke="rgba(0,0,0,0.4)" stroke-width="1.5"/>
          <line x1="46" y1="39" x2="56" y2="40" stroke="rgba(0,0,0,0.4)" stroke-width="1.5"/>
        </svg>`,
        'ghost': `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <path d="M8,52 Q10,44 14,50 Q18,56 22,50 Q26,44 30,50 Q34,56 38,50 Q42,44 46,50 Q50,56 52,52 L52,28 Q52,8 30,8 Q8,8 8,28 Z"
                fill="${color}" stroke="rgba(0,0,0,0.3)" stroke-width="1.5"/>
          <circle cx="22" cy="28" r="6" fill="rgba(255,255,255,0.9)"/>
          <circle cx="22" cy="28" r="3" fill="#222"/>
          <circle cx="38" cy="28" r="6" fill="rgba(255,255,255,0.9)"/>
          <circle cx="38" cy="28" r="3" fill="#222"/>
        </svg>`,
        'ninja': `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <circle cx="30" cy="30" r="24" fill="${color}" stroke="rgba(0,0,0,0.3)" stroke-width="1.5"/>
          <rect x="8" y="26" width="44" height="12" rx="2" fill="rgba(0,0,0,0.5)"/>
          <circle cx="22" cy="32" r="4" fill="#e74c3c"/>
          <circle cx="22" cy="32" r="2" fill="#ff6b6b"/>
          <circle cx="38" cy="32" r="4" fill="#e74c3c"/>
          <circle cx="38" cy="32" r="2" fill="#ff6b6b"/>
          <path d="M8,10 Q30,4 52,10 L52,28 Q30,22 8,28 Z" fill="rgba(0,0,0,0.45)"/>
          <path d="M8,50 Q30,56 52,50 L52,38 Q30,44 8,38 Z" fill="rgba(0,0,0,0.45)"/>
        </svg>`,
        'wizard': `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <polygon points="30,2 40,30 20,30" fill="${color}" stroke="rgba(0,0,0,0.3)" stroke-width="1.5"/>
          <circle cx="30" cy="16" r="3" fill="rgba(255,255,200,0.9)"/>
          <ellipse cx="30" cy="30" rx="16" ry="4" fill="${color}" stroke="rgba(0,0,0,0.3)" stroke-width="1.5"/>
          <circle cx="30" cy="40" r="14" fill="${color}" stroke="rgba(0,0,0,0.3)" stroke-width="1.5"/>
          <circle cx="24" cy="38" r="4" fill="rgba(255,255,255,0.85)"/>
          <circle cx="24" cy="38" r="2.5" fill="#222"/>
          <circle cx="36" cy="38" r="4" fill="rgba(255,255,255,0.85)"/>
          <circle cx="36" cy="38" r="2.5" fill="#222"/>
          <path d="M26,46 Q30,50 34,46" stroke="rgba(0,0,0,0.4)" stroke-width="1.5" fill="none"/>
        </svg>`,
        'alien': `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <circle cx="22" cy="8" r="4" fill="${color}" stroke="rgba(0,0,0,0.3)" stroke-width="1.5"/>
          <circle cx="38" cy="8" r="4" fill="${color}" stroke="rgba(0,0,0,0.3)" stroke-width="1.5"/>
          <ellipse cx="30" cy="34" rx="22" ry="26" fill="${color}" stroke="rgba(0,0,0,0.3)" stroke-width="1.5"/>
          <ellipse cx="20" cy="30" rx="9" ry="7" fill="rgba(100,240,100,0.85)"/>
          <ellipse cx="20" cy="30" rx="5" ry="4" fill="#1a7a1a"/>
          <ellipse cx="40" cy="30" rx="9" ry="7" fill="rgba(100,240,100,0.85)"/>
          <ellipse cx="40" cy="30" rx="5" ry="4" fill="#1a7a1a"/>
          <path d="M22,46 Q30,52 38,46" stroke="rgba(0,0,0,0.35)" stroke-width="2" fill="none"/>
        </svg>`
    };
    return svgs[shape] || null;
}

function setPlayerShape(color, shape) {
    const playerEl = document.getElementById('player');
    const svg = getPlayerSVG(shape, color);
    if (svg) {
        playerEl.innerHTML = svg;
        playerEl.classList.add('has-svg');
        playerEl.style.backgroundColor = 'transparent';
    } else {
        playerEl.innerHTML = '';
        playerEl.classList.remove('has-svg');
        playerEl.style.backgroundColor = color;
        playerEl.style.borderRadius = shape || '50%';
        playerEl.style.border = '';
        playerEl.style.boxShadow = '';
    }
}

function getEnemySVG(tierIndex, color) {
    const svgs = [
        // Tier 0: Slime
        `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <circle cx="30" cy="52" r="22" fill="${color}"/>
          <circle cx="60" cy="46" r="20" fill="${color}"/>
          <ellipse cx="50" cy="70" rx="42" ry="26" fill="${color}"/>
          <circle cx="38" cy="68" r="9" fill="white"/>
          <circle cx="63" cy="68" r="9" fill="white"/>
          <circle cx="40" cy="69" r="5" fill="#1a1a1a"/>
          <circle cx="65" cy="69" r="5" fill="#1a1a1a"/>
          <circle cx="38" cy="67" r="2" fill="white"/>
          <circle cx="63" cy="67" r="2" fill="white"/>
        </svg>`,

        // Tier 1: Goblin
        `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <ellipse cx="50" cy="80" rx="18" ry="14" fill="${color}"/>
          <polygon points="20,46 6,14 36,36" fill="${color}"/>
          <polygon points="80,46 94,14 64,36" fill="${color}"/>
          <circle cx="50" cy="44" r="24" fill="${color}"/>
          <circle cx="41" cy="39" r="7" fill="#ffee22"/>
          <circle cx="59" cy="39" r="7" fill="#ffee22"/>
          <circle cx="41" cy="39" r="3.5" fill="#111"/>
          <circle cx="59" cy="39" r="3.5" fill="#111"/>
          <circle cx="40" cy="38" r="1.2" fill="white"/>
          <circle cx="58" cy="38" r="1.2" fill="white"/>
          <path d="M40,58 Q50,63 60,58" stroke="rgba(0,0,0,0.35)" stroke-width="2" fill="none"/>
          <rect x="45" y="59" width="4" height="7" rx="1" fill="white"/>
          <rect x="53" y="59" width="4" height="7" rx="1" fill="white"/>
        </svg>`,

        // Tier 2: Orc
        `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <rect x="22" y="60" width="56" height="36" rx="10" fill="${color}"/>
          <ellipse cx="50" cy="44" rx="30" ry="28" fill="${color}"/>
          <rect x="26" y="28" width="48" height="12" rx="5" fill="rgba(0,0,0,0.3)"/>
          <circle cx="39" cy="44" r="7" fill="#ff4444"/>
          <circle cx="61" cy="44" r="7" fill="#ff4444"/>
          <circle cx="39" cy="44" r="3.5" fill="#111"/>
          <circle cx="61" cy="44" r="3.5" fill="#111"/>
          <polygon points="40,60 34,80 47,80" fill="#eee"/>
          <polygon points="60,60 53,80 66,80" fill="#eee"/>
          <ellipse cx="50" cy="56" rx="10" ry="6" fill="rgba(0,0,0,0.25)"/>
        </svg>`,

        // Tier 3: Troll
        `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <ellipse cx="50" cy="76" rx="38" ry="22" fill="${color}"/>
          <ellipse cx="50" cy="44" rx="34" ry="32" fill="${color}"/>
          <ellipse cx="50" cy="50" rx="16" ry="12" fill="rgba(0,0,0,0.18)"/>
          <circle cx="38" cy="33" r="6" fill="white"/>
          <circle cx="62" cy="33" r="6" fill="white"/>
          <circle cx="39" cy="35" r="3" fill="#333"/>
          <circle cx="63" cy="35" r="3" fill="#333"/>
          <ellipse cx="50" cy="47" rx="13" ry="9" fill="${color}"/>
          <path d="M40,57 Q50,63 60,57" stroke="rgba(0,0,0,0.3)" stroke-width="3" fill="none"/>
          <ellipse cx="50" cy="25" rx="6" ry="4" fill="rgba(0,0,0,0.15)"/>
        </svg>`,

        // Tier 4: Bandit
        `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <path d="M28,100 L28,64 Q50,56 72,64 L72,100" fill="${color}"/>
          <circle cx="50" cy="45" r="22" fill="${color}"/>
          <path d="M26,24 Q50,10 74,24 Q72,32 50,32 Q28,32 26,24Z" fill="#2a2a2a"/>
          <rect x="28" y="40" width="44" height="13" rx="4" fill="#1a1a1a"/>
          <circle cx="40" cy="46" r="5" fill="#ff6600"/>
          <circle cx="60" cy="46" r="5" fill="#ff6600"/>
          <circle cx="40" cy="46" r="2.5" fill="#111"/>
          <circle cx="60" cy="46" r="2.5" fill="#111"/>
          <path d="M40,60 Q50,67 60,60" stroke="white" stroke-width="2.5" fill="none"/>
        </svg>`,

        // Tier 5: Golem
        `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <rect x="18" y="54" width="64" height="44" rx="5" fill="${color}"/>
          <rect x="24" y="22" width="52" height="44" rx="5" fill="${color}"/>
          <line x1="24" y1="44" x2="76" y2="44" stroke="rgba(0,0,0,0.3)" stroke-width="3.5"/>
          <line x1="50" y1="22" x2="50" y2="66" stroke="rgba(0,0,0,0.3)" stroke-width="3.5"/>
          <line x1="30" y1="22" x2="24" y2="38" stroke="rgba(0,0,0,0.2)" stroke-width="2"/>
          <line x1="70" y1="22" x2="76" y2="36" stroke="rgba(0,0,0,0.2)" stroke-width="2"/>
          <rect x="31" y="29" width="14" height="10" rx="2" fill="#33aaff"/>
          <rect x="55" y="29" width="14" height="10" rx="2" fill="#33aaff"/>
          <circle cx="38" cy="34" r="4.5" fill="#0066ff"/>
          <circle cx="62" cy="34" r="4.5" fill="#0066ff"/>
          <rect x="34" y="60" width="14" height="8" rx="2" fill="rgba(0,0,0,0.28)"/>
          <rect x="52" y="60" width="14" height="8" rx="2" fill="rgba(0,0,0,0.28)"/>
        </svg>`,

        // Tier 6: Dark Knight
        `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <rect x="20" y="58" width="60" height="38" rx="6" fill="${color}"/>
          <rect x="6" y="52" width="18" height="34" rx="4" fill="${color}"/>
          <rect x="76" y="52" width="18" height="34" rx="4" fill="${color}"/>
          <path d="M22,58 L22,20 Q22,8 50,6 Q78,8 78,20 L78,58 Q64,50 50,50 Q36,50 22,58Z" fill="${color}"/>
          <path d="M22,58 Q22,64 50,64 Q78,64 78,58" fill="rgba(0,0,0,0.2)"/>
          <rect x="27" y="36" width="46" height="13" rx="2" fill="#0a0a0a"/>
          <circle cx="38" cy="42" r="5.5" fill="#ff3300"/>
          <circle cx="62" cy="42" r="5.5" fill="#ff3300"/>
          <line x1="6" y1="58" x2="94" y2="58" stroke="rgba(0,0,0,0.3)" stroke-width="3"/>
          <rect x="42" y="6" width="16" height="16" rx="2" fill="${color}"/>
        </svg>`,

        // Tier 7: Dragon
        `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <polygon points="4,32 28,60 12,76" fill="${color}"/>
          <polygon points="96,32 72,60 88,76" fill="${color}"/>
          <polygon points="36,12 30,30 46,28" fill="${color}"/>
          <polygon points="64,12 70,30 54,28" fill="${color}"/>
          <polygon points="50,5 44,26 56,26" fill="${color}"/>
          <ellipse cx="50" cy="56" rx="30" ry="32" fill="${color}"/>
          <circle cx="39" cy="48" r="8" fill="#ffaa00"/>
          <circle cx="61" cy="48" r="8" fill="#ffaa00"/>
          <circle cx="39" cy="48" r="4.5" fill="#111"/>
          <circle cx="61" cy="48" r="4.5" fill="#111"/>
          <circle cx="37" cy="46" r="1.5" fill="white"/>
          <circle cx="59" cy="46" r="1.5" fill="white"/>
          <path d="M34,68 L38,62 L42,68 L46,62 L50,68 L54,62 L58,68 L62,62 L66,68" stroke="white" stroke-width="2" fill="none"/>
          <polygon points="42,74 50,88 58,74" fill="#ff4400" opacity="0.75"/>
        </svg>`,

        // Tier 8: Demon
        `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <polygon points="8,62 32,30 28,76" fill="${color}"/>
          <polygon points="92,62 68,30 72,76" fill="${color}"/>
          <ellipse cx="50" cy="60" rx="28" ry="28" fill="${color}"/>
          <ellipse cx="50" cy="40" rx="24" ry="24" fill="${color}"/>
          <polygon points="30,28 24,4 42,24" fill="${color}"/>
          <polygon points="70,28 76,4 58,24" fill="${color}"/>
          <polygon points="50,20 45,6 55,6" fill="${color}"/>
          <circle cx="41" cy="38" r="8" fill="#ff0000"/>
          <circle cx="59" cy="38" r="8" fill="#ff0000"/>
          <circle cx="41" cy="38" r="4" fill="#660000"/>
          <circle cx="59" cy="38" r="4" fill="#660000"/>
          <circle cx="39" cy="36" r="1.5" fill="#ff8888"/>
          <circle cx="57" cy="36" r="1.5" fill="#ff8888"/>
          <path d="M36,55 Q50,68 64,55" stroke="#ff2200" stroke-width="3" fill="none"/>
          <polygon points="40,62 44,72 48,62 52,72 56,62 60,72" fill="white"/>
        </svg>`,

        // Tier 9: Titan
        `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <rect x="16" y="56" width="68" height="42" rx="7" fill="${color}"/>
          <rect x="4" y="46" width="20" height="46" rx="5" fill="${color}"/>
          <rect x="76" y="46" width="20" height="46" rx="5" fill="${color}"/>
          <ellipse cx="50" cy="38" rx="34" ry="32" fill="${color}"/>
          <polygon points="24,18 16,2 36,16" fill="${color}"/>
          <polygon points="76,18 84,2 64,16" fill="${color}"/>
          <polygon points="50,12 44,28 56,28" fill="${color}"/>
          <circle cx="38" cy="34" r="9" fill="white"/>
          <circle cx="62" cy="34" r="9" fill="white"/>
          <circle cx="38" cy="34" r="6" fill="#8800ff"/>
          <circle cx="62" cy="34" r="6" fill="#8800ff"/>
          <circle cx="38" cy="34" r="3" fill="#330066"/>
          <circle cx="62" cy="34" r="3" fill="#330066"/>
          <circle cx="36" cy="32" r="1.5" fill="#cc88ff"/>
          <circle cx="60" cy="32" r="1.5" fill="#cc88ff"/>
          <rect x="30" y="50" width="40" height="7" rx="3" fill="rgba(0,0,0,0.3)"/>
          <line x1="16" y1="56" x2="84" y2="56" stroke="rgba(0,0,0,0.25)" stroke-width="3"/>
        </svg>`
    ];
    return svgs[tierIndex] || svgs[0];
}

function setEnemyShape(tierIndex, color) {
    const enemyEl = document.getElementById('enemy');
    enemyEl.innerHTML = getEnemySVG(tierIndex, color);
    enemyEl.classList.add('has-svg');
    enemyEl.style.backgroundColor = 'transparent';
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