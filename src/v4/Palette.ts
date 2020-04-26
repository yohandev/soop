import { Group, Path, Point, Size } from "paper";

export default class Palette
{
    private m_group: Group;

    

    private static m_active: Palette;

    public static get active(): Palette
    {
        return this.m_active;
    }

    public static set active(p: Palette)
    {
        this.m_active = p;
    }
}