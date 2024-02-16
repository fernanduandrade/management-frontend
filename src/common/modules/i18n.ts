import { createI18n } from 'vue-i18n'
import { UserModule } from '~/types'

const messages = Object.fromEntries(
  Object.entries(
    import.meta.globEager('../../../locales/*.y(a)?ml'))
    .map(([key, value]) => {
      const yaml = key.endsWith('.yaml')
      return [key.slice(17, yaml ? -5 : -4), value.default]
    }),
)

export const install: UserModule = ({ app }) => {
  const i18n = createI18n({
    legacy: false,
    locale: 'pt',
    messages,
  })

  app.use(i18n)
}
