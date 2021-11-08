
/**************************************************************************
 * Copyright Copyright 2020 Clover You.
 * File Name: UserDBImpl.ts
 * Description: 用户db实现
 *
 * Version: V1.0
 * Author: Clover You
 * Create Time: 2021/1/11 22:15
 ***************************************************************************/
import UserDB from "../UserDB";
import User from "../../models/User";
import BaseDB from "./BaseDB";
import Bean from "../../utils/Bean";

export default class UserDBImpl implements UserDB {
    delete(id: number): Promise<number> {
        throw new Error("Method not implemented.");
    }
    queryOne(id: number): Promise<User> {
        throw new Error("Method not implemented.");
    }
    update(t: User): Promise<number> {
        throw new Error("Method not implemented.");
    }

    public async add(user: User): Promise<number> {
        const conn = BaseDB.getConn();
        const sql = `insert into t_user (nickname,photo,password,account,createtime,del)
                     values ('${user.getNickname()}','${user.getPhoto()}','${user.getPassword()}','${user.getAccount()}','${user.getCreatetime()}',0)`

        let count: number = 0;
        await BaseDB.execute(conn, sql).then(res => {
            count = res.affectedRows;
        });
        return count;
    }

    /**
     * 根据用户名称查询用户信息
     * @param userName 用户名
     */
    public async queryUserByNickName(nickName: string): Promise<User | null> {
        const conn = BaseDB.getConn();
        let sql: string = `select id,nickname,photo,password,account,createtime,del,deltime 
                            from t_user 
                            where binary nickname = '${nickName}' and del = 0`;
        let data = await BaseDB.queryOneFormat<User>(conn, sql, User);
        return data;
    }

    /**
     * 根据账号查询用户信息
     * @param account 账号
     */
    public async queryUserByAccount(account: string): Promise<User | null> {
        const conn = BaseDB.getConn();
        let sql: string = `select id,nickname,photo,password,account,createtime,del,deltime 
                            from t_user 
                            where binary account = '${account}' and del = 0`;
        let data = await BaseDB.queryOneFormat<User>(conn, sql, User);
        return data;
    }
}