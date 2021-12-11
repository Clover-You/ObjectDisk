import { format } from 'date-fns';
import { AjaxResult } from 'src/utils/ajax-result.classes';
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

import { Injectable } from '@nestjs/common';
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
  async addFolder(
    userId: number,
    folderId: number,
    name: string,
  ): Promise<AjaxResult> {
    //检查指定的folder_id文件夹里是否已有对应的name文件夹
    const folder = await this.folderEntity.findOne({ userId, name, folderId });
    if (folder == undefined) {
      //文件夹不存在
      const date = format(new Date(), DateUtils.DATETIME_DEFAULT_FORMAT);
      const folderDB = new FolderEntity();
      folderDB.userId = userId;
      folderDB.folderId = folderId;
      folderDB.name = name;
      folderDB.createTime = date;
      const count = await this.folderEntity.insert(folderDB);
      if (count == void 0) {
        //新建文件夹失败
        return AjaxResult.fail('新建文件夹失败');
      }
      //新建文件夹成功
      return AjaxResult.success('新建文件夹成功');
    } else {
      //文件夹存在
      return AjaxResult.fail('文件夹存在');
    }
  }

  /**
   * 获取用户文件和文件夹
   * @param userId
   * @param folderId
   */
  async getUserFileAndFolder(
    userId: number,
    folderId: number,
  ): Promise<AjaxResult> {
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

    return AjaxResult.success(result, '查询成功');
  }
}
