// Clock
function updateTime() {
    const now = new Date();
    document.getElementById('time').textContent = now.toLocaleTimeString('en-GB', {hour: '2-digit', minute:'2-digit', second: '2-digit'});
    document.getElementById('date').textContent = now.toLocaleDateString('en-GB', {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'});
}
setInterval(updateTime, 1000);
updateTime();

// Popup logic
const aboutBtn = document.getElementById('aboutBtn');
const popupOverlay = document.getElementById('popupOverlay');
aboutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    popupOverlay.classList.add('active');
});
popupOverlay.addEventListener('click', (e) => {
    if (e.target === popupOverlay) popupOverlay.classList.remove('active');
});

// Adult launcher
const adultLauncherBtn = document.getElementById('adultLauncherBtn');
const adultPopupOverlay = document.getElementById('adultPopupOverlay');
adultLauncherBtn.addEventListener('click', () => {
    adultPopupOverlay.classList.add('active');
});
adultPopupOverlay.addEventListener('click', (e) => {
    if (e.target === adultPopupOverlay) adultPopupOverlay.classList.remove('active');
});

// Streams launcher
const streamsLauncherBtn = document.getElementById('streamsLauncherBtn');
const streamsPopupOverlay = document.getElementById('streamsPopupOverlay');
streamsLauncherBtn.addEventListener('click', () => {
    streamsPopupOverlay.classList.add('active');
});
streamsPopupOverlay.addEventListener('click', (e) => {
    if (e.target === streamsPopupOverlay) streamsPopupOverlay.classList.remove('active');
});

// Games launcher
const gamesLauncherBtn = document.getElementById('gamesLauncherBtn');
const gamesPopupOverlay = document.getElementById('gamesPopupOverlay');
gamesLauncherBtn.addEventListener('click', () => {
    gamesPopupOverlay.classList.add('active');
});
gamesPopupOverlay.addEventListener('click', (e) => {
    if (e.target === gamesPopupOverlay) gamesPopupOverlay.classList.remove('active');
});

// --- Drag-to-scroll functionality on .main-scroll-area ---
const mainScrollArea = document.querySelector('.main-scroll-area');

let isDragging = false;
let startX, startY;
let scrollLeft, scrollTop;

mainScrollArea.addEventListener('mousedown', (e) => {
    // Only if LMB
    if (e.button !== 0) return;
    isDragging = true;
    mainScrollArea.classList.add('dragscrolling');
    startX = e.pageX - mainScrollArea.offsetLeft;
    startY = e.pageY - mainScrollArea.offsetTop;
    scrollLeft = mainScrollArea.scrollLeft;
    scrollTop = mainScrollArea.scrollTop;
    // Prevent text selection
    document.body.style.userSelect = 'none';
});

mainScrollArea.addEventListener('mouseleave', () => {
    isDragging = false;
    mainScrollArea.classList.remove('dragscrolling');
    document.body.style.userSelect = '';
});

mainScrollArea.addEventListener('mouseup', () => {
    isDragging = false;
    mainScrollArea.classList.remove('dragscrolling');
    document.body.style.userSelect = '';
});

mainScrollArea.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - mainScrollArea.offsetLeft;
    const y = e.pageY - mainScrollArea.offsetTop;
    const walkX = (startX - x);
    // Further increase scroll speed for Y to allow more area scroll on GitHub Pages/mobile
    const walkY = (startY - y) * 4; // Stronger multiplier for GitHub compatibility
    mainScrollArea.scrollLeft = scrollLeft + walkX;
    mainScrollArea.scrollTop = scrollTop + walkY;
});

// Touch support
let touchStartX = 0, touchStartY = 0, touchScrollLeft = 0, touchScrollTop = 0, touchDragging = false;
mainScrollArea.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1) return;
    touchDragging = true;
    mainScrollArea.classList.add('dragscrolling');
    touchStartX = e.touches[0].pageX;
    touchStartY = e.touches[0].pageY;
    touchScrollLeft = mainScrollArea.scrollLeft;
    touchScrollTop = mainScrollArea.scrollTop;
},{passive:false});

mainScrollArea.addEventListener('touchmove', (e) => {
    if (!touchDragging) return;
    if (e.touches.length !== 1) return;
    e.preventDefault();
    const x = e.touches[0].pageX;
    const y = e.touches[0].pageY;
    mainScrollArea.scrollLeft = touchScrollLeft + (touchStartX - x);
    // Stronger multiplier for vertical scroll (GitHub/mobile usability)
    mainScrollArea.scrollTop = touchScrollTop + ((touchStartY - y) * 4);
},{passive:false});

mainScrollArea.addEventListener('touchend', () => {
    touchDragging = false;
    mainScrollArea.classList.remove('dragscrolling');
});