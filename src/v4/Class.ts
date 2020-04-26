import Workspace from "./Workspace";
import Palette from "./Palette";
import IClass from "./IClass";
import IBlock from "./IBlock";

export default class Class implements IClass
{
    private m_extends: IClass;

    private m_palette: Palette;
    private m_workspace: Workspace;

    private m_blocks: IBlock[];

    constructor(extend: IClass)
    {
        this.m_extends = extend;
        this.m_blocks = [];

        this.m_palette = new Palette(this);
        this.m_workspace = new Workspace();
    }

    public show()
    {
        Workspace.active = this.m_workspace;
        Palette.active = this.m_palette;
    }

    public get blocks(): IBlock[]
    {
        if (this.m_extends)
        {
            return this.m_extends.blocks.concat(this.m_blocks);
        }
        return this.m_blocks;
    }

    public get extends(): IClass
    {
        return this.m_extends;
    }
}