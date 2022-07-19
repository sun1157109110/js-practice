const opn = require('opn'); //执行语句
var robot = require("robotjs"); //控制鼠标键盘等操作

var screenSize = robot.getScreenSize();
setInterval(() => {
  robot.moveMouseSmooth(screenSize.width - 140, screenSize.height - 20); //移动鼠标
  robot.setMouseDelay(1000)
  robot.mouseClick(); //鼠标点击
  robot.moveMouseSmooth(screenSize.width - 140, screenSize.height - 560);
  robot.setMouseDelay(2000)
  robot.mouseClick()
  robot.moveMouseSmooth(screenSize.width - 140, screenSize.height - 490);
  robot.setMouseDelay(1000)
  robot.mouseClick()
}, 1000);

// opn('C:/Users/seagm/Desktop/小白入门手册.txt');	//自动打开程序（文件地址自己修改即可）
// opn('C:/Users/seagm/Desktop/GitHub Desktop')
// opn('C:/Users/seagm/Desktop/Visual Studio Code')
// opn('', {app: 'chrome'});
// setTimeout(()=>{opn('C:/Program Files (x86)/Tencent/WeChat/WeChat.exe')},2000)