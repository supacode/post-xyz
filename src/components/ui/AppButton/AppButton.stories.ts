import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { fn } from 'storybook/test';

import AppButton from './AppButton.vue';

const meta = {
  title: 'Example/AppButton',
  component: AppButton,
  render: (args: any) => ({
    components: { AppButton },
    setup() {
      return { args };
    },
    template: `
      <app-button 
        :title="args.title" 
        :isLoading="args.isLoading" 
        :variant="args.variant" 
        @click="args.onClick"
      >
        {{ args.label }}
      </app-button>
    `,
  }),
  args: {
    label: 'Click me',
    title: 'Click me',
    variant: 'primary',
    isLoading: false,
    onClick: fn(),
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AppButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    isLoading: true,
    label: 'Loading...',
    title: 'Loading',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    label: 'Secondary Button',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    label: 'Danger Button',
  },
};

export const Disabled: Story = {
  args: {
    isLoading: true,
    label: 'Disabled',
  },
};
