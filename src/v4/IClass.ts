export default interface IClass
{
    name: string,
    extends: IClass;
    blocks: { desc: string, owner: string } []; // block desc & class where it was declared
}