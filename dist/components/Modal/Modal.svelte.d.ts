import type { ModalSize } from '../../types.js';
import { type Snippet } from 'svelte';
type Props = {
    title?: string;
    icon?: string | boolean;
    size?: ModalSize;
    class?: string;
    expandable?: boolean;
    closeOnEsc?: boolean;
    closeOnBackdropClick?: boolean;
    children: Snippet;
    onClose?: () => void;
    onEscapeKeydown?: (event: KeyboardEvent) => void;
};
declare const Modal: import("svelte").Component<Props, {}, "">;
type Modal = ReturnType<typeof Modal>;
export default Modal;
