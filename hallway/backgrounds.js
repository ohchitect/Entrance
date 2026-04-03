// backgrounds.js — Animated battle arena backgrounds per tier
// Uses SVG SMIL animations (<animate>, <animateTransform>) — no CSS required

function makeBubbles(count, color) {
    let out = '';
    for (let i = 0; i < count; i++) {
        const cx = 20 + Math.floor((i * 73 + 30) % 360);
        const cy = 90 + (i % 3) * 10;
        const r = 3 + (i % 4);
        const dur = (2.5 + (i % 5) * 0.6).toFixed(1);
        const delay = (i * 0.7 % 3).toFixed(1);
        const dx = (i % 2 === 0 ? 6 : -5);
        out += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}" opacity="0">
            <animate attributeName="cy" from="${cy}" to="${cy - 95}" dur="${dur}s" begin="${delay}s" repeatCount="indefinite"/>
            <animate attributeName="cx" values="${cx};${cx + dx};${cx}" dur="${dur}s" begin="${delay}s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0;0.75;0.6;0" keyTimes="0;0.1;0.8;1" dur="${dur}s" begin="${delay}s" repeatCount="indefinite"/>
        </circle>`;
    }
    return out;
}

function makeRain(count, color) {
    let out = '';
    for (let i = 0; i < count; i++) {
        const x = 10 + Math.floor((i * 41 + 7) % 380);
        const yStart = -15 - (i % 40);
        const dur = (0.55 + (i % 6) * 0.07).toFixed(2);
        const delay = (i * 0.13 % 1.8).toFixed(2);
        out += `<line x1="${x}" y1="${yStart}" x2="${x - 2}" y2="${yStart + 18}" stroke="${color}" stroke-width="1.2" opacity="0">
            <animate attributeName="y1" from="${yStart}" to="135" dur="${dur}s" begin="${delay}s" repeatCount="indefinite"/>
            <animate attributeName="y2" from="${yStart + 18}" to="153" dur="${dur}s" begin="${delay}s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0;0.65;0.65;0" keyTimes="0;0.05;0.9;1" dur="${dur}s" begin="${delay}s" repeatCount="indefinite"/>
        </line>`;
    }
    return out;
}

function makeEmbers(count, color) {
    let out = '';
    for (let i = 0; i < count; i++) {
        const cx = 30 + Math.floor((i * 59 + 20) % 340);
        const cy = 100 + (i % 3) * 8;
        const r = 1.5 + (i % 3) * 0.8;
        const dur = (1.8 + (i % 5) * 0.5).toFixed(1);
        const delay = (i * 0.45 % 2.5).toFixed(1);
        const dx = (i % 2 === 0 ? 12 : -10);
        out += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}" opacity="0">
            <animate attributeName="cy" from="${cy}" to="${cy - 100}" dur="${dur}s" begin="${delay}s" repeatCount="indefinite"/>
            <animate attributeName="cx" values="${cx};${cx + dx};${cx + dx * 1.5}" dur="${dur}s" begin="${delay}s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0;0.9;0.6;0" keyTimes="0;0.08;0.7;1" dur="${dur}s" begin="${delay}s" repeatCount="indefinite"/>
            <animate attributeName="r" values="${r};${r * 0.6};0" dur="${dur}s" begin="${delay}s" repeatCount="indefinite"/>
        </circle>`;
    }
    return out;
}

function makeSnow(count, color) {
    let out = '';
    for (let i = 0; i < count; i++) {
        const cx = 5 + Math.floor((i * 53 + 11) % 390);
        const dur = (2.5 + (i % 5) * 0.55).toFixed(1);
        const delay = (i * 0.38 % 3).toFixed(1);
        const r = 1.5 + (i % 3) * 0.7;
        const dx = (i % 2 === 0 ? 15 : -12);
        out += `<circle cx="${cx}" cy="-5" r="${r}" fill="${color}" opacity="0">
            <animate attributeName="cy" from="-5" to="135" dur="${dur}s" begin="${delay}s" repeatCount="indefinite"/>
            <animate attributeName="cx" values="${cx};${cx + dx};${cx + dx * 0.5}" dur="${dur}s" begin="${delay}s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0;0.8;0.7;0" keyTimes="0;0.1;0.85;1" dur="${dur}s" begin="${delay}s" repeatCount="indefinite"/>
        </circle>`;
    }
    return out;
}

