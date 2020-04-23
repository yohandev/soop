import { Group, Item } from "paper";
import BlockBase from "../BlockBase";

export type BlockFieldType = 'text' | 'icon' | 'block' | 'reporter' | 'boolean';

export default abstract class BlockField
{
    public type: BlockFieldType;
    public graphics: Item;

    public owner: BlockBase;

    protected constructor(type: BlockFieldType)
    {
        this.type = type;
    }

    public abstract create_graphics(): void;
}