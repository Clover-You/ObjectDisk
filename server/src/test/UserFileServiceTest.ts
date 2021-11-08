import User from "../models/User";
import UserFileServiceImpl from "../service/impl/UserFileServiceImpl";
import UserFileService from "../service/UserFileService";

/*
 * @Author: LRolinx
 * @Date: 2021-01-22 15:20:51
 * @LastEditTime: 2021-01-23 13:41:46
 * @Description: 
 * 
 */
const userFileService: UserFileService = new UserFileServiceImpl();
 async function userFileAndFolderTest() {
    userFileService.userFileAndFolder(1, null);
   // const user = new User();
   // const copy: User = 
   // console.log(copy.getAccount())
   // console.log(copy)
 }

 userFileAndFolderTest();