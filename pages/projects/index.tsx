import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import * as RM from 'react-modifier';
import Head from 'next/head';
import Goto from '../../components/goto';
import TaggedItemPreview from '../../components/tagged-item-preview';
import StyledTextInput from '../../components/styled-text-input';
import { useSyntheticInput } from '../../hooks/input_synthetic.hook';
import { projReq } from '../../requests/project.req';
import { ProjectModel } from '../../models/project.model';
import { transformProjectToTaggedItemPreview } from '../../transform/tagged_item_preview.transform';

interface ProjectsPageProps {
	projects: ProjectModel[];
}

const Projects: NextPage<ProjectsPageProps> = (props) => {
	const nameInp = useSyntheticInput();
	const libsInp = useSyntheticInput();

	const getProjectPreviewsToR = () => {
		return props.projects.map((p, i) => {
			const previewProps = transformProjectToTaggedItemPreview(p);

			return (
				<TaggedItemPreview {...previewProps} key={i} />
			);
		});
	};

	return (
		<div className='page-content'>
			<Head>
				<title>Проекты</title>
				<meta name="description" content="Список проектов с фильтром по имени и используемым библиотекам." />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<Goto href='/' title='Проекты' isMainHeading={true} headMod={RM.createMod('')} 
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
					{getProjectPreviewsToR()}
				</div>
			</main>
		</div>
	);
};

export default Projects;

export const getStaticProps: GetStaticProps<ProjectsPageProps> = async () => {
	try {
		const projResp = await projReq.getMany({
			count: 25,
			desc: true,
			offset: 0
		});

		const projects = await projResp.json() as ProjectModel[];

		return {
			props: {
				projects
			}
		};
	} catch(e) {

	}

	return {
		props: {
			projects: []
		}
	};
};