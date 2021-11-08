/*
 * @Author: LRolinx
 * @Date: 2021-01-19 10:57:33
 * @LastEditTime: 2021-01-21 23:08:04
 * @Description: 用户服务接口
 * 
 */

export default interface UserService {
  // 用户登录
  userLogin(account: string, password: string): SuccessResult<UserDefault | null>;
  // 用户注册
  userRegistered(nickName: string, account: string, password: string, registeredCode: string): SuccessResult<UserDefault | null>;
}