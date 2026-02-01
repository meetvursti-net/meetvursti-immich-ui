import type { Color, Shape, Size } from '../../types.js';
import type { Snippet } from 'svelte';
type Props = {
    progress: number;
    size?: Size;
    shape?: Shape;
    color?: Color;
    border?: boolean;
    class?: string;
    children?: Snippet;
};
declare const ProgressBar: import("svelte").Component<Props, {}, "">;
type ProgressBar = ReturnType<typeof ProgressBar>;
export default ProgressBar;
