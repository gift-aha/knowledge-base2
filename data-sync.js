// ==================== 修复版数据同步模块 ====================
// data-sync-simple.js
(function() {
    'use strict';
    
    console.log('=== 数据同步启动 ===');
    
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const DATA_URL = 'https://gift-aha.github.io/knowledge-base2/thought-data.json';
    
    if (isMobile) {
        // 移动端：加载数据后刷新页面
        console.log('移动端模式');
        
        // 检查是否已经加载过
        if (sessionStorage.getItem('dataLoaded') === 'true') {
            console.log('数据已加载过，跳过');
            return;
        }
        
        // 显示加载中
        showMessage('正在同步数据...', 'info');
        
        // 加载数据
        fetch(DATA_URL + '?t=' + Date.now())
            .then(res => {
                if (!res.ok) throw new Error('HTTP ' + res.status);
                return res.json();
            })
            .then(data => {
                console.log('数据加载成功');
                localStorage.setItem('structuredThoughtAssistant', JSON.stringify(data));
                sessionStorage.setItem('dataLoaded', 'true');
                
                showMessage('数据同步完成！', 'success');
                
                // 2秒后刷新
                setTimeout(() => {
                    console.log('刷新页面...');
                    window.location.reload();
                }, 2000);
            })
            .catch(err => {
                console.error('加载失败:', err);
                showMessage('使用本地数据', 'warning');
                // 使用本地已有数据
            });
            
    } else {
        // 电脑端：添加导出按钮
        console.log('电脑端模式');
        
        const btn = document.createElement('button');
        btn.id = 'export-btn';
        btn.innerHTML = '📤 导出到GitHub';
        btn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 12px 20px;
            background: #28a745;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
            z-index: 9999;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        `;
        
        btn.onclick = function() {
            const data = localStorage.getItem('structuredThoughtAssistant');
            if (!data) {
                alert('没有数据');
                return;
            }
            
            const blob = new Blob([data], {type: 'application/json'});
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'thought-data.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            alert('请将下载的 thought-data.json 上传到GitHub仓库根目录');
        };
        
        document.body.appendChild(btn);
    }
    
    function showMessage(text, type) {
        const colors = {
            info: '#007bff',
            success: '#28a745',
            warning: '#ffc107',
            error: '#dc3545'
        };
        
        const msg = document.createElement('div');
        msg.innerHTML = text;
        msg.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${colors[type] || colors.info};
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            z-index: 10000;
            text-align: center;
            min-width: 200px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        
        document.body.appendChild(msg);
        
        // 3秒后自动消失
        setTimeout(() => {
            if (msg.parentNode) {
                msg.parentNode.removeChild(msg);
            }
        }, 3000);
    }
    
    console.log('=== 数据同步就绪 ===');
})();
