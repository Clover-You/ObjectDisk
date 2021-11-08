
/**
 * @author Clover You
 * @desc 2021-01-24 17:13:41 由 Clover You 开发的映射工具生成
 */
export default class UserFiles {

    /**
     * 用户文件idDefault: null
     */
    private id: number | null = null;
    
    /**
     * 文件Sha256IdDefault: null
     */
    private fileId: string | null = null;
    
    /**
     * 是否删除 0 — 未删除 1 — 已删除Default: b'0'
     */
    private del: boolean | null = null;
    
    /**
     * 添加时间Default: null
     */
    private createTime: string | null = null;
    
    /**
     * 删除时间Default: null
     */
    private delTime: string | null = null;
    
    /**
     * 文件名Default: null
     */
    private fileName: string | null = null;
    
    /**
     * 文件夹idDefault: null
     */
    private folderId: number | null = null;
    
    /**
     * 用户idDefault: null
     */
    private userId: number | null = null;
    
    /**
     * 是否公开Default: b'0'
     */
    private open: boolean | null = null;
    
    /**
     * 文件后缀名Default: null
     */
    private suffix: string | null = null;
    

    /**
     * 用户文件id Default: null
     * @return number | null
     * @author Clover You
     */
    public getId(): number | null {
        return this.id;
    }

    /**
     * 用户文件id Default: null
     * @return void
     * @author Clover You
     */
    public setId(id: number): void {
        this.id = id;
    }
    
    /**
     * 文件Sha256Id Default: null
     * @return string | null
     * @author Clover You
     */
    public getFileId(): string | null {
        return this.fileId;
    }

    /**
     * 文件Sha256Id Default: null
     * @return void
     * @author Clover You
     */
    public setFileId(fileId: string): void {
        this.fileId = fileId;
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
     * 添加时间 Default: null
     * @return string | null
     * @author Clover You
     */
    public getCreateTime(): string | null {
        return this.createTime;
    }

    /**
     * 添加时间 Default: null
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
     * 文件名 Default: null
     * @return string | null
     * @author Clover You
     */
    public getFileName(): string | null {
        return this.fileName;
    }

    /**
     * 文件名 Default: null
     * @return void
     * @author Clover You
     */
    public setFileName(fileName: string): void {
        this.fileName = fileName;
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
     * 是否公开 Default: b'0'
     * @return boolean | null
     * @author Clover You
     */
    public getOpen(): boolean | null {
        return this.open;
    }

    /**
     * 是否公开 Default: b'0'
     * @return void
     * @author Clover You
     */
    public setOpen(open: boolean): void {
        this.open = open;
    }
    
    /**
     * 文件后缀名 Default: null
     * @return string | null
     * @author Clover You
     */
    public getSuffix(): string | null {
        return this.suffix;
    }

    /**
     * 文件后缀名 Default: null
     * @return void
     * @author Clover You
     */
    public setSuffix(suffix: string): void {
        this.suffix = suffix;
    }
    
}