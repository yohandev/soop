import IClass from "./IClass";

export default class SpriteClass implements IClass
{
    public readonly extends: IClass = undefined;

    public readonly blocks: string[] =
    [
        /* MOTION */
        `{
            shape: 'STACK',
            category: 'MOTION',
            props:
            [
                { type: 'text', args: ['go to'] },
                { type: 'text', args: ['x:'] },
                { type: 'reporter' },
                { type: 'text', args: ['y:'] },
                { type: 'reporter' }
            ]
        }`, // go to

        `{
            shape: 'STACK',
            category: 'MOTION',
            props:
            [
                { type: 'text', args: ['set'] },
                { type: 'text', args: ['x:'] },
                { type: 'reporter' },
            ]
        }` // set x
    ]
}