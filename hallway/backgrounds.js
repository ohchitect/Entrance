// backgrounds.js — Battle arena backgrounds per tier
// Each entry: { gradient, svgScene }
// svgScene is injected as an absolute-positioned SVG behind the characters

const tierBackgrounds = [
    // Tier 0: Slime — swamp bog, green mist, bubbles
    {
        gradient: 'linear-gradient(180deg, #c8e6c0 0%, #a5d6a7 60%, #81c784 100%)',
        svgScene: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 400 130" preserveAspectRatio="xMidYMid slice">
            <ellipse cx="60" cy="110" rx="80" ry="18" fill="rgba(56,142,60,0.25)"/>
            <ellipse cx="300" cy="115" rx="100" ry="16" fill="rgba(56,142,60,0.2)"/>
            <circle cx="80" cy="95" r="6" fill="rgba(129,199,132,0.5)" stroke="rgba(56,142,60,0.4)" stroke-width="1"/>
            <circle cx="160" cy="100" r="4" fill="rgba(129,199,132,0.5)" stroke="rgba(56,142,60,0.4)" stroke-width="1"/>
            <circle cx="310" cy="98" r="5" fill="rgba(129,199,132,0.5)" stroke="rgba(56,142,60,0.4)" stroke-width="1"/>
            <circle cx="360" cy="105" r="3" fill="rgba(129,199,132,0.5)" stroke="rgba(56,142,60,0.4)" stroke-width="1"/>
            <ellipse cx="200" cy="118" rx="160" ry="12" fill="rgba(27,94,32,0.15)"/>
            <rect x="0" y="108" width="400" height="22" fill="rgba(56,142,60,0.3)" rx="4"/>
        </svg>`
    },
    // Tier 1: Goblin — dark forest, trees, eerie glow
    {
        gradient: 'linear-gradient(180deg, #1b2f1b 0%, #2e4a2e 50%, #1a3a1a 100%)',
        svgScene: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 400 130" preserveAspectRatio="xMidYMid slice">
            <rect x="30" y="30" width="12" height="90" fill="rgba(15,30,15,0.8)" rx="3"/>
            <ellipse cx="36" cy="35" rx="24" ry="28" fill="rgba(20,50,20,0.7)"/>
            <rect x="80" y="50" width="9" height="70" fill="rgba(15,30,15,0.8)" rx="2"/>
            <ellipse cx="84" cy="54" rx="18" ry="22" fill="rgba(20,50,20,0.65)"/>
            <rect x="330" y="40" width="12" height="80" fill="rgba(15,30,15,0.8)" rx="3"/>
            <ellipse cx="336" cy="44" rx="22" ry="26" fill="rgba(20,50,20,0.7)"/>
            <rect x="370" y="55" width="8" height="65" fill="rgba(15,30,15,0.8)" rx="2"/>
            <ellipse cx="374" cy="58" rx="16" ry="20" fill="rgba(20,50,20,0.65)"/>
            <circle cx="200" cy="60" r="18" fill="rgba(255,200,50,0.06)"/>
            <circle cx="200" cy="60" r="10" fill="rgba(255,200,50,0.08)"/>
            <rect x="0" y="112" width="400" height="18" fill="rgba(10,25,10,0.6)" rx="3"/>
        </svg>`
    },
    // Tier 2: Orc — rocky cave, stalagmites
    {
        gradient: 'linear-gradient(180deg, #3e2a1a 0%, #5c3d25 50%, #2e1e0e 100%)',
        svgScene: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 400 130" preserveAspectRatio="xMidYMid slice">
            <polygon points="20,130 35,80 50,130" fill="rgba(60,40,20,0.7)"/>
            <polygon points="55,130 68,75 81,130" fill="rgba(55,35,15,0.75)"/>
            <polygon points="320,130 335,85 350,130" fill="rgba(60,40,20,0.7)"/>
            <polygon points="355,130 368,78 381,130" fill="rgba(55,35,15,0.75)"/>
            <polygon points="160,0 170,40 180,0" fill="rgba(50,30,10,0.5)"/>
            <polygon points="230,0 240,45 250,0" fill="rgba(50,30,10,0.5)"/>
            <ellipse cx="200" cy="65" rx="60" ry="10" fill="rgba(200,120,50,0.08)"/>
            <rect x="0" y="115" width="400" height="15" fill="rgba(30,15,5,0.55)" rx="2"/>
        </svg>`
    },
    // Tier 3: Troll — misty mountains, purple sky
    {
        gradient: 'linear-gradient(180deg, #2d1b4e 0%, #4a2d6e 50%, #3b1f5c 100%)',
        svgScene: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 400 130" preserveAspectRatio="xMidYMid slice">
            <polygon points="0,130 60,50 120,130" fill="rgba(80,40,120,0.5)"/>
            <polygon points="80,130 160,30 240,130" fill="rgba(90,50,130,0.45)"/>
            <polygon points="200,130 280,40 360,130" fill="rgba(80,40,120,0.5)"/>
            <polygon points="300,130 360,55 420,130" fill="rgba(70,35,110,0.45)"/>
            <ellipse cx="200" cy="80" rx="200" ry="25" fill="rgba(180,140,255,0.07)"/>
            <circle cx="100" cy="25" r="3" fill="rgba(255,255,200,0.7)"/>
            <circle cx="250" cy="15" r="2" fill="rgba(255,255,200,0.7)"/>
            <circle cx="340" cy="30" r="2.5" fill="rgba(255,255,200,0.6)"/>
            <circle cx="50" cy="40" r="2" fill="rgba(255,255,200,0.5)"/>
            <rect x="0" y="114" width="400" height="16" fill="rgba(30,10,60,0.5)" rx="3"/>
        </svg>`
    },
    // Tier 4: Bandit — dusty desert, sunset orange
    {
        gradient: 'linear-gradient(180deg, #8b3a00 0%, #c0622a 50%, #7a3000 100%)',
        svgScene: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 400 130" preserveAspectRatio="xMidYMid slice">
            <ellipse cx="200" cy="10" rx="60" ry="20" fill="rgba(255,180,60,0.3)"/>
            <polygon points="0,130 50,90 100,130" fill="rgba(150,80,20,0.5)"/>
            <polygon points="290,130 340,88 390,130" fill="rgba(150,80,20,0.5)"/>
            <rect x="120" y="75" width="6" height="55" fill="rgba(100,55,10,0.6)" rx="2"/>
            <ellipse cx="123" cy="68" rx="14" ry="20" fill="rgba(80,45,5,0.5)"/>
            <rect x="270" y="80" width="5" height="50" fill="rgba(100,55,10,0.6)" rx="2"/>
            <ellipse cx="272" cy="73" rx="12" ry="18" fill="rgba(80,45,5,0.5)"/>
            <ellipse cx="200" cy="120" rx="180" ry="10" fill="rgba(180,90,20,0.35)"/>
            <rect x="0" y="115" width="400" height="15" fill="rgba(100,45,5,0.5)" rx="2"/>
        </svg>`
    },
    // Tier 5: Golem — volcanic lava, dark rock
    {
        gradient: 'linear-gradient(180deg, #1a0a00 0%, #3d1400 55%, #200800 100%)',
        svgScene: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 400 130" preserveAspectRatio="xMidYMid slice">
            <ellipse cx="60" cy="120" rx="55" ry="10" fill="rgba(255,80,0,0.35)"/>
            <ellipse cx="340" cy="118" rx="50" ry="9" fill="rgba(255,80,0,0.3)"/>
            <ellipse cx="200" cy="122" rx="80" ry="8" fill="rgba(255,120,0,0.25)"/>
            <polygon points="0,130 30,95 60,130" fill="rgba(40,15,0,0.8)"/>
            <polygon points="50,130 80,90 110,130" fill="rgba(35,12,0,0.8)"/>
            <polygon points="300,130 330,92 360,130" fill="rgba(40,15,0,0.8)"/>
            <polygon points="350,130 375,95 400,130" fill="rgba(35,12,0,0.8)"/>
            <circle cx="100" cy="108" r="4" fill="rgba(255,140,0,0.5)"/>
            <circle cx="300" cy="110" r="3" fill="rgba(255,100,0,0.5)"/>
            <circle cx="220" cy="106" r="2.5" fill="rgba(255,160,0,0.45)"/>
        </svg>`
    },
    // Tier 6: Dark Knight — ominous castle, lightning
    {
        gradient: 'linear-gradient(180deg, #0d0d1a 0%, #1a1a2e 55%, #0d0d1a 100%)',
        svgScene: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 400 130" preserveAspectRatio="xMidYMid slice">
            <rect x="160" y="20" width="80" height="90" fill="rgba(15,15,35,0.8)" rx="2"/>
            <rect x="175" y="10" width="16" height="25" fill="rgba(15,15,35,0.85)" rx="1"/>
            <rect x="209" y="10" width="16" height="25" fill="rgba(15,15,35,0.85)" rx="1"/>
            <rect x="178" y="55" width="14" height="20" fill="rgba(80,80,180,0.2)" rx="2"/>
            <rect x="208" y="55" width="14" height="20" fill="rgba(80,80,180,0.2)" rx="2"/>
            <polyline points="80,0 90,35 82,35 95,65" stroke="rgba(200,200,255,0.6)" stroke-width="2" fill="none"/>
            <polyline points="310,5 318,38 312,38 322,68" stroke="rgba(200,200,255,0.5)" stroke-width="1.5" fill="none"/>
            <rect x="0" y="110" width="400" height="20" fill="rgba(8,8,20,0.6)" rx="3"/>
            <circle cx="60" cy="30" r="2" fill="rgba(180,180,255,0.5)"/>
            <circle cx="340" cy="20" r="1.5" fill="rgba(180,180,255,0.5)"/>
        </svg>`
    },
    // Tier 7: Dragon — sky battle, clouds, blue/gold sky
    {
        gradient: 'linear-gradient(180deg, #0d2b6e 0%, #1a4db5 50%, #0a3580 100%)',
        svgScene: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 400 130" preserveAspectRatio="xMidYMid slice">
            <ellipse cx="60" cy="45" rx="55" ry="22" fill="rgba(255,255,255,0.12)"/>
            <ellipse cx="80" cy="42" rx="40" ry="17" fill="rgba(255,255,255,0.1)"/>
            <ellipse cx="300" cy="35" rx="65" ry="20" fill="rgba(255,255,255,0.1)"/>
            <ellipse cx="320" cy="32" rx="45" ry="15" fill="rgba(255,255,255,0.08)"/>
            <ellipse cx="180" cy="70" rx="45" ry="18" fill="rgba(255,255,255,0.07)"/>
            <circle cx="200" cy="15" r="12" fill="rgba(255,220,50,0.2)"/>
            <circle cx="200" cy="15" r="7" fill="rgba(255,220,50,0.15)"/>
            <rect x="0" y="112" width="400" height="18" fill="rgba(5,20,70,0.45)" rx="3"/>
        </svg>`
    },
    // Tier 8: Demon — hellfire, red/black, flames
    {
        gradient: 'linear-gradient(180deg, #1a0000 0%, #4a0000 50%, #200000 100%)',
        svgScene: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 400 130" preserveAspectRatio="xMidYMid slice">
            <path d="M0,130 Q20,95 30,110 Q40,85 50,105 Q60,75 70,100 Q80,80 90,130 Z" fill="rgba(200,30,0,0.45)"/>
            <path d="M50,130 Q70,88 80,108 Q90,78 100,100 Q110,70 120,95 Q130,78 140,130 Z" fill="rgba(220,50,0,0.4)"/>
            <path d="M280,130 Q300,90 310,108 Q320,80 330,100 Q340,72 350,98 Q360,82 370,130 Z" fill="rgba(200,30,0,0.45)"/>
            <path d="M330,130 Q350,88 360,105 Q370,78 380,100 Q390,75 400,130 Z" fill="rgba(220,50,0,0.4)"/>
            <ellipse cx="200" cy="115" rx="160" ry="12" fill="rgba(180,20,0,0.35)"/>
            <circle cx="200" cy="55" r="20" fill="rgba(255,60,0,0.08)"/>
            <circle cx="200" cy="55" r="10" fill="rgba(255,80,0,0.1)"/>
        </svg>`
    },
    // Tier 9: Titan — celestial space, stars, cosmic
    {
        gradient: 'linear-gradient(180deg, #000010 0%, #0a0a2e 50%, #050515 100%)',
        svgScene: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 400 130" preserveAspectRatio="xMidYMid slice">
            <circle cx="30" cy="20" r="1.5" fill="rgba(255,255,255,0.9)"/>
            <circle cx="70" cy="10" r="1" fill="rgba(255,255,255,0.8)"/>
            <circle cx="120" cy="25" r="2" fill="rgba(255,255,255,0.85)"/>
            <circle cx="170" cy="8" r="1" fill="rgba(255,255,255,0.75)"/>
            <circle cx="220" cy="18" r="1.5" fill="rgba(255,255,255,0.9)"/>
            <circle cx="280" cy="12" r="1" fill="rgba(255,255,255,0.8)"/>
            <circle cx="330" cy="22" r="2" fill="rgba(255,255,255,0.85)"/>
            <circle cx="380" cy="9" r="1.5" fill="rgba(255,255,255,0.75)"/>
            <circle cx="50" cy="50" r="1" fill="rgba(200,180,255,0.7)"/>
            <circle cx="150" cy="45" r="1.5" fill="rgba(180,200,255,0.65)"/>
            <circle cx="260" cy="40" r="1" fill="rgba(200,180,255,0.7)"/>
            <circle cx="360" cy="48" r="1.5" fill="rgba(180,200,255,0.65)"/>
            <ellipse cx="200" cy="65" rx="90" ry="20" fill="rgba(100,80,255,0.07)"/>
            <circle cx="200" cy="65" r="28" fill="rgba(120,100,255,0.06)"/>
            <circle cx="200" cy="65" r="15" fill="rgba(140,120,255,0.08)"/>
            <rect x="0" y="113" width="400" height="17" fill="rgba(0,0,20,0.55)" rx="3"/>
        </svg>`
    }
];

function applyBattleBackground(tierIndex) {
    const arena = document.getElementById('arena');
    if (!arena) return;

    const bg = tierBackgrounds[Math.min(tierIndex, tierBackgrounds.length - 1)];
    if (!bg) return;

    // Remove old scene
    const old = arena.querySelector('.arena-bg');
    if (old) old.remove();

    // Apply gradient
    arena.style.background = bg.gradient;

    // Inject SVG scene behind characters
    const wrapper = document.createElement('div');
    wrapper.className = 'arena-bg';
    wrapper.style.cssText = 'position:absolute;inset:0;pointer-events:none;overflow:hidden;border-radius:inherit;z-index:0;';
    wrapper.innerHTML = bg.svgScene;
    arena.insertBefore(wrapper, arena.firstChild);

    // Ensure entity-containers are above background
    arena.querySelectorAll('.entity-container').forEach(el => {
        el.style.position = 'relative';
        el.style.zIndex = '1';
    });
}
