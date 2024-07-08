import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Fatranslator from './TranslateToFa.json'
import Entranslator from './TranslateToEn.json'



 i18n.use(initReactI18next).init({
    resources:{
        ir:{translation:Fatranslator},
        eng:{translation:Entranslator},

    },
    lng:'ir',
    fallbackLng:'ir',
    interpolation:{escapeValue:false}
 })


 export default i18n