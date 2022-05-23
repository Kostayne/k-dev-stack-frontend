import type { GetStaticProps, NextPage } from 'next';
import * as RM from 'react-modifier';
import Head from 'next/head';
import Goto from '../components/goto';
import { LibModel } from '../models/lib.model';
import { libReq } from '../requests/lib.req';
import TaggedItemsList from '../components/tagged_items_list';
import { ProjectModel } from '../models/project.model';
import { projReq } from '../requests/project.req';
import { useHomePageLogic } from '../hooks/home_page_logic.hook';

export interface HomePageProps {
	libsList: LibModel[];
	projectsList: ProjectModel[];
	errorOccured?: boolean;
}

const Home: NextPage<HomePageProps> = (props) => {
	const { libPreviews, projectPreviews } = useHomePageLogic(props);

	return (
		<div className='page-content'>
			<Head>
				<title>K_DevStack</title>
				<meta name="description" content="Подобрать стек для проекта. Поиск библиотек и связанных с ними опен сурс проектов." />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<h1>Главная</h1>
				<p className="mt-3">
					Здесь можно подобрать стек, найти библиотеки и проекты с открытым исходныи кодом.
				</p>

				{/* Libs section */}
				<Goto href='/libs' title='Библиотеки / фреймворки' headMod={RM.createMod('mt-5')} />

				{!props.errorOccured && (
					<TaggedItemsList items={libPreviews}
					headMod={RM.createMod('mt-5')} 
					tagHrefPrefix={`/libs?tags=`} />
				)}
				
				{props.errorOccured && (
					<p className='mt-1'>Не удалось загрузить список библиотек.</p>
				)}

				{libPreviews.length == 0 && (
					<p className='mt-1'>Пока здесь пусто.</p>
				)}

				{/* Projects section */}
				<Goto href='/projects' title='Проекты' headMod={RM.createMod('mt-7')} />

				{!props.errorOccured && (
					<TaggedItemsList items={projectPreviews}
					headMod={RM.createMod('mt-5')}
					tagHrefPrefix={`/projects?tags=`} />
				)}

				{projectPreviews.length == 0 && (
					<p className='mt-1'>Пока здесь пусто.</p>
				)}

				{props.errorOccured && (
					<p className='mt-1'>Не удалось загрузить список проектов.</p>
				)}
			</main>
		</div>
	);
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
	const [libsList, libsLoadErr] = await libReq.getMany({
		count: 6,
		desc: true,
		offset: 0
	});

	const [projectsList, projectsLoadErr] = await projReq.getMany({
		count: 6,
		desc: true,
		offset: 0
	});

	const errorOccured = Boolean(libsLoadErr || projectsLoadErr);

	return {
		props: {
			libsList,
			projectsList,
			errorOccured
		}
	};
};

export default Home;