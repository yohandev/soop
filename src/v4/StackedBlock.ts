import Block from "./Block";
import StackBlock from "../editor/blocks/abstract/StackBlock";

export default abstract class StackBlocked extends Block
{
    private m_next: StackBlock;

    public get next(): StackBlock | undefined
    {
        return this.m_next;
    }
}