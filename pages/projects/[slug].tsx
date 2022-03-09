import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import * as RM from 'react-modifier';
import Head from 'next/head';
import Goto from '../../components/goto';
import { ProjectModel } from '../../models/project.model';
import NamedLinksList from '../../components/named_links_list';
import CreateComment from '../../components/create_comment';
import TagRoundedList from '../../components/tag_rounded_list';
import { projReq } from '../../requests/project.req';
import { transformBackendFullProject } from '../../transform/project_full.transform';
import Carousel from '../../components/carousel';
import { useConcreteProjectLogic } from '../../hooks/concrete_project_logic.hook';

export interface ProjectPageProps {
	project: ProjectModel;
}

const Project: NextPage<ProjectPageProps> = (props) => {
	const { comments, description, name, sources, libs, tags } = props.project;
	const { libPreviews, carouselShowCount } = useConcreteProjectLogic(props);

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

				<TagRoundedList tags={tags}
				headMod={RM.createMod('mt-2')} />

				{/* description */}
				<p className='mt-3'>{description}</p>

				{/* stack (libs) */}
				<h2 className='mt-4'>Стек</h2>

				<Carousel previews={libPreviews} 
				showCount={carouselShowCount}
				headMod={RM.createMod('mt-2')} />

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
					name: 'Ошибка',
					description: 'Ошибка',
					sources: [],
					tags: [],
					slug
				}
			}
		};
	}
};

export const getStaticPaths: GetStaticPaths = async () => {
	let projects: ProjectModel[] = [];

	try {
		const resp = await projReq.getMany({
			count: 9999,
			desc: true,
			offset: 0
		});

		projects = await resp.json() as ProjectModel[];
	} catch(e) {
		console.log('Error in loading project paths');
		console.error(e);
	}

	return {
		paths: projects.map(p => {
			return {
				params: {
					slug: p.slug
				}
			}
		}),

		fallback: 'blocking'
	};
};