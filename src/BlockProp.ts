import { Element } from "@svgdotjs/svg.js";

export default class BlockProp
{
    public static flags(prop: { type: string, args: any[] }): BlockPropFlags
    {
        return new BlockPropFlags(); // TODO
    }

    public static create(prop: { type: string, args: any[] }): Element
    {
        return new Element(); // TODO
    }
}

export class BlockPropFlags
{
    public get input(): boolean
    {
        return true; // TODO
    }
}