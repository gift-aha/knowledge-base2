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
    // 设置移动端搜索功能
    setupMobileSearch: function() {
        const searchToggle = document.getElementById('mobile-search-toggle');
        const searchBar = document.getElementById('mobile-search-bar');
        const searchInput = document.getElementById('mobile-search-input');
        const searchClear = document.getElementById('mobile-search-clear');
        const viewToggle = document.getElementById('mobile-view-toggle');
        const viewSwitcher = document.getElementById('mobile-view-switcher');
        
        if (searchToggle && searchBar) {
            searchToggle.addEventListener('click', () => {
                // 关闭视图切换器
                viewSwitcher.classList.remove('active');
                viewToggle.classList.remove('active');
                
                // 切换搜索栏
                searchBar.classList.toggle('active');
                searchToggle.classList.toggle('active');
                
                // 聚焦搜索框
                if (searchBar.classList.contains('active')) {
                    setTimeout(() => {
                        searchInput.focus();
                    }, 300);
                }
            });
        }
        
        if (searchClear && searchInput) {
            searchClear.addEventListener('click', () => {
                searchInput.value = '';
                searchInput.focus();
            });
            
            // 实时搜索
            searchInput.addEventListener('input', () => {
                if (searchInput.value.trim()) {
                    // 执行搜索
                    UIManager.performSearch(searchInput.value);
                } else {
                    // 清除搜索
                    UIManager.loadView(UIManager.currentView);
                }
            });
            
            // 搜索框回车键
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    UIManager.performSearch(searchInput.value);
                    // 关闭搜索栏
                    searchBar.classList.remove('active');
                    searchToggle.classList.remove('active');
                }
            });
        }
    },
    
    // 设置移动端视图切换器
    setupMobileViewSwitcher: function() {
        const viewToggle = document.getElementById('mobile-view-toggle');
        const viewSwitcher = document.getElementById('mobile-view-switcher');
        const viewOptions = document.querySelectorAll('.mobile-view-option');
        const searchToggle = document.getElementById('mobile-search-toggle');
        const searchBar = document.getElementById('mobile-search-bar');
        
        if (viewToggle && viewSwitcher) {
            viewToggle.addEventListener('click', () => {
                // 关闭搜索栏
                searchBar.classList.remove('active');
                searchToggle.classList.remove('active');
                
                // 切换视图切换器
                viewSwitcher.classList.toggle('active');
                viewToggle.classList.toggle('active');
            });
            
            // 点击视图选项
            viewOptions.forEach(option => {
                option.addEventListener('click', () => {
                    const view = option.getAttribute('data-view');
                    
                    // 更新活动状态
                    viewOptions.forEach(opt => opt.classList.remove('active'));
                    option.classList.add('active');
                    
                    // 加载视图
                    UIManager.loadView(view);
                    
                    // 关闭切换器
                    viewSwitcher.classList.remove('active');
                    viewToggle.classList.remove('active');
                });
            });
        }
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
