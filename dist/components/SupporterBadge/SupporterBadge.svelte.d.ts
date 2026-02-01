import type { Size } from '../../types.js';
import type { Snippet } from 'svelte';
type Props = {
    effect?: 'hover' | 'always';
    text?: string;
    size?: Size;
    children?: Snippet;
};
declare const SupporterBadge: import("svelte").Component<Props, {}, "">;
type SupporterBadge = ReturnType<typeof SupporterBadge>;
export default SupporterBadge;
