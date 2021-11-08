/*
 * @Author: LRolinx
 * @Date: 2021-01-19 12:12:05
 * @LastEditTime: 2021-01-20 19:00:16
 * @Description: 
 * 
 */
export default class UserDefault {
  public id: string | null = null;

  public nickname: string | null = null;

  public photo: string | null = null;

  public getId(): string | null {
    return this.id;
  }

  public getNickName(): string | null {
    return this.nickname;
  }

  public getPhoto(): string | null {
    return this.photo;
  }



  public setId(id: string): void {
    this.id = id;
  }

  public setNickName(nickname: string): void {
    this.nickname = nickname
  }

  public setPhoto(photo: string): void {
    this.photo = photo;
  }
}