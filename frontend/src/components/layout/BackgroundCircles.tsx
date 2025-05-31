import React from 'react';
import circle1 from '../../assets/images/circle-1.png';
import circle2 from '../../assets/images/circle-2.png';
import circle3 from '../../assets/images/circle-3.png';

interface BackgroundCirclesProps {}

const BackgroundCircles: React.FC<BackgroundCirclesProps> = () => {
    return (
        <>
            {/* Circle 1 - Right Top */}
            <img
                src={circle1}
                alt=""
                className="fixed top-0 right-0 w-32 h-32 sm:w-64 sm:h-64 md:w-48 md:h-48 xl:w-64 xl:h-64
                            z-0 opacity-60 pointer-events-none"
            />

            {/* Circle 2 - Left Center */}
            <img
                src={circle2}
                alt=""
                className="fixed left-0 top-1/2 -translate-y-1/2 w-32 h-32 sm:w-64 sm:h-64 md:w-48 md:h-48 xl:w-64 xl:h-64
                            z-0 opacity-60 pointer-events-none"
            />

            {/* Circle 3 - Right Bottom */}
            <img
                src={circle3}
                alt=""
                className="fixed bottom-0 right-0 w-32 h-32 sm:w-64 sm:h-64 md:w-48 md:h-48 xl:w-64 xl:h-64
                            z-0 opacity-60 pointer-events-none"
            />
        </>
    );
};

export default BackgroundCircles;