import Workspace from "./Workspace";
import Palette from "./Palette";
import IClass from "./IClass";

export default class Class implements IClass
{
    private m_name: string;
    private m_extends: IClass;

    private m_palette: Palette;
    private m_workspace: Workspace;

    private m_blocks: string[]; // block desc.

    constructor(name: string, extend: IClass)
    {
        this.m_name = name;
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

    public add(desc: string)
    {
        this.m_blocks.push(desc);

        this.m_palette.draw();
    }

    public get blocks(): { desc: string, owner: string }[]
    {
        const mine = this.m_blocks.map(d => { return {desc: d, owner: this.name} });

        if (this.m_extends)
        {
            return this.m_extends.blocks.concat(mine);
        }
        return mine;
    }

    public get extends(): IClass
    {
        return this.m_extends;
    }

    public get name(): string
    {
        return this.m_name;
    }
}