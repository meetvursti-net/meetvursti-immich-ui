export declare const Markdown: {
    BlockQuote: import("svelte").Component<{
        children: import("svelte").Snippet;
    }, {}, "">;
    Code: import("svelte").Component<{
        code: string;
        multiline?: boolean;
        lang?: string;
    }, {}, "">;
    Heading: import("svelte").Component<{
        id?: string;
        level?: number;
        children: import("svelte").Snippet;
    }, {}, "">;
    LineBreak: import("svelte").Component<{
        class?: string;
    }, {}, "">;
    Link: import("svelte").Component<{
        href: string;
        title?: string;
        children?: import("svelte").Snippet;
    }, {}, "">;
    ListItem: import("svelte").Component<{
        checked?: boolean;
        task?: boolean;
        children: import("svelte").Snippet;
    }, {}, "">;
    List: import("svelte").Component<{
        ordered?: boolean;
        children: import("svelte").Snippet;
    }, {}, "">;
    Paragraph: import("svelte").Component<{
        children: import("svelte").Snippet;
    }, {}, "">;
    Table: import("svelte").Component<{
        children?: import("svelte").Snippet;
    }, {}, "">;
    TableHeader: import("svelte").Component<{
        children?: import("svelte").Snippet;
    }, {}, "">;
    TableHeading: import("svelte").Component<{
        children?: import("svelte").Snippet;
    }, {}, "">;
    TableRow: import("svelte").Component<{
        children: import("svelte").Snippet;
    }, {}, "">;
    TableCell: import("svelte").Component<{
        children?: import("svelte").Snippet;
    }, {}, "">;
    TableBody: import("svelte").Component<{
        children?: import("svelte").Snippet;
    }, {}, "">;
    Text: import("svelte").Component<{
        children: import("svelte").Snippet;
    }, {}, "">;
    Space: import("svelte").Component<{
        children?: import("svelte").Snippet;
    }, {}, "">;
};
