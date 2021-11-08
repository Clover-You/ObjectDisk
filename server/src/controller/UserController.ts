/*
 * @Author: LRolinx
 * @Date: 2021-01-12 16:34:05
 * @LastEditTime: 2021-01-20 16:19:45
 * @Description: 用户控制器
 * 
 */
import { ParameterizedContext } from "koa";
import KoaRouter from "koa-router"
import UserDBImpl from "../db/impl/UserDBImpl";
import UserDB from "../db/UserDB";
import UserServiceImpl from "../service/impl/UserServiceImpl";
import UserService from "../service/UserService";
import FailResult from "../vo/FailResult";
import SuccessResult from "../vo/SuccessResult";

type UserLogin = ParameterizedContext<any, KoaRouter.IRouterParamContext<any, {}>>;
export default class UserController {

  private static userService: UserService = new UserServiceImpl();

  /**
   * 用户登录
   * @param ctx 
   */
  public static async userLogin(ctx: UserLogin): Promise<any> {
    const fr: FailResult = new FailResult();
    const sd: SuccessResult<any> = new SuccessResult();
    let account = ctx.request.body.account;
    let password = ctx.request.body.password;
    if (account == undefined || password == undefined) {
      fr.setMsg('参数错误');
    }
    else if (account == '' || password == '') {
      fr.setMsg('账号或密码不能为空');
    } else {
      ctx.body = await UserController.userService.userLogin(account, password)
      return;
    }
    ctx.body = fr;
  }

  /**
   * 用户注册
   * @param ctx 
   */
  public static async userRegistered(ctx: UserLogin): Promise<any> {
    const fr: FailResult = new FailResult();
    const sd: SuccessResult<any> = new SuccessResult();
    let account = ctx.request.body.account;
    let password = ctx.request.body.password;
    let confirmPassword = ctx.request.body.confirmPassword;
    let nickName = ctx.request.body.nickName;
    let registeredCode = ctx.request.body.registeredCode;

    if (account == undefined || password == undefined || confirmPassword == undefined || nickName == undefined || registeredCode == undefined) {
      fr.setMsg('参数错误');
    }
    else if (account == '' || password == '' || confirmPassword == '' || nickName == '' || registeredCode == '') {
      fr.setMsg('内容不能为空');
    } else {
      if (password === confirmPassword) {
        ctx.body = await UserController.userService.userRegistered(nickName, account, password, registeredCode)
        return;
      } else {
        fr.setMsg('确认密码与输入密码不匹配');
      }
    }
    ctx.body = fr;
  }
}