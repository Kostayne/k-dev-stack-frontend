import type { GetServerSideProps, GetStaticProps, NextPage } from 'next';
import * as RM from 'react-modifier';
import Head from 'next/head';
import Goto from '../../components/goto';
import StyledTextInput from '../../components/styled-text-input';
import StyledBtn from '../../components/styled_btn';
import { libReq } from '../../requests/lib.req';
import { LibModel } from '../../models/lib.model';
import { useLibsPageLogic } from '../../hooks/libs_page_logic.hook';
import TaggedItemPreviewsInfiniteList from '../../components/tagged_item_previews_infinite_list';
import { parseArrQuery } from '../../utils/parse_next_arr_query';

export interface LibsPageProps {
	errorOccured?: boolean;
	libsCount: number;
	libs: LibModel[];
}

const Libs: NextPage<LibsPageProps> = (props) => {
	const {
		libPreviews, tagsInp, nameInp,
		libsCount,
		onFilterClick, loadMorePreviews
	} = useLibsPageLogic(props);

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
						].join(' '))} 
						onClick={onFilterClick} />
					</div>

					<div className='blue-splitter mt-5' />
				</div>

				{/* Lib previews */}
				{!props.errorOccured && (
					<TaggedItemPreviewsInfiniteList initialPreviews={libPreviews} 
					headMod={RM.createMod('mt-8')} allPreviewsCount={libsCount}
					loadMore={loadMorePreviews}
					tagHrefPrefix={'/libs?tags='} />
				)}

				{props.errorOccured && (
					<p className='mt-4'>Не удалось загрузить список библиотек.</p>
				)}
			</main>
		</div>
	);
};

export default Libs;

export const getServerSideProps: GetServerSideProps<LibsPageProps> = async (ctx) => {
	let tagsQuery = ctx.query.tags;
	const nameQuery = ctx.query.name as string || '';
	const tags = parseArrQuery(tagsQuery);

	const libs = await libReq.getByFilter({
		count: 20,
		desc: true,
		offset: 0
	}, tags, nameQuery);

	const libsCount = await libReq.countAll();

	return {
		props: {
			errorOccured: false,
			libsCount,
			libs
		}
	};
};