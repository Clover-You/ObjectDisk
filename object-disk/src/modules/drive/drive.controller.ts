import { AjaxResult } from 'src/utils/ajax-result.classes';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { DriveService } from './drive.service';
import MathTools from 'src/utils/MathTools';
import { StringUtils } from 'src/utils/StringUtils';

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

      return await this.driveService.addFolder(
        decryptUserid,
        decryptFolderid,
        name,
      );
    }
  }

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
      return await this.driveService.getUserFileAndFolder(
        decryptUserid,
        decryptFolderid,
      );
    }
  }
}
