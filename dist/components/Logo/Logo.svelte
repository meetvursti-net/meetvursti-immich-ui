<script lang="ts">
  import futoDark from '../../assets/immich-logo-futo-dark.svg';
  import futoLight from '../../assets/immich-logo-futo-light.svg';
  import inlineDark from '../../assets/immich-logo-inline-dark.svg';
  import inlineLight from '../../assets/immich-logo-inline-light.svg';
  import stackedDark from '../../assets/immich-logo-stacked-dark.svg';
  import stackedLight from '../../assets/immich-logo-stacked-light.svg';
  import icon from '../../assets/immich-logo.svg';
  import { theme } from '../../services/theme.svelte.js';
  import { Theme, type Size } from '../../types.js';
  import { cleanClass } from '../../utilities/internal.js';
  import { tv } from 'tailwind-variants';

  type Props = {
    size?: Size | 'landing';
    variant?: 'stacked' | 'inline' | 'logo' | 'icon' | 'stacked-futo';
    class?: string;
  };

  const { variant = 'logo', size = 'medium', class: className }: Props = $props();

  const getUrl = (variant: Props['variant']): string => {
    switch (variant) {
      case 'stacked': {
        return theme.value === Theme.Light ? stackedLight : stackedDark;
      }

      case 'inline': {
        return theme.value === Theme.Light ? inlineLight : inlineDark;
      }

      case 'stacked-futo': {
        return theme.value === Theme.Light ? futoLight : futoDark;
      }

      default: {
        return icon;
      }
    }
  };

  const styles = tv({
    variants: {
      size: {
        tiny: 'h-8',
        small: 'h-10',
        medium: 'h-12',
        large: 'h-16',
        giant: 'h-24',
        landing: 'h-64',
      },

      variant: {
        stacked: '',
        inline: '',
        'stacked-futo': '',
        logo: 'bg-light aspect-square rounded-full shadow-lg',
        icon: 'aspect-square',
      },
    },
  });

  const src = $derived(getUrl(variant));
</script>

<img {src} class={cleanClass(styles({ size, variant }), className)} alt="Immich logo" />
