import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * █████▒█      ██  ▄████▄   ██ ▄█▀     ██████╗ ██╗   ██╗ ██████╗
 * ▓██   ▒ ██  ▓██▒▒██▀ ▀█   ██▄█▒      ██╔══██╗██║   ██║██╔════╝
 * ▒████ ░▓██  ▒██░▒▓█    ▄ ▓███▄░      ██████╔╝██║   ██║██║  ███╗
 * ░▓█▒  ░▓▓█  ░██░▒▓▓▄ ▄██▒▓██ █▄      ██╔══██╗██║   ██║██║   ██║
 * ░▒█░   ▒▒█████▓ ▒ ▓███▀ ░▒██▒ █▄     ██████╔╝╚██████╔╝╚██████╔╝
 * ▒ ░   ░▒▓▒ ▒ ▒ ░ ░▒ ▒  ░▒ ▒▒ ▓▒     ╚═════╝  ╚═════╝  ╚═════╝
 * ░     ░░▒░ ░ ░   ░  ▒   ░ ░▒ ▒░
 * ░ ░    ░░░ ░ ░ ░        ░ ░░ ░
 * ░     ░ ░      ░  ░
 * Copyright 2021 Clover.
 * <p>
 *  用户文件
 * </p>
 * @author Clover
 * @create 2021-11-09 09:11
 */
@Entity('t_user_files')
export class UserFiles {
  /**
   * 用户文件id
   */
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  /**
   * 文件id
   */
  @Column({ type: 'varchar', length: 512 })
  fileId: string;

  /**
   * 文件名
   */
  @Column({ type: 'varchar', length: 255 })
  fileName: string;

  /**
   * 文件夹id
   */
  @Column({ type: 'int' })
  folderId: string;

  /**
   * 用户id
   */
  @Column({ type: 'int' })
  userId: number;

  /**
   * 是否公开
   */
  @Column({ type: 'bit' })
  open: boolean;

  /**
   * 文件后缀
   */
  @Column({ type: 'varchar', length: 45 })
  suffix: string;

  /**
   * 创建时间
   */
  @Column({ type: 'char', length: 19 })
  createTime: string;

  /**
   * 是否删除
   */
  @Column({ type: 'bit' })
  del: boolean;

  /**
   * 删除时间
   */
  @Column({ type: 'char', length: 19 })
  delTime: string;
}
