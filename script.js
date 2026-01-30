// ==================== 数据结构与存储 ====================
const DataStore = {
    thoughts: [],
    models: [],
    tags: {},
    nextThoughtId: 124,
    nextModelId: 81,
    currentVersion: "v22.48",
    lastSaved: null,
    // 标签分类系统
    tagCategories: {
        "核心模型": ["🧠 核心模型", "🌌 哲学/存在智慧", "🔄 系统/模型整合", "⚙️ 决策/行动", "🎭 荒诞/幽默"],
        "关系与情感": ["💞 亲密关系/情感", "💔 失去/告别", "⚖️ 期望/错位", "🌱 成长/历程", "😶 道德/伦理"],
        "时间与存在": ["⏳ 时间/宿命", "⏰ 记忆/遗忘", "🌍 存在/感知", "🌀 循环/重复", "🚶 历程/路径"],
        "艺术与表达": ["🎵 歌曲分析", "🎭 文艺批评", "🎨 艺术/象征", "🗣️ 语言/叙事", "📚 文本分析"],
        "社会与系统": ["⚔️ 反抗/边缘", "🔄 系统/结构", "🏛️ 制度/权力", "🌐 网络/连接", "⚖️ 伦理/责任"],
        "特殊状态": ["🔥 极端体验", "🌀 解构/重构", "🎯 聚焦/专注", "💡 灵感/洞见", "🛡️ 防御/保护"]
    },
    
    // 模型关联网络
    modelConnections: {
        "M-80": ["M-74", "M-78", "M-69", "M-77", "M-67"],
        "M-79": ["M-77", "M-71", "M-67"],
        "M-78": ["M-74", "M-73", "M-77", "M-76"],
        "M-77": ["M-69", "M-71", "M-67", "M-76"],
        "M-76": ["M-60", "M-71", "M-62", "M-66", "M-74"],
        "M-75": ["M-73", "M-72", "M-94"],
        "M-74": ["M-69", "M-30", "M-66", "M-67"],
        "M-73": ["M-94", "M-70", "M-72", "M-68"]
    },
    
    // 定义关键标题的多种可能形式
    sectionTitles: {
        "状态看板": [
            "💎 **状态看板**", "💎 状态看板", "状态看板:", "状态看板", "状态", "看板",
            "💡 **状态看板**", "📊 **状态看板**", "📋 **状态看板**", "系统状态", "思考状态"
        ],
        "核心结论": [
            "🌌 **核心结论**", "🌌 核心结论", "核心结论:", "核心结论", "结论", "核心观点",
            "🎯 **核心结论**", "✨ **核心结论**", "💡 **核心结论**", "主要结论", "核心发现"
        ],
        "模型延伸与整合": [
            "🧩 **模型延伸与整合**", "🧩 模型延伸与整合", "模型延伸与整合:", "模型延伸", "模型整合",
            "模型延伸与整合", "模型扩展", "整合模型", "🔗 **模型延伸与整合**", "模型关联"
        ],
        "行动/思维要点": [
            "📚 **行动/思维要点**", "📚 行动/思维要点", "行动/思维要点:", "行动思维要点",
            "行动要点", "思维要点", "要点", "行动建议", "思维建议", "🎯 **行动/思维要点**"
        ],
        "架构更新": [
            "📂 **架构更新**", "📂 架构更新", "架构更新:", "架构更新", "系统更新",
            "更新日志", "版本更新", "📈 **架构更新**", "🔄 **架构更新**"
        ]
    },
    
    // 系统演进里程碑数据
    timeline: [
        {id: "t1", version: "v1.0-v5.0", date: "2023-01", event: "基础情感模型建立（工具化、错位、遗憾）"},
        {id: "t2", version: "v6.0-v10.0", date: "2023-03", event: "关系模型深化（成熟馈赠、无限博弈）"},
        {id: "t3", version: "v11.0-v15.0", date: "2023-05", event: "存在哲学拓展（存在勘探、水性智慧）"},
        {id: "t4", version: "v16.0-v18.0", date: "2023-07", event: "防御机制与病理学完善（梦境寄生、情感麻痹）"},
        {id: "t5", version: "v18.0-v20.2", date: "2023-09", event: "关系动力学、健康共建、意义整合"},
        {id: "t6", version: "v20.3-v21.3", date: "2023-11", event: "宏观社会批判、个体生存策略、哲学框架普适化"},
        {id: "t7", version: "v21.4-v22.0", date: "2024-01", event: "亲密关系光谱、存在性寄生、熵增损耗、祛魅悬置、偶像幻灭、创伤后重建、虚无美学整合"},
        {id: "t8", version: "v22.1-v22.2", date: "2024-03", event: "双轨制架构建立，新增 M-45 至 M-53 模型"},
        {id: "t9", version: "v22.33", date: "2024-05", event: "《我们很好》×《快乐星猫》关系诊疗整合版"},
        {id: "t10", version: "v22.48", date: "2024-07", event: "《寄居》×《花》整合版，模型总数达80个"}
    ],
    
    // 当前正在编辑的时间线项目ID
    editingTimelineId: null,
    
    // 初始版本数据存储
    initialData: null,
    
    init: function() {
        const saved = localStorage.getItem('structuredThoughtAssistant');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.thoughts = data.thoughts || [];
                this.models = data.models || [];
                this.tags = data.tags || {};
                this.nextThoughtId = data.nextThoughtId || 124;
                this.nextModelId = data.nextModelId || 81;
                this.currentVersion = data.currentVersion || "v22.48";
                this.lastSaved = data.lastSaved || new Date().toISOString();
                this.timeline = data.timeline || this.timeline;
                
                // 保存初始版本数据
                this.saveInitialData();
                console.log('数据加载成功');
            } catch (e) {
                console.log('解析失败，使用默认数据', e);
                this.addExampleData();
            }
        } else {
            this.addExampleData();
        }
        
        this.save();
        this.updateUIStats();
    },
    
    // 保存初始版本数据
    saveInitialData: function() {
        if (!this.initialData) {
            this.initialData = {
                thoughts: JSON.parse(JSON.stringify(this.thoughts)),
                models: JSON.parse(JSON.stringify(this.models)),
                tags: JSON.parse(JSON.stringify(this.tags)),
                nextThoughtId: this.nextThoughtId,
                nextModelId: this.nextModelId,
                currentVersion: this.currentVersion,
                lastSaved: this.lastSaved,
                timeline: JSON.parse(JSON.stringify(this.timeline))
            };
        }
    },
    
    // 加载初始版本
    loadInitialVersion: function() {
        if (this.initialData) {
            this.thoughts = JSON.parse(JSON.stringify(this.initialData.thoughts));
            this.models = JSON.parse(JSON.stringify(this.initialData.models));
            this.tags = JSON.parse(JSON.stringify(this.initialData.tags));
            this.nextThoughtId = this.initialData.nextThoughtId;
            this.nextModelId = this.initialData.nextModelId;
            this.currentVersion = this.initialData.currentVersion;
            this.lastSaved = this.initialData.lastSaved;
            this.timeline = JSON.parse(JSON.stringify(this.initialData.timeline));
            
            console.log('已加载初始版本数据');
            return true;
        } else {
            console.log('未找到初始版本数据');
            return false;
        }
    },
    
    addExampleData: function() {
        // 添加示例结构化思考
        const exampleThought = this.parseStructuredContent(`💎 **状态看板**  
**系统版本**：v22.48（《寄居》×《花》整合版）  
**当前思考ID**：#123  
**思考主题**：《寄居》与《花》——两种关系存在论："人间烟火"的现世守护 vs "超然宿命"的循环因果  
**思考类型**：🎵 歌曲分析（关系哲学 / 时间性比较）  
**关键标记**：🧠 核心模型、💞 亲密关系/情感、⏳ 时间/宿命、🌌 哲学/存在智慧  
**关联网络**：强关联于 #116 M-74（爱作为安全基地的成长）、#121 M-78（亲密预期错位）、#111 M-69（爱的在场性重构）、#120 M-77（终局对话）、#109 M-67（理想降解与意义锚定）。本思考是对两种根本性的关系世界图景与时间性体验的对比分析。  

🌌 **核心结论：两种关系存在论的对峙——以"责任"为轴心的线性建造 vs 以"缘劫"为法则的循环认命**  
《寄居》与《花》呈现了爱情（乃至深层关系）中两种几乎无法通约的"存在论"：一种将关系视为在**线性时间**中通过**主动担责与共同行动**来建造的"人间堡垒"；另一种将关系视为在**循环时间**中被**宿命法则（缘/劫）** 所规定的"灵魂生态"。  
1.  **《寄居》：关系作为"现世的建造"**  
    *   **时间性**：**线性、前进的**。关系有明确的起点（"被你修补"）、持续的现在（"一天天练习"）、以及有待共同创造的未来（"制造壮举"）。过去的不快可以"化入风里"，未来可以"未怕兴衰"。  
    *   **核心动作**：**"庇护"与"练习"**。"请进入我双眼里寄居"是将自我转化为他者的安全容器；"越爱越天真"是通过日复一日的练习来维系关系状态。爱是**主动选择的担子**（"我的幸运事叫责任"）。  
    *   **世界图景**：世界是可能带来"教训"的崎岖之地，但**二人组成的"我们"可以在此建造一个局部稳定的"乐园"**（"青春的乐园"），以对抗外部的"末日"与"疲倦"。关系是**对抗世界熵增的局部逆流**。  
2.  **《花》：关系作为"宿命的显现"**  
    *   **时间性**：**循环、轮回的**。时间如花开花落、灵魂分合，是"灿烂—散落—枯萎—再生"的无尽循环。今生只是其中一环（"今世孽债转生再续缘"）。关系是**时间循环中的一个相位**。  
    *   **核心动作**：**"认"与"渡"**。认出关系是"命里纷纷扰扰的指引"，接受"缘聚散"的定数。个体动作是"灵魂渡过时地散聚搁浅"，是漂浮而非建造。爱是**被动承接的"债"或"缘"**。  
    *   **世界图景**：世界是一个巨大的、无法逃脱的**生态法则系统**（"浮华世界仍逃不出那生态"）。关系（花）的绽放与枯竭，是这套自然法则的体现。个人意志渺小，**关系是法则的例证，而非对抗法则的例外**。  
3.  **根本对峙**：这是 **"人义论"关系观** 与 **"神义论"（或"自然法则论"）关系观** 的诗意表达。前者相信人的责任与行动能赋予关系以意义和持久；后者相信关系的意义与期限早已被更大的宇宙法则所规定，人的角色是体认与接受。  

🧩 **模型延伸与整合**  
**1. "关系存在论"二元模型 (M-80 新建)**  
*   **定义**：描述个体在深度关系中所秉持的、关于关系之本质、时间性与能动性的根本预设框架。主要分为两种理想类型：  
    1.  **建造者模式**：认为关系本质上是**在时间中通过双方持续努力构建的实体**。时间线性，未来开放，核心能动性是**责任、庇护与共同创造**。意义源于建造过程本身。  
    2.  **体认者模式**：认为关系本质上是**在更大的宇宙或命运法则下显现的阶段性状态**。时间循环，剧本既定，核心能动性是**接受、体认与渡过**。意义源于对法则的领悟与臣服。  

📚 **行动/思维要点（审视你的关系存在论）**  
1.  【**存在论自检**】你相信关系是"建造"的还是"认命"的？  

📂 **架构更新**  
*   **新增核心模型**：**M-80 "关系存在论"二元模型** (于 #123 建立)。  
*   **系统版本**：v22.47 → **v22.48**。`);
        
        exampleThought.id = "#123";
        exampleThought.date = new Date().toISOString().split('T')[0];
        this.thoughts.push(exampleThought);
        
        // 添加示例模型
        this.addModel({
            id: "M-80",
            name: "关系存在论模型",
            description: "描述个体在深度关系中所秉持的、关于关系之本质、时间性与能动性的根本预设框架。主要分为两种理想类型：建造者模式与体认者模式。",
            date: new Date().toISOString().split('T')[0],
            tags: ["🧠 核心模型", "💞 亲密关系/情感", "🌌 哲学/存在智慧", "⏳ 时间/宿命"],
            fromThought: "#123",
            relatedModels: ["M-74", "M-78", "M-69", "M-77", "M-67"],
            usageCount: 12,
            lastUsed: "2025-07-20"
        });
        
        // 添加更多示例模型
        this.addModel({
            id: "M-79",
            name: "诠释伦理模型",
            description: "自我中心投射 vs 他者导向共情，描述在解读他人行为时的伦理立场差异",
            date: "2025-07-19",
            tags: ["🧠 核心模型", "⚖️ 伦理/责任", "🎨 艺术/象征", "🌌 哲学/存在智慧"],
            fromThought: "#122",
            relatedModels: ["M-77", "M-71", "M-67"],
            usageCount: 8,
            lastUsed: "2025-07-19"
        });
        
        this.addModel({
            id: "M-78",
            name: "亲密预期错位模型",
            description: "融合渴望 vs 距离保全，描述亲密关系中双方对距离和融合度期待的差异",
            date: "2025-07-18",
            tags: ["🧠 核心模型", "💞 亲密关系/情感", "⚖️ 期望/错位", "🌱 成长/历程"],
            fromThought: "#121",
            relatedModels: ["M-74", "M-73", "M-77", "M-76"],
            usageCount: 15,
            lastUsed: "2025-07-18"
        });
        
        // 添加更多示例思考
        const exampleThought2 = this.parseStructuredContent(`💎 **状态看板**  
**系统版本**：v22.33  
**当前思考ID**：#108  
**思考主题**：《我们很好》与《快乐星猫》——伤口镜厅与活性治愈术关系动力学  
**思考类型**：🎵 歌曲分析（关系修复 / 情感治疗）  
**关键标记**：💞 亲密关系/情感、🌱 成长/历程、💡 灵感/洞见、🔄 系统/模型整合  

🌌 **核心结论：活性治愈术模型——从静态"治疗"到动态"共同参与"的关系修复**  
《我们很好》与《快乐星猫》揭示了关系修复的两种路径：一种是通过"我们很好"的宣言性表演维持关系表象；另一种是通过"快乐星猫"式的活性互动，在关系中创造新的意义空间。  

🧩 **模型延伸与整合**  
**1. 活性治愈术模型 (M-66 新建)**  
*   **定义**：一种动态、参与式的关系修复框架，强调双方在修复过程中的共同参与和意义共创。  

📚 **行动/思维要点**  
1.  【**活性修复**】尝试将关系问题转化为双方可以共同参与的"项目"，而非需要单方面解决的"问题"。  

📂 **架构更新**  
*   **新增核心模型**：**M-66 "活性治愈术模型"** (于 #108 建立)。  
*   **系统版本**：v22.32 → **v22.33**。`);
        
        exampleThought2.id = "#108";
        exampleThought2.date = "2025-07-15";
        this.thoughts.push(exampleThought2);
        
        // 保存初始数据
        this.saveInitialData();
    },
    
    save: function() {
        const data = {
            thoughts: this.thoughts,
            models: this.models,
            tags: this.tags,
            nextThoughtId: this.nextThoughtId,
            nextModelId: this.nextModelId,
            currentVersion: this.currentVersion,
            lastSaved: new Date().toISOString(),
            timeline: this.timeline
        };
        
        try {
            localStorage.setItem('structuredThoughtAssistant', JSON.stringify(data));
            this.lastSaved = data.lastSaved;
            console.log('数据保存成功');
            return true;
        } catch (e) {
            console.error('保存数据失败:', e);
            return false;
        }
    },
    
    // ==================== 时间线编辑功能 ====================
    getTimelineById: function(id) {
        return this.timeline.find(item => item.id === id);
    },
    
    updateTimelineItem: function(id, updatedItem) {
        const index = this.timeline.findIndex(item => item.id === id);
        if (index === -1) return false;
        
        // 更新项目
        this.timeline[index] = updatedItem;
        
        // 保存数据
        this.save();
        return true;
    },
    
    addTimelineItem: function(item) {
        // 生成唯一ID
        const newId = `t${Date.now()}`;
        item.id = newId;
        
        // 添加到时间线开头
        this.timeline.unshift(item);
        
        // 保存数据
        this.save();
        return item;
    },
    
    deleteTimelineItem: function(id) {
        const index = this.timeline.findIndex(item => item.id === id);
        if (index === -1) return false;
        
        // 移除项目
        this.timeline.splice(index, 1);
        
        // 保存数据
        this.save();
        return true;
    },
    
    // ==================== 新增：分段编辑功能 ====================
    openSectionEditor: function(thoughtId) {
        const thought = this.getThoughtById(thoughtId);
        if (!thought) return null;
        
        this.editingThoughtId = thoughtId;
        
        // 初始化分段编辑内容
        this.sectionEdits = {
            "状态看板": thought.sections && thought.sections["状态看板"] ? thought.sections["状态看板"] : "",
            "核心结论": thought.sections && thought.sections["核心结论"] ? thought.sections["核心结论"] : "",
            "模型延伸与整合": thought.sections && thought.sections["模型延伸与整合"] ? thought.sections["模型延伸与整合"] : "",
            "行动/思维要点": thought.sections && thought.sections["行动/思维要点"] ? thought.sections["行动/思维要点"] : "",
            "架构更新": thought.sections && thought.sections["架构更新"] ? thought.sections["架构更新"] : ""
        };
        
        return thought;
    },
    
    saveSectionEdits: function(newId = null) {
        if (!this.editingThoughtId) return false;
        
        const thought = this.getThoughtById(this.editingThoughtId);
        if (!thought) return false;
        
        // 如果提供了新ID，更新ID
        if (newId && newId !== this.editingThoughtId) {
            // 检查新ID是否已存在
            const existingThought = this.getThoughtById(newId);
            if (existingThought && existingThought.id !== this.editingThoughtId) {
                return { success: false, message: `ID "${newId}" 已存在，请使用其他ID` };
            }
            
            // 更新ID
            thought.id = newId;
            
            // 更新所有引用此思考的模型
            this.models.forEach(model => {
                if (model.fromThought === this.editingThoughtId) {
                    model.fromThought = newId;
                }
            });
            
            // 更新思考记录的关联
            this.thoughts.forEach(t => {
                if (t.related && t.related.includes(this.editingThoughtId)) {
                    t.related = t.related.map(r => r === this.editingThoughtId ? newId : r);
                }
            });
        }
        
        // 更新各个部分的内容
        Object.keys(this.sectionEdits).forEach(section => {
            if (thought.sections) {
                thought.sections[section] = this.sectionEdits[section];
            } else {
                thought.sections = { [section]: this.sectionEdits[section] };
            }
        });
        
        // 重新解析状态看板以提取元数据
        if (this.sectionEdits["状态看板"]) {
            this.extractMetadataFromStatus(thought, this.sectionEdits["状态看板"]);
        }
        
        // 更新思考记录
        const success = this.updateThought(this.editingThoughtId, thought);
        
        // 如果ID已更改，需要更新editingThoughtId
        if (newId && newId !== this.editingThoughtId) {
            this.editingThoughtId = newId;
        }
        
        return { success, thought };
    },
    
    // ==================== 新增：数据导出功能 ====================
    exportAllData: function() {
        const data = {
            thoughts: this.thoughts,
            models: this.models,
            tags: this.tags,
            currentVersion: this.currentVersion,
            lastSaved: this.lastSaved,
            modelConnections: this.modelConnections,
            timeline: this.timeline,
            exportDate: new Date().toISOString()
        };
        
        return JSON.stringify(data, null, 2);
    },
    
    exportCurrentItem: function(type, id) {
        let item = null;
        let itemType = '';
        
        if (type === 'thought') {
            item = this.getThoughtById(id);
            itemType = '思考记录';
        } else if (type === 'model') {
            item = this.getModelById(id);
            itemType = '思维模型';
        }
        
        if (!item) return null;
        
        const data = {
            itemType: itemType,
            item: item,
            systemVersion: this.currentVersion,
            exportDate: new Date().toISOString()
        };
        
        return JSON.stringify(data, null, 2);
    },
    
    backupData: function() {
        const backupKey = 'structuredThoughtAssistant_backup_' + new Date().toISOString().split('T')[0];
        const data = this.exportAllData();
        
        try {
            localStorage.setItem(backupKey, data);
            return { success: true, key: backupKey };
        } catch (e) {
            console.error('备份数据失败:', e);
            return { success: false, error: e };
        }
    },
    
    importData: function(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            
            // 验证数据格式
            if (!data.thoughts || !data.models) {
                throw new Error('数据格式错误：缺少必要字段');
            }
            
            // 导入数据
            this.thoughts = data.thoughts;
            this.models = data.models;
            this.tags = data.tags || {};
            this.currentVersion = data.currentVersion || this.currentVersion;
            this.modelConnections = data.modelConnections || this.modelConnections;
            this.timeline = data.timeline || this.timeline;
            
            // 保存
            this.save();
            this.updateUIStats();
            
            return { success: true, message: '数据导入成功' };
        } catch (e) {
            console.error('导入数据失败:', e);
            return { success: false, error: e.message };
        }
    },
    
    // ==================== 新增：获取模型关联网络 ====================
    getModelNetwork: function(modelId) {
        const model = this.getModelById(modelId);
        if (!model) return null;
        
        const connections = this.modelConnections[modelId] || [];
        const connectedModels = connections.map(id => this.getModelById(id)).filter(m => m);
        
        return {
            center: model,
            connections: connectedModels
        };
    },
    
    // ==================== 优化版结构化内容解析器 ====================
    parseStructuredContent: function(text) {
        const thought = {
            id: null,
            title: null,
            type: null,
            date: new Date().toISOString().split('T')[0],
            tags: [],
            sections: {},
            related: [],
            newModels: [],
            systemVersion: this.currentVersion
        };
        
        // 解析状态看板部分
        const statusSection = this.extractSectionByTitles(text, "状态看板");
        if (statusSection) {
            thought.sections["状态看板"] = statusSection.content;
            
            // 从状态看板中提取元数据
            this.extractMetadataFromStatus(thought, statusSection.content);
        }
        
        // 解析核心结论部分
        const conclusionSection = this.extractSectionByTitles(text, "核心结论");
        if (conclusionSection) {
            thought.sections["核心结论"] = conclusionSection.content;
        }
        
        // 解析模型延伸与整合部分
        const modelSection = this.extractSectionByTitles(text, "模型延伸与整合");
        if (modelSection) {
            thought.sections["模型延伸与整合"] = modelSection.content;
            
            // 提取新建模型 (M-数字)
            const newModelMatches = modelSection.content.match(/M-\d+\s*(新建)?/g);
            if (newModelMatches) {
                thought.newModels = newModelMatches.map(m => m.replace(/\s*\(?新建\)?/, '').trim());
            }
            
            // 提取所有模型ID (包括已存在的)
            const allModelMatches = modelSection.content.match(/M-\d+/g);
            if (allModelMatches) {
                // 去重并排除新建模型（新建模型已经单独提取）
                const uniqueModels = [...new Set(allModelMatches)];
                // 保存所有提到的模型ID
                thought.modelReferences = uniqueModels;
            }
        }
        
        // 解析行动/思维要点部分
        const actionSection = this.extractSectionByTitles(text, "行动/思维要点");
        if (actionSection) {
            thought.sections["行动/思维要点"] = actionSection.content;
        }
        
        // 解析架构更新部分
        const updateSection = this.extractSectionByTitles(text, "架构更新");
        if (updateSection) {
            thought.sections["架构更新"] = updateSection.content;
        }
        
        // 如果没有提取到ID，自动生成一个
        if (!thought.id) {
            thought.id = `#${this.nextThoughtId}`;
            this.nextThoughtId++;
        }
        
        // 如果没有提取到标题，使用前50个字符作为标题
        if (!thought.title) {
            const lines = text.split('\n');
            const firstLine = lines.find(line => line.trim().length > 0);
            if (firstLine) {
                thought.title = firstLine.substring(0, 50).replace(/^\s*[#*\-•]+\s*/, '');
                if (firstLine.length > 50) thought.title += '...';
            } else {
                thought.title = `思考记录 ${thought.id}`;
            }
        }
        
        return thought;
    },
    
    // 根据多个可能的标题提取部分内容
    extractSectionByTitles: function(text, sectionName) {
        const titles = this.sectionTitles[sectionName];
        if (!titles || titles.length === 0) return null;
        
        // 尝试每个可能的标题
        for (const title of titles) {
            // 清理标题，去除可能干扰匹配的符号
            const cleanTitle = title.replace(/\*/g, '\\*').replace(/\//g, '\\/');
            
            // 构建正则表达式，允许标题前后有空格，后面可能有冒号
            const regex = new RegExp(`\\s*${cleanTitle}\\s*[:：]?\\s*\\n([\\s\\S]*?)(?=\\n\\s*(?:${Object.keys(this.sectionTitles).filter(k => k !== sectionName).map(k => this.sectionTitles[k].map(t => t.replace(/\*/g, '\\*').replace(/\//g, '\\/')).join('|')).join('|')}|💡|$))`, 'i');
            
            const match = text.match(regex);
            if (match && match[1]) {
                return {
                    title: title,
                    content: match[1].trim()
                };
            }
        }
        
        // 如果没有匹配到，尝试更简单的方法：查找包含关键词的行
        const lines = text.split('\n');
        let sectionStart = -1;
        let sectionContent = [];
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            
            // 检查这一行是否包含任何可能的标题
            const isTitleLine = titles.some(title => {
                const cleanTitle = title.replace(/[*💎🌌🧩📚📂]/g, '').trim();
                return line.includes(cleanTitle) && line.length < 100; // 假设标题行不会太长
            });
            
            if (isTitleLine && sectionStart === -1) {
                sectionStart = i;
            } else if (sectionStart !== -1) {
                // 检查是否开始了新的部分
                const isOtherSection = Object.keys(this.sectionTitles)
                    .filter(k => k !== sectionName)
                    .some(k => this.sectionTitles[k].some(t => {
                        const cleanTitle = t.replace(/[*💎🌌🧩📚📂]/g, '').trim();
                        return line.includes(cleanTitle) && line.length < 100;
                    }));
                
                if (isOtherSection) {
                    break;
                }
                
                // 添加到内容中
                sectionContent.push(line);
            }
        }
        
        if (sectionStart !== -1 && sectionContent.length > 0) {
            return {
                title: titles[0],
                content: sectionContent.join('\n').trim()
            };
        }
        
        return null;
    },
    
    // 从状态看板中提取元数据
    extractMetadataFromStatus: function(thought, statusText) {
        // 提取系统版本
        const versionMatch = statusText.match(/系统版本[：:]\s*(.+)/);
        if (versionMatch) thought.systemVersion = versionMatch[1].trim();
        
        // 提取思考ID
        const idMatch = statusText.match(/当前思考ID[：:]\s*(#\d+)/);
        if (idMatch) thought.id = idMatch[1].trim();
        
        // 提取思考主题
        const titleMatch = statusText.match(/思考主题[：:]\s*(.+)/);
        if (titleMatch) thought.title = titleMatch[1].trim();
        
        // 提取思考类型
        const typeMatch = statusText.match(/思考类型[：:]\s*(.+)/);
        if (typeMatch) thought.type = typeMatch[1].trim();
        
        // 提取关键标记
        const tagsMatch = statusText.match(/关键标记[：:]\s*(.+)/);
        if (tagsMatch) {
            const tagsText = tagsMatch[1];
            // 提取标签，支持用顿号、逗号、空格分隔
            thought.tags = tagsText.split(/[、，,\s]+/).filter(tag => tag.trim()).map(tag => tag.trim());
        }
        
        // 提取关联网络
        const relatedMatch = statusText.match(/关联网络[：:]\s*(.+)/);
        if (relatedMatch) {
            const relatedText = relatedMatch[1];
            // 提取关联的ID（#数字 或 M-数字）
            const relatedIds = relatedText.match(/(#\d+|M-\d+)/g);
            if (relatedIds) thought.related = relatedIds;
        }
    },
    
    // ==================== 数据操作 ====================
    addStructuredThought: function(text) {
        const thought = this.parseStructuredContent(text);
        
        // 检查ID是否已存在
        const existingIndex = this.thoughts.findIndex(t => t.id === thought.id);
        if (existingIndex >= 0) {
            // 更新现有思考
            this.thoughts[existingIndex] = thought;
        } else {
            // 添加到数组开头
            this.thoughts.unshift(thought);
        }
        
        // 更新标签
        if (thought.tags && Array.isArray(thought.tags)) {
            thought.tags.forEach(tag => {
                this.tags[tag] = (this.tags[tag] || 0) + 1;
            });
        }
        
        // 添加新建的模型
        if (thought.newModels && thought.newModels.length > 0) {
            thought.newModels.forEach(modelId => {
                // 检查模型是否已存在
                const existingModel = this.models.find(m => m.id === modelId);
                if (!existingModel) {
                    // 创建新模型
                    const newModel = {
                        id: modelId,
                        name: `新建模型 ${modelId}`,
                        description: `由思考 ${thought.id} 创建的新模型`,
                        date: new Date().toISOString().split('T')[0],
                        tags: thought.tags || [],
                        fromThought: thought.id,
                        // 从思考记录的"模型延伸与整合"中提取关联模型
                        relatedModels: thought.modelReferences ? thought.modelReferences.filter(id => id !== modelId) : []
                    };
                    
                    this.models.unshift(newModel);
                }
            });
        }
        
        // 保存数据
        this.save();
        this.updateUIStats();
        
        return thought;
    },
    
    addModel: function(modelData) {
        // 确保有ID
        if (!modelData.id) {
            modelData.id = `M-${this.nextModelId}`;
            this.nextModelId++;
        }
        
        // 添加到数组开头
        this.models.unshift(modelData);
        
        // 更新标签
        if (modelData.tags && Array.isArray(modelData.tags)) {
            modelData.tags.forEach(tag => {
                this.tags[tag] = (this.tags[tag] || 0) + 1;
            });
        }
        
        // 保存数据
        this.save();
        this.updateUIStats();
        
        return modelData;
    },
    
    getThoughtById: function(id) {
        return this.thoughts.find(t => t.id === id);
    },
    
    getModelById: function(id) {
        return this.models.find(m => m.id === id);
    },
    
    getRecentThoughts: function(limit = 5) {
        return this.thoughts.slice(0, limit);
    },
    
    getRecentModels: function(limit = 5) {
        return this.models.slice(0, limit);
    },
    
    getTopTags: function(limit = 15) {
        return Object.entries(this.tags)
            .sort((a, b) => b[1] - a[1])
            .slice(0, limit)
            .map(([tag, count]) => ({ tag, count }));
    },
    
    updateThought: function(id, updatedThought) {
        const index = this.thoughts.findIndex(t => t.id === id);
        if (index === -1) return false;
        
        // 更新思考记录
        this.thoughts[index] = updatedThought;
        
        // 重新计算标签
        this.recalculateTags();
        
        // 保存数据
        this.save();
        this.updateUIStats();
        
        return true;
    },
    
    updateModel: function(id, updatedModel) {
        const index = this.models.findIndex(m => m.id === id);
        if (index === -1) return false;
        
        // 更新模型
        this.models[index] = updatedModel;
        
        // 重新计算标签
        this.recalculateTags();
        
        // 保存数据
        this.save();
        this.updateUIStats();
        
        return true;
    },
    
    deleteThought: function(id) {
        const index = this.thoughts.findIndex(t => t.id === id);
        if (index === -1) return false;
        
        // 移除思考记录
        this.thoughts.splice(index, 1);
        
        // 重新计算标签
        this.recalculateTags();
        
        // 保存数据
        this.save();
        this.updateUIStats();
        
        return true;
    },
    
    deleteModel: function(id) {
        const index = this.models.findIndex(m => m.id === id);
        if (index === -1) return false;
        
        // 移除模型
        this.models.splice(index, 1);
        
        // 重新计算标签
        this.recalculateTags();
        
        // 保存数据
        this.save();
        this.updateUIStats();
        
        return true;
    },
    
    recalculateTags: function() {
        // 清空标签计数
        this.tags = {};
        
        // 重新统计思考记录的标签
        this.thoughts.forEach(thought => {
            if (thought.tags && Array.isArray(thought.tags)) {
                thought.tags.forEach(tag => {
                    this.tags[tag] = (this.tags[tag] || 0) + 1;
                });
            }
        });
        
        // 重新统计模型的标签
        this.models.forEach(model => {
            if (model.tags && Array.isArray(model.tags)) {
                model.tags.forEach(tag => {
                    this.tags[tag] = (this.tags[tag] || 0) + 1;
                });
            }
        });
    },
    
    updateUIStats: function() {
        // 更新统计显示
        document.getElementById('total-thoughts').textContent = this.thoughts.length;
        document.getElementById('total-models').textContent = this.models.length;
        document.getElementById('total-tags').textContent = Object.keys(this.tags).length;
        document.getElementById('current-version').textContent = this.currentVersion;
        
        // 更新最后保存时间
        if (this.lastSaved) {
            const savedTime = new Date(this.lastSaved);
            const now = new Date();
            const diffMinutes = Math.floor((now - savedTime) / (1000 * 60));
            
            let timeText = "刚刚";
            if (diffMinutes >= 60) {
                const diffHours = Math.floor(diffMinutes / 60);
                timeText = `${diffHours}小时前`;
            } else if (diffMinutes > 0) {
                timeText = `${diffMinutes}分钟前`;
            }
            
            document.getElementById('last-saved').textContent = timeText;
        }
        
        // 更新网络健康状态
        const totalModels = this.models.length;
        const connectedModels = Object.keys(this.modelConnections).length;
        const connectionRate = totalModels > 0 ? Math.round((connectedModels / totalModels) * 100) : 0;
        document.getElementById('network-health').textContent = connectionRate >= 50 ? "完好" : "待完善";
    },
    
    // ==================== 标签复核功能 ====================
    getTagSuggestions: function(existingTags = []) {
        const suggestions = [];
        
        // 获取所有标签分类
        for (const category in this.tagCategories) {
            this.tagCategories[category].forEach(tag => {
                // 如果标签不在现有标签中，则添加到建议
                if (!existingTags.includes(tag)) {
                    suggestions.push(tag);
                }
            });
        }
        
        // 按使用频率排序
        return suggestions.sort((a, b) => {
            const countA = this.tags[a] || 0;
            const countB = this.tags[b] || 0;
            return countB - countA;
        }).slice(0, 10); // 返回前10个建议
    }
};

// ==================== UI管理器 ====================
const UIManager = {
    currentView: 'overview',
    itemToDelete: null,
    deleteType: null,
    tagReviewItem: null,
    tagReviewType: null,
    currentTagsForReview: [],
    currentModelId: "M-80", // 默认选中的模型
    currentSectionTab: "状态看板", // 当前选中的分段编辑标签
    currentEditingModelId: null, // 当前正在编辑的模型ID
    currentRelatedModels: [], // 当前编辑模型的关联模型
    currentTimelineItem: null, // 当前选中的时间线项目
    
    init: function() {
        // 初始化数据存储
        DataStore.init();
        
        // 设置导航点击事件
        this.setupNavigation();
        
        // 加载初始视图
        this.loadView('overview');
        
        // 隐藏加载动画
        setTimeout(() => {
            const loadingElement = document.getElementById('loading');
            if (loadingElement) loadingElement.style.display = 'none';
        }, 300);
        
        // 设置搜索功能
        this.setupSearch();
        
        // 设置版本选择器
        this.setupVersionSelector();
        
        // 设置数据操作按钮
        this.setupDataActions();
        
        // 默认更新关联网络
        this.updateNetworkGraph();
    },
    
    setupNavigation: function() {
        document.querySelectorAll('.nav-links a').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                // 移除所有active类
                document.querySelectorAll('.nav-links a').forEach(nav => {
                    nav.classList.remove('active');
                });
                
                // 添加active类到当前项
                item.classList.add('active');
                
                // 根据data-view属性加载相应视图
                const view = item.getAttribute('data-view');
                this.loadView(view);
            });
        });
    },
    
    setupSearch: function() {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', () => {
                this.performSearch(searchInput.value);
            });
        }
    },
    
    setupVersionSelector: function() {
        const versionSelect = document.getElementById('version-select');
        if (versionSelect) {
            versionSelect.addEventListener('change', function() {
                const version = this.value;
                if (version === 'current') {
                    // 重新加载当前数据
                    DataStore.init();
                    UIManager.loadView(UIManager.currentView);
                } else if (version === 'initial') {
                    // 加载初始版本数据
                    const success = DataStore.loadInitialVersion();
                    if (success) {
                        DataStore.save();
                        UIManager.loadView(UIManager.currentView);
                        UIManager.showAlert('已加载初始版本数据', 'success');
                    } else {
                        UIManager.showAlert('加载初始版本失败', 'error');
                    }
                }
            });
        }
    },
    
    // ==================== 新增：设置数据操作按钮 ====================
    setupDataActions: function() {
        // 导出当前项目
        document.getElementById('export-current-btn').addEventListener('click', () => {
            this.exportCurrentItem();
        });
        
        // 备份全部数据
        document.getElementById('backup-data-btn').addEventListener('click', () => {
            this.backupAllData();
        });
        
        // 导入数据
        document.getElementById('import-data-btn').addEventListener('click', () => {
            this.importData();
        });
        
        // 导出全部数据
        document.getElementById('export-all-btn').addEventListener('click', () => {
            this.exportAllData();
        });
    },
    
    // ==================== 新增：更新关联网络图 ====================
    updateNetworkGraph: function(modelId = null) {
        const targetModelId = modelId || this.currentModelId;
        const network = DataStore.getModelNetwork(targetModelId);
        const networkGraph = document.getElementById('network-graph');
        
        if (!network || network.connections.length === 0) {
            networkGraph.innerHTML = `
                <div>
                    <i class="fas fa-project-diagram" style="font-size: 3rem; margin-bottom: 10px; color: #ccc;"></i>
                    <p>选择模型查看关联网络</p>
                </div>
            `;
            return;
        }
        
        // 创建关联网络可视化
        let html = `
            <div style="text-align: center;">
                <div style="font-size: 1.2rem; font-weight: bold; color: var(--primary-color); margin-bottom: 15px;">
                    ${network.center.id}
                </div>
                <div class="network-visualization">
        `;
        
        // 显示关联模型
        network.connections.forEach((model, index) => {
            if (index > 0) {
                html += `<div class="network-connection"></div>`;
            }
            html += `
                <div class="network-node" onclick="UIManager.selectItem('${model.id}', 'model')">
                    ${model.id}
                </div>
            `;
        });
        
        html += `
                </div>
                <p style="margin-top: 20px; color: var(--text-light); font-size: 0.9rem;">
                    与 ${network.connections.length} 个核心模型关联
                </p>
            </div>
        `;
        
        networkGraph.innerHTML = html;
    },
    
    loadView: function(view) {
        this.currentView = view;
        
        // 更新顶部状态栏
        const viewNames = {
            overview: "核心资产总览",
            "add-structured": "结构化输入思考",
            thoughts: "思考目录完整清单",
            models: "核心思维模型索引",
            "add-model": "创建思维模型",
            keywords: "标签分类检索",
            "how-to-use": "如何使用本系统",
            milestones: "系统演进里程碑",
            architecture: "系统架构特性",
            "tag-review": "标签复核中心",
            // 新增视图
            "network-analysis": "模型关联网络分析",
            "timeline": "系统演进历程",
            "data-management": "数据管理与备份"
        };
        
        document.getElementById('current-view').textContent = viewNames[view] || view;
        
        // 显示加载中
        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = '<div id="loading" class="loading" style="margin: 100px auto;"></div>';
        
        // 根据视图类型加载内容
        setTimeout(() => {
            switch(view) {
                case 'overview':
                    this.renderOverview();
                    break;
                case 'add-structured':
                    this.renderAddStructured();
                    break;
                case 'thoughts':
                    this.renderThoughts();
                    break;
                case 'models':
                    this.renderModels();
                    break;
                case 'add-model':
                    this.renderAddModel();
                    break;
                case 'keywords':
                    this.renderKeywords();
                    break;
                case 'how-to-use':
                    this.renderHowToUse();
                    break;
                case 'milestones':
                    this.renderMilestones();
                    break;
                case 'architecture':
                    this.renderArchitecture();
                    break;
                case 'tag-review':
                    this.renderTagReview();
                    break;
                // 新增视图渲染
                case 'network-analysis':
                    this.renderNetworkAnalysis();
                    break;
                case 'timeline':
                    this.renderTimeline();
                    break;
                case 'data-management':
                    this.renderDataManagement();
                    break;
                default:
                    this.renderOverview();
            }
        }, 100);
    },
    
    // ==================== 新增：系统演进历程视图 ====================
    renderTimeline: function() {
        const timeline = DataStore.timeline;
        
        let timelineHTML = '';
        timeline.forEach((item, index) => {
            const isCurrent = index === 0;
            const dotColor = isCurrent ? 'var(--primary-color)' : 'var(--secondary-color)';
            
            timelineHTML += `
                <div class="timeline-item" onclick="UIManager.showTimelineDetail('${item.id}')">
                    <div class="timeline-edit-actions">
                        <div class="timeline-edit-btn edit" onclick="event.stopPropagation(); UIManager.openTimelineEditModal('${item.id}')" title="编辑">
                            <i class="fas fa-edit"></i>
                        </div>
                        <div class="timeline-edit-btn delete" onclick="event.stopPropagation(); UIManager.openDeleteModal('timeline', '${item.id}')" title="删除">
                            <i class="fas fa-trash"></i>
                        </div>
                    </div>
                    <div class="timeline-dot" style="background: ${dotColor};"></div>
                    <div class="timeline-content">
                        <div class="timeline-version">${item.version}</div>
                        <div class="timeline-date">${item.date}</div>
                        <p>${item.event}</p>
                    </div>
                </div>
            `;
        });
        
        const html = `
            <div class="content-header">
                <h2>系统演进历程</h2>
                <p>系统版本: ${DataStore.currentVersion} | 从初始概念到完整知识体系的成长路径</p>
            </div>
            
            ${this.currentTimelineItem ? this.renderTimelineDetail() : `
            <div class="timeline-actions">
                <button class="btn btn-success" onclick="UIManager.openTimelineEditModal()">
                    <i class="fas fa-plus"></i> 添加新记录
                </button>
            </div>
            
            <div class="detail-view">
                <div class="timeline-container">
                    <div class="timeline-line"></div>
                    ${timelineHTML}
                </div>
                
                <div class="detail-section">
                    <h4><i class="fas fa-chart-line"></i> 演进统计</h4>
                    <div class="detail-section-content">
                        <p><strong>总时长：</strong>${timeline.length} 个主要版本，跨越 ${Math.ceil(timeline.length / 2)} 个发展阶段</p>
                        <p><strong>当前阶段：</strong>${timeline[0].version} - ${timeline[0].event}</p>
                        <p><strong>关键里程碑：</strong>系统从简单的情感模型发展到包含80+模型的完整知识体系</p>
                    </div>
                </div>
            </div>
            `}
        `;
        
        document.getElementById('content-area').innerHTML = html;
    },
    
    // ==================== 新增：时间线详情页 ====================
    showTimelineDetail: function(timelineId) {
        const item = DataStore.getTimelineById(timelineId);
        if (!item) return;
        
        this.currentTimelineItem = item;
        this.renderTimeline();
    },
    
    renderTimelineDetail: function() {
        const item = this.currentTimelineItem;
        if (!item) return '';
        
        return `
            <div class="detail-view">
                <div class="timeline-detail-header">
                    <div>
                        <div class="timeline-detail-title">${item.version}</div>
                        <div class="timeline-detail-date">${item.date}</div>
                    </div>
                    <div style="color: var(--text-light); font-size: 0.9rem;">系统演进记录</div>
                </div>
                
                <div class="action-buttons">
                    <button class="btn btn-warning" onclick="UIManager.openTimelineEditModal('${item.id}')">
                        <i class="fas fa-edit"></i> 编辑此记录
                    </button>
                    <button class="btn btn-danger" onclick="UIManager.openDeleteModal('timeline', '${item.id}')">
                        <i class="fas fa-trash"></i> 删除此记录
                    </button>
                    <button class="btn btn-secondary" onclick="UIManager.hideTimelineDetail()">
                        <i class="fas fa-arrow-left"></i> 返回时间线
                    </button>
                </div>
                
                <div class="timeline-detail-content">
                    <p>${item.event}</p>
                </div>
                
                <div class="detail-section">
                    <h4><i class="fas fa-info-circle"></i> 关联信息</h4>
                    <div class="detail-section-content">
                        <p><strong>版本号：</strong>${item.version}</p>
                        <p><strong>发布时间：</strong>${item.date}</p>
                        <p><strong>事件描述：</strong>${item.event}</p>
                    </div>
                </div>
            </div>
        `;
    },
    
    hideTimelineDetail: function() {
        this.currentTimelineItem = null;
        this.renderTimeline();
    },
    
    // ==================== 新增：时间线编辑模态框 ====================
    openTimelineEditModal: function(timelineId = null) {
        const modal = document.getElementById('timeline-edit-modal');
        const versionInput = document.getElementById('timeline-edit-version');
        const dateInput = document.getElementById('timeline-edit-date');
        const eventInput = document.getElementById('timeline-edit-event');
        
        if (timelineId) {
            // 编辑现有项目
            const item = DataStore.getTimelineById(timelineId);
            if (!item) return;
            
            DataStore.editingTimelineId = timelineId;
            versionInput.value = item.version;
            dateInput.value = item.date;
            eventInput.value = item.event;
        } else {
            // 添加新项目
            DataStore.editingTimelineId = null;
            versionInput.value = '';
            dateInput.value = '';
            eventInput.value = '';
        }
        
        modal.style.display = 'flex';
    },
    
    closeTimelineEditModal: function() {
        document.getElementById('timeline-edit-modal').style.display = 'none';
        DataStore.editingTimelineId = null;
    },
    
    saveTimelineEdit: function() {
        const versionInput = document.getElementById('timeline-edit-version');
        const dateInput = document.getElementById('timeline-edit-date');
        const eventInput = document.getElementById('timeline-edit-event');
        
        const version = versionInput.value.trim();
        const date = dateInput.value.trim();
        const eventText = eventInput.value.trim();
        
        if (!version || !date || !eventText) {
            alert('请填写所有字段');
            return;
        }
        
        let success = false;
        let message = '';
        
        if (DataStore.editingTimelineId) {
            // 更新现有项目
            const updatedItem = {
                id: DataStore.editingTimelineId,
                version: version,
                date: date,
                event: eventText
            };
            
            success = DataStore.updateTimelineItem(DataStore.editingTimelineId, updatedItem);
            message = '时间线记录已更新';
        } else {
            // 添加新项目
            const newItem = {
                version: version,
                date: date,
                event: eventText
            };
            
            const result = DataStore.addTimelineItem(newItem);
            success = result !== false;
            message = '时间线记录已添加';
        }
        
        if (success) {
            this.closeTimelineEditModal();
            this.showAlert(message, 'success');
            
            // 重新渲染时间线视图
            if (this.currentView === 'timeline') {
                this.renderTimeline();
            }
        } else {
            alert('保存失败');
        }
    },
    
    // ==================== 新增：分段编辑模态框 ====================
    openSectionEditorModal: function(thoughtId) {
        const thought = DataStore.openSectionEditor(thoughtId);
        if (!thought) {
            alert('未找到思考记录');
            return;
        }
        
        // 渲染分段编辑界面
        this.renderSectionEditorModal(thought);
        
        // 显示模态框
        document.getElementById('section-edit-modal').style.display = 'flex';
    },
    
    renderSectionEditorModal: function(thought) {
        const tabsContainer = document.getElementById('section-tabs');
        const editorsContainer = document.getElementById('section-editors-container');
        
        // 设置思考ID输入框
        document.getElementById('edit-thought-id').value = thought.id;
        
        // 生成标签页
        const sections = ["状态看板", "核心结论", "模型延伸与整合", "行动/思维要点", "架构更新"];
        let tabsHtml = '';
        let editorsHtml = '';
        
        sections.forEach(section => {
            const isActive = section === this.currentSectionTab;
            const icon = this.getSectionIcon(section);
            
            // 标签页
            tabsHtml += `
                <div class="section-tab ${isActive ? 'active' : ''}" data-section="${section}" onclick="UIManager.switchSectionTab('${section}')">
                    ${icon} ${section}
                </div>
            `;
            
            // 编辑器
            const content = DataStore.sectionEdits[section] || '';
            editorsHtml += `
                <div class="section-editor ${isActive ? 'active' : ''}" id="editor-${section}">
                    <div class="section-editor-header">
                        <h4>${icon} ${section}</h4>
                        <button class="btn btn-secondary btn-sm" onclick="UIManager.updateSectionPreview('${section}')" style="padding: 5px 10px; font-size: 0.9rem;">
                            <i class="fas fa-eye"></i> 预览
                        </button>
                    </div>
                    <textarea id="textarea-${section}" placeholder="请输入${section}内容..." style="min-height: 250px;">${content}</textarea>
                    <div class="section-preview" id="preview-${section}">
                        ${content ? content.substring(0, 200) + (content.length > 200 ? '...' : '') : '暂无内容'}
                    </div>
                </div>
            `;
        });
        
        tabsContainer.innerHTML = tabsHtml;
        editorsContainer.innerHTML = editorsHtml;
        
        // 为所有文本区域添加输入事件监听
        sections.forEach(section => {
            const textarea = document.getElementById(`textarea-${section}`);
            if (textarea) {
                textarea.addEventListener('input', () => {
                    DataStore.sectionEdits[section] = textarea.value;
                });
            }
        });
    },
    
    switchSectionTab: function(section) {
        this.currentSectionTab = section;
        
        // 更新标签页状态
        document.querySelectorAll('.section-tab').forEach(tab => {
            tab.classList.toggle('active', tab.getAttribute('data-section') === section);
        });
        
        // 更新编辑器显示状态
        document.querySelectorAll('.section-editor').forEach(editor => {
            editor.classList.toggle('active', editor.id === `editor-${section}`);
        });
    },
    
    updateSectionPreview: function(section) {
        const textarea = document.getElementById(`textarea-${section}`);
        const preview = document.getElementById(`preview-${section}`);
        
        if (textarea && preview) {
            const content = textarea.value;
            DataStore.sectionEdits[section] = content;
            preview.textContent = content || '暂无内容';
        }
    },
    
    closeSectionEditModal: function() {
        document.getElementById('section-edit-modal').style.display = 'none';
        DataStore.editingThoughtId = null;
        DataStore.sectionEdits = {
            "状态看板": "",
            "核心结论": "",
            "模型延伸与整合": "",
            "行动/思维要点": "",
            "架构更新": ""
        };
    },
    
    getSectionIcon: function(section) {
        const icons = {
            "状态看板": "💎",
            "核心结论": "🌌",
            "模型延伸与整合": "🧩",
            "行动/思维要点": "📚",
            "架构更新": "📂"
        };
        return icons[section] || "📝";
    },
    
    // ==================== 视图渲染 ====================
    renderOverview: function() {
        const html = `
            <div class="content-header">
                <h2>核心资产总览</h2>
                <p>系统版本: ${DataStore.currentVersion} | 本地存储数据状态</p>
            </div>
            
            <div class="stats-grid">
                <div class="stat-card">
                    <h3><i class="fas fa-brain"></i> 思考记录总数</h3>
                    <div class="stat-value">${DataStore.thoughts.length}</div>
                    <div class="stat-desc">完整结构化思考条目</div>
                </div>
                
                <div class="stat-card">
                    <h3><i class="fas fa-cubes"></i> 核心思维模型</h3>
                    <div class="stat-value">${DataStore.models.length}</div>
                    <div class="stat-desc">可迁移的分析框架</div>
                </div>
                
                <div class="stat-card">
                    <h3><i class="fas fa-tags"></i> 标签关键词</h3>
                    <div class="stat-value">${Object.keys(DataStore.tags).length}</div>
                    <div class="stat-desc">跨主题分类标签</div>
                </div>
                
                <div class="stat-card">
                    <h3><i class="fas fa-heartbeat"></i> 系统健康度</h3>
                    <div class="stat-value">100%</div>
                    <div class="stat-desc">架构高度自洽，功能完整</div>
                </div>
            </div>
            
            <div class="detail-view">
                <div class="detail-header">
                    <div>
                        <div class="detail-title">系统架构特性</div>
                    </div>
                </div>
                <div class="detail-content">
                    <p><strong>开放网络：</strong>模型可无限拓展，主题不受限</p>
                    <p><strong>多层结构：</strong>"核心模型层"、"现象分析层"、"实践工具箱"三层协同运作</p>
                    <p><strong>智能解析：</strong>支持灵活格式的结构化内容解析，自动提取关键信息</p>
                    <p><strong>本地存储：</strong>所有数据保存在浏览器本地，确保隐私安全</p>
                    <p><strong>完整功能：</strong>具备增删改查、标签复核、搜索过滤等完整管理功能</p>
                    <p><strong>数据管理：</strong>新增数据导出/导入、备份恢复、关联网络分析功能</p>
                    <p><strong>分段编辑：</strong>支持单独编辑思考记录的各个板块内容</p>
                    <p><strong>时间线编辑：</strong>支持编辑系统演进历程记录</p>
                    <p><strong>关联模型自动提取：</strong>从"来源思考"的"模型延伸与整合"中自动提取关联模型ID</p>
                    <p><strong>模型描述自动提取：</strong>在编辑模型时，可以从来源思考中自动提取"新建核心模型"标题下的内容作为模型描述</p>
                </div>
            </div>
        `;
        
        document.getElementById('content-area').innerHTML = html;
    },
    
    // ==================== 新增：模型关联网络分析视图 ====================
    renderNetworkAnalysis: function() {
        const models = DataStore.models;
        
        // 获取所有有关联的模型
        const connectedModels = models.filter(model => {
            return DataStore.modelConnections[model.id] && DataStore.modelConnections[model.id].length > 0;
        });
        
        // 按连接数排序
        connectedModels.sort((a, b) => {
            const connectionsA = DataStore.modelConnections[a.id] ? DataStore.modelConnections[a.id].length : 0;
            const connectionsB = DataStore.modelConnections[b.id] ? DataStore.modelConnections[b.id].length : 0;
            return connectionsB - connectionsA;
        });
        
        let modelsHTML = '';
        connectedModels.forEach(model => {
            const connections = DataStore.modelConnections[model.id] || [];
            
            modelsHTML += `
                <div class="model-card" onclick="showModelDetail('${model.id}')">
                    <div class="model-id">${model.id}</div>
                    <div class="model-name">${model.name}</div>
                    <div class="model-desc">关联 ${connections.length} 个模型</div>
                    <div class="model-tags">
                        ${connections.slice(0, 3).map(id => `<span class="tag">${id}</span>`).join('')}
                        ${connections.length > 3 ? `<span class="tag">+${connections.length - 3}更多</span>` : ''}
                    </div>
                </div>
            `;
        });
        
        const html = `
            <div class="content-header">
                <h2>模型关联网络分析</h2>
                <p>系统版本: ${DataStore.currentVersion} | 可视化展示模型间的关联关系</p>
            </div>
            
            <div class="detail-view">
                <div class="detail-section">
                    <h4><i class="fas fa-project-diagram"></i> 网络概览</h4>
                    <div class="detail-section-content">
                        <p>系统中共有 <strong>${connectedModels.length}</strong> 个模型建立了关联网络，形成了复杂的概念关联体系。</p>
                        <p>关联网络有助于理解模型间的逻辑关系，发现知识体系中的关键节点和薄弱环节。</p>
                    </div>
                </div>
                
                <div class="detail-section">
                    <h4><i class="fas fa-cube"></i> 高度关联模型</h4>
                    <div class="detail-section-content">
                        <p>以下模型拥有最多的关联连接，是系统知识网络的核心节点：</p>
                    </div>
                </div>
                
                <div class="models-list">
                    ${modelsHTML || '<div class="empty-state"><i class="fas fa-project-diagram"></i><p>暂无模型关联数据</p></div>'}
                </div>
                
                <div class="detail-section">
                    <h4><i class="fas fa-lightbulb"></i> 网络分析建议</h4>
                    <div class="detail-section-content">
                        <ol>
                            <li><strong>识别核心节点：</strong>关注关联数最多的模型，它们是知识体系的核心</li>
                            <li><strong>发现知识孤岛：</strong>检查没有关联的模型，考虑是否需要建立连接</li>
                            <li><strong>优化网络结构：</strong>确保重要概念之间有足够的连接路径</li>
                            <li><strong>追踪概念演进：</strong>通过关联网络理解概念的发展和演变</li>
                        </ol>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('content-area').innerHTML = html;
    },
    
    // ==================== 新增：数据管理与备份视图 ====================
    renderDataManagement: function() {
        const backupKeys = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('structuredThoughtAssistant_backup_')) {
                backupKeys.push(key);
            }
        }
        
        let backupsHTML = '';
        if (backupKeys.length > 0) {
            backupKeys.forEach(key => {
                const date = key.replace('structuredThoughtAssistant_backup_', '');
                backupsHTML += `
                    <div class="index-item">
                        <div class="index-item-id">备份</div>
                        <div class="index-item-title">${date}</div>
                        <div class="index-item-actions">
                            <span class="index-item-action" onclick="UIManager.restoreBackup('${key}')" title="恢复此备份">
                                <i class="fas fa-history" style="color: var(--warning-color);"></i>
                            </span>
                            <span class="index-item-action" onclick="UIManager.deleteBackup('${key}')" title="删除备份">
                                <i class="fas fa-trash" style="color: var(--danger-color);"></i>
                            </span>
                        </div>
                    </div>
                `;
            });
        } else {
            backupsHTML = '<div class="empty-state" style="padding: 20px;"><i class="fas fa-history"></i><p>暂无备份数据</p></div>';
        }
        
        const html = `
            <div class="content-header">
                <h2>数据管理与备份</h2>
                <p>系统版本: ${DataStore.currentVersion} | 确保知识资产的安全与可迁移性</p>
            </div>
            
            <div class="detail-view">
                <div class="detail-section">
                    <h4><i class="fas fa-database"></i> 当前数据状态</h4>
                    <div class="detail-section-content">
                        <p><strong>思考记录：</strong>${DataStore.thoughts.length} 条</p>
                        <p><strong>思维模型：</strong>${DataStore.models.length} 个</p>
                        <p><strong>标签分类：</strong>${Object.keys(DataStore.tags).length} 个</p>
                        <p><strong>最后保存：</strong>${DataStore.lastSaved ? new Date(DataStore.lastSaved).toLocaleString() : '未知'}</p>
                        <p><strong>数据大小：</strong>约 ${JSON.stringify(DataStore).length} 字节</p>
                    </div>
                </div>
                
                <div class="detail-section">
                    <h4><i class="fas fa-download"></i> 数据导出</h4>
                    <div class="detail-section-content">
                        <div class="action-buttons">
                            <button class="btn btn-primary" onclick="UIManager.exportAllData()">
                                <i class="fas fa-file-export"></i> 导出全部数据
                            </button>
                            <button class="btn btn-secondary" onclick="UIManager.exportCurrentItem()">
                                <i class="fas fa-export"></i> 导出当前项目
                            </button>
                        </div>
                        <p style="margin-top: 10px; color: var(--text-light); font-size: 0.9rem;">
                            导出的数据为JSON格式，可在其他设备或浏览器中导入恢复。
                        </p>
                    </div>
                </div>
                
                <div class="detail-section">
                    <h4><i class="fas fa-sync-alt"></i> 数据备份与恢复</h4>
                    <div class="detail-section-content">
                        <div class="action-buttons">
                            <button class="btn btn-success" onclick="UIManager.backupAllData()">
                                <i class="fas fa-save"></i> 创建备份
                            </button>
                            <button class="btn btn-warning" onclick="UIManager.importData()">
                                <i class="fas fa-file-import"></i> 导入数据
                            </button>
                            <button class="btn btn-danger" onclick="UIManager.resetData()">
                                <i class="fas fa-trash"></i> 重置数据
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="detail-section">
                    <h4><i class="fas fa-history"></i> 备份记录</h4>
                    <div class="index-panel">
                        <div class="index-list">
                            ${backupsHTML}
                        </div>
                    </div>
                </div>
                
                <div class="detail-section">
                    <h4><i class="fas fa-lightbulb"></i> 数据安全提示</h4>
                    <div class="detail-section-content">
                        <ol>
                            <li><strong>定期备份：</strong>建议每周至少备份一次数据</li>
                            <li><strong>异地存储：</strong>将导出的数据文件保存在云盘或其他安全位置</li>
                            <li><strong>版本管理：</strong>重要更新前创建备份，便于回滚</li>
                            <li><strong>数据验证：</strong>定期检查数据完整性，确保无损坏</li>
                        </ol>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('content-area').innerHTML = html;
    },
    
    renderAddStructured: function() {
        const html = `
            <div class="content-header">
                <h2>结构化输入思考内容</h2>
                <p>按照灵活格式输入，系统将智能解析并归类</p>
            </div>
            
            <div class="format-hint">
                <i class="fas fa-lightbulb"></i> <strong>格式说明：</strong> 系统会智能识别以下关键部分，不要求格式完全一致：
                <div style="margin-top: 10px; font-size: 0.9rem;">
                    <div><strong>状态看板</strong> - 描述思考的基本信息</div>
                    <div><strong>核心结论</strong> - 主要观点和发现</div>
                    <div><strong>模型延伸与整合</strong> - 模型扩展和关联</div>
                    <div><strong>行动/思维要点</strong> - 行动建议和思考要点</div>
                    <div><strong>架构更新</strong> - 系统或模型的更新</div>
                </div>
            </div>
            
            <div class="input-section">
                <h3>输入思考内容</h3>
                <textarea id="structured-input" placeholder="请输入您的思考内容，系统会智能识别各个部分..."></textarea>
                <div class="btn-group">
                    <button class="btn btn-primary" onclick="parseAndPreview()">
                        <i class="fas fa-search"></i> 解析预览
                    </button>
                    <button class="btn btn-success" onclick="saveStructuredThought()">
                        <i class="fas fa-save"></i> 保存思考
                    </button>
                </div>
                <div id="parse-preview" class="parse-preview">
                    <!-- 解析预览将通过JavaScript动态生成 -->
                </div>
            </div>
            
            <div class="index-panel">
                <h4><i class="fas fa-history"></i> 最近添加的思考记录</h4>
                <div id="recent-thoughts-list">
                    ${this.renderThoughtList(DataStore.getRecentThoughts(3), true)}
                </div>
            </div>
        `;
        
        document.getElementById('content-area').innerHTML = html;
    },
    
    renderThoughts: function() {
        const thoughts = DataStore.thoughts;
        
        let thoughtsHTML = '';
        thoughts.forEach(thought => {
            const summary = thought.sections && thought.sections["核心结论"] ? 
                thought.sections["核心结论"].substring(0, 80) + '...' : 
                (thought.content ? thought.content.substring(0, 80) + '...' : '');
            
            thoughtsHTML += `
                <div class="record-card" onclick="showThoughtDetail('${thought.id}')">
                    <div class="card-actions">
                        <div class="action-icon edit" onclick="event.stopPropagation(); editThought('${thought.id}')" title="编辑">
                            <i class="fas fa-edit"></i>
                        </div>
                        <div class="action-icon delete" onclick="event.stopPropagation(); openDeleteModal('thought', '${thought.id}')" title="删除">
                            <i class="fas fa-trash"></i>
                        </div>
                    </div>
                    <div class="record-id">${thought.id}</div>
                    <div class="record-title">${thought.title || '无标题'}</div>
                    <div class="record-desc">${summary}</div>
                    <div class="record-tags">
                        ${thought.tags ? thought.tags.map(tag => `<span class="tag">${tag}</span>`).join('') : ''}
                    </div>
                </div>
            `;
        });
        
        const html = `
            <div class="content-header">
                <h2>思考目录完整清单</h2>
                <p>系统版本: ${DataStore.currentVersion} | 共 ${DataStore.thoughts.length} 条思考记录</p>
            </div>
            
            <div class="records-list">
                ${thoughtsHTML || '<div class="empty-state"><i class="fas fa-inbox"></i><p>暂无思考记录</p></div>'}
            </div>
        `;
        
        document.getElementById('content-area').innerHTML = html;
    },
    
    renderModels: function() {
        const models = DataStore.models;
        
        let modelsHTML = '';
        models.forEach(model => {
            modelsHTML += `
                <div class="model-card" onclick="showModelDetail('${model.id}')">
                    <div class="card-actions">
                        <div class="action-icon edit" onclick="event.stopPropagation(); editModel('${model.id}')" title="编辑">
                            <i class="fas fa-edit"></i>
                        </div>
                        <div class="action-icon delete" onclick="event.stopPropagation(); openDeleteModal('model', '${model.id}')" title="删除">
                            <i class="fas fa-trash"></i>
                        </div>
                    </div>
                    <div class="model-id">${model.id}</div>
                    <div class="model-name">${model.name}</div>
                    <div class="model-desc">${model.description.substring(0, 100)}...</div>
                    <div class="model-tags">
                        ${model.tags ? model.tags.map(tag => `<span class="tag">${tag}</span>`).join('') : ''}
                    </div>
                </div>
            `;
        });
        
        const html = `
            <div class="content-header">
                <h2>核心思维模型索引</h2>
                <p>系统版本: ${DataStore.currentVersion} | 共 ${DataStore.models.length} 个思维模型</p>
            </div>
            
            <div class="models-list">
                ${modelsHTML || '<div class="empty-state"><i class="fas fa-cubes"></i><p>暂无思维模型</p></div>'}
            </div>
        `;
        
        document.getElementById('content-area').innerHTML = html;
    },
    
    renderAddModel: function() {
        const html = `
            <div class="content-header">
                <h2>创建思维模型</h2>
                <p>定义新的思维框架和分析模型</p>
            </div>
            
            <div class="input-section">
                <h3>新的模型</h3>
                <input type="text" id="model-id" placeholder="模型ID (例如: M-80)">
                <input type="text" id="model-name" placeholder="模型名称（例如：关系存在论模型）">
                <input type="text" id="model-from-thought" placeholder="来源思考ID (例如: #123)">
                <textarea id="model-description" placeholder="请详细描述这个模型的定义、应用场景、关联模型等..." style="min-height: 200px;"></textarea>
                <div class="btn-group">
                    <button class="btn btn-primary" onclick="saveModel()">
                        <i class="fas fa-save"></i> 保存模型
                    </button>
                </div>
            </div>
            
            <div class="index-panel">
                <h4><i class="fas fa-history"></i> 最近添加的思维模型</h4>
                <div id="recent-models-list">
                    ${this.renderModelList(DataStore.getRecentModels(3), true)}
                </div>
            </div>
        `;
        
        document.getElementById('content-area').innerHTML = html;
    },
    
    renderKeywords: function() {
        const topTags = DataStore.getTopTags(20);
        
        let tagsHTML = '';
        topTags.forEach(({ tag, count }) => {
            tagsHTML += `<span class="tag" style="cursor:pointer; font-size: ${14 + Math.min(count, 10)}px;" onclick="filterByTag('${tag}')">${tag} (${count})</span>`;
        });
        
        const html = `
            <div class="content-header">
                <h2>标签分类检索</h2>
                <p>系统版本: ${DataStore.currentVersion} | 共 ${Object.keys(DataStore.tags).length} 个标签</p>
            </div>
            
            <div class="detail-view">
                <div class="detail-content">
                    <h4>热门标签</h4>
                    <div class="tag-cloud" style="margin-top: 15px; margin-bottom: 25px;">
                        ${tagsHTML}
                    </div>
                    
                    <h4>标签分类体系</h4>
                    ${Object.keys(DataStore.tagCategories).map(category => `
                        <div class="detail-section">
                            <h4>${category}</h4>
                            <div class="detail-section-content">
                                ${DataStore.tagCategories[category].map(tag => {
                                    const count = DataStore.tags[tag] || 0;
                                    return `<span class="tag" style="cursor:pointer; margin-right: 8px; margin-bottom: 8px;" onclick="filterByTag('${tag}')">${tag} ${count > 0 ? `(${count})` : ''}</span>`;
                                }).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        document.getElementById('content-area').innerHTML = html;
    },
    
    renderHowToUse: function() {
        const html = `
            <div class="content-header">
                <h2>如何使用本系统</h2>
                <p>将深刻分析从"关于他人的知识"转化为"关于自我的智慧"</p>
            </div>
            
            <div class="detail-view">
                <div class="detail-content">
                    <div class="detail-section">
                        <h4><i class="fas fa-compass"></i> 使用流程</h4>
                        <div class="detail-section-content">
                            <p>1. <strong>根据情绪/问题定位情境</strong>：先感受自己最核心的情绪（是不安、遗憾、窒息感，还是需要抉择），找到对应的情境板块。</p>
                            <p>2. <strong>快速浏览核心模型</strong>：理解你正经历的可能是哪种心理模式。</p>
                            <p>3. <strong>调用具体的思维/行动要点</strong>：选择1-2条最触动你的要点，立刻在脑海中演练或写在纸上。它不是标准答案，而是思维的启动器。</p>
                            <p>4. <strong>将知识转化为自我智慧</strong>：这个工具包会随着思考库的扩充而持续更新。它的最终目的，是让那些深刻的分析，从关于他人的知识，转化为关于自我的智慧。</p>
                        </div>
                    </div>
                    
                    <div class="detail-section">
                        <h4><i class="fas fa-lightbulb"></i> 核心功能说明</h4>
                        <div class="detail-section-content">
                            <p><strong>结构化输入</strong>：支持灵活格式的内容输入，系统会自动解析状态看板、核心结论、模型延伸等部分。</p>
                            <p><strong>分段编辑</strong>：可单独编辑思考记录的各个板块（状态看板、核心结论、模型延伸与整合、行动/思维要点、架构更新）。</p>
                            <p><strong>可编辑ID</strong>：思考记录的ID编码可以编辑和修改。</p>
                            <p><strong>时间线编辑</strong>：系统演进历程支持手动编辑，可添加、修改和删除时间线记录。</p>
                            <p><strong>思维模型管理</strong>：创建和管理可复用的思维框架，建立模型间的关联网络。</p>
                            <p><strong>标签系统</strong>：自动提取和分类标签，支持标签复核和智能建议。</p>
                            <p><strong>本地存储</strong>：所有数据保存在浏览器本地，确保隐私安全。</p>
                            <p><strong>智能搜索</strong>：支持按关键词、标签、主题进行全文检索。</p>
                            <p><strong>数据管理</strong>：新增数据导出/导入、备份恢复、关联网络分析功能。</p>
                            <p><strong>关联模型自动提取</strong>：从"来源思考"的"模型延伸与整合"中自动提取关联模型ID。</p>
                            <p><strong>模型描述自动提取</strong>：在编辑模型时，可以从来源思考中自动提取"新建核心模型"标题下的内容作为模型描述。</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('content-area').innerHTML = html;
    },
    
    renderMilestones: function() {
        const milestones = [
            {version: "v1.0-v5.0", date: "2023-01", desc: "基础情感模型建立（工具化、错位、遗憾）"},
            {version: "v6.0-v10.0", date: "2023-03", desc: "关系模型深化（成熟馈赠、无限博弈）"},
            {version: "v11.0-v15.0", date: "2023-05", desc: "存在哲学拓展（存在勘探、水性智慧）"},
            {version: "v16.0-v18.0", date: "2023-07", desc: "防御机制与病理学完善（梦境寄生、情感麻痹）"},
            {version: "v18.0-v20.2", date: "2023-09", desc: "关系动力学、健康共建、意义整合"},
            {version: "v20.3-v21.3", date: "2023-11", desc: "宏观社会批判、个体生存策略、哲学框架普适化"},
            {version: "v21.4-v22.0", date: "2024-01", desc: "亲密关系光谱、存在性寄生、熵增损耗、祛魅悬置、偶像幻灭、创伤后重建、虚无美学整合"},
            {version: "v22.1-v22.2", date: "2024-03", desc: "双轨制架构建立，新增 M-45 至 M-53 模型"},
            {version: "v22.33", date: "2024-05", desc: "《我们很好》×《快乐星猫》关系诊疗整合版"},
            {version: "v22.48", date: "2024-07", desc: "《寄居》×《花》整合版，模型总数达80个"}
        ];
        
        let milestonesHTML = '';
        milestones.forEach(milestone => {
            milestonesHTML += `
                <div class="record-card">
                    <div class="record-id">${milestone.version}</div>
                    <div class="record-desc">${milestone.desc}</div>
                </div>
            `;
        });
        
        const html = `
            <div class="content-header">
                <h2>系统演进里程碑</h2>
                <p>系统版本: ${DataStore.currentVersion} | 对话脉络与时间线</p>
            </div>
            
            <div class="records-list">
                ${milestonesHTML || '<div class="empty-state"><i class="fas fa-road"></i><p>暂无里程碑数据</p></div>'}
            </div>
        `;
        
        document.getElementById('content-area').innerHTML = html;
    },
    
    renderArchitecture: function() {
        const architecture = {
            openNetwork: "模型可无限拓展，主题不受限",
            multiLayer: "核心模型层/现象分析层/实践工具箱协同运作",
            dualTrack: "标准模型库保证处理效率，思想原典库保证完整性",
            goal: "成为人生各课题（情感、存在、意义、成长、关系）的分析与行动引擎",
            currentHeight: "已建立从关系存在论(M-80)到临床干预(M-66)的完整分析-实践框架"
        };
        
        const html = `
            <div class="content-header">
                <h2>系统架构特性确认</h2>
                <p>系统版本: ${DataStore.currentVersion} | 架构完整性验证</p>
            </div>
            
            <div class="detail-view">
                <div class="detail-content">
                    <p><strong>开放网络：</strong>${architecture.openNetwork}</p>
                    <p><strong>多层结构：</strong>${architecture.multiLayer}</p>
                    <p><strong>双轨数据：</strong>${architecture.dualTrack}</p>
                    <p><strong>终极目标：</strong>${architecture.goal}</p>
                    <p><strong>当前高度：</strong>${architecture.currentHeight}</p>
                </div>
            </div>
        `;
        
        document.getElementById('content-area').innerHTML = html;
    },
    
    renderTagReview: function() {
        const thoughts = DataStore.thoughts;
        const models = DataStore.models;
        
        // 找出需要复核的项目（标签较少或没有标签的）
        const needsReview = [];
        
        thoughts.forEach(thought => {
            if (!thought.tags || thought.tags.length === 0) {
                needsReview.push({
                    type: 'thought',
                    id: thought.id,
                    title: thought.title,
                    tags: thought.tags || [],
                    date: thought.date
                });
            }
        });
        
        models.forEach(model => {
            if (!model.tags || model.tags.length === 0) {
                needsReview.push({
                    type: 'model',
                    id: model.id,
                    title: model.name,
                    tags: model.tags || [],
                    date: model.date
                });
            }
        });
        
        let reviewHTML = '';
        if (needsReview.length > 0) {
            needsReview.forEach(item => {
                reviewHTML += `
                    <div class="index-item">
                        <div class="index-item-id">${item.id}</div>
                        <div class="index-item-title">${item.title}</div>
                        <div class="index-item-actions">
                            <span class="index-item-action" onclick="openTagReview('${item.type}', '${item.id}')" title="标签复核">
                                <i class="fas fa-tags" style="color: var(--accent-color);"></i>
                            </span>
                        </div>
                    </div>
                `;
            });
        } else {
            reviewHTML = '<div class="empty-state" style="padding: 20px;"><i class="fas fa-check-circle"></i><p>所有项目都已标记标签，无需复核</p></div>';
        }
        
        const html = `
            <div class="content-header">
                <h2>标签复核中心</h2>
                <p>系统版本: ${DataStore.currentVersion} | 共 ${needsReview.length} 个项目需要标签复核</p>
            </div>
            
            <div class="detail-view">
                <div class="detail-section">
                    <h4><i class="fas fa-exclamation-circle"></i> 需要标签复核的项目</h4>
                    <div class="index-list">
                        ${reviewHTML}
                    </div>
                </div>
                
                <div class="detail-section">
                    <h4><i class="fas fa-tags"></i> 热门标签建议</h4>
                    <div class="detail-section-content">
                        ${Object.keys(DataStore.tagCategories).map(category => `
                            <div style="margin-bottom: 15px;">
                                <div style="font-weight: 500; margin-bottom: 5px; color: var(--primary-color);">${category}</div>
                                <div>
                                    ${DataStore.tagCategories[category].map(tag => {
                                        const count = DataStore.tags[tag] || 0;
                                        return `<span class="tag" style="cursor:pointer; margin-right: 8px; margin-bottom: 8px;" onclick="addSuggestedTagToReview('${tag}')">${tag} ${count > 0 ? `(${count})` : ''}</span>`;
                                    }).join('')}
                                </div>
                            </div>
                        `).join('')}
                </div>
            </div>
        `;
        
        document.getElementById('content-area').innerHTML = html;
    },
    
    // ==================== 列表渲染辅助函数 ====================
    renderThoughtList: function(thoughts, showActions = false) {
        if (!thoughts || thoughts.length === 0) {
            return '<div class="empty-state" style="padding: 20px;"><i class="fas fa-inbox"></i><p>暂无思考记录</p></div>';
        }
        
        let html = '';
        thoughts.forEach(thought => {
            const actions = showActions ? `
                <div class="index-item-actions">
                    <span class="index-item-action" onclick="event.stopPropagation(); editThought('${thought.id}')" title="编辑">
                        <i class="fas fa-edit" style="color: var(--warning-color);"></i>
                    </span>
                    <span class="index-item-action" onclick="event.stopPropagation(); openTagReview('thought', '${thought.id}')" title="标签复核">
                        <i class="fas fa-tags" style="color: var(--accent-color);"></i>
                    </span>
                    <span class="index-item-action" onclick="event.stopPropagation(); openDeleteModal('thought', '${thought.id}')" title="删除">
                        <i class="fas fa-trash" style="color: var(--danger-color);"></i>
                    </span>
                </div>
            ` : '<div class="index-item-jump">查看</div>';
            
            html += `
                <div class="index-item" onclick="showThoughtDetail('${thought.id}')">
                    <div class="index-item-id">${thought.id}</div>
                    <div class="index-item-title">${thought.title || '无标题'}</div>
                    ${actions}
                </div>
            `;
        });
        
        return html;
    },
    
    renderModelList: function(models, showActions = false) {
        if (!models || models.length === 0) {
            return '<div class="empty-state" style="padding: 20px;"><i class="fas fa-cubes"></i><p>暂无思维模型</p></div>';
        }
        
        let html = '';
        models.forEach(model => {
            const actions = showActions ? `
                <div class="index-item-actions">
                    <span class="index-item-action" onclick="event.stopPropagation(); editModel('${model.id}')" title="编辑">
                        <i class="fas fa-edit" style="color: var(--warning-color);"></i>
                    </span>
                    <span class="index-item-action" onclick="event.stopPropagation(); openTagReview('model', '${model.id}')" title="标签复核">
                        <i class="fas fa-tags" style="color: var(--accent-color);"></i>
                    </span>
                    <span class="index-item-action" onclick="event.stopPropagation(); openDeleteModal('model', '${model.id}')" title="删除">
                        <i class="fas fa-trash" style="color: var(--danger-color);"></i>
                    </span>
                </div>
            ` : '<div class="index-item-jump">查看</div>';
            
            html += `
                <div class="index-item" onclick="showModelDetail('${model.id}')">
                    <div class="index-item-id">${model.id}</div>
                    <div class="index-item-title">${model.name}</div>
                    ${actions}
                </div>
            `;
        });
        
        return html;
    },
    
    // ==================== 详情页渲染 ====================
    renderThoughtDetail: function(thought, isEditing = false) {
        if (!thought) {
            return '<div class="empty-state"><i class="fas fa-search"></i><p>未找到思考记录</p></div>';
        }
        
        if (isEditing) {
            // 编辑模式 - 现在使用分段编辑
            let html = `
                <div class="detail-view">
                    <div class="content-header">
                        <h2>编辑思考记录</h2>
                        <p>修改思考内容</p>
                    </div>
                    
                    <div class="action-buttons">
                        <button class="btn btn-warning" onclick="UIManager.openSectionEditorModal('${thought.id}')">
                            <i class="fas fa-edit"></i> 分段编辑此思考
                        </button>
                        <button class="btn btn-secondary" onclick="showThoughtDetail('${thought.id}')">
                            <i class="fas fa-times"></i> 取消
                        </button>
                    </div>
                    
                    <div class="detail-section">
                        <h4><i class="fas fa-info-circle"></i> 分段编辑功能说明</h4>
                        <div class="detail-section-content">
                            <p>使用<strong>分段编辑</strong>功能可以单独编辑思考的各个部分：</p>
                            <ul>
                                <li><strong>状态看板</strong>：包含系统版本、思考ID、主题、类型、关键标记等元数据</li>
                                <li><strong>核心结论</strong>：主要观点和发现</li>
                                <li><strong>模型延伸与整合</strong>：模型扩展和关联</li>
                                <li><strong>行动/思维要点</strong>：行动建议和思考要点</li>
                                <li><strong>架构更新</strong>：系统或模型的更新</li>
                            </ul>
                            <p>点击上方的<strong>"分段编辑此思考"</strong>按钮开始编辑。</p>
                        </div>
                    </div>
                </div>
            `;
            
            return html;
        } else {
            // 查看模式
            let html = `
                <div class="detail-view">
                    <div class="detail-header">
                        <div>
                            <div class="detail-title">${thought.title || '无标题'}</div>
                            <div class="detail-id">${thought.id}</div>
                            <div style="margin-top: 10px;">
                                ${thought.tags ? thought.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ') : ''}
                            </div>
                        </div>
                        <div style="color: var(--text-light); font-size: 0.9rem;">${thought.date}</div>
                    </div>
                    
                    <div class="action-buttons">
                        <button class="btn btn-warning" onclick="editThought('${thought.id}')">
                            <i class="fas fa-edit"></i> 编辑此思考
                        </button>
                        <button class="btn" onclick="openTagReview('thought', '${thought.id}')" style="background-color: var(--accent-color); color: white;">
                            <i class="fas fa-tags"></i> 标签复核
                        </button>
                        <button class="btn btn-danger" onclick="openDeleteModal('thought', '${thought.id}')">
                            <i class="fas fa-trash"></i> 删除此思考
                        </button>
                        <button class="btn btn-secondary" onclick="UIManager.loadView('add-structured')">
                            <i class="fas fa-arrow-left"></i> 返回输入
                        </button>
                    </div>
            `;
            
            // 渲染状态看板
            if (thought.sections && thought.sections["状态看板"]) {
                html += `
                    <div class="detail-section">
                        <h4><i class="fas fa-tachometer-alt"></i> 状态看板</h4>
                        <div class="detail-section-content">
                            <pre style="white-space: pre-wrap; font-family: inherit;">${thought.sections["状态看板"]}</pre>
                        </div>
                    </div>
                `;
            }
            
            // 渲染核心结论
            if (thought.sections && thought.sections["核心结论"]) {
                html += `
                    <div class="detail-section">
                        <h4><i class="fas fa-bullseye"></i> 核心结论</h4>
                        <div class="detail-section-content">
                            <pre style="white-space: pre-wrap; font-family: inherit;">${thought.sections["核心结论"]}</pre>
                        </div>
                    </div>
                `;
            }
            
            // 渲染模型延伸与整合
            if (thought.sections && thought.sections["模型延伸与整合"]) {
                html += `
                    <div class="detail-section">
                        <h4><i class="fas fa-puzzle-piece"></i> 模型延伸与整合</h4>
                        <div class="detail-section-content">
                            <pre style="white-space: pre-wrap; font-family: inherit;">${thought.sections["模型延伸与整合"]}</pre>
                        </div>
                    </div>
                `;
            }
            
            // 渲染行动/思维要点
            if (thought.sections && thought.sections["行动/思维要点"]) {
                html += `
                    <div class="detail-section">
                        <h4><i class="fas fa-lightbulb"></i> 行动/思维要点</h4>
                        <div class="detail-section-content">
                            <pre style="white-space: pre-wrap; font-family: inherit;">${thought.sections["行动/思维要点"]}</pre>
                        </div>
                    </div>
                `;
            }
            
            // 渲染架构更新
            if (thought.sections && thought.sections["架构更新"]) {
                html += `
                    <div class="detail-section">
                        <h4><i class="fas fa-code-branch"></i> 架构更新</h4>
                        <div class="detail-section-content">
                            <pre style="white-space: pre-wrap; font-family: inherit;">${thought.sections["架构更新"]}</pre>
                        </div>
                    </div>
                `;
            }
            
            // 如果是简单思考，渲染原始内容
            if (!thought.sections && thought.content) {
                html += `
                    <div class="detail-section">
                        <h4><i class="fas fa-align-left"></i> 内容</h4>
                        <div class="detail-section-content">
                            <pre style="white-space: pre-wrap; font-family: inherit;">${thought.content}</pre>
                        </div>
                    </div>
                `;
            }
            
            html += `</div>`;
            return html;
        }
    },
    
    thoughtToStructuredText: function(thought) {
        // 将思考记录转换回结构化文本
        let text = '';
        
        // 状态看板
        if (thought.sections && thought.sections["状态看板"]) {
            text += `💎 **状态看板**\n${thought.sections["状态看板"]}\n\n`;
        }
        
        // 核心结论
        if (thought.sections && thought.sections["核心结论"]) {
            text += `🌌 **核心结论**\n${thought.sections["核心结论"]}\n\n`;
        }
        
        // 模型延伸与整合
        if (thought.sections && thought.sections["模型延伸与整合"]) {
            text += `🧩 **模型延伸与整合**\n${thought.sections["模型延伸与整合"]}\n\n`;
        }
        
        // 行动/思维要点
        if (thought.sections && thought.sections["行动/思维要点"]) {
            text += `📚 **行动/思维要点**\n${thought.sections["行动/思维要点"]}\n\n`;
        }
        
        // 架构更新
        if (thought.sections && thought.sections["架构更新"]) {
            text += `📂 **架构更新**\n${thought.sections["架构更新"]}\n\n`;
        }
        
        // 如果没有结构化内容，返回原始内容
        if (text.trim() === '' && thought.content) {
            text = thought.content;
        }
        
        return text.trim();
    },
    
    renderModelDetail: function(model, isEditing = false) {
        if (!model) {
            return '<div class="empty-state"><i class="fas fa-search"></i><p>未找到思维模型</p></div>';
        }
        
        // 更新当前选中的模型ID，用于关联网络显示
        this.currentModelId = model.id;
        this.updateNetworkGraph(model.id);
        
        if (isEditing) {
            // 编辑模式 - 包含关联模型编辑
            this.currentEditingModelId = model.id;
            this.currentRelatedModels = [...(model.relatedModels || [])];
            
            let html = `
                <div class="detail-view">
                    <div class="content-header">
                        <h2>编辑思维模型</h2>
                        <p>修改模型内容</p>
                    </div>
                    
                    <div class="input-section">
                        <h3>编辑模型信息</h3>
                        
                        <!-- 新增：模型描述提取按钮 -->
                        ${model.fromThought ? `
                        <div style="margin-bottom: 15px;">
                            <button class="model-description-extract-btn" onclick="extractModelDescriptionFromSource('${model.id}')" id="extract-model-desc-btn">
                                <i class="fas fa-magic"></i> 从来源思考自动提取模型描述
                            </button>
                            <div class="model-description-extract-info">
                                <i class="fas fa-info-circle"></i> 此功能将从来源思考 <strong>${model.fromThought}</strong> 的"模型延伸与整合"部分提取"新建核心模型"标题下的内容作为模型描述。
                            </div>
                        </div>
                        ` : ''}
                        
                        <input type="text" id="edit-model-id" value="${model.id}" placeholder="模型ID">
                        <input type="text" id="edit-model-name" value="${model.name}" placeholder="模型名称">
                        <textarea id="edit-model-description" placeholder="请详细描述这个模型的定义、应用场景、关联模型等..." style="min-height: 250px;">${model.description}</textarea>
                        
                        <!-- 新增：关联模型编辑 -->
                        <div class="related-models-section">
                            <div class="related-models-header">
                                <h4><i class="fas fa-project-diagram"></i> 关联模型</h4>
                                <button class="auto-extract-btn" onclick="UIManager.autoExtractRelatedModels()" ${model.fromThought ? '' : 'disabled'}>
                                    <i class="fas fa-magic"></i> 从来源思考自动提取
                                </button>
                            </div>
                            <p style="font-size: 0.9rem; color: var(--text-light); margin-bottom: 10px;">
                                输入关联的模型ID（例如：M-74 M-73 M-77 M-76）
                            </p>
                            <div class="related-models-input">
                                <input type="text" id="edit-related-models-input" placeholder="输入模型ID，用空格或逗号分隔">
                                <button class="btn btn-secondary btn-sm" onclick="UIManager.addRelatedModelFromInput()" style="padding: 5px 10px; font-size: 0.9rem;">
                                    <i class="fas fa-plus"></i> 添加
                                </button>
                            </div>
                            <div class="related-models-list" id="related-models-list">
                                ${this.renderRelatedModelsList(this.currentRelatedModels)}
                            </div>
                            <p style="font-size: 0.85rem; color: var(--text-light); margin-top: 10px;">
                                提示：如果模型有来源思考，可以点击"从来源思考自动提取"按钮，系统会从"模型延伸与整合"部分提取关联模型ID。
                            </p>
                        </div>
                        
                        <div class="btn-group">
                            <button class="btn btn-warning" onclick="updateModel('${model.id}')">
                                <i class="fas fa-save"></i> 更新模型
                            </button>
                            <button class="btn btn-secondary" onclick="showModelDetail('${model.id}')">
                                <i class="fas fa-times"></i> 取消
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            return html;
        } else {
            // 查看模式
            const relatedModels = model.relatedModels || [];
            const usageCount = model.usageCount || 0;
            const lastUsed = model.lastUsed || model.date;
            
            // 获取关联网络
            const network = DataStore.getModelNetwork(model.id);
            
            let html = `
                <div class="detail-view">
                    <div class="detail-header">
                        <div>
                            <div class="detail-title">${model.name}</div>
                            <div class="detail-id">${model.id}</div>
                            <div style="margin-top: 10px;">
                                ${model.tags ? model.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ') : ''}
                            </div>
                        </div>
                        <div style="color: var(--text-light); font-size: 0.9rem;">${model.date}</div>
                    </div>
                    
                    <div class="action-buttons">
                        <button class="btn btn-warning" onclick="editModel('${model.id}')">
                            <i class="fas fa-edit"></i> 编辑此模型
                        </button>
                        <button class="btn" onclick="openTagReview('model', '${model.id}')" style="background-color: var(--accent-color); color: white;">
                            <i class="fas fa-tags"></i> 标签复核
                        </button>
                        <button class="btn btn-danger" onclick="openDeleteModal('model', '${model.id}')">
                            <i class="fas fa-trash"></i> 删除此模型
                        </button>
                        <button class="btn btn-secondary" onclick="UIManager.loadView('add-model')">
                            <i class="fas fa-arrow-left"></i> 返回
                        </button>
                    </div>
                    
                    <div class="detail-section">
                        <h4><i class="fas fa-info-circle"></i> 模型描述</h4>
                        <div class="detail-section-content">
                            <pre style="white-space: pre-wrap; font-family: inherit;">${model.description}</pre>
                        </div>
                    </div>
            `;
            
            if (model.fromThought) {
                html += `
                    <div class="detail-section">
                        <h4><i class="fas fa-link"></i> 来源思考</h4>
                        <div class="detail-section-content">
                            <p>此模型来源于思考记录: <span style="color: var(--accent-color); font-weight: 500; cursor: pointer;" onclick="showThoughtDetail('${model.fromThought}')">${model.fromThought}</span></p>
                            <p style="font-size: 0.9rem; color: var(--text-light); margin-top: 5px;">
                                <i class="fas fa-lightbulb"></i> 编辑此模型时，可以点击"从来源思考自动提取"按钮，系统会从"模型延伸与整合"部分提取关联模型ID和模型描述。
                            </p>
                        </div>
                    </div>
                `;
            }
            
            // 显示关联模型
            if (relatedModels.length > 0) {
                html += `
                    <div class="detail-section">
                        <h4><i class="fas fa-project-diagram"></i> 关联模型 (${relatedModels.length}个)</h4>
                        <div class="detail-section-content">
                            <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px;">
                                ${relatedModels.map(id => {
                                    const relatedModel = DataStore.getModelById(id);
                                    if (relatedModel) {
                                        return `<span class="network-node" onclick="showModelDetail('${id}')" style="cursor: pointer;">${id} - ${relatedModel.name.substring(0, 20)}${relatedModel.name.length > 20 ? '...' : ''}</span>`;
                                    } else {
                                        return `<span class="network-node" style="background-color: rgba(244, 67, 54, 0.1); color: var(--danger-color);">${id} (未找到)</span>`;
                                    }
                                }).join('')}
                            </div>
                        </div>
                    </div>
                `;
            }
            
            // 显示关联网络
            if (network && network.connections.length > 0) {
                html += `
                    <div class="detail-section">
                        <h4><i class="fas fa-project-diagram"></i> 关联网络</h4>
                        <div class="detail-section-content">
                            <p>此模型与以下 ${network.connections.length} 个模型相关联：</p>
                            <div class="network-visualization" style="margin-top: 10px;">
                                <div class="network-node center">${model.id}</div>
                `;
                
                network.connections.forEach(connectedModel => {
                    html += `
                        <div class="network-connection"></div>
                        <div class="network-node" onclick="showModelDetail('${connectedModel.id}')">${connectedModel.id}</div>
                    `;
                });
                
                html += `
                            </div>
                        </div>
                    </div>
                `;
            }
            
            html += `</div>`;
            return html;
        }
    },
    
    // ==================== 新增：关联模型编辑功能 ====================
    renderRelatedModelsList: function(relatedModels) {
        if (!relatedModels || relatedModels.length === 0) {
            return '<div style="color: var(--text-light); text-align: center; padding: 10px;">暂无关联模型</div>';
        }
        
        let html = '';
        relatedModels.forEach((modelId, index) => {
            const model = DataStore.getModelById(modelId);
            const modelName = model ? model.name : '未知模型';
            
            html += `
                <div class="related-model-tag">
                    <span>${modelId}</span>
                    <span class="remove" onclick="UIManager.removeRelatedModel(${index})">×</span>
                </div>
            `;
        });
        
        return html;
    },
    
    addRelatedModelFromInput: function() {
        const input = document.getElementById('edit-related-models-input');
        if (!input || !input.value.trim()) return;
        
        // 解析输入的模型ID（支持空格、逗号分隔）
        const inputText = input.value.trim();
        const modelIds = inputText.split(/[,\s]+/).filter(id => id.trim());
        
        // 验证并添加模型ID
        modelIds.forEach(modelId => {
            const cleanId = modelId.trim().toUpperCase();
            if (cleanId.match(/^M-\d+$/) && !this.currentRelatedModels.includes(cleanId)) {
                this.currentRelatedModels.push(cleanId);
            }
        });
        
        // 更新显示
        document.getElementById('related-models-list').innerHTML = this.renderRelatedModelsList(this.currentRelatedModels);
        
        // 清空输入框
        input.value = '';
    },
    
    removeRelatedModel: function(index) {
        if (index >= 0 && index < this.currentRelatedModels.length) {
            this.currentRelatedModels.splice(index, 1);
            document.getElementById('related-models-list').innerHTML = this.renderRelatedModelsList(this.currentRelatedModels);
        }
    },
    
    autoExtractRelatedModels: function() {
        const model = DataStore.getModelById(this.currentEditingModelId);
        if (!model || !model.fromThought) {
            alert('此模型没有指定来源思考，无法自动提取关联模型');
            return;
        }
        
        // 从来源思考的"模型延伸与整合"中提取模型ID
        const thought = DataStore.getThoughtById(model.fromThought);
        if (!thought || !thought.sections || !thought.sections["模型延伸与整合"]) {
            alert('在来源思考中未找到模型延伸与整合部分');
            return;
        }
        
        const modelSection = thought.sections["模型延伸与整合"];
        const modelIds = modelSection.match(/M-\d+/g) || [];
        
        if (modelIds.length === 0) {
            alert(`在思考记录 ${model.fromThought} 的"模型延伸与整合"部分未找到模型ID`);
            return;
        }
        
        // 过滤掉当前模型自身
        const filteredIds = modelIds.filter(id => id !== model.id);
        
        // 添加到当前关联模型列表（去重）
        filteredIds.forEach(id => {
            if (!this.currentRelatedModels.includes(id)) {
                this.currentRelatedModels.push(id);
            }
        });
        
        // 更新显示
        document.getElementById('related-models-list').innerHTML = this.renderRelatedModelsList(this.currentRelatedModels);
        
        // 显示成功消息
        this.showAlert(`从思考记录 ${model.fromThought} 中提取了 ${filteredIds.length} 个关联模型`, 'success');
    },
    
    // ==================== 搜索功能 ====================
    performSearch: function(query) {
        if (!query.trim()) {
            // 如果搜索框为空，重新加载当前视图
            this.loadView(this.currentView);
            return;
        }
        
        const searchTerm = query.toLowerCase();
        const categoryFilter = document.getElementById('category-filter').value;
        const themeFilter = document.getElementById('theme-filter').value;
        
        // 搜索思考记录
        const filteredThoughts = DataStore.thoughts.filter(thought => {
            if (categoryFilter === 'model') return false;
            
            const matchesSearch = (
                (thought.title && thought.title.toLowerCase().includes(searchTerm)) ||
                (thought.id && thought.id.toLowerCase().includes(searchTerm)) ||
                (thought.tags && thought.tags.some(tag => tag.toLowerCase().includes(searchTerm))) ||
                (thought.sections && Object.values(thought.sections).some(section => 
                    section.toLowerCase().includes(searchTerm)
                ))
            );
            
            const matchesTheme = themeFilter === 'all' || 
                (thought.tags && thought.tags.some(tag => this.tagMatchesTheme(tag, themeFilter)));
            
            return matchesSearch && matchesTheme;
        });
        
        // 搜索思维模型
        const filteredModels = DataStore.models.filter(model => {
            if (categoryFilter === 'thought') return false;
            
            const matchesSearch = (
                (model.name && model.name.toLowerCase().includes(searchTerm)) ||
                (model.id && model.id.toLowerCase().includes(searchTerm)) ||
                (model.tags && model.tags.some(tag => tag.toLowerCase().includes(searchTerm))) ||
                (model.description && model.description.toLowerCase().includes(searchTerm))
            );
            
            const matchesTheme = themeFilter === 'all' || 
                (model.tags && model.tags.some(tag => this.tagMatchesTheme(tag, themeFilter)));
            
            return matchesSearch && matchesTheme;
        });
        
        // 渲染搜索结果
        this.renderSearchResults(query, filteredThoughts, filteredModels);
    },
    
    tagMatchesTheme: function(tag, theme) {
        const themeMapping = {
            'emotion': ['亲密关系', '情感', '失去', '告别', '期望'],
            'philosophy': ['哲学', '存在', '智慧', '时间', '宿命'],
            'growth': ['成长', '历程', '觉醒', '韧性'],
            'society': ['社会', '系统', '结构', '权力', '伦理'],
            'aesthetics': ['艺术', '表达', '象征', '叙事', '美学']
        };
        
        const themeKeywords = themeMapping[theme] || [];
        return themeKeywords.some(keyword => tag.includes(keyword));
    },
    
    renderSearchResults: function(query, thoughts, models) {
        let resultsHTML = '';
        
        if (thoughts.length > 0) {
            thoughts.forEach(thought => {
                resultsHTML += `
                    <div class="record-card" onclick="showThoughtDetail('${thought.id}')">
                        <div class="record-id">${thought.id}</div>
                        <div class="record-title">${thought.title || '无标题'}</div>
                        <div class="record-tags">
                            ${thought.tags ? thought.tags.map(tag => `<span class="tag">${tag}</span>`).join('') : ''}
                        </div>
                    </div>
                `;
            });
        }
        
        if (models.length > 0) {
            models.forEach(model => {
                resultsHTML += `
                    <div class="model-card" onclick="showModelDetail('${model.id}')">
                        <div class="model-id">${model.id}</div>
                        <div class="model-name">${model.name}</div>
                        <div class="model-tags">
                            ${model.tags ? model.tags.map(tag => `<span class="tag">${tag}</span>`).join('') : ''}
                        </div>
                    </div>
                `;
            });
        }
        
        const html = `
            <div class="content-header">
                <h2>搜索结果</h2>
                <p>搜索关键词: "${query}" | 找到 ${thoughts.length + models.length} 个结果</p>
            </div>
            
            <div class="records-list">
                ${resultsHTML || '<div class="empty-state"><i class="fas fa-search"></i><p>未找到相关结果</p></div>'}
            </div>
        `;
        
        document.getElementById('content-area').innerHTML = html;
    },
    
    // ==================== 新增：数据操作功能 ====================
    exportCurrentItem: function() {
        let item = null;
        let type = null;
        let name = '';
        
        // 检查当前是否有选中的项目
        if (UIManager.currentView === 'thoughts' || UIManager.currentView === 'add-structured') {
            // 如果在思考相关视图，尝试获取当前思考
            const thought = DataStore.getThoughtById("#123"); // 默认示例
            if (thought) {
                item = thought;
                type = 'thought';
                name = thought.title;
            }
        } else if (UIManager.currentView === 'models' || UIManager.currentView === 'add-model') {
            // 如果在模型相关视图，尝试获取当前模型
            const model = DataStore.getModelById("M-80"); // 默认示例
            if (model) {
                item = model;
                type = 'model';
                name = model.name;
            }
        }
        
        if (!item) {
            alert('当前没有可导出的项目');
            return;
        }
        
        const data = DataStore.exportCurrentItem(type, item.id);
        if (!data) {
            alert('导出失败：无法获取项目数据');
            return;
        }
        
        this.downloadFile(data, `${item.id}_${name.replace(/[^\w]/g, '_')}.json`);
        this.showAlert('导出成功', 'success');
    },
    
    exportAllData: function() {
        const data = DataStore.exportAllData();
        const date = new Date().toISOString().split('T')[0];
        this.downloadFile(data, `思维协同处理器_备份_${date}.json`);
        this.showAlert('全部数据导出成功', 'success');
    },
    
    backupAllData: function() {
        const result = DataStore.backupData();
        if (result.success) {
            this.showAlert('数据备份创建成功', 'success');
            // 刷新数据管理视图
            if (this.currentView === 'data-management') {
                this.renderDataManagement();
            }
        } else {
            this.showAlert('备份失败：' + result.error, 'error');
        }
    },
    
    importData: function() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const result = DataStore.importData(event.target.result);
                    if (result.success) {
                        this.showAlert(result.message, 'success');
                        // 重新加载当前视图
                        this.loadView(this.currentView);
                        // 更新网络图
                        this.updateNetworkGraph();
                    } else {
                        this.showAlert('导入失败：' + result.error, 'error');
                    }
                } catch (error) {
                    this.showAlert('文件格式错误：' + error.message, 'error');
                }
            };
            reader.readAsText(file);
        };
        
        input.click();
    },
    
    restoreBackup: function(backupKey) {
        if (!confirm('确定要恢复此备份吗？当前数据将被覆盖。')) {
            return;
        }
        
        try {
            const backupData = localStorage.getItem(backupKey);
            if (!backupData) {
                alert('备份数据不存在或已损坏');
                return;
            }
            
            const result = DataStore.importData(backupData);
            if (result.success) {
                this.showAlert('备份恢复成功', 'success');
                // 重新加载当前视图
                this.loadView(this.currentView);
                // 更新网络图
                this.updateNetworkGraph();
            } else {
                this.showAlert('恢复失败：' + result.error, 'error');
            }
        } catch (error) {
            this.showAlert('恢复失败：' + error.message, 'error');
        }
    },
    
    deleteBackup: function(backupKey) {
        if (!confirm('确定要删除此备份吗？此操作不可撤销。')) {
            return;
        }
        
        localStorage.removeItem(backupKey);
        this.showAlert('备份已删除', 'success');
        
        // 刷新数据管理视图
        if (this.currentView === 'data-management') {
            this.renderDataManagement();
        }
    },
    
    resetData: function() {
        if (!confirm('确定要重置所有数据吗？这将删除所有自定义内容，恢复为默认数据。此操作不可撤销。')) {
            return;
        }
        
        localStorage.removeItem('structuredThoughtAssistant');
        location.reload(); // 重新加载页面
    },
    
    downloadFile: function(data, filename) {
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },
    
    showAlert: function(message, type = 'info') {
        const alertClass = type === 'success' ? 'alert-success' : 'alert-info';
        const icon = type === 'success' ? 'fa-check-circle' : 'fa-info-circle';
        
        const alertHtml = `
            <div class="alert ${alertClass}">
                <i class="fas ${icon}"></i> 
                ${message}
            </div>
        `;
        
        const contentArea = document.getElementById('content-area');
        contentArea.insertAdjacentHTML('afterbegin', alertHtml);
        
        setTimeout(() => {
            const alertElement = contentArea.querySelector('.alert');
            if (alertElement) {
                alertElement.remove();
            }
        }, 3000);
    },
    
    // ==================== 删除模态框 ====================
    openDeleteModal: function(type, id) {
        this.itemToDelete = id;
        this.deleteType = type;
        
        let itemName = '';
        if (type === 'thought') {
            const thought = DataStore.getThoughtById(id);
            itemName = thought ? (thought.title || thought.id) : id;
        } else if (type === 'model') {
            const model = DataStore.getModelById(id);
            itemName = model ? (model.name || model.id) : id;
        } else if (type === 'timeline') {
            const timelineItem = DataStore.getTimelineById(id);
            itemName = timelineItem ? timelineItem.version : id;
        }
        
        const modal = document.getElementById('delete-modal');
        const message = document.getElementById('delete-message');
        
        if (type === 'thought') {
            message.textContent = `确定要删除思考记录 "${itemName}" 吗？此操作不可撤销。`;
        } else if (type === 'model') {
            message.textContent = `确定要删除思维模型 "${itemName}" 吗？此操作不可撤销。`;
        } else if (type === 'timeline') {
            message.textContent = `确定要删除系统演进记录 "${itemName}" 吗？此操作不可撤销。`;
        }
        
        modal.style.display = 'flex';
    },
    
    closeDeleteModal: function() {
        const modal = document.getElementById('delete-modal');
        modal.style.display = 'none';
        this.itemToDelete = null;
        this.deleteType = null;
    },
    
    // ==================== 标签复核功能 ====================
    openTagReview: function(type, id) {
        this.tagReviewItem = id;
        this.tagReviewType = type;
        
        let item;
        if (type === 'thought') {
            item = DataStore.getThoughtById(id);
        } else if (type === 'model') {
            item = DataStore.getModelById(id);
        }
        
        if (!item) return;
        
        // 保存当前标签
        this.currentTagsForReview = [...(item.tags || [])];
        
        // 设置标题
        const titleEl = document.getElementById('tag-review-title');
        if (titleEl) {
            titleEl.textContent = `${type === 'model' ? '模型' : '思考记录'}: ${item.title || item.name || item.id}`;
        }
        
        // 渲染当前标签
        this.renderTagReviewTags();
        
        // 显示模态框
        document.getElementById('tag-review-modal').style.display = 'flex';
    },
    
    renderTagReviewTags: function() {
        const container = document.getElementById('current-tags-container');
        if (!container) return;
        
        if (this.currentTagsForReview.length === 0) {
            container.innerHTML = '<p style="color: var(--text-light); text-align: center; padding: 20px;">暂无标签</p>';
            return;
        }
        
        let html = '';
        this.currentTagsForReview.forEach((tag, index) => {
            const count = DataStore.tags[tag] || 0;
            html += `
                <div class="tag-item" data-index="${index}" style="display: inline-flex; align-items: center; background-color: white; padding: 6px 12px; border-radius: 20px; margin-right: 10px; margin-bottom: 10px; border: 1px solid var(--border-color); transition: var(--transition);">
                    <span class="tag-text" style="margin-right: 8px;">${tag}</span>
                    <span class="tag-remove" onclick="removeTagFromReview(${index})" style="width: 18px; height: 18px; border-radius: 50%; background-color: var(--light-bg); display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 0.7rem; color: var(--text-light);">×</span>
                </div>
            `;
        });
        
        container.innerHTML = html;
    },
    
    closeTagReviewModal: function() {
        document.getElementById('tag-review-modal').style.display = 'none';
        this.tagReviewItem = null;
        this.tagReviewType = null;
        this.currentTagsForReview = [];
        
        // 清空输入框
        const input = document.getElementById('new-tag-input');
        if (input) input.value = '';
    },
    
    saveTagReview: function() {
        // 这里只是更新本地数组，实际保存需要调用applyTagReview
        this.renderTagReviewTags();
    },
    
    applyTagReview: function() {
        if (!this.tagReviewItem || !this.tagReviewType) return;
        
        // 更新数据
        if (this.tagReviewType === 'thought') {
            const thought = DataStore.getThoughtById(this.tagReviewItem);
            if (thought) {
                thought.tags = [...this.currentTagsForReview];
                DataStore.updateThought(this.tagReviewItem, thought);
            }
        } else if (this.tagReviewType === 'model') {
            const model = DataStore.getModelById(this.tagReviewItem);
            if (model) {
                model.tags = [...this.currentTagsForReview];
                DataStore.updateModel(this.tagReviewItem, model);
            }
        }
        
        // 更新UI
        this.updateTagCloud();
        
        // 关闭模态框
        this.closeTagReviewModal();
        
        // 重新显示当前项目
        if (this.tagReviewType === 'thought') {
            showThoughtDetail(this.tagReviewItem);
        } else {
            showModelDetail(this.tagReviewItem);
        }
        
        // 显示成功消息
        this.showAlert('标签已更新', 'success');
    }
};

