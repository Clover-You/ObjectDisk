/*
 * @Author: LRolinx
 * @Date: 2021-01-21 23:02:40
 * @LastEditTime: 2021-01-25 00:13:56
 * @Description: 用户文件服务
 * 
 */

import SuccessResult from "../vo/SuccessResult";
import UserFileAndFolder from "../vo/UserFileAndFolder";

export default interface UserFileService {
  /**
   * 创建文件夹
   * @param userId 
   * @param name 
   * @param folder_id 
   */
  addFolder(userId: number, name: string, folder_id: number): Promise<SuccessResult>;

  /**
   * 获取用户文件和文件夹
   * @param userId 
   * @param folderId 
   */
  userFileAndFolder(userId: number, folderId: number): Promise<SuccessResult>;

  /**
   * 检查用户文件夹内的文件是否重名和文件库是否发生撞库
   * @param userId 
   * @param folderId 
   * @param sha256Id 
   * @param filename 
   * @param fileext 
   */
  examineUserFolderFileAndFileExist(userId: number, folderId: number, sha256Id: string, filename: string, fileext: string): Promise<SuccessResult>;

  /**
   * 添加文件进用户文件库
   * @param userId 
   * @param folderId 
   * @param sha256Id 
   * @param filename 
   * @param fileext 
   */
  addUserFile(userId: string, folderId: number, sha256Id: string, filename: string, fileext: string): Promise<SuccessResult>;

  /**
   * 添加文件进文件库
   * @param sha256Id 
   * @param fileurl 
   */
  addFile(sha256Id: string,fileurl:string): Promise<SuccessResult>;

  /**
    * 获取图片流数据
    * @param id 
    */
   getUserFile(id:string): Promise<SuccessResult>;
}