import React from 'react';
import { useTranslation } from 'react-i18next';
import PageLayout from "../../components/layout/PageLayout.tsx";


const CookiePolicyPage: React.FC = () => {
	const { t } = useTranslation();

	return (
		<PageLayout>
			<div className="min-h-screen  text-white xl:pt-20 ms:xl-20 sm:pt-5">
				<div className="xl:w-[80vw] md:w-[90vw] sm:w-[90vw] mx-auto px-4 md:px-8 py-8">
					{/* Header */}
					<div className="text-left mb-12">
						<h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-mono">
							{t('legal.cookiePolicy.title')}
						</h1>
					</div>

					{/* Content */}
					<div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 md:p-8">
						<div className="space-y-8">
							{/* Introduction */}
							<section>
								<p className="text-base md:text-lg text-gray-300 leading-relaxed">
									{t('legal.cookiePolicy.introduction')}
								</p>
							</section>

							{/* Section 1: What are Cookies */}
							<section>
								<h2 className="text-2xl md:text-3xl font-semibold text-cyan-400 mb-4">
									1. {t('legal.cookiePolicy.section1.title')}
								</h2>
								<p className="text-base md:text-lg text-gray-300 leading-relaxed">
									{t('legal.cookiePolicy.section1.content1')}
								</p>
							</section>

							{/* Section 2: Types of Cookies */}
							<section>
								<h2 className="text-2xl md:text-3xl font-semibold text-cyan-400 mb-4">
									2. {t('legal.cookiePolicy.section2.title')}
								</h2>
								<p className="text-base md:text-lg text-gray-300 leading-relaxed mb-4">
									{t('legal.cookiePolicy.section2.intro')}
								</p>
								<div className="space-y-4">
									<div className="bg-gray-700/30 p-4 rounded-lg">
										<h3 className="text-xl md:text-2xl font-semibold text-cyan-300 mb-2">
											{t('legal.cookiePolicy.section2.essential.title')}
										</h3>
										<p className="text-base md:text-lg text-gray-300">
											{t('legal.cookiePolicy.section2.essential.description')}
										</p>
									</div>
									<div className="bg-gray-700/30 p-4 rounded-lg">
										<h3 className="text-xl md:text-2xl font-semibold text-cyan-300 mb-2">
											{t('legal.cookiePolicy.section2.analytics.title')}
										</h3>
										<p className="text-base md:text-lg text-gray-300">
											{t('legal.cookiePolicy.section2.analytics.description')}
										</p>
									</div>
									<div className="bg-gray-700/30 p-4 rounded-lg">
										<h3 className="text-xl md:text-2xl font-semibold text-cyan-300 mb-2">
											{t('legal.cookiePolicy.section2.functional.title')}
										</h3>
										<p className="text-base md:text-lg text-gray-300">
											{t('legal.cookiePolicy.section2.functional.description')}
										</p>
									</div>
									<div className="bg-gray-700/30 p-4 rounded-lg">
										<h3 className="text-xl md:text-2xl font-semibold text-cyan-300 mb-2">
											{t('legal.cookiePolicy.section2.advertising.title')}
										</h3>
										<p className="text-base md:text-lg text-gray-300">
											{t('legal.cookiePolicy.section2.advertising.description')}
										</p>
									</div>
								</div>
							</section>

							{/* Section 3: How We Use Cookies */}
							<section>
								<h2 className="text-2xl md:text-3xl font-semibold text-cyan-400 mb-4">
									3. {t('legal.cookiePolicy.section3.title')}
								</h2>
								<div className="space-y-4">
									<p className="text-base md:text-lg text-gray-300 leading-relaxed">
										{t('legal.cookiePolicy.section3.content1')}
									</p>
									<ul className="list-disc list-inside space-y-2 text-base md:text-lg text-gray-300 ml-4">
										<li>{t('legal.cookiePolicy.section3.list1')}</li>
										<li>{t('legal.cookiePolicy.section3.list2')}</li>
										<li>{t('legal.cookiePolicy.section3.list3')}</li>
										<li>{t('legal.cookiePolicy.section3.list4')}</li>
										<li>{t('legal.cookiePolicy.section3.list5')}</li>
									</ul>
								</div>
							</section>

							{/* Section 4: Third-Party Cookies */}
							<section>
								<h2 className="text-2xl md:text-3xl font-semibold text-cyan-400 mb-4">
									4. {t('legal.cookiePolicy.section4.title')}
								</h2>
								<div className="space-y-4">
									<p className="text-base md:text-lg text-gray-300 leading-relaxed">
										{t('legal.cookiePolicy.section4.content1')}
									</p>
									<div className="bg-yellow-900/20 border border-yellow-600/30 p-4 rounded-lg">
										<p className="text-base md:text-lg text-gray-300">
											<strong className="text-yellow-400">{t('legal.cookiePolicy.section4.note')}:</strong> {t('legal.cookiePolicy.section4.noteContent')}
										</p>
									</div>
								</div>
							</section>

							{/* Section 5: Managing Cookies */}
							<section>
								<h2 className="text-2xl md:text-3xl font-semibold text-cyan-400 mb-4">
									5. {t('legal.cookiePolicy.section5.title')}
								</h2>
								<div className="space-y-4">
									<p className="text-base md:text-lg text-gray-300 leading-relaxed">
										{t('legal.cookiePolicy.section5.content1')}
									</p>
									<div className="bg-blue-900/20 border border-blue-600/30 p-4 rounded-lg">
										<h3 className="text-xl md:text-2xl font-semibold text-blue-400 mb-2">
											{t('legal.cookiePolicy.section5.browserSettings.title')}
										</h3>
										<ul className="list-disc list-inside space-y-1 text-base md:text-lg text-gray-300 ml-4">
											<li>{t('legal.cookiePolicy.section5.browserSettings.chrome')}</li>
											<li>{t('legal.cookiePolicy.section5.browserSettings.firefox')}</li>
											<li>{t('legal.cookiePolicy.section5.browserSettings.safari')}</li>
											<li>{t('legal.cookiePolicy.section5.browserSettings.edge')}</li>
										</ul>
									</div>
								</div>
							</section>

							{/* Section 6: Updates to Cookie Policy */}
							<section>
								<h2 className="text-2xl md:text-3xl font-semibold text-cyan-400 mb-4">
									6. {t('legal.cookiePolicy.section6.title')}
								</h2>
								<p className="text-base md:text-lg text-gray-300 leading-relaxed">
									{t('legal.cookiePolicy.section6.content1')}
								</p>
							</section>

							{/* Contact Information */}
							<section className="border-t border-gray-600 pt-8">
								<h2 className="text-2xl md:text-3xl font-semibold text-cyan-400 mb-4">
									{t('legal.contact.title')}
								</h2>
								<p className="text-base md:text-lg text-gray-300 leading-relaxed">
									{t('legal.contact.cookieQuestions')}
									<a
										href="mailto:parkflow.support@email.com"
										className="text-cyan-400 hover:text-cyan-300 hover:underline ml-1 transition-colors duration-300"
									>
										parkflow.support@email.com
									</a>
								</p>
							</section>
						</div>
					</div>
				</div>
			</div>
		</PageLayout>
	);
};

export default CookiePolicyPage;