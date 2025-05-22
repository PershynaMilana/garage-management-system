import React from 'react';
import PageLayout from "../../components/PageLayout";

const MainPage: React.FC = () => {
    return (
        <PageLayout>
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-h1 sm:text-relative-h1 font-ubuntuRegular text-almost-white">
                    Hello!
                </h1>
            </div>
        </PageLayout>
    );
};

export default MainPage;