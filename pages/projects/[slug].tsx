import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import * as RM from 'react-modifier';
import Head from 'next/head';
import Goto from '../../components/goto';
import { ProjectModel } from '../../models/project.model';
import TagRoundedList from '../../components/tag_rounded_list';
import { projReq } from '../../requests/project.req';
import { transformBackendFullProject } from '../../transform/project_full.transform';
import TaggedItemsCarousel from '../../components/carousel';
import { useConcreteProjectLogic } from '../../hooks/concrete_project_logic.hook';
import CommentsBlock from '../../components/comments_block';
import ProjectInfo from '../../components/project_info';
import { libInfoLinksPlaceholder } from '../../placeholders/lib.placeholder';

export interface ProjectPageProps {
	project: ProjectModel;
}

const Project: NextPage<ProjectPageProps> = (props) => {
	const { description, name, sources, tags } = props.project;
	const {
		libPreviews
	} = useConcreteProjectLogic(props);

	const commentsId = `proj_${props.project.id}`;
	const stackHeadline = libPreviews.length == 0? 'Стек не заполнен' : 'Стек';

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
						<h2 className='mt-4'>{stackHeadline}</h2>

						<TaggedItemsCarousel previews={libPreviews} headMod={RM.createMod('mt-2')} 
						tagHrefPrefix={`/projects?tags=`} />

						<h2 className='mt-5'>Комментарии</h2>
						<CommentsBlock owner={{ projectId: props.project.id }} 
						uid={commentsId} />
					</div>

					{/* RIGHT */}
					<div className='ml-auto hidden md:block w-[300px]'>
						{/* description */}
						<h2 className='text-base font-medium'>Описание</h2>
						<span className='mt-[5px] text-sm'>{props.project.description}</span>

						{/* TODO replace values with real ones */}
						<ProjectInfo headMod={RM.createMod('h-fit flex mt-4')}
						issuesCount={15} license={'MIT'} lastUpdate={'8 месяцев назад'}
						links={libInfoLinksPlaceholder} forksCount={200} starsCount={816} />
					</div>
				</div>
			</main>
		</div>
	);
};

export default Project;

export const getStaticProps: GetStaticProps<ProjectPageProps> = async (ctx) => {
	const slug = ctx.params?.slug as string;

	try {
		const resp = await projReq.getFullBySlug(slug);

		if (resp.status == 404) {
			return {
				notFound: true
			};
		}

		const projectRaw = await resp.json() as ProjectModel;
		const transformedProject = transformBackendFullProject(projectRaw);

		return {
			props: {
				project: transformedProject
			}
		};
	} catch(e) {
		console.error('Error when requesting project full data');
		console.error(e);

		return {
			props: {
				project: {
					libs: [],
					comments: [],
					commentsCount: 0,
					name: 'Ошибка',
					description: 'Ошибка',
					sources: [],
					tags: [],
					slug,
					id: 0
				}
			}
		};
	}
};

export const getStaticPaths: GetStaticPaths = async () => {
	const projects = await projReq.getMany({
		count: 30,
		desc: true,
		offset: 0
	});

	if (!projects) {
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