import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entity/user.entity';
import { InsertResult, Repository } from 'typeorm';
import { AjaxResult } from 'src/utils/ajax-result.classes';
import { HttpParameterException } from 'src/exceptions/http-parameter.exception';
import MathTools from 'src/utils/MathTools';
import { format } from 'date-fns';
import DateUtils from 'src/utils/DateUtils';
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
 *  用户Service
 * </p>
 * @author Clover
 * @create 2021-11-08 15:23
 */

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
  ) {}

  async userRegistered({ account, nickName, password }: UserEntity) {
    const user = await this.queryUserByAccount(account);
    if (user === null) {
      //用户不存在可注册
      const date = format(new Date(), DateUtils.DATETIME_DEFAULT_FORMAT);

      const user = UserEntity.instance({
        nickName,
        photo:
          'https://cn.bing.com/th?id=OHR.SnowCraterLake_ZH-CN9218350129_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp',
        createTime: date,
        password: MathTools.encryptForKey(password),
        account,
      });

      const insertResult = await this.addUser(user);

      if (insertResult == void 0) {
        throw new HttpException('注册失败', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    } else {
      throw new HttpParameterException('用户已被注册', 406);
    }
  }

  /**
   * 根据账号查询用户
   * @param account 账号
   * @author LRolinx
   * @author Clover You
   * @date 2021/11/09 10:38
   * @return Promise<UserEntity>
   */
  async queryUserByAccount(account: string): Promise<UserEntity> {
    const query = UserEntity.instance({ account });
    return this.userEntity.findOne(query);
  }
  /**
   * 添加用户信息
   * @param user 用户信息
   * @author LRolinx
   * @author Clover You
   * @date 2021/11/09 10:44
   * @return Promise<InsertResult>
   */
  async addUser(user: UserEntity): Promise<InsertResult> {
    return this.userEntity.insert(user);
  }
  /**
   * 用户登录实现
   * @param account 账号
   * @param password 密码
   * @author LRolinx
   * @author Clover You
   * @date 2021/11/09 15:55
   * @return Promise<UserEntity>
   */
  async userLogin(account: string, password: string): Promise<UserEntity> {
    const user = await this.queryUserByAccount(account);
    if (user == null) {
      throw new HttpParameterException('账号不存在', 406);
    }
    if (user.password !== MathTools.encryptForKey(password.trim())) {
      throw new HttpParameterException('密码错误', 406);
    }
    return user;
  }
}
