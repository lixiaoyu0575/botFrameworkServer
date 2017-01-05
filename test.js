/**
 * Created by xiaoyu on 17-1-5.
 */
var request = require("request");
var sentence = "心脏病是什么";
var url = "http://1.85.37.136:9999/qa/rawQA/?q={%22q%22:%22" + encodeURI(sentence) + "%22}";
request(url, function (error, response, body) {
    if (!error && response.statusCode === 200) {
        console.log(response);
        console.log(body);
        console.log(typeof body);
        // console.log(body.valueOf());
        console.log(JSON.parse(body));
        // session.send("发送成功");
        // session.send(body.content);
    }
});
