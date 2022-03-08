import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import * as RM from 'react-modifier';
import Head from 'next/head';
import Goto from '../../components/goto';
import StyledTextInput from '../../components/styled-text-input';
import { projReq } from '../../requests/project.req';
import { ProjectModel } from '../../models/project.model';
import { useProjectPageLogic } from '../../hooks/projects_page_logic.hook';

export interface ProjectsPageProps {
	projects: ProjectModel[];
	errorOccured?: boolean;
}

const Projects: NextPage<ProjectsPageProps> = (props) => {
	const { 
		libsInp, nameInp, tagsInp,
		getProjectPreviewsToR, onFilterClick
	} = useProjectPageLogic(props);

	return (
		<div className='page-content'>
			<Head>
				<title>Проекты</title>
				<meta name="description" content="Список проектов с фильтром по имени и используемым библиотекам." />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<Goto href='/' title='Проекты' isMainHeading={true} headMod={RM.createMod('')} 
				goBack />

				{/* filter */}
				<div className='mt-6'>
					<div className='blue-splitter' />

					{/* centered content */}
					<div className={['w-fit mx-auto mt-5 flex flex-col gap-4',
					'md:flex-row md:mx-0 md:items-end'].join(' ')}>
						{/* inputs */}
						<div className={['flex flex-col gap-2',
						'md:flex-row md:gap-3'].join(' ')}>
							<StyledTextInput {...nameInp.binding} label='Имя' 
							placeholder='linux' />

							<StyledTextInput {...libsInp.binding} label='Библиотеки' 
							placeholder='react, angular' />

							<StyledTextInput {...tagsInp.binding} label='Теги' 
							placeholder='tag1, tag2' />
						</div>

						<button className={['primary-btn w-[110px] mx-auto',
						'md:mb-[2px]'].join(' ')}
						onClick={onFilterClick}>применить</button>
					</div>

					<div className='blue-splitter mt-5' />
				</div>

				{!props.errorOccured && (
					<div className='mt-8 previews-list'>
						{getProjectPreviewsToR()}
					</div>
				)}

				{props.errorOccured && (
					<p className='mt-4'>Не удалось загрузить список проектов.</p>
				)}
			</main>
		</div>
	);
};

export default Projects;

export const getStaticProps: GetStaticProps<ProjectsPageProps> = async () => {
	try {
		const projResp = await projReq.getMany({
			count: 25,
			desc: true,
			offset: 0
		});

		const projects = await projResp.json() as ProjectModel[];

		return {
			props: {
				projects
			}
		};
	} catch(e) {
		console.error('Error while loading projects list in proj index page');
		console.error(e);
	}

	return {
		props: {
			projects: [],
			errorOccured: true
		}
	};
};