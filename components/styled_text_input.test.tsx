import { screen, render } from '@testing-library/react';
import { useSyntheticInput } from '../hooks/input_synthetic.hook';
import StyledTextInput from './styled-text-input';
import { expect } from '@jest/globals';

describe('styled text input autcomplete', () => {
    interface TestProps {
        label?: string;
    }

    const TestComp = (props: TestProps) => {
        const inp = useSyntheticInput('');

        return (
            <StyledTextInput {...inp.binding} label={props.label} />
        );
    };

    it('renders no label, if it was not provided', () => {
        const { container } = render(
            <TestComp />
        );

        const label = screen.getByTestId('label');
        expect(label).toBe(null);
    });

    it('renders no autocomplete when it\'s feature disabled', () => {
        const { container } = render(
            <TestComp />
        );
    });
});

export {};