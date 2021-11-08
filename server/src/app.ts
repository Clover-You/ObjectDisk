/**************************************************************************
 * Copyright Copyright 2020 Clover You.
 * File Name: app.ts
 * Description:
 *
 * Version: V1.0
 * Author: Clover You
 * Create Time: 2021/1/11 21:38
 ***************************************************************************/

import Koa from "koa";
import router from "./routes";
import conf from "./conf";
import logger from "koa-logger";
import json from "koa-json";
import koaBody from "koa-body";
// import bodyparser from "koa-bodyparser";
import onerror from "koa-onerror";
import cors from "koa2-cors";
import fs from "fs";
import MathTools from "./utils/MathTools";


const app = new Koa();

//运行时去调用生成密匙的方法
MathTools.generateKey();

app.use(cors({
    origin: function (ctx) {
        return '*'  // 允许来自所有域名请求
        // return 'http://localhost:8080'; / 这样就能只允许 http://localhost:8080 这个域名的请求了
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS', 'PUT'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

app.use(koaBody({
    // 如果需要上传文件,multipart: true
    //　不设置无法传递文件
    multipart: true,
    // formidable: {
    //     maxFileSize: 1000 * 1024 * 1024
    // },
    patchKoa: true
}))

// middlewares
// app.use(bodyparser({
//     enableTypes: ['json', 'form', 'text']
// }))


// error handler
onerror(app);

app.use(json())
app.use(logger())

// logger
app.use(async (ctx, next) => {
    const start: any = new Date()
    await next()
    const end: any = new Date();
    const ms = end - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// import root route
app.use(router.routes());

const port: number = (conf.port || process.env.PORT || 3000) as number;

app.listen(port, function () {
    console.log(`server success running to ${port}...`);
})