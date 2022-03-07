import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import * as RM from 'react-modifier';
import Head from 'next/head';
import Goto from '../../components/goto';
import { useSyntheticInput } from '../../hooks/input_synthetic.hook';
import StyledTextInput from '../../components/styled-text-input';
import StyledBtn from '../../components/styled_btn';
import { libReq } from '../../requests/lib.req';
import { LibModel } from '../../models/lib.model';
import TaggedItemsList from '../../components/tagged_items_list';
import { useLibsPageLogic } from '../../hooks/libs_page_logic.hook';

export interface LibsPageProps {
	libsList: LibModel[];
	errorOccured?: boolean;
}

const Libs: NextPage<LibsPageProps> = (props) => {
	const nameInp = useSyntheticInput();
	const tagsInp = useSyntheticInput();
	const { libPreviews } = useLibsPageLogic(props);

	return (
		<div className='page-content'>
			<Head>
				<title>Библиотеки</title>
				<meta name="description" content="Список библиотек с фильтром по имени и тегам." />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<Goto href='/' title='Библиотеки' isMainHeading={true} headMod={RM.createMod('')} 
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

							<StyledTextInput {...tagsInp.binding} label='Теги' 
							placeholder='tag1, tag2' />
						</div>

						<StyledBtn value='применить' 
						headMod={RM.createMod([
							'primary-btn w-[110px] mx-auto',
							'md:mb-[2px]'
						].join(' '))} />
					</div>

					<div className='blue-splitter mt-5' />
				</div>

				{/* Lib previews */}
				{!props.errorOccured && (
					<TaggedItemsList items={libPreviews} 
					headMod={RM.createMod('mt-8')} />
				)}

				{props.errorOccured && (
					<p className='mt-5'>Не удалось загрузить список библиотек.</p>
				)}
			</main>
		</div>
	);
};

export default Libs;

export const getStaticProps: GetStaticProps<LibsPageProps> = async () => {
	let libsRes: Response | null = null;
	let libsList: LibModel[] = [];
	let errorOccured = false;

	try {
		libsRes = await libReq.getMany({
			count: 15,
			desc: true,
			offset: 0
		});
	} catch(e) {
		console.error(e);
		errorOccured = true;
	}

	if (libsRes?.ok) {
		libsList = await libsRes.json() as LibModel[];
	} else {
		errorOccured = true;
	}

	return {
		props: {
			libsList,
			errorOccured
		}
	};
};

// export const getStaticPaths: GetStaticPaths = () => {
// 	return {
// 		paths: [
// 			{
// 				params: {

// 				}
// 			}
// 		],

// 		fallback: 'blocking'
// 	};
// };