// ==========================================
// 📚 多語言字典與官方題庫
// ==========================================
const appData = {
    zh: {
        subtitle: "Discover, Play & Create Quizzes",
        bannerTitle: "今日精選：動物極限大排序",
        bannerDesc: "挑戰全網同步的每日冷知識排序，登上全球排行榜！",
        startDailyBtn: "▶ 立即挑戰今日任務",
        categoriesTitle: "Quiz Categories",
        customTitle: "🌐 Community Custom Quizzes",
        createNavBtn: "✨ 建立題庫",
        homeBtn: "🏠 大廳",
        rankTitle: "🏆 排行榜",
        datePrefix: "日期：",
        creatorPrefix: "作者：",
        submitBtn: "送出答案 🚀",
        expTitle: "💡 趣味冷知識解析：",
        nicknameLabel: "留下大名登錄排行榜：",
        nicknamePlaceholder: "請輸入您的暱稱 (最多10字)",
        registerBtn: "登記成績",
        shareBtn: "📋 複製戰績分享",
        successMsg: "🎉 恭喜通關！耗時 ",
        failMsg: "❌ 順序不正確！再試一次！",
        successToast: "成績成功登錄排行榜！🎉",
        copyToast: "已複製戰績到剪貼簿！",
        noRank: "尚無通關記錄，快來搶頭香！",
        modalTitle: "✨ 建立你的自訂排序題庫",
        lblSetTitle: "題庫名稱 (Set Title)：",
        lblCreator: "您的名字/作者 (Creator)：",
        lblQText: "題目敘述 (Question)：",
        lblOptions: "選項 (請輸入 4 個選項，順序為【正確解答順序】)：",
        lblExp: "冷知識解析 (Explanation)：",
        btnCancel: "取消",
        btnPublish: "發布題庫 🚀",
        categories: [
            { id: 'science', name: "科學與自然", icon: "🔬", desc: "探索動物、天文與物理世界的奧秘大小事。" },
            { id: 'history', name: "歷史與世界", icon: "🏛️", desc: "回顧改變世界的重大歷史事件與偉人足跡。" },
            { id: 'geography', name: "地理與城市", icon: "🌍", desc: "考驗你對全球城市、河流與地標的熟悉度。" },
            { id: 'popculture', name: "流行與娛樂", icon: "🎬", desc: "電影、音樂與日常生活的趣味冷知識大集合。" }
        ],
        questions: {
            daily: [
                {
                    questionText: "請將以下動物依照「成年體型平均體重」由輕到重排序：",
                    options: [{ text: "家貓 🐱" }, { text: "非洲象 🐘" }, { text: "兔子 🐰" }, { text: "河馬 🦛" }],
                    correctOrder: [2, 0, 3, 1],
                    explanation: "成年兔約 2 公斤，家貓約 4 公斤，河馬達 1.5 噸，非洲象重達 5 噸左右！"
                }
            ],
            science: [
                {
                    questionText: "請將以下太陽系行星依照「距離太陽由近到遠」排序：",
                    options: [{ text: "地球 🌍" }, { text: "水星 ☿" }, { text: "木星 ♃" }, { text: "火星 ♂" }],
                    correctOrder: [1, 0, 3, 2],
                    explanation: "由近至遠依序為：水星、金星、地球、火星、木星、土星、天王星、海王星。"
                }
            ],
            history: [
                {
                    questionText: "請將以下歷史發明或事件按照「發生時間由早到晚」排序：",
                    options: [{ text: "造紙術發明 📜" }, { text: "登陸月球 🌕" }, { text: "第一次世界大戰 ⚔️" }, { text: "蒸汽機發明 🚂" }],
                    correctOrder: [0, 3, 2, 1],
                    explanation: "中國造紙術最早，接著是工業革命蒸汽機、一戰（1914），最後是1969年人類登月。"
                }
            ],
            geography: [
                {
                    questionText: "請將以下知名城市依照「緯度由北到南」排序（最北排最上方）：",
                    options: [{ text: "東京 🗼" }, { text: "倫敦 🇬🇧" }, { text: "新加坡 🇸🇬" }, { text: "台北 🇹🇼" }],
                    correctOrder: [1, 0, 3, 2],
                    explanation: "倫敦緯度最高，其次為東京、台北，新加坡最靠近赤道。"
                }
            ],
            popculture: [
                {
                    questionText: "請將以下日常物品依照「平均價格或體積」由小到大排序：",
                    options: [{ text: "智慧型手機 📱" }, { text: "原子筆 🖊️" }, { text: "筆記型電腦 💻" }, { text: "家用汽車 🚗" }],
                    correctOrder: [1, 0, 2, 3],
                    explanation: "原子筆最便宜輕巧，其次是手機、筆電，體積與價值最高的是家用汽車。"
                }
            ]
        }
    },
    en: {
        subtitle: "Discover, Play & Create Quizzes",
        bannerTitle: "Daily Featured: Animal Weight Challenge",
        bannerDesc: "Take on today's sync trivia challenge. Sort items correctly in record time!",
        startDailyBtn: "▶ Play Today's Challenge",
        categoriesTitle: "Quiz Categories",
        customTitle: "🌐 Community Custom Quizzes",
        createNavBtn: "✨ Create Quiz",
        homeBtn: "🏠 Home",
        rankTitle: "🏆 Leaderboard",
        datePrefix: "Date: ",
        creatorPrefix: "By: ",
        submitBtn: "Submit Answer 🚀",
        expTitle: "💡 Fun Fact Explanation:",
        nicknameLabel: "Leave your name for leaderboard:",
        nicknamePlaceholder: "Enter your nickname (Max 10 chars)",
        registerBtn: "Submit Score",
        shareBtn: "📋 Copy Result",
        successMsg: "🎉 Correct! Time: ",
        failMsg: "❌ Incorrect order! Try again!",
        successToast: "Score successfully uploaded! 🎉",
        copyToast: "Result copied to clipboard!",
        noRank: "No scores yet. Be the first!",
        modalTitle: "✨ Create Your Custom Trivia Set",
        lblSetTitle: "Set Title:",
        lblCreator: "Your Name / Creator:",
        lblQText: "Question Text:",
        lblOptions: "Options (Enter 4 options in correct chronological/logical order):",
        lblExp: "Explanation:",
        btnCancel: "Cancel",
        btnPublish: "Publish Set 🚀",
        categories: [
            { id: 'science', name: "Science & Nature", icon: "🔬", desc: "Explore animals, space, and physics." },
            { id: 'history', name: "History & World", icon: "🏛️", desc: "Review major historical events." },
            { id: 'geography', name: "Geography & Travel", icon: "🌍", desc: "Test your knowledge of world cities." },
            { id: 'popculture', name: "Pop Culture", icon: "🎬", desc: "Fun trivia from movies and daily life." }
        ],
        questions: {
            daily: [
                {
                    questionText: "Sort the following animals by their average adult body weight (Lightest to Heaviest):",
                    options: [{ text: "Domestic Cat 🐱" }, { text: "African Elephant 🐘" }, { text: "Rabbit 🐰" }, { text: "Hippo 🦛" }],
                    correctOrder: [2, 0, 3, 1],
                    explanation: "A rabbit is ~2kg, a cat is ~4kg, a hippo reaches 1.5 tons, and an African elephant weighs around 5 tons!"
                }
            ],
            science: [
                {
                    questionText: "Sort the following solar system planets by their distance from the Sun (Closest to Farthest):",
                    options: [{ text: "Earth 🌍" }, { text: "Mercury ☿" }, { text: "Jupiter ♃" }, { text: "Mars ♂" }],
                    correctOrder: [1, 0, 3, 2],
                    explanation: "The order from closest to farthest: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune."
                }
            ],
            history: [
                {
                    questionText: "Sort the following historical events by chronological order (Earliest to Latest):",
                    options: [{ text: "Invention of Paper 📜" }, { text: "Moon Landing 🌕" }, { text: "World War I ⚔️" }, { text: "Invention of Steam Engine 🚂" }],
                    correctOrder: [0, 3, 2, 1],
                    explanation: "Paper invention was earliest, followed by the steam engine, WWI, and the Moon landing."
                }
            ],
            geography: [
                {
                    questionText: "Sort the following cities by latitude from North to South (Northernmost on top):",
                    options: [{ text: "Tokyo 🗼" }, { text: "London 🇬🇧" }, { text: "Singapore 🇸🇬" }, { text: "台北 🇹🇼" }],
                    correctOrder: [1, 0, 3, 2],
                    explanation: "London is furthest north, followed by Tokyo, Taipei, and Singapore."
                }
            ],
            popculture: [
                {
                    questionText: "Sort the following items by their average value or size (Smallest to Largest):",
                    options: [{ text: "Smartphone 📱" }, { text: "Ballpoint Pen 🖊️" }, { text: "Laptop 💻" }, { text: "Family Car 🚗" }],
                    correctOrder: [1, 0, 2, 3],
                    explanation: "A pen is smallest/cheapest, followed by a phone, laptop, and family car."
                }
            ]
        }
    }
};

