import type { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from 'next';
import * as RM from 'react-modifier';
import Head from 'next/head';
import Goto from '../../components/goto';
import { projReq } from '../../requests/project.req';
import { ProjectModel } from '../../models/project.model';
import { useProjectPageLogic } from '../../hooks/projects_page_logic.hook';
import { parseArrQuery } from '../../utils/parse_next_arr_query';
import ProjectsWithFilterPreviewsList from '../../components/projects_with_filter_previews_list';

export interface ProjectsPageProps {
	projectsCount: number;
	projects: ProjectModel[];
	errorOccured?: boolean;
}

const Projects: NextPage<ProjectsPageProps> = (props) => {
	const {
		previews,
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
				<ProjectsWithFilterPreviewsList headMod={RM.createMod('mt-6')}
				allPreviewsCount={props.projectsCount} initialPreviews={previews} />

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