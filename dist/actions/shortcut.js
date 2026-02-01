export const shortcutLabel = (shortcut) => {
    let label = '';
    if (shortcut.ctrl) {
        label += 'Ctrl ';
    }
    if (shortcut.alt) {
        label += 'Alt ';
    }
    if (shortcut.meta) {
        label += 'Cmd ';
    }
    if (shortcut.shift) {
        label += '⇧';
    }
    label += shortcut.key.toUpperCase();
    return label;
};
/** Determines whether an event should be ignored. The event will be ignored if:
 *  - The element dispatching the event is not the same as the element which the event listener is attached to
 *  - The element dispatching the event is an input field
 */
export const shouldIgnoreEvent = (event) => {
    if (event.target === event.currentTarget) {
        return false;
    }
    const type = event.target.type;
    return ['textarea', 'text', 'date', 'datetime-local', 'email', 'password'].includes(type);
};
export const matchesShortcut = (event, shortcut) => {
    return (shortcut.key.toLowerCase() === event.key.toLowerCase() &&
        Boolean(shortcut.alt) === event.altKey &&
        Boolean(shortcut.ctrl) === event.ctrlKey &&
        Boolean(shortcut.shift) === event.shiftKey &&
        Boolean(shortcut.meta) === event.metaKey);
};
const isMacOS = globalThis.navigator && /Mac(intosh|Intel)/.test(globalThis.navigator.userAgent);
const displayOverrides = {
    ArrowDown: '↓',
    ArrowLeft: '←',
    ArrowRight: '→',
    ArrowUp: '↑',
    Delete: '⌦',
};
export const renderShortcut = ({ alt, meta, ctrl, shift, key }) => {
    const result = [];
    if (alt) {
        result.push(isMacOS ? '⌥' : 'Alt');
    }
    if (meta) {
        result.push(isMacOS ? '⌘' : '❖');
    }
    if (ctrl) {
        result.push('Ctrl');
    }
    if (shift) {
        result.push('⇧');
    }
    result.push(displayOverrides[key] ?? key.toUpperCase());
    return result;
};
/** Bind a single keyboard shortcut to node. */
export const shortcut = (node, option) => {
    const { update: shortcutsUpdate, destroy } = shortcuts(node, [option]);
    return {
        update(newOption) {
            shortcutsUpdate?.([newOption]);
        },
        destroy,
    };
};
/** Binds multiple keyboard shortcuts to node */
export const shortcuts = (node, options) => {
    function onKeydown(event) {
        const ignoreShortcut = shouldIgnoreEvent(event);
        for (const { shortcut, onShortcut, ignoreInputFields = true, preventDefault = true } of options) {
            if (ignoreInputFields && ignoreShortcut) {
                continue;
            }
            if (matchesShortcut(event, shortcut)) {
                if (preventDefault) {
                    event.preventDefault();
                }
                onShortcut(event);
                return;
            }
        }
    }
    node.addEventListener('keydown', onKeydown);
    return {
        update(newOptions) {
            options = newOptions;
        },
        destroy() {
            node.removeEventListener('keydown', onKeydown);
        },
    };
};
