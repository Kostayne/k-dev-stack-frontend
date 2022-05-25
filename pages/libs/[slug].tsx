import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import * as RM from 'react-modifier';
import Head from 'next/head';
import Goto from '../../components/goto';
import { LibModel } from '../../models/lib.model';
import { libReq } from '../../requests/lib.req';
import { transformBackendFullLib } from '../../transform/lib_full.transform';
import { useConcreteLibPageLogic } from '../../hooks/concrete_lib_logic.hook';
import TagRoundedList from '../../components/tag_rounded_list';
import CommentsBlock from '../../components/comments_block';
import LibInfo from '../../components/lib_info';
import Error from 'next/error';
import dynamic from 'next/dynamic';
import OutlineBtn from '../../components/outline_btn';
import Banner from '../../components/banner';
import EditLibForm from '../../components/edit_lib_form';
import { userStore } from '../../stores/user.store';
import { observer } from 'mobx-react-lite';
import MdViewer from '../../components/md_viewer';
import type TaggedItemsCarouselType from '../../components/carousel';
import StyledBtn from '../../components/styled_btn';
import { projectCfg } from '../../cfg';

const LazyTaggedItemsCarousel = dynamic(() => 
	import('../../components/carousel') as any
, {
	ssr: false
}) as typeof TaggedItemsCarouselType;

export interface LibPageProps {
	lib: LibModel | null;
	errorCode?: number;
}

const ConcreteLibPage: NextPage<LibPageProps> = (props) => {
	const {
		alternativePreviews, 
		projectPreviews, swiperMod,
		isEditFormOpened,
		relativeImgSrcPrefix,
		onGoToCommentsClick,
		setEditFormOpened,
		onDelete
	} = useConcreteLibPageLogic(props);

	if (!props.lib) {
		return (
			<Error statusCode={props.errorCode as number} />
		);
	}

	const {
		weight, 
		name, 
		links,
		downloadsCount: downloads,
		issuesCount,
		license,
		toolType,
		version,
		updatedAt,
		tags, 
		description,
		readme,
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
					<div className='flex-grow max-w-[883px]'>
						<TagRoundedList tags={tags}
						hrefPrefix={`/libs?tags=`} />

						{/* alternatives */}
						{alternativePreviews.length > 0 && (
							<>
								<h2 className='mt-4'>Альтернативы</h2>

								<LazyTaggedItemsCarousel previews={alternativePreviews} innerMod={swiperMod} 
								headMod={RM.createMod('mt-2')} tagHrefPrefix={`/libs?tags=`}
								emptyDescription="На данный момент на сайте нет альтернативы данной библиотеке." />
							</>
						)}

						{/* projects */}
						{projectPreviews.length > 0 && (
							<>
								<h2 className='mt-4'>Проекты</h2>

								<LazyTaggedItemsCarousel previews={projectPreviews} innerMod={swiperMod}
								headMod={RM.createMod('mt-2')} tagHrefPrefix={`/libs?tags=`}
								emptyDescription="На сайте нет проектов, в которых используется данная библиотека" />
							</>
						)}

						{/* README */}
						<MdViewer headMod={RM.createMod('mt-[15px]')}
						relativeImageSrcPrefix={relativeImgSrcPrefix}>
							{readme}
						</MdViewer>

						{/* comments */}
						<h2 className='mt-5' id="comments">Комментарии</h2>
						<CommentsBlock headMod={RM.createMod('mt-2')}
						owner={{ libId: id }} uid={commentsId} />
					</div>

					{/* right */}
					<div className='ml-auto hidden md:block w-[300px]'>
						{/* description */}
						<h2 className='text-base font-medium'>Описание</h2>
						<span className='mt-[5px] text-sm'>{props.lib.description}</span>

						<LibInfo headMod={RM.createMod('h-fit flex mt-4')} 
						downloads={downloads} weight={weight}
						issuesCount={issuesCount} toolType={toolType}
						license={license} updatedAt={updatedAt}
						links={links} version={version} />

						<StyledBtn value='КОММЕНТАРИИ' onClick={onGoToCommentsClick}
						headMod={RM.createMod('w-full mt-[20px] h-[45px]')} />

						{/* admin actions */}
						{userStore.userData && userStore.userData.isAdmin && (
							<div className='mt-[20px] flex flex-col gap-y-[15px]'>
								<OutlineBtn text='РЕДАКТИРОВАТЬ'
								headMod={RM.createMod('w-full')}
								onClick={() => setEditFormOpened(true)} />

								<OutlineBtn text='УДАЛИТЬ'
								headMod={RM.createMod('w-full')}
								onClick={onDelete} />
							</div>
						)}
					</div>
				</div>

				{isEditFormOpened && (
					<Banner headMod={RM.createMod('!bg-[transparent] flex items-center justify-center')}>
						<EditLibForm headMod={RM.createMod([
							'w-100% md:w-fit bg-[white]',
							'px-[30px] py-[30px] max-h-[750px] overflow-auto',
							'shadow-baseShadow rounded-[5px]'
							].join(' '))}
							onCloseClick={() => { setEditFormOpened(false) }}
							lib={props.lib} />
					</Banner>
				)}
			</main>
		</div>
	);
};

export default observer(ConcreteLibPage);

export const getStaticProps: GetStaticProps<LibPageProps> = async (ctx) => {
	const slug = ctx.params?.slug as string;

	try {
		const resp = await libReq.getFullBySlug(slug);

		if (!resp.ok) {
			console.log()
			console.error(resp.statusText);

			return {
				props: {
					errorCode: resp.status,
					lib: null
				}
			};
		}

		const libJson = await resp.json();
		const libTransformed = transformBackendFullLib(libJson);

		return {
			props: {
				lib: libTransformed
			},

			revalidate: projectCfg.data.revalidate
		};
	} catch(e) {
		console.error(e);

		return {
			props: {
				lib: null,
				errorCode: 503,
			},

			revalidate: projectCfg.data.revalidate
		};
	}
};

export const getStaticPaths: GetStaticPaths = async () => {
	const [libs, err] = await libReq.getMany({
		count: 5000,
		desc: true,
		offset: 0
	});

	if (err) {
		console.log('Error in loading lib paths');
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