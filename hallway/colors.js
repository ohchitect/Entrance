// colors.js

// Color palette for EACH level (1-100), one unique color per level
const enemyLevelColors = [
    "#e74c3c", // 1: Red
    "#95a5a6", // 2: Grey
    "#f39c12", // 3: Yellow/Orange
    "#3498db", // 4: Blue
    "#9b59b6", // 5: Purple
    "#a0826d", // 6: Brown
    "#1a2c4a", // 7: Navy
    "#2c3e50", // 8: Dark Grey
    "#16a085", // 9: Teal
    "#f1c40f", // 10: Gold
    "#e67e22", // 11: Dark Orange
    "#c0392b", // 12: Dark Red
    "#27ae60", // 13: Green
    "#8e44ad", // 14: Dark Purple
    "#34495e", // 15: Slate
    "#d35400", // 16: Orange
    "#c0392b", // 17: Crimson
    "#16a085", // 18: Dark Teal
    "#2980b9", // 19: Dark Blue
    "#e74c3c", // 20: Red
    "#f39c12", // 21: Yellow
    "#3498db", // 22: Blue
    "#9b59b6", // 23: Purple
    "#1abc9c", // 24: Turquoise
    "#e67e22", // 25: Orange
    "#c0392b", // 26: Dark Red
    "#16a085", // 27: Teal
    "#2980b9", // 28: Navy Blue
    "#d35400", // 29: Dark Orange
    "#f1c40f", // 30: Gold
    "#e74c3c", // 31: Red
    "#95a5a6", // 32: Grey
    "#f39c12", // 33: Yellow
    "#3498db", // 34: Blue
    "#9b59b6", // 35: Purple
    "#a0826d", // 36: Brown
    "#1a2c4a", // 37: Navy
    "#2c3e50", // 38: Dark Grey
    "#16a085", // 39: Teal
    "#f1c40f", // 40: Gold
    "#e67e22", // 41: Dark Orange
    "#c0392b", // 42: Dark Red
    "#27ae60", // 43: Green
    "#8e44ad", // 44: Dark Purple
    "#34495e", // 45: Slate
    "#d35400", // 46: Orange
    "#c0392b", // 47: Crimson
    "#16a085", // 48: Dark Teal
    "#2980b9", // 49: Dark Blue
    "#e74c3c", // 50: Red
    "#f39c12", // 51: Yellow
    "#3498db", // 52: Blue
    "#9b59b6", // 53: Purple
    "#1abc9c", // 54: Turquoise
    "#e67e22", // 55: Orange
    "#c0392b", // 56: Dark Red
    "#16a085", // 57: Teal
    "#2980b9", // 58: Navy Blue
    "#d35400", // 59: Dark Orange
    "#f1c40f", // 60: Gold
    "#e74c3c", // 61: Red
    "#95a5a6", // 62: Grey
    "#f39c12", // 63: Yellow
    "#3498db", // 64: Blue
    "#9b59b6", // 65: Purple
    "#a0826d", // 66: Brown
    "#1a2c4a", // 67: Navy
    "#2c3e50", // 68: Dark Grey
    "#16a085", // 69: Teal
    "#f1c40f", // 70: Gold
    "#e67e22", // 71: Dark Orange
    "#c0392b", // 72: Dark Red
    "#27ae60", // 73: Green
    "#8e44ad", // 74: Dark Purple
    "#34495e", // 75: Slate
    "#d35400", // 76: Orange
    "#c0392b", // 77: Crimson
    "#16a085", // 78: Dark Teal
    "#2980b9", // 79: Dark Blue
    "#e74c3c", // 80: Red
    "#f39c12", // 81: Yellow
    "#3498db", // 82: Blue
    "#9b59b6", // 83: Purple
    "#1abc9c", // 84: Turquoise
    "#e67e22", // 85: Orange
    "#c0392b", // 86: Dark Red
    "#16a085", // 87: Teal
    "#2980b9", // 88: Navy Blue
    "#d35400", // 89: Dark Orange
    "#f1c40f", // 90: Gold
    "#e74c3c", // 91: Red
    "#95a5a6", // 92: Grey
    "#f39c12", // 93: Yellow
    "#3498db", // 94: Blue
    "#9b59b6", // 95: Purple
    "#a0826d", // 96: Brown
    "#1a2c4a", // 97: Navy
    "#2c3e50", // 98: Dark Grey
    "#16a085", // 99: Teal
    "#f1c40f"  // 100: Gold
];

function getEnemyColor(level) {
    return enemyLevelColors[level - 1] || "#e74c3c";
}