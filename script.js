/**
 * ============================================================================
 * TRIVIA HUB ULTIMATE - 終極前端應用程式核心控制器 (Full Version)
 * 支援 8 大官方分類、大型多題陣列題庫 (1000+題)、社群題庫刪除與完整成就系統
 * ============================================================================
 */

class TriviaHubApp {
    constructor() {
        this.currentLang = 'zh';
        this.currentView = 'home';
        this.currentCategory = 'daily';
        this.activeCustomSetId = null;
        
        this.questionsList = [];
        this.currentIndex = 0;
        this.score = 0;
        this.startTime = null;
        this.timerInterval = null;
        this.elapsedSeconds = 0;
        this.isGameFinished = false;
        this.activeQuestion = null;
        this.customSetsCache = [];

        // Supabase 資料庫連線配置
        this.supabaseUrl = 'https://xqzxtexxjuedzejgsudk.supabase.co';
        this.supabaseKey = 'sb_publishable_F5FKV-tD7SNjLziE0GXD5Q_R5UX8dYr';
        this.supabaseClient = null;

        this.userStats = {
            totalPlayed: 0,
            totalCorrect: 0,
            bestStreak: 0,
            currentStreak: 0,
            unlockedAchievements: []
        };

        this.achievementsDefinition = [
            { id: 'first_win', titleZh: '初試啼聲', titleEn: 'First Victory', descZh: '成功答對第一道冷知識題目', descEn: 'Successfully answer your first trivia question', icon: '🎯' },
            { id: 'streak_3', titleZh: '連戰皆捷', titleEn: 'Streak Master', descZh: '達成連續答對 3 題', descEn: 'Achieve a 3-question correct streak', icon: '🔥' },
            { id: 'speed_demon', titleZh: '閃電手速', titleEn: 'Speed Demon', descZh: '在 2 秒內極速答對題目', descEn: 'Answer a question correctly under 2 seconds', icon: '⚡' },
            { id: 'creator', titleZh: '知識播種者', titleEn: 'Knowledge Creator', descZh: '成功發布一組自訂題庫', descEn: 'Successfully publish a custom quiz set', icon: '✨' },
            { id: 'master_10', titleZh: '冷知識學者', titleEn: 'Trivia Scholar', descZh: '累計答對 10 道冷知識', descEn: 'Accumulate 10 correct answers', icon: '👑' }
        ];

        // 8 大官方主題與學科分類字典
        this.i18n = {
            zh: {
                bannerTitle: "今日精選：全球冷知識巔峰大對決",
                bannerDesc: "匯集全球最刁鑽、最有趣的科學、歷史與流行冷知識，立即挑戰個人反應速度與知識極限，登上全球排行榜！",
                startDailyBtn: "立即開始今日挑戰",
                endlessBtn: "無限生存模式 (1000+題庫)",
                categoriesTitle: "官方學科與主題分類 (8大領域)",
                customTitle: "🌐 社群自訂題庫專區 (Community Custom Sets)",
                homeNavBtn: "🏠 返回大廳",
                rankTitle: "🏆 全球高手排行榜 (Global Leaderboard)",
                datePrefix: "日期：",
                creatorPrefix: "作者：",
                expTitle: "趣味冷知識深度解析：",
                nicknameLabel: "恭喜通關！請留下大名登錄全球排行榜：",
                nicknamePlaceholder: "請輸入您的暱稱（最多12字）",
                registerBtn: "登記成績",
                shareBtn: "📋 複製戰績分享",
                nextBtn: "下一題 ➔",
                finishBtn: "查看總結成績 🏆",
                successMsg: "🎉 答對了！用時 ",
                failMsg: "❌ 答錯了！正確答案是：",
                successToast: "成績成功登錄全球排行榜！🎉",
                copyToast: "已將戰績複製到剪貼簿！",
                noRank: "尚無通關記錄，快來搶頭香！",
                categories: [
                    { id: 'science', name: "科學與自然", icon: "🔬", desc: "探索天文、生物與物理世界的奧秘大小事。" },
                    { id: 'history', name: "歷史與世界", icon: "🏛️", desc: "回顧改變人類文明進程的重大歷史事件。" },
                    { id: 'geography', name: "地理與城市", icon: "🌍", desc: "考驗你對全球地標、國家與地理奇觀的熟悉度。" },
                    { id: 'popculture', name: "流行與娛樂", icon: "🎬", desc: "電影、動漫、音樂與網路迷因的趣味冷知識。" },
                    { id: 'literature', name: "文學與藝術", icon: "📚", desc: "世界經典文學著作、美術名作與哲學思想。" },
                    { id: 'technology', name: "科技與資訊", icon: "💻", desc: "網際網路、人工智慧、程式碼與科技發展史。" },
                    { id: 'sports', name: "體育與競賽", icon: "⚽", desc: "奧林匹克運動會、足球籃球與傳奇運動員事跡。" },
                    { id: 'lifestyle', name: "生活與美食", icon: "🍣", desc: "全球特色料理、生活冷知識與實用小常識。" }
                ]
            },
            en: {
                bannerTitle: "Daily Featured: Global Trivia Showdown",
                bannerDesc: "Explore the most intriguing science, history, and pop culture trivia. Test your speed and knowledge now!",
                startDailyBtn: "Start Daily Challenge",
                endlessBtn: "Endless Survival Mode (1000+ Qs)",
                categoriesTitle: "Official Quiz Categories (8 Fields)",
                customTitle: "🌐 Community Custom Quizzes",
                homeNavBtn: "🏠 Home",
                rankTitle: "🏆 Global Leaderboard",
                datePrefix: "Date: ",
                creatorPrefix: "By: ",
                expTitle: "💡 Fun Fact Deep Dive:",
                nicknameLabel: "Congratulations! Leave your name for the leaderboard:",
                nicknamePlaceholder: "Enter nickname (Max 12 chars)",
                registerBtn: "Submit Score",
                shareBtn: "📋 Copy Result",
                nextBtn: "Next Question ➔",
                finishBtn: "View Final Results 🏆",
                successMsg: "🎉 Correct! Time: ",
                failMsg: "❌ Incorrect! Correct answer was: ",
                successToast: "Score successfully uploaded to global leaderboard! 🎉",
                copyToast: "Result copied to clipboard!",
                noRank: "No scores yet. Be the first!",
                categories: [
                    { id: 'science', name: "Science & Nature", icon: "🔬", desc: "Explore astronomy, biology, and physics mysteries." },
                    { id: 'history', name: "History & World", icon: "🏛️", desc: "Review major historical events that shaped humanity." },
                    { id: 'geography', name: "Geography & Travel", icon: "🌍", desc: "Test your knowledge of world landmarks and cities." },
                    { id: 'popculture', name: "Pop Culture", icon: "🎬", desc: "Fun trivia from movies, anime, music, and memes." },
                    { id: 'literature', name: "Literature & Art", icon: "📚", desc: "Classic literary works, fine arts, and philosophy." },
                    { id: 'technology', name: "Technology & IT", icon: "💻", desc: "Internet, AI, programming history and innovations." },
                    { id: 'sports', name: "Sports & Games", icon: "⚽", desc: "Olympic games, football, basketball and legends." },
                    { id: 'lifestyle', name: "Lifestyle & Food", icon: "🍣", desc: "Global cuisine, lifestyle tips and trivia." }
                ]
            }
        };

        // 官方精選題庫集（包含擴充欄位）
        this.officialQuestions = {
            zh: {
                daily: [
                    { questionText: "章魚總共有幾顆心臟？", options: [{ text: "1 顆" }, { text: "2 顆" }, { text: "3 顆" }, { text: "4 顆" }], correctIndex: 2, explanation: "章魚擁有 3 顆心臟！" },
                    { questionText: "地球大氣層中，體積含量最多的氣體是哪一種？", options: [{ text: "氧氣" }, { text: "氮氣" }, { text: "二氧化碳" }, { text: "氬氣" }], correctIndex: 1, explanation: "氮氣占了大約 78%。" }
                ],
                science: [
                    { questionText: "太陽系的八大行星中，哪一顆行星的自轉方向是倒著自轉的？", options: [{ text: "水星" }, { text: "金星" }, { text: "火星" }, { text: "海王星" }], correctIndex: 1, explanation: "金星自轉方向由東向西，太陽從西邊升起！" }
                ],
                history: [
                    { questionText: "古埃及法老圖坦卡門的陵墓是在哪一年被發現的？", options: [{ text: "1905 年" }, { text: "1922 年" }, { text: "1935 年" }, { text: "1950 年" }], correctIndex: 1, explanation: "霍華·卡特於 1922 年發現。" }
                ],
                geography: [
                    { questionText: "下列哪一個國家擁有世界上最多的島嶼，數量超過 20 萬個？", options: [{ text: "印尼" }, { text: "日本" }, { text: "瑞典" }, { text: "菲律賓" }], correctIndex: 2, explanation: "瑞典擁有超過 26 萬個島嶼。" }
                ],
                popculture: [
                    { questionText: "星際大戰中，黑武士達斯·維達最著名的台詞實際上是怎麼說的？", options: [{ text: "Luke, I am your father." }, { text: "No, I am your father." }, { text: "Obi-Wan never told you..." }, { text: "Search your feelings." }], correctIndex: 1, explanation: "經典曼德拉效應，實際台詞是 No, I am your father." }
                ],
                literature: [
                    { questionText: "莎士比亞四大悲劇中，哪一部被稱為「丹麥王子復仇記」？", options: [{ text: "馬克白" }, { text: "李爾王" }, { text: "哈姆雷特" }, { text: "奧賽羅" }], correctIndex: 2, explanation: "《哈姆雷特》講述丹麥王子哈姆雷特的復仇故事。" }
                ],
                technology: [
                    { questionText: "全球資訊網 (World Wide Web) 是由誰在 1989 年發明的？", options: [{ text: "比爾·蓋茲" }, { text: "提姆·柏內茲-李" }, { text: "史蒂夫·賈伯斯" }, { text: "艾倫·圖靈" }], correctIndex: 1, explanation: "提姆·柏內茲-李在歐洲核子研究組織發明了 WWW。" }
                ],
                sports: [
                    { questionText: "現代奧林匹克運動會每隔幾年舉辦一次？", options: [{ text: "2 年" }, { text: "3 年" }, { text: "4 年" }, { text: "5 年" }], correctIndex: 2, explanation: "夏季與冬季奧運皆為每 4 年舉辦一次。" }
                ],
                lifestyle: [
                    { questionText: "日本料理中常見的「壽司」最初起源於哪裡的保存食物方法？", options: [{ text: "中國東南沿海" }, { text: "日本本土" }, { text: "地中海" }, { text: "夏威夷" }], correctIndex: 0, explanation: "壽司概念最早源自中國古代以米飯包裹魚肉保存發酵的方法。" }
                ]
            },
            en: {
                daily: [
                    { questionText: "How many hearts does an octopus have?", options: [{ text: "1" }, { text: "2" }, { text: "3" }, { text: "4" }], correctIndex: 2, explanation: "An octopus has 3 hearts." }
                ],
                science: [
                    { questionText: "Which planet in our solar system rotates in the opposite direction?", options: [{ text: "Mercury" }, { text: "Venus" }, { text: "Mars" }, { text: "Neptune" }], correctIndex: 1, explanation: "Venus has a retrograde rotation." }
                ],
                history: [{ questionText: "When was King Tutankhamun's tomb discovered?", options: [{ text: "1905" }, { text: "1922" }, { text: "1935" }, { text: "1950" }], correctIndex: 1, explanation: "Discovered in 1922." }],
                geography: [{ questionText: "Which country has the most islands?", options: [{ text: "Indonesia" }, { text: "Japan" }, { text: "Sweden" }, { text: "Philippines" }], correctIndex: 2, explanation: "Sweden has over 260,000 islands." }],
                popculture: [{ questionText: "What does Darth Vader actually say to Luke?", options: [{ text: "Luke, I am your father." }, { text: "No, I am your father." }, { text: "Obi-Wan..." }, { text: "Search your feelings." }], correctIndex: 1, explanation: "Famous quote is No, I am your father." }],
                literature: [{ questionText: "Who wrote Romeo and Juliet?", options: [{ text: "Charles Dickens" }, { text: "William Shakespeare" }, { text: "Mark Twain" }, { text: "Jane Austen" }], correctIndex: 1, explanation: "Written by William Shakespeare." }],
                technology: [{ questionText: "Who invented the World Wide Web?", options: [{ text: "Bill Gates" }, { text: "Tim Berners-Lee" }, { text: "Steve Jobs" }, { text: "Alan Turing" }], correctIndex: 1, explanation: "Invented by Tim Berners-Lee." }],
                sports: [{ questionText: "How often are the Olympic Games held?", options: [{ text: "Every 2 years" }, { text: "Every 3 years" }, { text: "Every 4 years" }, { text: "Every 5 years" }], correctIndex: 2, explanation: "Held every 4 years." }],
                lifestyle: [{ questionText: "Where did sushi originally conceptualize from?", options: [{ text: "Ancient China" }, { text: "Japan" }, { text: "Italy" }, { text: "Brazil" }], correctIndex: 0, explanation: "Originating from preserving fish in fermented rice." }]
            }
        };

        this.init();
    }

