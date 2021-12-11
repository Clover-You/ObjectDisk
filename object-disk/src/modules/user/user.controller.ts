import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { UserEntity } from 'src/entity/user.entity';
import { AjaxResult } from 'src/utils/ajax-result.classes';
import { UserService } from './user.service';
import { HttpParameterException } from 'src/exceptions/http-parameter.exception';
import { StringUtils } from 'src/utils/StringUtils';
import MathTools from 'src/utils/MathTools';
import { UserDefaultEntity } from 'src/customizeEntity/user_default.entity';

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
@Controller('/users')
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
   * @author LRolinx
   * @author Clover·You
   * @date 2021/11/09 11:29
   */
  @Post('/objectCloudDiskRegistered')
  async userRegistered(
    nickName: string,
    account: string,
    password: string,
    registeredCode: string,
  ): Promise<AjaxResult<UserEntity>> {
    if (registeredCode.toUpperCase() == 'OBJECT') {
      this.userService.userRegistered(
        UserEntity.instance({
          nickName,
          account,
          password,
        }),
      );
      return AjaxResult.success(null, '注册成功');
    } else {
      return AjaxResult.fail('内部注册码错误');
    }
  }

  /**
   * 用户登录请求接口
   * @param account 账号
   * @param password 密码
   * @return Promise<AjaxResult>
   * @author Clover You
   * @date 2021/11/9 14:37
   */
  @Post('/objectCloudDiskLogin')
  async userLogin(@Body() { account, password }: UserEntity) {
    if (!StringUtils.hasText(account)) {
      throw new HttpParameterException('账号不能为空', 406);
    }
    if (!StringUtils.hasText(password)) {
      throw new HttpParameterException('密码不能为空', 406);
    }
    const userinfo = await this.userService.userLogin(account, password);

    const userdef = new UserDefaultEntity();
    userdef.id = MathTools.encryptForKey(userinfo.id);
    userdef.nickName = userinfo.nickName;
    userdef.photo = userinfo.photo;

    return AjaxResult.success(userdef);
  }
}
