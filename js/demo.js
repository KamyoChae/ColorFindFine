var rows = 10, // 默认 10 X 10
    cols = 10, // 测试时修改
    wincont = mids = rows * cols / 2, // wincont 用于判断剩余节点 mids用于循环 
    nums = rows * cols, // nums 用于循环
    conts = 0; //得分
var levels = 1; // 关卡
var flag = true; // 初始化开关
var mark = null; // 存储第一次点击的id
var key = true; // 开关

var btnDiv = document.getElementById('btn-div') // 开始按钮
var boxDiv = document.getElementById('box-div') // 生成格子的div
var sTitle = document.getElementsByClassName('title-span')[0] // 首页游戏字体
var topDiv = document.getElementsByClassName('top-div')[0] // 游戏界面顶部
var oUl = document.getElementsByTagName('ul')[0] // 获取 简单 中等 困难 三个等级选项
var back = document.getElementsByClassName('reset') // 获取返回按钮
var setTime = document.getElementsByClassName('set-time')[0] // 获取时间
var overBack = document.getElementsByClassName('overBack')[0] // 获取游戏结束遮罩层
var gameWin = document.getElementsByClassName('gameWin')[0] // 获取游戏胜利遮罩层
var cont = document.getElementsByClassName('cont')[0] // 获取得分
var level = document.getElementsByClassName('level')[0] // 获取关卡
var next = document.getElementsByClassName('next')[0] // 获取 下一关 按钮
var p = document.getElementsByTagName('p')[0]

btnDiv.addEventListener('click', load, false)
btnDiv.addEventListener('click', init, false)
oUl.addEventListener('click', pick, false)
back[0].addEventListener('click', getBack, false) // 游戏接线 返回主页按钮
back[1].addEventListener('click', getBack, false) // 游戏失败界面 返回主页按钮
next.addEventListener('click', nextlevel, false)

// 计时器
var add = 120;
function callTime() {

    this.timer = setInterval(function () {
        if (add == 0) { // 超过3分钟 则游戏结束
            clearInterval(timer)
            gameOver();
        }
        add--;
        setTime.innerHTML = add;
    }, 1000)
}

// 关卡函数
function nextlevel() {
    gameWin.style.display = 'none';
    clearInterval(timer);
    init();
    levels++;
    level.innerHTML = levels;
    setTime.innerHTML = 0;
    console.log('55555555555555')
    console.log(level.innerHTML)
}

function gameOver() {

    // 游戏结束 弹出遮罩
    overBack.style.display = 'block';
}
function gameWins() {

    // 游戏胜利 弹出遮罩
    clearInterval(timer)
    gameWin.style.display = 'block';
}

function addcont() {

    // 游戏加分
    conts += 10;
    cont.innerHTML = conts;
}
function delcont() {

    // 游戏扣分
    conts -= 4;
    cont.innerHTML = conts;
}

function load() {

    boxDiv.style.display = 'block';
    btnDiv.style.display = 'none';
    sTitle.style.display = 'none';
    topDiv.style.display = 'block';
    p.style.display = 'none';

}
function getBack() {

    // 返回主界面 恢复默认
    rows = 10; // 默认 10 X 10
    cols = 10;
    cont.innerHTML = 0;
    level.innerHTML = 1;
    levels = 1;
    conts = 0;
    setTime.innerHTML = 120;
    add = 120;
    clearInterval(timer)
    boxDiv.innerHtml = '';
    boxDiv.style.display = 'none';
    btnDiv.style.display = 'block';
    sTitle.style.display = 'block';
    topDiv.style.display = 'none';
    gameWin.style.display = 'none';
    p.style.display = 'block';
}

function pick(e) {
    var event = e || window.event;
    
    clearInterval(timer);
    flag = true;
    switch (event.target.innerHTML) {
        case '简单': add = 120; easy(); break;
        case '中等': add = 180; middle(); break;
        case '困难': add = 360; hard(); break;
    }
}

function easy() {
    // 简单模式
    rows = 10;
    cols = 10;
    setTime.innerHTML = add;
    init(rows, cols);
}
function middle() {
    // 中等模式
    rows = 14;
    cols = 14;
    setTime.innerHTML = add;
    init(rows, cols);
}
function hard() {
    // 困难模式
    rows = 18;
    cols = 18;
    setTime.innerHTML = add;
    init(rows, cols);
}

