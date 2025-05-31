import React from 'react';
import { useTranslation } from 'react-i18next';
import PageLayout from "../../components/layout/PageLayout.tsx";

const PrivacyPolicyPage: React.FC = () => {
	const { t } = useTranslation();

	return (
		<PageLayout>
			<div className="min-h-screen text-white xl:pt-20 ms:xl-20 sm:pt-5">
				<div className="xl:w-[80vw] md:w-[90vw] sm:w-[90vw] mx-auto px-4 md:px-8 py-">
					{/* Header */}
					<div className="text-left mb-12">
						<h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-mono">
							{t('legal.privacyPolicy.title')}
						</h1>
					</div>

					{/* Content */}
					<div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 md:p-8">
						<div className="space-y-8">
							{/* Introduction */}
							<section>
								<p className="text-base md:text-lg text-gray-300 leading-relaxed">
									{t('legal.privacyPolicy.introduction')}
								</p>
							</section>

							{/* Section 1: Information Collection */}
							<section>
								<h2 className="text-2xl md:text-3xl font-semibold text-cyan-400 mb-4">
									1. {t('legal.privacyPolicy.section1.title')}
								</h2>
								<div className="space-y-4">
									<div>
										<h3 className="text-xl md:text-2xl font-semibold text-cyan-300 mb-2">
											1.1 {t('legal.privacyPolicy.section1.personalInfo.title')}
										</h3>
										<p className="text-base md:text-lg text-gray-300 leading-relaxed">
											{t('legal.privacyPolicy.section1.personalInfo.content')}
										</p>
										<ul className="list-disc list-inside space-y-1 text-base md:text-lg text-gray-300 ml-4 mt-2">
											<li>{t('legal.privacyPolicy.section1.personalInfo.list1')}</li>
											<li>{t('legal.privacyPolicy.section1.personalInfo.list2')}</li>
											<li>{t('legal.privacyPolicy.section1.personalInfo.list3')}</li>
											<li>{t('legal.privacyPolicy.section1.personalInfo.list4')}</li>
										</ul>
									</div>
									<div>
										<h3 className="text-xl md:text-2xl font-semibold text-cyan-300 mb-2">
											1.2 {t('legal.privacyPolicy.section1.automaticInfo.title')}
										</h3>
										<p className="text-base md:text-lg text-gray-300 leading-relaxed">
											{t('legal.privacyPolicy.section1.automaticInfo.content')}
										</p>
									</div>
								</div>
							</section>

							{/* Section 2: How We Use Information */}
							<section>
								<h2 className="text-2xl md:text-3xl font-semibold text-cyan-400 mb-4">
									2. {t('legal.privacyPolicy.section2.title')}
								</h2>
								<div className="space-y-4">
									<p className="text-base md:text-lg text-gray-300 leading-relaxed">
										{t('legal.privacyPolicy.section2.content1')}
									</p>
									<ul className="list-disc list-inside space-y-2 text-base md:text-lg text-gray-300 ml-4">
										<li>{t('legal.privacyPolicy.section2.list1')}</li>
										<li>{t('legal.privacyPolicy.section2.list2')}</li>
										<li>{t('legal.privacyPolicy.section2.list3')}</li>
										<li>{t('legal.privacyPolicy.section2.list4')}</li>
										<li>{t('legal.privacyPolicy.section2.list5')}</li>
									</ul>
								</div>
							</section>

							{/* Section 3: Information Sharing */}
							<section>
								<h2 className="text-2xl md:text-3xl font-semibold text-cyan-400 mb-4">
									3. {t('legal.privacyPolicy.section3.title')}
								</h2>
								<div className="space-y-4">
									<p className="text-base md:text-lg text-gray-300 leading-relaxed">
										{t('legal.privacyPolicy.section3.content1')}
									</p>
									<ul className="list-disc list-inside space-y-2 text-base md:text-lg text-gray-300 ml-4">
										<li>{t('legal.privacyPolicy.section3.list1')}</li>
										<li>{t('legal.privacyPolicy.section3.list2')}</li>
										<li>{t('legal.privacyPolicy.section3.list3')}</li>
									</ul>
								</div>
							</section>

							{/* Section 4: Data Security */}
							<section>
								<h2 className="text-2xl md:text-3xl font-semibold text-cyan-400 mb-4">
									4. {t('legal.privacyPolicy.section4.title')}
								</h2>
								<div className="space-y-4">
									<p className="text-base md:text-lg text-gray-300 leading-relaxed">
										{t('legal.privacyPolicy.section4.content1')}
									</p>
									<p className="text-base md:text-lg text-gray-300 leading-relaxed">
										{t('legal.privacyPolicy.section4.content2')}
									</p>
								</div>
							</section>

							{/* Section 5: Your Rights */}
							<section>
								<h2 className="text-2xl md:text-3xl font-semibold text-cyan-400 mb-4">
									5. {t('legal.privacyPolicy.section5.title')}
								</h2>
								<div className="space-y-4">
									<p className="text-base md:text-lg text-gray-300 leading-relaxed">
										{t('legal.privacyPolicy.section5.content1')}
									</p>
									<ul className="list-disc list-inside space-y-2 text-base md:text-lg text-gray-300 ml-4">
										<li>{t('legal.privacyPolicy.section5.list1')}</li>
										<li>{t('legal.privacyPolicy.section5.list2')}</li>
										<li>{t('legal.privacyPolicy.section5.list3')}</li>
										<li>{t('legal.privacyPolicy.section5.list4')}</li>
									</ul>
								</div>
							</section>

							{/* Section 6: Data Retention */}
							<section>
								<h2 className="text-2xl md:text-3xl font-semibold text-cyan-400 mb-4">
									6. {t('legal.privacyPolicy.section6.title')}
								</h2>
								<p className="text-base md:text-lg text-gray-300 leading-relaxed">
									{t('legal.privacyPolicy.section6.content1')}
								</p>
							</section>

							{/* Section 7: Changes to Policy */}
							<section>
								<h2 className="text-2xl md:text-3xl font-semibold text-cyan-400 mb-4">
									7. {t('legal.privacyPolicy.section7.title')}
								</h2>
								<p className="text-base md:text-lg text-gray-300 leading-relaxed">
									{t('legal.privacyPolicy.section7.content1')}
								</p>
							</section>

							{/* Contact Information */}
							<section className="border-t border-gray-600 pt-8">
								<h2 className="text-2xl md:text-3xl font-semibold text-cyan-400 mb-4">
									{t('legal.contact.title')}
								</h2>
								<p className="text-base md:text-lg text-gray-300 leading-relaxed">
									{t('legal.contact.description')}
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

export default PrivacyPolicyPage;