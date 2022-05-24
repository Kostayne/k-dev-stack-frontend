import React from 'react';
import * as RM from 'react-modifier';
import UncontrolledStyledTextInput from './uncontrolled_styled_text_input';
import { useUncontrolledInput } from '../hooks/uncontrolled_input.hook';
import UncontrolledChipInputList from './uncontrolled_chip_input_list';
import UncontrolledTextInputList from './uncontrolled_text_input_list';
import { LibModel } from '../models/lib.model';
import { libReq } from '../requests/lib.req';
import { projectLibReq } from '../requests/project_lib.req';
import { inputToNamedLink } from '../utils/input_to_named_link';
import { useSyntheticInput } from '../hooks/input_synthetic.hook';
import { useListInputHook } from '../hooks/list_input.hook';
import { ValueWithUID } from '../interfaces/value_with_uid';
import nextId from 'react-id-generator';
import StyledTextInput from './styled-text-input';
import ChipInputList from './chip_input_list';
import StyledTextArea from './styled_text_area';
import TextInputList from './text_input_list';

interface CreateLibFormProps {
    headMod?: RM.IModifier;
    initialLib: LibModel | null;
    onCloseClick?: () => void;
}

const CreateLibForm= (props: CreateLibFormProps) => {
    const headMod = props.headMod || RM.createMod();
    const initLib = props.initialLib;

    const initialProjects: ValueWithUID[] = initLib?.projects.map(p => {
        return {
            uid: nextId(),
            value: p.slug
        };
    }) || [];

    const initialLinks: ValueWithUID[] = initLib?.links.map(l => {
        return {
            uid: nextId(),
            value: l.name + ' ' + l.href,
        };
    }) || [];

    const initialAlternatives: ValueWithUID[] = initLib?.alternativeFor.map(a => {
        return {
            uid: nextId(),
            value: a.name
        };
    }) || [];

    const initialTags: ValueWithUID[] = initLib?.tags.map(t => {
        return {
            uid: nextId(),
            value: t
        };
    }) || [];

    const nameInp = useSyntheticInput(initLib?.name || '');
    const weightInp = useSyntheticInput(initLib?.weight || '');
    const versionInp = useSyntheticInput(initLib?.version || '');
    const issuesInp = useSyntheticInput(initLib?.issuesCount.toString() || '');
    const downloadsInp = useSyntheticInput(initLib?.downloadsCount || '');
    const updatedAtInp = useSyntheticInput(initLib?.updatedAt || '');
    const licenseInp = useSyntheticInput(initLib?.license || '');
    const descriptionInp = useSyntheticInput(initLib?.description || '');
    const readmeInp = useSyntheticInput(initLib?.readme || '');
    const projectsInp = useListInputHook(initialProjects || '');
    const alternativesInp = useListInputHook(initialAlternatives || '');
    const linksInp = useListInputHook(initialLinks || '');
    const tagsInp = useListInputHook(initialTags || '');
    const toolTypeInp = useSyntheticInput(initLib?.toolType?.toString() || 'lib');

    const onCreateClick = async () => {
        const issuesCount = parseInt(issuesInp.value);
        const toolType = toolTypeInp.value;

        if (isNaN(issuesCount)) {
            alert('Issues count must be int!');
            return;
        }

        if (!['framework', 'lib'].includes(toolType)) {
            alert('Tooltype must be framework or lib!');
            return;
        };

        const links = linksInp.value.map(v => {
            return inputToNamedLink(v.value);
        });

        const name = nameInp.value;
        const libSlug = name.replaceAll(' ', '_');

        const tags = tagsInp.value.map(v => v.value);

        const createData = {
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
        } as LibModel;

        try {
            const libRespInfo = await libReq.create(createData, links);

            if (libRespInfo.error) {
                alert('Error when creating base lib');
                return;
            }

            const projectSlugs = projectsInp.value;

            for await (const p of projectSlugs) {
                const connectProjRespInfo = await projectLibReq.connnectBySlug(libSlug, p.value);

                if (connectProjRespInfo.error) {
                    alert(`Failed to connect ${p} project`);
                    continue;
                }
            }

            const alternatives = alternativesInp.value;

            for await (const a of alternatives) {
                const connectAltRespInfo = await libReq.connectAlternativeBySlug(libSlug, a.value);

                if (connectAltRespInfo.error) {
                    alert('Failed to connect alternative ' + a);
                    continue;
                }
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
                <h2 className='text-large'>Создать библиотеку</h2>

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
                    <button className='primary-btn w-[80px]' onClick={onCreateClick}>создать</button>
                    <button className='text-btn' onClick={props.onCloseClick}>ЗАКРЫТЬ</button>
                </div>
            </div>
        ), headMod)
    );
};

export default CreateLibForm;