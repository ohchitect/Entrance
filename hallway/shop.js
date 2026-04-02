// Customization colors (purchasable - 50 coins each)
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

// Customization shapes (premium - 100 coins each) - Creative shapes
const customShapes = [
    { name: "Star", shape: "star", cost: 100 },
    { name: "Bird", shape: "bird", cost: 100 },
    { name: "Heart", shape: "heart", cost: 100 },
    { name: "Diamond", shape: "diamond", cost: 100 }
];

function openShopModal() {
    document.getElementById('shop-modal').style.display = 'block';
    initCharacterShop();
}

function closeShopModal() {
    document.getElementById('shop-modal').style.display = 'none';
}

function initCharacterShop() {
    // Generate color shop
    const colorShop = document.getElementById('color-shop');
    if (!colorShop) {
        console.error('color-shop element not found');
        return;
    }
    
    colorShop.innerHTML = '';
    
    customColors.forEach((c, idx) => {
        const item = document.createElement('div');
        item.className = 'shop-item';
        if (save.playerColor === c.color) {
            item.classList.add('selected');
        }
        
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
    
    // Generate shape shop
    const shapeShop = document.getElementById('shape-shop');
    if (!shapeShop) {
        console.error('shape-shop element not found');
        return;
    }
    
    shapeShop.innerHTML = '';
    
    customShapes.forEach((s, idx) => {
        const item = document.createElement('div');
        item.className = 'shop-item';
        
        if (save.playerShape === s.shape) {
            item.classList.add('selected');
        }
        
        const isOwned = save.ownedShapes && save.ownedShapes.includes(idx);
        
        // Create shape preview
        let shapePreview = '';
        if (s.shape === 'star') {
            shapePreview = `
                <svg width="60" height="60" viewBox="0 0 60 60" style="margin: 0 auto;">
                    <polygon points="30,10 36,25 52,25 40,35 45,50 30,40 15,50 20,35 8,25 24,25" 
                             fill="#3498db" stroke="#1a2c4a" stroke-width="2"/>
                </svg>
            `;
        } else if (s.shape === 'bird') {
            shapePreview = `
                <svg width="60" height="60" viewBox="0 0 60 60" style="margin: 0 auto;">
                    <ellipse cx="30" cy="30" rx="20" ry="18" fill="#3498db" stroke="#1a2c4a" stroke-width="2"/>
                    <circle cx="20" cy="25" r="3" fill="#1a2c4a"/>
                    <polygon points="45,28 55,25 48,32" fill="#f39c12"/>
                </svg>
            `;
        } else if (s.shape === 'heart') {
            shapePreview = `
                <svg width="60" height="60" viewBox="0 0 60 60" style="margin: 0 auto;">
                    <path d="M30,50 C15,40 5,32 5,22 C5,15 10,10 15,10 C20,10 25,13 30,18 C35,13 40,10 45,10 C50,10 55,15 55,22 C55,32 45,40 30,50 Z" 
                          fill="#e91e63" stroke="#1a2c4a" stroke-width="2"/>
                </svg>
            `;
        } else if (s.shape === 'diamond') {
            shapePreview = `
                <svg width="60" height="60" viewBox="0 0 60 60" style="margin: 0 auto;">
                    <polygon points="30,8 52,30 30,52 8,30" fill="#3498db" stroke="#1a2c4a" stroke-width="2"/>
                </svg>
            `;
        }
        
        item.innerHTML = `
            <div class="item-preview">${shapePreview}</div>
            <div class="item-label">${s.name}</div>
            <div class="item-price">${isOwned ? '✓ Owned' : s.cost + ' 💰'}</div>
        `;
        
        item.style.cursor = 'pointer';
        item.onclick = () => selectShape(idx, s.shape, s.cost, isOwned);
        
        shapeShop.appendChild(item);
    });
    
    // Update preview
    updatePreviewCharacter();
}

function updatePreviewCharacter() {
    const preview = document.getElementById('shop-player-preview');
    if (!preview) return;
    
    preview.style.backgroundColor = save.playerColor;
    preview.innerHTML = '';
    
    // Draw the selected shape
    const shapeIdx = customShapes.findIndex(s => s.shape === save.playerShape);
    if (shapeIdx >= 0) {
        const s = customShapes[shapeIdx];
        let shapeSVG = '';
        
        if (s.shape === 'star') {
            shapeSVG = `
                <svg width="100" height="100" viewBox="0 0 60 60" style="width:100%; height:100%;">
                    <polygon points="30,10 36,25 52,25 40,35 45,50 30,40 15,50 20,35 8,25 24,25" 
                             fill="${save.playerColor}" stroke="#1a2c4a" stroke-width="2"/>
                </svg>
            `;
        } else if (s.shape === 'bird') {
            shapeSVG = `
                <svg width="100" height="100" viewBox="0 0 60 60" style="width:100%; height:100%;">
                    <ellipse cx="30" cy="30" rx="20" ry="18" fill="${save.playerColor}" stroke="#1a2c4a" stroke-width="2"/>
                    <circle cx="20" cy="25" r="3" fill="#1a2c4a"/>
                    <polygon points="45,28 55,25 48,32" fill="#f39c12"/>
                </svg>
            `;
        } else if (s.shape === 'heart') {
            shapeSVG = `
                <svg width="100" height="100" viewBox="0 0 60 60" style="width:100%; height:100%;">
                    <path d="M30,50 C15,40 5,32 5,22 C5,15 10,10 15,10 C20,10 25,13 30,18 C35,13 40,10 45,10 C50,10 55,15 55,22 C55,32 45,40 30,50 Z" 
                          fill="${save.playerColor}" stroke="#1a2c4a" stroke-width="2"/>
                </svg>
            `;
        } else if (s.shape === 'diamond') {
            shapeSVG = `
                <svg width="100" height="100" viewBox="0 0 60 60" style="width:100%; height:100%;">
                    <polygon points="30,8 52,30 30,52 8,30" fill="${save.playerColor}" stroke="#1a2c4a" stroke-width="2"/>
                </svg>
            `;
        }
        
        preview.innerHTML = shapeSVG;
    } else {
        preview.style.borderRadius = '50%';
    }
}

function selectColor(idx, color, cost, isOwned, isFree) {
    if (isFree) {
        // Free color - just select it
        save.playerColor = color;
        saveGame();
        initCharacterShop();
    } else {
        // Paid color
        if (isOwned) {
            // Already owned - just select it
            save.playerColor = color;
            saveGame();
            initCharacterShop();
        } else {
            // Need to buy it
            if (save.coins >= cost) {
                save.coins -= cost;
                if (!save.ownedColors) {
                    save.ownedColors = [];
                }
                save.ownedColors.push(idx);
                save.playerColor = color;
                saveGame();
                updateShopUI();
                initCharacterShop();
                alert(`🎉 Color unlocked!`);
            } else {
                alert(`Not enough coins! You need ${cost} coins but only have ${save.coins}.`);
            }
        }
    }
}

function selectShape(idx, shape, cost, isOwned) {
    if (!isOwned) {
        // Need to buy it
        if (save.coins >= cost) {
            save.coins -= cost;
            if (!save.ownedShapes) {
                save.ownedShapes = [];
            }
            save.ownedShapes.push(idx);
            save.playerShape = shape;
            saveGame();
            updateShopUI();
            initCharacterShop();
            alert(`🎉 Shape unlocked!`);
        } else {
            alert(`Not enough coins! You need ${cost} coins but only have ${save.coins}.`);
        }
    } else {
        // Already owned, just select it
        save.playerShape = shape;
        saveGame();
        initCharacterShop();
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const shopModal = document.getElementById('shop-modal');
    if (event.target === shopModal) {
        closeShopModal();
    }
}