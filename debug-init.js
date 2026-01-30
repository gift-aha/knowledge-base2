// 初始化诊断工具
(function() {
    console.log('=== 移动端优化初始化诊断 ===');
    
    // 1. 检查关键模块
    function checkModules() {
        const modules = [
            'MobileDataManager',
            'MobileNavManager',
            'MobileDataSync',
            'MobilePerformance',
            'MobileOptimizer',
            'UIManager'
        ];
        
        console.group('模块检查');
        modules.forEach(module => {
            const exists = typeof window[module] !== 'undefined';
            console.log(`${exists ? '✅' : '❌'} ${module}`);
            
            if (exists) {
                // 检查是否有 init 方法
                const hasInit = typeof window[module].init === 'function';
                console.log(`   ${hasInit ? '✅' : '⚠️'} 有 init 方法`);
            }
        });
        console.groupEnd();
    }
    
    // 2. 检查移动端检测
    function checkMobileDetection() {
        console.group('移动端检测');
        
        // 原生的移动端检测
        const userAgent = navigator.userAgent;
        const isMobileNative = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
        console.log(`原生检测: ${isMobileNative ? '移动端' : '电脑端'}`);
        console.log('User Agent:', userAgent);
        
        // 如果有 MobileDataManager，检查它的检测
        if (typeof MobileDataManager !== 'undefined' && 
            typeof MobileDataManager.isMobile === 'function') {
            try {
                const isMobileByModule = MobileDataManager.isMobile();
                console.log(`模块检测: ${isMobileByModule ? '移动端' : '电脑端'}`);
                
                // 对比结果
                if (isMobileNative !== isMobileByModule) {
                    console.warn('⚠️ 检测结果不一致！');
                }
            } catch (e) {
                console.error('模块检测失败:', e.message);
            }
        } else {
            console.warn('⚠️ MobileDataManager.isMobile 不可用');
        }
        
        console.groupEnd();
    }
    
    // 3. 检查事件监听
    function checkEventListeners() {
        console.group('事件监听检查');
        
        // 检查 DOMContentLoaded 是否已触发
        if (document.readyState === 'loading') {
            console.log('文档仍在加载中...');
        } else {
            console.log(`文档状态: ${document.readyState}`);
        }
        
        // 检查按钮事件
        const buttons = document.querySelectorAll('button');
        console.log(`页面有 ${buttons.length} 个按钮`);
        
        buttons.forEach((btn, i) => {
            const btnInfo = {
                index: i,
                id: btn.id || '(无ID)',
                text: btn.textContent.trim() || '(无文本)',
                hasOnclick: !!btn.onclick
            };
            console.log(`按钮 ${i}:`, btnInfo);
        });
        
        console.groupEnd();
    }
    
    // 4. 提供修复函数
    window.fixMobileOptimizer = function() {
        console.log('执行修复...');
        
        // 确保 MobileDataManager 存在
        if (typeof MobileDataManager === 'undefined') {
            console.log('创建 MobileDataManager...');
            window.MobileDataManager = {
                isMobile: function() {
                    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
                        .test(navigator.userAgent);
                },
                init: function() {
                    console.log('MobileDataManager.init()');
                }
            };
        }
        
        // 确保 MobileOptimizer 存在
        if (typeof MobileOptimizer === 'undefined') {
            console.log('创建 MobileOptimizer...');
            window.MobileOptimizer = {
                init: function() {
                    console.log('MobileOptimizer.init() - 简化版本');
                    this.fixButtons();
                },
                fixButtons: function() {
                    document.querySelectorAll('button').forEach(btn => {
                        btn.onclick = function() {
                            alert('按钮点击: ' + (this.textContent || this.id));
                        };
                    });
                }
            };
        }
        
        // 尝试初始化
        try {
            MobileOptimizer.init();
            console.log('✅ 修复完成');
        } catch (e) {
            console.error('修复失败:', e);
        }
    };
    
    // 5. 自动运行诊断
    setTimeout(() => {
        checkModules();
        checkMobileDetection();
        checkEventListeners();
        
        console.log('=== 诊断完成 ===');
        console.log('在控制台输入 fixMobileOptimizer() 尝试修复');
    }, 500);
})();