let currentLang = 'zh';
let currentCategory = 'daily';
let activeCustomSetId = null; // 如果是玩家自訂題庫

// ==========================================
// 🛠️ SUPABASE 設定
// ==========================================
const SUPABASE_URL = 'https://xqzxtexxjuedzejgsudk.supabase.co'; 
const SUPABASE_KEY = 'sb_publishable_F5FKV-tD7SNjLziE0GXD5Q_R5UX8dYr';
let supabaseClient = null;
try {
    if (SUPABASE_URL.includes('supabase.co')) {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    }
} catch (e) { console.error(e); }

// 遊戲狀態變數
let currentOptions = [];
let startTime = null;
let timerInterval = null;
let elapsedSeconds = 0;
let isGameFinished = false;
let activeQuestion = null;
let todayStr = "";

window.addEventListener('DOMContentLoaded', () => {
    renderHome();
    loadCustomSets();
});

// 切換語言
function switchLanguage(lang) {
    currentLang = lang;
    renderHome();
    loadCustomSets();
    if (!document.getElementById('view-game').classList.contains('hidden')) {
        if (!activeCustomSetId) {
            startCategory(currentCategory);
        }
    }
}

// 渲染首頁大廳
function renderHome() {
    const data = appData[currentLang];
    document.getElementById('ui-subtitle').innerText = data.subtitle;
    document.getElementById('home-banner-title').innerText = data.bannerTitle;
    document.getElementById('home-banner-desc').innerText = data.bannerDesc;
    document.getElementById('ui-categories-title').innerText = data.categoriesTitle;
    document.getElementById('ui-custom-title').innerText = data.customTitle;
    document.getElementById('ui-create-nav-btn').innerText = data.createNavBtn;
    document.getElementById('home-btn').innerText = data.homeBtn;
    
    document.getElementById('home-btn').classList.add('hidden');
    document.getElementById('view-home').classList.remove('hidden');
    document.getElementById('view-game').classList.add('hidden');

    const grid = document.getElementById('category-grid');
    grid.innerHTML = '';
    data.categories.forEach(cat => {
        const card = document.createElement('div');
        card.className = "bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/50 rounded-xl p-4 cursor-pointer transition-all flex flex-col justify-between shadow-md group";
        card.onclick = () => startCategory(cat.id);
        card.innerHTML = `
            <div>
                <div class="text-2xl mb-2">${cat.icon}</div>
                <h4 class="font-bold text-sm text-slate-200 group-hover:text-indigo-400 transition-colors">${cat.name}</h4>
                <p class="text-[11px] text-slate-400 mt-1 leading-relaxed">${cat.desc}</p>
            </div>
            <div class="mt-4 flex items-center text-[11px] font-semibold text-indigo-400">Play Quiz →</div>
        `;
        grid.appendChild(card);
    });
}