// ==================== 全局函数 ====================
function parseAndPreview() {
    const input = document.getElementById('structured-input');
    if (!input || !input.value.trim()) {
        alert('请输入要解析的内容');
        return;
    }
    
    const thought = DataStore.parseStructuredContent(input.value);
    const previewDiv = document.getElementById('parse-preview');
    
    if (previewDiv) {
        previewDiv.style.display = 'block';
        let sectionsHtml = '';
        
        // 显示解析到的部分
        Object.keys(thought.sections).forEach(sectionName => {
            const content = thought.sections[sectionName];
            sectionsHtml += `
                <div style="margin-bottom: 15px; padding: 10px; background-color: #f8f9fa; border-radius: 4px;">
                    <div style="font-weight: bold; color: var(--accent-color); margin-bottom: 5px;">
                        ${sectionName}
                    </div>
                    <div style="font-size: 0.9rem; color: var(--text-light); max-height: 100px; overflow: auto;">
                        ${content.substring(0, 200)}${content.length > 200 ? '...' : ''}
                    </div>
                </div>
            `;
        });
        
        previewDiv.innerHTML = `
            <h4><i class="fas fa-check-circle"></i> 解析成功</h4>
            <p><strong>思考ID:</strong> ${thought.id}</p>
            <p><strong>思考主题:</strong> ${thought.title}</p>
            <p><strong>思考类型:</strong> ${thought.type || '未识别'}</p>
            <p><strong>系统版本:</strong> ${thought.systemVersion}</p>
            <p><strong>关键标记:</strong> ${thought.tags ? thought.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ') : '无'}</p>
            <p><strong>解析到的部分 (${Object.keys(thought.sections).length}):</strong> ${Object.keys(thought.sections).map(s => `<span class="tag">${s}</span>`).join(' ')}</p>
            ${sectionsHtml}
            <div style="margin-top: 15px; font-size: 0.9rem; color: var(--success-color);">
                <i class="fas fa-check"></i> 解析完成，点击"保存思考"按钮保存到系统
            </div>
        `;
    }
}

