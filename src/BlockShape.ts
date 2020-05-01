import BlockDescription from "./BlockDescription";
import { Element, Rect, G } from "@svgdotjs/svg.js"

export namespace BlockShape
{
    export function create(desc: BlockDescription): Element & IBlockShape
    {
        return <Element & IBlockShape> new Element(); // TODO
    }

    export function populate<T>(group: G, n: number | T[]): G
    {
        let count = (n as []).length || n;

        for (let i = 0; i < count; i++)
        {
            group.add(new Empty());
        }

        return group;
    }

    interface IBlockShape { shape: string; }

    export class Empty extends Rect implements IBlockShape { shape: string = 'empty'; /* empty shape */ }
}