/*
 * @Author: LRolinx
 * @Date: 2021-01-21 23:17:08
 * @LastEditTime: 2021-01-23 14:20:16
 * @Description: 用户文件与文件夹vo
 * 
 */

export default class UserFileAndFolder {
  public id: string | null = null;

  public name: string | null = null;

  public type: string | null = null;

  public size: string | null = null;

  public path: string | null = null;

  public updateTime: string | null = null;

  public suffix: string | null = null;

  public fileType: string | null = null;

  public getId(): string | null {
    return this.id;
  }

  public getName(): string | null {
    return this.name;
  }

  public getType(): string | null {
    return this.type;
  }

  public getSize(): string | null {
    return this.size;
  }

  public getPath(): string | null {
    return this.path;
  }

  public getUpdateTime(): string | null {
    return this.updateTime;
  }

  public getSuffix(): string | null {
    return this.suffix;
  }

  public getFileType(): string | null {
    return this.fileType;
  }



  public setId(id: any): void {
    this.id = id;
  }

  public setName(name: any): void {
    this.name = name;
  }

  public setType(type: any): void {
    this.type = type;
  }

  public setSize(size: any): void {
    this.size = size;
  }

  public setPath(path: any): void {
    this.path = path;
  }

  public setUpdateTime(updateTime: any): void {
    this.updateTime = updateTime;
  }

  public setSuffix(suffix:any): void {
    this.suffix = suffix;
  }

  public setFileType(fileType:any): void {
    this.fileType = fileType;
  }

}