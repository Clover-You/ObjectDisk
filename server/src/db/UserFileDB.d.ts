/*
 * @Author: LRolinx
 * @Date: 2021-01-21 21:43:12
 * @LastEditTime: 2021-01-24 17:18:27
 * @Description: 用户文件接口
 * 
 */

import DB from "./DB";
import UserFile from "../models/UserFile";

export default interface UserFileDB extends DB<UserFile> {

  /**
   * 根据用户ID与文件夹id查询用户的文件
   * @param userID 用户id
   * @param folderID 文件夹id
   */
  queryUserFileByUserIDAndFolderID(userID: number, folderID: number): Promise<UserFile[] | null>;

}