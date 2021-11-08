/*
 * @Author: LRolinx
 * @Date: 2021-01-21 23:09:23
 * @LastEditTime: 2021-01-25 00:16:56
 * @Description: 用户文件服务实现
 * 
 */

import { format } from "date-fns";
import FileDB from "../../db/FileDB";
import FolderDB from "../../db/FolderDB";
import FileDBImpl from "../../db/impl/FileDBImpl";
import FolderDBImpl from "../../db/impl/FolderDBImpl";
import UserFileDBImpl from "../../db/impl/UserFileDBImpl";
import UserFileDB from "../../db/UserFileDB";
import Files from "../../models/Files";
import Folder from "../../models/Folder";
import UserFiles from "../../models/UserFiles";
import Bean from "../../utils/Bean";
import DateUtils from "../../utils/DateUtils";
import MathTools from "../../utils/MathTools";
import SuccessResult from "../../vo/SuccessResult";
import UserDefault from "../../vo/UserDefault";
import UserFileAndFolder from "../../vo/UserFileAndFolder";
import UserFileService from "../UserFileService";


export default class UserFileServiceImpl implements UserFileService {
  private fileDb: FileDB = new FileDBImpl();
  private userFileDb: UserFileDB = new UserFileDBImpl();
  private folderDb: FolderDB = new FolderDBImpl();

  /**
   * 创建文件夹
   * @param userId 用户id
   * @param name 文件夹名称
   * @param folder_id 父级文件夹id
   */
  public async addFolder(userId: number, name: string, folder_id: number): Promise<SuccessResult<any>> {
    //检查指定的folder_id文件夹里是否已有对应的name文件夹
    const sr = new SuccessResult<UserDefault | null>()
    const userFolder = await this.folderDb.queryFolderByUserIDAndFolderID(userId, folder_id);
    let isExist = false;//文件夹是否存在
    if (userFolder != null) {
      for (let item of userFolder) {
        if (item.getName() === name) {
          //文件夹名称冲突
          isExist = true;
          break;
        }
      }
    }

    if (!isExist) {
      //文件夹不存在
      const date = format(new Date(), DateUtils.DATETIME_DEFAULT_FORMAT);
      const folderDB = new Folder();

      folderDB.setUserId(userId);
      folderDB.setFolderId(folder_id);
      folderDB.setName(name);
      folderDB.setCreateTime(date);

      const count = await this.folderDb.add(folderDB);
      if (count === 1) {
        sr.setData(null)
        sr.setMsg("文件夹创建完成")
      } else {
        sr.setData(null)
        sr.setCode(500)
        sr.setMsg("文件夹创建失败")
      }
    } else {
      //文件夹存在
      sr.setCode(500)
      sr.setMsg("文件夹已存在");
    }
    return sr;
  }

  /**
   * 获取用户文件和文件夹
   * @param userId 
   * @param folderId 
   */
  public async userFileAndFolder(userId: number, folderId: number): Promise<SuccessResult<any>> {
    const sr = new SuccessResult<UserFileAndFolder[]>();
    const result: UserFileAndFolder[] = [];
    let lsfolderId = folderId == 0 ? 0 : parseInt(MathTools.decryptForKey(folderId));
    try {
      const folders = await this.folderDb.queryFolderByUserIDAndFolderID(userId, lsfolderId);
      const files = await this.userFileDb.queryUserFileByUserIDAndFolderID(userId, lsfolderId);
      if (folders !== null) {
        for (const folder of folders) {
          const data = await Bean.Map2Model<UserFileAndFolder>(folder, UserFileAndFolder);
          data.setId(MathTools.encryptForKey(data.getId()))
          data.setType('folder');
          data.setUpdateTime(folder.getCreateTime());
          result.push(data);
        }
      }
      if (files !== null) {
        for (const file of files) {
          const data = new UserFileAndFolder();
          data.setId(MathTools.encryptForKey(file.getId()));
          data.setType('file');
          data.setUpdateTime(file.getCreateTime());
          data.setName(file.getFileName());
          data.setSize(0);
          data.setSuffix(file.getSuffix());
          result.push(data);
        }
      }

      sr.setData(result);
    } catch (e) {
      console.log(e);
    }
    return sr;
  }

