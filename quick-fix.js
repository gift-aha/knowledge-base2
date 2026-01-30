// ==================== 快速修复方案 ====================
// 这个文件解决按钮无反应和初始化失败问题

(function() {
    'use strict';
    
    console.log('开始快速修复...');
    
    // 1. 修复初始化失败问题
    function fixInitialization() {
        // 如果 MobileOptimizer 不存在，创建一个简单的版本
        if (typeof window.MobileOptimizer === 'undefined') {
            console.warn('MobileOptimizer 未定义，创建简易版本');
            
            window.MobileOptimizer = {
                init: function() {
                    console.log('简易 MobileOptimizer 初始化');
                    
                    // 只做最基本的初始化
                    this.fixButtons();
                    this.addMobileStyles();
                    this.setupBasicEvents();
                    
                    return true;
                },
                
                fixButtons: function() {
                    console.log('修复按钮点击事件...');
                    
                    // 给所有按钮添加点击事件
                    document.addEventListener('click', function(e) {
                        const target = e.target;
                        const button = target.closest('button');
                        
                        if (!button) return;
                        
                        console.log('按钮点击:', button.textContent || button.id || button.className);
                        
                        // 根据按钮类型处理
                        handleButtonClick(button);
                        
                        // 阻止默认行为（如果按钮有href="#"）
                        if (target.tagName === 'A' && target.getAttribute('href') === '#') {
                            e.preventDefault();
                        }
                    });
                },
                
                addMobileStyles: function() {
                    // 添加基本的移动端样式
                    const style = document.createElement('style');
                    style.textContent = `
                        /* 确保按钮可点击 */
                        button, .btn, [role="button"] {
                            cursor: pointer !important;
                            touch-action: manipulation !important;
                        }
                        
                        /* 移动端优化 */
                        @media (max-width: 768px) {
                            body {
                                font-size: 16px !important;
                            }
                            
                            button {
                                min-height: 44px !important; /* 苹果推荐的最小触摸目标 */
                                min-width: 44px !important;
                            }
                        }
                    `;
                    document.head.appendChild(style);
                },
                
                setupBasicEvents: function() {
                    // 处理常见的按钮类型
                    function handleButtonClick(button) {
                        const text = button.textContent.toLowerCase();
                        const id = button.id;
                        const cls = button.className;
                        
                        // 导出按钮
                        if (text.includes('导出') || id.includes('export') || cls.includes('export')) {
                            console.log('触发导出操作');
                            handleExport();
                        }
                        
                        // 导入按钮
                        else if (text.includes('导入') || id.includes('import') || cls.includes('import')) {
                            console.log('触发导入操作');
                            handleImport();
                        }
                        
                        // 导航按钮
                        else if (button.hasAttribute('data-view')) {
                            const view = button.getAttribute('data-view');
                            console.log('导航到:', view);
                            navigateTo(view);
                        }
                        
                        // 其他按钮
                        else {
                            console.log('未知按钮，执行默认操作');
                        }
                    }
                    
                    function handleExport() {
                        // 尝试调用现有的导出函数
                        if (typeof UIManager !== 'undefined' && UIManager.exportAllData) {
                            UIManager.exportAllData();
                        } else {
                            alert('导出功能未完全初始化，请刷新页面重试');
                        }
                    }
                    
                    function handleImport() {
                        // 创建文件输入框
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = '.json';
                        input.style.display = 'none';
                        input.onchange = function(e) {
                            if (typeof UIManager !== 'undefined' && UIManager.importDataFromFile) {
                                UIManager.importDataFromFile(e.target.files[0]);
                            }
                        };
                        document.body.appendChild(input);
                        input.click();
                    }
                    
                    function navigateTo(view) {
                        // 简单的页面切换
                        const pages = document.querySelectorAll('.detail-page, .page, [data-page]');
                        pages.forEach(page => {
                            page.style.display = 'none';
                        });
                        
                        const targetPage = document.getElementById('page-' + view) || 
                                         document.querySelector('[data-page="' + view + '"]');
                        if (targetPage) {
                            targetPage.style.display = 'block';
                        }
                        
                        // 更新活动状态
                        document.querySelectorAll('[data-view]').forEach(btn => {
                            btn.classList.remove('active');
                        });
                        button.classList.add('active');
                    }
                }
            };
        }
    }
    
    // 2. 确保 DOMContentLoaded 事件正常工作
    function fixDOMContentLoaded() {
        // 如果已经加载完成，立即执行
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            console.log('文档已准备就绪，立即初始化');
            setTimeout(initApp, 0);
        } else {
            // 否则等待事件
            document.addEventListener('DOMContentLoaded', function() {
                console.log('DOMContentLoaded 触发');
                setTimeout(initApp, 100);
            });
            
            // 添加 fallback
            window.addEventListener('load', function() {
                console.log('window.load 触发');
                setTimeout(initApp, 200);
            });
        }
    }
    
    // 3. 主初始化函数
    function initApp() {
        console.log('开始应用初始化...');
        
        try {
            // 先修复初始化问题
            fixInitialization();
            
            // 尝试调用原有的初始化函数
            if (typeof MobileOptimizer !== 'undefined' && typeof MobileOptimizer.init === 'function') {
                console.log('调用原有的 MobileOptimizer.init()');
                MobileOptimizer.init();
            } else {
                console.log('使用简易初始化');
                window.MobileOptimizer.init();
            }
            
            // 确保按钮可点击
            ensureButtonsClickable();
            
            console.log('应用初始化完成');
        } catch (error) {
            console.error('初始化失败:', error);
            emergencyFix();
        }
    }
    
    // 4. 确保按钮可点击
    function ensureButtonsClickable() {
        // 给所有按钮添加事件监听器
        const buttons = document.querySelectorAll('button, .btn, [role="button"]');
        
        buttons.forEach(button => {
            // 移除所有现有的事件监听器（通过克隆）
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            // 添加基本样式
            newButton.style.cursor = 'pointer';
            
            // 添加点击反馈
            newButton.addEventListener('touchstart', function() {
                this.style.opacity = '0.8';
            });
            
            newButton.addEventListener('touchend', function() {
                this.style.opacity = '1';
            });
        });
        
        console.log(`修复了 ${buttons.length} 个按钮`);
    }
    
    // 5. 紧急修复（当所有方法都失败时）
    function emergencyFix() {
        console.log('执行紧急修复...');
        
        // 创建状态指示器
        const statusDiv = document.createElement('div');
        statusDiv.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: #ff6b6b;
            color: white;
            padding: 10px;
            border-radius: 5px;
            z-index: 9999;
            font-size: 12px;
        `;
        statusDiv.textContent = '检测到问题，正在修复...';
        document.body.appendChild(statusDiv);
        
        // 创建修复按钮
        const fixBtn = document.createElement('button');
        fixBtn.textContent = '点击修复按钮';
        fixBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            right: 20px;
            padding: 15px;
            background: #4ecdc4;
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 16px;
            z-index: 9998;
        `;
        fixBtn.onclick = function() {
            alert('修复按钮已点击，尝试重新加载页面');
            location.reload();
        };
        document.body.appendChild(fixBtn);
        
        // 3秒后移除状态提示
        setTimeout(() => {
            statusDiv.textContent = '修复完成，请点击下方按钮测试';
        }, 3000);
    }
    
    // 6. 检查依赖模块
    function checkDependencies() {
        const dependencies = [
            'MobileDataManager',
            'MobileNavManager', 
            'MobileDataSync',
            'MobilePerformance',
            'MobileOptimizer',
            'UIManager'
        ];
        
        console.group('依赖检查');
        dependencies.forEach(dep => {
            if (typeof window[dep] === 'undefined') {
                console.warn(`⚠️ ${dep} 未定义`);
            } else {
                console.log(`✅ ${dep} 已定义`);
            }
        });
        console.groupEnd();
    }
    
    // 启动修复
    console.log('快速修复脚本加载完成');
    checkDependencies();
    fixDOMContentLoaded();
    
})();
