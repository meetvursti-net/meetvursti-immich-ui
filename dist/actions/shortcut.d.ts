import type { ActionReturn } from 'svelte/action';
export type Shortcut = {
    key: string;
    alt?: boolean;
    ctrl?: boolean;
    shift?: boolean;
    meta?: boolean;
};
export type ShortcutOptions<T = HTMLElement> = {
    shortcut: Shortcut;
    /** If true, the event handler will not execute if the event comes from an input field */
    ignoreInputFields?: boolean;
    onShortcut: (event: KeyboardEvent & {
        currentTarget: T;
    }) => unknown;
    preventDefault?: boolean;
};
export declare const shortcutLabel: (shortcut: Shortcut) => string;
/** Determines whether an event should be ignored. The event will be ignored if:
 *  - The element dispatching the event is not the same as the element which the event listener is attached to
 *  - The element dispatching the event is an input field
 */
export declare const shouldIgnoreEvent: (event: KeyboardEvent | ClipboardEvent) => boolean;
export declare const matchesShortcut: (event: KeyboardEvent, shortcut: Shortcut) => boolean;
export declare const renderShortcut: ({ alt, meta, ctrl, shift, key }: Shortcut) => string[];
/** Bind a single keyboard shortcut to node. */
export declare const shortcut: <T extends HTMLElement>(node: T, option: ShortcutOptions<T>) => ActionReturn<ShortcutOptions<T>>;
/** Binds multiple keyboard shortcuts to node */
export declare const shortcuts: <T extends HTMLElement>(node: T, options: ShortcutOptions<T>[]) => ActionReturn<ShortcutOptions<T>[]>;