  /**
   * 检查用户文件夹内的文件是否重名和文件库是否发生撞库
   * @param userId 
   * @param folderId 
   * @param sha256Id 
   * @param filename 
   * @param fileext 
   */
  public async examineUserFolderFileAndFileExist(userId: number, folderId: number, sha256Id: string, filename: string, fileext: string): Promise<SuccessResult<any>> {
    const sr = new SuccessResult<any>();
    let decryptUserId = parseInt(MathTools.decryptForKey(userId));
    let decryptFolderId = folderId == 0 ? 0 : parseInt(MathTools.decryptForKey(folderId));
    try {
      const fileExist = await this.fileDb.queryFileBySha256ID(sha256Id);
      const userFiles = await this.userFileDb.queryUserFileByUserIDAndFolderID(decryptUserId, decryptFolderId);
      let userFileExist = false;
      if (userFiles !== null) {
        for (const file of userFiles) {
          if (file.getFileName() === filename && file.getSuffix() === fileext) {
            userFileExist = true;
            break;
          }
        }
      }

      let data = {
        userFileExist,
        fileExist
      }

      if (!userFileExist) {
        sr.setCode(200);
        sr.setData(data);
      } else {
        sr.setCode(500);
        sr.setMsg("该目录已存在同名文件")
      }
    } catch (e) {
      console.log(e);
    }
    return sr;
  }

  /**
   * 添加文件进用户文件库
   * @param userId 
   * @param folderId 
   * @param sha256Id 
   * @param filename 
   * @param fileext 
   */
  public async addUserFile(userId: string, folderId: number, sha256Id: string, filename: string, fileext: string): Promise<SuccessResult<any>> {
    const sr = new SuccessResult<any>();
    let decryptUserId = parseInt(MathTools.decryptForKey(userId));
    let decryptFolderId = folderId == 0 ? 0 : parseInt(MathTools.decryptForKey(folderId));

    let userFile = new UserFiles();
    try {
      //这里开始添加用户文件
      const date = format(new Date(), DateUtils.DATETIME_DEFAULT_FORMAT);
      userFile.setUserId(decryptUserId);
      userFile.setFolderId(decryptFolderId);
      userFile.setFileId(sha256Id);
      userFile.setFileName(filename);
      userFile.setSuffix(fileext);
      userFile.setOpen(false);
      userFile.setCreateTime(date);
      userFile.setDel(false);

      const count = await this.userFileDb.add(userFile);

      if (count === 1) {
        sr.setCode(200);
        sr.setMsg("新增用户文件成功")
      } else {
        sr.setCode(500);
        sr.setMsg("新增用户文件失败")
      }
    } catch (e) {
      console.log(e);
    }
    return sr;
  }

  /**
   * 添加文件进文件库
   * @param sha256Id 
   * @param fileurl 
   */
  public async addFile(sha256Id: string, fileurl: string): Promise<SuccessResult<any>> {
    const sr = new SuccessResult<any>();
    let file = new Files();
    try {
      //这里开始添加用户文件
      const date = format(new Date(), DateUtils.DATETIME_DEFAULT_FORMAT);
      file.setSha256(sha256Id);
      file.setUrl(fileurl);
      file.setStatusId(0);
      file.setFileTypeId(0);
      file.setChecked(false);

      const count = await this.fileDb.add(file);

      if (count === 1) {
        sr.setCode(200);
        sr.setMsg("新增文件成功")
      } else {
        sr.setCode(500);
        sr.setMsg("新增文件失败")
      }
    } catch (e) {
      console.log(e);
    }
    return sr;
  }

  /**
  * 获取对应的用户文件
  * @param ctx 
  */
  public async getUserFile(id: string): Promise<SuccessResult<any>> {
    const sr = new SuccessResult<any>();
    try {
      let did = parseInt(MathTools.decryptForKey(id));
      let userfile = await this.userFileDb.queryOne(did);
      sr.setData(userfile);
    }catch (e) {
      console.log(e);
    }
    return sr;
  }
}