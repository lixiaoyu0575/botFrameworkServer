/**
 * Created by xiaoyu on 17-1-5.
 */
"use strict";
var request = require("request"),
    url = "http://1.85.37.136:9999/qa/rawQA/?q={%22q%22:%22%E5%BF%83%E8%84%8F%E7%97%85%E6%98%AF%E4%BB%80%E4%B9%88%22}";
request(url, function (error, response, body) {
    console.log(error);
    console.log(response);
    console.log(body);
});