function goHome() {
    clearInterval(timerInterval);
    activeCustomSetId = null;
    renderHome();
}

// 開始官方分類遊戲
function startCategory(catId) {
    activeCustomSetId = null;
    currentCategory = catId;
    const data = appData[currentLang];
    const qList = data.questions[catId] || data.questions.daily;
    setupGameSession(qList[0], catId.toUpperCase(), `${data.datePrefix}${new Date().toISOString().split('T')[0]}`);
}

// 開始自訂題庫遊戲
function startCustomSet(setId, title, creator, questionObj) {
    activeCustomSetId = setId;
    const data = appData[currentLang];
    setupGameSession(questionObj, title, `${data.creatorPrefix}${creator}`);
}

// 共用遊戲初始化
function setupGameSession(questionObj, badgeText, infoText) {
    isGameFinished = false;
    elapsedSeconds = 0;
    activeQuestion = questionObj;

    document.getElementById('view-home').classList.add('hidden');
    document.getElementById('view-game').classList.remove('hidden');
    document.getElementById('home-btn').classList.remove('hidden');
    document.getElementById('result-box').classList.add('hidden');
    document.getElementById('submit-btn').classList.remove('hidden');
    document.getElementById('score-input-section').classList.remove('hidden');
    document.getElementById('player-nickname').value = '';

    const data = appData[currentLang];
    document.getElementById('game-category-badge').innerText = badgeText;
    document.getElementById('game-info-str').innerText = infoText;
    document.getElementById('ui-rank-title').innerText = data.rankTitle;
    document.getElementById('game-question-text').innerText = activeQuestion.questionText;

    currentOptions = activeQuestion.options.map((opt, idx) => ({
        text: opt.text,
        originalIndex: idx
    }));

    shuffleArray(currentOptions);
    renderOptions();
    startTimer();
    fetchRankings();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    const correctIds = activeQuestion.correctOrder;
    const currentIds = array.map(item => item.originalIndex);
    if (JSON.stringify(currentIds) === JSON.stringify(correctIds)) {
        [array[0], array[1]] = [array[1], array[0]];
    }
}

