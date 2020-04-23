import Block from "../../editor/blocks/Block";

export default abstract class BlockGraphics
{
    private block: Block;

    public abstract draw(): void;
}