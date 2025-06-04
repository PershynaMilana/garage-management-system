import React from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarehouse } from '@fortawesome/free-solid-svg-icons';

const GarageManagementHeader: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="mb-4 md:mb-8">
            <h1 className="text-[24pt] md:text-[36pt] font-[IBMPlexMono-Regular] text-left ml-0 md:ml-[12vw] mb-2 md:mb-4 text-white">
                {t('garageManagement.header.title')}
            </h1>
            <h2 className="text-[16pt] md:text-[20pt] font-[Ubuntu-Regular] text-left ml-0 md:ml-[12vw] text-white/70">
                {t('garageManagement.header.description')}
            </h2>
        </div>
    );
};

export default GarageManagementHeader;