/**************************************************************************
 * Copyright Copyright 2020 Clover You.
 * File Name: DB.ts
 * Description: 作为所有持久层的基类接口（db层）
 *
 * Version: V1.0
 * Author: Clover You
 * Create Time: 2021/1/11 21:44
 ***************************************************************************/

export default interface DB<T> {
    /**
     * 添加一个实体进数据库
     * @param t 添加的实体
     * @return 返回受影响行数
     */
    add(t: T): Promise<number>;

    /**
     * 通过id删除数据
     * @param id 需要删除的数据id
     * @return 返回受影响行数
     */
    delete(id: number): Promise<number>;

    /**
     * 通过id查询数据
     * @param id 数据id
     * @return 返回查询的数据
     */
    queryOne(id: number): Promise<T>;

    /**
     * 修改数据
     * @param t 最终修正的数据
     * @return 返回受影响行数
     */
    update(t: T): Promise<number>;

}