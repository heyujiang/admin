const base = {
  style: 0,
  margin: true,
  bg: 1,
  bt: 1,
  bc: '#ffffff',
  bi: '',
  fc: ''
}
const text = {
  subtitle: '',
  miaoshu: '',
  show: true,
  defaultstyle: false,
  fontsize: 14,
  color: '#333333',
  bold: false,
  italics: false,
  underline: false
}

const link = {
  ptype: '',
  miaoshu: '',
  id: '',
  path: '',
  zdyLinktype: '',
  zdyappid: ''
}
const defaultimg = require('@/assets/diy/img.jpg')
const icontext = [{
  open: true,
  link: link,
  icon: {
    style: 3,
    pic: defaultimg,
    custompic: ''
  },
  text: {
    prompt: '导航名称',
    txt: '标题名称',
    ...text
  }
}]

// 幻灯片
const bannertext = [{
  open: true,
  link: link,
  img: '',
  text: {
    prompt: '图文名称',
    title: '',
    ...text
  }
}]

// 多功能列表
const imgtext = [{
  open: true,
  link: link,
  img: '',
  text: {
    prompt: '图文名称',
    txt: '标题名称',
    ...text
  }
}]

const shop = {
  open: true,
  cm: {}
}

const pageData = [{
  name: '幻灯片组',
  pic: 'banner.png',
  type: 'banner',
  base: {
    paddingTop: 0,
    ...base
  },
  max: 12,
  list: [...bannertext, ...bannertext, ...bannertext]
},
/**
   * 搜索框模块
   * name 名称 ｜ type tuwen 标识 ｜ base 基础样式 ｜ title 标题 ｜ list 列表 | max 最多添加6｜
   */
{
  name: '搜索框',
  pic: 'search.png',
  type: 'search',
  params: {
    placeholder: '请输入关键字进行搜索',
    hotkey: '请输入热搜关键字,词与词用空格分开'
  },
  base: {
    textAlign: 'center',
    searchStyle: 'round',
    is_hotkey: 0,
    is_location: 1,
    hotkeytxtColor: '#666666',
    style: 0,
    margin: true,
    bg: 2,
    bt: 1,
    bc: '#f1f1f2',
    bi: '',
    fc: ''
  }
},
/**
   * 导航模块
   * name 导航名称 ｜ type navBar 导航标识 ｜ base 基础样式 ｜ list 导航列表 | max 最多添加15｜
   */
{
  name: '导航组',
  pic: 'navBar.png',
  type: 'navBar',
  base: {
    column: 4,
    paddingTop: 0,
    ...base
  },
  max: 15,
  list: [...icontext, ...icontext, ...icontext, ...icontext, ...icontext, ...icontext, ...icontext, ...icontext]
},
/**
   * 商品模块
   * name 名称 ｜ type goods 标识 ｜ base 基础样式 ｜ title 标题 ｜ list 商品列表 | max 最多添加4｜
   */
{
  name: '商品组',
  pic: 'goods.png',
  type: 'goods',
  title: { title: { prompt: '模块标题', txt: '商品模块标题', ...text }, more: { prompt: '更多文字', txt: '更多', ...text }, link: link },
  base: {
    text: {
      prompt: '商品标题',
      txt: '商品标题名称',
      ...text
    },
    paddingTop: 0,
    column: 2,
    source: 'choice', // choice; auto
    auto: {
      category: 0,
      goodsSort: 'all', // all; sales; price
      showNum: 6
    },
    display: 'list', // list; slide
    sth: false,
    sjg: true,
    sgm: false,
    sjs: false,
    ...base
  },
  max: 12,
  list: []
},
/**
   * 拼团模块
   * name 名称 ｜ type goods 标识 ｜ base 基础样式 ｜ title 标题 ｜ list 商品列表 | max 最多添加4｜
   */
{
  name: '拼团组',
  pic: 'tuan.png',
  type: 'tuan',
  title: { title: { prompt: '模块标题', txt: '超值拼团', ...text }, more: { prompt: '更多文字', txt: '更多', ...text }},
  base: {
    text: {
      prompt: '商品标题',
      txt: '商品标题名称',
      ...text
    },
    paddingTop: 0,
    column: 2,
    source: 'choice', // choice; auto
    auto: {
      category: 0,
      goodsSort: 'all', // all; sales; price
      showNum: 6
    },
    display: 'list', // list; slide
    sth: false,
    sjg: true,
    sgm: false,
    sjs: false,
    ...base
  },
  max: 12,
  list: []
},
/**
   * 秒杀模块
   * name 名称 ｜ type goods 标识 ｜ base 基础样式 ｜ title 标题 ｜ list 商品列表 | max 最多添加4｜
   */
{
  name: '秒杀组',
  pic: 'miaosha.png',
  type: 'miaosha',
  title: { title: { prompt: '模块标题', txt: '超值拼团', ...text }, more: { prompt: '更多文字', txt: '更多', ...text }},
  base: {
    text: {
      prompt: '商品标题',
      txt: '商品标题名称',
      ...text
    },
    paddingTop: 0,
    column: 2,
    source: 'choice', // choice; auto
    auto: {
      category: 0,
      goodsSort: 'all', // all; sales; price
      showNum: 6
    },
    display: 'list', // list; slide
    sth: false,
    sjg: true,
    sgm: false,
    sjs: false,
    ...base
  },
  max: 12,
  list: []
},
/**
   * 师傅模块
   * name 名称 ｜ type technical 标识 ｜ base 基础样式 ｜ title 标题 ｜ list 列表 | max 最多添加4｜
   */
{
  name: '师傅组',
  pic: 'technical.png',
  type: 'technical',
  v3: 1,
  base: {
    text: {
      prompt: '标题',
      txt: '标题名称',
      ...text
    },
    paddingTop: 0,
    column: 2,
    source: 'choice', // choice; auto
    auto: {
      category: 0,
      goodsSort: 'all', // all; sales; price
      showNum: 6
    },
    display: 'list', // list; slide
    sjs: false,
    ...base
  },
  max: 12,
  list: []
},

/**
   * 优惠券组模块
   * name 名称 ｜ type tuwen 标识 ｜ base 基础样式 ｜ title 标题 ｜ list 列表 | max 最多添加6｜
   */
{
  name: '优惠券组',
  pic: 'coupon.png',
  type: 'coupon',
  base: {
    paddingTop: 10,
    ...base
  },
  max: 5,
  list: [{
    color: 'red',
    reduce_price: '10',
    min_price: '100.00'
  },
  {
    color: 'violet',
    reduce_price: '10',
    min_price: '100.00'
  }
  ]
},
/**
   * 多功能模块
   * name 名称 ｜ type duo 标识 ｜ base 基础样式 ｜ title 标题 ｜ list 列表 | max 最多添加12｜ title  t标题 m更多 link连接
   */
{
  name: '图片橱窗',
  pic: 'window.png',
  type: 'window',
  base: {
    paddingTop: 0,
    paddingLeft: 0,
    ...base
  },
  max: 4,
  list: [...bannertext, ...bannertext, ...bannertext, ...bannertext]
},
/**
   * 多功能模块
   * name 名称 ｜ type duo 标识 ｜ base 基础样式 ｜ title 标题 ｜ list 列表 | max 最多添加12｜ title  t标题 m更多 link连接
   */
{
  name: '多图组',
  pic: 'duo.png',
  type: 'duo',
  base: {
    column: 4,
    display: 'list', // list; slide
    borderradius: 0, // 圆角
    ...base
  },
  max: 12,
  list: [...imgtext, ...imgtext, ...imgtext, ...imgtext, ...imgtext, ...imgtext, ...imgtext, ...imgtext]
},
/**
   * 图文模块
   * name 名称 ｜ type tuwen 标识 ｜ base 基础样式 ｜ title 标题 ｜ list 列表 | max 最多添加6｜
   */
{
  name: '单图组',
  pic: 'imageSingle.png',
  type: 'imageSingle',
  base: {
    paddingTop: 0,
    paddingLeft: 0,
    ...base
  },
  img: '',
  link: link
},
/**
   * 视频模块
   * name 名称 ｜ type tuwen 标识 ｜ base 基础样式 ｜ title 标题 ｜ list 列表 | max 最多添加6｜
   */
{
  name: '视频组',
  pic: 'video.png',
  type: 'video',
  videoUrl: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400',
  base: {
    poster: 'video_bg.png',
    height: 235,
    paddingTop: 0,
    ...base
  }
},
/**
   * 视频模块
   * name 名称 ｜ type tuwen 标识 ｜ base 基础样式 ｜ title 标题 ｜ list 列表 | max 最多添加6｜
   */
{
  name: '公告组',
  pic: 'notice.png',
  type: 'notice',
  base: {
    icon: '',
    default_icon: 'notice_default.png',
    paddingTop: 5,
    ...base
  },
  text: {
    prompt: '公告内容',
    txt: '这里是第一条自定义公告',
    ...text
  }
},
/**
   * 图文模块
   * name 名称 ｜ type tuwen 标识 ｜ base 基础样式 ｜ title 标题 ｜ list 列表 | max 最多添加6｜
   */
{
  name: '图文组',
  pic: 'tuwen.png',
  type: 'tuwen',
  base: {
    sc: [{
      keys: 'style1',
      title: '样式1',
      pic: ''
    }, {
      keys: 'style2',
      title: '样式2',
      pic: ''
    }],
    ...base
  },
  title: {
    prompt: '模块标题',
    txt: '自义定模块标题',
    ...text
  },
  note: {
    prompt: '短文描述',
    txt: '描述文字',
    ...text
  },
  img: '',
  link: link
}
]

const pagebase = {
  name: '页面设置',
  type: 1,
  base: {
    titleTextColor: '#000000',
    titleBackgroundColor: '#ffffff',
    ...base
  },
  params: {
    share_title: '',
    title: '页面标题'
  }
}

export default {
  moduleNav: icontext,
  moduleShop: shop,
  moduleBanner: bannertext,
  moduleDuo: imgtext,
  pageData: pageData,
  pagebase: pagebase
}