function renderOptions() {
    const listContainer = document.getElementById('options-list');
    listContainer.innerHTML = '';

    currentOptions.forEach((option, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = "flex items-center justify-between bg-slate-950 border border-slate-800 rounded-xl p-3 transition-all";
        
        const textSpan = document.createElement('span');
        textSpan.className = "text-xs font-medium text-slate-200";
        textSpan.innerText = `${index + 1}. ${option.text}`;
        itemDiv.appendChild(textSpan);

        if (!isGameFinished) {
            const btnGroup = document.createElement('div');
            btnGroup.className = "flex space-x-1";

            const upBtn = document.createElement('button');
            upBtn.innerHTML = "▲";
            upBtn.className = `w-7 h-7 flex items-center justify-center rounded-lg text-xs font-bold ${index === 0 ? 'bg-slate-900 text-slate-700 cursor-not-allowed' : 'bg-slate-900 hover:bg-indigo-600 text-slate-300'}`;
            upBtn.disabled = (index === 0);
            upBtn.onclick = () => moveOption(index, index - 1);
            btnGroup.appendChild(upBtn);

            const downBtn = document.createElement('button');
            downBtn.innerHTML = "▼";
            downBtn.className = `w-7 h-7 flex items-center justify-center rounded-lg text-xs font-bold ${index === currentOptions.length - 1 ? 'bg-slate-900 text-slate-700 cursor-not-allowed' : 'bg-slate-900 hover:bg-indigo-600 text-slate-300'}`;
            downBtn.disabled = (index === currentOptions.length - 1);
            downBtn.onclick = () => moveOption(index, index + 1);
            btnGroup.appendChild(downBtn);

            itemDiv.appendChild(btnGroup);
        }
        listContainer.appendChild(itemDiv);
    });
}

