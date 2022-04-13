import type { GetServerSideProps, NextPage } from 'next';
import * as RM from 'react-modifier';
import Head from 'next/head';
import Goto from '../../components/goto';
import { libReq } from '../../requests/lib.req';
import { LibModel } from '../../models/lib.model';
import { useLibsPageLogic } from '../../hooks/libs_page_logic.hook';
import { parseArrQuery } from '../../utils/parse_next_arr_query';
import LibsFilterWithPreviews from '../../components/libs_filter_with_previews';
import { transformLibToTaggedItemPreview } from '../../transform/tagged_item_preview.transform';

export interface LibsPageProps {
	errorOccured?: boolean;
	libsCount: number;
	libs: LibModel[];
}

const Libs: NextPage<LibsPageProps> = (props) => {
	const {
		
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

				<LibsFilterWithPreviews initialCount={props.libsCount}
				initialPreviews={props.libs.map(l => transformLibToTaggedItemPreview(l))}
				headMod={RM.createMod('mt-6')} />

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