/*
 * @Author: LRolinx
 * @Date: 2021-01-13 11:11:08
 * @LastEditTime: 2021-01-22 12:24:59
 * @Description: 
 * 
 */
import BaseDB from "../db/impl/BaseDB";
import { Connection } from "mysql";
import UserDBImpl from "../db/impl/UserDBImpl";
import UserDB from "../db/UserDB";
import User from "../models/User";
import { compareAsc, format } from 'date-fns';
import DateUtils from "../utils/DateUtils";

/**
 * 测试用例
 */
async function main() {
  const userDb: UserDB = new UserDBImpl();
  const user = await userDb.queryUserByNickName("Clover You");
  console.log(user?.getNickName());
}

async function userAdd() {
  const user:User = new User();
  const date = format(new Date(), DateUtils.DATETIME_DEFAULT_FORMAT);
  user.setNickName("Clover You");
  user.setPhoto("https://cn.bing.com/th?id=OHR.SnowCraterLake_ZH-CN9218350129_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp");
  user.setCreateTime(date);
  user.setPassword("123");
  user.setAccount("123");

  const userDb: UserDB = new UserDBImpl();
  const count = await userDb.add(user);
  console.log('count:',count);
}

async function  testDesc() {
  const sql: string = "show columns from t_user";
  const conn = BaseDB.getConn();
  const data = await  BaseDB.execute(conn, sql)
  console.log(data);
}
testDesc()
// main();

