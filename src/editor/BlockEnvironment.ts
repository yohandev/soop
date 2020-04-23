import Block from "./blocks/Block";
import { Point } from "paper";

export namespace BlockEnvironment
{
    let blocks: Block[]; // floating blocks only, not stacked or nested

    export function init()
    {
        blocks = [];
    }

    export function add(block: Block)
    {
        blocks.push(block);
    }

    export function remove(block: Block)
    {
        blocks.splice(blocks.indexOf(block), 1);
    }

    export function render()
    {
        blocks.forEach(b => b.render());
    }

    export function nearest(a: Block): Block | undefined
    {
        let found = undefined;

        blocks.forEach(b =>
        {
            if (a === b)
            {
                return;
            }
            
            if (a.graphics().bounds.intersects(b.graphics().bounds))
            {
                found = b;
            }
        });

        return found;
    }
}