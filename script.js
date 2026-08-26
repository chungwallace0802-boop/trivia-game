// ==========================================
// 📚 多語言字典與官方單選冷知識題庫 (全部為單一正確答案)
// ==========================================
const appData = {
    zh: {
        subtitle: "Discover, Play & Create Quizzes",
        bannerTitle: "今日精選：世界冷知識大挑戰",
        bannerDesc: "挑戰全網同步的單選冷知識問答，看看誰是答題王！",
        startDailyBtn: "▶ 立即挑戰今日任務",
        categoriesTitle: "Quiz Categories",
        customTitle: "🌐 Community Custom Quizzes",
        createNavBtn: "✨ 建立題庫",
        homeBtn: "🏠 大廳",
        rankTitle: "🏆 排行榜",
        datePrefix: "日期：",
        creatorPrefix: "作者：",
        expTitle: "💡 趣味冷知識解析：",
        nicknameLabel: "留下大名登錄排行榜：",
        nicknamePlaceholder: "請輸入您的暱稱 (最多10字)",
        registerBtn: "登記成績",
        shareBtn: "📋 複製戰績分享",
        successMsg: "🎉 答對了！耗時 ",
        failMsg: "❌ 答錯了！正確答案是：",
        successToast: "成績成功登錄排行榜！🎉",
        copyToast: "已複製戰績到剪貼簿！",
        noRank: "尚無通關記錄，快來搶頭香！",
        modalTitle: "✨ 建立你的自訂單選題庫",
        lblSetTitle: "題庫名稱 (Set Title)：",
        lblCreator: "您的名字/作者 (Creator)：",
        lblQText: "題目敘述 (Question)：",
        lblOptions: "選項 (請輸入 4 個選項)：",
        lblCorrect: "正確答案是第幾個選項 (1 到 4)：",
        lblExp: "冷知識解析 (Explanation)：",
        btnCancel: "取消",
        btnPublish: "發布題庫 🚀",
        categories: [
            { id: 'science', name: "科學與自然", icon: "🔬", desc: "探索動物、宇宙與物理世界的奧秘大小事。" },
            { id: 'history', name: "歷史與世界", icon: "🏛️", desc: "回顧改變世界的重大歷史事件與偉人足跡。" },
            { id: 'geography', name: "地理與城市", icon: "🌍", desc: "考驗你對全球城市、國家與地標的熟悉度。" },
            { id: 'popculture', name: "流行與娛樂", icon: "🎬", desc: "電影、音樂與日常生活的趣味冷知識大集合。" }
        ],
        questions: {
            daily: [
                {
                    questionText: "章魚總共有幾顆心臟？",
                    options: [{ text: "1 顆" }, { text: "2 顆" }, { text: "3 顆" }, { text: "4 顆" }],
                    correctIndex: 2,
                    explanation: "章魚擁有 3 顆心臟！其中兩顆負責將血液輸送到鰓，另一顆則負責將血液輸送到全身。"
                }
            ],
            science: [
                {
                    questionText: "太陽系的八大行星中，哪一顆行星自轉方向與大部分行星相反（它是倒著自轉的）？",
                    options: [{ text: "水星" }, { text: "金星" }, { text: "火星" }, { text: "海王星" }],
                    correctIndex: 1,
                    explanation: "金星是太陽系中唯一自轉方向由東向西（逆向自轉）的行星，所以在金星上太陽是從西邊升起的！"
                }
            ],
            history: [
                {
                    questionText: "古埃及法老圖坦卡門的陵墓是在哪一年被英國考古學家霍華·卡特發現的？",
                    options: [{ text: "1905 年" }, { text: "1922 年" }, { text: "1935 年" }, { text: "1950 年" }],
                    correctIndex: 1,
                    explanation: "霍華·卡特於 1922 年 11 月 4 日發現了圖坦卡門陵墓的入口，這也是考古學史上最偉大的發現之一。"
                }
            ],
            geography: [
                {
                    questionText: "下列哪一個國家擁有世界上最多的島嶼，數量超過 20 萬個？",
                    options: [{ text: "印尼" }, { text: "日本" }, { text: "瑞典" }, { text: "菲律賓" }],
                    correctIndex: 2,
                    explanation: "瑞典擁有超過 26 萬個島嶼，是全球擁有最多島嶼的國家，其中大多數都是無人島或礁石。"
                }
            ],
            popculture: [
                {
                    questionText: "經典科幻電影《星際大戰》系列中，黑武士達斯·維達最經典的台詞「Luke, I am your father」實際上在電影中怎麼說的？",
                    options: [
                        { text: "“Luke, I am your father.”" },
                        { text: "“No, I am your father.”" },
                        { text: "“Obi-Wan never told you what happened to your father.”" },
                        { text: "“Search your feelings, you know it to be true.”" }
                    ],
                    correctIndex: 1,
                    explanation: "這是電影史上最著名的曼德拉效應之一！達斯·維達在《帝國大反擊》中實際說的是 “No, I am your father.”。"
                }
            ]
        }
    },
    en: {
        subtitle: "Discover, Play & Create Quizzes",
        bannerTitle: "Daily Featured: World Trivia Challenge",
        bannerDesc: "Take on today's sync single-choice trivia challenge and test your knowledge!",
        startDailyBtn: "▶ Play Today's Challenge",
        categoriesTitle: "Quiz Categories",
        customTitle: "🌐 Community Custom Quizzes",
        createNavBtn: "✨ Create Quiz",
        homeBtn: "🏠 Home",
        rankTitle: "🏆 Leaderboard",
        datePrefix: "Date: ",
        creatorPrefix: "By: ",
        expTitle: "💡 Fun Fact Explanation:",
        nicknameLabel: "Leave your name for leaderboard:",
        nicknamePlaceholder: "Enter your nickname (Max 10 chars)",
        registerBtn: "Submit Score",
        shareBtn: "📋 Copy Result",
        successMsg: "🎉 Correct! Time: ",
        failMsg: "❌ Incorrect! Correct answer was: ",
        successToast: "Score successfully uploaded! 🎉",
        copyToast: "Result copied to clipboard!",
        noRank: "No scores yet. Be the first!",
        modalTitle: "✨ Create Your Custom Trivia Set",
        lblSetTitle: "Set Title:",
        lblCreator: "Your Name / Creator:",
        lblQText: "Question Text:",
        lblOptions: "Options (Enter 4 options):",
        lblCorrect: "Correct Option Number (1 to 4):",
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
                    questionText: "How many hearts does an octopus have?",
                    options: [{ text: "1" }, { text: "2" }, { text: "3" }, { text: "4" }],
                    correctIndex: 2,
                    explanation: "An octopus has 3 hearts! Two pump blood to the gills, while the third pumps it to the rest of the body."
                }
            ],
            science: [
                {
                    questionText: "Which planet in our solar system rotates in the opposite direction of most other planets (retrograde rotation)?",
                    options: [{ text: "Mercury" }, { text: "Venus" }, { text: "Mars" }, { text: "Neptune" }],
                    correctIndex: 1,
                    explanation: "Venus rotates from east to west, which means the sun rises in the west and sets in the east on Venus!"
                }
            ],
            history: [
                {
                    questionText: "In which year did British archaeologist Howard Carter discover the tomb of King Tutankhamun?",
                    options: [{ text: "1905" }, { text: "1922" }, { text: "1935" }, { text: "1950" }],
                    correctIndex: 1,
                    explanation: "Howard Carter discovered the entrance to King Tutankhamun's tomb on November 4, 1922."
                }
            ],
            geography: [
                {
                    questionText: "Which country has the most islands in the world, with over 200,000 islands?",
                    options: [{ text: "Indonesia" }, { text: "Japan" }, { text: "Sweden" }, { text: "Philippines" }],
                    correctIndex: 2,
                    explanation: "Sweden has over 260,000 islands, making it the country with the highest number of islands globally."
                }
            ],
            popculture: [
                {
                    questionText: "In Star Wars: Episode V, what does Darth Vader actually say to Luke Skywalker?",
                    options: [
                        { text: "“Luke, I am your father.”" },
                        { text: "“No, I am your father.”" },
                        { text: "“Obi-Wan never told you what happened to your father.”" },
                        { text: "“Search your feelings, you know it to be true.”" }
                    ],
                    correctIndex: 1,
                    explanation: "It's one of the most famous Mandela effects in history! Vader actually says, “No, I am your father.”"
                }
            ]
        }
    }
};

