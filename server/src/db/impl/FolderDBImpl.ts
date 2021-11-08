/*
 * @Author: LRolinx
 * @Date: 2021-01-21 22:52:17
 * @LastEditTime: 2021-01-24 17:36:57
 * @Description: 文件夹接口实现
 * 
 */

import Folder from "../../models/Folder";
import FolderDB from "../FolderDB";
import BaseDB from "./BaseDB";

export default class FolderDBImpl implements FolderDB {
  public async add(folder: Folder): Promise<number> {
    const conn = BaseDB.getConn();
    const sql = `insert into t_folder (name,del,create_time,user_id,folder_id,size)
                     values ('${folder.getName()}',0,'${folder.getCreateTime()}',${folder.getUserId()},${folder.getFolderId()},0)`

    let count: number = 0;
    await BaseDB.execute(conn, sql).then(res => {
      count = res.affectedRows;
    });
    return count;
  }
  delete(id: number): Promise<number> {
    throw new Error("Method not implemented.");
  }
  queryOne(id: number): Promise<Folder> {
    throw new Error("Method not implemented.");
  }
  update(t: Folder): Promise<number> {
    throw new Error("Method not implemented.");
  }

  /**
   * 根据用户ID查询用户的文件夹
   * @param userID 
   */
  public async queryFolderByUserID(userID: number): Promise<Folder[] | null> {
    const conn = BaseDB.getConn();

    let sql: string = `select id,name,del,create_time,del_time,user_id,folder_id,size 
                            from t_folder
                            where binary user_id = '${userID}' and del = 0`;
    let data = await BaseDB.queryListFormat<Folder>(conn, sql, Folder);
    return data;
  }

  /**
   * 根据用户ID与文件夹id查询指定的用户的文件夹
   * @param userID 用户id
   * @param folderID 文件夹id
   */
  public async queryFolderByUserIDAndID(userID: number, ID: number): Promise<Folder | null> {
    const conn = BaseDB.getConn();

    let sql: string = `select id,name,del,create_time,del_time,user_id,folder_id,size 
                            from t_folder
                            where binary user_id = '${userID}' and id = '${ID}' and del = 0`;
    let data = await BaseDB.queryOneFormat<Folder>(conn, sql, Folder);
    return data;
  }

  /**
   * 根据用户ID与文件夹id查询用户的文件夹
   * @param userID 用户id
   * @param folderID 文件夹id
   */
  public async queryFolderByUserIDAndFolderID(userID: number, folderID: number): Promise<Folder[] | null> {
    const conn = BaseDB.getConn();
    let sql = `select id,name,del,create_time,del_time,user_id,folder_id,size 
          from t_folder
          where binary user_id = '${userID}' and folder_id = ${folderID} and del = 0`;
    let data = await BaseDB.queryListFormat<Folder>(conn, sql, Folder);

    return data;
  }

}