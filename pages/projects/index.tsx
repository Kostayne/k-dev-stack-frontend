import type { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from 'next';
import * as RM from 'react-modifier';
import Head from 'next/head';
import Goto from '../../components/goto';
import StyledTextInput from '../../components/styled-text-input';
import { projReq } from '../../requests/project.req';
import { ProjectModel } from '../../models/project.model';
import { useProjectPageLogic } from '../../hooks/projects_page_logic.hook';
import TaggedItemPreviewsInfiniteList from '../../components/tagged_item_previews_infinite_list';
import { parseArrQuery } from '../../utils/parse_next_arr_query';

export interface ProjectsPageProps {
	projectsCount: number;
	projects: ProjectModel[];
	errorOccured?: boolean;
}

const Projects: NextPage<ProjectsPageProps> = (props) => {
	const { 
		libsInp, nameInp, tagsInp, previewsCount,
		previews, onFilterClick, loadMorePreviews
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
					<TaggedItemPreviewsInfiniteList initialPreviews={previews}
					headMod={RM.createMod('mt-8')} allPreviewsCount={previewsCount}
					loadMore={loadMorePreviews} tagHrefPrefix={'/projects?tags='} />
				)}

				{props.errorOccured && (
					<p className='mt-4'>Не удалось загрузить список проектов.</p>
				)}
			</main>
		</div>
	);
};

export default Projects;

export const getServerSideProps: GetServerSideProps<ProjectsPageProps> = async (ctx) => {
	const tagsQuery = ctx.query.tags;
	const libsQuery = ctx.query.libs;
	const nameQuery = ctx.query.name as string || '';
	const tags = parseArrQuery(tagsQuery);
	const libs = parseArrQuery(libsQuery);

	const projects = await projReq.getByFilter({
		count: 1,
		desc: true,
		offset: 0
	}, tags, libs, nameQuery);

	const errProps = {
		projects: [],
		errorOccured: true,
		projectsCount: 0
	}

	if (!projects) {
		console.error('Error while loading projects list in proj index page');

		return {
			props: errProps
		};
	}

	const projectsCount = await projReq.countAll();
	
	// error throwen
	if (projectsCount < 0) {
		console.error('Error while loading projects count in proj index page');

		return {
			props: errProps
		};
	}

	return {
		props: {
			projects,
			projectsCount
		}
	};
};