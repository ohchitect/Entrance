const customColors = [
    { name: "Navy", color: "#1a2c4a", cost: 0, free: true },
    { name: "Red", color: "#e74c3c", cost: 50, free: false },
    { name: "Blue", color: "#3498db", cost: 50, free: false },
    { name: "Purple", color: "#9b59b6", cost: 50, free: false },
    { name: "Gold", color: "#f39c12", cost: 50, free: false },
    { name: "Green", color: "#27ae60", cost: 50, free: false },
    { name: "Pink", color: "#e91e63", cost: 50, free: false },
    { name: "Teal", color: "#16a085", cost: 50, free: false }
];

const customShapes = [
    { name: "Star",    shape: "star",    cost: 100 },
    { name: "Bird",    shape: "bird",    cost: 100 },
    { name: "Heart",   shape: "heart",   cost: 100 },
    { name: "Diamond", shape: "diamond", cost: 100 },
    { name: "Robot",   shape: "robot",   cost: 150 },
    { name: "Cat",     shape: "cat",     cost: 150 },
    { name: "Ghost",   shape: "ghost",   cost: 150 },
    { name: "Ninja",   shape: "ninja",   cost: 150 },
    { name: "Wizard",  shape: "wizard",  cost: 200 },
    { name: "Alien",   shape: "alien",   cost: 200 }
];

