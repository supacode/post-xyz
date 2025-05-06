import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';

import AppInput from './AppInput.vue';

const meta = {
  title: 'Example/AppInput',
  component: AppInput,
  render: (args: any) => ({
    components: { AppInput },
    setup() {
      const value = ref(args.modelValue);
      return { args, value };
    },
    template: `
      <app-input
        v-bind="args"
        v-model="value"
      />
    `,
  }),
  args: {
    modelValue: '',
    placeholder: 'Enter text...',
    type: 'text',
    id: 'example-input',
    name: 'example',
    disabled: false,
    required: false,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AppInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithPlaceholder: Story = { args: { placeholder: 'Type your name...' } };

export const PasswordType: Story = { args: { type: 'password', placeholder: 'Enter password' } };

export const Disabled: Story = { args: { modelValue: 'Disabled input', disabled: true } };

export const Required: Story = { args: { required: true, placeholder: 'This field is required' } };
