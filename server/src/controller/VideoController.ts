/*
 * @Author: LRolinx
 * @Date: 2021-01-12 17:30:24
 * @LastEditTime: 2021-03-09 14:56:15
 * @Description: 视频控制器
 * 
 */

import { ParameterizedContext } from "koa";
import KoaRouter from "koa-router";
import FailResult from "../vo/FailResult";
import SuccessResult from "../vo/SuccessResult";
import fs from "fs";
import conf from "../conf"
import { Buffer } from "buffer";
import cmd from "child_process";
import ffmpeg from "ffmpeg"
import UserFileServiceImpl from "../service/impl/UserFileServiceImpl";
import UserFileService from "../service/UserFileService";

type ctxType = ParameterizedContext<any, KoaRouter.IRouterParamContext<any, {}>>;

export default class VideoController {

  private static userFileServe: UserFileService = new UserFileServiceImpl();

  //播放视频片段流
  public static async playVideo(ctx: ctxType): Promise<any> {
    let path = `${conf.upload.path}/${ctx.query.name}`;
    let stat = fs.statSync(path);
    let fileSize = stat.size;
    let range = ctx.req.headers.range;

    // fileSize 3332038

    if (range) {
      //有range头才使用206状态码
      let parts = range.replace(/bytes=/, "").split("-");
      let start = parseInt(parts[0], 10);
      let end = parts[1] ? parseInt(parts[1], 10) : start + 999999;
      // end 在最后取值为 fileSize - 1 
      end = end > fileSize - 1 ? fileSize - 1 : end;
      let chunksize = (end - start) + 1;
      let file = fs.createReadStream(path, { start, end });

      let head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      };

      ctx.res.writeHead(206, head);
      // const bu = file.pipe(ctx.res)
      ctx.body = file;

    } else {
      let head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      };
      ctx.res.writeHead(200, head);
      ctx.body = fs.createReadStream(path).pipe(ctx.res)

    }
  }
  //播放视频流
  public static async playVideoSteam(ctx: ctxType): Promise<any> {
    let path = `${conf.upload.path}e7b1353fb65b957e15a6537ea10adc0290cff0319a17b622b0d383a5acf23b77`;
    let stat = fs.statSync(path);
    let fileSize = stat.size;
    let range = ctx.request.body.range;

    // fileSize 3332038

    if (range) {
      //有range头才使用206状态码
      let parts = range.replace(/bytes=/, "").split("-");
      let start = parseInt(parts[0], 10);
      let end = parts[1] ? parseInt(parts[1], 10) : start + 999999;
      // end 在最后取值为 fileSize - 1 
      end = end > fileSize - 1 ? fileSize - 1 : end;
      let chunksize = (end - start) + 1;
      let file = fs.createReadStream(path, { start, end });

      let head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        // 'Content-Type': 'video/mp4',
      };

      ctx.res.writeHead(206, head);
      // const bu = file.pipe(ctx.res)
      ctx.body = file;

    } else {
      let head = {
        'Accept-Ranges': 'bytes',
        'Content-Length': fileSize,
        // 'Content-Type': 'video/mp4',
      };
      ctx.res.writeHead(200, head);
      ctx.body = fs.createReadStream(path)
    }
  }


  //获取视频时长 *测试不通过
  public static async getVideoTotalDuration(ctx: ctxType): Promise<any> {
    // let path = `${conf.upload.path}e7b1353fb65b957e15a6537ea10adc0290cff0319a17b622b0d383a5acf23b77`;
    // const process = new ffmpeg(path)
    // return process.then(function (video) {
    //   console.log('getVideoTotalDuration,seconds:' + video.metadata.duration.seconds)
    //   return video.metadata.duration.seconds || 0
    // }, function (err) {
    //   console.log('getVideoTotalDuration,err:' + err.message)
    //   return -1
    // })
  }

  //获取视频缩略图
  public static async getVideoSceenshots(ctx: ctxType): Promise<any> {
    let info = await VideoController.userFileServe.getUserFile(ctx.request.body.id);
    let path = `${conf.upload.path}${info.data.fileId}`;
    let imgPath = `${path}.png`;

    if (!fs.existsSync(`${imgPath}`)) {
      //文件不存在
      let comStr = `ffmpeg -i ${path} -y -f image2 -frames 1 ${imgPath}`;
      // console.log(com)
      let commod = cmd.execSync(comStr);

      if (!commod) {
        return null;
      }
    }
    let stat = fs.statSync(`${imgPath}`);
    let fileSize = stat.size;
    let file = fs.createReadStream(`${imgPath}`);

    ctx.body = file;
  }

  //拆分视频 *未测试
  public static async splitVideo(ctx: ctxType): Promise<any> {
    const process = new ffmpeg(ctx.request.body.videoPath)
    return process.then(function (video) {
      video
        .setVideoStartTime(ctx.request.body.startTime)
        .setVideoDuration(ctx.request.body.duration)
        .save(ctx.request.body.outVideoPath, function (error, file) {
          if (!error) {
            console.log('Video file: ' + file)
          }
        })
    }, function (err) {
      console.log('Error: ' + err)
    })
  }

}