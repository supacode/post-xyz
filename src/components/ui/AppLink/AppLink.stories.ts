import type { Meta, StoryObj } from '@storybook/vue3-vite';
import AppLink from './AppLink.vue';
import { RouterLinkStub } from '@vue/test-utils';

const meta = {
  title: 'Example/AppLink',
  component: AppLink,
  render: (args: any) => ({
    components: { AppLink },
    setup() {
      return { args };
    },
    template: `
      <app-link v-bind="args">
        {{ args.label }}
      </app-link>
    `,
  }),
  args: { label: 'Click Me', title: 'Click Me', variant: 'primary' },
  parameters: { vueTestUtils: { stubs: { RouterLink: RouterLinkStub } } },
  tags: ['autodocs'],
} satisfies Meta<typeof AppLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AsExternalLink: Story = { args: { href: 'https://example.com', target: '_blank' } };

export const Secondary: Story = { args: { href: '#', variant: 'secondary' } };

export const Danger: Story = { args: { href: '#', variant: 'danger' } };

export const Ghost: Story = { args: { href: '#', variant: 'ghost' } };
