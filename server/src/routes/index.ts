/**************************************************************************
 * Copyright Copyright 2020 Clover You.
 * File Name: index.ts
 * Description: 自动化路由
 *
 * Version: V1.0
 * Author: Clover You
 * Create Time: 2021/1/12 01:34
 ***************************************************************************/

import KoaRouter from "koa-router"
import fs from "fs"
import path from "path"

const router = new KoaRouter();
// 动态路由
const loading = {
    // 遍历目录
    listDir(dir: string) {
        const fileList = fs.readdirSync(dir, 'utf-8');
        for (let i = 0; i < fileList.length; i++) {
            const stat = fs.lstatSync(dir + fileList[i]);
            // 是目录，需要继续
            if (stat.isDirectory()) {
                this.listDir(dir + fileList[i] + '/');
            } else {
                // 是js文件并且不是本文件
                if (/\.ts$/.test(fileList[i]) && fileList[i] !== 'index.ts') {
                    this.loadRoute(dir + fileList[i]);
                }
            }
        }
    },
    // loading route...
    loadRoute(routeFile: string) {
        const item = require(routeFile.substring(0, routeFile.lastIndexOf('.')));
        const route = item.default;
        if (route instanceof KoaRouter) {
            router.use(route.routes(), route.allowedMethods())
        }
    },
    // main
    loadingRouter(p: string) {
        const folder = path.join(__dirname, p);
        this.listDir(folder);
    }
};

loading.loadingRouter('./');

export default router;