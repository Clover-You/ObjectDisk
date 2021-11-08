/**************************************************************************
 * Copyright Copyright 2020 Clover You.
 * File Name: BaseDB.ts
 * Description: 数据库链接工具
 *
 * Version: V1.0
 * Author: Clover You
 * Create Time: 2021/1/11 22:38
 ***************************************************************************/
import mysql, { Connection } from "mysql";
import conf from "../../conf";
import { MysqlType } from "../../conf.d";
import Bean, { TargetConstructor } from "../../utils/Bean";

let MysqlConf: MysqlType | undefined = conf.mysql;

export default class BaseDB {

    /**
     * 数据库用户名
     */
    private static readonly USERNAME?: string = MysqlConf && MysqlConf.user || 'root';

    /**
     * 数据库密码
     */
    private static readonly PASSWORD?: string = MysqlConf && MysqlConf.password || '123456';

    /**
     * 数据库连接地址
     */
    private static readonly HOST: string = MysqlConf && MysqlConf.host || '127.0.0.1';

    /**
     * 数据库连接地址
     */
    private static readonly PORT: number = MysqlConf && MysqlConf.port || 3306;
    /**
     * 数据库连接地址
     */
    private static readonly DATABASE: string = MysqlConf && MysqlConf.database || '';

    /**
     * 获取数据库连接
     * @return Connection 数据库连接对象
     */
    public static getConn(): Connection {
        const conn: Connection = mysql.createConnection({
            user: this.USERNAME,
            host: this.HOST,
            password: this.PASSWORD,
            database: this.DATABASE,
            port: this.PORT
        })
        conn.connect(err => {
            if (err !== null) {
                throw new Error(err.message);
            }
        });
        return conn;
    }

    /**
     * 执行sql语句
     * @param conn 数据库连接对象
     * @param sql 要执行的sql
     * @return Promise<any>
     */
    public static async execute(conn: Connection, sql: string): Promise<any> {
        return new Promise((resolve, reject) => {
            conn.query(sql, function (err, result) {
                if (err !== null) {
                    reject(err.message);
                } else {
                    resolve(result);
                }
                // 关闭连接
                if (conn !== null) {
                    conn.end();
                }
            });
        });
    }

    /**
     * 执行sql语句, 并返回一条数据
     * @param conn 数据库连接对象
     * @param sql 要执行的sql
     * @return Promise<any>
     */
    public static async queryOne(conn: Connection, sql: string): Promise<any> {
        const data = await this.execute(conn, sql);
        if (data.length > 1) {
            throw new Error("there are multiple results of the query！");
        } else if (data.length === 1) {
            return data[0] || null;
        } else {
            return null;
        }
    }

    /**
     * 执行更新的sql语句, 并返回查询结果《查询单条》
     * @param conn 数据库连接对象
     * @param sql 要执行的sql
     * @param type 数据集合
     * @return Promise<any>
     */
    public static async queryOneFormat<T>(conn: Connection, sql: string, type: TargetConstructor): Promise<T | null> {
        const data = await this.queryOne(conn, sql);
        return data === null ? null : Bean.Map2Model<T>(data, type);
    }

    /**
     * 执行更新的sql语句, 并返回查询结果《查询多条》
     * @param conn 数据库连接对象
     * @param sql 要执行的sql
     * @param type 数据集合
     * @return Promise<any>
     */
    public static async queryListFormat<T>(conn: Connection, sql: string, type: TargetConstructor): Promise<Array<T>> {
        const data = await this.execute(conn, sql);
        const result: Array<T> = [];
        for (const item of data) {
            const map = await Bean.Map2Model<T>(item, type);
            await result.push(map);
        }
        console.log(result)

        return result;
    }

    /**
     * 执行更新的sql语句, 并返回成功行数
     * @param conn 数据库连接对象
     * @param sql 要执行的sql
     * @return Promise<any>
     */
    public static async update(conn: Connection, sql: string): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            this.execute(conn, sql).then(res => {
                if (res['affectedRows'] !== undefined) {
                    resolve(res.affectedRows);
                } else {
                    resolve(1);
                }
            }).catch((err) => {
                reject(0);
                throw new Error(err);
            });
        });
    }

}