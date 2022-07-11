export interface ColumnProps {
    _id: number;
    title: string;
    des: string;
    imgUrl: string
  }
// 每个人的专栏文章
export interface PostProps {
    _id: number,
    title: string,
    content: string,
    imgUrl?: string,
    createTime?: string,
    columnId: string
    editer?: string,
    excerpt:string
}
// 专栏列表
/* export const testData:ColumnProps[] = [
  {
    id: 1,
    title: 'hh1',
    description: '这是hh的专栏，有一段非常有意思的简介，记得更新一下，这是hh的专栏，有一段非常有意思的简介，记得更新一下',
    avatar: 'https://s3.bmp.ovh/imgs/2022/06/16/bc24f2669ca27576.webp'
  },
  {
    id: 2,
    title: 'hh2',
    description: '这是hh的专栏，有一段非常有意思的简介，记得更新一下',
    avatar: ''
  },
  {
    id: 3,
    title: 'hh3',
    description: '这是hh的专栏，有一段非常有意思的简介，记得更新一下',
    avatar: ''
  },
  {
    id: 3,
    title: 'hh3',
    description: '这是hh的专栏，有一段非常有意思的简介，记得更新一下',
    avatar: ''
  }
]
export const testPosts: PostProps[] = [
  {
    id: 1,
    title: '这是我的第一篇文章',
    content: '"this is a new post you Very often we will need to map routes with the given pattern to the same component. For example we may have a User component which should be rendered for all users but with dif..."',
    image: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee1980819f4ae08ac78d458.png?x-oss-process=image/resize,m_fill,m_pad,w_200,h_110',
    createdAt: '2020-06-11 10:34:22',
    columnId: 1
  },
  {
    id: 1,
    title: '这是我的第二篇文章',
    content: '"this is a new post you Very often we will need to map routes with the given pattern to the same component. For example we may have a User component which should be rendered for all users but with dif..."',
    createdAt: '2020-06-11 10:34:22',
    columnId: 1
  }
] */
