import { browser } from '$app/environment';
const asKey = (key) => `immich-ui-${key}`;
const readPreference = (key, defaults) => {
    if (!browser || !window?.localStorage) {
        throw new Error('Local storage is not available');
    }
    const text = window.localStorage.getItem(asKey(key));
    const stored = text ? JSON.parse(text) : {};
    return { ...defaults, ...stored };
};
const writePreference = (key, value) => {
    if (!browser || !window.localStorage) {
        throw new Error('Local storage is not available');
    }
    const text = JSON.stringify(value);
    window.localStorage.setItem(asKey(key), text);
};
export const preference = (options) => {
    const { key, defaults, onReadError, onWriteError } = options;
    let initialValue = defaults;
    try {
        initialValue = readPreference(key, defaults);
    }
    catch (error) {
        onReadError?.(error);
    }
    const state = $state(initialValue);
    const sync = () => {
        try {
            writePreference(key, state);
        }
        catch (error) {
            onWriteError?.(error);
        }
    };
    return { state, sync };
};
