import { type Size } from '../../types.js';
type Props = {
    size?: Size | 'landing';
    variant?: 'stacked' | 'inline' | 'logo' | 'icon' | 'stacked-futo';
    class?: string;
};
declare const Logo: import("svelte").Component<Props, {}, "">;
type Logo = ReturnType<typeof Logo>;
export default Logo;
