import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import AppButton from './AppButton.vue';

describe('AppButton', () => {
  it('renders button with text', () => {
    const wrapper = mount(AppButton, { slots: { default: 'abc' } });

    expect(wrapper.text()).toBe('abc');
  });

  it('renders button with icon ', () => {
    const wrapper = mount(AppButton, {
      props: { title: 'abc' },
      slots: { icon: '<svg role="img">icon</svg>' },
    });

    expect(wrapper.find(`[role='img']`).exists()).toBe(true);
    expect(wrapper.find(`[aria-label='abc']`).exists()).toBe(true);
  });

  it('renders with an onclick', async () => {
    const fn = vi.fn();
    const wrapper = mount(AppButton, { props: { title: 'abc', onClick: fn } });

    await wrapper.find('button').trigger('click');

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('displays spinner if loading', async () => {
    const wrapper = mount(AppButton, { props: { title: 'abc', isLoading: true } });

    expect(wrapper.find(`[role='img']`).exists()).toBe(true);
  });
});
