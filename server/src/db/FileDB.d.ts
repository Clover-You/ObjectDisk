/*
 * @Author: LRolinx
 * @Date: 2021-01-24 21:12:21
 * @LastEditTime: 2021-01-24 21:29:27
 * @Description: 文件接口
 * 
 */
import DB from "./DB";
import File from "../models/File";

export default interface FileDB extends DB<File> {

  /**
   * 根据Sha256ID查询文件列表的文件是否存在
   * @param userID 
   */
  queryFileBySha256ID(sha256Id: string): Promise<any>;

}