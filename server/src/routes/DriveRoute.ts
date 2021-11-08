/*
 * @Author: LRolinx
 * @Date: 2021-01-20 19:20:15
 * @LastEditTime: 2021-01-23 18:14:42
 * @Description: 云盘路由
 * 
 */

import KoaRouter from "koa-router"
import DriveController from "../controller/DriveController";
import FailResult from "../vo/FailResult";
import SuccessResult from "../vo/SuccessResult";

const router = new KoaRouter({ prefix: "/drive" });

/**
 * 添加用户文件夹
 */
router.post('/addUserFolder',DriveController.addUserFolder);

/**
 * 获取用户所有文件
 */
router.post('/getUserFileAndFolder', DriveController.getUserFileAndFolder);

/**
 * 获取图片数据
 */
 router.post('/getImageData', DriveController.getImageData);


export default router;