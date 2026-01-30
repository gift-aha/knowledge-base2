// ==================== 简化的GitHub数据同步 ====================
console.log('data-sync.js 已加载');

const GitHubDataSync = {
    // 您的GitHub Pages URL（需要修改！）
    dataUrl: 'https://gift-aha.github.io/knowledge-base2/thought-data.json',
    
    // 初始化
    init: function() {
        console.log('GitHubDataSync 初始化');
        
        // 检查设备类型
        const isMobile = this.is MobileDevice();
        console.log('设备检测结果:', isMobile ? '移动端' : '电脑端');
        
        if (isMobile) {
            // 移动端：加载数据并显示更新时间
            this.loadDataForMobile();
        } else {
            // 电脑端：添加导出按钮
            this.addExportButton();
        }
    },
    
    // 检测移动设备
    isMobileDevice: function() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    
    // 移动端：加载数据
    loadDataForMobile: function() {
        console.log('移动端：从GitHub加载数据');
        
        // 显示加载状态
        this.showLoadingMessage();
        
        // 从GitHub加载数据
        fetch(this.dataUrl + '?t=' + new Date().getTime())
            .then(response => {
                if (!response.ok) throw new Error('HTTP ' + response.status);
                return response.json();
            })
            .then(data => {
                console.log('数据加载成功');
                
                // 保存到localStorage
                localStorage.setItem('structuredThoughtAssistant', JSON.stringify(data));
                
                // 显示更新时间
                this.showUpdateTime(data.lastUpdated);
                
                // 刷新页面内容
                this.refreshPageContent();
            })
            .catch(error => {
                console.error('数据加载失败:', error);
                this.showError('无法加载最新数据，使用本地缓存');
            });
    },
    
    // 电脑端：添加导出按钮
    addExportButton: function() {
        console.log('电脑端：添加导出按钮');
        
        // 创建按钮
        const button = document.createElement('button');
        button.id = 'github-export-btn';
        button.innerHTML = '<i class="fas fa-upload"></i> 导出到GitHub';
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
        
        // 点击事件
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
        
        // 添加到页面
        document.body.appendChild(button);
        console.log('导出按钮已添加到页面');
    },
    
    // 显示加载状态
    showLoadingMessage: function() {
        const loading = document.createElement('div');
        loading.id = 'data-loading';
        loading.innerHTML = '<p>正在从GitHub加载数据...</p>';
        loading.style.cssText = `
            position: fixed;
            top: 10px;
            left: 50%;
            transform: translateX(-50%);
            background: #007bff;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 10000;
        `;
        document.body.appendChild(loading);
        
        // 3秒后自动移除
        setTimeout(() => {
            if (document.getElementById('data-loading')) {
                document.getElementById('data-loading').remove();
            }
        }, 3000);
    },
    
    // 显示更新时间
    showUpdateTime: function(timestamp) {
        // 移除现有时间显示
        const oldElement = document.getElementById('data-update-time');
        if (oldElement) oldElement.remove();
        
        // 创建新元素
        const timeElement = document.createElement('div');
        timeElement.id = 'data-update-time';
        
        const date = new Date(timestamp);
        timeElement.textContent = `数据更新时间: ${date.toLocaleString()}`;
        
        timeElement.style.cssText = `
            position: fixed;
            top: 10px;
            left: 50%;
            transform: translateX(-50%);
            background: #28a745;
            color: white;
            padding: 8px 15px;
            border-radius: 5px;
            font-size: 12px;
            z-index: 9999;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        `;
        
        document.body.appendChild(timeElement);
        console.log('更新时间已显示:', timestamp);
    },
    
    // 显示错误信息
    showError: function(message) {
        const errorElement = document.createElement('div');
        errorElement.innerHTML = `<p>${message}</p>`;
        errorElement.style.cssText = `
            position: fixed;
            top: 50px;
            left: 50%;
            transform: translateX(-50%);
            background: #dc3545;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 10000;
        `;
        document.body.appendChild(errorElement);
        
        setTimeout(() => {
            if (errorElement.parentElement) {
                errorElement.remove();
            }
        }, 5000);
    },
    
    // 刷新页面内容
    refreshPageContent: function() {
        // 根据您的应用结构调用刷新函数
        if (typeof UIManager !== 'undefined' && UIManager.loadView) {
            UIManager.loadView(UIManager.currentView || 'thought-map');
        }
        
        if (typeof MobileTopNavManager !== 'undefined') {
            if (MobileTopNavManager.refreshThoughtList) {
                MobileTopNavManager.refreshThoughtList();
            }
            if (MobileTopNavManager.updateDataStats) {
                MobileTopNavManager.updateDataStats();
            }
        }
    }
};

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', function() {
    console.log('DOM已加载，初始化数据同步...');
    GitHubDataSync.init();
});

// 备用初始化方式
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', GitHubDataSync.init);
} else {
    GitHubDataSync.init();
}

console.log('GitHubDataSync 模块已定义');
