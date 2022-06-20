import { createI18n } from 'vue-i18n'
import zh from './zh'
import en from './en-us'

// 实例化I18n
const i18n = createI18n({
    legacy: false,
    locale: "zh",
    messages: {
        zh,
        en
    }
})

export default i18n