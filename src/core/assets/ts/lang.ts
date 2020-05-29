import {GlobalLocale, I18nOption} from '@corets/type'
import arEG from 'ant-design-vue/lib/locale-provider/ar_EG'
import bgBG from 'ant-design-vue/lib/locale-provider/bg_BG'
import caES from 'ant-design-vue/lib/locale-provider/ca_ES'
import csCZ from 'ant-design-vue/lib/locale-provider/cs_CZ'
import daDK from 'ant-design-vue/lib/locale-provider/da_DK'
import deDE from 'ant-design-vue/lib/locale-provider/de_DE'
import elGR from 'ant-design-vue/lib/locale-provider/el_GR'
import enUS from 'ant-design-vue/lib/locale-provider/en_US'
import esES from 'ant-design-vue/lib/locale-provider/es_ES'
import etEE from 'ant-design-vue/lib/locale-provider/et_EE'
import faIR from 'ant-design-vue/lib/locale-provider/fa_IR'
import fiFI from 'ant-design-vue/lib/locale-provider/fi_FI'
import frBE from 'ant-design-vue/lib/locale-provider/fr_BE'
import frFR from 'ant-design-vue/lib/locale-provider/fr_FR'
import hiIN from 'ant-design-vue/lib/locale-provider/hi_IN'
import hrHR from 'ant-design-vue/lib/locale-provider/hr_HR'
import huHU from 'ant-design-vue/lib/locale-provider/hu_HU'
import hyAM from 'ant-design-vue/lib/locale-provider/hy_AM'
import idID from 'ant-design-vue/lib/locale-provider/id_ID'
import isIS from 'ant-design-vue/lib/locale-provider/is_IS'
import itIT from 'ant-design-vue/lib/locale-provider/it_IT'
import jaJP from 'ant-design-vue/lib/locale-provider/ja_JP'
import knIN from 'ant-design-vue/lib/locale-provider/kn_IN'
import koKR from 'ant-design-vue/lib/locale-provider/ko_KR'
import lvLV from 'ant-design-vue/lib/locale-provider/lv_LV'
import mkMK from 'ant-design-vue/lib/locale-provider/mk_MK'
import nlNL from 'ant-design-vue/lib/locale-provider/nl_NL'
import plPL from 'ant-design-vue/lib/locale-provider/pl_PL'
import ptPT from 'ant-design-vue/lib/locale-provider/pt_PT'
import roRO from 'ant-design-vue/lib/locale-provider/ro_RO'
import ruRU from 'ant-design-vue/lib/locale-provider/ru_RU'
import skSK from 'ant-design-vue/lib/locale-provider/sk_SK'
import slSI from 'ant-design-vue/lib/locale-provider/sl_SI'
import srRS from 'ant-design-vue/lib/locale-provider/sr_RS'
import svSE from 'ant-design-vue/lib/locale-provider/sv_SE'
import taIN from 'ant-design-vue/lib/locale-provider/ta_IN'
import thTH from 'ant-design-vue/lib/locale-provider/th_TH'
import trTR from 'ant-design-vue/lib/locale-provider/tr_TR'
import ukUA from 'ant-design-vue/lib/locale-provider/uk_UA'
import viVN from 'ant-design-vue/lib/locale-provider/vi_VN'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import zhTW from 'ant-design-vue/lib/locale-provider/zh_TW'
import customArEG from '@locale/ar_EG.ts'
import customBgBG from '@locale/bg_BG.ts'
import customCaES from '@locale/ca_ES.ts'
import customCsCZ from '@locale/cs_CZ.ts'
import customDaDK from '@locale/da_DK.ts'
import customDeDE from '@locale/de_DE.ts'
import customElGR from '@locale/el_GR.ts'
import customEnUS from '@locale/en_US.ts'
import customEsES from '@locale/es_ES.ts'
import customEtEE from '@locale/et_EE.ts'
import customFaIR from '@locale/fa_IR.ts'
import customFiFI from '@locale/fi_FI.ts'
import customFrBE from '@locale/fr_BE.ts'
import customFrFR from '@locale/fr_FR.ts'
import customHiIN from '@locale/hi_IN.ts'
import customHrHR from '@locale/hr_HR.ts'
import customHuHU from '@locale/hu_HU.ts'
import customHyAM from '@locale/hy_AM.ts'
import customIdID from '@locale/id_ID.ts'
import customIsIS from '@locale/is_IS.ts'
import customItIT from '@locale/it_IT.ts'
import customJaJP from '@locale/ja_JP.ts'
import customKnIN from '@locale/kn_IN.ts'
import customKoKR from '@locale/ko_KR.ts'
import customLvLV from '@locale/lv_LV.ts'
import customMkMK from '@locale/mk_MK.ts'
import customNlNL from '@locale/nl_NL.ts'
import customPlPL from '@locale/pl_PL.ts'
import customPtPT from '@locale/pt_PT.ts'
import customRoRO from '@locale/ro_RO.ts'
import customRuRU from '@locale/ru_RU.ts'
import customSkSK from '@locale/sk_SK.ts'
import customSlSI from '@locale/sl_SI.ts'
import customSrRS from '@locale/sr_RS.ts'
import customSvSE from '@locale/sv_SE.ts'
import customTaIN from '@locale/ta_IN.ts'
import customThTH from '@locale/th_TH.ts'
import customTrTR from '@locale/tr_TR.ts'
import customUkUA from '@locale/uk_UA.ts'
import customViVN from '@locale/vi_VN.ts'
import customZhCN from '@locale/zh_CN.ts'
import customZhTW from '@locale/zh_TW.ts'

