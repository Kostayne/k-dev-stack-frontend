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
}

const Home: NextPage<HomePageProps> = (props) => {
	const { libPreviews, projectPreviews } = useHomePageLogic(props);

	return (
		<div className='page-content'>
			<Head>
				<title>K_DevStack</title>
				<meta name="description" content="Библиотеки, фреймворки, cli утилиты для создания приложений и сайтов, также как и их альтернативы." />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<h1>Главная</h1>
				
				<p className="mt-3">
					На этом сайте можно найти библиотеки, фреймворки, cli утилиты для создания приложений и сайтов, также как и их альтернативы.
					<br /> <br />
					Под каждой библиотекой отображаются мнения пользователей насчет нее и пример кода. Для каждого проекта есть ссылка на исходники, используемый в нем стек.
				</p>

				{/* Libs section */}
				<Goto href='/libs' title='Библиотеки / фреймворки' headMod={RM.createMod('mt-5')} />

				<TaggedItemsList items={libPreviews}
				headMod={RM.createMod('mt-5')} />

				{/* Projects section */}
				<Goto href='/projects' title='Проекты' headMod={RM.createMod('mt-7')} />

				<TaggedItemsList items={projectPreviews}
				headMod={RM.createMod('mt-5')} />
			</main>
		</div>
	);
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
	let libsRes: Response | null = null;
	let libsList: LibModel[] = [];

	let projectsResp: Response | null = null;
	let projectsList: ProjectModel[] = [];

	try {
		libsRes = await libReq.getMany({
			count: 6,
			desc: true,
			offset: 0
		});

		projectsResp = await projReq.getMany({
			count: 6,
			desc: true,
			offset: 0
		})
	} catch(e) {
		console.error('Error while loading projects and libs in main page!');
		console.error(e);
	}

	if (libsRes?.ok) {
		libsList = await libsRes.json() as LibModel[];
	}

	if (projectsResp?.ok) {
		projectsList = await projectsResp.json() as ProjectModel[];
	}

	return {
		props: {
			libsList,
			projectsList
		}
	};
};

export default Home;