function saveStructuredThought() {
    const input = document.getElementById('structured-input');
    if (!input || !input.value.trim()) {
        alert('请输入思考内容');
        return;
    }
    
    const thought = DataStore.addStructuredThought(input.value);
    
    // 显示成功消息
    UIManager.showAlert(`思考记录已保存: ${thought.id}。系统已智能解析并归类！`, 'success');
    
    // 刷新当前视图
    UIManager.loadView(UIManager.currentView);
    
    // 更新索引和标签云
    DataStore.updateUIStats();
    
    console.log('结构化思考记录已保存:', thought);
}

function saveModel() {
    const idInput = document.getElementById('model-id');
    const nameInput = document.getElementById('model-name');
    const fromThoughtInput = document.getElementById('model-from-thought');
    const descInput = document.getElementById('model-description');
    
    if (!nameInput || !nameInput.value.trim()) {
        alert('请输入模型名称');
        return;
    }
    
    if (!descInput || !descInput.value.trim()) {
        alert('请输入模型描述');
        return;
    }
    
    const model = DataStore.addModel({
        id: idInput && idInput.value.trim() ? idInput.value.trim() : undefined,
        name: nameInput.value.trim(),
        description: descInput.value.trim(),
        date: new Date().toISOString().split('T')[0],
        tags: [],
        fromThought: fromThoughtInput && fromThoughtInput.value.trim() ? fromThoughtInput.value.trim() : null
    });
    
    // 清空输入
    if (idInput) idInput.value = '';
    if (nameInput) nameInput.value = '';
    if (fromThoughtInput) fromThoughtInput.value = '';
    if (descInput) descInput.value = '';
    
    // 显示成功消息
    UIManager.showAlert(`思维模型已保存: ${model.id}`, 'success');
    
    // 刷新当前视图
    UIManager.loadView(UIManager.currentView);
    
    // 更新索引
    DataStore.updateUIStats();
}

