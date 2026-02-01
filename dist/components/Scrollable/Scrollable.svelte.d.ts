import type { Snippet } from 'svelte';
type Props = {
    class?: string;
    children?: Snippet;
    transition?: TransitionEvent;
    ref?: HTMLDivElement;
    resetOnNavigate?: boolean;
};
declare const Scrollable: import("svelte").Component<Props, {}, "ref">;
type Scrollable = ReturnType<typeof Scrollable>;
export default Scrollable;