const CACHE_LOCALE = localStorage.getItem('nearAdminLang') || 'zh-cn'

const globalLocaleObj: GlobalLocale = {
    [arEG.locale]: arEG,
    [bgBG.locale]: bgBG,
    [caES.locale]: caES,
    [csCZ.locale]: csCZ,
    [daDK.locale]: daDK,
    [deDE.locale]: deDE,
    [elGR.locale]: elGR,
    [enUS.locale]: enUS,
    [esES.locale]: esES,
    [etEE.locale]: etEE,
    [faIR.locale]: faIR,
    [fiFI.locale]: fiFI,
    [frBE.locale]: frBE,
    [frFR.locale]: frFR,
    [hiIN.locale]: hiIN,
    [hrHR.locale]: hrHR,
    [huHU.locale]: huHU,
    [hyAM.locale]: hyAM,
    [idID.locale]: idID,
    [isIS.locale]: isIS,
    [itIT.locale]: itIT,
    [jaJP.locale]: jaJP,
    [knIN.locale]: knIN,
    [koKR.locale]: koKR,
    [lvLV.locale]: lvLV,
    [mkMK.locale]: mkMK,
    [nlNL.locale]: nlNL,
    [plPL.locale]: plPL,
    [ptPT.locale]: ptPT,
    [roRO.locale]: roRO,
    [ruRU.locale]: ruRU,
    [skSK.locale]: skSK,
    [slSI.locale]: slSI,
    [srRS.locale]: srRS,
    [svSE.locale]: svSE,
    [taIN.locale]: taIN,
    [thTH.locale]: thTH,
    [trTR.locale]: trTR,
    [ukUA.locale]: ukUA,
    [viVN.locale]: viVN,
    [zhCN.locale]: zhCN,
    [zhTW.locale]: zhTW
}

const i18nOpt: I18nOption = {
    locale: CACHE_LOCALE,
    messages: {
        [arEG.locale]: customArEG,
        [bgBG.locale]: customBgBG,
        [caES.locale]: customCaES,
        [csCZ.locale]: customCsCZ,
        [daDK.locale]: customDaDK,
        [deDE.locale]: customDeDE,
        [elGR.locale]: customElGR,
        [enUS.locale]: customEnUS,
        [esES.locale]: customEsES,
        [etEE.locale]: customEtEE,
        [faIR.locale]: customFaIR,
        [fiFI.locale]: customFiFI,
        [frBE.locale]: customFrBE,
        [frFR.locale]: customFrFR,
        [hiIN.locale]: customHiIN,
        [hrHR.locale]: customHrHR,
        [huHU.locale]: customHuHU,
        [hyAM.locale]: customHyAM,
        [idID.locale]: customIdID,
        [isIS.locale]: customIsIS,
        [itIT.locale]: customItIT,
        [jaJP.locale]: customJaJP,
        [knIN.locale]: customKnIN,
        [koKR.locale]: customKoKR,
        [lvLV.locale]: customLvLV,
        [mkMK.locale]: customMkMK,
        [nlNL.locale]: customNlNL,
        [plPL.locale]: customPlPL,
        [ptPT.locale]: customPtPT,
        [roRO.locale]: customRoRO,
        [ruRU.locale]: customRuRU,
        [skSK.locale]: customSkSK,
        [slSI.locale]: customSlSI,
        [srRS.locale]: customSrRS,
        [svSE.locale]: customSvSE,
        [taIN.locale]: customTaIN,
        [thTH.locale]: customThTH,
        [trTR.locale]: customTrTR,
        [ukUA.locale]: customUkUA,
        [viVN.locale]: customViVN,
        [zhCN.locale]: customZhCN,
        [zhTW.locale]: customZhTW
    }
}

export default {
    globalLocaleObj,
    i18nOpt
}
