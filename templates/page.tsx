import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import * as RM from 'react-modifier';
import Head from 'next/head';
import Goto from '../components/goto';

interface __cname__PageProps {

}

const __cname__: NextPage<__cname__PageProps> = (props) => {
	return (
		<div className='page-content'>
			<Head>
				<title>K_DevStack TODO</title>
				<meta name="description" content="TODO" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<Goto href='/todo' title='TODO' isMainHeading={true} headMod={RM.createMod('mt-5')} 
				goBack />
			</main>
		</div>
	);
};

export default __cname__;

// export const getStaticProps: GetStaticProps<__cname__PageProps> = () => {
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