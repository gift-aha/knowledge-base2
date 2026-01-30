// ==================== 移动端优化总初始化 ====================
// mobile-optimizer.js - 移动端优化整合文件
// 创建日期: 2024

(function() {
    'use strict';
    
    console.log('加载 mobile-optimizer.js');
    
    // 1. 检查关键依赖
    function checkDependencies() {
        const required = ['MobileDataManager', 'UIManager'];
        let allOk = true;
        
        for (const dep of required) {
            if (typeof window[dep] === 'undefined') {
                console.error(`❌ 缺失依赖: ${dep}`);
                allOk = false;
            }
        }
        
        return allOk;
    }
    
    // 2. 主初始化函数
    function initMobileOptimizer() {
        console.log('开始移动端优化初始化...');
        
        // 2.1 检查是否移动端
        if (!isMobileDevice()) {
            console.log('非移动设备，跳过移动端优化');
            return;
        }
        
        // 2.2 如果 MobileDataManager 存在，初始化它
        if (typeof MobileDataManager !== 'undefined' && 
            typeof MobileDataManager.init === 'function') {
            try {
                MobileDataManager.init();
                console.log('✅ MobileDataManager 初始化完成');
            } catch (e) {
                console.error('MobileDataManager 初始化失败:', e);
            }
        }
        
        // 2.3 根据您的项目，初始化其他模块
        initNavigation();
        initDataSync();
        applyMobileStyles();
        
        console.log('✅ 移动端优化初始化完成');
    }
    
    // 3. 移动设备检测（备用）
    function isMobileDevice() {
        // 如果有 MobileDataManager.isMobile，使用它
        if (typeof MobileDataManager !== 'undefined' && 
            typeof MobileDataManager.isMobile === 'function') {
            return MobileDataManager.isMobile();
        }
        
        // 否则使用基本检测
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
            .test(navigator.userAgent);
    }
    
    // 4. 初始化导航
    function initNavigation() {
        // 如果您有 MobileNavManager
        if (typeof MobileNavManager !== 'undefined' && 
            typeof MobileNavManager.init === 'function') {
            try {
                MobileNavManager.init();
                console.log('✅ 移动端导航初始化完成');
            } catch (e) {
                console.error('导航初始化失败:', e);
                setupBasicNavigation();
            }
        } else {
            setupBasicNavigation();
        }
    }
    
    // 5. 基础导航设置
    function setupBasicNavigation() {
        console.log('设置基础导航...');
        
        // 确保所有链接和按钮可点击
        document.querySelectorAll('a, button').forEach(element => {
            element.style.cursor = 'pointer';
        });
    }
    
    // 6. 初始化数据同步（GitHub Pages方案）
    function initDataSync() {
        // 如果您有 GitHubDataSync 模块
        if (typeof GitHubDataSync !== 'undefined' && 
            typeof GitHubDataSync.init === 'function') {
            try {
                GitHubDataSync.init();
                console.log('✅ 数据同步初始化完成');
            } catch (e) {
                console.error('数据同步初始化失败:', e);
            }
        }
    }
    
    // 7. 应用移动端样式
    function applyMobileStyles() {
        const styleId = 'mobile-optimizer-styles';
        
        // 如果已经添加过样式，跳过
        if (document.getElementById(styleId)) return;
        
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            /* 移动端优化样式 */
            @media (max-width: 768px) {
                body {
                    font-size: 16px;
                    -webkit-text-size-adjust: 100%;
                }
                
                button, input, textarea, select {
                    font-size: 16px !important;
                    min-height: 44px !important;
                }
                
                /* 触摸友好 */
                a, button {
                    min-height: 44px;
                    min-width: 44px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                }
            }
        `;
        
        document.head.appendChild(style);
        console.log('✅ 移动端样式已应用');
    }
    
    // 8. 安全初始化
    function safeInit() {
        // 检查依赖
        if (!checkDependencies()) {
            console.warn('缺少部分依赖，但继续初始化...');
        }
        
        // 执行初始化
        try {
            initMobileOptimizer();
        } catch (error) {
            console.error('移动端优化初始化失败:', error);
            
            // 降级处理：确保按钮可点击
            document.querySelectorAll('button').forEach(btn => {
                btn.onclick = function() {
                    console.log('按钮点击:', this.textContent);
                };
            });
        }
    }
    
    // 9. 页面加载后初始化
    function onDOMReady() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', safeInit);
        } else {
            // DOM 已经加载完成
            setTimeout(safeInit, 100);
        }
    }
    
    // 10. 立即开始
    onDOMReady();
    
    // 导出到全局（如果需要）
    window.MobileOptimizer = {
        init: initMobileOptimizer,
        reinit: safeInit
    };
    
    console.log('mobile-optimizer.js 加载完成');
})();
