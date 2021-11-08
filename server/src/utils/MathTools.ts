/*
 * @Author: LRolinx
 * @Date: 2021-01-20 10:27:54
 * @LastEditTime: 2021-01-22 18:03:37
 * @Description: 
 * 
 */
import crypto from 'crypto';
import nodeRSA from 'node-rsa';
import fs from 'fs';
import conf from "../conf";

export default class MathTools {
  // 生成一个1024长度的密钥对
  private static key = new nodeRSA({ b: 1024 });

  // 导出私钥
  private static privateKey = MathTools.key.exportKey('private');

  // 导出公钥
  private static publicKey = MathTools.key.exportKey('public');

  /**
   * 在本地生成加密密匙
   */
  public static generateKey() {
    if (!fs.existsSync(conf.key.path)) {
      //没临时文件夹
      fs.mkdirSync(conf.key.path, {
          recursive: true
      });
    }

    if (!fs.existsSync(`${conf.key.path}private.key`)) {
      //文件不存在
      fs.writeFileSync(`${conf.key.path}private.key`, MathTools.privateKey)
    }

    if (!fs.existsSync(`${conf.key.path}public.key`)) {
      //文件不存在
      fs.writeFileSync(`${conf.key.path}public.key`, MathTools.publicKey)
    }
  }


  /**
   * 使用密匙加密
   * @param value 需要加密的内容
   */
  public static encryptForKey(value: any): string {
    MathTools.generateKey();
    
    let data = fs.readFileSync(`${conf.key.path}private.key`);
    var key = new nodeRSA(data);
    return key.encryptPrivate(value, 'base64');
  }

  /**
   * 使用密匙解密
   * @param value 需要解密的内容
   */
  public static decryptForKey(encrypt: any): string {
    let data = fs.readFileSync(`${conf.key.path}public.key`);
    var key = new nodeRSA(data);
    return key.decryptPublic(encrypt, 'utf8');
  }
}