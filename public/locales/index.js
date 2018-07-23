export default {
  'zh-CN': {
    base: Object.assign(
      {},
      require('./zh-CN/base'),
      require('./zh-CN/home'),
      require('./zh-CN/news'),
      require('./zh-CN/product')
    ),
  },
  en: {
    base: Object.assign(
      {},
      require('./zh-CN/base'),
      require('./zh-CN/home'),
      require('./zh-CN/news')
    ),
  },
}
