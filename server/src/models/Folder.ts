
/**
 * @author Clover You
 * @desc 2021-01-24 17:13:41 由 Clover You 开发的映射工具生成
 */
export default class Folder {

    /**
     * 文件夹idDefault: null
     */
    private id: number | null = null;
    
    /**
     * 文件夹名称Default: null
     */
    private name: string | null = null;
    
    /**
     * 是否删除 0 — 未删除 1 — 已删除Default: b'0'
     */
    private del: boolean | null = null;
    
    /**
     * 创建时间
     * Default: null
     */
    private createTime: string | null = null;
    
    /**
     * 删除时间Default: null
     */
    private delTime: string | null = null;
    
    /**
     * 用户idDefault: null
     */
    private userId: number | null = null;
    
    /**
     * 文件夹idDefault: null
     */
    private folderId: number | null = null;
    
    /**
     * 文件夹大小Default: null
     */
    private size: string | null = null;
    

    /**
     * 文件夹id Default: null
     * @return number | null
     * @author Clover You
     */
    public getId(): number | null {
        return this.id;
    }

    /**
     * 文件夹id Default: null
     * @return void
     * @author Clover You
     */
    public setId(id: number): void {
        this.id = id;
    }
    
    /**
     * 文件夹名称 Default: null
     * @return string | null
     * @author Clover You
     */
    public getName(): string | null {
        return this.name;
    }

    /**
     * 文件夹名称 Default: null
     * @return void
     * @author Clover You
     */
    public setName(name: string): void {
        this.name = name;
    }
    
    /**
     * 是否删除 0 — 未删除 1 — 已删除 Default: b'0'
     * @return boolean | null
     * @author Clover You
     */
    public getDel(): boolean | null {
        return this.del;
    }

    /**
     * 是否删除 0 — 未删除 1 — 已删除 Default: b'0'
     * @return void
     * @author Clover You
     */
    public setDel(del: boolean): void {
        this.del = del;
    }
    
    /**
     * 创建时间
     *  Default: null
     * @return string | null
     * @author Clover You
     */
    public getCreateTime(): string | null {
        return this.createTime;
    }

    /**
     * 创建时间
     *  Default: null
     * @return void
     * @author Clover You
     */
    public setCreateTime(createTime: string): void {
        this.createTime = createTime;
    }
    
    /**
     * 删除时间 Default: null
     * @return string | null
     * @author Clover You
     */
    public getDelTime(): string | null {
        return this.delTime;
    }

    /**
     * 删除时间 Default: null
     * @return void
     * @author Clover You
     */
    public setDelTime(delTime: string): void {
        this.delTime = delTime;
    }
    
    /**
     * 用户id Default: null
     * @return number | null
     * @author Clover You
     */
    public getUserId(): number | null {
        return this.userId;
    }

    /**
     * 用户id Default: null
     * @return void
     * @author Clover You
     */
    public setUserId(userId: number): void {
        this.userId = userId;
    }
    
    /**
     * 文件夹id Default: null
     * @return number | null
     * @author Clover You
     */
    public getFolderId(): number | null {
        return this.folderId;
    }

    /**
     * 文件夹id Default: null
     * @return void
     * @author Clover You
     */
    public setFolderId(folderId: number): void {
        this.folderId = folderId;
    }
    
    /**
     * 文件夹大小 Default: null
     * @return string | null
     * @author Clover You
     */
    public getSize(): string | null {
        return this.size;
    }

    /**
     * 文件夹大小 Default: null
     * @return void
     * @author Clover You
     */
    public setSize(size: string): void {
        this.size = size;
    }
    
}