function showThoughtDetail(id, isEditing = false) {
    const thought = DataStore.getThoughtById(id);
    const contentArea = document.getElementById('content-area');
    
    if (!thought) {
        contentArea.innerHTML = '<div class="empty-state"><i class="fas fa-search"></i><p>未找到思考记录</p></div>';
        return;
    }
    
    contentArea.innerHTML = UIManager.renderThoughtDetail(thought, isEditing);
}

function showModelDetail(id, isEditing = false) {
    const model = DataStore.getModelById(id);
    const contentArea = document.getElementById('content-area');
    
    if (!model) {
        contentArea.innerHTML = '<div class="empty-state"><i class="fas fa-search"></i><p>未找到思维模型</p></div>';
        return;
    }
    
    contentArea.innerHTML = UIManager.renderModelDetail(model, isEditing);
}

function editThought(id) {
    showThoughtDetail(id, true);
}

function editModel(id) {
    showModelDetail(id, true);
}

function updateThought(id) {
    const input = document.getElementById('edit-structured-input');
    if (!input || !input.value.trim()) {
        alert('请输入思考内容');
        return;
    }
    
    const updatedThought = DataStore.parseStructuredContent(input.value);
    updatedThought.id = id; // 保持原ID
    
    const success = DataStore.updateThought(id, updatedThought);
    
    if (success) {
        UIManager.showAlert(`思考记录已更新: ${updatedThought.id}`, 'success');
        
        // 显示更新后的内容
        showThoughtDetail(id);
        
        // 更新索引
        DataStore.updateUIStats();
    } else {
        alert('更新失败: 未找到该思考记录');
    }
}

