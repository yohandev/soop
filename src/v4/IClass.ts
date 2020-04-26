import IBlock from "./IBlock";

export default interface IClass
{
    extends: IClass;
    blocks: IBlock[];
}