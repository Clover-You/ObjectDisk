
/**
 * @author Clover You
 * @desc 2021-01-24 17:13:41 由 Clover You 开发的映射工具生成
 */
export default class User {

    /**
     * 用户idDefault: null
     */
    private id: number | null = null;
    
    /**
     * 昵称Default: null
     */
    private nickname: string | null = null;
    
    /**
     * 头像Default: null
     */
    private photo: string | null = null;
    
    /**
     * 创建时间Default: null
     */
    private createtime: string | null = null;

    /**
     * 是否停用 0 — 未删除 1— 删除Default: b'0'
     */
    private isDisable: boolean | null = null;
    
    /**
     * 是否删除 0 — 未删除 1— 删除Default: b'0'
     */
    private del: boolean | null = null;
    
    /**
     * 数据删除时间
     * Default: null
     */
    private deltime: string | null = null;
    
    /**
     * 密码Default: null
     */
    private password: string | null = null;
    
    /**
     * 账号Default: null
     */
    private account: string | null = null;
    

    /**
     * 用户id Default: null
     * @return number | null
     * @author Clover You
     */
    public getId(): number | null {
        return this.id;
    }

    /**
     * 用户id Default: null
     * @return void
     * @author Clover You
     */
    public setId(id: number): void {
        this.id = id;
    }
    
    /**
     * 昵称 Default: null
     * @return string | null
     * @author Clover You
     */
    public getNickname(): string | null {
        return this.nickname;
    }

    /**
     * 昵称 Default: null
     * @return void
     * @author Clover You
     */
    public setNickname(nickname: string): void {
        this.nickname = nickname;
    }
    
    /**
     * 头像 Default: null
     * @return string | null
     * @author Clover You
     */
    public getPhoto(): string | null {
        return this.photo;
    }

    /**
     * 头像 Default: null
     * @return void
     * @author Clover You
     */
    public setPhoto(photo: string): void {
        this.photo = photo;
    }
    
    /**
     * 创建时间 Default: null
     * @return string | null
     * @author Clover You
     */
    public getCreatetime(): string | null {
        return this.createtime;
    }

    /**
     * 创建时间 Default: null
     * @return void
     * @author Clover You
     */
    public setCreatetime(createtime: string): void {
        this.createtime = createtime;
    }

    /**
     * 是否停用 0 — 未删除 1— 删除 Default: b'0'
     * @return boolean | null
     * @author Clover You
     */
    public getIsDisable(): boolean | null {
        return this.isDisable;
    }

    /**
     * 是否停用 0 — 未删除 1— 删除 Default: b'0'
     * @return boolean | null
     * @author Clover You
     */
     public setIsDisable(isDisable: boolean): void {
        this.isDisable = isDisable;
    }
    
    /**
     * 是否删除 0 — 未删除 1— 删除 Default: b'0'
     * @return boolean | null
     * @author Clover You
     */
    public getDel(): boolean | null {
        return this.del;
    }

    /**
     * 是否删除 0 — 未删除 1— 删除 Default: b'0'
     * @return void
     * @author Clover You
     */
    public setDel(del: boolean): void {
        this.del = del;
    }
    
    /**
     * 数据删除时间
     *  Default: null
     * @return string | null
     * @author Clover You
     */
    public getDeltime(): string | null {
        return this.deltime;
    }

    /**
     * 数据删除时间
     *  Default: null
     * @return void
     * @author Clover You
     */
    public setDeltime(deltime: string): void {
        this.deltime = deltime;
    }
    
    /**
     * 密码 Default: null
     * @return string | null
     * @author Clover You
     */
    public getPassword(): string | null {
        return this.password;
    }

    /**
     * 密码 Default: null
     * @return void
     * @author Clover You
     */
    public setPassword(password: string): void {
        this.password = password;
    }
    
    /**
     * 账号 Default: null
     * @return string | null
     * @author Clover You
     */
    public getAccount(): string | null {
        return this.account;
    }

    /**
     * 账号 Default: null
     * @return void
     * @author Clover You
     */
    public setAccount(account: string): void {
        this.account = account;
    }
    
}