/**************************************************************************
 * Copyright Copyright 2020 Clover You.
 * File Name: UserDB.ts
 * Description: 用户DB层接口
 *
 * Version: V1.0
 * Author: Clover You
 * Create Time: 2021/1/11 22:02
 ***************************************************************************/
import DB from "./DB";
import User from "../models/User";

export default interface UserDB extends DB<User> {
  /**
   * 根据用户名查询用户
   * @param userName 用户名
   */
  queryUserByNickName(nickName: string): Promise<User | null>;

  /**
   * 根据账号查询用户
   * @param account 账号
   */
  queryUserByAccount(account: string): Promise<User | null>;

}