function updateModel(id) {
    const idInput = document.getElementById('edit-model-id');
    const nameInput = document.getElementById('edit-model-name');
    const descInput = document.getElementById('edit-model-description');
    
    if (!nameInput || !nameInput.value.trim()) {
        alert('请输入模型名称');
        return;
    }
    
    if (!descInput || !descInput.value.trim()) {
        alert('请输入模型描述');
        return;
    }
    
    // 获取关联模型
    const relatedModels = UIManager.currentRelatedModels;
    
    const updatedModel = {
        id: idInput && idInput.value.trim() ? idInput.value.trim() : id,
        name: nameInput.value.trim(),
        description: descInput.value.trim(),
        date: new Date().toISOString().split('T')[0],
        tags: [],
        relatedModels: relatedModels
    };
    
    // 获取原始模型以保留fromThought字段
    const originalModel = DataStore.getModelById(id);
    if (originalModel && originalModel.fromThought) {
        updatedModel.fromThought = originalModel.fromThought;
    }
    
    const success = DataStore.updateModel(id, updatedModel);
    
    if (success) {
        UIManager.showAlert(`思维模型已更新: ${updatedModel.id}`, 'success');
        
        // 显示更新后的内容
        showModelDetail(updatedModel.id);
        
        // 更新索引
        DataStore.updateUIStats();
        
        // 重置编辑状态
        UIManager.currentEditingModelId = null;
        UIManager.currentRelatedModels = [];
    } else {
        alert('更新失败: 未找到该模型');
    }
}

