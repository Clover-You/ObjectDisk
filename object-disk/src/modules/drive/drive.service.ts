/*
 * █████▒█      ██  ▄████▄   ██ ▄█▀     ██████╗ ██╗   ██╗ ██████╗
 * ▓██   ▒ ██  ▓██▒▒██▀ ▀█   ██▄█▒      ██╔══██╗██║   ██║██╔════╝
 * ▒████ ░▓██  ▒██░▒▓█    ▄ ▓███▄░      ██████╔╝██║   ██║██║  ███╗
 * ░▓█▒  ░▓▓█  ░██░▒▓▓▄ ▄██▒▓██ █▄      ██╔══██╗██║   ██║██║   ██║
 * ░▒█░   ▒▒█████▓ ▒ ▓███▀ ░▒██▒ █▄     ██████╔╝╚██████╔╝╚██████╔╝
 * ▒ ░   ░▒▓▒ ▒ ▒ ░ ░▒ ▒  ░▒ ▒▒ ▓▒     ╚═════╝  ╚═════╝  ╚═════╝
 * ░     ░░▒░ ░ ░   ░  ▒   ░ ░▒ ▒░
 * ░ ░    ░░░ ░ ░ ░        ░ ░░ ░
 * ░     ░ ░      ░  ░
 * Copyright 2022 LRolinx.
 * <p>
 *  -云盘Service
 * </p>
 * @author LRolinx
 * @create 2021-12-10 17:31
 */

import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DriveService {
  //   constructor(
  //     @InjectRepository(UserEntity)
  //     private readonly userEninserttity: Repository<UserEntity>,
  //   ) {}
  //   /**
  //    * 创建文件夹
  //    * @param userId 用户id
  //    * @param name 文件夹名称
  //    * @param folder_id 父级文件夹id
  //    */
  //   async addFolder({ userId, name, folder_id }: Promise<SuccessResult<any>>) {
  //     //检查指定的folder_id文件夹里是否已有对应的name文件夹
  //     const userFolder = await this.folderDb.queryFolderByUserIDAndFolderID(
  //       userId,
  //       folder_id,
  //     );
  //     let isExist = false; //文件夹是否存在
  //     if (userFolder != null) {
  //       for (const item of userFolder) {
  //         if (item.getName() === name) {
  //           //文件夹名称冲突
  //           isExist = true;
  //           break;
  //         }
  //       }
  //     }
  //     if (!isExist) {
  //       //文件夹不存在
  //       const date = format(new Date(), DateUtils.DATETIME_DEFAULT_FORMAT);
  //       const folderDB = new Folder();
  //       folderDB.setUserId(userId);
  //       folderDB.setFolderId(folder_id);
  //       folderDB.setName(name);
  //       folderDB.setCreateTime(date);
  //       const count = await this.folderDb.add(folderDB);
  //       if (count !== 1) {
  //         throw new HttpParameterException(
  //           '文件夹创建失败',
  //           HttpStatus.INTERNAL_SERVER_ERROR,
  //         );
  //       }
  //     } else {
  //       //文件夹存在
  //       throw new HttpParameterException('文件夹已存在', 406);
  //     }
  //   }
}
