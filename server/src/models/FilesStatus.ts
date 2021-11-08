
/**
 * @author Clover You
 * @desc 2021-01-24 17:13:41 由 Clover You 开发的映射工具生成
 */
export default class FilesStatus {

    /**
     * 文件状态idDefault: null
     */
    private id: number | null = null;
    
    /**
     * 文件状态Default: null
     */
    private status: string | null = null;
    
    /**
     * 状态是否删除Default: b'0'
     */
    private del: boolean | null = null;
    

    /**
     * 文件状态id Default: null
     * @return number | null
     * @author Clover You
     */
    public getId(): number | null {
        return this.id;
    }

    /**
     * 文件状态id Default: null
     * @return void
     * @author Clover You
     */
    public setId(id: number): void {
        this.id = id;
    }
    
    /**
     * 文件状态 Default: null
     * @return string | null
     * @author Clover You
     */
    public getStatus(): string | null {
        return this.status;
    }

    /**
     * 文件状态 Default: null
     * @return void
     * @author Clover You
     */
    public setStatus(status: string): void {
        this.status = status;
    }
    
    /**
     * 状态是否删除 Default: b'0'
     * @return boolean | null
     * @author Clover You
     */
    public getDel(): boolean | null {
        return this.del;
    }

    /**
     * 状态是否删除 Default: b'0'
     * @return void
     * @author Clover You
     */
    public setDel(del: boolean): void {
        this.del = del;
    }
    
}