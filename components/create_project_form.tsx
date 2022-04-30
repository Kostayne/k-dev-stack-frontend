import React from 'react';
import * as RM from 'react-modifier';
import { useUncontrolledInput } from '../hooks/uncontrolled_input.hook';
import { ProjectModel } from '../models/project.model';
import { projReq } from '../requests/project.req';
import { projectLibReq } from '../requests/project_lib.req';
import { inputToNamedLink } from '../utils/input_to_named_link';
import UncontrolledChipInputList from './uncontrolled_chip_input_list';
import UncontrolledTextInputList from './uncontrolled_text_input_list';
import UncontrolledStyledTextInput from './uncontrolled_styled_text_input';

interface CreateProjectFormProps {
    headMod?: RM.IModifier;
    onCloseClick?: () => void;
}

const CreateProjectForm= (props: CreateProjectFormProps) => {
    const headMod = props.headMod || RM.createMod();

    const [getNameInp, nameOnChange] = useUncontrolledInput('');
    const [getIssues, issuesOnChange] = useUncontrolledInput('');
    const [getStars, starsOnChange] = useUncontrolledInput('');
    const [getForks, forksOnChange] = useUncontrolledInput('');
    const [getLastUpdate, lastUpdateOnChange] = useUncontrolledInput('');
    const [getLicense, licenseOnChange] = useUncontrolledInput('');
    const [getDescription, descriptionOnChange] = useUncontrolledInput('');
    const [getReadme, readmeOnChange] = useUncontrolledInput('');
    const [getLibs, libsOnChange] = useUncontrolledInput<string[]>([]);
    const [getLinks, linksOnChange] = useUncontrolledInput<string[]>([]);
    const [getTags, tagsOnChange] = useUncontrolledInput<string[]>([]);

    const onCreateClick = async () => {
        const issuesCount = parseInt(getIssues());
        const starsCount = parseInt(getStars());
        const forksCount = parseInt(getForks());

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

        const links = getLinks().map(v => {
            return inputToNamedLink(v);
        });

        const slug = getNameInp().replaceAll(' ', '_');

        const createData = {
            name: getNameInp(),
            description: getDescription(),
            lastUpdate: getLastUpdate(),
            readme: getReadme(),
            tags: getTags(),
            license: getLicense(),
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
        for await (const lib of getLibs()) {
            const connectRespInfo = await projectLibReq.connnectBySlug(lib, slug);

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
                    <UncontrolledStyledTextInput label='Название' placeholder='New lib name'
                    autocompleteOptions={[]} onChange={nameOnChange} />

                    <UncontrolledStyledTextInput label='Issues' placeholder='15'
                    autocompleteOptions={[]} onChange={issuesOnChange}
                    inputMod={RM.createMod('max-w-[100px]')} />

                    <UncontrolledStyledTextInput label='Звезд' placeholder='100'
                    autocompleteOptions={[]} onChange={starsOnChange}
                    inputMod={RM.createMod('max-w-[110px]')} />
                </div>

                <div className='flex flex-col md:flex-row gap-[15px] mt-[13px]'>
                    <UncontrolledStyledTextInput label='Последнее обновление' placeholder='6 месяцев назад'
                    autocompleteOptions={[]} onChange={lastUpdateOnChange}
                    inputMod={RM.createMod('max-w-[230px]')} />

                    <UncontrolledStyledTextInput label='Лицензия' placeholder='MIT'
                    autocompleteOptions={[]} onChange={licenseOnChange}
                    inputMod={RM.createMod('max-w-[110px]')} />

                    <UncontrolledStyledTextInput label='Форков' placeholder='0'
                    autocompleteOptions={[]} onChange={forksOnChange}
                    inputMod={RM.createMod('max-w-[110px]')} />
                </div>

                <UncontrolledStyledTextInput label='Описание' placeholder='Lorem ipsum dolor set amet'
                autocompleteOptions={[]} onChange={descriptionOnChange}
                inputMod={RM.createMod('w-full max-w-[590px]')} headMod={RM.createMod('mt-[13px]')} />

                <UncontrolledStyledTextInput label='Readme' placeholder='Lorem ipsum dolor set amet'
                autocompleteOptions={[]} onChange={readmeOnChange}
                inputMod={RM.createMod('w-full max-w-[590px]')} headMod={RM.createMod('mt-[13px]')} />

                <div className='mt-[20px] flex flex-col md:flex-row gap-[25px]'>
                    <UncontrolledTextInputList onChange={linksOnChange} label="Ссылки" 
                    placeholder="npm, https://npjs.com" />

                    <UncontrolledTextInputList onChange={libsOnChange} label="Либы" />
                </div>

                <UncontrolledChipInputList label='Теги' headMod={RM.createMod('mt-[15px]')}
                onChange={tagsOnChange} />

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