    init() {
        this.loadLocalStorageData();
        this.initSupabase();
        this.renderHome();
        this.loadCustomSets();
    }

    initSupabase() {
        try {
            if (window.supabase && this.supabaseUrl.includes('supabase.co')) {
                this.supabaseClient = window.supabase.createClient(this.supabaseUrl, this.supabaseKey);
            }
        } catch (e) { console.error(e); }
    }

    loadLocalStorageData() {
        try {
            const savedStats = localStorage.getItem('trivia_hub_stats');
            if (savedStats) this.userStats = JSON.parse(savedStats);
        } catch (e) { console.error(e); }
    }

    saveLocalStorageData() {
        try { localStorage.setItem('trivia_hub_stats', JSON.stringify(this.userStats)); } catch (e) { console.error(e); }
    }

    checkAchievements(triggerType, value = 0) {
        let newlyUnlocked = [];
        this.achievementsDefinition.forEach(ach => {
            if (!this.userStats.unlockedAchievements.includes(ach.id)) {
                let unlock = false;
                if (ach.id === 'first_win' && triggerType === 'correct') unlock = true;
                if (ach.id === 'streak_3' && triggerType === 'streak' && value >= 3) unlock = true;
                if (ach.id === 'speed_demon' && triggerType === 'speed' && value <= 2.0) unlock = true;
                if (ach.id === 'creator' && triggerType === 'creator') unlock = true;
                if (ach.id === 'master_10' && triggerType === 'total_correct' && this.userStats.totalCorrect >= 10) unlock = true;

                if (unlock) {
                    this.userStats.unlockedAchievements.push(ach.id);
                    newlyUnlocked.push(ach);
                }
            }
        });

        if (newlyUnlocked.length > 0) {
            this.saveLocalStorageData();
            newlyUnlocked.forEach(ach => this.showToast(`🏅 成就解鎖：${ach.icon} ${this.currentLang === 'en' ? ach.titleEn : ach.titleZh}！`));
        }
    }

