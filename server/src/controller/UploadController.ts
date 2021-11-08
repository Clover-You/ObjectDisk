/*
 * @Author: LRolinx
 * @Date: 2021-01-12 22:51:32
 * @LastEditTime: 2021-01-25 18:42:09
 * @Description: 上传控制器
 *
 */

import { ParameterizedContext } from "koa";
import KoaRouter from "koa-router";
import FailResult from "../vo/FailResult";
import SuccessResult from "../vo/SuccessResult";
import fs, { writeFileSync } from "fs";
import fse from "fs-extra";
import path from "path";
import conf from "../conf";
import crypto from "crypto";
import { Buffer } from "buffer";
import MathTools from "../utils/MathTools";
import UserFileService from "../service/UserFileService";
import UserFileServiceImpl from "../service/impl/UserFileServiceImpl";

type ctxType = ParameterizedContext<
  any,
  KoaRouter.IRouterParamContext<any, {}>
>;

export default class UploadController {
  private static userFileService: UserFileService = new UserFileServiceImpl();
  /**
   * 检查文件
   * @param ctx
   */
  public static async examineFile(ctx: ctxType): Promise<any> {
    const fr: FailResult = new FailResult();

    let userid = ctx.request.body.userid;
    let folderid = ctx.request.body.folderid;
    let sha256Id = ctx.request.body.sha256Id;
    let filename = ctx.request.body.filename;
    let fileext = ctx.request.body.fileext;
    if (
      userid == undefined ||
      userid == null ||
      folderid == undefined ||
      folderid == null ||
      sha256Id == undefined ||
      sha256Id == "" ||
      filename == undefined ||
      filename == ""
    ) {
      fr.setMsg("参数错误");
    } else {
      // let decryptUserid = parseInt(MathTools.decryptForKey(userid));
      // let decryptFolderid = folderid == 0 ? 0 : parseInt(MathTools.decryptForKey(folderid));
      //返回检查文件结果
      let data =
        await UploadController.userFileService.examineUserFolderFileAndFileExist(
          userid,
          folderid,
          sha256Id,
          filename,
          fileext
        );
      if (!data.data.userFileExist) {
        if (data.data.fileExist) {
          //秒传
        }
      }
      ctx.body = data;
      return;
    }
    ctx.body = fr;
  }

  /**
   * 片段上传文件 *弃用
   * @param ctx
   */
  public static async uploadFile(ctx: ctxType): Promise<any> {
    const fr: FailResult = new FailResult();
    const sd: SuccessResult<any> = new SuccessResult();

    try {
      let dPath = `${conf.upload.temp}${ctx.request.body.fileSha256}\\`;
      let request: any = ctx.request;
      let content = fs.readFileSync(request.files.file.path);
      if (!fs.existsSync(dPath)) {
        //创建对应的Sha256文件夹
        fs.mkdirSync(dPath, {
          recursive: true,
        });
      }
      if (fs.existsSync(`${dPath}${request.files.file.name}`)) {
        //有文件则删除
        fs.unlinkSync(`${dPath}${request.files.file.name}`);
      }

      // 验证片段Sha256
      let fragmentSha256 = UploadController.createFileHash256Sync(
        request.files.file.path
      );
      if (fragmentSha256 == ctx.request.body.currentChunkSha256) {
        //片段Sha256正确才保存
        fs.appendFileSync(`${dPath}${request.files.file.name}`, content);
        let data = UploadController.uploadFileSuccess(ctx);
        // sd.setData(UploadController.uploadFileSuccess(ctx));
        sd.setData(data);
        sd.setCode(200);
        sd.setMsg("上传成功");
      } else {
        console.log("丢包了");
        sd.setCode(206);
        sd.setMsg("丢包了");
        sd.setData(JSON.parse(ctx.request.body.currentChunkIndex));
      }
      ctx.body = sd;
    } catch (err) {
      console.log(err);
      sd.setMsg("上传失败");
      ctx.body = fr;
    }
  }

  /**
   * 上传流文件
   * @param ctx
   */
  public static async uploadStreamFile(ctx: ctxType): Promise<any> {
    const fr: FailResult = new FailResult();
    const sd: SuccessResult<any> = new SuccessResult();

    try {
      let dPath = `${conf.upload.temp}${ctx.request.query.fileSha256}\\`;
      if (!fs.existsSync(dPath)) {
        //创建对应的Sha256文件夹
        fs.mkdirSync(dPath, {
          recursive: true,
        });
      }
      // if (fs.existsSync(`${dPath}${ctx.request.query.files.file.name}`)) {
      //   //有文件则删除
      //   fs.unlinkSync(`${dPath}${ctx.request.files.file.name}`)
      // }

      let buffers: Buffer[] = [];

      ctx.req
        .on("data", (trunk) => {
          buffers.push(trunk);
        })
        .on("end", async () => {
          const buffer = Buffer.concat(buffers);
          fs.writeFileSync(
            `${dPath}${ctx.request.query.currentChunkIndex}`,
            buffer
          );
          ctx.res.end();
        })
        .on("close", () => {
          //关闭
          UploadController.uploadFileSuccess(ctx);
          sd.setCode(400);
          sd.setMsg("已关闭");
        })
        .on("error", () => {
          sd.setCode(206);
          sd.setMsg("错误");
        });

      ctx.body = sd;
    } catch (err) {
      console.log(err);
      sd.setMsg("片段上传失败");
      ctx.body = fr;
    }
  }

