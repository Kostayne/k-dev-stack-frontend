import React from 'react';
import { screen, render, act, fireEvent, waitFor } from '@testing-library/react';
import { useSyntheticInput } from '../hooks/input_synthetic.hook';
import StyledTextInput from './styled-text-input';
import { expect } from '@jest/globals';

describe('styled text input autcomplete', () => {
    interface TestProps {
        label?: string;
        autocompleteOptions?: string[];
    }

    const options = [
        'abc',
        'test value',
        'how it works'
    ];

    const TestComp = (props: TestProps) => {
        const inp = useSyntheticInput('');

        return (
            <StyledTextInput {...inp.binding} label={props.label}
            testId="input" autocompleteOptions={props.autocompleteOptions} />
        );
    };

    it('renders no label, if it was not provided', () => {
        const { container } = render(
            <TestComp />
        );

        const label = screen.queryByTestId('label');
        expect(label).toBe(null);
    });

    it('renders no autocomplete when it\'s feature disabled', () => {
        const { container } = render(
            <TestComp />
        );

        const autocompleteList = screen.queryByTestId('autocomplete-list');
        expect(autocompleteList).toBe(null);
    });

    it('shows autocomplete on focus', () => {
        let container: HTMLElement = null as unknown as HTMLElement;

        act(() => {
            const res = render(
                <TestComp autocompleteOptions={options} />
            );

            container = res.container;
        });

        const input = screen.getByTestId('input');

        act(() => {
            fireEvent.focus(input);
        });

        const autocompleteList = screen.queryByTestId('autocomplete-list');
        expect(autocompleteList).not.toBe(null);
    });

    it('closes autocomplete on escape down', async () => {
        let container: HTMLElement = null as unknown as HTMLElement;

        act(() => {
            const res = render(
                <TestComp autocompleteOptions={options} />
            );

            container = res.container;
        });

        const input = screen.getByTestId('input');

        await act(async () => {
            await fireEvent.focus(input);
        });

        await act(async () => {
            await fireEvent.keyDown(input, {
                key: 'Escape',
                keyCode: 27
            });
        });

        const autocompleteList = screen.queryByTestId('autocomplete-list');
        expect(autocompleteList).toBe(null);
    });

    it('closes autocomplete on focus another input', () => {
        const { container } = render(
            <>
                <TestComp autocompleteOptions={options} />
                <input data-testid="second-input" />
            </>
        );


        const input = screen.getByTestId('input');
        const secondInp = screen.getByTestId('second-input');
        fireEvent.focus(input);

        let autocompleteList: HTMLElement | null = screen.getByTestId('autocomplete-list');
        fireEvent.focus(secondInp, { bubbles: true });

        autocompleteList = screen.queryByTestId('autocomplete-list');
        expect(autocompleteList).toBe(null);
    });

    it('displays all options if input is empty', () => {
        const { container } = render(
            <>
                <TestComp autocompleteOptions={options} />
            </>
        );

        const input = screen.getByTestId('input');
        fireEvent.focus(input);

        // const autocompleteList = screen.getByTestId('autocomplete-list');
        const renderedOptions = screen.getAllByTestId('autocomplete-option');

        expect(renderedOptions).toHaveLength(3);
    });

    it('suggests only correct options', () => {
        const { container } = render(
            <>
                <TestComp autocompleteOptions={options} />
            </>
        );

        const input = screen.getByTestId('input');
        fireEvent.focus(input);

        fireEvent.change(input, {
            target: {
                value: 'ab'
            }
        });

        const renderedOption = screen.getByTestId('autocomplete-option');
        expect(renderedOption.textContent).toBe('abc');
    });

    it('completes text', () => {
        const { container } = render(
            <>
                <TestComp autocompleteOptions={options} />
            </>
        );

        const input = screen.getByTestId('input') as HTMLInputElement;
        fireEvent.focus(input);

        const renderedOption = screen.getAllByTestId('autocomplete-option')[0];
        fireEvent.click(renderedOption, {
            bubbles: true
        });

        expect(input.value).toBe(renderedOption.textContent);
    });
});

export {};