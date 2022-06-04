import React from "react";
import TagsList from "./tags_list";
import { screen, render } from '@testing-library/react';

describe('tags list', () => {
    it('renders no tags, if they are not provided', () => {
        const { container } = render(
            <TagsList tags={[]} />
        );

        const span = container.querySelector('span');
        expect(span).toBe(null);
    });

    it('renders provided tags', () => {
        render(
            <TagsList tags={["test", "tag"]} />
        );

        screen.getByText('#tag');
        screen.getByText('#test');
    });
});

export {};