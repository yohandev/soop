import { ITranspilerTarget } from "./Transpiler";

export default interface IClass extends ITranspilerTarget
{
    name: string,
    extends: IClass;
    blocks: { desc: string, owner: string } []; // block desc & class where it was declared
}