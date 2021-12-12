import { AjaxResult } from 'src/utils/ajax-result.classes';
import {
  Body,
  Controller,
  Inject,
  Post,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { DriveService } from './drive.service';
import MathTools from 'src/utils/MathTools';
import { StringUtils } from 'src/utils/StringUtils';
import { Stream } from 'stream';

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
 *  -云盘控制器
 * </p>
 * @author LRolinx
 * @create 2021-12-10 17:26
 */
@Controller('/drive')
export class DriveController {
  constructor(
    @Inject(DriveService)
    private readonly driveService: DriveService,
  ) {}

  /**
   * 添加用户文件夹
   * @param userid
   * @param folderid
   * @param name
   * @returns
   */
  @Post('/addUserFolder')
  async addUserFolder(@Body() { userid, folderid, name }): Promise<AjaxResult> {
    if (
      !StringUtils.hasText(userid) ||
      !StringUtils.hasText(folderid) ||
      !StringUtils.hasText(name)
    ) {
      return AjaxResult.fail('参数错误');
    } else {
      const decryptUserid = parseInt(MathTools.decryptForKey(userid));
      const decryptFolderid =
        folderid == '0' ? 0 : parseInt(MathTools.decryptForKey(folderid));

      return this.driveService.addFolder(decryptUserid, decryptFolderid, name);
    }
  }

  /**
   * 获取用户当前文件夹内的文件以及文件夹
   * @param userid
   * @param folderid
   * @returns
   */
  @Post('/getUserFileAndFolder')
  async getUserFileAndFolder(
    @Body() { userid, folderid },
  ): Promise<AjaxResult> {
    if (!StringUtils.hasText(userid) || !StringUtils.hasText(folderid)) {
      return AjaxResult.fail('参数错误');
    } else {
      const decryptUserid = parseInt(MathTools.decryptForKey(userid));
      const decryptFolderid =
        folderid == '0' ? 0 : parseInt(MathTools.decryptForKey(folderid));

      //获取用户当前目录下的所有文件夹以及文件
      return this.driveService.getUserFileAndFolder(
        decryptUserid,
        decryptFolderid,
      );
    }
  }

  /**
   * 通过文件id获取用户文件
   * @param id
   * @returns
   */
  @Post('getUserFileForFileId')
  async getUserFileForFileId(@Body() { id }) {
    const did = parseInt(MathTools.decryptForKey(id));
    return this.driveService.getUserFileForFileId(did);
  }
}