function moveOption(fromIdx, toIdx) {
    const movedItem = currentOptions.splice(fromIdx, 1)[0];
    currentOptions.splice(toIdx, 0, movedItem);
    renderOptions();
}

function startTimer() {
    clearInterval(timerInterval);
    startTime = Date.now();
    timerInterval = setInterval(() => {
        if (!isGameFinished) {
            const delta = (Date.now() - startTime) / 1000;
            elapsedSeconds = parseFloat(delta.toFixed(1));
            document.getElementById('ui-timer').innerText = `⏱️ ${elapsedSeconds.toFixed(1)}s`;
        }
    }, 100);
}

function checkAnswer() {
    if (isGameFinished) return;

    const userOrder = currentOptions.map(item => item.originalIndex);
    const correctOrder = activeQuestion.correctOrder;
    const isCorrect = JSON.stringify(userOrder) === JSON.stringify(correctOrder);

    clearInterval(timerInterval);
    isGameFinished = true;

    const data = appData[currentLang];
    const resultBox = document.getElementById('result-box');
    const resultMsg = document.getElementById('result-message');
    
    resultBox.classList.remove('hidden');
    document.getElementById('submit-btn').classList.add('hidden');
    document.getElementById('ui-exp-title').innerText = data.expTitle;
    document.getElementById('ui-nickname-label').innerText = data.nicknameLabel;
    document.getElementById('player-nickname').placeholder = data.nicknamePlaceholder;
    document.getElementById('ui-register-btn').innerText = data.registerBtn;
    document.getElementById('ui-share-btn').innerText = data.shareBtn;

    if (isCorrect) {
        resultMsg.className = "text-center font-bold text-sm text-emerald-400";
        resultMsg.innerText = `${data.successMsg}${elapsedSeconds}s`;
        document.getElementById('explanation-text').innerText = activeQuestion.explanation;
        renderOptions();
    } else {
        resultMsg.className = "text-center font-bold text-sm text-rose-400";
        resultMsg.innerText = `${data.failMsg} (${elapsedSeconds}s)`;
        document.getElementById('score-input-section').classList.add('hidden');
        document.getElementById('explanation-text').innerText = activeQuestion.explanation;
        renderOptions();
    }
}

// ==========================================
// 🌐 玩家自訂題庫功能 (Creator & Community)
// ==========================================
function openCreatorModal() {
    document.getElementById('creator-modal').classList.remove('hidden');
}

function closeCreatorModal() {
    document.getElementById('creator-modal').classList.add('hidden');
}

async function publishCustomSet() {
    const title = document.getElementById('new-set-title').value.trim();
    const creator = document.getElementById('new-set-creator').value.trim();
    const qText = document.getElementById('new-q-text').value.trim();
    const exp = document.getElementById('new-exp').value.trim();
    
    const o0 = document.getElementById('opt-0').value.trim();
    const o1 = document.getElementById('opt-1').value.trim();
    const o2 = document.getElementById('opt-2').value.trim();
    const o3 = document.getElementById('opt-3').value.trim();

    if (!title || !creator || !qText || !o0 || !o1 || !o2 || !o3) {
        alert(currentLang === 'en' ? "Please fill in all fields!" : "請完整填寫所有欄位與 4 個選項！");
        return;
    }

    if (!supabaseClient) {
        alert("Database offline.");
        return;
    }

    const questionObj = {
        questionText: qText,
        options: [{ text: o0 }, { text: o1 }, { text: o2 }, { text: o3 }],
        correctOrder: [0, 1, 2, 3], // 建立時預設輸入順序即為正確順序
        explanation: exp || "No explanation provided."
    };

    const { error } = await supabaseClient
        .from('custom_trivia_sets')
        .insert([{ title: title, creator: creator, questions_data: questionObj }]);

    if (error) {
        console.error(error);
        alert("發布失敗，請確認 Supabase 資料表是否已建立！");
    } else {
        alert(currentLang === 'en' ? "Quiz published successfully! 🎉" : "題庫發布成功！🎉");
        closeCreatorModal();
        loadCustomSets();
    }
}

