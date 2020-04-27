import BlockDescription from "./BlockDescription";

export default class Block
{
    public readonly desc: BlockDescription;
    public readonly inputs: Block[];

    constructor(desc: BlockDescription)
    {
        this.desc = desc;
        this.inputs = [];
    }
}