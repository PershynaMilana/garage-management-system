import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faXTwitter, faTelegramPlane } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';
import DownArrow from '../assets/images/Down_Arrow.svg?react';
import Logo from '/Logo.png';
import LanguageSelector from "./LanguageSelector.tsx";

library.add(faFacebookF, faInstagram, faXTwitter, faTelegramPlane);

const AccordionSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mb-4 mx-5">
            <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="font-montserratMedium text-[#FFFFFF] font-[IBMPlexMono-Regular] text-base">{title}</h3>
                <DownArrow className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </div>
            {isOpen && <div className="mt-2">{children}</div>}
        </div>
    );
};

const Footer: React.FC = () => {
    const { t } = useTranslation();
    const isSmallScreen = useMediaQuery({query: '(max-width: 640px)'});

    return (
        <footer className="mx-[3vw] xl:py-8 md:py-8 mt-4 xl:w-[85%] md:w-[85%] sm:w-[95%] justify-center flex flex-col font-montserratRegular">
            {isSmallScreen ? (
                <>
                    <div className="border border-[#87d7de] mb-4 w-full text-[#FFFFFF] font-[IBMPlexMono-Regular] text-base"></div>

                    <AccordionSection title={t('footer.navigation.title')}>
                        <div className="flex space-x-8">
                            <ul>
                                <li>
                                    <a href="/statistics" className="hover:underline text-[#c3ebee] font-[IBMPlexMono-Regular] text-base">
                                        {t('footer.navigation.statistics')}
                                    </a>
                                </li>
                                <li>
                                    <a href="/main-page" className="hover:underline text-[#c3ebee] font-[IBMPlexMono-Regular] text-base">
                                        {t('footer.navigation.userManagement')}
                                    </a>
                                </li>
                                <li>
                                    <a href="/settings" className="hover:underline text-[#c3ebee] font-[IBMPlexMono-Regular] text-base">
                                        {t('footer.navigation.settings')}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </AccordionSection>

                    <div className="border border-[#87d7de] mb-4 w-full text-[#FFFFFF] font-[IBMPlexMono-Regular] text-base"></div>

                    <AccordionSection title={t('footer.information.title')}>
                        <ul>
                            <li>
                                <a href="/terms-of-use" className="hover:underline text-[#c3ebee] font-[IBMPlexMono-Regular] text-base">
                                    {t('footer.information.termsOfUse')}
                                </a>
                            </li>
                            <li>
                                <a href="/privacy-policy" className="hover:underline text-[#c3ebee] font-[IBMPlexMono-Regular] text-base">
                                    {t('footer.information.privacyPolicy')}
                                </a>
                            </li>
                            <li>
                                <a href="/cookie-policy" className="hover:underline text-[#c3ebee] font-[IBMPlexMono-Regular] text-base">
                                    {t('footer.information.cookiePolicy')}
                                </a>
                            </li>
                        </ul>
                    </AccordionSection>

                    <div className="border border-[#87d7de] mb-4 w-full text-[#FFFFFF] font-[IBMPlexMono-Regular] text-base"></div>

                    <AccordionSection title={t('footer.connection.title')}>
                        <a href={`tel:${t('footer.connection.phone')}`} className="hover:underline text-[#c3ebee] font-[IBMPlexMono-Regular] text-base">
                            {t('footer.connection.phone')}
                        </a><br/>
                        <a href={`mailto:${t('footer.connection.email')}`} className="hover:underline text-[#c3ebee] font-[IBMPlexMono-Regular] text-base">
                            {t('footer.connection.email')}
                        </a>
                        <div className="mt-2 flex space-x-4">
                            <a href="#" aria-label="Facebook">
                                <FontAwesomeIcon icon={['fab', 'facebook-f']} style={{color: "#ffffff"}}/>
                            </a>
                            <a href="#" aria-label="Instagram">
                                <FontAwesomeIcon icon={['fab', 'instagram']} style={{color: "#ffffff"}}/>
                            </a>
                            <a href="#" aria-label="Twitter">
                                <FontAwesomeIcon icon={['fab', 'x-twitter']} style={{color: "#ffffff"}}/>
                            </a>
                            <a href="#" aria-label="Telegram">
                                <FontAwesomeIcon icon={['fab', 'telegram-plane']} style={{color: "#ffffff"}}/>
                            </a>
                        </div>
                    </AccordionSection>

                    <div className="border border-[#87d7de] mb-4 w-full text-[#FFFFFF] font-[IBMPlexMono-Regular] text-base"></div>

                    <div className="flex flex-col items-center mb-[5vh]">
                        <div className="flex justify-between items-center w-full mt-[2vh] px-[5vw]">
                            <div className="text-center text-pl items-center justify-center text-almost-black text-xs text-[#ffffff] font-[IBMPlexMono-Regular]">
                                {t('footer.copyright')}
                            </div>
                            <div className="text-right text-xs text-almost-black">
                                <LanguageSelector/>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <hr className="border-t border-[#87d7de] w-[110%] border-2 mb-6"/>
                    <div className="w-[110%] flex flex-col md:flex-row justify-between items-start text-almost-black">
                        {/* Left section with logo */}
                        <div className=" mt-2 xl:mr-0 md:mr-5 justify-start flex">
                            <Link to=".">
                                <img src={Logo} alt="logo" height="45px" width="45px"/>
                            </Link>
                        </div>

                        {/* Navigation section */}
                        <div className="mt-4 ml-2 md:mt-0 md:ml-0 md:mr-0 xl:mr-14">
                            <h3 className="font-bold mb-2 text-[#FFFFFF] font-[IBMPlexMono-Regular] text-base">
                                {t('footer.navigation.title')}
                            </h3>
                            <div className="flex space-x-8">
                                <ul>
                                    <li>
                                        <a href="/statistics" className="hover:underline text-[#c3ebee] font-[IBMPlexMono-Regular] text-base">
                                            {t('footer.navigation.statistics')}
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/main-page" className="hover:underline text-[#c3ebee] font-[IBMPlexMono-Regular] text-base">
                                            {t('footer.navigation.userManagement')}
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/settings" className="hover:underline text-[#c3ebee] font-[IBMPlexMono-Regular] text-base">
                                            {t('footer.navigation.settings')}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Info section */}
                        <div className="mt-4 ml-24 xl:mr-0 md:mt-0 md:mr-0 md:ml-0 xl:ml-14 md:ml-4">
                            <h3 className="font-bold mb-2 text-[#FFFFFF] font-[IBMPlexMono-Regular] text-base">
                                {t('footer.information.title')}
                            </h3>
                            <ul>
                                <li>
                                    <a href="/terms-of-use" className="hover:underline text-[#c3ebee] font-[IBMPlexMono-Regular] text-base">
                                        {t('footer.information.termsOfUse')}
                                    </a>
                                </li>
                                <li>
                                    <a href="/privacy-policy" className="hover:underline text-[#c3ebee] font-[IBMPlexMono-Regular] text-base">
                                        {t('footer.information.privacyPolicy')}
                                    </a>
                                </li>
                                <li>
                                    <a href="/cookie-policy" className="hover:underline text-[#c3ebee] font-[IBMPlexMono-Regular] text-base">
                                        {t('footer.information.cookiePolicy')}
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Contact section */}
                        <div className="mt-4 md:mt-0 text-left xl:mr-24 md:mr-0 md:ml-0 xl:ml-20">
                            <h3 className="font-bold mb-2 text-[#FFFFFF] font-[IBMPlexMono-Regular] text-base">
                                {t('footer.connection.title')}
                            </h3>
                            <a href={`tel:${t('footer.connection.phone')}`} className="hover:underline text-[#c3ebee] font-[IBMPlexMono-Regular] text-base">
                                {t('footer.connection.phone')}
                            </a><br/>
                            <a href={`mailto:${t('footer.connection.email')}`} className="hover:underline text-[#c3ebee] font-[IBMPlexMono-Regular] text-base">
                                {t('footer.connection.email')}
                            </a>
                            <div className="mt-2 flex justify-start space-x-4">
                                <a href="#" aria-label="Facebook">
                                    <FontAwesomeIcon icon={['fab', 'facebook-f']} style={{color: "#ffffff"}}/>
                                </a>
                                <a href="#" aria-label="Instagram">
                                    <FontAwesomeIcon icon={['fab', 'instagram']} style={{color: "#ffffff"}}/>
                                </a>
                                <a href="#" aria-label="Twitter">
                                    <FontAwesomeIcon icon={['fab', 'x-twitter']} style={{color: "#ffffff"}}/>
                                </a>
                                <a href="#" aria-label="Telegram">
                                    <FontAwesomeIcon icon={['fab', 'telegram-plane']} style={{color: "#ffffff"}}/>
                                </a>
                            </div>
                        </div>
                    </div>

                    <hr className="border-t border-[#87d7de] w-[110%] border-2 mt-6 mb-4"/>

                    <div className="text-left text-[#ffffff] font-[IBMPlexMono-Regular] text-base">
                        {t('footer.copyright')}
                    </div>
                    <div className="text-right text-[#c3ebee] font-[IBMPlexMono-Regular] text-base -mt-[1vh] -mr-[10%]">
                        <LanguageSelector/>
                    </div>
                </>
            )}
        </footer>
    );
};

export default Footer;