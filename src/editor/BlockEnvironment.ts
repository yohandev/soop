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
        let found: Block | undefined = undefined;

        blocks.forEach(b => // iterate each loose block
        {
            b.iterate(b2 =>
            {
                if (found !== undefined) // iterates from top to bottom, top block priority
                {
                    return;
                }

                if (a === b2) // don't connect to yourself(duh)
                {
                    return;
                }

                if (!a.can_join(b2)) // ignore incompatible
                {
                    return;
                }

                if (Math.abs(a.graphics().bounds.left - b2.graphics().bounds.left) >= 90) // connect from below, not left/right
                {
                    return;
                }

                if (a.graphics().bounds.intersects(b2.graphics().bounds)) // actually intersects
                {
                    found = b2;
                }
            });
        });

        return found;
    }
}