function openDeleteModal(type, id) {
    UIManager.openDeleteModal(type, id);
}

function closeDeleteModal() {
    UIManager.closeDeleteModal();
}

function confirmDelete() {
    const id = UIManager.itemToDelete;
    const type = UIManager.deleteType;
    
    let success = false;
    let itemName = '';
    
    if (type === 'thought') {
        const thought = DataStore.getThoughtById(id);
        if (thought) {
            itemName = thought.title || thought.id;
        }
        success = DataStore.deleteThought(id);
    } else if (type === 'model') {
        const model = DataStore.getModelById(id);
        if (model) {
            itemName = model.name || model.id;
        }
        success = DataStore.deleteModel(id);
    } else if (type === 'timeline') {
        const timelineItem = DataStore.getTimelineById(id);
        if (timelineItem) {
            itemName = timelineItem.version;
        }
        success = DataStore.deleteTimelineItem(id);
        // 如果删除的是当前显示的时间线项目，隐藏详情
        if (UIManager.currentTimelineItem && UIManager.currentTimelineItem.id === id) {
            UIManager.currentTimelineItem = null;
        }
    }
    
    if (success) {
        // 关闭模态框
        closeDeleteModal();
        
        // 返回主视图
        UIManager.loadView(UIManager.currentView);
        
        // 显示成功消息
        UIManager.showAlert(`已成功删除: ${itemName}`, 'success');
        
        // 更新索引
        DataStore.updateUIStats();
    } else {
        alert('删除失败: 未找到该项目');
        closeDeleteModal();
    }
}

function filterByTag(tag) {
    const thoughtsWithTag = DataStore.thoughts.filter(thought => 
        thought.tags && thought.tags.includes(tag)
    );
    
    const modelsWithTag = DataStore.models.filter(model => 
        model.tags && model.tags.includes(tag)
    );
    
    const contentArea = document.getElementById('content-area');
    
    let html = `
        <div class="content-header">
            <h2>标签: ${tag}</h2>
            <p>找到 ${thoughtsWithTag.length + modelsWithTag.length} 条相关内容</p>
            <button class="btn btn-secondary" onclick="UIManager.loadView('keywords')">
                <i class="fas fa-arrow-left"></i> 返回标签页
            </button>
        </div>
    `;
    
    if (thoughtsWithTag.length > 0) {
        html += `
            <div class="detail-section">
                <h4><i class="fas fa-stream"></i> 相关思考记录 (${thoughtsWithTag.length})</h4>
                <div class="records-list" style="margin-top: 10px;">
        `;
        
        thoughtsWithTag.forEach(thought => {
            html += `
                <div class="record-card" onclick="showThoughtDetail('${thought.id}')">
                    <div class="record-id">${thought.id}</div>
                    <div class="record-title">${thought.title || '无标题'}</div>
                </div>
            `;
        });
        
        html += `</div></div>`;
    }
    
    if (modelsWithTag.length > 0) {
        html += `
            <div class="detail-section">
                <h4><i class="fas fa-cube"></i> 相关思维模型 (${modelsWithTag.length})</h4>
                <div class="models-list" style="margin-top: 10px;">
        `;
        
        modelsWithTag.forEach(model => {
            html += `
                <div class="model-card" onclick="showModelDetail('${model.id}')">
                    <div class="model-id">${model.id}</div>
                    <div class="model-name">${model.name}</div>
                </div>
            `;
        });
        
        html += `</div></div>`;
    }
    
    if (thoughtsWithTag.length === 0 && modelsWithTag.length === 0) {
        html += '<div class="empty-state"><i class="fas fa-search"></i><p>暂无相关内容</p></div>';
    }
    
    contentArea.innerHTML = html;
}

// ==================== 标签复核相关函数 ====================
function openTagReview(type, id) {
    UIManager.openTagReview(type, id);
}

function closeTagReviewModal() {
    UIManager.closeTagReviewModal();
}

function removeTagFromReview(index) {
    if (index >= 0 && index < UIManager.currentTagsForReview.length) {
        UIManager.currentTagsForReview.splice(index, 1);
        UIManager.renderTagReviewTags();
    }
}

function addNewTag() {
    const tag = prompt('请输入新标签:');
    if (tag && tag.trim()) {
        UIManager.currentTagsForReview.push(tag.trim());
        UIManager.renderTagReviewTags();
    }
}

function addTagFromInput() {
    const input = document.getElementById('new-tag-input');
    const tag = input.value.trim();
    if (tag) {
        if (!UIManager.currentTagsForReview.includes(tag)) {
            UIManager.currentTagsForReview.push(tag);
            UIManager.renderTagReviewTags();
        }
        input.value = '';
    }
}

function addSuggestedTag(tag) {
    if (!UIManager.currentTagsForReview.includes(tag)) {
        UIManager.currentTagsForReview.push(tag);
        UIManager.renderTagReviewTags();
    }
}

