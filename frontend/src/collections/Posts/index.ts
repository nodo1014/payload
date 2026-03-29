import type { CollectionConfig } from 'payload'
import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '../../fields/meta'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    defaultColumns: ['title', 'category', 'views', 'createdAt'],
    useAsTitle: 'title',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: '제목',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      label: '게시판 카테고리',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: '내용',
    },
    {
      name: 'views',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
      },
      label: '조회수',
    },
    {
      name: 'isNotice',
      type: 'checkbox',
      defaultValue: false,
      label: '공지사항 여부',
    },
    {
      name: 'aiSummary',
      type: 'textarea',
      admin: {
        description: 'FastAPI가 자동으로 생성하는 요약입니다.',
        readOnly: true,
      },
      label: 'AI 요약',
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      label: '작성자',
    },
    {
      name: 'files',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      label: '첨부파일',
    },
  ],
}
