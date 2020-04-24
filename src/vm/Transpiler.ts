import { BlockEnvironment } from "../editor/BlockEnvironment";

export default class Transpiler
{
    private scope: number;
    private code: string;

    constructor()
    {
        this.scope = 0;
        this.code = `// generate by soop transpiler`;
    }

    public static Class(name: string)
    {
        let t = new Transpiler();

        t.writeln(`class ${name}`, true);
        t.push_scope();

        BlockEnvironment.blocks.forEach(b =>
        {
            b.transpile(t)
            t.reset_scope(1);
        });

        t.pop_scope();

        console.log(t.code);
    }

    public write(code: string, ignore_no_scope = false): void
    {
        if (this.scope <= 1 && !ignore_no_scope) // any code outside a scope(floating blocks) ignored
        {
            return;
        }

        this.code += code;
    }

    public writeln(code: string, ignore_no_scope = false)
    {
        if (this.scope <= 1 && !ignore_no_scope) // any code outside a scope(floating blocks) ignored
        {
            return;
        }
        
        this.code += '\n' + this.tabs();
        this.code += code;
    }

    public push_scope(): void
    {
        this.code += '\n' + this.tabs() + '{';

        ++this.scope;
    }

    public pop_scope(): void
    {
        if (--this.scope < 0)
        {
            console.error("entered negative scope while transpiling!");
        }
        
        this.code += '\n' + this.tabs() + '}';
    }

    public reset_scope(except: number): void
    {
        while (this.scope > except)
        {
            this.scope--;
            this.code += '\n' + this.tabs() + '}';
        }
    }

    private tabs(): string
    {
        let str = '';

        for (let n = 0; n < this.scope; n++)
        {
            str += '\t';
        }

        return str;
    }
}