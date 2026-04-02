// Customization colors (free)
const customColors = [
    { name: "Navy", color: "#1a2c4a" },
    { name: "Red", color: "#e74c3c" },
    { name: "Blue", color: "#3498db" },
    { name: "Purple", color: "#9b59b6" },
    { name: "Gold", color: "#f39c12" },
    { name: "Green", color: "#27ae60" },
    { name: "Pink", color: "#e91e63" },
    { name: "Teal", color: "#16a085" }
];

// Customization shapes (premium - 100 coins each)
const customShapes = [
    { name: "Circle", borderRadius: "50%" },
    { name: "Square", borderRadius: "10%" },
    { name: "Rounded", borderRadius: "20%" },
    { name: "Pill", borderRadius: "40%" }
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
    
    customColors.forEach(c => {
        const item = document.createElement('div');
        item.className = 'shop-item';
        if (save.playerColor === c.color) {
            item.classList.add('selected');
        }
        
        item.innerHTML = `
            <div class="item-preview" style="background-color: ${c.color};"></div>
            <div class="item-label">${c.name}</div>
        `;
        
        item.style.cursor = 'pointer';
        item.onclick = () => selectColor(c.color);
        
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
        
        if (save.playerShape === s.borderRadius) {
            item.classList.add('selected');
        }
        
        const isOwned = save.ownedShapes && save.ownedShapes.includes(idx);
        
        item.innerHTML = `
            <div class="item-preview" style="background-color: #3498db; border-radius: ${s.borderRadius};"></div>
            <div class="item-label">${s.name}</div>
            <div class="item-price">${isOwned ? '✓ Owned' : '100 💰'}</div>
        `;
        
        item.style.cursor = 'pointer';
        item.onclick = () => selectShape(idx, s.borderRadius, isOwned);
        
        shapeShop.appendChild(item);
    });
    
    // Update preview
    if (document.getElementById('shop-player-preview')) {
        document.getElementById('shop-player-preview').style.backgroundColor = save.playerColor;
        document.getElementById('shop-player-preview').style.borderRadius = save.playerShape;
    }
}

function selectColor(color) {
    save.playerColor = color;
    saveGame();
    initCharacterShop();
}

function selectShape(idx, shape, isOwned) {
    if (!isOwned) {
        // Need to buy it
        if (save.coins >= 100) {
            save.coins -= 100;
            if (!save.ownedShapes) {
                save.ownedShapes = [];
            }
            save.ownedShapes.push(idx);
            save.playerShape = shape;
            saveGame();
            updateShopUI();
            initCharacterShop();
            alert('Shape unlocked! 🎉');
        } else {
            alert(`Not enough coins! You need 100 coins but only have ${save.coins}.`);
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