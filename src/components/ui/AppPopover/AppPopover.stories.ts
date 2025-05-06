import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';

import AppPopover from './AppPopover.vue';

const meta = {
  title: 'Example/AppPopover',
  component: AppPopover,
  render: (args: any) => ({
    components: { AppPopover },
    setup() {
      const isOpen = ref(args.modelValue);
      return { args, isOpen };
    },
    template: `
      <div class="relative p-5">
        <app-popover v-model="isOpen">
          <template #trigger>
            <button class="px-4 py-2 bg-blue-500 text-white rounded">Open Popover</button>
          </template>

          <template #content>
            <div class="text-sm text-gray-700">
              This is the popover content.
            </div>
          </template>
        </app-popover>
      </div>
    `,
  }),
  args: { modelValue: false },
  tags: ['autodocs'],
} satisfies Meta<typeof AppPopover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InitiallyOpen: Story = { args: { modelValue: true } };
