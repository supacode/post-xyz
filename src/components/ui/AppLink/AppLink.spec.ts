import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AppLink from './AppLink.vue';
import { RouterLinkStub } from '@vue/test-utils';

describe('AppLink', () => {
  it('renders as a RouterLink when `to` prop is provided', () => {
    const wrapper = mount(AppLink, {
      props: { to: '/home' },
      global: { stubs: { RouterLink: RouterLinkStub } },
    });
    expect(wrapper.findComponent(RouterLinkStub).exists()).toBe(true);
  });

  it('renders as an "a" element when `to` prop is not provided', () => {
    const wrapper = mount(AppLink, { props: { href: 'https://example.com' } });
    expect(wrapper.find('a').exists()).toBe(true);
    expect(wrapper.attributes('href')).toBe('https://example.com');
  });

  it('applies variant classes correctly', () => {
    const wrapper = mount(AppLink, { props: { variant: 'danger' } });
    expect(wrapper.classes()).toContain('bg-red-500');
    expect(wrapper.classes()).toContain('hover:bg-red-600');
  });

  it('renders an icon slot if provided', () => {
    const wrapper = mount(AppLink, { slots: { icon: '<span class="icon-test"></span>' } });
    expect(wrapper.find('.icon-test').exists()).toBe(true);
  });

  it('adds rel="noopener noreferrer" when target is "_blank"', () => {
    const wrapper = mount(AppLink, { props: { href: 'https://example.com', target: '_blank' } });
    expect(wrapper.attributes('rel')).toBe('noopener noreferrer');
  });
});
