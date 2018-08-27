export default {
  'zh-CN': {
    base: Object.assign(
      {},
      require('./zh-CN/base'),
      require('./zh-CN/home'),
      require('./zh-CN/install'),
      require('./zh-CN/download'),
    ),
  },
  en: {
    base: Object.assign({}, require('./en/base')),
  },
}
