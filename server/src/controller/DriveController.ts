/*
 * @Author: LRolinx
 * @Date: 2021-01-20 19:22:28
 * @LastEditTime: 2021-01-24 21:03:18
 * @Description: 云盘控制器
 * 
 */
import { fstat } from "fs-extra";
import { ParameterizedContext } from "koa";
import KoaRouter from "koa-router";
import UserFileServiceImpl from "../service/impl/UserFileServiceImpl";
import UserFileService from "../service/UserFileService";
import MathTools from "../utils/MathTools";
import FailResult from "../vo/FailResult";
import SuccessResult from "../vo/SuccessResult";
import fs from "fs";
import conf from "../conf"


type ctxType = ParameterizedContext<any, KoaRouter.IRouterParamContext<any, {}>>;

export default class DriveController {

  private static userFileServe: UserFileService = new UserFileServiceImpl();

  /**
   * 添加用户文件夹
   * @param ctx 
   */
  public static async addUserFolder(ctx: ctxType): Promise<any> {
    const fr: FailResult = new FailResult();
    let userid = ctx.request.body.userid;
    let folderid = ctx.request.body.folderid;
    let name = ctx.request.body.name;
    if (userid == undefined || userid == null || folderid == undefined || folderid == null || name == undefined || name == '') {
      fr.setMsg('参数错误');
    } else {
      let decryptUserid = parseInt(MathTools.decryptForKey(userid));
      let decryptFolderid = folderid == 0 ? 0 : parseInt(MathTools.decryptForKey(folderid));

      ctx.body = await DriveController.userFileServe.addFolder(decryptUserid, name, decryptFolderid);
      return;
    }
    ctx.body = fr;
  }

  /**
    * 获取用户文件夹与文件
    * @param ctx 
    */
  public static async getUserFileAndFolder(ctx: ctxType): Promise<any> {
    const fr: FailResult = new FailResult();
    let userid = ctx.request.body.userid;
    let folderid = ctx.request.body.folderid;
    if (userid == undefined || userid == '') {
      fr.setMsg('参数错误');
    } else {
      let decryptUserid = parseInt(MathTools.decryptForKey(userid));
      ctx.body = await DriveController.userFileServe.userFileAndFolder(decryptUserid, folderid);
      return;
    }
    ctx.body = fr;
  }

  /**
    * 获取图片流数据
    * @param ctx 
    */
  public static async getImageData(ctx: ctxType): Promise<any> {

    let info = await DriveController.userFileServe.getUserFile(ctx.request.body.id);
    let path = `${conf.upload.path}${info.data.fileId}`;
    let stat = fs.statSync(path);
    let fileSize = stat.size;
    let file = fs.createReadStream(path);
    
    ctx.body = file;
  }

}