import { Group, Point } from "paper";
import BlockBase from "./blocks/BlockBase";
import IStackableBlock from "./blocks/IStackableBlock";

export default class Script
{
    public head: (IStackableBlock & BlockBase) | undefined;
    public graphics: Group;

    private tail: (IStackableBlock & BlockBase) | undefined;

    constructor()
    {
        this.head = undefined;
        this.graphics = undefined;
    }

    public push(block: IStackableBlock & BlockBase)
    {
        if (this.tail == null)
        {
            this.head = this.tail = block;

            return;
        }

        const peek = this.tail;

        if (peek == undefined || (block.this_can_go_below(peek) && peek.other_can_put_below(block)))
        {
            peek.next = block;
            this.tail = block;
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
        let c = this.head;

        while (c != undefined)
        {
           c.render(); // render invidiual block

           c.graphics.translate(new Point(0, h)); // move down
           h += c.height();

           this.graphics.addChild(c.graphics);

           c = c.next;
        }
    }
}