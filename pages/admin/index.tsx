import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import * as RM from 'react-modifier';
import Head from 'next/head';
import Goto from '../../components/goto';
import AdminCategoryLinks from '../../components/admin_category_links';
import { useUserRequired } from '../../hooks/user_required.hook';

interface AdminMainPagePageProps {

}

const AdminMainPage: NextPage<AdminMainPagePageProps> = (props) => {
	useUserRequired(true);

	return (
		<>
			<div className='page-content'>
				<Head>
					<title>Админ-панель</title>
					<meta name="description" content="Админ-панель" />
					<link rel="icon" href="/favicon.ico" />
				</Head>

				<main>
					<Goto href='/todo' title='Админ-панель' isMainHeading={true} headMod={RM.createMod('')} 
					goBack />

					<div className='grid gap-5 mt-6 md:grid md:grid-cols-3'>
						<AdminCategoryLinks categoryDisplayName='Либы'
						prefix='libs' />

						<AdminCategoryLinks categoryDisplayName='Проекты'
						prefix='projects' />

						<AdminCategoryLinks categoryDisplayName='Cсылки'
						prefix='named_links' />
					</div>
				</main>
			</div>
		</>
	);
};

export default AdminMainPage;

// export const getStaticProps: GetStaticProps<AdminMainPagePageProps> = () => {
// 	return {
// 		props: {

// 		}
// 	};
// };

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