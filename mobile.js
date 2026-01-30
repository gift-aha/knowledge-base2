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
// ==================== GitHub Pages 数据同步模块 ====================
const GitHubDataSync = {
    // 数据文件的URL
    dataUrl: 'https://[你的用户名].github.io/[仓库名]/thought-data.json',
    
    // 初始化数据同步
    init: function() {
        if (!this.isMobile()) return;
        
        console.log('正在从GitHub Pages加载数据...');
        
        // 从GitHub加载数据
        this.loadDataFromGitHub();
        
        // 定时检查数据更新（可选）
        this.setupAutoRefresh();
    },
    
    // 判断是否为移动端
    isMobile: function() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    
    // 从GitHub加载数据
    loadDataFromGitHub: function() {
        fetch(this.dataUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('数据加载失败');
                }
                return response.json();
            })
            .then(data => {
                console.log('从GitHub加载数据成功');
                
                // 将数据保存到localStorage供应用使用
                localStorage.setItem('structuredThoughtAssistant', JSON.stringify(data));
                
                // 显示数据更新时间
                this.showUpdateTime(data.lastUpdated);
                
                // 刷新UI（如果UI已初始化）
                if (typeof UIManager !== 'undefined' && UIManager.loadView) {
                    UIManager.loadView(UIManager.currentView || 'thought-map');
                }
                
                // 如果是移动端导航管理器，也刷新一下
                if (typeof MobileTopNavManager !== 'undefined' && MobileTopNavManager.refreshThoughtList) {
                    MobileTopNavManager.refreshThoughtList();
                    MobileTopNavManager.refreshModelList();
                    MobileTopNavManager.updateDataStats();
                }
            })
            .catch(error => {
                console.error('从GitHub加载数据失败:', error);
                
                // 如果加载失败，尝试使用本地缓存的数据
                this.showDataLoadError();
            });
    },
    
    // 显示数据更新时间
    showUpdateTime: function(timestamp) {
        const timeElement = document.getElementById('data-update-time');
        if (timeElement) {
            const date = new Date(timestamp);
            timeElement.textContent = `数据更新时间: ${date.toLocaleString()}`;
            timeElement.style.display = 'block';
        }
    },
    
    // 显示数据加载错误
    showDataLoadError: function() {
        // 只在第一次加载失败时显示提示
        if (!sessionStorage.getItem('dataLoadErrorShown')) {
            const errorHtml = `
                <div class="data-load-error">
                    <p><i class="fas fa-exclamation-triangle"></i> 无法从服务器加载数据</p>
                    <p>正在使用本地缓存数据，可能不是最新版本</p>
                    <button onclick="GitHubDataSync.loadDataFromGitHub()" class="retry-btn">
                        重试加载
                    </button>
                </div>
            `;
            
            const container = document.getElementById('content-area') || document.body;
            container.insertAdjacentHTML('afterbegin', errorHtml);
            
            sessionStorage.setItem('dataLoadErrorShown', 'true');
        }
    },
    
    // 设置自动刷新（可选，每5分钟检查一次）
    setupAutoRefresh: function() {
        // 每5分钟检查一次数据更新
        setInterval(() => {
            this.checkForUpdates();
        }, 5 * 60 * 1000);
    },
    
    // 检查数据更新
    checkForUpdates: function() {
        // 获取当前数据的更新时间
        const currentData = localStorage.getItem('structuredThoughtAssistant');
        if (!currentData) return;
        
        fetch(this.dataUrl + '?' + new Date().getTime()) // 添加时间戳防止缓存
            .then(response => response.json())
            .then(remoteData => {
                const currentParsed = JSON.parse(currentData);
                
                // 如果远程数据更新，则重新加载
                if (remoteData.lastUpdated > currentParsed.lastUpdated) {
                    console.log('检测到数据更新，正在重新加载...');
                    this.loadDataFromGitHub();
                }
            })
            .catch(() => {
                // 忽略错误，保持当前数据
            });
    },
    
    // 电脑端导出数据到GitHub文件（这个函数只在电脑端使用）
    exportDataForGitHub: function() {
        // 获取当前数据
        const data = localStorage.getItem('structuredThoughtAssistant');
        if (!data) {
            alert('没有数据可导出');
            return;
        }
        
        try {
            const parsedData = JSON.parse(data);
            
            // 更新最后修改时间
            parsedData.lastUpdated = new Date().toISOString();
            
            // 创建Blob对象
            const blob = new Blob([JSON.stringify(parsedData, null, 2)], { 
                type: 'application/json' 
            });
            
            // 创建下载链接
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'thought-data.json';
            
            // 添加到页面并触发下载
            document.body.appendChild(a);
            a.click();
            
            // 清理
            setTimeout(() => {
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 100);
            
            alert('数据已导出为 thought-data.json 文件\n请将此文件上传到GitHub仓库根目录');
        } catch (error) {
            alert('导出失败: ' + error.message);
        }
    }
};
