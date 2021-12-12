import { AjaxResult } from 'src/utils/ajax-result.classes';
import { Injectable } from '@nestjs/common';
import conf from 'src/config/config';
import * as fs from 'fs';
import path from 'path/posix';
import { UserFilesEntity } from 'src/entity/user_files.entity';
import { FilesEntity } from 'src/entity/files.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
 *  -上传Service
 * </p>
 * @author LRolinx
 * @create 2021-12-12 15:08
 */
@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(FilesEntity)
    private readonly filesEntity: Repository<FilesEntity>,
    @InjectRepository(UserFilesEntity)
    private readonly userFilesEntity: Repository<UserFilesEntity>,
  ) {}

  async uploadStreamFile(
    req,
    userid,
    folderid,
    fileName,
    filePath,
    fileExt,
    fileSha256,
    currentChunkMax,
    currentChunkIndex,
  ): Promise<AjaxResult> {
    const sha256Path = `${conf.upload.temp}${fileSha256}\\`;
    const uploadPath = `${conf.upload.path}${fileSha256}`;
    const buffers: Buffer[] = [];
    if (!fs.existsSync(sha256Path)) {
      //创建对应的Sha256文件夹
      fs.mkdirSync(sha256Path, { recursive: true });
    }
    // if (fs.existsSync(`${dPath}${ctx.request.query.files.file.name}`)) {
    //   //有文件则删除
    //   fs.unlinkSync(`${dPath}${ctx.request.files.file.name}`)
    // }

    req
      .on('data', (trunk) => {
        console.log(3);
        buffers.push(trunk);
      })
      .on('end', () => {
        const buffer = Buffer.concat(buffers);
        fs.writeFileSync(`${sha256Path}${currentChunkIndex}`, buffer);
      })
      .on('close', () => {
        //关闭
        const files = fs.readdirSync(sha256Path);
        if (files.length != currentChunkMax) {
          return AjaxResult.success('传输进行中');
        }

        //开始合并片段文件
        for (let i = 0, len = files.length; i < len; i++) {
          const content = fs.readFileSync(path.join(sha256Path, i.toString()));
          fs.appendFileSync(uploadPath, content);
        }

        //写入用户文件表里
        // const userfileData = await UploadController.userFileService.addUserFile(
        //   ctx.request.query.userid,
        //   ctx.request.query.folderid,
        //   ctx.request.query.fileSha256,
        //   ctx.request.query.fileName,
        //   ctx.request.query.fileExt,
        // );

        //写入文件表里
        // const sqlurl = uploadPath.replace(/\\/g, '\\\\');
        // const data = await UploadController.userFileService.addFile(
        //   ctx.request.query.fileSha256,
        //   sqlurl,
        // );

        return AjaxResult.success('传输完成');
      })
      .on('error', () => {
        return AjaxResult.fail('传输出错');
      });

    return AjaxResult.success('传输完成');
  }
}
