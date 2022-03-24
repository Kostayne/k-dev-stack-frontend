import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import * as RM from 'react-modifier';
import Head from 'next/head';
import Goto from '../../components/goto';
import { LibModel } from '../../models/lib.model';
import NamedLinksList from '../../components/named_links_list';
import { libReq } from '../../requests/lib.req';
import { transformBackendFullLib } from '../../transform/lib_full.transform';
import TaggedItemsCarousel from '../../components/carousel';
import { useConcreteLibPageLogic } from '../../hooks/concrete_lib_logic.hook';
import Link from 'next/link';
import TagRoundedList from '../../components/tag_rounded_list';
import CodeViewer from '../../components/code_viewer';
import CommentsBlock from '../../components/comments_block';

export interface LibPageProps {
	lib: LibModel;
}

const Lib: NextPage<LibPageProps> = (props) => {
	const {
		alternativePreviews,
		projectPreviews, swiperMod,
		createCommentReq,
		fetchComments
	} = useConcreteLibPageLogic(props);

	const { 
		weight, 
		name, 
		downloads, 
		tags, 
		description, 
		codeExample, 
		codeLang,
		id
	} = props.lib;

	const commentsId = `lib_${props.lib.id}`;

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

				<TagRoundedList tags={tags}
				headMod={RM.createMod('mt-2')}
				hrefPrefix={`/libs?tags=`} />

				<NamedLinksList links={downloads} 
				headMod={RM.createMod('mt-1')} />

				{/* weight */}
				<p className='mt-2 text-customGray'>{weight}</p>

				{/* description */}
				<p className='mt-3'>{description}</p>

				{/* alternatives */}
				<h2 className='mt-4'>Альтернативы</h2>

				{alternativePreviews.length > 0 && (
					<TaggedItemsCarousel previews={alternativePreviews} innerMod={swiperMod} 
					headMod={RM.createMod('mt-2')} tagHrefPrefix={`/libs?tags=`} />
				)}

				{alternativePreviews.length == 0 && (
					<span className='mt-2 block'>
						У данной библиотеки / фреймворка еще нет альтернатив, но если это не так, вы можете <Link href={`/suggest_proj?libId=${id}`}><a className='link'>предложить</a></Link> свой вариант. 
					</span>
				)}

				{/* projects */}
				<h2 className='mt-4'>Проекты</h2>

				{projectPreviews.length > 0 && (
					<TaggedItemsCarousel previews={projectPreviews} innerMod={swiperMod}
					headMod={RM.createMod('mt-2')} tagHrefPrefix={`/libs?tags=`} />	
				)}

				{projectPreviews.length == 0 && (
					<span className='mt-2 block'>
						Знаете крутые open source проекты с использованием данной библиотеки / фреймворка? <Link href={`/suggest_proj?libId=${id}`}><a className='link'>Предложите</a></Link> свой вариант. 
					</span>
				)}

				{/* code example */}
				<h2 className='mt-4'>Пример кода</h2>
				<CodeViewer code={codeExample} codeLang={codeLang} />

				{/* comments */}
				<h2 className='mt-5'>Комментарии</h2>
				<CommentsBlock initialComments={props.lib.comments} 
				headMod={RM.createMod('mt-2')} createCommentReq={createCommentReq}
				commentsUniqueId={commentsId}
				fetchComments={fetchComments} />
			</main>
		</div>
	);
};

export default Lib;

export const getStaticProps: GetStaticProps<LibPageProps> = async (ctx) => {
	const slug = ctx.params?.slug as string;

	try {
		const resp = await libReq.getFullBySlug(slug);
		const libJson = await resp.json();
		const libTransformed = transformBackendFullLib(libJson);

		return {
			props: {
				lib: libTransformed
			}
		}
	} catch(e) {
		console.error(e);

		return {
			props: {
				lib: {
					id: 0,
					alternativeFor: [],
					alternativeBy: [],
					codeExample: '',
					comments: [],
					description: 'Ошибка',
					downloads: [],
					name: 'Ошибка',
					projects: [],
					tags: [],
					weight: '0b',
					slug,
					codeLang: 'text'
				}
			}
		};
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