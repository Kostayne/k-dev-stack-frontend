import React from 'react';
import * as RM from 'react-modifier';
import { useSyntheticInput } from '../hooks/input_synthetic.hook';
import { LibModel } from '../models/lib.model';
import { libReq } from '../requests/lib.req';
import { inputToNamedLink } from '../utils/input_to_named_link';
import StyledTextInput from './styled-text-input';
import ChipInputList from './chip_input_list';
import { useListInputHook } from '../hooks/list_input.hook';
import TextInputList from './text_input_list';
import nextId from 'react-id-generator';
import { ValueWithUID } from '../interfaces/value_with_uid';
import StyledTextArea from './styled_text_area';

interface EditLibFormProps {
    onCloseClick: () => void;
    headMod?: RM.IModifier;
    lib: LibModel;
}

const EditLibForm = (props: EditLibFormProps) => {
    const lib = props.lib;

    const initialProjects: ValueWithUID[] = lib.projects.map(p => {
        return {
            uid: nextId(),
            value: p.slug
        };
    });

    const initialLinks: ValueWithUID[] = lib.links.map(l => {
        return {
            uid: nextId(),
            value: l.name + ' ' + l.href,
        };
    });

    const initialAlternatives: ValueWithUID[] = lib.alternativeFor.map(a => {
        return {
            uid: nextId(),
            value: a.name
        };
    });

    const initialTags: ValueWithUID[] = lib.tags.map(t => {
        return {
            uid: nextId(),
            value: t
        };
    });

    const headMod = props.headMod || RM.createMod();
    const nameInp = useSyntheticInput(lib.name);
    const weightInp = useSyntheticInput(lib.weight);
    const versionInp = useSyntheticInput(lib.version);
    const issuesInp = useSyntheticInput(lib.issuesCount.toString());
    const downloadsInp = useSyntheticInput(lib.downloadsCount);
    const updatedAtInp = useSyntheticInput(lib.updatedAt);
    const licenseInp = useSyntheticInput(lib.license);
    const descriptionInp = useSyntheticInput(lib.description);
    const readmeInp = useSyntheticInput(lib.readme);
    const projectsInp = useListInputHook(initialProjects);
    const alternativesInp = useListInputHook(initialAlternatives);
    const linksInp = useListInputHook(initialLinks);
    const tagsInp = useListInputHook(initialTags);
    const toolTypeInp = useSyntheticInput(lib.toolType.toString());

    const onEditClick = async () => {
        const issuesCount = parseInt(issuesInp.value);
        const toolType = (toolTypeInp.binding.value);

        if (isNaN(issuesCount)) {
            alert('Issues count must be int!');
            return;
        }

        if (!['framework', 'lib'].includes(toolType)) {
            alert('Tooltype must be framework or lib!');
            return;
        };

        const links = linksInp.binding.value.map(v => {
            return inputToNamedLink(v.value);
        });

        const name = nameInp.binding.value;
        const libSlug = name.replaceAll(' ', '_');

        const tags = tagsInp.value.map(v => v.value);

        const main = {
            name,
            description: descriptionInp.value,
            downloadsCount: downloadsInp.value,
            updatedAt: updatedAtInp.value,
            readme: readmeInp.value,
            tags,
            license: licenseInp.value,
            weight: weightInp.value,
            version: versionInp.value,
            slug: libSlug,
            issuesCount,
            toolType,
            id: props.lib.id
        } as LibModel;

        const projects = projectsInp.value.map(p => {
            return p.value;
        });

        const alternatives = alternativesInp.value.map(a => {
            return a.value;
        });

        try {
            const libRespInfo = await libReq.edit({
                main,
                links,
                alternatives,
                projects
            });

            if (libRespInfo.error) {
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
            <div className='max-w-[1200px] '>
                <h2 className='text-large'>Редактировать библиотеку</h2>

                <div className='flex flex-col md:flex-row gap-[15px] mt-[30px]'>
                    <StyledTextInput label='Название' placeholder='New lib name'
                    autocompleteOptions={[]} {...nameInp.binding} />

                    <StyledTextInput label='Вес' placeholder='235 kb'
                    autocompleteOptions={[]} {...weightInp.binding}
                    inputMod={RM.createMod('max-w-[70px]')} />

                    <StyledTextInput label='Версия' placeholder='1.0.0'
                    autocompleteOptions={[]} {...versionInp.binding}
                    inputMod={RM.createMod('max-w-[100px]')} />

                    <StyledTextInput label='Тип' placeholder='lib'
                    autocompleteOptions={['framework', 'lib']} {...toolTypeInp.binding}
                    inputMod={RM.createMod('max-w-[150px]')} />
                </div>

                <div className='flex flex-col md:flex-row gap-[15px] mt-[13px]'>
                    <StyledTextInput label='Issues' placeholder='15'
                    autocompleteOptions={[]} {...issuesInp.binding}
                    inputMod={RM.createMod('max-w-[100px]')} />

                    <StyledTextInput label='Скачиваний' placeholder='80 м / месяц'
                    autocompleteOptions={[]} {...downloadsInp.binding}
                    inputMod={RM.createMod('max-w-[110px]')} />

                    <StyledTextInput label='Последнее обновление' placeholder='6 месяцев назад'
                    autocompleteOptions={[]} {...updatedAtInp.binding}
                    inputMod={RM.createMod('max-w-[160px]')} />

                    <StyledTextInput label='Лицензия' placeholder='MIT'
                    autocompleteOptions={[]} {...licenseInp.binding}
                    inputMod={RM.createMod('max-w-[110px]')} />
                </div>

                <ChipInputList label='Теги' headMod={RM.createMod('mt-[15px]')}
                {...tagsInp.binding} />

                <StyledTextInput label='Описание' placeholder='Lorem ipsum dolor set amet'
                autocompleteOptions={[]} {...descriptionInp.binding}
                inputMod={RM.createMod('w-full max-w-[590px]')} headMod={RM.createMod('mt-[13px]')} />

                <StyledTextArea label='Readme' placeholder='Lorem ipsum dolor set amet'
                {...readmeInp.binding} inputMod={RM.createMod('w-full max-w-[590px]')} 
                headMod={RM.createMod('mt-[13px]')} />

                <div className='mt-[20px] flex flex-col md:flex-row gap-[25px]'>
                    <TextInputList label="Связанные проекты"
                    headMod={RM.createMod('min-w-[200px]')}
                    {...projectsInp.binding} />

                    <TextInputList label="Альтернативы"
                    {...alternativesInp.binding} />
                </div>

                <TextInputList {...linksInp.binding} label="Ссылки"
                headMod={RM.createMod('mt-[25px]')} placeholder="npm, https://npjs.com" />

                {/* btns */}
                <div className='mt-[25px] flex gap-x-[20px]'>
                    <button className='primary-btn w-[130px]' onClick={onEditClick}>редактировать</button>
                    <button className='text-btn' onClick={props.onCloseClick}>ЗАКРЫТЬ</button>
                </div>
            </div>
        ), headMod)
    );
};

export default EditLibForm;