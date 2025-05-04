import React from 'react';
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import TodoForm from '../TodoForm';

describe('TodoForm input using userEvent', () => {
  it('contains a `main` html element', () => {
    render(<TodoForm onAddTodo={() => {}} />);
    expect(screen.getByTestId('todoTitle')).toBeInTheDocument();
  });

  it('checks that TodoForm button is disabled', () => {
    render(<TodoForm onAddTodo={() => {}} />);
    expect(screen.getByTestId('addTodoButton')).toBeDisabled();
  });

  it('checks that TodoForm button is enabled after typing "enabled"', async () => {
    function setup(jsx) {
      return {
        user: userEvent.setup(),
        ...render(jsx),
      };
    }

    const { user } = setup(<TodoForm onAddTodo={() => {}} />);

    const input = screen.getByTestId('todoTitle');
    const button = screen.getByTestId('addTodoButton');

    await user.type(input, 'enabled');

    expect(button).not.toBeDisabled();
  });

  it('checks that TodoForm button is disabled after typing "enabled" and deleting what was typed', async () => {
    function setup(jsx) {
      return {
        user: userEvent.setup(),
        ...render(jsx),
      };
    }

    const { user } = setup(<TodoForm onAddTodo={() => {}} />);

    const input = screen.getByTestId('todoTitle');
    const button = screen.getByTestId('addTodoButton');

    await user.type(input, 'enabled');

    expect(button).not.toBeDisabled();
    expect(input).toHaveValue('enabled');

    await user.clear(input);

    expect(button).toBeDisabled();
  });

  it('checks that TodoForm button is disabled after typing "enabled" hitting button', async () => {
    function setup(jsx) {
      return {
        user: userEvent.setup(),
        ...render(jsx),
      };
    }

    const { getByTestId } = render(<TodoForm onAddTodo={() => {}} />);

    const input = getByTestId('todoTitle');
    const button = getByTestId('addTodoButton');

    const { user } = setup(<TodoForm onAddTodo={() => {}} />);

    await user.type(input, 'enabled');

    expect(button).not.toBeDisabled();

    await user.click(button);

    expect(button).toBeDisabled();
  });
});

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
