import IClass from "./IClass";

export default class Sprite implements IClass
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
                { type: 'reporter', args: ['x'] },
                { type: 'text', args: ['y:'] },
                { type: 'reporter', args: ['y'] }
            ]
        }`, // go to

        `{
            shape: 'STACK',
            category: 'MOTION',
            props:
            [
                { type: 'text', args: ['set'] },
                { type: 'text', args: ['x:'] },
                { type: 'reporter', args: ['x'] },
            ]
        }`, // set x

        `{
            shape: 'STACK',
            category: 'MOTION',
            props:
            [
                { type: 'text', args: ['set'] },
                { type: 'text', args: ['y:'] },
                { type: 'reporter', args: ['y'] },
            ]
        }`, // set y
    ]
}