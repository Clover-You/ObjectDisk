/*
 * @Author: LRolinx
 * @Date: 2021-01-13 11:11:08
 * @LastEditTime: 2021-01-17 16:45:24
 * @Description: 
 * 
 */
import BaseDB from "../db/impl/BaseDB";
import {Connection} from "mysql";

/**
 * 测试用例
 */
async function main() {
    const conn: Connection = BaseDB.getConn();
    const sql: string = `select * from t_user`;
    let data = await BaseDB.execute(conn,sql);
    console.log(data);
}
main();

