/*
 * @Author: LRolinx
 * @Date: 2021-01-24 21:15:49
 * @LastEditTime: 2021-01-24 22:00:58
 * @Description: 文件接口实现
 * 
 */
import Files from "../../models/Files";
import FileDB from "../FileDB";
import BaseDB from "./BaseDB";

export default class FolderDBImpl implements FileDB {
  public async add(files: Files): Promise<number> {
    const conn = BaseDB.getConn();
    const sql = `insert into t_files (sha256,url,status_id,file_type_id,checked)
                     values ('${files.getSha256()}','${files.getUrl()}','${files.getStatusId()}','${files.getFileTypeId()}',${files.getChecked()})`

    let count: number = 0;
    await BaseDB.execute(conn, sql).then(res => {
      count = res.affectedRows;
    });
    return count;
  }
  delete(id: number): Promise<number> {
    throw new Error("Method not implemented.");
  }
  queryOne(id: number): Promise<Files> {
    throw new Error("Method not implemented.");
  }
  update(t: Files): Promise<number> {
    throw new Error("Method not implemented.");
  }

  /**
   * 根据Sha256ID查询文件列表的文件是否存在
   * @param userID 
   */
  public async queryFileBySha256ID(sha256Id: string): Promise<boolean> {
    const conn = BaseDB.getConn();
    let sql: string = `select * from t_files where binary sha256 = '${sha256Id}'`;
    let data = await BaseDB.execute(conn, sql);
    return data.length <= 0 ? false : true;
  }

}