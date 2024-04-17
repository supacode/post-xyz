import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AppInput from '../AppInput.vue';

describe('AppInput', () => {
  it('renders with default properties', () => {
    const wrapper = mount(AppInput);
    const input = wrapper.find('input');
    expect(input.exists()).toBe(true);
    expect(input.attributes('type')).toBe('text');
  });

  it('renders with custom props', () => {
    const wrapper = mount(AppInput, {
      props: {
        modelValue: 'Hello World',
        id: 'test-input',
        type: 'email',
        placeholder: 'Enter your email',
        name: 'abc',
        disabled: true,
        required: true,
      },
    });
    const input = wrapper.find('input');
    expect(input.element.value).toBe('Hello World');
    expect(input.attributes('id')).toBe('test-input');
    expect(input.attributes('type')).toBe('email');
    expect(input.attributes('placeholder')).toBe('Enter your email');
    expect(input.attributes()).toHaveProperty('disabled');
    expect(input.attributes()).toHaveProperty('required');
    expect(input.attributes('name')).toBe('abc');
  });

  it('emits update:modelValue event on input', async () => {
    const wrapper = mount(AppInput);
    const input = wrapper.find('input');
    await input.setValue('New value');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    const emitted = wrapper.emitted('update:modelValue');
    expect(emitted).toBeTruthy();
    expect(emitted![0]).toEqual(['New value']);
  });

  it('does not emit update:modelValue when disabled', async () => {
    const wrapper = mount(AppInput, {
      props: {
        disabled: true,
      },
    });
    const input = wrapper.find('input');
    await input.setValue('New value');
    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });
});
