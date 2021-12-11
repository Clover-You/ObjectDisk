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
import { UserFileAndFolder } from 'src/customizeEntity/user_file_and_folder.entity';
import { FolderEntity } from 'src/entity/folder.entity';
import { UserFilesEntity } from 'src/entity/user_files.entity';
import DateUtils from 'src/utils/DateUtils';
import MathTools from 'src/utils/MathTools';
import { Repository } from 'typeorm';

@Injectable()
export class DriveService {
  constructor(
    @InjectRepository(FolderEntity)
    private readonly folderEntity: Repository<FolderEntity>,
    @InjectRepository(UserFilesEntity)
    private readonly userFilesEntity: Repository<UserFilesEntity>,
  ) {}
  /**
   * 创建文件夹
   * @param userId 用户id
   * @param name 文件夹名称
   * @param folderId 父级文件夹id
   */
  async addFolder({ userId, name, folderId }: FolderEntity) {
    //检查指定的folder_id文件夹里是否已有对应的name文件夹
    const folderin = FolderEntity.instance({
      userId,
      folderId,
      name,
    });
    const folder = await this.folderEntity.findOne(folderin);
    // const userFolder = await this.folderDb.queryFolderByUserIDAndFolderID(
    //   userId,
    //   folder_id,
    // );
    const isExist = false; //文件夹是否存在
    // if (userFolder != null) {
    //   for (const item of userFolder) {
    //     if (item.getName() === name) {
    //       //文件夹名称冲突
    //       isExist = true;
    //       break;
    //     }
    //   }
    // }
    // if (!isExist) {
    //   //文件夹不存在
    //   const date = format(new Date(), DateUtils.DATETIME_DEFAULT_FORMAT);
    //   const folderDB = new FolderEntity();
    //   folderDB.userId = userId;
    //   folderDB.folderId = folder_id;
    //   folderDB.name = name;
    //   folderDB.createTime = date;
    //   const count = this.folderEntity.insert(folderDB);
    //   // const count =  await this.folderDb.add(folderDB);
    //   if (count !== 1) {
    //     throw new HttpParameterException(
    //       '文件夹创建失败',
    //       HttpStatus.INTERNAL_SERVER_ERROR,
    //     );
    //   }
    // } else {
    //   //文件夹存在
    //   throw new HttpParameterException('文件夹已存在', 406);
    // }
  }

  async getUserFileAndFolder(
    userId: number,
    folderId: number,
  ): Promise<UserFileAndFolder[]> {
    const folders = await this.folderEntity.find({ userId, folderId });
    const files = await this.userFilesEntity.find({ userId, folderId });
    const result: UserFileAndFolder[] = [];

    if (folders !== null) {
      for (const folder of folders) {
        const data = new UserFileAndFolder();
        data.id = MathTools.encryptForKey(folder.id);
        data.type = 'folder';
        data.name = folder.name;
        data.size = folder.size;
        data.updateTime = folder.createTime;
        result.push(data);
      }
    }
    if (files !== null) {
      for (const file of files) {
        const data = new UserFileAndFolder();
        data.id = MathTools.encryptForKey(file.id);
        data.type = 'file';
        data.updateTime = file.createTime;
        data.name = file.fileName;
        data.size = 0;
        data.suffix = file.suffix;
        result.push(data);
      }
    }

    return result;
  }
}
