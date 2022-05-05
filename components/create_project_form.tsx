import React from 'react';
import * as RM from 'react-modifier';
import { ProjectModel } from '../models/project.model';
import { projReq } from '../requests/project.req';
import { projectLibReq } from '../requests/project_lib.req';
import { inputToNamedLink } from '../utils/input_to_named_link';
import UncontrolledChipInputList from './uncontrolled_chip_input_list';
import StyledTextInput from './styled-text-input';
import { useSyntheticInput } from '../hooks/input_synthetic.hook';
import { useListInputHook } from '../hooks/list_input.hook';
import nextId from 'react-id-generator';
import StyledTextArea from './styled_text_area';
import TextInputList from './text_input_list';
import { ValueWithUID } from '../interfaces/value_with_uid';
import ChipInputList from './chip_input_list';

interface CreateProjectFormProps {
    headMod?: RM.IModifier;
    initialProject: ProjectModel | null;
    onCloseClick?: () => void;
}

const CreateProjectForm= (props: CreateProjectFormProps) => {
    const headMod = props.headMod || RM.createMod();
    const initProj = props.initialProject;

    const initLinks = initProj?.links.map(l => {
        const val = `${l.name} ${l.href}`;
        return {
            uid: nextId(),
            value: val
        };
    }) || [];

    const initLibs: ValueWithUID[] = initProj?.libs.map(p => {
        return {
            uid: nextId(),
            value: p.slug
        };
    }) || [];

    const nameInp = useSyntheticInput(initProj?.name || '');
    const issuesInp = useSyntheticInput(initProj?.issuesCount.toString() || '');
    const starsInp = useSyntheticInput(initProj?.starsCount.toString() || '');
    const forksInp = useSyntheticInput(initProj?.forksCount.toString() || '');
    const lastUpdateInp = useSyntheticInput(initProj?.lastUpdate || '');
    const licenseInp = useSyntheticInput(initProj?.license || '');
    const descriptionInp = useSyntheticInput(initProj?.description || '');
    const readmeInp = useSyntheticInput(initProj?.readme || '');
    const libsInp = useListInputHook(initLibs);
    const linksInp = useListInputHook(initLinks);
    const tagsInp = useListInputHook([]);

    const onCreateClick = async () => {
        const issuesCount = parseInt(issuesInp.value);
        const starsCount = parseInt(starsInp.value);
        const forksCount = parseInt(forksInp.value);

        if (isNaN(issuesCount)) {
            alert('Issues count must be int!');
            return;
        }

        if (isNaN(starsCount)) {
            alert('Stars count must be int!');
            return;
        }

        if (isNaN(forksCount)) {
            alert('Forks count must me int!');
            return;
        }

        const links = linksInp.value.map(v => {
            return inputToNamedLink(v.value);
        });

        const slug = nameInp.value.replaceAll(' ', '_');
        const tags = tagsInp.value.map(t => {
            return t.value;
        });

        const createData = {
            name: nameInp.value,
            description: descriptionInp.value,
            lastUpdate: lastUpdateInp.value,
            readme: readmeInp.value,
            tags,
            license: licenseInp.value,
            slug,
            issuesCount,
            starsCount,
            forksCount,
        } as ProjectModel;

        const createRespInfo = await projReq.create(createData, links);

        if (createRespInfo.error) {
            alert('Error while create proj');
            return;
        }

        let connectErrThrowen = false;
        for await (const lib of libsInp.value) {
            const connectRespInfo = await projectLibReq.connnectBySlug(lib.value, slug);

            if (connectRespInfo.error) {
                connectErrThrowen = true;
            }
        }

        if (connectErrThrowen) {
            alert('Error while connect libs, check log');
        }

        if (!connectErrThrowen) {
            props.onCloseClick?.call(this);
        }
    };
    
    return (
        RM.modElement((
            <div className='max-w-[700px] '>
                <h2 className='text-large'>Создать проект</h2>

                <div className='flex flex-col md:flex-row gap-[15px] mt-[30px]'>
                    <StyledTextInput label='Название' placeholder='New lib name'
                    autocompleteOptions={[]} {...nameInp.binding} />

                    <StyledTextInput label='Issues' placeholder='15'
                    autocompleteOptions={[]} {...issuesInp.binding}
                    inputMod={RM.createMod('max-w-[100px]')} />

                    <StyledTextInput label='Звезд' placeholder='100'
                    autocompleteOptions={[]} {...starsInp.binding} 
                    inputMod={RM.createMod('max-w-[110px]')} />
                </div>

                <div className='flex flex-col md:flex-row gap-[15px] mt-[13px]'>
                    <StyledTextInput label='Последнее обновление' placeholder='6 месяцев назад'
                    autocompleteOptions={[]} {...lastUpdateInp.binding}
                    inputMod={RM.createMod('max-w-[230px]')} />

                    <StyledTextInput label='Лицензия' placeholder='MIT'
                    autocompleteOptions={[]} {...licenseInp.binding} 
                    inputMod={RM.createMod('max-w-[110px]')} />

                    <StyledTextInput label='Форков' placeholder='0'
                    autocompleteOptions={[]} {...forksInp.binding}
                    inputMod={RM.createMod('max-w-[110px]')} />
                </div>

                <StyledTextArea label='Описание' placeholder='Lorem ipsum dolor set amet'
                {...descriptionInp.binding}
                inputMod={RM.createMod('w-full max-w-[590px]')} headMod={RM.createMod('mt-[13px]')} />

                <StyledTextArea label='Readme' placeholder='Lorem ipsum dolor set amet'
                {...readmeInp.binding}
                inputMod={RM.createMod('w-full max-w-[590px]')} headMod={RM.createMod('mt-[13px]')} />

                <div className='mt-[20px] flex flex-col md:flex-row gap-[25px]'>
                    <TextInputList {...linksInp.binding} label="Ссылки" 
                    placeholder="npm, https://npjs.com" />

                    <TextInputList {...libsInp.binding} label="Либы" />
                </div>

                <ChipInputList label='Теги' headMod={RM.createMod('mt-[15px]')}
                {...tagsInp.binding} />

                {/* btns */}
                <div className='mt-[25px] flex gap-x-[20px]'>
                    <button className='primary-btn w-[80px]' onClick={onCreateClick}>создать</button>
                    <button className='text-btn' onClick={props.onCloseClick}>ЗАКРЫТЬ</button>
                </div>
            </div>
        ), headMod)
    );
};

export default CreateProjectForm;