/**************************************************************************
 * Copyright Copyright 2020 Clover You.
 * File Name: TestBaseDB.ts
 * Description: BaseDB类的测试用例
 *
 * Version: V1.0
 * Author: Clover You
 * Create Time: 2021/1/12 00:04
 ***************************************************************************/
import BaseDB from "../db/impl/BaseDB";
import {Connection} from "mysql";
import User from "../models/User";
import Bean from "../utils/Bean";

/**
 * 测试用例
 */
async function main() {
    const conn: Connection = BaseDB.getConn();
    const sql: string = `select * from user`;
    const result: Array<User> = await BaseDB.execute(conn, sql);
    const user: User = new User();
    await Bean.Map2Model<User>(result[0], user)
    console.log(user);
}
main();


