import React from 'react';
import * as RM from 'react-modifier';
import UncontrolledStyledTextInput from './uncontrolled_styled_text_input';
import { useUncontrolledInput } from '../hooks/uncontrolled_input.hook';
import ChipInputList from './chip_input_list';
import TextInputList from './text_input_list';
import { LibModel } from '../models/lib.model';
import { NamedLinkModel } from '../models/named_link.model';
import { libReq } from '../requests/lib.req';
import { projectLibReq } from '../requests/project_lib.req';
import { inputToNamedLink } from '../utils/input_to_named_link';

interface CreateLibFormProps {
    headMod?: RM.IModifier;

    onCloseClick?: () => void;
}

const CreateLibForm= (props: CreateLibFormProps) => {
    const headMod = props.headMod || RM.createMod();
    const [getNameInp, nameOnChange] = useUncontrolledInput('');
    const [getWeightInp, weightOnChange] = useUncontrolledInput('');
    const [getVersion, versionOnChange] = useUncontrolledInput('');
    const [getIssues, issuesOnChange] = useUncontrolledInput('');
    const [getDownloads, downloadsOnChange] = useUncontrolledInput('');
    const [getLastUpdate, lastUpdateOnChange] = useUncontrolledInput('');
    const [getLicense, licenseOnChange] = useUncontrolledInput('');
    const [getDescription, descriptionOnChange] = useUncontrolledInput('');
    const [getReadme, readmeOnChange] = useUncontrolledInput('');
    const [getProjects, projectsOnChange] = useUncontrolledInput<string[]>([]);
    const [getAlternatives, alternativesOnChange] = useUncontrolledInput<string[]>([]);
    const [getLinks, linksOnChange] = useUncontrolledInput<string[]>([]);
    const [getTags, tagsOnChange] = useUncontrolledInput<string[]>([]);
    const [getToolType, tooltypeChange] = useUncontrolledInput<string>('');

    const onCreateClick = async () => {
        const issuesCount = parseInt(getIssues());
        const toolType = getToolType();

        if (isNaN(issuesCount)) {
            alert('Issues count must be int!');
            return;
        }

        if (!['framework', 'lib'].includes(toolType)) {
            alert('Tooltype must be framework or lib!');
            return;
        };

        const links = getLinks().map(v => {
            return inputToNamedLink(v);
        });

        const libSlug = getNameInp().replaceAll(' ', '_');

        const createData = {
            name: getNameInp(),
            description: getDescription(),
            downloadsCount: getDownloads(),
            lastUpdate: getLastUpdate(),
            readme: getReadme(),
            tags: getTags(),
            license: getLicense(),
            weight: getWeightInp(),
            version: getVersion(),
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

            const projectSlug = getProjects();

            for await (const p of projectSlug) {
                const connectProjRespInfo = await projectLibReq.connnectBySlug(libSlug, p);

                if (connectProjRespInfo.error) {
                    alert(`Failed to connect ${p} project`);
                    continue;
                }
            }

            const alternatives = getAlternatives();

            for await (const a of alternatives) {
                const connectAltRespInfo = await libReq.connectAlternativeBySlug(libSlug, a);

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
                    <UncontrolledStyledTextInput label='Название' placeholder='New lib name'
                    autocompleteOptions={[]} onChange={nameOnChange} />

                    <UncontrolledStyledTextInput label='Вес' placeholder='235 kb'
                    autocompleteOptions={[]} onChange={weightOnChange}
                    inputMod={RM.createMod('max-w-[70px]')} />

                    <UncontrolledStyledTextInput label='Версия' placeholder='1.0.0'
                    autocompleteOptions={[]} onChange={versionOnChange}
                    inputMod={RM.createMod('max-w-[100px]')} />

                    <UncontrolledStyledTextInput label='Тип' placeholder='lib'
                    autocompleteOptions={['framework', 'lib']} onChange={tooltypeChange} 
                    inputMod={RM.createMod('max-w-[150px]')} />
                </div>

                <div className='flex flex-col md:flex-row gap-[15px] mt-[13px]'>
                    <UncontrolledStyledTextInput label='Issues' placeholder='15'
                    autocompleteOptions={[]} onChange={issuesOnChange}
                    inputMod={RM.createMod('max-w-[100px]')} />

                    <UncontrolledStyledTextInput label='Скачиваний' placeholder='80 м / месяц'
                    autocompleteOptions={[]} onChange={downloadsOnChange}
                    inputMod={RM.createMod('max-w-[110px]')} />

                    <UncontrolledStyledTextInput label='Последнее обновление' placeholder='6 месяцев назад'
                    autocompleteOptions={[]} onChange={lastUpdateOnChange}
                    inputMod={RM.createMod('max-w-[160px]')} />

                    <UncontrolledStyledTextInput label='Лицензия' placeholder='MIT'
                    autocompleteOptions={[]} onChange={licenseOnChange}
                    inputMod={RM.createMod('max-w-[110px]')} />
                </div>

                <ChipInputList label='Теги' headMod={RM.createMod('mt-[15px]')}
                onChange={tagsOnChange} />

                <UncontrolledStyledTextInput label='Описание' placeholder='Lorem ipsum dolor set amet'
                autocompleteOptions={[]} onChange={descriptionOnChange}
                inputMod={RM.createMod('w-full max-w-[590px]')} headMod={RM.createMod('mt-[13px]')} />

                <UncontrolledStyledTextInput label='Readme' placeholder='Lorem ipsum dolor set amet'
                autocompleteOptions={[]} onChange={readmeOnChange}
                inputMod={RM.createMod('w-full max-w-[590px]')} headMod={RM.createMod('mt-[13px]')} />

                <div className='mt-[20px] flex flex-col md:flex-row gap-[25px]'>
                    <TextInputList onChange={projectsOnChange} label="Связанные проекты"
                    headMod={RM.createMod('min-w-[200px]')} />

                    <TextInputList onChange={alternativesOnChange} label="Альтернативы" />
                </div>

                <TextInputList onChange={linksOnChange} label="Ссылки"
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