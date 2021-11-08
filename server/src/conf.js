"use strict";
exports.__esModule = true;
var USER_HOME = process.env.HOME || process.env.USERPROFILE;
var conf = {
    mysql: {
        user: 'root',
        password: '1433233Abc.',
        database: 'objcloud',
        host: '127.0.0.1',
        port: 3306
    },
    port: 3000,
    key: {
        path: USER_HOME + "\\.objectcloud\\key\\"
    },
    upload: {
        // rootPath:`${USER_HOME}/.objectcloud/`,
        temp: USER_HOME + "\\.objectcloud\\temp\\",
        path: USER_HOME + "\\.objectcloud\\upload\\"
    }
};
exports["default"] = conf;