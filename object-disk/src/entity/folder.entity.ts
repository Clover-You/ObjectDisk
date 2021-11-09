import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

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
 *  用户文件夹实体
 * </p>
 * @author Clover
 * @create 2021-11-09 08:59
 */
@Entity('t_folder')
export class Folder {
  /**
   * 文件夹id
   */
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  /**
   * 文件夹名称
   */
  @Column({ type: 'varchar', length: 64 })
  name: string;

  /**
   * 用户id
   */
  @Column({ type: 'int' })
  userId: number;

  /**
   * 父文件夹id
   */
  @Column({ type: 'int' })
  @ManyToOne(() => User, (user) => user.id)
  folderId: number;

  /**
   * 文件夹大小
   */
  @Column({ type: 'double' })
  size: number;

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
