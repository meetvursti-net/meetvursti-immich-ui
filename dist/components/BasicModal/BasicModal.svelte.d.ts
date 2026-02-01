import type { Color, ModalSize } from '../../types.js';
import type { Snippet } from 'svelte';
type Props = {
    title: string;
    icon?: string | boolean;
    closeText?: string;
    closeColor?: Color;
    size?: ModalSize;
    onClose: () => void;
    children: Snippet;
};
declare const BasicModal: import("svelte").Component<Props, {}, "">;
type BasicModal = ReturnType<typeof BasicModal>;
export default BasicModal;
