/*
 * @Author: LRolinx
 * @Date: 2021-01-21 21:48:35
 * @LastEditTime: 2021-01-24 17:19:00
 * @Description: 用户文件接口实现
 * 
 */

import BaseDB from "./BaseDB";
import Bean from "../../utils/Bean";
import UserFiles from "../../models/UserFiles";
import UserFileDB from "../UserFileDB";

export default class UserFileDBImpl implements UserFileDB {
  public async add(userFiles: UserFiles): Promise<number> {
    const conn = BaseDB.getConn();
    const sql = `insert into t_user_files (file_id,del,create_time,file_name,folder_id,user_id,open,suffix)
                      values ('${userFiles.getFileId()}',${userFiles.getDel()},'${userFiles.getCreateTime()}','${userFiles.getFileName()}','${userFiles.getFolderId()}','${userFiles.getUserId()}',${userFiles.getOpen()},'${userFiles.getSuffix()}')`
    let count: number = 0;
    await BaseDB.execute(conn, sql).then(res => {
      count = res.affectedRows;
    });
    return count;
  }
  delete(id: number): Promise<number> {
    throw new Error("Method not implemented.");
  }
  public async queryOne(id: number): Promise<UserFiles | null> {
    const conn = BaseDB.getConn();
    const sql = `select id,file_id,del,create_time,file_name,folder_id,user_id,open,suffix
                      from t_user_files
                      where binary id = '${id}' and del = 0`
    let data = await BaseDB.queryOneFormat<UserFiles>(conn, sql, UserFiles);
    return data;
  }
  update(t: UserFiles): Promise<number> {
    throw new Error("Method not implemented.");
  }

  /**
   * 根据用户ID与文件夹id查询用户的文件
   * @param userID 用户id
   * @param folderID 文件夹id
   */
  public async queryUserFileByUserIDAndFolderID(userID: number, folderID: number): Promise<UserFiles[] | null> {
    const conn = BaseDB.getConn();
    let sql = `select id,file_id,del,create_time,del_time,file_name,folder_id,user_id,open,suffix 
          from t_user_files
          where binary user_id = '${userID}' and folder_id = ${folderID} and del = 0`;
    let data = await BaseDB.queryListFormat<UserFiles>(conn, sql, UserFiles);
    return data;
  }
}