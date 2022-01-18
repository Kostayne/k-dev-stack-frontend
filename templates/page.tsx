import type { NextPage } from 'next';
import * as RM from 'react-modifier';
import Head from 'next/head';
import Goto from '../components/goto';

const __cname__: NextPage = () => {
	return (
		<div className='page-content'>
			<Head>
				<title>K_DevStack TODO</title>
				<meta name="description" content="TODO" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<Goto href='/todo' title='TODO' isMainHeading={true} headMod={RM.createMod('mt-5')} />
			</main>
		</div>
	);
};

export default __cname__;