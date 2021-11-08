/**************************************************************************
 * Copyright Copyright 2020 Clover You.
 * File Name: conf.ts
 * Description: 程序配置文件
 *
 * Version: V1.0
 * Author: Clover You
 * Create Time: 2021/1/11 23:14
 ***************************************************************************/
import ConfType from "./conf.d"

const USER_HOME = process.env.HOME || process.env.USERPROFILE;

const conf: ConfType = {
    mysql: {
        user: 'root',
        password: '123456',
        database: 'objcloud',
        host: '127.0.0.1',
        port:  3306
    },
    port: 3000,
    key:{
        path:`${USER_HOME}\\.objectcloud\\key\\`
    },
    upload:{
        // rootPath:`${USER_HOME}/.objectcloud/`,
        temp:`${USER_HOME}\\.objectcloud\\temp\\`,
        path:`${USER_HOME}\\.objectcloud\\upload\\`,
    }
}

export default conf;