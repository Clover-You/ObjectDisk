/**************************************************************************
 * Copyright Copyright 2020 Clover You.
 * File Name: FailResult.ts
 * Description:
 *
 * Version: V1.0
 * Author: Clover You
 * Create Time: 2021/1/12 11:14
 ***************************************************************************/
export default class FailResult {

    public code: number = 500;

    public msg: string = '';

    public getCode(): number {
        return this.code;
    }

    public getMsg(): string {
        return this.msg;
    }

    public setCode(code: number): void {
        this.code = code;
    }

    public setMsg(msg: string): void {
        this.msg = msg;
    }

}