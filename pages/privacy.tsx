import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import * as RM from 'react-modifier';
import Head from 'next/head';
import Goto from '../components/goto';
import * as styles from './standard_styles.module.scss';

interface PrivacyPageProps {

}

const Privacy: NextPage<PrivacyPageProps> = (props) => {
	return (
		<div className={`page-content ${styles['wrapper']}`}>
			<Head>
				<title>Политика конфиденциальности</title>
				<meta name="description" content="Настоящая Политика определяет порядок обработки персональных данных и меры по обеспечению безопасности персональных данных у владельца сайта kdev_stack.ru (далее kdev_stack или Оператор)." />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<Goto href='/' title='Политика конфиденциальности' isMainHeading={true} headMod={RM.createMod('')} 
				goBack />

				<p className='block !mt-[0.9em]'>
					Политика обработки персональных данных (далее – Политика или Политика конфиденциальности) 
					разработана в соответствии с Федеральным законом от 27.07.2006. 
					№152-ФЗ «О персональных данных» (далее – ФЗ-152).
				</p>

				<p>
					Настоящая Политика определяет порядок обработки персональных данных и меры по 
					обеспечению безопасности персональных данных у владельца сайта kdev_stack.ru (далее kdev_stack или Оператор).
				</p>

				<p>
					Целью настоящей политики конфиденциальности является обеспечение защиты прав и свобод человека и гражданина 
					при обработке его персональных данных, в том числе защиты прав на неприкосновенность 
					частной жизни, личную и семейную тайну.
				</p>

				<p>
					Если Вы не согласны с условиями нашей Политики конфиденциальности, 
					не используйте сайт kdev_stack.ru!
				</p>

				<h2>
					Настоящая Политика содержит следующую информацию:
				</h2>

				<ul>
					<li>цель обработки персональных данных;</li>
					<li>перечень персональных данных, на обработку которых дается согласие субъекта персональных данных;</li>

					<li>
						наименование или фамилия, имя, отчество и адрес лица, осуществляющего обработку 
						персональных данных по поручению оператора, если обработка будет поручена такому лицу;
					</li>

					<li>
						перечень действий с персональными данными, 
						на совершение которых дается согласие, общее описание используемых 
						оператором способов обработки персональных данных;
					</li>

					<li>
						срок, в течение которого действует согласие субъекта персональных данных, 
						а также способ его отзыва, если иное не установлено федеральным законом;
					</li>

					<li>
						информацию о том, как можно отозвать свое согласие на обработку персональных данных.
					</li>
				</ul>

				<h2>
					Основные понятия, используемые в настоящей политике конфиденциальности
				</h2>

				<p>
					Персональные данные - любая информация, относящаяся прямо или косвенно к определенному 
					или определяемому физическому лицу (субъекту персональных данных);
				</p>

				<p>
					Оператор - государственный орган, муниципальный орган, юридическое или физическое лицо, 
					самостоятельно или совместно с другими лицами организующие и (или) осуществляющие обработку 
					персональных данных, а также определяющие цели обработки персональных данных, состав 
					персональных данных, подлежащих обработке, действия (операции), совершаемые с персональными данными;
				</p>

				<p>
					Обработка персональных данных - любое действие (операция) или совокупность действий (операций), 
					совершаемых с использованием средств автоматизации или без использования таких средств с персональными данными, 
					включая сбор, запись, систематизацию, накопление, хранение, уточнение (обновление, изменение), извлечение, 
					использование, передачу (распространение, предоставление, доступ), обезличивание, блокирование, удаление, 
					уничтожение персональных данных;
				</p>
			</main>
		</div>
	);
};

export default Privacy;

// export const getStaticProps: GetStaticProps<PrivacyPageProps> = () => {
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