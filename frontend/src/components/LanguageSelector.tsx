import {useTranslation} from "react-i18next";
import EngImg from '../assets/images/eng_img.png';
import UkrImg from '../assets/images/ukr_img.png';
function LanguageSelector() {
    const { i18n } = useTranslation();

    const changeLanguage = (lng : string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div>
            <button className="mr-[1vh]" onClick={() => changeLanguage('en')}><img src={EngImg} alt="engImg"/></button>
            <button onClick={() => changeLanguage('uk')}><img src={UkrImg} alt="engImg"/></button>
        </div>
    );
}

export default LanguageSelector;