function addSuggestedTagToReview(tag) {
    // 直接从标签复核页面添加标签到当前复核项目
    if (UIManager.tagReviewItem && UIManager.tagReviewType) {
        if (!UIManager.currentTagsForReview.includes(tag)) {
            UIManager.currentTagsForReview.push(tag);
            UIManager.renderTagReviewTags();
        }
    } else {
        // 如果没有打开标签复核模态框，则提示用户
        alert('请先打开标签复核功能');
    }
}

function saveTagReview() {
    UIManager.saveTagReview();
}

function applyTagReview() {
    UIManager.applyTagReview();
}

// ==================== 新增：分段编辑相关函数 ====================
function validateThoughtId() {
    const idInput = document.getElementById('edit-thought-id');
    const id = idInput.value.trim();
    
    if (!id) {
        alert('思考ID不能为空');
        return false;
    }
    
    if (!id.startsWith('#')) {
        alert('思考ID应以#开头，例如：#123');
        return false;
    }
    
    // 检查是否已存在（排除当前正在编辑的思考）
    const existingThought = DataStore.getThoughtById(id);
    if (existingThought && existingThought.id !== DataStore.editingThoughtId) {
        alert(`思考ID "${id}" 已存在，请使用其他ID`);
        return false;
    }
    
    return true;
}

function saveSectionEdits() {
    const idInput = document.getElementById('edit-thought-id');
    const newId = idInput.value.trim();
    
    // 验证ID
    if (!validateThoughtId()) {
        return;
    }
    
    // 保存分段编辑
    const result = DataStore.saveSectionEdits(newId);
    
    if (result.success) {
        UIManager.showAlert(`思考记录已更新: ${result.thought.id}`, 'success');
        
        // 关闭模态框
        UIManager.closeSectionEditModal();
        
        // 显示更新后的内容
        showThoughtDetail(result.thought.id);
        
        // 更新索引
        DataStore.updateUIStats();
    } else {
        alert(`保存失败: ${result.message || '未知错误'}`);
    }
}

function closeSectionEditModal() {
    UIManager.closeSectionEditModal();
}

// ==================== 新增：从来源思考提取模型描述 ====================
function extractModelDescriptionFromSource(modelId) {
    const model = DataStore.getModelById(modelId);
    if (!model || !model.fromThought) {
        alert('此模型没有指定来源思考，无法自动提取描述');
        return;
    }
    
    const thought = DataStore.getThoughtById(model.fromThought);
    if (!thought || !thought.sections || !thought.sections["模型延伸与整合"]) {
        alert('在来源思考中未找到此模型的描述内容');
        return;
    }
    
    const modelSection = thought.sections["模型延伸与整合"];
    const lines = modelSection.split('\n');
    
    // 查找包含模型ID的行
    let descriptionLines = [];
    let foundModel = false;
    
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes(modelId)) {
            foundModel = true;
            // 跳过标题行
            continue;
        }
        
        if (foundModel) {
            // 检查是否是另一个模型的开始
            if (lines[i].match(/M-\d+/)) {
                break;
            }
            
            // 检查是否是下一个标题的开始
            if (lines[i].match(/^\d+\./)) {
                break;
            }
            
            descriptionLines.push(lines[i]);
        }
    }
    
    if (descriptionLines.length === 0) {
        alert('在来源思考中未找到此模型的详细描述');
        return;
    }
    
    // 清理描述
    let description = descriptionLines.join('\n').trim();
    
    // 询问用户是否替换现有描述
    if (confirm('是否用从来源思考中提取的描述替换当前描述？')) {
        const textarea = document.getElementById('edit-model-description');
        if (textarea) {
            textarea.value = description;
            UIManager.showAlert('模型描述已从来源思考中提取', 'success');
        }
    }
}

// ==================== 新增：时间线编辑相关函数 ====================
function closeTimelineEditModal() {
    UIManager.closeTimelineEditModal();
}

function saveTimelineEdit() {
    UIManager.saveTimelineEdit();
}

// ==================== 初始化 ====================
document.addEventListener('DOMContentLoaded', function() {
    UIManager.init();
});
const originalCreateElement = document.createElement;
document.createElement = function(tagName) {
    const element = originalCreateElement.call(document, tagName);
    const originalSetAttribute = element.setAttribute;
    element.setAttribute = function(name, value) {
        // 阻止危险属性
        if (name.startsWith('on') || name === 'href' && value.startsWith('javascript:')) {
            console.warn('Blocked potentially dangerous attribute:', name, value);
            return;
        }
        return originalSetAttribute.call(this, name, value);
    };
    return element;
};

