export default class BlockDescription
{
    public readonly shape: string;
    public readonly category: string;

    public readonly props: { type: string, args: any[] }[];

    constructor(serialized: string)
    {
        const parsed = eval(`(${serialized})`);

        this.shape = parsed.shape || 'STACK'; // default
        this.category = parsed.category || 'MOTION'; // default
        this.props = parsed.props || [{ type: 'TEXT', args: ['label'] }]; // default
    }

    public get fill(): string
    {
        return '';
    }

    public get stroke(): string
    {
        return '';
    }
}