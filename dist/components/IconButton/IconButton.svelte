<script lang="ts">
  import Icon from '../Icon/Icon.svelte';
  import Button from '../../internal/Button.svelte';
  import type { IconButtonProps } from '../../types.js';

  const {
    icon,
    flipped,
    flopped,
    title,
    'aria-label': ariaLabel,
    color = 'primary',
    ...buttonProps
  }: IconButtonProps = $props();

  const buttonTitle = $derived(title ?? ariaLabel);
</script>

<Button icon {color} {...buttonProps} title={buttonTitle} aria-label={ariaLabel}>
  <Icon {icon} {flipped} {flopped} size="60%" aria-hidden />
</Button>
