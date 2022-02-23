import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import * as RM from 'react-modifier';
import Head from 'next/head';
import Goto from '../../components/goto';
import { LibModel } from '../../models/lib.model';
import NamedLinksList from '../../components/named_links_list';
import TagsList from '../../components/tags_list';
import CreateComment from '../../components/create_comment';
import { libReq } from '../../requests/lib.req';
import { transformBackendLib } from '../../transform/lib_full.transform';

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
		alternativeFor: alternatives 
	} = props.lib;

	return (
		<div className='page-content'>
			<Head>
				<title>{name}</title>
				<meta name="description" content={description} />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<Goto href='/libs' title={name} isMainHeading={true} headMod={RM.createMod('')} 
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

				<div className='mt-3 h-[250px] w-[100%] bg-[gray]'></div>

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

export const getStaticProps: GetStaticProps<LibPageProps> = async (ctx) => {
	const slug = ctx.params?.slug as string;
	const resp = await libReq.getFull(slug);
	const lib = await resp.json();

	return {
		props: {
			lib: transformBackendLib(lib)
		}
	}
};

export const getStaticPaths: GetStaticPaths = async () => {
	let libs: LibModel[] = [];

	try {
		const resp = await libReq.getMany({
			count: 5000,
			desc: true,
			offset: 0
		});
	
		libs = await resp.json() as LibModel[];
	}

	catch(e) {
		console.log('Error in loading lib paths');
		console.error(e);
	}

	return (
		{
			fallback: 'blocking',
			paths: libs.map(l => {
				return {
					params: {
						slug: l.slug
					}
				};
			})
		}
	);
};