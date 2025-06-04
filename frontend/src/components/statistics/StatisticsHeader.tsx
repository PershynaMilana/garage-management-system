import React from "react";
import { useTranslation } from 'react-i18next';

const StatisticsHeader: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="mb-12 xl:mt-[10vh] sm:mt-[5vh] ">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wider text-almost-white mb-6 font-mono">
                {t('statistics.header.title')}
            </h1>
            <p className="text-[#87d7de] text-base max-w-3xl leading-relaxed font-light">
                {t('statistics.header.description')}
            </p>
        </div>
    );
};

export default StatisticsHeader;