/**
 * ============================================================================
 * TRIVIA HUB ULTIMATE - 終極前端應用程式核心控制器 (JS 1000+ Lines Engine)
 * 包含完整多語言、資料持久化、成就系統、音效、題庫管理、倒數計時與全域狀態
 * ============================================================================
 */

class TriviaHubApp {
    constructor() {
        // 核心狀態變數
        this.currentLang = 'zh';
        this.currentView = 'home';
        this.currentCategory = 'daily';
        this.activeCustomSetId = null;
        
        // 遊戲運行狀態
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

        // 本機統計與成就資料
        this.userStats = {
            totalPlayed: 0,
            totalCorrect: 0,
            bestStreak: 0,
            currentStreak: 0,
            unlockedAchievements: []
        };

        // 成就定義清單
        this.achievementsDefinition = [
            { id: 'first_win', titleZh: '初試啼聲', titleEn: 'First Victory', descZh: '成功答對第一道冷知識題目', descEn: 'Successfully answer your first trivia question', icon: '🎯' },
            { id: 'streak_3', titleZh: '連戰皆捷', titleEn: 'Streak Master', descZh: '達成連續答對 3 題', descEn: 'Achieve a 3-question correct streak', icon: '🔥' },
            { id: 'speed_demon', titleZh: '閃電手速', titleEn: 'Speed Demon', descZh: '在 2 秒內極速答對題目', descEn: 'Answer a question correctly under 2 seconds', icon: '⚡' },
            { id: 'creator', titleZh: '知識播種者', titleEn: 'Knowledge Creator', descZh: '成功發布一組自訂題庫', descEn: 'Successfully publish a custom quiz set', icon: '✨' },
            { id: 'master_10', titleZh: '冷知識學者', titleEn: 'Trivia Scholar', descZh: '累計答對 10 道冷知識', descEn: 'Accumulate 10 correct answers', icon: '👑' }
        ];

        // 多語言字典檔
        this.i18n = {
            zh: {
                subtitle: "Next-Gen Trivia & Knowledge Ecosystem",
                bannerTitle: "今日精選：全球冷知識巔峰大對決",
                bannerDesc: "匯集全球最刁鑽、最有趣的科學、歷史與流行冷知識，立即挑戰個人反應速度與知識極限，登上全球排行榜！",
                startDailyBtn: "立即開始今日挑戰",
                endlessBtn: "無限生存模式",
                categoriesTitle: "官方學科與主題分類",
                customTitle: "🌐 社群自訂題庫專區 (Community Custom Sets)",
                createNavBtn: "✨ 建立新題庫",
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
                modalTitle: "建立你的自訂單選題庫",
                lblSetTitle: "題庫名稱 (Set Title)：",
                lblCreator: "您的名字或作者 (Creator)：",
                lblQText: "題目敘述 (Question Text)：",
                lblOptions: "選項 (請完整填寫 4 個選項)：",
                lblCorrect: "正確答案是第幾個選項 (1 到 4)：",
                lblExp: "冷知識解析 (Explanation)：",
                btnCancel: "取消",
                btnPublish: "發布自訂題庫 🚀",
                categories: [
                    { id: 'science', name: "科學與自然", icon: "🔬", desc: "探索天文、生物與物理世界的奧秘大小事。" },
                    { id: 'history', name: "歷史與世界", icon: "🏛️", desc: "回顧改變人類文明進程的重大歷史事件。" },
                    { id: 'geography', name: "地理與城市", icon: "🌍", desc: "考驗你對全球地標、國家與地理奇觀的熟悉度。" },
                    { id: 'popculture', name: "流行與娛樂", icon: "🎬", desc: "電影、動漫、音樂與網路迷因的趣味冷知識。" }
                ]
            },
            en: {
                subtitle: "Next-Gen Trivia & Knowledge Ecosystem",
                bannerTitle: "Daily Featured: Global Trivia Showdown",
                bannerDesc: "Explore the most intriguing science, history, and pop culture trivia. Test your speed and knowledge now!",
                startDailyBtn: "Start Daily Challenge",
                endlessBtn: "Endless Survival Mode",
                categoriesTitle: "Official Quiz Categories",
                customTitle: "🌐 Community Custom Quizzes",
                createNavBtn: "✨ Create Quiz",
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
                modalTitle: "Create Your Custom Trivia Set",
                lblSetTitle: "Set Title:",
                lblCreator: "Your Name / Creator:",
                lblQText: "Question Text:",
                lblOptions: "Options (Enter 4 options):",
                lblCorrect: "Correct Option Number (1 to 4):",
                lblExp: "Explanation:",
                btnCancel: "Cancel",
                btnPublish: "Publish Set 🚀",
                categories: [
                    { id: 'science', name: "Science & Nature", icon: "🔬", desc: "Explore astronomy, biology, and physics mysteries." },
                    { id: 'history', name: "History & World", icon: "🏛️", desc: "Review major historical events that shaped humanity." },
                    { id: 'geography', name: "Geography & Travel", icon: "🌍", desc: "Test your knowledge of world landmarks and cities." },
                    { id: 'popculture', name: "Pop Culture", icon: "🎬", desc: "Fun trivia from movies, anime, music, and memes." }
                ]
            }
        };

        // 官方精選龐大題庫集 (每類多題，單一正確答案)
        this.officialQuestions = {
            zh: {
                daily: [
                    {
                        questionText: "章魚總共有幾顆心臟？",
                        options: [{ text: "1 顆" }, { text: "2 顆" }, { text: "3 顆" }, { text: "4 顆" }],
                        correctIndex: 2,
                        explanation: "章魚擁有 3 顆心臟！其中兩顆負責將靜脈血輸送到鰓進行氣體交換，第三顆則負責將帶氧血泵送至全身器官。"
                    },
                    {
                        questionText: "下列哪一種動物的睡眠時間最短，每天平均只睡 2 小時左右？",
                        options: [{ text: "無尾熊" }, { text: "大象" }, { text: "貓頭鷹" }, { text: "樹懶" }],
                        correctIndex: 1,
                        explanation: "非洲象每天僅睡眠約 2 小時，且經常站立著打盹，因為牠們體型巨大需要大量時間進食以維持能量。"
                    },
                    {
                        questionText: "地球大氣層中，體積含量最多的氣體是哪一種？",
                        options: [{ text: "氧氣 (O2)" }, { text: "氮氣 (N2)" }, { text: "二氧化碳 (CO2)" }, { text: "氬氣 (Ar)" }],
                        correctIndex: 1,
                        explanation: "氮氣占了地球大氣乾空氣體積的約 78%，氧氣則僅占約 21%。"
                    }
                ],
                science: [
                    {
                        questionText: "太陽系的八大行星中，哪一顆行星的自轉方向與大部分行星相反（它是倒著自轉的）？",
                        options: [{ text: "水星" }, { text: "金星" }, { text: "火星" }, { text: "海王星" }],
                        correctIndex: 1,
                        explanation: "金星是太陽系中唯一自轉方向由東向西（逆向自轉）的行星，所以在金星上太陽是從西邊升起的！"
                    },
                    {
                        questionText: "人類成年人的骨骼系統中，大約有多少塊骨頭？",
                        options: [{ text: "150 塊" }, { text: "206 塊" }, { text: "270 塊" }, { text: "305 塊" }],
                        correctIndex: 1,
                        explanation: "初生嬰兒出生時約有 270 塊骨頭，隨著成長部分骨骼癒合，成年後固定為 206 塊。"
                    },
                    {
                        questionText: "光從太陽到達地球表面大約需要多少時間？",
                        options: [{ text: "約 1 秒鐘" }, { text: "約 8 分鐘 20 秒" }, { text: "約 1 小時" }, { text: "約 24 小時" }],
                        correctIndex: 1,
                        explanation: "太陽距離地球約 1.496 億公里，光速約為每秒 30 萬公里，因此光線走完這段距離大約需要 8 分 20 秒。"
                    }
                ],
                history: [
                    {
                        questionText: "古埃及法老圖坦卡門的陵墓是在哪一年被英國考古學家霍華·卡特發現的？",
                        options: [{ text: "1905 年" }, { text: "1922 年" }, { text: "1935 年" }, { text: "1950 年" }],
                        correctIndex: 1,
                        explanation: "霍華·卡特於 1922 年 11 月 4 日發現了保存極其完好的圖坦卡門陵墓入口，震驚全球考古界。"
                    },
                    {
                        questionText: "人類歷史上第一次成功登陸月球的太空任務是哪一個？",
                        options: [{ text: "阿波羅 8 號" }, { text: "阿波羅 11 號" }, { text: "國家太空人 1 號" }, { text: "聯盟號 3 號" }],
                        correctIndex: 1,
                        explanation: "美國阿波羅 11 號於 1969 年 7 月 20 日成功將尼爾·阿姆斯壯與巴茲·艾德林送上月球表面。"
                    }
                ],
                geography: [
                    {
                        questionText: "下列哪一個國家擁有世界上最多的島嶼，數量超過 20 萬個？",
                        options: [{ text: "印尼" }, { text: "日本" }, { text: "瑞典" }, { text: "菲律賓" }],
                        correctIndex: 2,
                        explanation: "瑞典擁有超過 26 萬個大大小小的島嶼和礁石，是全球擁有島嶼數量最多的國家。"
                    },
                    {
                        questionText: "橫跨歐亞兩大陸的歷史名城伊斯坦堡（Istanbul），位於哪一個國家的海峽樞紐？",
                        options: [{ text: "希臘" }, { text: "土耳其" }, { text: "埃及" }, { text: "義大利" }],
                        correctIndex: 1,
                        explanation: "伊斯坦堡是土耳其最大的城市，橫跨博斯普魯斯海峽，連接歐洲與亞洲。"
                    }
                ],
                popculture: [
                    {
                        questionText: "經典科幻電影《星際大戰》系列中，黑武士達斯·維達最著名的台詞「Luke, I am your father」實際上在電影中怎麼說的？",
                        options: [
                            { text: "“Luke, I am your father.”" },
                            { text: "“No, I am your father.”" },
                            { text: "“Obi-Wan never told you what happened to your father.”" },
                            { text: "“Search your feelings, you know it to be true.”" }
                        ],
                        correctIndex: 1,
                        explanation: "這是影史著名的曼德拉效應！達斯·維達在《帝國大反擊》中實際回應路克的是：“No, I am your father.”"
                    },
                    {
                        questionText: "日本經典動漫《精靈寶可夢》中，主角小智的第一隻寶可夢皮卡丘最初拒絕進入哪一種道具？",
                        options: [
                            { text: "高級球 (Ultra Ball)" },
                            { text: "精靈球 (Poké Ball)" },
                            { text: "超級球 (Great Ball)" },
                            { text: "大師球 (Master Ball)" }
                        ],
                        correctIndex: 1,
                        explanation: "在動畫第一集中，皮卡丘個性倔強，不願意進入普通的精靈球內，因此小智一開始總是讓皮卡丘跟在身旁走路。"
                    }
                ]
            },
            en: {
                daily: [
                    {
                        questionText: "How many hearts does an octopus have?",
                        options: [{ text: "1" }, { text: "2" }, { text: "3" }, { text: "4" }],
                        correctIndex: 2,
                        explanation: "An octopus has 3 hearts! Two pump blood to the gills, while the third pumps oxygenated blood to the rest of the body."
                    },
                    {
                        questionText: "Which animal sleeps the least, averaging only about 2 hours per day?",
                        options: [{ text: "Koala" }, { text: "Elephant" }, { text: "Owl" }, { text: "Sloth" }],
                        correctIndex: 1,
                        explanation: "African elephants sleep only about 2 hours a day and often nap standing up due to their massive size."
                    }
                ],
                science: [
                    {
                        questionText: "Which planet in our solar system rotates in the opposite direction of most other planets (retrograde rotation)?",
                        options: [{ text: "Mercury" }, { text: "Venus" }, { text: "Mars" }, { text: "Neptune" }],
                        correctIndex: 1,
                        explanation: "Venus rotates from east to west, meaning the sun rises in the west and sets in the east on Venus!"
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
        };

        // 初始化應用程式
        this.init();
    }

    /**
     * 應用程式初始化
     */
    init() {
        this.loadLocalStorageData();
        this.initSupabase();
        this.renderHome();
        this.loadCustomSets();
    }

    /**
     * 初始化 Supabase 連線
     */
    initSupabase() {
        try {
            if (window.supabase && this.supabaseUrl.includes('supabase.co')) {
                this.supabaseClient = window.supabase.createClient(this.supabaseUrl, this.supabaseKey);
            }
        } catch (e) {
            console.error("Supabase initialization error:", e);
        }
    }

    /**
     * 載入本機儲存統計與成就
     */
    loadLocalStorageData() {
        try {
            const savedStats = localStorage.getItem('trivia_hub_stats');
            if (savedStats) {
                this.userStats = JSON.parse(savedStats);
            }
        } catch (e) {
            console.error("Failed to load local storage stats:", e);
        }
    }

    /**
     * 儲存本機統計資料
     */
    saveLocalStorageData() {
        try {
            localStorage.setItem('trivia_hub_stats', JSON.stringify(this.userStats));
        } catch (e) {
            console.error("Failed to save local storage stats:", e);
        }
    }

    /**
     * 檢查並解鎖成就
     */
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
            newlyUnlocked.forEach(ach => {
                const title = this.currentLang === 'en' ? ach.titleEn : ach.titleZh;
                this.showToast(`🏅 成就解鎖：${ach.icon} ${title}！`);
            });
        }
    }

    /**
     * 顯示頂端提示吐司 (Toast)
     */
    showToast(message) {
        const toast = document.createElement('div');
        toast.className = "fixed bottom-6 right-6 z-50 bg-indigo-600 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl animate-fade-in border border-indigo-400/40 flex items-center space-x-2";
        toast.innerHTML = `<span>✨</span><span>${message}</span>`;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    /**
     * 畫面路由切換
     */
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

    /**
     * 切換語言
     */
    switchLanguage(lang) {
        this.currentLang = lang;
        this.renderHome();
        this.loadCustomSets();
        if (this.currentView === 'game' && !this.activeCustomSetId) {
            this.startCategory(this.currentCategory);
        }
    }

    /**
     * 渲染大廳首頁
     */
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
                    <span>Play Quiz</span>
                    <span class="transform group-hover:translate-x-1 transition-transform">→</span>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    /**
     * 開始每日挑戰
     */
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

    /**
     * 開始分類遊戲
     */
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

    /**
     * 開始無限生存模式
     */
    startEndlessMode() {
        this.activeCustomSetId = null;
        this.currentCategory = 'endless';
        const dict = this.i18n[this.currentLang];
        // 匯集所有官方題目作為無限題庫
        const langObj = this.officialQuestions[this.currentLang];
        let allQ = [];
        Object.keys(langObj).forEach(k => allQ = allQ.concat(langObj[k]));
        // 隨機洗牌
        this.questionsList = allQ.sort(() => Math.random() - 0.5);
        this.currentIndex = 0;
        this.score = 0;
        this.router('game');
        this.setupGameSession("♾️ 無限生存模式 (Endless Mode)", "持續答題挑戰極限");
    }

    /**
     * 開始自訂題庫遊戲
     */
    startCustomSet(setId, title, creator, questionObj) {
        this.activeCustomSetId = setId;
        const dict = this.i18n[this.currentLang];
        this.questionsList = [questionObj];
        this.currentIndex = 0;
        this.score = 0;
        this.router('game');
        this.setupGameSession(title, `${dict.creatorPrefix}${creator}`);
    }

    /**
     * 初始化遊戲階段設定
     */
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

    /**
     * 渲染單選選項
     */
    renderTriviaOptions(selectedIndex = null) {
        const listContainer = document.getElementById('options-list');
        listContainer.innerHTML = '';

        this.activeQuestion.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = "w-full text-left bg-slate-950/90 border border-slate-800 hover:border-indigo-500/80 rounded-2xl p-4 text-xs sm:text-sm font-medium text-slate-200 transition-all flex items-center justify-between group shadow-md";
            
            if (this.isGameFinished) {
                btn.disabled = true;
                if (index === this.activeQuestion.correctIndex) {
                    btn.className = "w-full text-left bg-emerald-950/70 border border-emerald-500/80 rounded-2xl p-4 text-xs sm:text-sm font-bold text-emerald-300 flex items-center justify-between shadow-lg shadow-emerald-500/10";
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

    /**
     * 啟動計時器
     */
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
                
                // 動態進度條消耗示意 (假設 30 秒為限)
                const pct = Math.max(0, 100 - (this.elapsedSeconds / 30) * 100);
                timerBar.style.width = `${pct}%`;
            }
        }, 100);
    }

    /**
     * 玩家點擊選項作答
     */
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

        // 更新統計
        this.userStats.totalPlayed++;
        if (isCorrect) {
            this.score += Math.max(100, Math.round(1000 - this.elapsedSeconds * 20));
            this.userStats.totalCorrect++;
            this.userStats.currentStreak++;
            if (this.userStats.currentStreak > this.userStats.bestStreak) {
                this.userStats.bestStreak = this.userStats.currentStreak;
            }

            resultMsg.className = "text-center font-bold text-sm sm:text-base text-emerald-400";
            resultMsg.innerText = `${dict.successMsg}${this.elapsedSeconds}s | 得分：+${this.score}`;
            document.getElementById('explanation-text').innerText = this.activeQuestion.explanation;
            
            // 慶祝特效
            confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });

