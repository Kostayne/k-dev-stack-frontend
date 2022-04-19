import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import * as RM from 'react-modifier';
import Head from 'next/head';
import Goto from '../../components/goto';
import { LibModel } from '../../models/lib.model';
import { libReq } from '../../requests/lib.req';
import { transformBackendFullLib } from '../../transform/lib_full.transform';
import TaggedItemsCarousel from '../../components/carousel';
import { useConcreteLibPageLogic } from '../../hooks/concrete_lib_logic.hook';
import Link from 'next/link';
import TagRoundedList from '../../components/tag_rounded_list';
// import CodeViewer from '../../components/code_viewer';
import CommentsBlock from '../../components/comments_block';
import LibInfo from '../../components/lib_info';
import { ToolType } from '../../enums/tool_type.enum';
import { libInfoLinksPlaceholder } from '../../placeholders/lib.placeholder';
import ReactMarkdown from 'react-markdown';

export interface LibPageProps {
	lib: LibModel;
}

const Lib: NextPage<LibPageProps> = (props) => {
	const {
		alternativePreviews, 
		projectPreviews, swiperMod
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

				{/* columns */}
				<div className='md:flex gap-x-5 mt-2'>
					{/* left */}
					<div className='flex-grow'>
						<TagRoundedList tags={tags}
						hrefPrefix={`/libs?tags=`} />

						{/* README */}
						<ReactMarkdown className='mt-[15px]'>
							{props.lib.readme || 'HEHE'}
						</ReactMarkdown>

						{/* alternatives */}
						{alternativePreviews.length > 0 && (
							<>
								<h2 className='mt-4'>Альтернативы</h2>
								<TaggedItemsCarousel previews={alternativePreviews} innerMod={swiperMod} 
								headMod={RM.createMod('mt-2')} tagHrefPrefix={`/libs?tags=`} />
							</>
						)}

						{alternativePreviews.length == 0 && (
							<span className='mt-2 block'>
								У данной библиотеки / фреймворка еще нет альтернатив, но если это не так, вы можете <Link href={`/suggest_proj?libId=${id}`}><a className='link'>предложить</a></Link> свой вариант. 
							</span>
						)}

						{/* projects */}
						{projectPreviews.length > 0 && (
							<>
								<h2 className='mt-4'>Проекты</h2>

								<TaggedItemsCarousel previews={projectPreviews} innerMod={swiperMod}
								headMod={RM.createMod('mt-2')} tagHrefPrefix={`/libs?tags=`} />	
							</>
						)}

						{projectPreviews.length == 0 && (
							<span className='mt-2 block'>
								Знаете крутые open source проекты с использованием данной библиотеки / фреймворка? <Link href={`/suggest_proj?libId=${id}`}><a className='link'>Предложите</a></Link> свой вариант. 
							</span>
						)}

						{/* comments */}
						<h2 className='mt-5'>Комментарии</h2>
						<CommentsBlock headMod={RM.createMod('mt-2')}
						owner={{ libId: id }} uid={commentsId} />
					</div>

					{/* right */}
					<div className='ml-auto hidden md:block w-[300px]'>
						{/* description */}
						<h2 className='text-base font-medium'>Описание</h2>
						<span className='mt-[5px] text-sm'>{props.lib.description}</span>

						{/* TODO replace values with real ones */}
						<LibInfo headMod={RM.createMod('h-fit flex mt-4')} 
						downloads={'80m / month'} weight={weight}
						issuesCount={15} toolType={ToolType.framework}
						licence={'MIT'} lastUpdate={'8 месяцев назад'}
						links={libInfoLinksPlaceholder} version={"1.0.0"} />
					</div>
				</div>
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
		};
	} catch(e) {
		console.error(e);

		// TODO send error, not props
		return {
			props: {
				lib: {
					id: 0,
					slug,
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
					codeLang: 'text'
				}
			}
		};
	}
};

export const getStaticPaths: GetStaticPaths = async () => {
	const libs = await libReq.getMany({
		count: 5000,
		desc: true,
		offset: 0
	});

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