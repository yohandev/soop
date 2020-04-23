import BlockBase from "./BlockBase";

export default interface IStackableBlock
{ 
    this_can_go_below(block: IStackableBlock): boolean;
    other_can_put_below(block: IStackableBlock): boolean;

    height(): number;

    next: (IStackableBlock & BlockBase) | undefined;
}