function shapeThumbSVG(shape) {
    const c = '#3498db';
    const svgs = {
        star:    `<polygon points="30,10 36,25 52,25 40,35 45,50 30,40 15,50 20,35 8,25 24,25" fill="${c}" stroke="#1a2c4a" stroke-width="2"/>`,
        bird:    `<ellipse cx="30" cy="32" rx="20" ry="18" fill="${c}" stroke="#1a2c4a" stroke-width="2"/>
                  <ellipse cx="38" cy="18" rx="13" ry="9" fill="${c}" stroke="#1a2c4a" stroke-width="2"/>
                  <circle cx="19" cy="29" r="3.5" fill="white"/><circle cx="19" cy="29" r="2" fill="#222"/>
                  <polygon points="46,30 57,26 49,35" fill="#f39c12"/>`,
        heart:   `<path d="M30,50 C15,40 5,32 5,22 C5,15 10,10 15,10 C20,10 25,13 30,18 C35,13 40,10 45,10 C50,10 55,15 55,22 C55,32 45,40 30,50 Z" fill="${c}" stroke="#1a2c4a" stroke-width="2"/>`,
        diamond: `<polygon points="30,8 52,30 30,52 8,30" fill="${c}" stroke="#1a2c4a" stroke-width="2"/>`,
        robot:   `<circle cx="28" cy="5" r="2.5" fill="${c}"/>
                  <line x1="28" y1="7" x2="28" y2="13" stroke="${c}" stroke-width="2"/>
                  <rect x="10" y="13" width="40" height="36" rx="5" fill="${c}" stroke="rgba(0,0,0,0.2)" stroke-width="1.5"/>
                  <rect x="15" y="21" width="11" height="8" rx="2" fill="#44aaff"/>
                  <rect x="34" y="21" width="11" height="8" rx="2" fill="#44aaff"/>
                  <circle cx="20.5" cy="25" r="3" fill="#0066ff"/>
                  <circle cx="39.5" cy="25" r="3" fill="#0066ff"/>
                  <rect x="18" y="35" width="24" height="6" rx="2" fill="rgba(0,0,0,0.25)"/>
                  <line x1="26" y1="35" x2="26" y2="41" stroke="rgba(0,0,0,0.2)" stroke-width="1"/>
                  <line x1="30" y1="35" x2="30" y2="41" stroke="rgba(0,0,0,0.2)" stroke-width="1"/>
                  <line x1="34" y1="35" x2="34" y2="41" stroke="rgba(0,0,0,0.2)" stroke-width="1"/>`,
        cat:     `<polygon points="12,26 8,8 22,24" fill="${c}"/>
                  <polygon points="48,26 52,8 38,24" fill="${c}"/>
                  <circle cx="30" cy="36" r="22" fill="${c}"/>
                  <ellipse cx="22" cy="33" rx="2" ry="5" fill="#111"/>
                  <ellipse cx="38" cy="33" rx="2" ry="5" fill="#111"/>
                  <circle cx="21" cy="31" r="1.2" fill="white"/>
                  <circle cx="37" cy="31" r="1.2" fill="white"/>
                  <path d="M27,44 Q30,48 33,44" stroke="rgba(0,0,0,0.35)" stroke-width="1.5" fill="none"/>
                  <line x1="10" y1="39" x2="24" y2="41" stroke="rgba(0,0,0,0.25)" stroke-width="1.2"/>
                  <line x1="10" y1="43" x2="24" y2="43" stroke="rgba(0,0,0,0.25)" stroke-width="1.2"/>
                  <line x1="50" y1="39" x2="36" y2="41" stroke="rgba(0,0,0,0.25)" stroke-width="1.2"/>
                  <line x1="50" y1="43" x2="36" y2="43" stroke="rgba(0,0,0,0.25)" stroke-width="1.2"/>`,
        ghost:   `<path d="M8,54 L8,24 Q8,4 30,4 Q52,4 52,24 L52,54 L46,48 L40,54 L34,48 L28,54 L22,48 L16,54 Z" fill="${c}"/>
                  <circle cx="22" cy="27" r="6" fill="white"/>
                  <circle cx="38" cy="27" r="6" fill="white"/>
                  <circle cx="22" cy="27" r="3" fill="#111"/>
                  <circle cx="38" cy="27" r="3" fill="#111"/>
                  <circle cx="21" cy="25" r="1" fill="white"/>
                  <circle cx="37" cy="25" r="1" fill="white"/>
                  <path d="M22,40 Q30,46 38,40" stroke="rgba(0,0,0,0.3)" stroke-width="2" fill="none"/>`,
        ninja:   `<circle cx="30" cy="30" r="26" fill="${c}"/>
                  <rect x="4" y="24" width="52" height="14" rx="3" fill="rgba(0,0,0,0.55)"/>
                  <circle cx="20" cy="31" r="5" fill="#ff3300"/>
                  <circle cx="40" cy="31" r="5" fill="#ff3300"/>
                  <circle cx="20" cy="31" r="2.5" fill="#111"/>
                  <circle cx="40" cy="31" r="2.5" fill="#111"/>
                  <circle cx="19" cy="30" r="1" fill="rgba(255,255,255,0.6)"/>
                  <circle cx="39" cy="30" r="1" fill="rgba(255,255,255,0.6)"/>`,
        wizard:  `<polygon points="30,2 14,26 46,26" fill="rgba(0,0,0,0.45)"/>
                  <circle cx="30" cy="26" r="2.5" fill="#ffdd00"/>
                  <circle cx="30" cy="38" r="20" fill="${c}"/>
                  <ellipse cx="30" cy="27" rx="18" ry="5" fill="rgba(0,0,0,0.2)"/>
                  <circle cx="21" cy="37" r="5.5" fill="white"/>
                  <circle cx="39" cy="37" r="5.5" fill="white"/>
                  <circle cx="21" cy="37" r="2.8" fill="#333"/>
                  <circle cx="39" cy="37" r="2.8" fill="#333"/>
                  <circle cx="20" cy="36" r="1" fill="white"/>
                  <circle cx="38" cy="36" r="1" fill="white"/>
                  <path d="M24,48 Q30,54 36,48" stroke="rgba(0,0,0,0.35)" stroke-width="2" fill="none"/>`,
        alien:   `<line x1="22" y1="10" x2="16" y2="3" stroke="${c}" stroke-width="2.5"/>
                  <circle cx="15" cy="2" r="3" fill="${c}"/>
                  <line x1="38" y1="10" x2="44" y2="3" stroke="${c}" stroke-width="2.5"/>
                  <circle cx="45" cy="2" r="3" fill="${c}"/>
                  <ellipse cx="30" cy="36" rx="24" ry="26" fill="${c}"/>
                  <ellipse cx="20" cy="28" rx="10" ry="8" fill="rgba(0,0,0,0.2)"/>
                  <ellipse cx="40" cy="28" rx="10" ry="8" fill="rgba(0,0,0,0.2)"/>
                  <ellipse cx="20" cy="28" rx="6" ry="5" fill="#55ff55"/>
                  <ellipse cx="40" cy="28" rx="6" ry="5" fill="#55ff55"/>
                  <ellipse cx="20" cy="28" rx="3" ry="3.5" fill="#111"/>
                  <ellipse cx="40" cy="28" rx="3" ry="3.5" fill="#111"/>
                  <circle cx="19" cy="26" r="1" fill="white"/>
                  <circle cx="39" cy="26" r="1" fill="white"/>
                  <path d="M22,44 Q30,50 38,44" stroke="rgba(0,0,0,0.3)" stroke-width="2" fill="none"/>`
    };
    return svgs[shape] || '';
}

