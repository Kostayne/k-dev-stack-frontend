import React from 'react';
import nextId from 'react-id-generator';
import * as RM from 'react-modifier';
import { useSyntheticInput } from '../hooks/input_synthetic.hook';
import { useListInputHook } from '../hooks/list_input.hook';
import { ValueWithUID } from '../interfaces/value_with_uid';
import { ProjectModel } from '../models/project.model';
import { projReq } from '../requests/project.req';
import { inputToNamedLink } from '../utils/input_to_named_link';
import ChipInputList from './chip_input_list';
import StyledTextInput from './styled-text-input';
import TextInputList from './text_input_list';

interface EditProjectFormProps {
    headMod?: RM.IModifier;
    project: ProjectModel;
    onCloseClick?: () => void;
}

const EditProjectForm= (props: EditProjectFormProps) => {
    const proj = props.project;

    const initialLibs: ValueWithUID[] = proj.libs.map(p => {
        return {
            uid: nextId(),
            value: p.slug
        };
    });

    const initialLinks: ValueWithUID[] = proj.links.map(l => {
        return {
            uid: nextId(),
            value: l.name + ' ' + l.href,
        };
    });

    const initialTags: ValueWithUID[] = proj.tags.map(t => {
        return {
            uid: nextId(),
            value: t
        };
    });

    const headMod = props.headMod || RM.createMod();
    const nameInp = useSyntheticInput(proj.name);
    const issuesInp = useSyntheticInput(proj.issuesCount.toString());
    const forksInp = useSyntheticInput(proj.forksCount.toString());
    const lastUpdateInp = useSyntheticInput(proj.lastUpdate);
    const licenseInp = useSyntheticInput(proj.license);
    const descriptionInp = useSyntheticInput(proj.description);
    const readmeInp = useSyntheticInput(proj.readme);
    const libsInp = useListInputHook(initialLibs);
    const linksInp = useListInputHook(initialLinks);
    const tagsInp = useListInputHook(initialTags);
    const starsInp = useSyntheticInput(proj.starsCount.toString());

    const onEditClick = async () => {
        const issuesCount = parseInt(issuesInp.value);
        const forksCount = parseInt(forksInp.value);
        const starsCount = parseInt(starsInp.value);

        if (isNaN(issuesCount)) {
            alert('Issues count must be int!');
            return;
        }

        if (isNaN(forksCount)) {
            alert('Forsk count must be int!');
            return;
        }

        if (isNaN(starsCount)) {
            alert('Stars count must be int!');
            return;
        }

        const links = linksInp.binding.value.map(v => {
            return inputToNamedLink(v.value);
        });

        const name = nameInp.binding.value;
        const libSlug = name.replaceAll(' ', '_');
        const tags = tagsInp.value.map(v => v.value);


        const main = {
            name,
            id: props.project.id,
            description: descriptionInp.value,
            lastUpdate: lastUpdateInp.value,
            readme: readmeInp.value,
            tags,
            license: licenseInp.value,
            slug: libSlug,
            issuesCount,
            forksCount,
            starsCount,
        } as ProjectModel;

        const libs = libsInp.value.map(p => {
            return p.value;
        });

        try {
            const respInfo = await projReq.edit({
                main,
                links,
                libs,
            });

            if (respInfo.error) {
                alert('Error!');
                return;
            }

            alert('Done');
        } catch(e) {
            console.error(e);
            alert('Error');
        }
    };

    return (
        RM.modElement((
            <div className='max-w-[700px] '>
                <h2 className='text-large'>Редактировать проект</h2>

                <div className='flex flex-col md:flex-row gap-[15px] mt-[30px]'>
                    <StyledTextInput label='Название' placeholder='New lib name'
                    autocompleteOptions={[]} {...nameInp.binding} />

                    <StyledTextInput label='Issues' placeholder='0'
                    autocompleteOptions={[]} {...issuesInp.binding}
                    inputMod={RM.createMod('max-w-[70px]')} />

                    <StyledTextInput label='Звезд' placeholder='100'
                    autocompleteOptions={[]} {...starsInp.binding}
                    inputMod={RM.createMod('max-w-[100px]')} />
                </div>

                <div className='flex flex-col md:flex-row gap-[15px] mt-[13px]'>
                    <StyledTextInput label='Последнее обновление' placeholder='6 месяцев назад'
                    autocompleteOptions={[]} {...lastUpdateInp.binding}
                    inputMod={RM.createMod('max-w-[160px]')} />

                    <StyledTextInput label='Лицензия' placeholder='MIT'
                    autocompleteOptions={[]} {...licenseInp.binding}
                    inputMod={RM.createMod('max-w-[110px]')} />

                    <StyledTextInput label='Форков' placeholder='0'
                    autocompleteOptions={[]} {...forksInp.binding}
                    inputMod={RM.createMod('max-w-[110px]')} />
                </div>

                <StyledTextInput label='Описание' placeholder='Lorem ipsum dolor set amet'
                autocompleteOptions={[]} {...descriptionInp.binding}
                inputMod={RM.createMod('w-full max-w-[590px]')} headMod={RM.createMod('mt-[13px]')} />

                <StyledTextInput label='Readme' placeholder='Lorem ipsum dolor set amet'
                autocompleteOptions={[]} {...readmeInp.binding}
                inputMod={RM.createMod('w-full max-w-[590px]')} headMod={RM.createMod('mt-[13px]')} />

                <div className='mt-[20px] flex flex-col md:flex-row gap-[25px]'>
                    <TextInputList {...linksInp.binding} label="Ссылки"
                    placeholder="npm, https://npjs.com" />

                    <TextInputList label="Либы"
                    {...libsInp.binding} />
                </div>

                <ChipInputList label='Теги' headMod={RM.createMod('mt-[15px]')}
                {...tagsInp.binding} />

                {/* btns */}
                <div className='mt-[25px] flex gap-x-[20px]'>
                    <button className='primary-btn w-[130px]' onClick={onEditClick}>редактировать</button>
                    <button className='text-btn' onClick={props.onCloseClick}>ЗАКРЫТЬ</button>
                </div>
            </div>
        ), headMod)
    );
};

export default EditProjectForm;