  /**
   * 上传文件成功接口
   * @param ctx
   */
  public static async uploadFileSuccess(ctx: ctxType) {
    let dPath = `${conf.upload.temp}${ctx.request.query.fileSha256}\\`;
    let uploadPath = `${conf.upload.path}${ctx.request.query.fileSha256}`;
    let files = fs.readdirSync(dPath); //文件夹内的文件

    if (files.length != Number(ctx.request.query.currentChunkMax)) {
      return false;
    }

    // if (fs.existsSync(uploadPath)) {
    //   // 文件存在 验证文件Sha256
    //   let fragmentSha256 = UploadController.createFileHash256Sync(uploadPath);
    //   if (fragmentSha256 == ctx.request.query.fileSha256) {
    //     //已经传完整,直接写入对应用户的数据里
    //     return true;
    //   } else {
    //     //没传完整删除
    //     fs.unlinkSync(uploadPath)
    //   }
    // }

    //文件不存在开始合并片段文件
    for (let i = 0, len = files.length; i < len; i++) {
      let content = fs.readFileSync(path.join(dPath, i.toString()));
      fs.appendFileSync(uploadPath, content);
    }

    //写入用户文件表里
    let userfileData = await UploadController.userFileService.addUserFile(
      ctx.request.query.userid as string,
      Number(ctx.request.query.folderid),
      ctx.request.query.fileSha256 as string,
      ctx.request.query.fileName as string,
      ctx.request.query.fileExt as string
    );

    //写入文件表里
    let sqlurl = uploadPath.replace(/\\/g, "\\\\");
    let data = await UploadController.userFileService.addFile(
      ctx.request.query.fileSha256 as string,
      sqlurl
    );

    return true;
  }

  /**
   * 秒传文件接口
   * @param ctx
   */
  public static uploadSecondPass(ctx: ctxType) {
    // let dPath = `${conf.upload.temp}${ctx.request.body.fileSha256}\\`;
    // let uploadPath = `${conf.upload.path}${ctx.request.body.fileSha256}.${ctx.request.body.fileExt}`;
    // let files = fs.readdirSync(dPath);//文件夹内的文件
    // if (files.length != ctx.request.body.currentChunkMax) {
    //   return false;
    // }

    // if (fs.existsSync(uploadPath)) {
    //   // 验证文件Sha256
    //   let fragmentSha256 = UploadController.createFileHash256Sync(uploadPath);
    //   if (fragmentSha256 == ctx.request.body.fileSha256) {
    //     //已经传完整,直接写入对应用户的数据里
    //     return true;
    //   } else {
    //     //没传完整删除
    //     fs.unlinkSync(uploadPath)
    //   }
    // }

    // for(let i = 0; i< files.length; i++) {
    //   let filename = i + `.${ctx.request.body.fileExt}`;
    //   let content = fs.readFileSync(path.join(dPath, filename));
    //   fs.appendFileSync(uploadPath, content);
    // }

    // // UploadController.removeDir(dPath);
    // // fs.rmdirSync(dPath)//如果文件夹是空的，就将自己删除掉

    //文件传输完整，直接写入用户数据库
    return true;
  }

  /**
   * 删除文件夹
   * @param dir
   */
  public static removeDir(dir: string) {
    let files = fs.readdirSync(dir);
    for (var i = 0, len = files.length; i < len; i++) {
      let newPath = path.join(dir, files[i]);
      let stat = fs.statSync(newPath);
      if (stat.isDirectory()) {
        //如果是文件夹就递归下去
        this.removeDir(newPath);
      } else {
        //删除文件
        fs.unlinkSync(newPath);
      }
    }
    fs.rmdirSync(dir); //如果文件夹是空的，就将自己删除掉
  }

  /**
   * 获取文件Sha256
   * @param path
   */
  public static createFileHash256Sync(path: string) {
    //读取一个Buffer
    const buffer = fs.readFileSync(path);

    const fsHash = crypto.createHash("sha256");

    fsHash.update(buffer);
    const hash = fsHash.digest("hex");
    return hash;
  }
}