async function loadCustomSets() {
    const grid = document.getElementById('custom-sets-grid');
    if (!supabaseClient) {
        grid.innerHTML = `<div class="text-xs text-slate-500 col-span-2 text-center">Database offline.</div>`;
        return;
    }

    const { data, error } = await supabaseClient
        .from('custom_trivia_sets')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

    if (error || !data || data.length === 0) {
        grid.innerHTML = `<div class="text-xs text-slate-500 col-span-2 text-center">尚無玩家自訂題庫，快來建立第一個吧！</div>`;
        return;
    }

    grid.innerHTML = '';
    data.forEach(set => {
        const card = document.createElement('div');
        card.className = "bg-slate-900 hover:bg-slate-800 border border-emerald-500/30 hover:border-emerald-500 rounded-xl p-4 cursor-pointer transition-all flex flex-col justify-between shadow-md group";
        card.onclick = () => startCustomSet(set.id, set.title, set.creator, set.questions_data);
        card.innerHTML = `
            <div>
                <span class="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">Custom</span>
                <h4 class="font-bold text-sm text-slate-200 mt-2 group-hover:text-emerald-400 transition-colors">${escapeHtml(set.title)}</h4>
                <p class="text-[11px] text-slate-400 mt-1">👤 ${escapeHtml(set.creator)}</p>
            </div>
            <div class="mt-4 flex items-center text-[11px] font-semibold text-emerald-400">Play Custom →</div>
        `;
        grid.appendChild(card);
    });
}

// 排行榜與上傳成績
async function uploadScore() {
    const nickname = document.getElementById('player-nickname').value.trim();
    if (!nickname) {
        alert(currentLang === 'en' ? "Please enter your nickname!" : "請輸入您的暱稱！");
        return;
    }
    if (!supabaseClient) return;

    const targetKey = activeCustomSetId ? `custom_${activeCustomSetId}` : new Date().toISOString().split('T')[0];

    const { error } = await supabaseClient
        .from('rankings')
        .insert([{ date_str: targetKey, nickname: nickname, is_correct: true, elapsed_seconds: elapsedSeconds }]);

    if (error) {
        alert("上傳失敗！");
    } else {
        alert(appData[currentLang].successToast);
        document.getElementById('score-input-section').classList.add('hidden');
        fetchRankings();
    }
}

async function fetchRankings() {
    const rankListContainer = document.getElementById('leaderboard-list');
    if (!supabaseClient) return;

    const targetKey = activeCustomSetId ? `custom_${activeCustomSetId}` : new Date().toISOString().split('T')[0];

    const { data, error } = await supabaseClient
        .from('rankings')
        .select('*')
        .eq('date_str', targetKey)
        .order('elapsed_seconds', { ascending: true })
        .limit(10);

    if (error || !data || data.length === 0) {
        rankListContainer.innerHTML = `<div class="text-slate-500 text-center py-2">${appData[currentLang].noRank}</div>`;
        return;
    }

    rankListContainer.innerHTML = '';
    data.forEach((row, idx) => {
        const rowDiv = document.createElement('div');
        rowDiv.className = "flex justify-between items-center bg-slate-950 px-3 py-2 rounded-lg border border-slate-800/80";
        let medal = `#${idx + 1}`;
        if (idx === 0) medal = "🥇"; else if (idx === 1) medal = "🥈"; else if (idx === 2) medal = "🥉";

        rowDiv.innerHTML = `
            <span class="font-medium text-slate-300">${medal} ${escapeHtml(row.nickname)}</span>
            <span class="font-mono text-indigo-400 font-bold">${row.elapsed_seconds}s</span>
        `;
        rankListContainer.appendChild(rowDiv);
    });
}

function shareResult() {
    const data = appData[currentLang];
    const text = `Trivia Hub Challenge\n⏱️ ${elapsedSeconds}s\n🔗 ${window.location.href}`;
    navigator.clipboard.writeText(text).then(() => alert(data.copyToast));
}

function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}