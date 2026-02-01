import type { Color, Size } from '../../types.js';
import type { Snippet } from 'svelte';
type Props = {
    color?: Color;
    size?: Size;
    icon?: string | false;
    title?: string;
    class?: string;
    duration?: number;
    closable?: boolean;
    controlled?: boolean;
    onClose?: () => void;
    children?: Snippet;
};
declare const Alert: import("svelte").Component<Props, {}, "">;
type Alert = ReturnType<typeof Alert>;
export default Alert;
