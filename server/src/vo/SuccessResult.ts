/**************************************************************************
 * Copyright Copyright 2020 Clover You.
 * File Name: SuccessResult.ts
 * Description:
 *
 * Version: V1.0
 * Author: Clover You
 * Create Time: 2021/1/12 11:06
 ***************************************************************************/
export default class SuccessResult<T> {

    public code: number = 200;

    public data: T | null = null;

    public msg: string = '';

    public getCode(): number {
        return this.code;
    }

    public  getData(): T | null {
        return this.data;
    }

    public getMsg(): string {
        return this.msg;
    }

    public setCode(code: number): void {
        this.code = code;
    }

    public setData(data: T): void {
        this.data = data;
    }

    public setMsg(msg: string): void {
        this.msg = msg;
    }

}