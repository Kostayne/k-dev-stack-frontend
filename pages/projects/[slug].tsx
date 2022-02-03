import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import * as RM from 'react-modifier';
import Head from 'next/head';
import Goto from '../../components/goto';
import { ProjectModel } from '../../models/project.model';
import NamedLinksList from '../../components/named_links_list';
import CreateComment from '../../components/create_comment';

interface ProjectPageProps {
	project: ProjectModel;
}

const Project: NextPage<ProjectPageProps> = (props) => {
	const { comments, description, name, sources, libs } = props.project;

	return (
		<div className='page-content'>
			<Head>
				<title>{name}</title>
				<meta name="description" content={description} />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<Goto href='/projects/' title={name} isMainHeading={true} headMod={RM.createMod('mt-5')} 
				goBack />

				{/* description */}
				<p className='mt-3'>{description}</p>

				{/* stack (libs) */}
				<h2 className='mt-4'>Стек</h2>

				<NamedLinksList links={libs} 
				headMod={RM.createMod('mt-1')} />

				{/* sources */}
				<h2 className='mt-4'>Исходники</h2>

				<NamedLinksList links={sources} 
				headMod={RM.createMod('mt-1')} />

				{/* comments */}
				<h2 className='mt-5'>Комментарии</h2>
				<CreateComment headMod={RM.createMod('mt-2 w-[100%]')} />
			</main>
		</div>
	);
};

export default Project;

export const getStaticProps: GetStaticProps<ProjectPageProps> = () => {
	return {
		props: {
			project: {
				name: 'Open delivery service',
				description: 'Популярная библиотека с богатой экосистемой для декларативной отрисовки интерфейса, основанной на компонентах.',
				comments: [],
				slug: 'test',

				libs: [
					{
						name: 'react',
						href: '/libs/react',
					},

					{
						name: 'react query',
						href: '/libs/react_query',
					}
				],

				sources: [
					{
						name: 'github',
						href: 'https://github.com',
					}
				],
			}
		}
	};
};

export const getStaticPaths: GetStaticPaths = () => {
	return {
		paths: [
			{
				params: {
					slug: 'test'
				}
			}
		],

		fallback: 'blocking'
	};
};