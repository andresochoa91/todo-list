import React from 'react';
import { describe, expect, it } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import TodoForm from '../TodoForm';

describe('TodoForm input', () => {
  it('checks input is in document', () => {
    const { getByTestId } = render(<TodoForm onAddTodo={() => {}} />);
    expect(getByTestId('todoTitle')).toBeInTheDocument();
  });

  it('checks that TodoForm button is disabled', () => {
    const { getByTestId } = render(<TodoForm onAddTodo={() => {}} />);
    expect(getByTestId('addTodoButton')).toBeDisabled();
  });

  it('checks that TodoForm button is enabled after typing "enabled"', () => {
    const { getByTestId } = render(<TodoForm onAddTodo={() => {}} />);

    const input = getByTestId('todoTitle');

    fireEvent.change(input, { target: { value: 'enabled' } });

    expect(getByTestId('addTodoButton')).not.toBeDisabled();
  });

  it('checks that TodoForm button is disable after typing "enabled" and deliting what was typed', () => {
    const { getByTestId } = render(<TodoForm onAddTodo={() => {}} />);

    const input = getByTestId('todoTitle');

    fireEvent.change(input, { target: { value: 'enabled' } });

    expect(getByTestId('addTodoButton')).not.toBeDisabled();

    fireEvent.change(input, { target: { value: '' } });

    expect(getByTestId('addTodoButton')).toBeDisabled();
  });

  it('checks that TodoForm button is disable after typing "enabled" hitting button', () => {
    const { getByTestId } = render(<TodoForm onAddTodo={() => {}} />);

    const input = getByTestId('todoTitle');
    const button = getByTestId('addTodoButton');

    fireEvent.change(input, { target: { value: 'enabled' } });

    expect(button).not.toBeDisabled();

    fireEvent.click(button);

    expect(button).toBeDisabled();
  });
});