let currentLang = 'zh';
let currentCategory = 'daily';
let activeCustomSetId = null;

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

let startTime = null;
let timerInterval = null;
let elapsedSeconds = 0;
let isGameFinished = false;
let activeQuestion = null;

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
    document.getElementById('player-nickname').value = '';

    const data = appData[currentLang];
    document.getElementById('game-category-badge').innerText = badgeText;
    document.getElementById('game-info-str').innerText = infoText;
    document.getElementById('ui-rank-title').innerText = data.rankTitle;
    document.getElementById('game-question-text').innerText = activeQuestion.questionText;

    renderTriviaOptions();
    startTimer();
    fetchRankings();
}

function renderTriviaOptions(selectedIndex = null) {
    const listContainer = document.getElementById('options-list');
    listContainer.innerHTML = '';

    activeQuestion.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = "w-full text-left bg-slate-950 border border-slate-800 hover:border-indigo-500 rounded-xl p-3 text-xs font-medium text-slate-200 transition-all flex items-center justify-between";
        
        if (isGameFinished) {
            btn.disabled = true;
            if (index === activeQuestion.correctIndex) {
                btn.className = "w-full text-left bg-emerald-950/60 border border-emerald-500 rounded-xl p-3 text-xs font-bold text-emerald-300 flex items-center justify-between";
            } else if (index === selectedIndex) {
                btn.className = "w-full text-left bg-rose-950/60 border border-rose-500 rounded-xl p-3 text-xs font-bold text-rose-300 flex items-center justify-between";
            }
        } else {
            btn.onclick = () => selectAnswer(index);
        }

        const labels = ['A', 'B', 'C', 'D'];
        btn.innerHTML = `<span><strong class="text-indigo-400 mr-2">${labels[index]}.</strong> ${option.text}</span>`;
        listContainer.appendChild(btn);
    });
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

