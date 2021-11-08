/*
 * @Author: LRolinx
 * @Date: 2021-01-12 15:00:30
 * @LastEditTime: 2021-01-13 17:26:09
 * @Description: 上传路由
 * 
 */

import KoaRouter from "koa-router"
import UploadController from "../controller/UploadController";
import fs from "fs";
import conf from "../conf";

const router = new KoaRouter({ prefix: "/upload" });

if (!fs.existsSync(conf.upload.temp)) {
  //没临时文件夹
  fs.mkdirSync(conf.upload.temp, {
      recursive: true
  });
  console.log(`create floder success ${conf.upload.temp}...`);
}

if (!fs.existsSync(conf.upload.path)) {
  //没上传文件夹
  fs.mkdirSync(conf.upload.path, {
      recursive: true
  });
  console.log(`create floder success ${conf.upload.path}...`);
}

// 验证文件是否存在
router.post('/examineFile', UploadController.examineFile)

//分段上传文件 *弃用
// router.post('/uploadFile', UploadController.uploadFile)

//流上传文件
router.put('/uploadStreamFile', UploadController.uploadStreamFile)

//合并文件
router.post('/uploadFileSuccess', UploadController.uploadFileSuccess)

export default router;