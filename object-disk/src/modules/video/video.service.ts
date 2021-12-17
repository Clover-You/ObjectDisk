import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, StreamableFile } from '@nestjs/common';
import { FilesEntity } from 'src/entity/files.entity';
import { Repository } from 'typeorm';
import { UserFilesEntity } from 'src/entity/user_files.entity';
import conf from 'src/config/config';
// import * as ffmpeg from 'ffmpeg';
import * as fs from 'fs';
import * as cmd from 'child_process';

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
 *  -
 * </p>
 * @author LRolinx
 * @create 2021-12-15 17:35
 */
@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(FilesEntity)
    private readonly filesEntity: Repository<FilesEntity>,
    @InjectRepository(UserFilesEntity)
    private readonly userFilesEntity: Repository<UserFilesEntity>,
  ) {}

  /**
   * 获取视频缩略图
   * @param id
   * @returns
   */
  async getVideoSceenshots(id: number): Promise<StreamableFile> {
    const userFile = await this.userFilesEntity.findOne(
      UserFilesEntity.instance({ id }),
    );
    const path = `${conf.upload.path}${userFile.fileId}`;
    const videoshots = `${path}.png`;

    if (fs.existsSync(path)) {
      //视频文件存在
      if (!fs.existsSync(videoshots)) {
        //视频缩略图不存在
        const comStr = `ffmpeg -i ${path} -y -f image2 -frames 1 ${videoshots}`;
        console.log(comStr);
        const com = cmd.execSync(comStr);
        if (!com) {
          return null;
        }
      }
      const file = fs.createReadStream(videoshots);
      return new StreamableFile(file);
    }
    return null;
  }
}
