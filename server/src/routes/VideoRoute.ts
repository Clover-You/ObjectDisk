/*
 * @Author: LRolinx
 * @Date: 2021-01-12 17:27:57
 * @LastEditTime: 2021-01-26 22:05:18
 * @Description: 视频路由
 * 
 */

import KoaRouter from "koa-router"
import VideoController from "../controller/VideoController";

const router = new KoaRouter({ prefix: "/video" });

// 播放视频流
router.get('/playVideo', VideoController.playVideo)

// 播放视频字节流
router.post('/playVideoSteam', VideoController.playVideoSteam)

// 获取视频缩略图
router.post('/getVideoSceenshots',VideoController.getVideoSceenshots)

export default router;