// 初始化函数
function init() {
    /**
     * 第一步 生成一百个格子 绑定div 并插入div中  
     * 第二步 循环先给前面一半的格子加颜色
     * 第三步 循环读取前面的格子 随机生成一个数 这个数绑定div 把格子里面的颜色赋给随机格子
     *
     */

    callTime();

    var count = 0;
    wincont = mids = rows * cols / 2;
    nums = rows * cols;

    flag = true;
    var bWidth = boxDiv.style.width;
    switch (rows) {
        case 10: boxDiv.style.width = "500px"; break;
        case 14: boxDiv.style.width = "960px"; break;
        case 18: boxDiv.style.width = "1440px"; break;
    }

    if (flag) {
        var d = document.createElement('div');
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {

                var con = document.createElement('div');
                con.classList.add('con');
                con.setAttribute('id', count);
                count++;
                d.appendChild(con);
            }
        }// 循环结束
        boxDiv.innerHTML = d.innerHTML;
        addColor(mids);
    }

}

// 添加颜色函数
function addColor() {
    // 给前五十个元素加颜色

    for (var i = 0; i < mids; i++) {
        var getcon = document.getElementById(i)
        var color = '' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255)
        var bg = 'background:rgb(' + color + ')';
        getcon.setAttribute('style', bg);
    }

    // 给后五十个元素加颜色

    while (mids) {
        /**
         * 循环前五十个元素 的同时 随机生成一个值 用于后50个数 绑定div
         * 先判断 随机生成的值里面有没有标识符 即 'set'
         * 如果已经有了标识符 则重新生成一个随机数
         * 如果随机生成的这个值没有标识符 则进入条件判断
         * 在条件判断之前 先获取本次循环的一个值 用于前50个数 绑定div
         * 如果本次循环的div含有标识符或是随机生成的div数含有一个标识符（这是不可能的）
         * 则不会进行下一步判断
         * 否则 进行背景色的传递 并同时打上标识符 ‘set’ 
         * 剩余未传递颜色的方块总数减一
        */
        for (var i = 0; i < nums / 2; i++) {
            var setColor = null,
                getCon2 = null;
            setColor = Math.floor(Math.random() * nums / 2 + nums / 2);
            getCon2 = document.getElementById(setColor); // 第50-100
            if (getCon2.classList.contains('set')) {
                setColor = Math.floor(Math.random() * nums / 2 + nums / 2);
            } else {
                var getCon1 = document.getElementById(i); // 获取前面50个元素
                if (!getCon1.classList.contains('set') || !getCon1.classList.contains('set')) {
                    getCon2.style.background = getCon1.style.background;
                    getCon1.classList.add('set');
                    getCon2.classList.add('set');
                    mids--;
                }
            }

        }

    }

    flag = false;

}

// 绑定事件
boxDiv.addEventListener('click', checking, false)

// 核心逻辑
function checking(e) {
    /**
     * 第一次点击该元素 
     * 第二次点击该元素 用id编码区分
     * 
     * 如果第一次点击该元素 则需保留该元素的 标识符 边框颜色变为白色 
     * 如果第二次点击该元素 保留第二次点击元素的标识符 边框颜色恢复原样
     * 如果两次标识符一致 则取消选中状态

     * 如果在这之前点击过其他元素 则将两元素背景进行对比 若相等则移除该节点
    */
    var event = e || window.event;
    var eStyle = event.target.style;

    eId = parseInt(event.target.id); // 获得第一次点击的id

    // 第一种情况，点击自身
    function test1() {

        if (key) { // key = true
            mark = eId;
            eStyle.borderColor = '#fff';
            key = false;

        } else if (!key) { // key = false
            if (eId == mark) {
                eStyle.borderColor = '#000';
                key = !key; // key = true
                mark = null;

            } else {
                // 第二种情况 点击不同
                var eMark = document.getElementById(mark);
                //	boxDiv.remove(event.target) ;
                if (eStyle.background == eMark.style.background) {

                    boxDiv.removeChild(event.target)
                    boxDiv.removeChild(eMark)

                    addcont();
                    wincont--; // 剩余节点统计
                    console.log(wincont)
                    key = !key; // key = true
                    mark = null; // 恢复初始化

                    if (wincont == 0) { // 如果所有节点都被清除 则游戏结束 弹出祝贺界面 然后进入第二关
                        gameWins()
                    }
                } else {
                    delcont(); // 扣分函数
                }

            }

        }
    };
    test1();
}


