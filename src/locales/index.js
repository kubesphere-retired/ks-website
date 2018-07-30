export default {
  'zh-CN': {
    base: Object.assign(
      {},
      require('./zh-CN/base'),
      require('./zh-CN/home'),
      require('./zh-CN/install')
    ),
  },
  en: {
    base: Object.assign({}, require('./en/base')),
  },
}
