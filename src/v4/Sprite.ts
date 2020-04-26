import Class from "./Class";

export default class Sprite extends Class
{
    constructor()
    {
        super("Sprite", undefined);
    }

    public get blocks(): { desc: string, owner: string }[]
    {
        return [
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
    ],
    virtual: true,
    js: ${`(t, obj) =>
    {
        console.log("hellooo");
        // t.write("(");
        // obj.props[0].transpile(t);
        // t.write(" && ");
        // obj.props[2].transpile(t);
        // t.write(")");
    }`}
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

`{
    shape: 'BOOLEAN',
    category: 'OPERATORS',
    props:
    [
        { type: 'boolean', args: ["a"] },{ type: 'text', args: ["and"] },{ type: 'boolean', args: ["b"] }
    ],
    virtual: false
}`, // equals

`{
    shape: 'REPORTER',
    category: 'OPERATORS',
    props:
    [
        { type: 'reporter', args: ["a"] },{ type: 'text', args: ["+"] },{ type: 'reporter', args: ["b"] }
    ],
    virtual: false
}`, // +

`{
    shape: 'REPORTER',
    category: 'OPERATORS',
    props:
    [
        { type: 'reporter', args: ["a"] },{ type: 'text', args: ["-"] },{ type: 'reporter', args: ["b"] }
    ],
    virtual: false
}`, // +
     
`{
    shape: 'REPORTER',
    category: 'VARIABLES',
    props:
    [
        { type: 'text', args: ["health"] }
    ],
    virtual: false
}`, // +

`{
    shape: 'STACK',
    category: 'VARIABLES',
    props:
    [
        { type: 'text', args: ['set'] },
        { type: 'dropdown', args: [() => ["select", "health"]] },
        { type: 'text', args: ['to'] },
        { type: 'reporter', args: ['val'] },
    ]
}`, // set y

        ].map(d => { return {desc: d, owner: this.name} });
    }
}