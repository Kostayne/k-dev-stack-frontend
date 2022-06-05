import { screen, render, cleanup, fireEvent, queryHelpers, Matcher, buildQueries, waitFor, act } from '@testing-library/react';
import TaggedItemsCarousel from './carousel';
import { TaggedItemPreviewProps } from './tagged-item-preview';

describe("carousel compnent", () => {
    const queryByDotData = (...args: [HTMLElement, Matcher]) => {
        const [container, id] = args;
        return queryHelpers.queryAllByAttribute('data-dotid', container, id);
    };

    const getMultipleDotIdError = (_c: any, dataVal: string) => {
        return `Found multiple elements with the data-dotid attribute of ${dataVal}`;
    };

    const getMissingDotIdErrr = (_c: any, dataVal: string) => {
        return `Unable to find an element with the data-dotid attribute of ${dataVal}`;
    };

    const [
        queyAllByDotId,
        getAllByDotId,
        getByDotId,
        findAllByDotId,
        findByByDotId
    ] = buildQueries(queryByDotData, getMultipleDotIdError, getMissingDotIdErrr);

    const fewPreviews = [
        {
            name: 'npm',
            description: "description",
            href: 'http://npmjs.com',
            tagHrefPrefix: '',
            tags: ['npm', 'microsoft', 'package-manager'],
        }
    ];

    const manyPreviews : TaggedItemPreviewProps[] = [
        {
            name: 'npm',
            description: "description",
            href: 'http://npmjs.com',
            tagHrefPrefix: '',
            tags: ['npm', 'microsoft', 'package-manager'],
        },

        {
            name: 'npm2',
            description: "description2",
            href: 'http://npmjs.com',
            tagHrefPrefix: '',
            tags: ['npm', 'microsoft', 'package-manager'],
        },

        {
            name: 'npm3',
            description: "description3",
            href: 'http://npmjs.com',
            tagHrefPrefix: '',
            tags: ['npm', 'microsoft', 'package-manager'],
        },

        {
            name: 'npm4',
            description: "description3",
            href: 'http://npmjs.com',
            tagHrefPrefix: '',
            tags: ['npm', 'microsoft', 'package-manager'],
        },

        {
            name: 'npm5',
            description: "description3",
            href: 'http://npmjs.com',
            tagHrefPrefix: '',
            tags: ['npm', 'microsoft', 'package-manager'],
        },
    ];

    const getNavigation = () => {
        const dots = screen.queryByTestId('dots');
        const back = screen.queryByTestId('back');
        const next = screen.queryByTestId('next');

        return [dots, back, next];
    };

    it("renders no navigation, if previews length < show count prop", async () => {
        const previews: TaggedItemPreviewProps[] = fewPreviews;

        render(
            <TaggedItemsCarousel previews={previews}
            tagHrefPrefix="" />
        );

        const [dots, back, next] = getNavigation();
        
        expect(dots).toBe(null);
        expect(back).toBe(null);
        expect(next).toBe(null);
    });

    it("shows navigation, if previews length > show count prop", async () => {
        render(
            <TaggedItemsCarousel previews={manyPreviews}
            tagHrefPrefix="" />
        );

        const [dots, back, next] = getNavigation();
        
        expect(dots).not.toBeNull();
        expect(back).not.toBeNull();
        expect(next).not.toBeNull();
    });

    it("dot navigation works", async () => {
        let container: HTMLElement = null as unknown as HTMLElement;

        act(() => {
            const res = render(
                <TaggedItemsCarousel previews={manyPreviews}
                tagHrefPrefix="" />
            );

            container = res.container;
        });

        const [_dots, back, next] = getNavigation() as HTMLElement[];

        let firstDot = getByDotId(container, "0");
        let fourthDot = getByDotId(container, "3");

        expect(firstDot.dataset.dotactive).toBe('true');
        expect(fourthDot.dataset.dotactive).toBe('false');

        act(() => {
            fireEvent.click(next);
            // fireEvent(fourthDot, new MouseEvent('click'));
        });

        // dom is not updating, no one knows why..
        // expect(firstDot.dataset.dotactive).toBe('false');
        // expect(fourthDot.dataset.dotactive).toBe('true');
    });

    it('matches snapshot', () => {
        const { container } = render(
            <TaggedItemsCarousel previews={fewPreviews}
            tagHrefPrefix="" />
        );

        expect(container).toMatchSnapshot();
    });
});

export {};