function email() {
	const email = 'yichenmz@outlook.com';
	const mailtoLink = `mailto:${email}`;

	try {
		window.location.href = mailtoLink;

		// 如果跳转失败，3秒后显示弹窗
		setTimeout(() => {
			if (document.hasFocus()) {
				showEmailModal(email);
			}
		}, 1500);

	} catch (error) {
		showEmailModal(email);
	}
}

function showEmailModal(email) {
	const overlay = document.createElement('div');
	overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    `;

	const modal = document.createElement('div');
	modal.style.cssText = `
        background: white;
        border-radius: 8px;
        padding: 20px;
        width: 300px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        text-align: center;
    `;

	modal.innerHTML = `
        <h3 style="margin: 0 0 15px 0; color: #333;">无法打开邮件客户端</h3>
        <p style="margin: 0 0 20px 0; color: #666;">请手动复制邮箱地址：</p>
        <div style="
            background: #f5f5f5;
            padding: 12px;
            border-radius: 6px;
            margin: 0 0 20px 0;
            font-family: monospace;
            font-size: 16px;
            cursor: pointer;
            user-select: all;
        " onclick="this.select(); document.execCommand('copy'); alert('已复制到剪贴板！')">
            ${email}
        </div>
        <button style="
            background: #000000;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
        " onclick="this.parentElement.parentElement.remove()">确定</button>
    `;

	overlay.appendChild(modal);
	document.body.appendChild(overlay);

	// 点击背景关闭
	overlay.onclick = (e) => {
		if (e.target === overlay) {
			overlay.remove();
		}
	};
}
//时钟
document.addEventListener('DOMContentLoaded', () => {
	const clockElement = document.querySelector('.clock');

	setInterval(() => {
		clockElement.textContent = new Date().toLocaleTimeString('zh-CN', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false
		});
	}, 1000);
});
//加载粉丝数
//调用https://api.codemao.cn/api/user/info/detail/102973524并设置变量bcm_fan为返回的字典中的"fans_total"，调用https://api.bilibili.com/x/relation/stat?vmid=1928185501，并设置变量bilibili_fan为返回的粉丝数，先调用，再一一等到获取到数据赋值// 异步函数：获取API文本并更新到p.sb_text元素
fetch('https://api.xygeng.cn/openapi/one/get')
	.then(response => response.text())
	.then(data => {
		const match = data.match(/document\.write\(\"([^"]+)\"\)/);
		const cleanText = match ? match[1] : data;
		const element = document.querySelector('p.sb_text');
		if (element) element.textContent = cleanText;
	})
	.catch(error => console.error('获取失败:', error));
