import { Group, Point } from "paper";
import BlockBase from "./blocks/BlockBase";
import IStackableBlock from "./blocks/IStackableBlock";

export default class Script
{
    public blocks: (IStackableBlock & BlockBase)[];
    public graphics: Group;

    constructor()
    {
        this.blocks = [];
        this.graphics = undefined;
    }

    public push(block: IStackableBlock & BlockBase)
    {
        const peek = this.blocks[this.blocks.length - 1];

        if (peek == undefined || (block.this_can_go_below(peek) && peek.other_can_put_below(block)))
        {
            this.blocks.push(block);
        }
        else
        {
            console.error(`Cannot stack ${block} on ${peek}!`);
        }
    }

    public render(): void
    {
        if (this.graphics)
        {
            this.graphics.remove(); // clear
        }

        this.graphics = new Group(); // create new group

        let h = 0;
        this.blocks.forEach(b =>
        {
           b.render(); // render invidiual block

           b.graphics.translate(new Point(0, h)); // move down
           h += b.height();

           this.graphics.addChild(b.graphics);
        });
    }
}