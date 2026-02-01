import { Theme } from '../types.js';
export type ThemeOptions = {
    lightClass?: string;
    darkClass?: string;
    selector?: string;
};
export declare const setThemeOptions: (newOptions: ThemeOptions) => {
    lightClass?: string;
    darkClass?: string;
    selector?: string;
};
type ThemePreference = {
    value: Theme;
};
export declare const theme: ThemePreference;
export declare const onThemeChange: () => void;
export declare const toggleTheme: () => void;
export declare const initializeTheme: (options?: ThemeOptions) => void;
export {};
