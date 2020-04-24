import Block from "../Block";
import TextBlock from "../abstract/TextBlock";

export default class GhostBlock<T extends Block> extends Block
{
    private slot: T;
    private value: T | undefined;

    constructor(type: (new () => T))
    {
        super();

        this.slot = new type();
        
        this.slot.add_child(new TextBlock("      "));

        this.add_child(this.slot);
    }

    // public render(): void
    // {
    //     if (!this.value)
    //     {
    //         (this.slot as any).render(); // dirty accesiblity bypass

    //         this.slot.graphics().fillColor = this.fill(); // hijack color
    //         this.slot.graphics().strokeColor = this.stroke();
    //     }
    //     else
    //     {
    //         (this.value as any).render();
    //     }
    // }

    protected draw(): void
    {
        (this.slot as any).render();
    }

    public fill(): string
    {
        return this.parent.stroke();
    }

    public stroke(): string
    {
        return this.parent.fill();
    }

    public draggable(): boolean
    {
        return false;
    }

    public ghost_join(block: T): boolean
    {
        if (this.value)
        {
            return false;
        }
        this.value = block;

        this.slot.graphics().remove();
        this.top().render(); 
    }

    public ghost_separate(): void
    {
        this.value.graphics().remove();
        this.value = undefined;

        this.top().render(); 
    }

    public graphics(): paper.Item
    {
        return this.value ? this.value.graphics() : this.slot.graphics();
    }

    public width(): number
    {
        return this.value ? this.value.width() : this.slot.width();
    }

    public height(): number
    {
        return this.value ? this.value.height() : this.slot.height();
    }

    protected expand(w: number, h: number): void
    {
        if (this.value)
        {
            (this.value as any).expand(w, h);
        }
        else
        {
            (this.slot as any).expand(w, h);
        }
    }

    public separate(): boolean
    {
        return false; // ghoest blocks don't separate
    }

    public can_join(to: Block): boolean
    {
        return false; // ghost blocks don't join
    }

    public join(to: Block): boolean
    {
        return false; // ghost blocks don't join
    }
}