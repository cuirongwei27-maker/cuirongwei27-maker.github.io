// 获取DOM元素
const face = document.querySelector('.face');
const leftEye = document.querySelector('.left-eye');
const rightEye = document.querySelector('.right-eye');
const leftPupil = document.querySelector('.left-eye .pupil');
const rightPupil = document.querySelector('.right-eye .pupil');
const mouth = document.querySelector('.mouth');
const popup = document.getElementById('popup');
const success = document.getElementById('success');
const approveBtn = document.getElementById('approve');
const rejectBtn = document.getElementById('reject');
const contentContainer = document.querySelector('.content-container');

// 眼睛跟随鼠标转动功能
function moveEyes(event) {
    const faceRect = face.getBoundingClientRect();
    const faceX = faceRect.left + faceRect.width / 2;
    const faceY = faceRect.top + faceRect.height / 2;
    
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    
    // 计算眼睛移动角度
    const leftEyeRect = leftEye.getBoundingClientRect();
    const rightEyeRect = rightEye.getBoundingClientRect();
    
    // 左眼
    const leftEyeX = leftEyeRect.left + leftEyeRect.width / 2;
    const leftEyeY = leftEyeRect.top + leftEyeRect.height / 2;
    const leftAngle = Math.atan2(mouseY - leftEyeY, mouseX - leftEyeX);
    const leftDistance = Math.min(leftEyeRect.width / 4, Math.sqrt(
        Math.pow(mouseX - leftEyeX, 2) + Math.pow(mouseY - leftEyeY, 2)
    ) / 3);
    
    // 右眼
    const rightEyeX = rightEyeRect.left + rightEyeRect.width / 2;
    const rightEyeY = rightEyeRect.top + rightEyeRect.height / 2;
    const rightAngle = Math.atan2(mouseY - rightEyeY, mouseX - rightEyeX);
    const rightDistance = Math.min(rightEyeRect.width / 4, Math.sqrt(
        Math.pow(mouseX - rightEyeX, 2) + Math.pow(mouseY - rightEyeY, 2)
    ) / 3);
    
    // 移动瞳孔
    leftPupil.style.transform = `translate(
        ${Math.cos(leftAngle) * leftDistance}px,
        ${Math.sin(leftAngle) * leftDistance}px
    )`;
    
    rightPupil.style.transform = `translate(
        ${Math.cos(rightAngle) * rightDistance}px,
        ${Math.sin(rightAngle) * rightDistance}px
    )`;
}

// 鼠标靠近按钮时表情变化
function checkMousePosition(event) {
    const approveRect = approveBtn.getBoundingClientRect();
    const rejectRect = rejectBtn.getBoundingClientRect();
    
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    
    // 检查鼠标是否靠近同意按钮
    const nearApprove = mouseX >= approveRect.left - 50 && 
                      mouseX <= approveRect.right + 50 && 
                      mouseY >= approveRect.top - 50 && 
                      mouseY <= approveRect.bottom + 50;
    
    // 检查鼠标是否靠近不同意按钮
    const nearReject = mouseX >= rejectRect.left - 50 && 
                      mouseX <= rejectRect.right + 50 && 
                      mouseY >= rejectRect.top - 50 && 
                      mouseY <= rejectRect.bottom + 50;
    
    // 更新表情
    if (nearApprove) {
        mouth.classList.remove('cry');
        mouth.classList.add('smile');
    } else if (nearReject) {
        mouth.classList.remove('smile');
        mouth.classList.add('cry');
    } else {
        mouth.classList.remove('smile', 'cry');
    }
}

// 同意按钮功能
approveBtn.addEventListener('click', function() {
    popup.style.display = 'none';
    success.style.display = 'block';
});

// 不同意按钮功能
rejectBtn.addEventListener('click', function() {
    // 计算随机位置
    const maxX = window.innerWidth - contentContainer.offsetWidth;
    const maxY = window.innerHeight - contentContainer.offsetHeight;
    
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    
    // 设置内容容器新位置
    contentContainer.style.position = 'absolute';
    contentContainer.style.left = randomX + 'px';
    contentContainer.style.top = randomY + 'px';
    contentContainer.style.transform = 'none';
});

// 添加事件监听器
document.addEventListener('mousemove', moveEyes);
document.addEventListener('mousemove', checkMousePosition);