function shapeFullSVG(shape, color) {
    const thumbContent = shapeThumbSVG(shape).replace(/#3498db/g, color);
    return `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">${thumbContent}</svg>`;
}

function openShopModal() {
    document.getElementById('shop-modal').style.display = 'block';
    initCharacterShop();
}

function closeShopModal() {
    document.getElementById('shop-modal').style.display = 'none';
}

function initCharacterShop() {
    const colorShop = document.getElementById('color-shop');
    if (!colorShop) return;
    colorShop.innerHTML = '';
    customColors.forEach((c, idx) => {
        const item = document.createElement('div');
        item.className = 'shop-item';
        if (save.playerColor === c.color) item.classList.add('selected');
        const isOwned = save.ownedColors && save.ownedColors.includes(idx);
        item.innerHTML = `
            <div class="item-preview" style="background-color: ${c.color};"></div>
            <div class="item-label">${c.name}</div>
            <div class="item-price">${c.free ? '✓ Free' : (isOwned ? '✓ Owned' : c.cost + ' 💰')}</div>
        `;
        item.style.cursor = 'pointer';
        item.onclick = () => selectColor(idx, c.color, c.cost, isOwned, c.free);
        colorShop.appendChild(item);
    });

    const shapeShop = document.getElementById('shape-shop');
    if (!shapeShop) return;
    shapeShop.innerHTML = '';
    customShapes.forEach((s, idx) => {
        const item = document.createElement('div');
        item.className = 'shop-item';
        if (save.playerShape === s.shape) item.classList.add('selected');
        const isOwned = save.ownedShapes && save.ownedShapes.includes(idx);
        const thumbInner = shapeThumbSVG(s.shape);
        const shapePreview = thumbInner
            ? `<svg width="60" height="60" viewBox="0 0 60 60" style="display:block;margin:0 auto;">${thumbInner}</svg>`
            : '';
        item.innerHTML = `
            <div class="item-preview">${shapePreview}</div>
            <div class="item-label">${s.name}</div>
            <div class="item-price">${isOwned ? '✓ Owned' : s.cost + ' 💰'}</div>
        `;
        item.style.cursor = 'pointer';
        item.onclick = () => selectShape(idx, s.shape, s.cost, isOwned);
        shapeShop.appendChild(item);
    });

    updatePreviewCharacter();
}

function updatePreviewCharacter() {
    const preview = document.getElementById('shop-player-preview');
    if (!preview) return;
    const shapeIdx = customShapes.findIndex(s => s.shape === save.playerShape);
    if (shapeIdx >= 0) {
        preview.style.backgroundColor = 'transparent';
        preview.style.borderRadius = '0';
        preview.innerHTML = shapeFullSVG(customShapes[shapeIdx].shape, save.playerColor);
    } else {
        preview.innerHTML = '';
        preview.style.backgroundColor = save.playerColor;
        preview.style.borderRadius = '50%';
    }
}

function selectColor(idx, color, cost, isOwned, isFree) {
    if (isFree || isOwned) {
        save.playerColor = color;
        saveGame();
        initCharacterShop();
    } else {
        if (save.coins >= cost) {
            save.coins -= cost;
            if (!save.ownedColors) save.ownedColors = [];
            save.ownedColors.push(idx);
            save.playerColor = color;
            saveGame();
            updateShopUI();
            initCharacterShop();
            alert('🎉 Color unlocked!');
        } else {
            alert(`Not enough coins! You need ${cost} but only have ${save.coins}.`);
        }
    }
}

function selectShape(idx, shape, cost, isOwned) {
    if (isOwned) {
        save.playerShape = shape;
        saveGame();
        initCharacterShop();
    } else {
        if (save.coins >= cost) {
            save.coins -= cost;
            if (!save.ownedShapes) save.ownedShapes = [];
            save.ownedShapes.push(idx);
            save.playerShape = shape;
            saveGame();
            updateShopUI();
            initCharacterShop();
            alert('🎉 Shape unlocked!');
        } else {
            alert(`Not enough coins! You need ${cost} but only have ${save.coins}.`);
        }
    }
}

window.onclick = function(event) {
    const shopModal = document.getElementById('shop-modal');
    if (event.target === shopModal) closeShopModal();
}
