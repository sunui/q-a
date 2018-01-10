const util = require('util');
const fs = require('fs');
const path = require('path');
const exec = util.promisify(require('child_process').exec);

const REMOTE_PATH = '/sdcard/screencap.png';
const CAP_PATH =path.resolve('.', 'images');


fetchScreenCap = async () => {
    const {stdout, stderr} = await exec(`adb shell screencap -p ${REMOTE_PATH}`);
};

pullScreenCap = async () => {    
    const {stdout, stderr} = await exec(`adb pull ${REMOTE_PATH} ${CAP_PATH}/cap.png`);
};


getCap = async () => {
    var then=Date.now()     
    await fetchScreenCap();
    console.log(`截图耗时:${Date.now()-then}`);    
    then=Date.now() 
    await pullScreenCap();
    console.log(`下载耗时:${Date.now()-then}`);  
};


// 滑动
// adb shell input swipe 1060 600 1040 600 300
//input tap 单击
module.exports = {
    getCap
}