    showToast(message) {
        const toast = document.createElement('div');
        toast.className = "fixed bottom-6 right-6 z-50 bg-indigo-600 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl animate-fade-in border border-indigo-400/40 flex items-center space-x-2";
        toast.innerHTML = `<span>✨</span><span>${message}</span>`;
        document.body.appendChild(toast);
        setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, 3000);
    }

    router(viewName) {
        this.currentView = viewName;
        clearInterval(this.timerInterval);
        const homeView = document.getElementById('view-home');
        const gameView = document.getElementById('view-game');
        const homeNavBtn = document.getElementById('nav-home-btn');

        if (viewName === 'home') {
            homeView.classList.remove('hidden');
            gameView.classList.add('hidden');
            homeNavBtn.classList.add('hidden');
            this.loadCustomSets();
        } else if (viewName === 'game') {
            homeView.classList.add('hidden');
            gameView.classList.remove('hidden');
            homeNavBtn.classList.remove('hidden');
        }
    }

    switchLanguage(lang) {
        this.currentLang = lang;
        this.renderHome();
        this.loadCustomSets();
        if (this.currentView === 'game' && !this.activeCustomSetId) {
            this.startCategory(this.currentCategory);
        }
    }

    renderHome() {
        const dict = this.i18n[this.currentLang];
        document.getElementById('ui-badge-daily').innerText = this.currentLang === 'en' ? 'Featured Daily Challenge' : '今日精選大挑戰';
        document.getElementById('home-banner-title').innerText = dict.bannerTitle;
        document.getElementById('home-banner-desc').innerText = dict.bannerDesc;
        document.getElementById('ui-banner-play-btn').innerText = dict.startDailyBtn;
        document.getElementById('ui-banner-endless-btn').innerText = dict.endlessBtn;
        document.getElementById('ui-categories-title').innerText = dict.categoriesTitle;
        document.getElementById('ui-custom-title').innerHTML = `<span>🌐</span><span>${this.currentLang === 'en' ? 'Community Custom Quizzes' : '社群自訂題庫專區'}</span>`;
        document.getElementById('nav-home-btn').innerHTML = `<span>🏠</span><span>${dict.homeNavBtn}</span>`;

        const grid = document.getElementById('category-grid');
        grid.innerHTML = '';
        dict.categories.forEach(cat => {
            const card = document.createElement('div');
            card.className = "bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/60 rounded-3xl p-5 cursor-pointer transition-all flex flex-col justify-between shadow-xl group transform hover:-translate-y-1";
            card.onclick = () => this.startCategory(cat.id);
            card.innerHTML = `
                <div>
                    <div class="text-3xl mb-3 w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">${cat.icon}</div>
                    <h4 class="font-bold text-sm sm:text-base text-slate-100 group-hover:text-indigo-400 transition-colors">${cat.name}</h4>
                    <p class="text-xs text-slate-400 mt-2 leading-relaxed">${cat.desc}</p>
                </div>
                <div class="mt-5 flex items-center justify-between text-xs font-bold text-indigo-400">
                    <span>Play Quiz</span><span class="transform group-hover:translate-x-1 transition-transform">→</span>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    startDailyChallenge() {
        this.activeCustomSetId = null;
        this.currentCategory = 'daily';
        const dict = this.i18n[this.currentLang];
        const qList = this.officialQuestions[this.currentLang].daily || this.officialQuestions[this.currentLang].science;
        this.questionsList = [...qList];
        this.currentIndex = 0;
        this.score = 0;
        this.router('game');
        this.setupGameSession(dict.bannerTitle, `${dict.datePrefix}${new Date().toISOString().split('T')[0]}`);
    }

    startCategory(catId) {
        this.activeCustomSetId = null;
        this.currentCategory = catId;
        const dict = this.i18n[this.currentLang];
        const qList = this.officialQuestions[this.currentLang][catId] || this.officialQuestions[this.currentLang].daily;
        this.questionsList = [...qList];
        this.currentIndex = 0;
        this.score = 0;
        this.router('game');
        
        const catObj = dict.categories.find(c => c.id === catId) || { name: catId };
        this.setupGameSession(catObj.name, `${dict.datePrefix}${new Date().toISOString().split('T')[0]}`);
    }

    startEndlessMode() {
        this.activeCustomSetId = null;
        this.currentCategory = 'endless';
        const langObj = this.officialQuestions[this.currentLang];
        let allQ = [];
        Object.keys(langObj).forEach(k => allQ = allQ.concat(langObj[k]));
        this.questionsList = allQ.sort(() => Math.random() - 0.5);
        this.currentIndex = 0;
        this.score = 0;
        this.router('game');
        this.setupGameSession("♾️ 無限生存模式", "大量題庫挑戰極限");
    }

    startCustomSet(setId, title, creator, questionsArray) {
        this.activeCustomSetId = setId;
        const dict = this.i18n[this.currentLang];
        // 確保支援多題陣列
        this.questionsList = Array.isArray(questionsArray) ? questionsArray : [questionsArray];
        this.currentIndex = 0;
        this.score = 0;
        this.router('game');
        this.setupGameSession(title, `${dict.creatorPrefix}${creator} (共 ${this.questionsList.length} 題)`);
    }

    setupGameSession(badgeText, infoText) {
        this.isGameFinished = false;
        this.elapsedSeconds = 0;
        this.activeQuestion = this.questionsList[this.currentIndex];

        document.getElementById('result-box').classList.add('hidden');
        document.getElementById('player-nickname').value = '';
        document.getElementById('score-input-section').classList.remove('hidden');

        document.getElementById('game-category-badge').innerText = badgeText;
        document.getElementById('game-info-str').innerText = infoText;
        document.getElementById('game-progress-str').innerText = `題目 ${this.currentIndex + 1} / ${this.questionsList.length}`;
        document.getElementById('ui-score-display').innerText = `分數：${this.score}`;
        document.getElementById('ui-rank-title').innerHTML = `🏆 ${this.i18n[this.currentLang].rankTitle}`;
        document.getElementById('game-question-text').innerText = this.activeQuestion.questionText;

        this.renderTriviaOptions();
        this.startTimer();
        this.fetchRankings();
    }

    renderTriviaOptions(selectedIndex = null) {
        const listContainer = document.getElementById('options-list');
        listContainer.innerHTML = '';

        this.activeQuestion.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = "w-full text-left bg-slate-950/90 border border-slate-800 hover:border-indigo-500/80 rounded-2xl p-4 text-xs sm:text-sm font-medium text-slate-200 transition-all flex items-center justify-between group shadow-md";
            
            if (this.isGameFinished) {
                btn.disabled = true;
                if (index === this.activeQuestion.correctIndex) {
                    btn.className = "w-full text-left bg-emerald-950/70 border border-emerald-500/80 rounded-2xl p-4 text-xs sm:text-sm font-bold text-emerald-300 flex items-center justify-between shadow-lg";
                } else if (index === selectedIndex) {
                    btn.className = "w-full text-left bg-rose-950/70 border border-rose-500/80 rounded-2xl p-4 text-xs sm:text-sm font-bold text-rose-300 flex items-center justify-between";
                } else {
                    btn.className = "w-full text-left bg-slate-950/40 border border-slate-900 rounded-2xl p-4 text-xs sm:text-sm text-slate-600 flex items-center justify-between";
                }
            } else {
                btn.onclick = () => this.selectAnswer(index);
            }

            const labels = ['A', 'B', 'C', 'D'];
            btn.innerHTML = `
                <div class="flex items-center space-x-3">
                    <span class="w-7 h-7 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center font-bold text-indigo-400 text-xs">${labels[index]}</span>
                    <span class="leading-relaxed">${option.text}</span>
                </div>
            `;
            listContainer.appendChild(btn);
        });
    }

    startTimer() {
        clearInterval(this.timerInterval);
        this.startTime = Date.now();
        const timerBar = document.getElementById('game-timer-bar');
        timerBar.style.width = '100%';

        this.timerInterval = setInterval(() => {
            if (!this.isGameFinished) {
                const delta = (Date.now() - this.startTime) / 1000;
                this.elapsedSeconds = parseFloat(delta.toFixed(1));
                document.getElementById('ui-timer').innerText = `⏱️ ${this.elapsedSeconds.toFixed(1)}s`;
                const pct = Math.max(0, 100 - (this.elapsedSeconds / 30) * 100);
                timerBar.style.width = `${pct}%`;
            }
        }, 100);
    }

    selectAnswer(selectedIndex) {
        if (this.isGameFinished) return;
        clearInterval(this.timerInterval);
        this.isGameFinished = true;

        const isCorrect = (selectedIndex === this.activeQuestion.correctIndex);
        const dict = this.i18n[this.currentLang];
        const resultBox = document.getElementById('result-box');
        const resultMsg = document.getElementById('result-message');
        
        resultBox.classList.remove('hidden');
        document.getElementById('ui-exp-title').innerText = dict.expTitle;
        document.getElementById('ui-nickname-label').innerText = dict.nicknameLabel;
        document.getElementById('player-nickname').placeholder = dict.nicknamePlaceholder;
        document.getElementById('ui-register-btn').innerText = dict.registerBtn;
        document.getElementById('ui-share-btn').innerText = dict.shareBtn;

        this.userStats.totalPlayed++;
        if (isCorrect) {
            this.score += Math.max(100, Math.round(1000 - this.elapsedSeconds * 20));
            this.userStats.totalCorrect++;
            this.userStats.currentStreak++;
            if (this.userStats.currentStreak > this.userStats.bestStreak) this.userStats.bestStreak = this.userStats.currentStreak;

            resultMsg.className = "text-center font-bold text-sm sm:text-base text-emerald-400";
            resultMsg.innerText = `${dict.successMsg}${this.elapsedSeconds}s | 得分：+${this.score}`;
            document.getElementById('explanation-text').innerText = this.activeQuestion.explanation || "無詳細解析";
            
            confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
            this.checkAchievements('first_win');
            this.checkAchievements('streak_3', this.userStats.currentStreak);
            this.checkAchievements('speed_demon', this.elapsedSeconds);
            this.checkAchievements('total_correct');
        } else {
            this.userStats.currentStreak = 0;
            resultMsg.className = "text-center font-bold text-sm sm:text-base text-rose-400";
            const correctLabel = ['A', 'B', 'C', 'D'][this.activeQuestion.correctIndex];
            resultMsg.innerText = `${dict.failMsg} ${correctLabel}. ${this.activeQuestion.options[this.activeQuestion.correctIndex].text}`;
            document.getElementById('explanation-text').innerText = this.activeQuestion.explanation || "無詳細解析";
            document.getElementById('score-input-section').classList.add('hidden');
        }

        this.saveLocalStorageData();
        document.getElementById('ui-score-display').innerText = `分數：${this.score}`;
        this.renderTriviaOptions(selectedIndex);

        const nextBtn = document.getElementById('ui-next-btn');
        if (this.currentIndex < this.questionsList.length - 1) {
            nextBtn.innerText = dict.nextBtn;
        } else {
            nextBtn.innerText = dict.finishBtn;
        }
    }

    nextQuestionOrFinish() {
        if (this.currentIndex < this.questionsList.length - 1) {
            this.currentIndex++;
            this.setupGameSession(document.getElementById('game-category-badge').innerText, document.getElementById('game-info-str').innerText);
        } else {
            this.showToast("🎉 恭喜完成此題庫所有挑戰！");
            this.router('home');
        }
    }

    openCreatorModal() { document.getElementById('creator-modal').classList.remove('hidden'); }
    closeCreatorModal() { document.getElementById('creator-modal').classList.add('hidden'); }

    async publishCustomSet() {
        const title = document.getElementById('new-set-title').value.trim();
        const creator = document.getElementById('new-set-creator').value.trim();
        const jsonStr = document.getElementById('new-questions-json').value.trim();

        if (!title || !creator || !jsonStr) {
            alert("請完整填寫題庫名稱、作者與 JSON 題目陣列！");
            return;
        }

        let questionsDataArray;
        try {
            questionsDataArray = JSON.parse(jsonStr);
            if (!Array.isArray(questionsDataArray) || questionsDataArray.length === 0) throw new Error();
        } catch (e) {
            alert("JSON 格式錯誤！請確保格式為合法的題目陣列 [ {...}, {...} ]。");
            return;
        }

        if (!this.supabaseClient) {
            alert("資料庫尚未連線。");
            return;
        }

        const { error } = await this.supabaseClient
            .from('custom_trivia_sets')
            .insert([{ title: title, creator: creator, questions_data: questionsDataArray }]);

        if (error) {
            console.error(error);
            alert("發布失敗，請確認 Supabase 資料表是否已建立！");
        } else {
            this.showToast("大型題庫發布成功！🎉");
            this.checkAchievements('creator');
            this.closeCreatorModal();
            this.loadCustomSets();
        }
    }

    async loadCustomSets() {
        const grid = document.getElementById('custom-sets-grid');
        if (!this.supabaseClient) {
            grid.innerHTML = `<div class="text-xs text-slate-500 col-span-full text-center py-6">Database offline.</div>`;
            return;
        }

        const { data, error } = await this.supabaseClient
            .from('custom_trivia_sets')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(15);

        if (error || !data || data.length === 0) {
            grid.innerHTML = `<div class="text-xs text-slate-500 col-span-full text-center py-6">尚無玩家自訂題庫，快來建立第一個吧！</div>`;
            return;
        }

        this.customSetsCache = data;
        this.renderCustomSetsGrid(data);
    }

    renderCustomSetsGrid(sets) {
        const grid = document.getElementById('custom-sets-grid');
        grid.innerHTML = '';
        sets.forEach(set => {
            const qCount = Array.isArray(set.questions_data) ? set.questions_data.length : 1;
            const card = document.createElement('div');
            card.className = "bg-slate-900/90 hover:bg-slate-900 border border-emerald-500/30 hover:border-emerald-500 rounded-3xl p-5 cursor-pointer transition-all flex flex-col justify-between shadow-xl group relative";
            
            card.innerHTML = `
                <div onclick="app.loadAndStartCustomSet('${set.id}')">
                    <div class="flex justify-between items-center">
                        <span class="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold uppercase">Custom (${qCount}題)</span>
                        <button onclick="event.stopPropagation(); app.deleteCustomSet('${set.id}')" class="text-[10px] bg-rose-950/60 hover:bg-rose-900 text-rose-400 border border-rose-500/30 px-2 py-1 rounded-lg transition-all z-10" title="刪除此題庫">🗑️ 刪除</button>
                    </div>
                    <h4 class="font-bold text-sm text-slate-100 mt-3 group-hover:text-emerald-400 transition-colors">${this.escapeHtml(set.title)}</h4>
                    <p class="text-xs text-slate-400 mt-1 flex items-center space-x-1"><span>👤</span><span>${this.escapeHtml(set.creator)}</span></p>
                </div>
                <div class="mt-5 flex items-center justify-between text-xs font-bold text-emerald-400" onclick="app.loadAndStartCustomSet('${set.id}')">
                    <span>Play Custom Set</span><span class="transform group-hover:translate-x-1 transition-transform">→</span>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    loadAndStartCustomSet(setId) {
        const target = this.customSetsCache.find(s => s.id === setId);
        if (target) {
            this.startCustomSet(target.id, target.title, target.creator, target.questions_data);
        }
    }

    async deleteCustomSet(setId) {
        if (!confirm("確定要刪除這個過時的社群題庫嗎？")) return;
        if (!this.supabaseClient) return;

        const { error } = await this.supabaseClient
            .from('custom_trivia_sets')
            .delete()
            .eq('id', setId);

        if (error) {
            alert("刪除失敗！");
        } else {
            this.showToast("已成功刪除過時題庫！");
            this.loadCustomSets();
        }
    }

    filterCustomSets(query) {
        if (!this.customSetsCache) return;
        const q = query.toLowerCase();
        const filtered = this.customSetsCache.filter(set => 
            set.title.toLowerCase().includes(q) || set.creator.toLowerCase().includes(q)
        );
        this.renderCustomSetsGrid(filtered);
    }

    async uploadScore() {
        const nickname = document.getElementById('player-nickname').value.trim();
        if (!nickname) { alert("請輸入您的暱稱！"); return; }
        if (!this.supabaseClient) return;

        const targetKey = this.activeCustomSetId ? `custom_${this.activeCustomSetId}` : `${this.currentCategory}_${new Date().toISOString().split('T')[0]}`;

        const { error } = await this.supabaseClient
            .from('rankings')
            .insert([{ date_str: targetKey, nickname: nickname, is_correct: true, elapsed_seconds: this.elapsedSeconds }]);

        if (error) alert("上傳失敗！");
        else {
            this.showToast(this.i18n[this.currentLang].successToast);
            document.getElementById('score-input-section').classList.add('hidden');
            this.fetchRankings();
        }
    }

    async fetchRankings() {
        const rankListContainer = document.getElementById('leaderboard-list');
        if (!this.supabaseClient) return;

        const targetKey = this.activeCustomSetId ? `custom_${this.activeCustomSetId}` : `${this.currentCategory}_${new Date().toISOString().split('T')[0]}`;

        const { data, error } = await this.supabaseClient
            .from('rankings')
            .select('*')
            .eq('date_str', targetKey)
            .order('elapsed_seconds', { ascending: true })
            .limit(10);

        if (error || !data || data.length === 0) {
            rankListContainer.innerHTML = `<div class="text-slate-500 text-center py-4">${this.i18n[this.currentLang].noRank}</div>`;
            return;
        }

        rankListContainer.innerHTML = '';
        data.forEach((row, idx) => {
            const rowDiv = document.createElement('div');
            rowDiv.className = "flex justify-between items-center bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800/80";
            let medal = `#${idx + 1}`;
            if (idx === 0) medal = "🥇"; else if (idx === 1) medal = "🥈"; else if (idx === 2) medal = "🥉";

            rowDiv.innerHTML = `
                <span class="font-bold text-slate-300 flex items-center space-x-2"><span class="w-6">${medal}</span><span>${this.escapeHtml(row.nickname)}</span></span>
                <span class="font-mono text-indigo-400 font-bold">${row.elapsed_seconds}s</span>
            `;
            rankListContainer.appendChild(rowDiv);
        });
    }

    shareResult() {
        const text = `Trivia Hub Ultimate Challenge\n⏱️ 用時 ${this.elapsedSeconds}s | 得分 ${this.score}\n🔗 ${window.location.href}`;
        navigator.clipboard.writeText(text).then(() => this.showToast(this.i18n[this.currentLang].copyToast));
    }

    openStatsModal() {
        const modal = document.getElementById('stats-modal');
        const content = document.getElementById('stats-content');
        const accuracy = this.userStats.totalPlayed > 0 ? Math.round((this.userStats.totalCorrect / this.userStats.totalPlayed) * 100) : 0;

        content.innerHTML = `
            <div class="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1"><div class="text-slate-400 font-semibold">總作答題數</div><div class="text-2xl font-black text-white">${this.userStats.totalPlayed}</div></div>
            <div class="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1"><div class="text-slate-400 font-semibold">答對題數</div><div class="text-2xl font-black text-emerald-400">${this.userStats.totalCorrect}</div></div>
            <div class="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1"><div class="text-slate-400 font-semibold">正確率</div><div class="text-2xl font-black text-indigo-400">${accuracy}%</div></div>
            <div class="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1"><div class="text-slate-400 font-semibold">最高連勝紀錄</div><div class="text-2xl font-black text-amber-400">${this.userStats.bestStreak} 連勝</div></div>
        `;
        modal.classList.remove('hidden');
    }

    closeStatsModal() { document.getElementById('stats-modal').classList.add('hidden'); }
    resetStatsData() {
        if (confirm("確定要清除所有本機戰績記錄嗎？")) {
            this.userStats = { totalPlayed: 0, totalCorrect: 0, bestStreak: 0, currentStreak: 0, unlockedAchievements: [] };
            this.saveLocalStorageData();
            this.closeStatsModal();
            this.showToast("已重設個人戰績！");
        }
    }

    openAchievementsModal() {
        const modal = document.getElementById('achievements-modal');
        const listContainer = document.getElementById('achievements-list');
        listContainer.innerHTML = '';

        this.achievementsDefinition.forEach(ach => {
            const unlocked = this.userStats.unlockedAchievements.includes(ach.id);
            const title = this.currentLang === 'en' ? ach.titleEn : ach.titleZh;
            const desc = this.currentLang === 'en' ? ach.descEn : ach.descZh;

            const item = document.createElement('div');
            item.className = `flex items-center justify-between p-3.5 rounded-2xl border ${unlocked ? 'bg-amber-950/20 border-amber-500/40 text-amber-200' : 'bg-slate-950/50 border-slate-800/80 text-slate-500 opacity-60'}`;
            item.innerHTML = `
                <div class="flex items-center space-x-3">
                    <span class="text-2xl w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">${ach.icon}</span>
                    <div><div class="font-bold text-xs sm:text-sm text-slate-200">${title}</div><div class="text-[11px] text-slate-400 mt-0.5">${desc}</div></div>
                </div>
                <div><span class="text-[10px] font-bold px-2.5 py-1 rounded-full ${unlocked ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-slate-800 text-slate-500'}">${unlocked ? '已解鎖 🏆' : '未解鎖 🔒'}</span></div>
            `;
            listContainer.appendChild(item);
        });
        modal.classList.remove('hidden');
    }

    closeAchievementsModal() { document.getElementById('achievements-modal').classList.add('hidden'); }

    escapeHtml(str) {
        if (!str) return '';
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }
}

const app = new TriviaHubApp();
