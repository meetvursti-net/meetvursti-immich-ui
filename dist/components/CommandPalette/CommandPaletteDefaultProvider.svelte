<script lang="ts">
  import CommandPaletteProvider from './CommandPaletteProvider.svelte';
  import { defaultProvider } from '../../services/command-palette-manager.svelte.js';
  import type { ActionItem } from '../../types.js';

  type Props = {
    name: string;
    actions?: ActionItem[];
  };

  const { name, actions = [] }: Props = $props();
</script>

<CommandPaletteProvider providers={[defaultProvider({ name, actions })]} />
