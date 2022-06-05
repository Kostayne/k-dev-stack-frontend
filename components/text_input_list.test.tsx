import { screen, render, fireEvent, act } from '@testing-library/react';
import { useState } from 'react';
import { ValueWithUID } from '../interfaces/value_with_uid';
import TextInputList from './text_input_list';

interface propsInterface {
    cb?: (v: ValueWithUID<string>[]) => void
}

const TestComp = (props: propsInterface) => {
    const [val, setVal] = useState<ValueWithUID<string>[]>([]);

    const onCh = (v: ValueWithUID<string>[]) => {
        if (props.cb) {
            props.cb(v);
        }

        setVal(v);
    };

    return (
        <TextInputList value={val}
        onChange={onCh} label="test" />
    );
};

describe('text input list', () => {
    it('adds text input on create click', () => {
        let container: HTMLElement = null as unknown as HTMLElement;

        act(() => {
            container = render(
                <TestComp />
            ).container;
        });

        const createBtn = screen.getByTestId('create');

        act(() => {
            fireEvent.click(createBtn);
        });

        screen.getByTestId('input-0');
        
        act(() => {
            fireEvent.click(createBtn);
        });

        screen.getByTestId('input-1');
    });

    it('gives right output', () => {
        let container: HTMLElement = null as unknown as HTMLElement;

        const onCh = jest.fn();

        act(() => {
            container = render(
                <TestComp cb={onCh} />
            ).container;
        });

        const createBtn = screen.getByTestId('create');

        act(() => {
            fireEvent.click(createBtn);
        });

        act(() => {
            fireEvent.click(createBtn);
        });

        const inp = screen.getByTestId('input-0');
        const inp2 = screen.getByTestId('input-1');

        act(() => {
            fireEvent.change(inp, {
                target: {
                    value: "testValue"
                }
            });
        });

        act(() => {
            fireEvent.change(inp2, {
                target: {
                    value: "testValue2"
                }
            });
        });

        expect(onCh.mock.calls[3][0]).toEqual([
            { value: 'testValue', uid: 'id3' },
            { value: 'testValue2', uid: 'id4' }
        ]);
    });
});

export {};