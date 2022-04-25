import { useEffect, useRef, useState } from "react";
import { StyledTextInputProps } from "../components/styled-text-input";

export function useStyledTextInputLogic(props: StyledTextInputProps) {
    const allAutocompleteOptions = props.autocompleteOptions || [];
    const [showAutoComplete, setShowAutoComplete] = useState(false);
    const [autocompleteOptions, setAutocompleteOptions] = useState<string[]>([]);
    const [selectedOption, setSelectedOption] = useState(allAutocompleteOptions[0] || '');
    const inputWrapperRef = useRef<HTMLInputElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // don't create listeners when there is no
        // autocomplete options
        if (!props.autocompleteOptions) {
            return;
        }

        if (props.autocompleteOptions.length == 0) {
            return;
        }

        // hide autocomplete when change focus
        const focusHandler = (e: FocusEvent) => {
            if (e.target == inputRef.current) {
                return;
            }

            setShowAutoComplete(false);
        }

        // hide autocomplete when click outside
        const clickHandler = (e: MouseEvent) => {
            const tg = e.target as HTMLElement;

            if (!tg) {
                return;
            }

            // clicked on component
            if (inputWrapperRef.current?.contains(tg) || tg == inputWrapperRef.current) {
                return;
            }

            setShowAutoComplete(false);
        };

        window.addEventListener('focus', focusHandler);
        window.addEventListener('click', clickHandler);

        // unsubscribe all events when component unmounts
        return () => {
            window.removeEventListener('focus', focusHandler);
            window.removeEventListener('click', clickHandler);
        };
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVal = e.currentTarget.value;
        let newOptions = allAutocompleteOptions;

        // fixes autocomplete after option select
        setShowAutoComplete(true);

        if (newVal != '') {
            const filteredOptions = allAutocompleteOptions.filter(o => {
                return o.includes(newVal);
            });

            newOptions = filteredOptions;
        }

        setAutocompleteOptions(newOptions);
        props.onChange(newVal);
    };

    const handleSelectedOption = (v: string) => {
        props.onChange(v);
        setShowAutoComplete(false);
    };

    const onFocus = () => {
        setShowAutoComplete(true);
        setAutocompleteOptions(allAutocompleteOptions);
        props.onFocus?.call(null);
    };

    const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        props.onBlur?.call(null, e);
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
        // no need to process this event
        // if no autocomplete options
        if (autocompleteOptions.length == 0) {
            return;
        }

        // process enter key
        if (e.key == 'Enter') {
            props.onChange(selectedOption);
            setShowAutoComplete(false);
            return;
        }

        // process arrows keys
        const curIndex = autocompleteOptions.findIndex((v) => v == selectedOption);
        let wantedIndex = curIndex;

        if (e.key == 'ArrowUp') {
            wantedIndex -= 1;
        }

        if (e.key == 'ArrowDown') {
            wantedIndex += 1;
        }

        if (wantedIndex >= autocompleteOptions.length) {
            setSelectedOption(autocompleteOptions[0]);
            return;
        }

        if (wantedIndex < 0) {
            setSelectedOption(autocompleteOptions.at(-1) as string);
            return;
        }

        setSelectedOption(autocompleteOptions[wantedIndex]);
    };

    return {
        onFocus,
        onKeyDown,
        onBlur,
        handleSelectedOption,
        handleChange,
        showAutoComplete,
        autocompleteOptions,
        selectedOption,
        inputWrapperRef,
        inputRef
    };
}