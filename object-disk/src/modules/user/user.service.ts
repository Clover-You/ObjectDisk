import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entity/user.entity';
import { InsertResult, Repository } from 'typeorm';
import { AjaxResult } from 'src/utils/ajax-result.classes';
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
}
