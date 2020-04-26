export interface ITranspilerTarget
{
    transpile(t: Transpiler): void;
}

export default class Transpiler
{
    private m_current_class: string | undefined;
    private m_current_method: string | undefined;
    private m_scope: number;

    private m_code: string;

    constructor()
    {
        this.m_current_class = undefined;
        this.m_current_method = undefined;
        this.m_scope = 0;

        this.m_code = "";
    }

    public write(val: string)
    {
        if (!this.m_current_method)
        {
            return; // ignore loose blocks
        }
        this.m_code += this.indent + val;
    }

    public writeln(val: string)
    {
        this.write('\n' + val);
    }

    public push_class(c: string, ex: string | undefined)
    {
        if (this.m_current_class)
        {
            this.pop_class();
        }
        this.m_current_class = c;
        this.m_code += `class ${c} extends ${ex || 'Object'}\n`;
        this.push_scope();
    }

    public pop_class()
    {
        this.m_current_class = undefined;
        this.close_scope(0);
    }

    public push_method(m: string, args: string[])
    {
        if (!this.m_current_class)
        {
            return; // somehow? method outside of class
        }
        if (this.m_current_method)
        {
            this.pop_method();
        }
        this.m_current_method = m;
        this.m_code += this.indent + `${m}(${args.join(',')})\n`;
        this.push_scope();
    }

    public pop_method()
    {
        if (!this.m_current_method)
        {
            return;
        }
        this.m_current_method = undefined;
        this.close_scope(1);
    }

    public push_scope()
    {
        this.m_code += this.indent + '{';
        this.m_scope++;
    }

    public pop_scope()
    {
        this.m_scope--;
        this.m_code += this.indent + '}';
    }

    private close_scope(excp: number)
    {
        while (this.m_scope > excp)
        {
            this.pop_scope();
        }
    }

    private get indent(): string
    {
        let str = '';

        for (let i = 0; i < this.m_scope; i++)
        {
            str += '\t';            
        }
        return str;
    }
}