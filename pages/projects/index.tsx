import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import * as RM from 'react-modifier';
import Head from 'next/head';
import Goto from '../../components/goto';
import TaggedItemPreview from '../../components/tagged-item-preview';
import StyledTextInput from '../../components/styled-text-input';
import { useSyntheticInput } from '../../hooks/input_synthetic';

interface ProjectsPageProps {

}

const Projects: NextPage<ProjectsPageProps> = (props) => {
	const nameInp = useSyntheticInput();
	const libsInp = useSyntheticInput();

	return (
		<div className='page-content'>
			<Head>
				<title>Проекты</title>
				<meta name="description" content="Список проектов с фильтром по имени и используемым библиотекам." />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<Goto href='/' title='Проекты' isMainHeading={true} headMod={RM.createMod('mt-5')} 
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
							placeholder='react' />

							<StyledTextInput {...libsInp.binding} label='Библиотеки' 
							placeholder='tag1, tag2' />
						</div>

						<button className={['primary-btn w-[110px] mx-auto',
						'md:mb-[2px]'].join(' ')}>применить</button>
					</div>

					<div className='blue-splitter mt-5' />
				</div>

				<div className='mt-8 previews-list'>
					<TaggedItemPreview name="K React CM" 
					description="Простая cli утилита для создания компонентов с помощью своих шаблонов. Поддерживает файлы с любыми расширениями, есть возможность автоматического создания стилей основанных на и..." 
					tags={['утилита', 'react']} href="/projects/test" />

					<TaggedItemPreview name="K React CM" 
					description="Простая cli утилита для создания компонентов с помощью своих шаблонов. Поддерживает файлы с любыми расширениями, есть возможность автоматического создания стилей основанных на и..." 
					tags={['утилита', 'react']} href="/projects/test" />

					<TaggedItemPreview name="K React CM" 
					description="Простая cli утилита для создания компонентов с помощью своих шаблонов. Поддерживает файлы с любыми расширениями, есть возможность автоматического создания стилей основанных на и..." 
					tags={['утилита', 'react']} href="/projects/test" />

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

export default Projects;

// export const getStaticProps: GetStaticProps<ProjectsPageProps> = () => {
// 	return {
// 		props: {

// 		}
// 	};
// };

// export const getStaticPaths: GetStaticPaths = () => {
// 	return {
// 		paths: [
// 			{
// 				params: {

// 				}
// 			}
// 		],

// 		fallback: 'blocking'
// 	};
// };