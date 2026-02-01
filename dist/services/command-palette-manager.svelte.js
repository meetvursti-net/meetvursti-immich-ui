import { matchesShortcut, shortcuts, shouldIgnoreEvent } from '../actions/shortcut.js';
import CommandPaletteModal from '../internal/CommandPaletteModal.svelte';
import { modalManager } from './modal-manager.svelte.js';
import { isEnabled } from '../utilities/common.js';
import { asArray, generateId, getSearchString } from '../utilities/internal.js';
export const defaultProvider = ({ name, actions }) => ({
    name,
    onSearch: (query) => query ? actions.filter((action) => getSearchString(action).includes(query.toLowerCase())) : actions,
});
class CommandPaletteManager {
    #translations = {};
    #providers = [];
    #isEnabled = false;
    #isOpen = false;
    #items = $state([]);
    get isEnabled() {
        return this.#isEnabled;
    }
    get items() {
        return this.#items;
    }
    enable() {
        if (this.#isEnabled) {
            return;
        }
        this.#isEnabled = true;
        if (globalThis.window && document.body) {
            shortcuts(document.body, [
                { shortcut: { key: 'k', meta: true }, onShortcut: () => this.open() },
                { shortcut: { key: 'k', ctrl: true }, onShortcut: () => this.open() },
                { shortcut: { key: '/' }, preventDefault: true, onShortcut: () => this.open() },
            ]);
            document.body.addEventListener('keydown', (event) => this.#handleKeydown(event));
        }
    }
    setTranslations(translations = {}) {
        this.#translations = translations;
    }
    async #onSearch(query) {
        const newItems = await Promise.all(this.#providers.map((provider) => Promise.resolve(provider.onSearch(query))));
        this.#items = newItems
            .flat()
            .filter((item) => isEnabled(item))
            .map((item) => ({ ...item, id: generateId() }));
    }
    queryUpdate(query) {
        if (!query) {
            this.#items = [];
            return;
        }
        void this.#onSearch(query);
    }
    async #handleKeydown(event) {
        const actions = await Promise.all(this.#providers.map((provider) => Promise.resolve(provider.onSearch())));
        for (const action of actions.flat()) {
            if (!asArray(action.shortcuts).some((shortcut) => matchesShortcut(event, shortcut))) {
                continue;
            }
            if (!isEnabled(action)) {
                continue;
            }
            const { ignoreInputFields = true, preventDefault = true } = action.shortcutOptions || {};
            if (ignoreInputFields && shouldIgnoreEvent(event)) {
                continue;
            }
            if (preventDefault) {
                event.preventDefault();
            }
            action?.onAction(action);
        }
    }
    async #onClose(action) {
        await action?.onAction(action);
        this.#isOpen = false;
        this.#items = [];
    }
    open(initialQuery) {
        if (this.#isOpen) {
            return;
        }
        const { onClose } = modalManager.open(CommandPaletteModal, {
            translations: this.#translations,
            initialQuery,
        });
        this.#isOpen = true;
        void onClose.then((action) => this.#onClose(action));
    }
    loadAllItems() {
        void this.#onSearch();
    }
    addProvider(provider) {
        this.#providers.push(provider);
        return () => this.#removeProvider(provider);
    }
    #removeProvider(provider) {
        this.#providers = this.#providers.filter((actionProvider) => actionProvider !== provider);
    }
}
export const commandPaletteManager = new CommandPaletteManager();
