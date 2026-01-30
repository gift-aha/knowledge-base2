// ==================== 修复版数据同步模块 ====================
console.log('数据同步模块开始加载');

// 修复后的GitHub数据同步
const GitHubDataSync = {
    dataUrl: 'https://gift-aha.github.io/knowledge-base2/thought-data.json',
    isInitialized: false,
    
    // 初始化
    init: function() {
        if (this.isInitialized) return;
        this.isInitialized = true;
        
        console.log('初始化数据同步，设备:', this.isMobile() ? '移动端' : '电脑端');
        
        if (this.isMobile()) {
            this.initMobile();
        } else {
            this.initDesktop();
        }
    },
    
    // 检测移动设备
    isMobile: function() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    
    // 移动端初始化
    initMobile: function() {
        console.log('移动端初始化开始');
        
        // 先显示加载状态
        this.showStatus('正在加载数据...', 'info');
        
        // 延迟加载，确保页面已经渲染
        setTimeout(() => {
            this.loadMobileData();
        }, 1000);
    },
    
    // 加载移动端数据
    loadMobileData: function() {
        console.log('开始从GitHub加载数据');
        
        fetch(this.dataUrl + '?t=' + Date.now())
            .then(response => {
                console.log('收到响应:', response.status);
                if (!response.ok) throw new Error('HTTP ' + response.status);
                return response.json();
            })
            .then(data => {
                console.log('数据解析成功，记录数:', 
                    (data.thoughts ? data.thoughts.length : 0) + ' thoughts, ' +
                    (data.models ? data.models.length : 0) + ' models');
                
                // 保存到localStorage
                localStorage.setItem('structuredThoughtAssistant', JSON.stringify(data));
                console.log('数据已保存到localStorage');
                
                // 显示成功信息
                this.showStatus('数据加载成功!', 'success');
                
                // 关键修复：等待页面完全加载后刷新
                this.refreshMobileUI(data.lastUpdated);
            })
            .catch(error => {
                console.error('数据加载失败:', error);
                this.showStatus('加载失败，使用本地数据', 'error');
                this.useLocalData();
            });
    },
    
    // 刷新移动端UI
    refreshMobileUI: function(lastUpdated) {
        console.log('开始刷新移动端UI');
        
        // 显示更新时间
        this.showUpdateTime(lastUpdated);
        
        // 方法1：尝试调用现有的UI管理器
        if (typeof UIManager !== 'undefined') {
            console.log('找到UIManager，尝试刷新');
            try {
                if (UIManager.loadView && typeof UIManager.loadView === 'function') {
                    UIManager.loadView(UIManager.currentView || 'thought-map');
                    console.log('UIManager刷新成功');
                }
            } catch (e) {
                console.error('UIManager刷新失败:', e);
            }
        }
        
        // 方法2：尝试调用移动端导航管理器
        if (typeof MobileTopNavManager !== 'undefined') {
            console.log('找到MobileTopNavManager');
            try {
                // 延迟执行，确保组件已初始化
                setTimeout(() => {
                    if (MobileTopNavManager.loadThoughtList) {
                        MobileTopNavManager.loadThoughtList();
                        console.log('思考记录列表已刷新');
                    }
                    if (MobileTopNavManager.loadModelList) {
                        MobileTopNavManager.loadModelList();
                        console.log('模型列表已刷新');
                    }
                    if (MobileTopNavManager.updateDataStats) {
                        MobileTopNavManager.updateDataStats();
                        console.log('数据统计已更新');
                    }
                }, 500);
            } catch (e) {
                console.error('MobileTopNavManager刷新失败:', e);
            }
        }
        
        // 方法3：如果以上都不行，尝试直接重新加载页面
        if (typeof UIManager === 'undefined' && typeof MobileTopNavManager === 'undefined') {
            console.log('未找到UI管理器，将在3秒后自动刷新页面');
            this.showStatus('正在刷新页面...', 'info');
            
            setTimeout(() => {
                location.reload();
            }, 3000);
        }
        
        // 方法4：尝试手动初始化页面元素
        setTimeout(() => {
            this.manualInitUI();
        }, 1500);
    },
    
    // 手动初始化UI（备用方案）
    manualInitUI: function() {
        console.log('尝试手动初始化UI');
        
        // 检查是否有思维导图容器
        const mapContainer = document.getElementById('thought-map-container') || 
                            document.getElementById('network-graph') ||
                            document.querySelector('.network-graph');
        
        if (mapContainer && mapContainer.innerHTML.trim() === '') {
            console.log('发现空的思维导图容器，尝试初始化');
            this.initEmptyMap();
        }
        
        // 检查是否有思考记录列表
        const thoughtList = document.getElementById('mobile-thoughts-list') ||
                           document.getElementById('thought-list-container');
        
        if (thoughtList && thoughtList.innerHTML.trim() === '') {
            console.log('发现空的思考记录列表，尝试填充');
            this.populateThoughtList();
        }
    },
    
    // 初始化空白的思维导图
    initEmptyMap: function() {
        const container = document.getElementById('thought-map-container') || 
                         document.getElementById('network-graph');
        
        if (container) {
            container.innerHTML = `
                <div class="empty-map">
                    <i class="fas fa-project-diagram" style="font-size: 60px; color: #ccc; margin-bottom: 20px;"></i>
                    <h3>思维导图</h3>
                    <p>数据已加载，点击下方"思维导图"标签查看</p>
                    <button onclick="location.reload()" style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 5px; margin-top: 15px;">
                        刷新页面
                    </button>
                </div>
            `;
        }
    },
    
    // 填充思考记录列表
    populateThoughtList: function() {
        try {
            const data = localStorage.getItem('structuredThoughtAssistant');
            if (!data) return;
            
            const parsed = JSON.parse(data);
            const thoughts = parsed.thoughts || [];
            
            const container = document.getElementById('mobile-thoughts-list') ||
                             document.getElementById('thought-list-container');
            
            if (container) {
                if (thoughts.length === 0) {
                    container.innerHTML = '<div class="empty-state">暂无思考记录</div>';
                } else {
                    let html = '';
                    thoughts.forEach(thought => {
                        html += `
                            <div class="thought-item">
                                <h4>${thought.title || '无标题'}</h4>
                                <p>${(thought.content || '').substring(0, 100)}...</p>
                                <small>${new Date(thought.createdAt || Date.now()).toLocaleDateString()}</small>
                            </div>
                        `;
                    });
                    container.innerHTML = html;
                }
            }
        } catch (e) {
            console.error('填充思考记录失败:', e);
        }
    },
    
    // 使用本地数据（当远程加载失败时）
    useLocalData: function() {
        console.log('尝试使用本地数据');
        
        const localData = localStorage.getItem('structuredThoughtAssistant');
        if (localData) {
            console.log('找到本地数据，尝试初始化');
            setTimeout(() => {
                this.refreshMobileUI(new Date().toISOString());
            }, 1000);
        } else {
            this.showStatus('无可用数据，请连接网络后重试', 'error');
        }
    },
    
    // 显示状态信息
    showStatus: function(message, type) {
        // 移除旧的状态提示
        const oldStatus = document.getElementById('data-status-message');
        if (oldStatus) oldStatus.remove();
        
        // 创建新状态提示
        const status = document.createElement('div');
        status.id = 'data-status-message';
        status.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
                color: white;
                padding: 15px 25px;
                border-radius: 10px;
                z-index: 10000;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                text-align: center;
                max-width: 80%;
                font-size: 14px;
            ">
                ${message}
                <button onclick="this.parentElement.parentElement.remove()" 
                        style="
                            background: none;
                            border: none;
                            color: white;
                            position: absolute;
                            top: 5px;
                            right: 10px;
                            font-size: 16px;
                            cursor: pointer;
                        ">×</button>
            </div>
        `;
        
        document.body.appendChild(status);
        
        // 自动隐藏
        if (type !== 'error') {
            setTimeout(() => {
                if (status.parentElement) {
                    status.remove();
                }
            }, 3000);
        }
    },
    
    // 显示更新时间
    showUpdateTime: function(timestamp) {
        const timeElement = document.getElementById('data-update-time');
        if (timeElement) {
            const date = new Date(timestamp);
            timeElement.textContent = `更新时间: ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
            timeElement.style.display = 'block';
        }
    },
    
    // 电脑端初始化
    initDesktop: function() {
        console.log('电脑端初始化');
        
        // 创建导出按钮
        const button = document.createElement('button');
        button.id = 'github-export-btn';
        button.innerHTML = '<i class="fas fa-cloud-upload-alt"></i> 导出到GitHub';
        button.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 10000;
            padding: 12px 20px;
            background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
            display: flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
        `;
        
        button.onclick = () => {
            const data = localStorage.getItem('structuredThoughtAssistant');
            if (!data) {
                alert('没有数据可导出');
                return;
            }
            
            try {
                const parsed = JSON.parse(data);
                parsed.lastUpdated = new Date().toISOString();
                
                const blob = new Blob([JSON.stringify(parsed, null, 2)], {type: 'application/json'});
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'thought-data.json';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                alert('数据已导出为 thought-data.json\n请将此文件上传到GitHub仓库根目录');
            } catch (e) {
                alert('导出失败: ' + e.message);
            }
        };
        
        document.body.appendChild(button);
        console.log('导出按钮已添加');
    }
};

// 初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM已加载，开始初始化数据同步');
        GitHubDataSync.init();
    });
} else {
    console.log('DOM已就绪，立即初始化数据同步');
    GitHubDataSync.init();
}

// 暴露给全局
window.GitHubDataSync = GitHubDataSync;
console.log('数据同步模块加载完成');
