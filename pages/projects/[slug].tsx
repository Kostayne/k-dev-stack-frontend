import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import * as RM from 'react-modifier';
import Head from 'next/head';
import Goto from '../../components/goto';
import { ProjectModel } from '../../models/project.model';
import TagRoundedList from '../../components/tag_rounded_list';
import { projReq } from '../../requests/project.req';
import { transformBackendFullProject } from '../../transform/project_full.transform';
import { useConcreteProjectLogic } from '../../hooks/concrete_project_logic.hook';
import CommentsBlock from '../../components/comments_block';
import ProjectInfo from '../../components/project_info';
import Error from 'next/error';
import dynamic from 'next/dynamic';
import type TaggedItemsCarouselType from '../../components/carousel';
import Banner from '../../components/banner';
import EditProjectForm from '../../components/edit_project_form';
import { userStore } from '../../stores/user.store';
import OutlineBtn from '../../components/outline_btn';
import { observer } from 'mobx-react-lite';
import MdViewer from '../../components/md_viewer';
import StyledBtn from '../../components/styled_btn';
import { projectCfg } from '../../cfg';

const LazyTaggedItemsCarousel = dynamic(() => 
	import('../../components/carousel') as any
, {
	ssr: false
}) as typeof TaggedItemsCarouselType;

export interface ProjectPageProps {
	project: ProjectModel | null;
	errorCode?: number;
}

const Project: NextPage<ProjectPageProps> = (props) => {
	const {
		libPreviews,
		isEditFormOpened,
		relativeImgSrcPrefix,
		onGoToCommentsClick,
		setEditFormOpened,
		onDelete
	} = useConcreteProjectLogic(props);

	if (!props.project) {
		return (
			<Error statusCode={props.errorCode as number} />
		);
	}

	const { 
		description, name, links, tags,
		issuesCount, updatedAt, license,
		starsCount, forksCount, readme
	} = props.project;

	const commentsId = `proj_${props.project.id}`;

	return (
		<div className='page-content'>
			<Head>
				<title>{name}</title>
				<meta name="description" content={description} />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<Goto href='/projects/' title={name} isMainHeading={true} headMod={RM.createMod('')} 
				goBack />

				{/* columns */}
				<div className='md:flex gap-x-5 mt-2'>
					{/* LEFT */}
					<div className='flex-grow'>
						<TagRoundedList tags={tags}
						hrefPrefix={`/projects?tags=`} />

						{/* stack */}
						<h2 className='mt-4'>????????</h2>

						<LazyTaggedItemsCarousel previews={libPreviews} headMod={RM.createMod('mt-2')} 
						tagHrefPrefix={`/projects?tags=`} />

						{/* README */}
						<h2 className='mt-4'>????????????????</h2>

						<MdViewer headMod={RM.createMod([
							'mt-[15px] max-w-[880px]', 
							'pl-[2px] overflow-auto',
							// 'bg-[]'
							].join(' '))} 
							relativeImageSrcPrefix={relativeImgSrcPrefix}>
							{readme}
						</MdViewer>

						<h2 id="comments" className='mt-5'>??????????????????????</h2>
						<CommentsBlock owner={{ projectId: props.project.id }} 
						uid={commentsId} />
					</div>

					{/* RIGHT */}
					<div className='ml-auto hidden md:block w-[300px]'>
						{/* description */}
						<h2 className='text-base font-medium'>????????????????</h2>
						<span className='mt-[5px] text-sm'>{props.project.description}</span>

						<ProjectInfo headMod={RM.createMod('h-fit flex mt-4')}
						issuesCount={issuesCount} license={license} updatedAt={updatedAt}
						links={links} forksCount={forksCount} starsCount={starsCount} />

						<StyledBtn value='??????????????????????' onClick={onGoToCommentsClick}
						headMod={RM.createMod('w-full mt-[20px] h-[45px]')} />

						{/* admin actions */}
						{userStore.userData && userStore.userData.isAdmin && (
							<div className='mt-[20px] flex flex-col gap-y-[15px]'>
								<OutlineBtn text='??????????????????????????'
								headMod={RM.createMod('w-full')}
								onClick={() => setEditFormOpened(true)} />

								<OutlineBtn text='??????????????'
								headMod={RM.createMod('w-full')}
								onClick={onDelete} />
							</div>
						)}
					</div>
				</div>

				{isEditFormOpened && (
					<Banner headMod={RM.createMod('!bg-[transparent] flex items-center justify-center')}>
						<EditProjectForm headMod={RM.createMod([
							'w-100% md:w-fit bg-[white]',
							'px-[30px] py-[30px] max-h-[750px] overflow-auto',
							'shadow-baseShadow rounded-[5px]'
							].join(' '))}
							onCloseClick={() => { setEditFormOpened(false) }}
							project={props.project} />
					</Banner>
				)}
			</main>
		</div>
	);
};

export default observer(Project);

export const getStaticProps: GetStaticProps<ProjectPageProps> = async (ctx) => {
	const slug = ctx.params?.slug as string;

	try {
		const resp = await projReq.getFullBySlug(slug);

		if (!resp.ok) {
			return {
				props: {
					project: null,
					errorCode: resp.status
				}
			};
		}

		const projectRaw = await resp.json() as ProjectModel;
		const transformedProject = transformBackendFullProject(projectRaw);

		return {
			props: {
				project: transformedProject
			},

			revalidate: projectCfg.data.revalidate
		};
	} catch(e) {
		console.error('Error when requesting project full data');
		console.error(e);

		return {
			props: {
				errorCode: 503,
				project: null
			},

			revalidate: projectCfg.data.revalidate
		};
	}
};

export const getStaticPaths: GetStaticPaths = async () => {
	const [projects, err] = await projReq.getMany({
		count: 30,
		desc: true,
		offset: 0
	});

	if (err) {
		console.log('Error in loading project paths');
	}

	return {
		paths: (projects || []).map(p => {
			return {
				params: {
					slug: p.slug
				}
			}
		}),

		fallback: 'blocking'
	};
};