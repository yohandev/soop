import Block from "../Block";

export default interface IGhostBlock<T extends Block>
{
    //value(set?: T): T | undefined;
    
    ghost_join(block: T): void;
    ghost_remove(block: T): void;
}