import { Group, Point } from "paper";
import Class from "./Class";
import Editor from "./Editor";
import { Blocks } from "./Blocks";
import Workspace from "./Workspace";

export default class Palette
{
    private m_scroll_pane: Group;
    private target: Class;

    constructor(target: Class)
    {
        this.target = target;
    }

    public draw(): void
    {
        if (this.m_scroll_pane)
        {
            this.m_scroll_pane.remove();
        }
        this.m_scroll_pane = new Group();

        let pos = new Point(Editor.padding * 2 + 60, Editor.header_height + Editor.padding * 3);

        for (const desc of this.target.blocks)
        {
            const block = Blocks.create(desc);
            
            block["draw_display"]();
            block.group.scale(0.7);
            block.group.bounds.topLeft = pos;
            block.shape.path.onMouseDown = e => Workspace.active.add(Blocks.create(desc));

            this.m_scroll_pane.addChild(block.group);

            pos.y += block.shape.height + Editor.padding * 2;
        }
    }

    public load()
    {
        if (!this.m_scroll_pane)
        {
            this.draw();
        }
        this.m_scroll_pane.visible = true;
    }

    public unload()
    {
        this.m_scroll_pane.visible = false;
    }

    public get group(): Group
    {
        return this.m_scroll_pane;
    }

    private static m_active: Palette;

    public static get active(): Palette
    {
        return this.m_active;
    }

    public static set active(p: Palette)
    {
        this.m_active = p;
        this.m_active.load();
    }
}