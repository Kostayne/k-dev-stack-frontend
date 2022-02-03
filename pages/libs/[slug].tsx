import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import * as RM from 'react-modifier';
import Head from 'next/head';
import Goto from '../../components/goto';
import { LibModel } from '../../models/lib.model';
import NamedLinksList from '../../components/named_links_list';
import TagsList from '../../components/tags_list';
import CreateComment from '../../components/create_comment';

interface LibPageProps {
	lib: LibModel;
}

const Lib: NextPage<LibPageProps> = (props) => {
	const { 
		weight, 
		name, 
		projects, 
		downloads, 
		tags, 
		description, 
		comments, 
		codeExample, 
		alternatives } = props.lib;

	return (
		<div className='page-content'>
			<Head>
				<title>{name}</title>
				<meta name="description" content={description} />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<Goto href='/libs' title={name} isMainHeading={true} headMod={RM.createMod('mt-5')} 
				goBack />
				
				<NamedLinksList links={downloads} 
				headMod={RM.createMod('mt-1')} />

				{/* weight */}
				<p className='mt-2 text-customGray'>{weight}</p>

				{/* description */}
				<p className='mt-3'>{description}</p>

				{/* alternatives */}
				<h2 className='mt-4'>Альтернативы</h2>

				<NamedLinksList links={alternatives} 
				headMod={RM.createMod('mt-1')} />

				{/* projects */}
				<h2 className='mt-4'>Проекты</h2>

				<NamedLinksList links={projects} 
				headMod={RM.createMod('mt-1')} />

				{/* code example */}
				<h2 className='mt-4'>Пример кода</h2>

				<div className='mt-3 h-[250px] w-[100%] bg-[gray]'>

				</div>

				{/* tags */}
				<TagsList tags={tags}
				headMod={RM.createMod('mt-4')} />

				{/* comments */}
				<h2 className='mt-5'>Комментарии</h2>
				<CreateComment headMod={RM.createMod('mt-2 w-[100%]')} />

				
			</main>
		</div>
	);
};

export default Lib;

export const getStaticProps: GetStaticProps<LibPageProps> = () => {
	return {
		props: {
			lib: {
				alternatives: [
					{
						name: 'vue',
						href: 'https://vuejs.com',
					},

					{
						name: 'angular',
						href: 'https://angular.org'
					}
				],
				codeExample: '',
				comments: [],
				description: 'Популярная библиотека с богатой экосистемой для декларативной отрисовки интерфейса, основанной на компонентах.',
				projects: [
					{
						name: 'Test',
						href: '/projects/test'
					},

					{
						name: 'Test 2',
						href: '/projects/test2'
					}
				],
				tags: ['react', 'web', 'reactive', 'fuckthat'],
				downloads: [
					{
						name: 'npm',
						href: 'https://npmjs.com',
					},

					{
						name: 'reactjs.org',
						href: 'https://reactjs.org'
					}
				],

				name: 'React',
				weight: '291 kb',
				slug: 'react'
			}
		}
	}
};

export const getStaticPaths: GetStaticPaths = () => {
	return (
		{
			fallback: 'blocking',
			paths: [
				{
					params: {
						slug: 'react'
					}
				}
			]
		}
	);
};