            // 檢查成就
            this.checkAchievements('first_win');
            this.checkAchievements('streak_3', this.userStats.currentStreak);
            this.checkAchievements('speed_demon', this.elapsedSeconds);
            this.checkAchievements('total_correct');
        } else {
            this.userStats.currentStreak = 0;
            resultMsg.className = "text-center font-bold text-sm sm:text-base text-rose-400";
            const correctLabel = ['A', 'B', 'C', 'D'][this.activeQuestion.correctIndex];
            resultMsg.innerText = `${dict.failMsg} ${correctLabel}. ${this.activeQuestion.options[this.activeQuestion.correctIndex].text}`;
            document.getElementById('explanation-text').innerText = this.activeQuestion.explanation;
            document.getElementById('score-input-section').classList.add('hidden');
        }

        this.saveLocalStorageData();
        document.getElementById('ui-score-display').innerText = `分數：${this.score}`;
        this.renderTriviaOptions(selectedIndex);

        // 如果還有下一題，更新按鈕文字
        const nextBtn = document.getElementById('ui-next-btn');
        if (this.currentIndex < this.questionsList.length - 1) {
            nextBtn.innerText = dict.nextBtn;
        } else {
            nextBtn.innerText = dict.finishBtn;
        }
    }

    /**
     * 下一題或完成挑戰
     */
    nextQuestionOrFinish() {
        if (this.currentIndex < this.questionsList.length - 1) {
            this.currentIndex++;
            this.setupGameSession(document.getElementById('game-category-badge').innerText, document.getElementById('game-info-str').innerText);
        } else {
            this.showToast("🎉 恭喜完成此題庫所有挑戰！");
            this.router('home');
        }
    }

    // ==========================================
    // 🌐 自訂題庫與 Supabase 互動
    // ==========================================
    openCreatorModal() {
        document.getElementById('creator-modal').classList.remove('hidden');
    }

    closeCreatorModal() {
        document.getElementById('creator-modal').classList.add('hidden');
    }

    async publishCustomSet() {
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
            alert(this.currentLang === 'en' ? "Please fill in all fields!" : "請完整填寫所有欄位與 4 個選項！");
            return;
        }

        if (isNaN(correctIdxNum) || correctIdxNum < 0 || correctIdxNum > 3) {
            alert(this.currentLang === 'en' ? "Correct option must be between 1 and 4!" : "正確答案選項請填入 1 到 4 之間的數字！");
            return;
        }

        if (!this.supabaseClient) {
            alert("Database offline. Local simulation active.");
            this.closeCreatorModal();
            return;
        }

        const questionObj = {
            questionText: qText,
            options: [{ text: o0 }, { text: o1 }, { text: o2 }, { text: o3 }],
            correctIndex: correctIdxNum,
            explanation: exp || "No explanation provided."
        };

        const { error } = await this.supabaseClient
            .from('custom_trivia_sets')
            .insert([{ title: title, creator: creator, questions_data: questionObj }]);

        if (error) {
            console.error(error);
            alert("發布失敗，請確認 Supabase 資料表是否已建立！");
        } else {
            this.showToast(this.currentLang === 'en' ? "Quiz published successfully! 🎉" : "題庫發布成功！🎉");
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
            const card = document.createElement('div');
            card.className = "bg-slate-900/90 hover:bg-slate-900 border border-emerald-500/30 hover:border-emerald-500 rounded-3xl p-5 cursor-pointer transition-all flex flex-col justify-between shadow-xl group transform hover:-translate-y-1";
            card.onclick = () => this.startCustomSet(set.id, set.title, set.creator, set.questions_data);
            card.innerHTML = `
                <div>
                    <span class="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold uppercase">Community Custom</span>
                    <h4 class="font-bold text-sm text-slate-100 mt-3 group-hover:text-emerald-400 transition-colors">${this.escapeHtml(set.title)}</h4>
                    <p class="text-xs text-slate-400 mt-1 flex items-center space-x-1"><span>👤</span><span>${this.escapeHtml(set.creator)}</span></p>
                </div>
                <div class="mt-5 flex items-center justify-between text-xs font-bold text-emerald-400">
                    <span>Play Custom Set</span>
                    <span class="transform group-hover:translate-x-1 transition-transform">→</span>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    filterCustomSets(query) {
        if (!this.customSetsCache) return;
        const q = query.toLowerCase();
        const filtered = this.customSetsCache.filter(set => 
            set.title.toLowerCase().includes(q) || set.creator.toLowerCase().includes(q)
        );
        this.renderCustomSetsGrid(filtered);
    }

    // ==========================================
    // 🏆 排行榜與上傳成績
    // ==========================================
    async uploadScore() {
        const nickname = document.getElementById('player-nickname').value.trim();
        if (!nickname) {
            alert(this.currentLang === 'en' ? "Please enter your nickname!" : "請輸入您的暱稱！");
            return;
        }
        if (!this.supabaseClient) return;

        const targetKey = this.activeCustomSetId ? `custom_${this.activeCustomSetId}` : `${this.currentCategory}_${new Date().toISOString().split('T')[0]}`;

        const { error } = await this.supabaseClient
            .from('rankings')
            .insert([{ date_str: targetKey, nickname: nickname, is_correct: true, elapsed_seconds: this.elapsedSeconds }]);

        if (error) {
            alert("上傳失敗！");
        } else {
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
        const dict = this.i18n[this.currentLang];
        const text = `Trivia Hub Ultimate Challenge\n⏱️ 用時 ${this.elapsedSeconds}s | 得分 ${this.score}\n🔗 ${window.location.href}`;
        navigator.clipboard.writeText(text).then(() => this.showToast(dict.copyToast));
    }

    // ==========================================
    // 📊 個人戰績與成就視窗控制
    // ==========================================
    openStatsModal() {
        const modal = document.getElementById('stats-modal');
        const content = document.getElementById('stats-content');
        
        const accuracy = this.userStats.totalPlayed > 0 ? Math.round((this.userStats.totalCorrect / this.userStats.totalPlayed) * 100) : 0;

        content.innerHTML = `
            <div class="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <div class="text-slate-400 font-semibold">總作答題數</div>
                <div class="text-2xl font-black text-white">${this.userStats.totalPlayed}</div>
            </div>
            <div class="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <div class="text-slate-400 font-semibold">答對題數</div>
                <div class="text-2xl font-black text-emerald-400">${this.userStats.totalCorrect}</div>
            </div>
            <div class="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <div class="text-slate-400 font-semibold">正確率</div>
                <div class="text-2xl font-black text-indigo-400">${accuracy}%</div>
            </div>
            <div class="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <div class="text-slate-400 font-semibold">最高連勝紀錄</div>
                <div class="text-2xl font-black text-amber-400">${this.userStats.bestStreak} 連勝</div>
            </div>
        `;
        modal.classList.remove('hidden');
    }

    closeStatsModal() {
        document.getElementById('stats-modal').classList.add('hidden');
    }

    resetStatsData() {
        if (confirm(this.currentLang === 'en' ? "Are you sure to reset all stats?" : "確定要清除所有本機戰績記錄嗎？")) {
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
                    <div>
                        <div class="font-bold text-xs sm:text-sm text-slate-200">${title}</div>
                        <div class="text-[11px] text-slate-400 mt-0.5">${desc}</div>
                    </div>
                </div>
                <div>
                    <span class="text-[10px] font-bold px-2.5 py-1 rounded-full ${unlocked ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-slate-800 text-slate-500'}">
                        ${unlocked ? '已解鎖 🏆' : '未解鎖 🔒'}
                    </span>
                </div>
            `;
            listContainer.appendChild(item);
        });

        modal.classList.remove('hidden');
    }

    closeAchievementsModal() {
        document.getElementById('achievements-modal').classList.add('hidden');
    }

    escapeHtml(str) {
        if (!str) return '';
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }
}

// 啟動應用程式實例
const app = new TriviaHubApp();
