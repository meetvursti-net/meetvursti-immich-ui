import { goto } from '$app/navigation';
import { env } from '$env/dynamic/public';
import { MenuItemType } from '../types.js';
const getImmichApp = (host) => {
    if (!host || !host.endsWith('immich.app')) {
        return false;
    }
    if (host === 'immich.app' || host.startsWith('pr-')) {
        return 'root';
    }
    return host.split('.')[0];
};
export const navigateTo = async (url) => {
    const resolvedUrl = resolveUrl(url);
    const external = isExternalLink(resolvedUrl);
    if (external) {
        window.open(resolvedUrl, '_blank', 'noreferrer');
    }
    else {
        await goto(resolvedUrl);
    }
};
export const resolveUrl = (url, currentHostname) => {
    if (!isExternalLink(url)) {
        return url;
    }
    try {
        const target = new URL(url);
        const targetApp = getImmichApp(target.hostname);
        const currentApp = getImmichApp(currentHostname ?? globalThis.location?.hostname ?? env.PUBLIC_IMMICH_HOSTNAME);
        return targetApp && targetApp === currentApp ? target.pathname : target.href;
    }
    catch {
        return url;
    }
};
export const isExternalLink = (href) => {
    try {
        const current = new URL(globalThis.location.href);
        const target = new URL(href, current);
        return target.origin !== current.origin;
    }
    catch {
        return false;
    }
};
export const isMenuItemType = (item) => {
    return item === MenuItemType.Divider;
};
export const resolveMetadata = (site, page, article) => {
    const title = page ? `${page.title} | ${site.title}` : site.title;
    const description = page?.description ?? site.description;
    const imageUrl = page?.imageUrl ?? site?.imageUrl;
    const siteName = page ? `${site.title} — ${site.description}` : site.title;
    const type = article ? 'article' : 'website';
    return {
        type,
        siteName,
        title,
        description,
        imageUrl,
        article: article
            ? {
                publishedTime: article.publishedTime.toISO(),
                modifiedTime: article.modifiedTime?.toISO(),
                expirationTime: article.expirationTime?.toISO(),
                authors: article.authors,
                section: article.section,
                tags: article.tags,
            }
            : undefined,
    };
};
export const asText = (...items) => {
    return items
        .filter((item) => item !== undefined && item !== null)
        .map((items) => String(items))
        .join('|')
        .toLowerCase();
};
export const isEnabled = ({ $if }) => {
    if (!$if) {
        return true;
    }
    return !!$if();
};
