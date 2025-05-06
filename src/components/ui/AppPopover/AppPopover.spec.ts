import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import AppPopover from './AppPopover.vue';
import {} from 'process';

describe('AppPopover', () => {
  let wrapper: ReturnType<typeof mount>;

  beforeEach(() => {
    wrapper = mount(AppPopover, {
      slots: { trigger: `<button>abc</button>`, content: '<div>content</div>' },
    });
  });

  it('should initialize with the popover not visible', () => {
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false);
  });

  it('should show the popover when the button is clicked', async () => {
    await wrapper.find('button').trigger('click');

    expect(wrapper.find('[role="dialog"]').exists()).toBe(true);
  });

  it('should hide on escape key press', async () => {
    const event = new KeyboardEvent('keydown', { key: 'Escape' });

    await wrapper.find('button').trigger('click');

    await document.dispatchEvent(event);

    expect(wrapper.find('[role="dialog"]').exists()).toBe(false);
  });

  it('should launch on space key press', async () => {
    const event = new KeyboardEvent('keydown', { key: 'Space' });

    await wrapper.find('button').trigger('click');

    await document.dispatchEvent(event);

    expect(wrapper.find('[role="dialog"]').exists()).toBe(true);
  });

  it('should hide the popover when the button is toggled', async () => {
    await wrapper.find('button').trigger('click');
    await wrapper.find('button').trigger('click');

    expect(wrapper.find('[role="dialog"]').exists()).toBe(false);
  });

  it('should toggle content', async () => {
    await wrapper.find('button').trigger('click');

    expect(wrapper.find('[role="dialog"]').exists()).toBe(true);

    await wrapper.find('button').trigger('click');

    expect(wrapper.find('[role="dialog"]').exists()).toBe(false);
  });
});
