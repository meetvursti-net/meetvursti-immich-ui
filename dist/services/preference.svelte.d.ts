type PreferenceOptions<T> = {
    key: string;
    defaults: T;
    onReadError?: (error: unknown) => void;
    onWriteError?: (error: unknown) => void;
};
export declare const preference: <T>(options: PreferenceOptions<T>) => {
    state: T;
    sync: () => void;
};
export {};
