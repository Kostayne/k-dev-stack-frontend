import type { NextPage } from 'next';
import * as RM from 'react-modifier';
import Head from 'next/head';
import Goto from '../../components/goto';
import { useUserRequired } from '../../hooks/user_required.hook';
import { useState } from 'react';
import Banner from '../../components/banner';
import CreateLibForm from '../../components/create_lib_form';
import AdminCategoryActions from '../../components/admin_category_actions';
import CreateProjectForm from '../../components/create_project_form';
import AdminUserCategory from '../../components/admin_user_category';
import { ProjectModel } from '../../models/project.model';
import { projReq } from '../../requests/project.req';
import AdminProjectCategory from '../../components/admin_project_category';

interface AdminMainPagePageProps {

}

const AdminMainPage: NextPage<AdminMainPagePageProps> = (props) => {
	useUserRequired(true);
	const [curForm, setCurForm] = useState('none');
	const [initialProj, setInitialProj] = useState<ProjectModel | null>(null);

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
						{/* <AdminCategoryLinks categoryDisplayName='Либы'
						prefix='libs' /> */}

						{/* <AdminCategoryActions categoryDisplayName='Либы' 
						setCurForm={setCurForm}
						setInitialProject={setInitialProj} /> */}

						<AdminProjectCategory setCurForm={setCurForm}
						setInitialProject={setInitialProj} />

						<AdminUserCategory />
					</div>

					{curForm == 'create_lib' && (
						<Banner headMod={RM.createMod('!bg-[transparent] flex items-center justify-center')}>
							<CreateLibForm headMod={RM.createMod([
								'w-100% md:w-fit bg-[white]',
								'px-[30px] py-[30px] max-h-[750px] overflow-auto',
								'shadow-baseShadow rounded-[5px]'
								].join(' '))}
								onCloseClick={() => { setCurForm('none') }} />
						</Banner>
					)}

					{curForm == 'project_create' && (
						<Banner headMod={RM.createMod('!bg-[transparent] flex items-center justify-center')}>
							<CreateProjectForm 
								headMod={RM.createMod([
									'w-100% md:w-fit bg-[white]',
									'px-[30px] py-[30px] max-h-[750px] overflow-auto',
									'shadow-baseShadow rounded-[5px]'
								].join(' '))}

								onCloseClick={() => { setCurForm('none') }} 
								initialProject={initialProj} />
						</Banner>
					)}
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