function makeSand(count, color) {
    let out = '';
    for (let i = 0; i < count; i++) {
        const y = 60 + (i % 5) * 12;
        const dur = (0.9 + (i % 4) * 0.3).toFixed(1);
        const delay = (i * 0.22 % 1.5).toFixed(1);
        const r = 1 + (i % 3) * 0.5;
        out += `<circle cx="-5" cy="${y}" r="${r}" fill="${color}" opacity="0">
            <animate attributeName="cx" from="-5" to="410" dur="${dur}s" begin="${delay}s" repeatCount="indefinite"/>
            <animate attributeName="cy" values="${y};${y - 6};${y + 4};${y}" dur="${dur}s" begin="${delay}s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0;0.7;0.6;0" keyTimes="0;0.05;0.9;1" dur="${dur}s" begin="${delay}s" repeatCount="indefinite"/>
        </circle>`;
    }
    return out;
}

function makeSparkles(count, color) {
    let out = '';
    for (let i = 0; i < count; i++) {
        const cx = 15 + Math.floor((i * 67 + 30) % 370);
        const cy = 10 + Math.floor((i * 43 + 15) % 100);
        const dur = (1.2 + (i % 5) * 0.4).toFixed(1);
        const delay = (i * 0.55 % 3.5).toFixed(1);
        const r = 1 + (i % 3) * 0.6;
        out += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}">
            <animate attributeName="opacity" values="0;1;0" dur="${dur}s" begin="${delay}s" repeatCount="indefinite"/>
            <animate attributeName="r" values="${r};${r * 1.8};${r}" dur="${dur}s" begin="${delay}s" repeatCount="indefinite"/>
        </circle>`;
    }
    return out;
}

function makeFireflies(count) {
    let out = '';
    for (let i = 0; i < count; i++) {
        const cx = 20 + Math.floor((i * 71 + 25) % 360);
        const cy = 15 + Math.floor((i * 47 + 20) % 90);
        const dur = (2 + (i % 4) * 0.7).toFixed(1);
        const delay = (i * 0.6 % 3).toFixed(1);
        const dx = (i % 2 === 0 ? 18 : -14);
        const dy = (i % 3 === 0 ? -12 : 10);
        out += `<circle cx="${cx}" cy="${cy}" r="2" fill="rgba(255,255,100,0.9)">
            <animate attributeName="opacity" values="0;0.9;0.2;0.8;0" dur="${dur}s" begin="${delay}s" repeatCount="indefinite"/>
            <animate attributeName="cx" values="${cx};${cx + dx};${cx}" dur="${dur}s" begin="${delay}s" repeatCount="indefinite"/>
            <animate attributeName="cy" values="${cy};${cy + dy};${cy}" dur="${dur}s" begin="${delay}s" repeatCount="indefinite"/>
        </circle>`;
    }
    return out;
}

function makeDrips(count, color) {
    let out = '';
    for (let i = 0; i < count; i++) {
        const x = 20 + Math.floor((i * 61 + 15) % 360);
        const dur = (1.4 + (i % 4) * 0.4).toFixed(1);
        const delay = (i * 0.5 % 2.5).toFixed(1);
        out += `<circle cx="${x}" cy="-4" r="2.5" fill="${color}" opacity="0">
            <animate attributeName="cy" from="-4" to="130" dur="${dur}s" begin="${delay}s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0;0.8;0.7;0" keyTimes="0;0.05;0.85;1" dur="${dur}s" begin="${delay}s" repeatCount="indefinite"/>
            <animate attributeName="r" values="2.5;2;1.5;1" dur="${dur}s" begin="${delay}s" repeatCount="indefinite"/>
        </circle>`;
    }
    return out;
}

const tierBackgrounds = [
    // Tier 0: Slime — swamp, rising bubbles
    {
        gradient: 'linear-gradient(180deg, #c8e6c0 0%, #a5d6a7 60%, #66bb6a 100%)',
        svgScene: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 400 130" preserveAspectRatio="xMidYMid slice">
            <ellipse cx="200" cy="122" rx="200" ry="12" fill="rgba(27,94,32,0.3)"/>
            <rect x="0" y="110" width="400" height="20" fill="rgba(56,142,60,0.35)" rx="3"/>
            ${makeBubbles(10, 'rgba(165,214,167,0.8)')}
            ${makeBubbles(6, 'rgba(200,230,200,0.6)')}
        </svg>`
    },
    // Tier 1: Goblin — dark forest, fireflies drifting
    {
        gradient: 'linear-gradient(180deg, #1b2f1b 0%, #2e4a2e 55%, #1a3a1a 100%)',
        svgScene: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 400 130" preserveAspectRatio="xMidYMid slice">
            <rect x="28" y="35" width="11" height="90" fill="rgba(12,25,12,0.9)" rx="3"/>
            <ellipse cx="33" cy="38" rx="22" ry="26" fill="rgba(18,45,18,0.8)"/>
            <rect x="78" y="52" width="8" height="72" fill="rgba(12,25,12,0.9)" rx="2"/>
            <ellipse cx="82" cy="55" rx="17" ry="20" fill="rgba(18,45,18,0.75)"/>
            <rect x="328" y="42" width="11" height="82" fill="rgba(12,25,12,0.9)" rx="3"/>
            <ellipse cx="333" cy="45" rx="20" ry="24" fill="rgba(18,45,18,0.8)"/>
            <rect x="368" y="58" width="8" height="68" fill="rgba(12,25,12,0.9)" rx="2"/>
            <ellipse cx="372" cy="61" rx="15" ry="18" fill="rgba(18,45,18,0.7)"/>
            <rect x="0" y="112" width="400" height="18" fill="rgba(8,20,8,0.65)" rx="3"/>
            ${makeFireflies(14)}
        </svg>`
    },
    // Tier 2: Orc — cave, dripping water
    {
        gradient: 'linear-gradient(180deg, #3e2a1a 0%, #5c3d25 55%, #2e1e0e 100%)',
        svgScene: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 400 130" preserveAspectRatio="xMidYMid slice">
            <polygon points="18,130 33,75 48,130" fill="rgba(55,35,15,0.75)"/>
            <polygon points="52,130 65,70 78,130" fill="rgba(60,40,20,0.7)"/>
            <polygon points="320,130 333,78 346,130" fill="rgba(55,35,15,0.75)"/>
            <polygon points="352,130 365,72 378,130" fill="rgba(60,40,20,0.7)"/>
            <polygon points="158,0 168,38 178,0" fill="rgba(48,28,8,0.55)"/>
            <polygon points="228,0 238,42 248,0" fill="rgba(48,28,8,0.55)"/>
            <rect x="0" y="115" width="400" height="15" fill="rgba(28,14,4,0.55)" rx="2"/>
            ${makeDrips(12, 'rgba(120,180,220,0.75)')}
        </svg>`
    },
    // Tier 3: Troll — mountains, falling snow
    {
        gradient: 'linear-gradient(180deg, #2d1b4e 0%, #4a2d6e 55%, #3b1f5c 100%)',
        svgScene: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 400 130" preserveAspectRatio="xMidYMid slice">
            <polygon points="0,130 60,48 120,130" fill="rgba(75,38,115,0.5)"/>
            <polygon points="80,130 160,28 240,130" fill="rgba(85,48,125,0.45)"/>
            <polygon points="200,130 278,38 356,130" fill="rgba(75,38,115,0.5)"/>
            <polygon points="295,130 358,52 420,130" fill="rgba(68,32,108,0.45)"/>
            <rect x="0" y="114" width="400" height="16" fill="rgba(28,8,58,0.5)" rx="3"/>
            ${makeSnow(20, 'rgba(230,230,255,0.85)')}
        </svg>`
    },
    // Tier 4: Bandit — desert, blowing sand
    {
        gradient: 'linear-gradient(180deg, #8b3a00 0%, #c0622a 55%, #7a3000 100%)',
        svgScene: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 400 130" preserveAspectRatio="xMidYMid slice">
            <ellipse cx="200" cy="12" rx="58" ry="18" fill="rgba(255,175,55,0.28)"/>
            <polygon points="0,130 48,88 96,130" fill="rgba(145,75,18,0.5)"/>
            <polygon points="292,130 338,86 384,130" fill="rgba(145,75,18,0.5)"/>
            <rect x="118" y="74" width="5" height="56" fill="rgba(95,50,8,0.6)" rx="2"/>
            <ellipse cx="120" cy="66" rx="13" ry="18" fill="rgba(75,40,4,0.5)"/>
            <rect x="268" y="78" width="4" height="52" fill="rgba(95,50,8,0.6)" rx="2"/>
            <ellipse cx="270" cy="71" rx="11" ry="16" fill="rgba(75,40,4,0.5)"/>
            <rect x="0" y="115" width="400" height="15" fill="rgba(95,40,4,0.5)" rx="2"/>
            ${makeSand(22, 'rgba(245,200,120,0.7)')}
        </svg>`
    },
    // Tier 5: Golem — volcano, rising embers
    {
        gradient: 'linear-gradient(180deg, #1a0a00 0%, #3d1400 55%, #200800 100%)',
        svgScene: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 400 130" preserveAspectRatio="xMidYMid slice">
            <ellipse cx="55" cy="120" rx="52" ry="10" fill="rgba(255,75,0,0.4)"/>
            <ellipse cx="345" cy="118" rx="48" ry="9" fill="rgba(255,75,0,0.35)"/>
            <ellipse cx="200" cy="122" rx="78" ry="8" fill="rgba(255,115,0,0.28)"/>
            <polygon points="0,130 28,92 56,130" fill="rgba(38,12,0,0.85)"/>
            <polygon points="48,130 76,88 104,130" fill="rgba(32,10,0,0.85)"/>
            <polygon points="298,130 326,90 354,130" fill="rgba(38,12,0,0.85)"/>
            <polygon points="348,130 372,94 396,130" fill="rgba(32,10,0,0.85)"/>
            ${makeEmbers(16, 'rgba(255,140,20,0.9)')}
            ${makeEmbers(8, 'rgba(255,80,0,0.8)')}
        </svg>`
    },
    // Tier 6: Dark Knight — castle, falling rain
    {
        gradient: 'linear-gradient(180deg, #0d0d1a 0%, #1a1a2e 55%, #0d0d1a 100%)',
        svgScene: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 400 130" preserveAspectRatio="xMidYMid slice">
            <rect x="162" y="22" width="76" height="88" fill="rgba(14,14,32,0.85)" rx="2"/>
            <rect x="176" y="12" width="15" height="24" fill="rgba(14,14,32,0.9)" rx="1"/>
            <rect x="209" y="12" width="15" height="24" fill="rgba(14,14,32,0.9)" rx="1"/>
            <rect x="179" y="56" width="13" height="18" fill="rgba(75,75,175,0.22)" rx="2"/>
            <rect x="208" y="56" width="13" height="18" fill="rgba(75,75,175,0.22)" rx="2"/>
            <rect x="0" y="112" width="400" height="18" fill="rgba(7,7,18,0.6)" rx="3"/>
            ${makeRain(35, 'rgba(160,170,220,0.7)')}
        </svg>`
    },
    // Tier 7: Dragon — sky, drifting clouds
    {
        gradient: 'linear-gradient(180deg, #0d2b6e 0%, #1a4db5 55%, #0a3580 100%)',
        svgScene: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 400 130" preserveAspectRatio="xMidYMid slice">
            <g opacity="0.18">
                <ellipse cx="70" cy="42" rx="52" ry="20" fill="white"/>
                <ellipse cx="90" cy="38" rx="38" ry="15" fill="white"/>
                <animateTransform attributeName="transform" type="translate" values="0,0;30,2;0,0" dur="8s" repeatCount="indefinite"/>
            </g>
            <g opacity="0.14">
                <ellipse cx="310" cy="32" rx="62" ry="18" fill="white"/>
                <ellipse cx="330" cy="28" rx="42" ry="14" fill="white"/>
                <animateTransform attributeName="transform" type="translate" values="0,0;-25,3;0,0" dur="11s" repeatCount="indefinite"/>
            </g>
            <g opacity="0.11">
                <ellipse cx="185" cy="68" rx="44" ry="16" fill="white"/>
                <animateTransform attributeName="transform" type="translate" values="0,0;20,-2;0,0" dur="14s" repeatCount="indefinite"/>
            </g>
            <circle cx="200" cy="16" r="11" fill="rgba(255,220,50,0.22)"/>
            <circle cx="200" cy="16" r="6" fill="rgba(255,220,50,0.18)"/>
            <rect x="0" y="112" width="400" height="18" fill="rgba(5,18,68,0.45)" rx="3"/>
        </svg>`
    },
    // Tier 8: Demon — hellfire, rising flame particles
    {
        gradient: 'linear-gradient(180deg, #1a0000 0%, #4a0000 55%, #200000 100%)',
        svgScene: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 400 130" preserveAspectRatio="xMidYMid slice">
            <path d="M0,130 Q18,92 28,108 Q38,82 48,103 Q58,72 68,98 Q78,78 88,130 Z" fill="rgba(195,28,0,0.5)"/>
            <path d="M48,130 Q66,86 76,106 Q86,76 96,98 Q106,68 116,94 Q126,76 136,130 Z" fill="rgba(215,48,0,0.42)"/>
            <path d="M280,130 Q298,88 308,106 Q318,78 328,98 Q338,70 348,96 Q358,80 368,130 Z" fill="rgba(195,28,0,0.5)"/>
            <path d="M330,130 Q348,86 358,104 Q368,76 378,98 Q388,73 400,130 Z" fill="rgba(215,48,0,0.42)"/>
            <ellipse cx="200" cy="116" rx="155" ry="12" fill="rgba(175,18,0,0.38)"/>
            ${makeEmbers(18, 'rgba(255,100,20,0.95)')}
            ${makeEmbers(10, 'rgba(255,50,0,0.85)')}
        </svg>`
    },
    // Tier 9: Titan — deep space, twinkling stars + drifting particles
    {
        gradient: 'linear-gradient(180deg, #000010 0%, #0a0a2e 55%, #050515 100%)',
        svgScene: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 400 130" preserveAspectRatio="xMidYMid slice">
            ${makeSparkles(22, 'rgba(255,255,255,0.9)')}
            ${makeSparkles(10, 'rgba(180,160,255,0.8)')}
            ${makeSparkles(8, 'rgba(160,200,255,0.75)')}
            <ellipse cx="200" cy="65" rx="88" ry="20" fill="rgba(95,75,255,0.07)"/>
            <circle cx="200" cy="65" r="27" fill="rgba(115,95,255,0.06)"/>
            <rect x="0" y="113" width="400" height="17" fill="rgba(0,0,18,0.55)" rx="3"/>
        </svg>`
    }
];

function applyBattleBackground(tierIndex) {
    const arena = document.getElementById('arena');
    if (!arena) return;
    const bg = tierBackgrounds[Math.min(tierIndex, tierBackgrounds.length - 1)];
    if (!bg) return;

    const old = arena.querySelector('.arena-bg');
    if (old) old.remove();

    arena.style.background = bg.gradient;

    const wrapper = document.createElement('div');
    wrapper.className = 'arena-bg';
    wrapper.style.cssText = 'position:absolute;inset:0;pointer-events:none;overflow:hidden;border-radius:inherit;z-index:0;';
    wrapper.innerHTML = bg.svgScene;
    arena.insertBefore(wrapper, arena.firstChild);

    arena.querySelectorAll('.entity-container').forEach(el => {
        el.style.position = 'relative';
        el.style.zIndex = '1';
    });
}
