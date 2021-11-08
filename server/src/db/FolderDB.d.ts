/*
 * @Author: LRolinx
 * @Date: 2021-01-21 22:49:21
 * @LastEditTime: 2021-01-24 17:17:48
 * @Description: 文件夹接口
 * 
 */
import DB from "./DB";
import Folder from "../models/Folder";

export default interface FolderDB extends DB<Folder> {

  /**
   * 根据用户ID查询用户的文件夹列表
   * @param userID 
   */
  queryFolderByUserID(userID: number): Promise<Folder[] | null>;

  /**
   * 根据用户ID与文件夹表id查询对应的文件夹
   * @param userID 用户id
   * @param folderID 文件夹表id
   */
  queryFolderByUserIDAndID(userID: number, ID: number): Promise<Folder | null>;

  /**
   * 根据用户ID与文件夹id查询用户的文件夹列表
   * @param userID 用户id
   * @param folderID 文件夹id
   */
  queryFolderByUserIDAndFolderID(userID: number, folderID: number): Promise<Folder[] | null>;

}