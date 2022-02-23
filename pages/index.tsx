import type { GetStaticProps, NextPage } from 'next';
import * as RM from 'react-modifier';
import Head from 'next/head';
import Goto from '../components/goto';
import TaggedItemPreview from '../components/tagged-item-preview';
import { LibModel } from '../models/lib.model';
import { libReq } from '../requests/lib.req';
import LibsList from '../components/libs_list';

interface HomePageProps {
	libsList: LibModel[];
}

const Home: NextPage<HomePageProps> = (props) => {
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

				<LibsList libs={props.libsList}
				headMod={RM.createMod('mt-5')} />

				{/* Projects section */}
				<Goto href='/projects' title='Проекты' headMod={RM.createMod('mt-7')} />

				<div className="previews-list mt-5">
					<TaggedItemPreview name="K React CM" 
					description="Простая cli утилита для создания компонентов с помощью своих шаблонов. Поддерживает файлы с любыми расширениями, есть возможность автоматического создания стилей основанных на и..." 
					tags={['утилита', 'react']} href="/projects/test" />

					<TaggedItemPreview name="K React CM" 
					description="Простая cli утилита для создания компонентов с помощью своих шаблонов. Поддерживает файлы с любыми расширениями, есть возможность автоматического создания стилей основанных на и..." 
					tags={['утилита', 'react']} href="/projects/test" />

					<TaggedItemPreview name="K React CM" 
					description="Простая cli утилита для создания компонентов с помощью своих шаблонов. Поддерживает файлы с любыми расширениями, есть возможность автоматического создания стилей основанных на и..." 
					tags={['утилита', 'react']} href="/projects/test" />
				</div>
			</main>
		</div>
	);
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
	let libsRes: Response | null = null;
	let libsList: LibModel[] = [];

	try {
		libsRes = await libReq.getMany({
			count: 15,
			desc: true,
			offset: 0
		});
	} catch(e) {
		console.error(e);
	}

	if (libsRes?.ok) {
		libsList = await libsRes.json() as LibModel[];
	}

	return {
		props: {
			libsList
		}
	};
};

export default Home;