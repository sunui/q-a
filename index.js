var AipOcrClient = require("./aip-node-sdk-2.0.3").ocr;
var fs = require('fs');
var gm = require('gm');

var APP_ID = "";
var API_KEY = "";
var SECRET_KEY = "";
var client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);

var getCap = require('./getcap.js').getCap;




(async () => {
    console.log('开始截图')
    await getCap()
    var then=Date.now() 

    //图片处理
    await new Promise(function(resove){
        gm('./images/cap.png')
        .crop(800, 1000, 130, 640)
        .resize(162, 200)
        .write('./images/cap.png',resove)
    }) 
    

    
    var image =await fs.readFileSync("./images/cap.png").toString("base64");
    
    console.log(`读取裁切耗时:${Date.now()-then}`); 
    
    then=Date.now() 
    var text=await client.generalBasic(image) // client.generalBasicUrl(url) 
    console.log(`识别耗时:${Date.now()-then}`);

    
    console.log(text.words_result);
 

})()
