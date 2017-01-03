"use strict";
var builder = require("botbuilder"),
    restify = require("restify"),
    fs = require("fs"),
    httpsOptions,
    server,
    connector,
    bot,
    luisModelUrl,
    recognizer,
    intents;

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
httpsOptions = {
    key: fs.readFileSync("/etc/ssl/self-signed/server.key"),
    certificate: fs.readFileSync("/etc/ssl/self-signed/server.crt")
};
server = restify.createServer(httpsOptions)
server.listen(process.env.port || process.env.PORT || 443, function () {
    console.log("%s listening to %s", server.name, server.url);
});
// Create chat bot
connector = new builder.ChatConnector({
    appId: "db6323a2-0ddd-4455-a892-967a945a036a",
    appPassword: "z2TM8aohBctWq8Mtzcyngit"
});
bot = new builder.UniversalBot(connector);
server.post("/api/messages", connector.listen());
//text bot
// var textBot = new builder.TextBot();
// textBot.begin(session, "test");

luisModelUrl = "https://api.projectoxford.ai/luis/v1/application?id=96dab719-ff6f-4828-a705-8df3318df524&subscription-key=f1f59c644d714c6aaef51c08f1cc8df3";
// "https://api.projectoxford.ai/luis/v1/application?id=162bf6ee-379b-4ce4-a519-5f5af90086b5&subscription-key=11be6373fca44ded80fbe2afa8597c18";//"https://api.projectoxford.ai/luis/v2.0/apps/c67e3140-0e9f-4f95-827b-5b12fe5b2d9a?subscription-key=53ca333f33e246d0bb972e4e541b98c5";
recognizer = new builder.LuisRecognizer(luisModelUrl);
intents = new builder.IntentDialog({recognizers: [recognizer]});
//=========================================================
// Bots Dialogs
//=========================================================


console.log("intents init");
bot.dialog("/", intents);

intents.matches(/^问药/, [function (session, args, next) {
    session.send("正则匹配问药字符串");
    console.log(args);
    console.log(next);
}])

intents.matches("问药", [
    function (session, args, next) {
        console.log(args);
        session.send("识别意图：%s", args.intent);
    }
]);

intents.matches("问疾病", [
    function (session, args, next) {
        console.log(args);
        session.send("识别意图：%s", args.intent);
    }
]);

intents.matches("问症状", [
    function (session, args, next) {
        console.log(args);
        session.send("识别意图：%s", args.intent);
    }
]);

intents.matches("问检查", [
    function (session, args, next) {
        console.log(args);
        session.send("识别意图：%s", args.intent);
    }
]);

intents.matches("问手术", [
    function (session, args, next) {
        console.log(args);
        session.send("识别意图：%s", args.intent);
    }
]);


intents.matches("问部位", [
    function (session, args, next) {
        console.log(args);
        session.send("识别意图：%s", args.intent);
    }
]);

intents.matches("问科室", [
    function (session, args, next) {
        console.log(args);
        session.send("识别意图：%s", args.intent);
    }
]);

intents.matches("问概述", [
    function (session, args, next) {
        console.log(args);
        session.send("识别意图：%s", args.intent);
    }
]);


intents.matches("问价格", [
    function (session, args, next) {
        console.log(args);
        session.send("识别意图：%s", args.intent);
    }
]);

intents.matches(/^换名字/i, [
    function (session) {
        session.beginDialog("/profile");
    },
    function (session, results) {
        session.send("好的，我记下你的名字了， %s", session.userData.name);
    }
]);

intents.onDefault([
    function (session, args, next) {
        if (!session.userData.name) {
            session.beginDialog("/profile");
        } else {
            next();
        }
    },
    function (session, results) {
        session.send("你好，%s! 你可以问我药品，疾病，症状，检查，手术，部位，科室，概述和价格，我正在从你的提问中学习，谢谢！", session.userData.name);
    }
]);

bot.dialog("/profile", [
    function (session) {
        builder.Prompts.text(session, "你好，你叫什么名字？");
    },
    function (session, results) {
        session.userData.name = results.response;
        session.endDialog();
    }
]);
