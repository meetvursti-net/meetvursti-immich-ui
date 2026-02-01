<script lang="ts">
  import ToastContainer from './ToastContainer.svelte';
  import ToastContent from './ToastContent.svelte';
  import type { ToastProps } from '../../types.js';

  let { children, title, description, icon, onClose, ...props }: ToastProps = $props();
</script>

<ToastContainer {...props}>
  {#if children}
    {@render children()}
  {:else if title}
    <ToastContent {title} {description} {icon} {onClose} {...props} />
  {/if}
</ToastContainer>