function selectAnswer(selectedIndex) {
    if (isGameFinished) return;

    clearInterval(timerInterval);
    isGameFinished = true;

    const isCorrect = (selectedIndex === activeQuestion.correctIndex);
    const data = appData[currentLang];
    const resultBox = document.getElementById('result-box');
    const resultMsg = document.getElementById('result-message');
    
    resultBox.classList.remove('hidden');
    document.getElementById('ui-exp-title').innerText = data.expTitle;
    document.getElementById('ui-nickname-label').innerText = data.nicknameLabel;
    document.getElementById('player-nickname').placeholder = data.nicknamePlaceholder;
    document.getElementById('ui-register-btn').innerText = data.registerBtn;
    document.getElementById('ui-share-btn').innerText = data.shareBtn;

    if (isCorrect) {
        resultMsg.className = "text-center font-bold text-sm text-emerald-400";
        resultMsg.innerText = `${data.successMsg}${elapsedSeconds}s`;
        document.getElementById('explanation-text').innerText = activeQuestion.explanation;
        renderTriviaOptions(selectedIndex);
    } else {
        resultMsg.className = "text-center font-bold text-sm text-rose-400";
        const correctLabel = ['A', 'B', 'C', 'D'][activeQuestion.correctIndex];
        resultMsg.innerText = `${data.failMsg} ${correctLabel}. ${activeQuestion.options[activeQuestion.correctIndex].text} (${elapsedSeconds}s)`;
        document.getElementById('score-input-section').classList.add('hidden');
        document.getElementById('explanation-text').innerText = activeQuestion.explanation;
        renderTriviaOptions(selectedIndex);
    }
}

// ==========================================
// 🌐 玩家自訂題庫功能
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
    const correctIdxNum = parseInt(document.getElementById('new-correct-idx').value) - 1;
    
    const o0 = document.getElementById('opt-0').value.trim();
    const o1 = document.getElementById('opt-1').value.trim();
    const o2 = document.getElementById('opt-2').value.trim();
    const o3 = document.getElementById('opt-3').value.trim();

    if (!title || !creator || !qText || !o0 || !o1 || !o2 || !o3) {
        alert(currentLang === 'en' ? "Please fill in all fields!" : "請完整填寫所有欄位與 4 個選項！");
        return;
    }

    if (isNaN(correctIdxNum) || correctIdxNum < 0 || correctIdxNum > 3) {
        alert(currentLang === 'en' ? "Correct option must be between 1 and 4!" : "正確答案選項請填入 1 到 4 之間的數字！");
        return;
    }

    if (!supabaseClient) {
        alert("Database offline.");
        return;
    }

    const questionObj = {
        questionText: qText,
        options: [{ text: o0 }, { text: o1 }, { text: o2 }, { text: o3 }],
        correctIndex: correctIdxNum,
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
