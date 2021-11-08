/*
 * @Author: LRolinx
 * @Date: 2021-01-19 11:08:19
 * @LastEditTime: 2021-01-23 15:21:38
 * @Description: 用户服务实现
 * 
 */

import { format } from "date-fns";
import { promises } from "fs";
import UserDBImpl from "../../db/impl/UserDBImpl";
import UserDB from "../../db/UserDB";
import User from "../../models/User";
import Bean from "../../utils/Bean";
import DateUtils from "../../utils/DateUtils";
import MathTools from "../../utils/MathTools";
import SuccessResult from "../../vo/SuccessResult";
import UserDefault from "../../vo/UserDefault";
import UserService from "../UserService";

export default class UserServiceImpl implements UserService {
  private userDb: UserDB = new UserDBImpl();

  /**
   * 用户登录实现
   * @param account 账号
   * @param password 密码
   */
  public async userLogin(account: string, password: string): Promise<SuccessResult<UserDefault | null>> {
    const sr = new SuccessResult<UserDefault | null>()
    const user = await this.userDb.queryUserByAccount(account);
    if (user === null) {
      sr.setData(null)
      sr.setCode(500)
      sr.setMsg("找不到您的账号")

    }
    else if (user.getPassword() === MathTools.encryptForKey(password)) {
      const userDefault = await Bean.Map2Model<UserDefault>(user, UserDefault);
      let encryptionId = MathTools.encryptForKey(userDefault.getId());
      userDefault.setId(encryptionId)
      sr.setData(userDefault)
      sr.setMsg("登录成功")
    } else {
      sr.setData(null)
      sr.setCode(500)
      sr.setMsg("密码错误")
    }
    console.log(user);

    return sr;
  }

  /**
   * 用户注册实现
   * @param nickName 昵称
   * @param account 账号
   * @param password 密码
   * @param registeredCode 内部注册码
   */
  public async userRegistered(nickName: string, account: string, password: string, registeredCode: string): Promise<SuccessResult<UserDefault | null>> {
    const sr = new SuccessResult<UserDefault | null>()
    if (registeredCode.toUpperCase() == "OBJECT") {
      const user = await this.userDb.queryUserByAccount(account);
      if (user === null) {
        //用户不存在可注册

        const user: User = new User();
        const date = format(new Date(), DateUtils.DATETIME_DEFAULT_FORMAT);
        user.setNickname(nickName);
        user.setPhoto("https://cn.bing.com/th?id=OHR.SnowCraterLake_ZH-CN9218350129_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp");
        user.setCreatetime(date);
        user.setPassword(MathTools.encryptForKey(password));
        user.setAccount(account);

        const userDb: UserDB = new UserDBImpl();
        const count = await userDb.add(user);

        if (count === 1) {
          sr.setData(null)
          sr.setMsg("注册成功")
        } else {
          sr.setData(null)
          sr.setCode(500)
          sr.setMsg("注册失败")
        }

      } else {
        sr.setData(null)
        sr.setCode(500)
        sr.setMsg("用户已被注册")
      }
    }
    else {
      sr.setData(null)
      sr.setCode(500)
      sr.setMsg("内部注册码错误")
    }

    return sr;
  }
}