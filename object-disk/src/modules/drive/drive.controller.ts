import { UserFileAndFolder } from 'src/customizeEntity/user_file_and_folder.entity';
import { AjaxResult } from './../../utils/ajax-result.classes';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { DriveService } from './drive.service';
import { FolderEntity } from 'src/entity/folder.entity';
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
  async addUserFolder(
    @Body() { userid, folderid, name },
  ): Promise<AjaxResult<FolderEntity>> {
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

      await this.driveService.addFolder({
        userId: decryptUserid,
        folderId: decryptFolderid,
        name: name,
      });
      return AjaxResult.success(null, '新建文件夹成功');
    }
  }

  @Post('/getUserFileAndFolder')
  async getUserFileAndFolder(
    @Body() { userid, folderid },
  ): Promise<AjaxResult<UserFileAndFolder[]>> {
    if (!StringUtils.hasText(userid) || !StringUtils.hasText(folderid)) {
      return AjaxResult.fail('参数错误');
    } else {
      const decryptUserid = parseInt(MathTools.decryptForKey(userid));
      const decryptFolderid =
        folderid == '0' ? 0 : parseInt(MathTools.decryptForKey(folderid));

      //获取用户当前目录下的所有文件夹以及文件
      const data = await this.driveService.getUserFileAndFolder(
        decryptUserid,
        decryptFolderid,
      );

      return AjaxResult.success(data, '查询成功');
    }
  }
}
