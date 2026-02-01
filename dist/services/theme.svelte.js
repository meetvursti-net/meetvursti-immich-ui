import { browser } from '$app/environment';
import { preference } from './preference.svelte.js';
import { Theme } from '../types.js';
const defaultOptions = {
    darkClass: 'dark',
    selector: 'body',
};
let options = defaultOptions;
export const setThemeOptions = (newOptions) => (options = { ...defaultOptions, ...newOptions });
const defaultTheme = { value: Theme.Dark };
const { state, sync: syncToLocalStorage } = preference({
    key: 'theme',
    defaults: defaultTheme,
    onReadError: (error) => console.log(`Preference read error: ${error}`),
    onWriteError: (error) => console.log(`Preference write error: ${error}`),
});
export const theme = state;
export const onThemeChange = () => {
    syncToDom();
    syncToLocalStorage();
};
const syncToDom = () => {
    const { lightClass, darkClass, selector } = options;
    if (!browser || !selector) {
        return;
    }
    const element = document.querySelector(selector);
    if (!element) {
        return;
    }
    switch (theme.value) {
        case Theme.Dark: {
            if (lightClass) {
                element.classList.remove(lightClass);
            }
            if (darkClass) {
                element.classList.add(darkClass);
            }
            const darkReaderLock = document.createElement('meta');
            darkReaderLock.name = 'darkreader-lock';
            document.head.appendChild(darkReaderLock);
            break;
        }
        case Theme.Light: {
            if (lightClass) {
                element.classList.add(lightClass);
            }
            if (darkClass) {
                element.classList.remove(darkClass);
            }
            const darkReaderLock = document.querySelector('head > meta[name=darkreader-lock]');
            if (darkReaderLock) {
                document.head.removeChild(darkReaderLock);
            }
            break;
        }
    }
};
export const toggleTheme = () => {
    theme.value = theme.value === Theme.Dark ? Theme.Light : Theme.Dark;
    onThemeChange();
};
export const initializeTheme = (options) => {
    if (options) {
        setThemeOptions(options);
    }
    syncToDom();
};
