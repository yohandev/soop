import Block from "../Block";

export default abstract class GhostBlock<T extends Block> extends Block
{  
    public abstract ghost_join(block: T): void;
    public abstract ghost_separate(block: T): void;

    public separate(): boolean
    {
        return false; // use ghost_separate
    }

    public can_join(to: Block): boolean
    {
        return false; // use ghost_join
    }

    public join(to: Block): boolean
    {
        return false; // use ghost_join
    }

    protected draggable(): boolean 
    {
        return false; // ghost not draggable
    }
}