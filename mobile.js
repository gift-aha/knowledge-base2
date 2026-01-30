// mobile.js - 移动端专用功能

// 移动端管理器
const MobileManager = {
    init: function() {
        this.setupMobileNavigation();
        this.setupMobileSearch();
        this.setupMobileViewSwitcher();
        this.setupMobileBottomNav();
        this.setupMobileStats();
        this.setupTouchEvents();
        this.setupViewportFix();
        
        // 监听窗口大小变化
        window.addEventListener('resize', this.handleResize.bind(this));
        
        // 初始化处理
        this.handleResize();
        
        console.log('移动端管理器已初始化');
    },
    
    // 设置移动端导航
    setupMobileNavigation: function() {
        const menuToggle = document.getElementById('mobile-menu-toggle');
        const sidebar = document.getElementById('mobile-sidebar');
        const overlay = document.getElementById('mobile-sidebar-overlay');
        const closeBtn = document.getElementById('mobile-sidebar-close');
        
        if (menuToggle && sidebar && overlay) {
            const toggleSidebar = () => {
                menuToggle.classList.toggle('active');
                sidebar.classList.toggle('active');
                overlay.classList.toggle('active');
                
                // 防止背景滚动
                document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
            };
            
            menuToggle.addEventListener('click', toggleSidebar);
            overlay.addEventListener('click', toggleSidebar);
            closeBtn.addEventListener('click', toggleSidebar);
            
            // 点击侧边栏链接后关闭侧边栏
            document.querySelectorAll('.mobile-nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    menuToggle.classList.remove('active');
                    sidebar.classList.remove('active');
                    overlay.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
        }
    },
    setupMobileSearch: function() {
        // 移动端搜索按钮
        const searchBtn = document.getElementById('mobile-search-btn');
        const searchBar = document.getElementById('mobile-search-bar');
        const searchInput = document.getElementById('mobile-search-input');
        const categoryFilter = document.getElementById('mobile-category-filter');
        const themeFilter = document.getElementById('mobile-theme-filter');
        
        if (searchBtn && searchBar) {
            // 切换搜索栏显示
            searchBtn.addEventListener('click', () => {
                searchBar.classList.toggle('active');
                if (searchBar.classList.contains('active') && searchInput) {
                    setTimeout(() => searchInput.focus(), 300);
                }
            });
            
            // 搜索输入事件
            if (searchInput) {
                // 添加防抖处理
                let searchTimeout;
                searchInput.addEventListener('input', () => {
                    clearTimeout(searchTimeout);
                    searchTimeout = setTimeout(() => {
                        this.performMobileSearch();
                    }, 300);
                });
                
                // 回车键搜索
                searchInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        this.performMobileSearch();
                        searchBar.classList.remove('active');
                    }
                });
            }
            
            // 过滤器变化事件
            if (categoryFilter) {
                categoryFilter.addEventListener('change', () => {
                    this.performMobileSearch();
                });
            }
            
            if (themeFilter) {
                themeFilter.addEventListener('change', () => {
                    this.performMobileSearch();
                });
            }
            
            // 点击其他地方关闭搜索栏
            document.addEventListener('click', (e) => {
                if (e.target !== searchBtn && !searchBtn.contains(e.target) &&
                    e.target !== searchBar && !searchBar.contains(e.target) &&
                    e.target !== searchInput && !searchInput.contains(e.target)) {
                    searchBar.classList.remove('active');
                }
            });
        }
    },
    
    performMobileSearch: function() {
        const searchInput = document.getElementById('mobile-search-input');
        const categoryFilter = document.getElementById('mobile-category-filter');
        const themeFilter = document.getElementById('mobile-theme-filter');
        
        if (!searchInput) return;
        
        const query = searchInput.value.trim();
        const category = categoryFilter ? categoryFilter.value : 'all';
        const theme = themeFilter ? themeFilter.value : 'all';
        
        if (query) {
            UIManager.currentView = 'search';
            this.renderMobileSearchResults(query, category, theme);
        } else {
            // 如果搜索框为空，返回当前视图
            UIManager.loadView(UIManager.currentView);
        }
    },
    
    renderMobileSearchResults: function(query, category, theme) {
        const searchTerm = query.toLowerCase();
        
        // 搜索思考记录
        const filteredThoughts = DataStore.thoughts.filter(thought => {
            if (category === 'model') return false;
            
            const matchesSearch = (
                (thought.title && thought.title.toLowerCase().includes(searchTerm)) ||
                (thought.id && thought.id.toLowerCase().includes(searchTerm)) ||
                (thought.tags && thought.tags.some(tag => tag.toLowerCase().includes(searchTerm))) ||
                (thought.sections && Object.values(thought.sections).some(section => 
                    section.toLowerCase().includes(searchTerm)
                ))
            );
            
            const matchesTheme = theme === 'all' || 
                (thought.tags && thought.tags.some(tag => UIManager.tagMatchesTheme(tag, theme)));
            
            return matchesSearch && matchesTheme;
        });
        
        // 搜索思维模型
        const filteredModels = DataStore.models.filter(model => {
            if (category === 'thought') return false;
            
            const matchesSearch = (
                (model.name && model.name.toLowerCase().includes(searchTerm)) ||
                (model.id && model.id.toLowerCase().includes(searchTerm)) ||
                (model.tags && model.tags.some(tag => tag.toLowerCase().includes(searchTerm))) ||
                (model.description && model.description.toLowerCase().includes(searchTerm))
            );
            
            const matchesTheme = theme === 'all' || 
                (model.tags && model.tags.some(tag => UIManager.tagMatchesTheme(tag, theme)));
            
            return matchesSearch && matchesTheme;
        });
        
        // 渲染搜索结果
        let resultsHTML = '';
        
        if (filteredThoughts.length > 0) {
            filteredThoughts.forEach(thought => {
                const summary = thought.sections && thought.sections["核心结论"] ? 
                    thought.sections["核心结论"].substring(0, 60) + '...' : '';
                
                resultsHTML += `
                    <div class="record-card" onclick="showThoughtDetail('${thought.id}')">
                        <div class="record-id">${thought.id}</div>
                        <div class="record-title">${thought.title || '无标题'}</div>
                        <div class="record-desc">${summary}</div>
                    </div>
                `;
            });
        }
        
        if (filteredModels.length > 0) {
            filteredModels.forEach(model => {
                resultsHTML += `
                    <div class="model-card" onclick="showModelDetail('${model.id}')">
                        <div class="model-id">${model.id}</div>
                        <div class="model-name">${model.name}</div>
                        <div class="model-desc">${model.description.substring(0, 80)}...</div>
                    </div>
                `;
            });
        }
        
        const html = `
            <div class="content-header">
                <h2>搜索结果</h2>
                <p>搜索关键词: "${query}" | 找到 ${filteredThoughts.length + filteredModels.length} 个结果</p>
                <button class="mobile-toolbar-btn" onclick="UIManager.loadView('${UIManager.currentView}')">
                    <i class="fas fa-arrow-left"></i> 返回
                </button>
            </div>
            
            <div class="records-list">
                ${resultsHTML || '<div class="empty-state"><i class="fas fa-search"></i><p>未找到相关结果</p></div>'}
            </div>
        `;
        
        document.getElementById('content-area').innerHTML = html;
        
        // 更新底部导航状态
        this.updateBottomNav('search');
    },
    
    setupMobileEvents: function() {
        // 窗口大小变化事件
        window.addEventListener('resize', () => {
            const isNowMobile = window.innerWidth <= 768;
            
            if (isNowMobile !== this.isMobile) {
                // 重新加载页面以适应新的屏幕尺寸
                location.reload();
            }
        });
        
        // 移动端返回按钮
        window.addEventListener('popstate', () => {
            if (this.isMobile) {
                // 处理移动端返回逻辑
                if (this.currentQuickView) {
                    this.hideQuickView();
                } else {
                    // 返回上一视图
                    UIManager.loadView(UIManager.currentView);
                }
            }
        });
        
        // 触摸滑动支持
        let touchStartX = 0;
        let touchStartY = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            const diffX = touchEndX - touchStartX;
            const diffY = touchEndY - touchStartY;
            
            // 水平滑动超过50px，垂直滑动小于30px（避免与滚动冲突）
            if (Math.abs(diffX) > 50 && Math.abs(diffY) < 30) {
                // 右滑返回
                if (diffX > 0 && UIManager.currentView !== 'overview') {
                    // 模拟返回按钮
                    const backBtn = document.querySelector('.mobile-back-btn');
                    if (backBtn) backBtn.click();
                }
            }
        });
    },
    
    // 设置移动端底部导航
    setupMobileBottomNav: function() {
        const navItems = document.querySelectorAll('.mobile-nav-item');
        const bottomNavItems = document.querySelectorAll('.mobile-bottom-nav .mobile-nav-item');
        
        // 底部导航点击事件
        bottomNavItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                const view = item.getAttribute('data-view');
                
                // 更新活动状态
                bottomNavItems.forEach(navItem => navItem.classList.remove('active'));
                item.classList.add('active');
                
                // 加载视图
                UIManager.loadView(view);
                
                // 滚动到顶部
                window.scrollTo(0, 0);
            });
        });
        
        // 侧边栏导航点击事件
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                const view = item.getAttribute('data-view');
                
                // 更新底部导航活动状态
                bottomNavItems.forEach(navItem => {
                    if (navItem.getAttribute('data-view') === view) {
                        navItem.classList.add('active');
                    } else {
                        navItem.classList.remove('active');
                    }
                });
                
                // 加载视图
                UIManager.loadView(view);
                
                // 滚动到顶部
                window.scrollTo(0, 0);
            });
        });
    },
    
    // 设置移动端统计显示
    setupMobileStats: function() {
        // 监听数据更新
        const updateMobileStats = () => {
            document.getElementById('mobile-total-thoughts').textContent = DataStore.thoughts.length;
            document.getElementById('mobile-total-models').textContent = DataStore.models.length;
            document.getElementById('mobile-total-tags').textContent = Object.keys(DataStore.tags).length;
        };
        
        // 初始更新
        updateMobileStats();
        
        // 监听数据变化（这里简化处理，实际应监听DataStore的变化）
        setInterval(updateMobileStats, 1000);
    },
    
    // 设置触摸事件优化
    setupTouchEvents: function() {
        // 为卡片添加触摸反馈
        document.addEventListener('touchstart', function() {}, {passive: true});
        
        // 防止双击缩放
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function(event) {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
        
        // 优化长按行为
        document.addEventListener('contextmenu', function(e) {
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
                e.preventDefault();
            }
        });
    },
    
    // 设置视口修复
    setupViewportFix: function() {
        // 防止输入框聚焦时页面缩放
        let viewport = document.querySelector('meta[name="viewport"]');
        
        function preventZoom() {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
        }
        
        function allowZoom() {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes');
        }
        
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', preventZoom);
            input.addEventListener('blur', allowZoom);
        });
    },
    
    // 处理窗口大小变化
    handleResize: function() {
        const isMobile = window.innerWidth <= 1024;
        
        // 更新UI状态
        if (isMobile) {
            // 移动端模式
            document.body.classList.add('mobile-mode');
            document.body.classList.remove('desktop-mode');
            
            // 确保侧边栏关闭
            const sidebar = document.getElementById('mobile-sidebar');
            const overlay = document.getElementById('mobile-sidebar-overlay');
            const menuToggle = document.getElementById('mobile-menu-toggle');
            
            if (sidebar && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        } else {
            // 桌面端模式
            document.body.classList.add('desktop-mode');
            document.body.classList.remove('mobile-mode');
        }
    },
    
    // 移动端特定视图渲染
    renderMobileView: function(view) {
        // 这里可以添加移动端特定的视图渲染逻辑
        // 例如，可以调整卡片布局、按钮大小等
        
        // 更新移动端视图切换器状态
        const viewOptions = document.querySelectorAll('.mobile-view-option');
        const bottomNavItems = document.querySelectorAll('.mobile-nav-item');
        
        // 更新视图切换器
        viewOptions.forEach(option => {
            if (option.getAttribute('data-view') === view) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
        
        // 更新底部导航
        bottomNavItems.forEach(item => {
            if (item.getAttribute('data-view') === view) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        // 更新侧边栏导航
        const sidebarLinks = document.querySelectorAll('.mobile-nav-link');
        sidebarLinks.forEach(link => {
            if (link.getAttribute('data-view') === view) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
};

// 修改原有的UIManager，添加移动端支持
if (typeof UIManager !== 'undefined') {
    // 保存原有的loadView方法
    const originalLoadView = UIManager.loadView;
    
    // 重写loadView方法，添加移动端处理
    UIManager.loadView = function(view) {
        // 调用原有方法
        originalLoadView.call(this, view);
        
        // 移动端特定处理
        if (window.innerWidth <= 1024 && typeof MobileManager !== 'undefined') {
            MobileManager.renderMobileView(view);
        }
    };
    
    // 保存原有的performSearch方法
    const originalPerformSearch = UIManager.performSearch;
    
    // 重写performSearch方法，添加移动端处理
    UIManager.performSearch = function(query) {
        // 调用原有方法
        originalPerformSearch.call(this, query);
        
        // 移动端特定处理
        if (window.innerWidth <= 1024) {
            // 滚动到搜索结果顶部
            window.scrollTo(0, 0);
        }
    };
}

// 初始化移动端管理器
document.addEventListener('DOMContentLoaded', function() {
    // 等待主脚本加载完成
    setTimeout(() => {
        if (typeof MobileManager !== 'undefined') {
            MobileManager.init();
        }
    }, 100);
});
