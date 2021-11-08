
/**
 * @author Clover You
 * @desc 2021-01-24 17:13:41 由 Clover You 开发的映射工具生成
 */
export default class FileType {

    /**
     * 类型idDefault: null
     */
    private id: number | null = null;
    
    /**
     * 类型名称Default: null
     */
    private type: string | null = null;
    

    /**
     * 类型id Default: null
     * @return number | null
     * @author Clover You
     */
    public getId(): number | null {
        return this.id;
    }

    /**
     * 类型id Default: null
     * @return void
     * @author Clover You
     */
    public setId(id: number): void {
        this.id = id;
    }
    
    /**
     * 类型名称 Default: null
     * @return string | null
     * @author Clover You
     */
    public getType(): string | null {
        return this.type;
    }

    /**
     * 类型名称 Default: null
     * @return void
     * @author Clover You
     */
    public setType(type: string): void {
        this.type = type;
    }
    
}