// 点击模态框外部关闭
document.addEventListener('click', function(event) {
    const deleteModal = document.getElementById('delete-modal');
    const tagReviewModal = document.getElementById('tag-review-modal');
    const sectionEditModal = document.getElementById('section-edit-modal');
    const timelineEditModal = document.getElementById('timeline-edit-modal');
    
    if (event.target === deleteModal) {
        UIManager.closeDeleteModal();
    }
    
    if (event.target === tagReviewModal) {
        UIManager.closeTagReviewModal();
    }
    
    if (event.target === sectionEditModal) {
        UIManager.closeSectionEditModal();
    }
    
    if (event.target === timelineEditModal) {
        UIManager.closeTimelineEditModal();
    }
function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}
const Security = {
  // 1. XSS防护函数
  sanitize: function(input) {
    if (!input) return '';
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  },
  
  // 2. 数据验证函数
  validateThoughtId: function(id) {
    if (!id || typeof id !== 'string') return false;
    return /^#[0-9]+$/.test(id.trim());
  },
  
  // 3. 防止脚本注入
  safeSetInnerHTML: function(element, content) {
    element.textContent = content;
  }
};
// ==================== 移动端数据管理组件 ====================
const MobileDataManager = {
    isMobile: function() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    
    init: function() {
        if (!this.isMobile()) return;
        
        // 添加移动端数据警告
        this.addDataWarning();
        
        // 添加自动备份提醒
        this.setupAutoBackupReminder();
            // 移动端初始化
            if (window.innerWidth <= 1024) {
                this.initMobile();
            }
            
            // 监听窗口大小变化
            window.addEventListener('resize', () => {
                if (window.innerWidth <= 1024 && !this.isMobileInitialized) {
                    this.initMobile();
                }
            });       
    },
    initMobile: function() {
        this.isMobileInitialized = true;
        console.log('移动端模式已激活');
        
        // 隐藏桌面端元素，显示移动端元素
        document.querySelectorAll('.desktop-only').forEach(el => {
            el.style.display = 'none';
        });
        
        // 调整内容区域间距
        const contentArea = document.getElementById('content-area');
        if (contentArea) {
            contentArea.style.paddingTop = '80px';
        }
    },
    
    addDataWarning: function() {
        // 在页面加载时显示移动端数据警告
        setTimeout(() => {
            if (!sessionStorage.getItem('mobileDataWarningShown')) {
                const warningHtml = `
                    <div class="mobile-data-warning">
                        <h4><i class="fas fa-exclamation-triangle"></i> 移动端使用重要提示</h4>
                        <p>在移动设备上，浏览器可能会定期清理本地存储数据。建议您：</p>
                        <ol>
                            <li>定期使用"数据管理"功能导出数据到文件</li>
                            <li>将导出的文件保存到云盘或手机存储</li>
                            <li>更换设备或浏览器时，导入之前保存的数据文件</li>
                        </ol>
                        <div class="mobile-data-actions">
                            <button class="mobile-btn export" onclick="UIManager.exportAllData()">
                                <i class="fas fa-download"></i> 立即导出数据
                            </button>
                            <button class="mobile-btn import" onclick="document.getElementById('mobile-file-input').click()">
                                <i class="fas fa-upload"></i> 导入数据文件
                            </button>
                        </div>
                    </div>
                `;
                
                // 在内容区域顶部添加警告
                const contentArea = document.getElementById('content-area');
                if (contentArea) {
                    const loading = contentArea.querySelector('#loading');
                    if (loading) {
                        loading.insertAdjacentHTML('afterend', warningHtml);
                    } else {
                        contentArea.insertAdjacentHTML('afterbegin', warningHtml);
                    }
                }
                
                // 添加隐藏的文件输入
                const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.id = 'mobile-file-input';
                fileInput.accept = '.json';
                fileInput.style.display = 'none';
                fileInput.onchange = (e) => {
                    UIManager.importDataFromFile(e.target.files[0]);
                };
                document.body.appendChild(fileInput);
                
                sessionStorage.setItem('mobileDataWarningShown', 'true');
            }
        }, 2000);
    },
    
    setupAutoBackupReminder: function() {
        // 每24小时提醒备份一次
        const lastBackupReminder = localStorage.getItem('lastBackupReminder');
        const now = new Date().getTime();
        
        if (!lastBackupReminder || (now - lastBackupReminder) > 24 * 60 * 60 * 1000) {
            setTimeout(() => {
                if (confirm('距离上次数据备份已超过24小时，建议导出数据以防丢失。是否现在备份？')) {
                    UIManager.exportAllData();
                }
                localStorage.setItem('lastBackupReminder', now.toString());
            }, 5000);
        }
    },
    
    checkDataIntegrity: function() {
        // 检查数据完整性
        const data = localStorage.getItem('structuredThoughtAssistant');
        if (!data) return { valid: false, reason: '无数据' };
        
        try {
            const parsed = JSON.parse(data);
            if (!parsed.thoughts || !parsed.models) {
                return { valid: false, reason: '数据结构不完整' };
            }
            return { valid: true, count: parsed.thoughts.length + parsed.models.length };
        } catch (e) {
            return { valid: false, reason: '数据损坏' };
        }
    }
};
});
// ==================== 移动端数据同步优化 ====================
const MobileDataSync = {
    // 初始化数据同步
    init: function() {
        if (!MobileDataManager.isMobile()) return;
        
        // 检查数据一致性
        this.checkDataConsistency();
        
        // 设置自动同步提醒
        this.setupSyncReminder();
        
        // 添加数据同步UI
        this.addSyncUI();
    },
    
    // 检查数据一致性
    checkDataConsistency: function() {
        const data = localStorage.getItem('structuredThoughtAssistant');
        if (!data) return;
        
        try {
            const parsed = JSON.parse(data);
            
            // 检查数据量是否异常
            const thoughtCount = parsed.thoughts ? parsed.thoughts.length : 0;
            const modelCount = parsed.models ? parsed.models.length : 0;
            
            // 如果数据量过大，提示清理
            if (thoughtCount > 1000 || modelCount > 100) {
                this.showCleanupPrompt(thoughtCount, modelCount);
            }
            
            // 检查数据格式
            this.validateDataFormat(parsed);
            
        } catch (error) {
            console.error('数据解析错误:', error);
        }
    },
    
    // 显示清理提示
    showCleanupPrompt: function(thoughtCount, modelCount) {
        setTimeout(() => {
            if (confirm(`检测到数据量较大（思维: ${thoughtCount}，模型: ${modelCount}），这可能导致移动端性能下降。是否进行数据优化？`)) {
                this.optimizeMobileData();
            }
        }, 3000);
    },
    
    // 优化移动端数据
    optimizeMobileData: function() {
        const data = JSON.parse(localStorage.getItem('structuredThoughtAssistant'));
        
        // 1. 清理过时的草稿和临时数据
        if (data.thoughts) {
            data.thoughts = data.thoughts.filter(thought => 
                !thought.isDraft || 
                (new Date() - new Date(thought.updatedAt)) < 7 * 24 * 60 * 60 * 1000 // 保留7天内的草稿
            );
        }
        
        // 2. 压缩大文本内容
        if (data.thoughts) {
            data.thoughts.forEach(thought => {
                if (thought.content && thought.content.length > 10000) {
                    thought.content = thought.content.substring(0, 10000) + '... [内容已截断]';
                }
            });
        }
        
        // 3. 保存优化后的数据
        localStorage.setItem('structuredThoughtAssistant', JSON.stringify(data));
        
        alert('数据优化完成！已清理临时数据并压缩大文本内容。');
    },
    
    // 验证数据格式
    validateDataFormat: function(data) {
        // 确保必要字段存在
        if (!data.thoughts) data.thoughts = [];
        if (!data.models) data.models = [];
        if (!data.settings) data.settings = {};
        
        // 添加移动端标记
        data.settings.mobileOptimized = true;
        data.settings.lastMobileSync = new Date().toISOString();
        
        // 保存更新后的数据
        localStorage.setItem('structuredThoughtAssistant', JSON.stringify(data));
    },
    
    // 设置同步提醒
    setupSyncReminder: function() {
        const lastSync = localStorage.getItem('lastDesktopSync');
        const now = new Date().getTime();
        
        // 如果超过7天没有同步，提醒用户
        if (!lastSync || (now - parseInt(lastSync)) > 7 * 24 * 60 * 60 * 1000) {
            setTimeout(() => {
                this.showSyncNotification();
            }, 10000);
        }
    },
    
    // 显示同步通知
    showSyncNotification: function() {
        const notification = document.createElement('div');
        notification.className = 'sync-notification';
        notification.innerHTML = `
            <div class="sync-notice">
                <i class="fas fa-sync-alt"></i>
                <div class="sync-text">
                    <strong>数据同步提醒</strong>
                    <p>建议与电脑端同步数据以确保一致性</p>
                </div>
                <button class="sync-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="sync-actions">
                <button class="sync-btn" onclick="MobileDataSync.exportForSync()">
                    <i class="fas fa-download"></i> 导出数据
                </button>
                <button class="sync-btn" onclick="MobileDataSync.showSyncHelp()">
                    <i class="fas fa-question-circle"></i> 同步帮助
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // 10秒后自动隐藏
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 30000);
    },
    
    // 导出用于同步的数据
    exportForSync: function() {
        const data = localStorage.getItem('structuredThoughtAssistant');
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `thought-assistant-sync-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        
        URL.revokeObjectURL(url);
        
        // 更新同步时间
        localStorage.setItem('lastDesktopSync', new Date().getTime().toString());
    },
    
    // 显示同步帮助
    showSyncHelp: function() {
        const helpHTML = `
            <div class="sync-help-modal">
                <div class="help-content">
                    <h3><i class="fas fa-sync"></i> 数据同步指南</h3>
                    <p>为了确保移动端和电脑端数据一致，请按照以下步骤操作：</p>
                    <ol>
                        <li>在电脑端导出完整数据文件</li>
                        <li>通过邮件、云盘或数据线将文件传输到手机</li>
                        <li>在移动端点击"导入数据"选择文件</li>
                        <li>建议每周同步一次数据</li>
                    </ol>
                    <div class="help-tips">
                        <h4>注意事项：</h4>
                        <ul>
                            <li>避免同时在两端修改数据</li>
                            <li>导入前备份当前数据</li>
                            <li>确保导入文件格式正确</li>
                        </ul>
                    </div>
                    <button class="btn-primary close-help">我知道了</button>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', helpHTML);
        
        document.querySelector('.close-help').addEventListener('click', () => {
            document.querySelector('.sync-help-modal').remove();
        });
    },
    
    // 添加同步UI
    addSyncUI: function() {
        // 在数据管理页面添加同步选项
        const observer = new MutationObserver(() => {
            const dataManagement = document.querySelector('[data-view="data-management"], #data-management');
            if (dataManagement && !dataManagement.querySelector('.mobile-sync-section')) {
                const syncSection = `
                    <div class="mobile-sync-section" style="margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                        <h4><i class="fas fa-mobile-alt"></i> 移动端数据同步</h4>
                        <p style="margin: 10px 0; color: #666;">确保与电脑端数据一致</p>
                        <div class="sync-controls">
                            <button class="sync-btn" onclick="MobileDataSync.exportForSync()" style="margin-right: 10px;">
                                <i class="fas fa-download"></i> 导出同步文件
                            </button>
                            <button class="sync-btn secondary" onclick="MobileDataSync.showSyncHelp()">
                                <i class="fas fa-question-circle"></i> 同步帮助
                            </button>
                        </div>
                        <div class="sync-status" style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #ddd;">
                            <p><i class="fas fa-info-circle"></i> 上次同步: ${this.getLastSyncTime()}</p>
                        </div>
                    </div>
                `;
                
                dataManagement.insertAdjacentHTML('afterbegin', syncSection);
            }
        });
        
        observer.observe(document.body, { childList: true, subtree: true });
    },
    
    // 获取上次同步时间
    getLastSyncTime: function() {
        const lastSync = localStorage.getItem('lastDesktopSync');
        if (!lastSync) return '从未同步';
        
        const date = new Date(parseInt(lastSync));
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    }
};
// ==================== 移动端性能优化 ====================
const MobilePerformance = {
    init: function() {
        if (!MobileDataManager.isMobile()) return;
        
        // 优化滚动性能
        this.optimizeScrollPerformance();
        
        // 减少重绘重排
        this.reduceLayoutThrashing();
        
        // 优化图片加载
        this.optimizeImageLoading();
        
        // 添加性能监控
        this.setupPerformanceMonitor();
    },
    
    optimizeScrollPerformance: function() {
        // 启用硬件加速
        const style = document.createElement('style');
        style.textContent = `
            .scroll-container, .thought-list, .model-grid {
                -webkit-overflow-scrolling: touch;
                transform: translateZ(0);
                will-change: transform;
            }
            
            /* 防止滚动卡顿 */
            * {
                -webkit-tap-highlight-color: transparent;
                -webkit-touch-callout: none;
            }
        `;
        document.head.appendChild(style);
    },
    
    reduceLayoutThrashing: function() {
        // 使用requestAnimationFrame优化DOM操作
        const originLoadView = UIManager.loadView;
        UIManager.loadView = function(view) {
            requestAnimationFrame(() => {
                originLoadView.call(this, view);
            });
        };
        
        // 防抖处理滚动事件
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                // 延迟执行的滚动处理
                this.handleScrollEnd();
            }, 100);
        });
    },
    
    optimizeImageLoading: function() {
        // 懒加载图片
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    },
    
    setupPerformanceMonitor: function() {
        // 监控内存使用
        setInterval(() => {
            this.checkMemoryUsage();
        }, 30000);
        
        // 监控FPS
        this.monitorFPS();
    },
    
    checkMemoryUsage: function() {
        // 检查localStorage使用情况
        let totalSize = 0;
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            totalSize += key.length + value.length;
        }
        
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (totalSize > maxSize * 0.8) {
            this.showStorageWarning(totalSize);
        }
    },
    
    showStorageWarning: function(size) {
        const mb = (size / 1024 / 1024).toFixed(2);
        console.warn(`本地存储使用率较高: ${mb}MB`);
        
        // 只在用户操作时提示，避免打扰
        if (Math.random() < 0.1) { // 10%几率提示
            console.info('建议清理不需要的数据或导出备份');
        }
    },
    
    monitorFPS: function() {
        let lastTime = performance.now();
        let frameCount = 0;
        let currentFPS = 60;
        
        const checkFPS = () => {
            const currentTime = performance.now();
            frameCount++;
            
            if (currentTime >= lastTime + 1000) {
                currentFPS = Math.round((frameCount * 1000) / (currentTime - lastTime));
                frameCount = 0;
                lastTime = currentTime;
                
                // 如果FPS过低，尝试优化
                if (currentFPS < 30) {
                    this.triggerLowFPSOptimization();
                }
            }
            
            requestAnimationFrame(checkFPS);
        };
        
        checkFPS();
    },
    
    triggerLowFPSOptimization: function() {
        console.log('检测到低FPS，进行优化...');
        
        // 简化UI元素
        const complexElements = document.querySelectorAll('.thought-node, .model-card');
        if (complexElements.length > 20) {
            complexElements.forEach((el, index) => {
                if (index > 20) {
                    el.style.opacity = '0.8';
                }
            });
        }
    },
    
    handleScrollEnd: function() {
        // 滚动结束后可以执行一些操作
        // 例如：加载更多内容、更新位置等
    }
};
// ==================== 移动端优化总初始化 ====================
const MobileOptimizer = {
    // 初始化所有移动端优化
    init: function() {
        if (!MobileDataManager.isMobile()) return;
        
        console.log('初始化移动端优化...');
        
        // 1. 初始化数据管理
        MobileDataManager.init();
        
        // 2. 初始化导航管理器
        MobileNavManager.init();
        
        // 3. 初始化数据同步
        MobileDataSync.init();
        
        // 4. 初始化性能优化
        MobilePerformance.init();
        
        // 5. 添加移动端特定样式
        this.addMobileSpecificStyles();
        
        // 6. 优化现有UI组件
        this.optimizeExistingUI();
        
        // 7. 添加移动端事件监听
        this.setupMobileEventListeners();
        
        console.log('移动端优化完成');
    },
    
    addMobileSpecificStyles: function() {
        // 确保移动端CSS已加载
        if (!document.getElementById('mobile-styles')) {
            const style = document.createElement('style');
            style.id = 'mobile-styles';
            style.textContent = MobileCSS; // 这里应该包含所有移动端CSS
            document.head.appendChild(style);
        }
    },
    
    optimizeExistingUI: function() {
        // 优化现有UI组件以适应移动端
        this.optimizeThoughtCards();
        this.optimizeModelGrid();
        this.optimizeForms();
    },
    
    optimizeThoughtCards: function() {
        // 思维卡片移动端优化
        const cards = document.querySelectorAll('.thought-card');
        cards.forEach(card => {
            card.style.padding = '12px';
            card.style.margin = '8px 0';
            card.style.fontSize = '14px';
            
            // 添加触摸反馈
            card.style.transition = 'background-color 0.2s';
            card.addEventListener('touchstart', () => {
                card.style.backgroundColor = '#f5f5f5';
            });
            card.addEventListener('touchend', () => {
                card.style.backgroundColor = '';
            });
        });
    },
    
    optimizeModelGrid: function() {
        // 模型网格移动端优化
        const grid = document.querySelector('.model-grid');
        if (grid) {
            grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(150px, 1fr))';
            grid.style.gap = '10px';
        }
    },
    
    optimizeForms: function() {
        // 表单元素移动端优化
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            // 确保字体大小合适
            if (input.type !== 'checkbox' && input.type !== 'radio') {
                input.style.fontSize = '16px'; // 防止iOS缩放
                input.style.minHeight = '44px'; // 最小触摸目标尺寸
            }
            
            // 添加适当的边距
            input.style.margin = '8px 0';
        });
    },
    
    setupMobileEventListeners: function() {
        // 防止双击缩放
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (event) => {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
        
        // 处理虚拟键盘弹出
        window.addEventListener('resize', () => {
            setTimeout(() => {
                // 滚动到活动输入框
                const activeElement = document.activeElement;
                if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
                    activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
        });
        
        // 页面可见性变化时保存数据
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // 页面隐藏时自动保存
                this.autoSave();
            }
        });
    },
    
    autoSave: function() {
        console.log('移动端自动保存...');
        // 这里可以实现自动保存逻辑
        if (typeof DataStore !== 'undefined' && typeof DataStore.saveData === 'function') {
            DataStore.saveData();
        }
    }
};

// 在页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        MobileOptimizer.init();
    }, 100);
});

// 添加移动端CSS变量
const MobileCSS = `
    :root {
        --mobile-safe-area-top: env(safe-area-inset-top);
        --mobile-safe-area-bottom: env(safe-area-inset-bottom);
        --mobile-safe-area-left: env(safe-area-inset-left);
        --mobile-safe-area-right: env(safe-area-inset-right);
    }
    
    /* 同步通知样式 */
    .sync-notification {
        position: fixed;
        top: 10px;
        left: 10px;
        right: 10px;
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        color: white;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 2000;
        overflow: hidden;
    }
    
    .sync-notice {
        display: flex;
        align-items: center;
        padding: 15px;
    }
    
    .sync-notice i {
        font-size: 24px;
        margin-right: 15px;
    }
    
    .sync-text {
        flex: 1;
    }
    
    .sync-close {
        background: none;
        border: none;
        color: white;
        font-size: 18px;
    }
    
    .sync-actions {
        display: flex;
        padding: 0 15px 15px;
        gap: 10px;
    }
    
    .sync-btn {
        flex: 1;
        padding: 10px;
        background: rgba(255,255,255,0.2);
        border: 1px solid rgba(255,255,255,0.3);
        border-radius: 6px;
        color: white;
        backdrop-filter: blur(10px);
    }
    
    .sync-btn.secondary {
        background: rgba(255,255,255,0.1);
    }
    
    /* 同步帮助弹窗 */
    .sync-help-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2001;
        padding: 20px;
    }
    
    .help-content {
        background: white;
        border-radius: 15px;
        padding: 25px;
        max-width: 500px;
        max-height: 80vh;
        overflow-y: auto;
    }
    
    .help-content h3 {
        display: flex;
        align-items: center;
        color: #007bff;
        margin-bottom: 20px;
    }
    
    .help-content h3 i {
        margin-right: 10px;
    }
    
    .help-tips {
        background: #f8f9fa;
        padding: 15px;
        border-radius: 8px;
        margin: 20px 0;
    }
    
    .close-help {
        width: 100%;
        margin-top: 20px;
    }
    
    /* 移动端特定按钮样式 */
    .mobile-btn {
        padding: 14px 20px;
        border-radius: 8px;
        border: none;
        font-weight: bold;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        transition: all 0.2s;
        font-size: 15px;
    }
    
    .mobile-btn:active {
        transform: scale(0.98);
    }
    
    .mobile-btn.export {
        background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
        color: white;
    }
    
    .mobile-btn.import {
        background: linear-gradient(135deg, #17a2b8 0%, #6fcee6 100%);
        color: white;
    }
    
    /* 响应式表格 */
    .mobile-table {
        width: 100%;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
    }
    
    /* 加载状态优化 */
    .mobile-loading {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 40px 20px;
    }
    
    .mobile-loading .spinner {
        width: 40px;
        height: 40px;
        border: 3px solid #f3f3f3;
        border-top: 3px solid #007bff;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
// ==================== 移动端导航管理器 ====================
const MobileNavManager = {
    navType: 'bottom', // 默认底部导航: 'bottom', 'corner', 'gesture'
    isExpanded: false,
    
    init: function() {
        if (!MobileDataManager.isMobile()) return;
        
        // 检测用户之前的导航偏好
        const savedNavType = localStorage.getItem('mobileNavType');
        if (savedNavType) {
            this.navType = savedNavType;
        }
        
        // 移除原有导航栏
        this.removeOriginalNav();
        
        // 根据类型初始化导航
        this.initNavigation();
        
        // 添加导航样式切换按钮
        this.addNavToggle();
        
        // 添加手势支持
        this.addGestureSupport();
    },
    
    removeOriginalNav: function() {
        const desktopNav = document.querySelector('.desktop-nav, #main-nav, .sidebar');
        if (desktopNav) {
            desktopNav.style.display = 'none';
        }
    },
    
    initNavigation: function() {
        switch(this.navType) {
            case 'corner':
                this.createCornerNavigation();
                break;
            case 'gesture':
                this.createGestureNavigation();
                break;
            default:
                this.createBottomNavigation();
        }
        
        // 调整内容区域边距
        this.adjustContentMargin();
    },
    
    // 方案1: 底部导航栏
    createBottomNavigation: function() {
        const navHTML = `
            <div class="mobile-bottom-nav" id="mobile-bottom-nav">
                <div class="nav-items">
                    <button class="nav-item active" data-view="thought-map">
                        <i class="fas fa-project-diagram"></i>
                        <span>思维导图</span>
                    </button>
                    <button class="nav-item" data-view="data-management">
                        <i class="fas fa-database"></i>
                        <span>数据管理</span>
                    </button>
                    <button class="nav-item" data-view="model-manager">
                        <i class="fas fa-robot"></i>
                        <span>模型</span>
                    </button>
                    <button class="nav-item" data-view="settings">
                        <i class="fas fa-cog"></i>
                        <span>设置</span>
                    </button>
                    <button class="nav-item more-btn" id="mobile-nav-more">
                        <i class="fas fa-ellipsis-h"></i>
                        <span>更多</span>
                    </button>
                </div>
                <div class="more-menu" id="mobile-more-menu">
                    <button class="more-item" data-view="export"><i class="fas fa-download"></i> 导出数据</button>
                    <button class="more-item" data-view="import"><i class="fas fa-upload"></i> 导入数据</button>
                    <button class="more-item" data-view="help"><i class="fas fa-question-circle"></i> 帮助</button>
                    <button class="more-item" id="nav-style-toggle"><i class="fas fa-palette"></i> 切换导航样式</button>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', navHTML);
        this.bindBottomNavEvents();
    },

        // 方案2: 角落悬浮按钮导航
    createCornerNavigation: function() {
        const navHTML = `
            <div class="mobile-corner-nav" id="mobile-corner-nav">
                <button class="corner-nav-btn" id="corner-nav-main">
                    <i class="fas fa-bars"></i>
                </button>
                <div class="corner-nav-menu" id="corner-nav-menu">
                    <button class="corner-item" data-view="thought-map">
                        <i class="fas fa-project-diagram"></i>
                        <span>思维导图</span>
                    </button>
                    <button class="corner-item" data-view="data-management">
                        <i class="fas fa-database"></i>
                        <span>数据管理</span>
                    </button>
                    <button class="corner-item" data-view="model-manager">
                        <i class="fas fa-robot"></i>
                        <span>模型管理</span>
                    </button>
                    <button class="corner-item" data-view="settings">
                        <i class="fas fa-cog"></i>
                        <span>设置</span>
                    </button>
                    <button class="corner-item" data-view="export">
                        <i class="fas fa-download"></i>
                        <span>导出</span>
                    </button>
                    <button class="corner-item" id="nav-style-toggle">
                        <i class="fas fa-palette"></i>
                        <span>切换样式</span>
                    </button>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', navHTML);
        this.bindCornerNavEvents();
    },

        // 方案3: 手势导航 (边缘滑动)
    createGestureNavigation: function() {
        const navHTML = `
            <div class="mobile-gesture-nav">
                <div class="gesture-edge left-edge"></div>
                <div class="gesture-edge right-edge"></div>
                <div class="gesture-menu" id="gesture-menu">
                    <div class="gesture-header">
                        <h4>快速导航</h4>
                        <button class="close-gesture" id="close-gesture">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="gesture-items">
                        <button class="gesture-item" data-view="thought-map">
                            <i class="fas fa-project-diagram"></i>
                            <span>思维导图</span>
                        </button>
                        <button class="gesture-item" data-view="data-management">
                            <i class="fas fa-database"></i>
                            <span>数据管理</span>
                        </button>
                        <button class="gesture-item" data-view="model-manager">
                            <i class="fas fa-robot"></i>
                            <span>模型管理</span>
                        </button>
                        <button class="gesture-item" data-view="settings">
                            <i class="fas fa-cog"></i>
                            <span>设置</span>
                        </button>
                    </div>
                    <div class="gesture-footer">
                        <button class="gesture-btn" id="nav-style-toggle">
                            <i class="fas fa-palette"></i> 切换导航样式
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', navHTML);
        this.bindGestureNavEvents();
    },
    
        // 添加导航样式切换按钮
    addNavToggle: function() {
        // 样式切换弹窗
        const styleModalHTML = `
            <div class="nav-style-modal" id="nav-style-modal">
                <div class="style-modal-content">
                    <div class="style-modal-header">
                        <h3>选择导航样式</h3>
                        <button class="close-style-modal" id="close-style-modal">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="style-options">
                        <div class="style-option ${this.navType === 'bottom' ? 'active' : ''}" data-style="bottom">
                            <div class="style-preview bottom-preview"></div>
                            <h4>底部导航</h4>
                            <p>传统易用，固定显示</p>
                        </div>
                        <div class="style-option ${this.navType === 'corner' ? 'active' : ''}" data-style="corner">
                            <div class="style-preview corner-preview"></div>
                            <h4>角落悬浮</h4>
                            <p>节省空间，点击展开</p>
                        </div>
                        <div class="style-option ${this.navType === 'gesture' ? 'active' : ''}" data-style="gesture">
                            <div class="style-preview gesture-preview"></div>
                            <h4>手势导航</h4>
                            <p>边缘滑动，现代交互</p>
                        </div>
                    </div>
                    <div class="style-modal-footer">
                        <button class="btn-secondary" id="cancel-style-change">取消</button>
                        <button class="btn-primary" id="apply-style-change">应用样式</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', styleModalHTML);
        this.bindStyleModalEvents();
    },
    
    // 调整内容区域边距
    adjustContentMargin: function() {
        const contentArea = document.getElementById('content-area');
        if (!contentArea) return;
        
        // 移除原有边距
        contentArea.style.marginBottom = '0';
        contentArea.style.marginLeft = '0';
        
        // 根据导航类型添加边距
        if (this.navType === 'bottom') {
            contentArea.style.paddingBottom = '70px'; // 为底部导航留出空间
        }
    },
    
    // 切换导航样式
    switchNavStyle: function(styleType) {
        // 保存用户偏好
        localStorage.setItem('mobileNavType', styleType);
        this.navType = styleType;
        
        // 移除现有导航
        const oldNav = document.querySelector('.mobile-bottom-nav, .mobile-corner-nav, .mobile-gesture-nav');
        if (oldNav) {
            oldNav.remove();
        }
        
        // 重新初始化导航
        this.initNavigation();
    },
    
    // 数据同步优化
    syncDataWithDesktop: function() {
        // 解决移动端数据与电脑端不一致的问题
        const mobileData = localStorage.getItem('structuredThoughtAssistant');
        
        // 检查数据版本
        const dataVersion = localStorage.getItem('dataVersion') || '1.0';
        const desktopVersion = sessionStorage.getItem('desktopDataVersion');
        
        if (desktopVersion && desktopVersion !== dataVersion) {
            // 提示用户数据版本不一致
            this.showSyncPrompt();
        }
        
        // 清理可能的多余数据
        this.cleanupExcessData();
    },
    
    cleanupExcessData: function() {
        // 清理可能存在的临时数据或重复数据
        const keysToCheck = [
            'tempThoughtData',
            'draftThoughts',
            'unsavedChanges',
            'autoSaveBackup'
        ];
        
        keysToCheck.forEach(key => {
            if (localStorage.getItem(key)) {
                localStorage.removeItem(key);
            }
        });
    },
    
    // 绑定事件
    bindBottomNavEvents: function() {
        // 导航项点击
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.currentTarget.classList.contains('more-btn')) {
                    const menu = document.getElementById('mobile-more-menu');
                    menu.classList.toggle('show');
                    return;
                }
                
                const view = e.currentTarget.getAttribute('data-view');
                UIManager.loadView(view);
                
                // 更新激活状态
                document.querySelectorAll('.nav-item').forEach(nav => {
                    nav.classList.remove('active');
                });
                e.currentTarget.classList.add('active');
                
                // 隐藏更多菜单
                document.getElementById('mobile-more-menu').classList.remove('show');
            });
        });
        
        // 更多菜单项点击
        document.querySelectorAll('.more-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const view = e.currentTarget.getAttribute('data-view');
                if (view === 'export') {
                    UIManager.exportAllData();
                } else if (view === 'import') {
                    document.getElementById('mobile-file-input').click();
                } else if (e.currentTarget.id === 'nav-style-toggle') {
                    document.getElementById('nav-style-modal').classList.add('show');
                } else {
                    UIManager.loadView(view);
                }
                
                // 隐藏菜单
                document.getElementById('mobile-more-menu').classList.remove('show');
            });
        });
    },
    
    bindCornerNavEvents: function() {
        const mainBtn = document.getElementById('corner-nav-main');
        const menu = document.getElementById('corner-nav-menu');
        
        mainBtn.addEventListener('click', () => {
            menu.classList.toggle('expanded');
            mainBtn.classList.toggle('expanded');
        });
        
        // 菜单项点击
        document.querySelectorAll('.corner-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.currentTarget.id === 'nav-style-toggle') {
                    document.getElementById('nav-style-modal').classList.add('show');
                } else {
                    const view = e.currentTarget.getAttribute('data-view');
                    UIManager.loadView(view);
                }
                
                // 关闭菜单
                menu.classList.remove('expanded');
                mainBtn.classList.remove('expanded');
            });
        });
    },
    
    bindGestureNavEvents: function() {
        const leftEdge = document.querySelector('.left-edge');
        const rightEdge = document.querySelector('.right-edge');
        const gestureMenu = document.getElementById('gesture-menu');
        const closeBtn = document.getElementById('close-gesture');
        
        let startX, startY;
        let edgeSwipe = false;
        
        // 边缘滑动检测
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            
            // 检查是否从边缘开始
            if (startX < 30 || startX > window.innerWidth - 30) {
                edgeSwipe = true;
            }
        });
        
        document.addEventListener('touchmove', (e) => {
            if (!edgeSwipe) return;
            
            const currentX = e.touches[0].clientX;
            const diffX = currentX - startX;
            
            // 从左边缘向右滑动，或从右边缘向左滑动
            if ((startX < 30 && diffX > 50) || 
                (startX > window.innerWidth - 30 && diffX < -50)) {
                e.preventDefault();
                gestureMenu.classList.add('show');
                edgeSwipe = false;
            }
        });
        
        document.addEventListener('touchend', () => {
            edgeSwipe = false;
        });
        
        // 关闭按钮
        closeBtn.addEventListener('click', () => {
            gestureMenu.classList.remove('show');
        });
        
        // 菜单项点击
        document.querySelectorAll('.gesture-item, .gesture-btn').forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.currentTarget.id === 'nav-style-toggle') {
                    document.getElementById('nav-style-modal').classList.add('show');
                } else {
                    const view = e.currentTarget.getAttribute('data-view');
                    UIManager.loadView(view);
                }
                
                // 关闭手势菜单
                gestureMenu.classList.remove('show');
            });
        });
    },
    
    bindStyleModalEvents: function() {
        const modal = document.getElementById('nav-style-modal');
        const closeBtn = document.getElementById('close-style-modal');
        const cancelBtn = document.getElementById('cancel-style-change');
        const applyBtn = document.getElementById('apply-style-change');
        
        let selectedStyle = this.navType;
        
        // 样式选项点击
        document.querySelectorAll('.style-option').forEach(option => {
            option.addEventListener('click', () => {
                document.querySelectorAll('.style-option').forEach(opt => {
                    opt.classList.remove('active');
                });
                option.classList.add('active');
                selectedStyle = option.getAttribute('data-style');
            });
        });
        
        // 关闭弹窗
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
        });
        
        cancelBtn.addEventListener('click', () => {
            modal.classList.remove('show');
        });
        
        // 应用样式
        applyBtn.addEventListener('click', () => {
            if (selectedStyle !== this.navType) {
                this.switchNavStyle(selectedStyle);
            }
            modal.classList.remove('show');
        });
        
        // 点击背景关闭
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    },
    
    addGestureSupport: function() {
        // 添加全局手势支持
        let lastTouchEnd = 0;
        
        // 双击刷新
        document.addEventListener('touchend', (event) => {
            const now = Date.now();
            if (now - lastTouchEnd < 300) {
                // 双击处理
                this.handleDoubleTap(event);
            }
            lastTouchEnd = now;
        });
        
        // 长按菜单
        let longPressTimer;
        document.addEventListener('touchstart', (e) => {
            longPressTimer = setTimeout(() => {
                this.showContextMenu(e);
            }, 800);
        });
        
        document.addEventListener('touchend', () => {
            clearTimeout(longPressTimer);
        });
    },
    
    handleDoubleTap: function(event) {
        // 双击顶部回到顶部
        if (event.touches[0].clientY < 100) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    },
    
    showContextMenu: function(event) {
        // 显示上下文菜单
        const menuHTML = `
            <div class="mobile-context-menu" style="top: ${event.touches[0].clientY}px; left: ${event.touches[0].clientX}px">
                <button class="context-item" onclick="UIManager.exportAllData()">
                    <i class="fas fa-download"></i> 导出数据
                </button>
                <button class="context-item" onclick="document.getElementById('mobile-file-input').click()">
                    <i class="fas fa-upload"></i> 导入数据
                </button>
                <button class="context-item" onclick="MobileNavManager.switchNavStyle('${this.navType === 'bottom' ? 'corner' : 'bottom'}')">
                    <i class="fas fa-exchange-alt"></i> 切换导航
                </button>
                <button class="context-item" onclick="this.parentElement.remove()">
                    <i class="fas fa-times"></i> 关闭
                </button>
            </div>
        `;
        
        // 移除现有菜单
        const existingMenu = document.querySelector('.mobile-context-menu');
        if (existingMenu) existingMenu.remove();
        
        document.body.insertAdjacentHTML('beforeend', menuHTML);
        
        // 点击其他地方关闭
        setTimeout(() => {
            document.addEventListener('click', function closeMenu() {
                const menu = document.querySelector('.mobile-context-menu');
                if (menu) menu.remove();
                document.removeEventListener('click', closeMenu);
            });
        }, 100);
    }
};
