/*
 * @Author: LRolinx
 * @Date: 2021-01-12 14:47:07
 * @LastEditTime: 2021-01-20 19:20:26
 * @Description: 用户路由
 * 
 */

import KoaRouter from "koa-router"
import UserController from "../controller/UserController";
import FailResult from "../vo/FailResult";
import SuccessResult from "../vo/SuccessResult";

const router = new KoaRouter({ prefix: "/users" });

router.post('/', async (ctx) => {
    ctx.body = "<h1>Hello World!</h1>"
})

/**
 * 用户登录请求接口
 */
router.post('/objectCloudDiskLogin', UserController.userLogin);

/**
 * 用户注册请求接口
 */
router.post('/objectCloudDiskRegistered', UserController.userRegistered);

export default router;