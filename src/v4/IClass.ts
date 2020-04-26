export default interface IClass
{
    name: string,
    extends: IClass;
    blocks: string[]; // block desc.
}