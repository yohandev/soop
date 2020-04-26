import Workspace from "./Workspace";
import Palette from "./Palette";

export default class Class
{
    private m_extends: Class;

    private m_palette: Palette;
    private m_workspace: Workspace;

    constructor(extend: Class)
    {
        this.m_extends = extend;
        this.m_workspace = new Workspace();
    }

    public show()
    {
        Workspace.active = this.m_workspace;
        Palette.active = this.m_palette;
    }
}