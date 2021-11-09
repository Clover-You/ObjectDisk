import { Controller, Inject } from '@nestjs/common';
import { UserEntity } from 'src/entity/user.entity';
import { AjaxResult } from 'src/utils/ajax-result.classes';
import DateUtils from 'src/utils/DateUtils';
import { UserService } from './user.service';
import { format } from 'date-fns';
import MathTools from 'src/utils/MathTools';

/**
 * █████▒█      ██  ▄████▄   ██ ▄█▀     ██████╗ ██╗   ██╗ ██████╗
 * ▓██   ▒ ██  ▓██▒▒██▀ ▀█   ██▄█▒      ██╔══██╗██║   ██║██╔════╝
 * ▒████ ░▓██  ▒██░▒▓█    ▄ ▓███▄░      ██████╔╝██║   ██║██║  ███╗
 * ░▓█▒  ░▓▓█  ░██░▒▓▓▄ ▄██▒▓██ █▄      ██╔══██╗██║   ██║██║   ██║
 * ░▒█░   ▒▒█████▓ ▒ ▓███▀ ░▒██▒ █▄     ██████╔╝╚██████╔╝╚██████╔╝
 * ▒ ░   ░▒▓▒ ▒ ▒ ░ ░▒ ▒  ░▒ ▒▒ ▓▒     ╚═════╝  ╚═════╝  ╚═════╝
 * ░     ░░▒░ ░ ░   ░  ▒   ░ ░▒ ▒░
 * ░ ░    ░░░ ░ ░ ░        ░ ░░ ░
 * ░     ░ ░      ░  ░
 * Copyright 2021 Clover.
 * <p>
 *  用户控制器
 * </p>
 * @author Clover
 * @create 2021-11-08 15:24
 */
@Controller('user')
export class UserController {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  /**
   * 用户注册实现
   * @param nickName 昵称
   * @param account 账号
   * @param password 密码
   * @param registeredCode 内部注册码
   */
  async userRegistered(
    nickName: string,
    account: string,
    password: string,
    registeredCode: string,
  ): Promise<AjaxResult<UserEntity>> {
    if (registeredCode.toUpperCase() == 'OBJECT') {
      const user = await this.userService.queryUserByAccount(account);
      if (user === null) {
        //用户不存在可注册
        const date = format(new Date(), DateUtils.DATETIME_DEFAULT_FORMAT);

        const user = new UserEntity();
        user.nickName = nickName;
        user.photo =
          'https://cn.bing.com/th?id=OHR.SnowCraterLake_ZH-CN9218350129_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp';
        user.createTime = date;
        user.password = MathTools.encryptForKey(password);
        user.account = account;

        const insertResult = await this.userService.addUser(user);

        if (insertResult != void 0) {
          return AjaxResult.success(null, '注册成功');
        } else {
          return AjaxResult.fail('注册失败');
        }
      } else {
        return AjaxResult.fail('用户已被注册');
      }
    } else {
      return AjaxResult.fail('内部注册码错误');
    }
  }
}
