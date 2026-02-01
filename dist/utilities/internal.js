import { asText } from './common.js';
import { twMerge } from 'tailwind-merge';
export const cleanClass = (...classNames) => {
    return twMerge(classNames
        .filter((className) => {
        if (!className || typeof className === 'boolean') {
            return false;
        }
        return typeof className === 'string';
    })
        .join(' '));
};
export const withPrefix = (key) => `immich-ui-${key}`;
let _count = 0;
export const generateId = () => `ui-id-${_count++}`;
export const isIconLike = (icon) => {
    return typeof icon === 'string' || !!(icon && typeof icon === 'object' && 'path' in icon);
};
export const resolveIcon = ({ icons, color, override, fallback, }) => {
    if (override) {
        return override;
    }
    if (override === false) {
        return;
    }
    return icons[color] ?? fallback;
};
export const asArray = (items) => (Array.isArray(items) ? items : items ? [items] : []);
export const getSearchString = ({ title, description, type, searchText }) => searchText ?? asText(title, description, type);
