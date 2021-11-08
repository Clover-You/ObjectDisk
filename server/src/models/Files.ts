
/**
 * @author Clover You
 * @desc 2021-01-24 17:13:41 由 Clover You 开发的映射工具生成
 */
export default class Files {

    /**
     * 文件
     * Sha256IdDefault: null
     */
    private sha256: string | null = null;
    
    /**
     * 文件路径Default: null
     */
    private url: string | null = null;
    
    /**
     * 状态IdDefault: null
     */
    private statusId: number | null = null;
    
    /**
     * 文件类型idDefault: null
     */
    private fileTypeId: number | null = null;
    
    /**
     * 是否已检查Default: b'0'
     */
    private checked: boolean | null = null;
    

    /**
     * 文件
     * Sha256Id Default: null
     * @return string | null
     * @author Clover You
     */
    public getSha256(): string | null {
        return this.sha256;
    }

    /**
     * 文件
     * Sha256Id Default: null
     * @return void
     * @author Clover You
     */
    public setSha256(sha256: string): void {
        this.sha256 = sha256;
    }
    
    /**
     * 文件路径 Default: null
     * @return string | null
     * @author Clover You
     */
    public getUrl(): string | null {
        return this.url;
    }

    /**
     * 文件路径 Default: null
     * @return void
     * @author Clover You
     */
    public setUrl(url: string): void {
        this.url = url;
    }
    
    /**
     * 状态Id Default: null
     * @return number | null
     * @author Clover You
     */
    public getStatusId(): number | null {
        return this.statusId;
    }

    /**
     * 状态Id Default: null
     * @return void
     * @author Clover You
     */
    public setStatusId(statusId: number): void {
        this.statusId = statusId;
    }
    
    /**
     * 文件类型id Default: null
     * @return number | null
     * @author Clover You
     */
    public getFileTypeId(): number | null {
        return this.fileTypeId;
    }

    /**
     * 文件类型id Default: null
     * @return void
     * @author Clover You
     */
    public setFileTypeId(fileTypeId: number): void {
        this.fileTypeId = fileTypeId;
    }
    
    /**
     * 是否已检查 Default: b'0'
     * @return boolean | null
     * @author Clover You
     */
    public getChecked(): boolean | null {
        return this.checked;
    }

    /**
     * 是否已检查 Default: b'0'
     * @return void
     * @author Clover You
     */
    public setChecked(checked: boolean): void {
        this.checked = checked;
    }
    
}