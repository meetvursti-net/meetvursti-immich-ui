import type { Snippet } from 'svelte';
import type { HTMLAnchorAttributes } from 'svelte/elements';
type Props = {
    class?: string;
    children?: Snippet;
    href: string;
    underline?: boolean;
} & HTMLAnchorAttributes;
declare const Link: import("svelte").Component<Props, {}, "">;
type Link = ReturnType<typeof Link>;
export default Link;
