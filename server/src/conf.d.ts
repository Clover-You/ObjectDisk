/**************************************************************************
 * Copyright Copyright 2020 Clover You.
 * File Name: conf.d.ts
 * Description: 配置文件类型
 *
 * Version: V1.0
 * Author: Clover You
 * Create Time: 2021/1/11 23:47
 ***************************************************************************/
export type MysqlType = {
    user?: string;
    password: string;
    database: string;
    host?: string;
    port?: number;
}

export type KeyType = {
    path: string;//Key保存的路径
}

export type UploadType = {
    // rootPath:string;//根目录
    temp: string;//上传的临时位置
    path: string;//上传完成后合并文件的位置
}

export default interface ConfType {
    mysql?: MysqlType
    port?: number
    key: KeyType
    upload: UploadType
}