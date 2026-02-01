import type { ActionItem, MaybePromise, TranslationProps } from '../types.js';
export type CommandPaletteTranslations = TranslationProps<'search_placeholder' | 'search_no_results' | 'search_recently_used' | 'command_palette_prompt_default' | 'command_palette_to_select' | 'command_palette_to_close' | 'command_palette_to_navigate' | 'command_palette_to_show_all' | 'global'>;
export type ActionProvider = {
    name: string;
    onSearch: (query?: string) => MaybePromise<ActionItem[]>;
};
export declare const defaultProvider: ({ name, actions }: {
    name: string;
    actions: ActionItem[];
}) => {
    name: string;
    onSearch: (query?: string) => ActionItem[];
};
declare class CommandPaletteManager {
    #private;
    get isEnabled(): boolean;
    get items(): ({
        title: string;
        description?: string;
        type?: string;
        searchText?: string;
        icon?: import("../types.js").IconLike;
        iconClass?: string;
        color?: import("../types.js").Color;
        onAction: import("../types.js").ActionItemHandler;
        shortcuts?: import("../types.js").MaybeArray<import("../actions/shortcut.js").Shortcut>;
        shortcutOptions?: {
            ignoreInputFields?: boolean;
            preventDefault?: boolean;
        };
    } & import("../types.js").IfLike & {
        id: string;
    })[];
    enable(): void;
    setTranslations(translations?: CommandPaletteTranslations): void;
    queryUpdate(query: string): void;
    open(initialQuery?: string): void;
    loadAllItems(): void;
    addProvider(provider: ActionProvider): () => void;
}
export declare const commandPaletteManager: CommandPaletteManager;
export {};
