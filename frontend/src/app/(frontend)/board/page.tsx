import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'
import { format } from 'date-fns'
import { Eye, User, Calendar, MessageSquare, Plus } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function BoardPage() {
  const payload = await getPayload({ config: configPromise })
  
  const posts = await payload.find({
    collection: 'posts',
    sort: '-createdAt',
    limit: 100,
  })

  return (
    <div className="container mx-auto px-4 py-24 sm:py-32">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl mb-4">
              커뮤니티 <span className="text-primary">게시판</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              다양한 의견을 나누고 소통하는 공간입니다.
            </p>
          </div>
          <Link
            href="/board/create"
            className="inline-flex items-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-lg hover:shadow-primary/20 hover:scale-105 transition-all duration-300 group"
          >
            <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
            글쓰기
          </Link>
        </div>

        <div className="overflow-hidden bg-card/50 backdrop-blur-md border border-border/50 rounded-3xl shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/50 text-muted-foreground text-sm uppercase tracking-wider">
                <th className="px-6 py-5 font-semibold w-16 text-center">번호</th>
                <th className="px-6 py-5 font-semibold">제목</th>
                <th className="px-6 py-5 font-semibold w-32">작성자</th>
                <th className="px-6 py-5 font-semibold w-40">날짜</th>
                <th className="px-6 py-5 font-semibold w-24 text-center">조회</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {posts.docs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center text-muted-foreground italic">
                    등록된 게시물이 없습니다.
                  </td>
                </tr>
              ) : (
                posts.docs.map((post: any, index: number) => {
                  const isNotice = post.isNotice
                  return (
                    <tr
                      key={post.id}
                      className={`group hover:bg-muted/30 transition-colors duration-200 cursor-pointer ${
                        isNotice ? 'bg-primary/5' : ''
                      }`}
                    >
                      <td className="px-6 py-5 text-center text-sm font-medium text-muted-foreground">
                        {isNotice ? (
                          <span className="inline-flex px-2.5 py-1 rounded-md bg-primary/20 text-primary text-xs font-bold ring-1 ring-inset ring-primary/30">
                            공지
                          </span>
                        ) : (
                          posts.totalDocs - index
                        )}
                      </td>
                      <td className="px-6 py-5">
                        <Link href={`/board/${post.id}`} className="block">
                          <div className="flex items-center space-x-2">
                            <span className={`text-base font-semibold group-hover:text-primary transition-colors ${
                              isNotice ? 'text-foreground' : 'text-foreground/90'
                            }`}>
                              {post.title}
                            </span>
                            {/* Comments Count Placeholder */}
                            <span className="inline-flex items-center space-x-1 text-xs text-muted-foreground bg-muted/60 px-1.5 py-0.5 rounded">
                              <MessageSquare className="w-3 h-3" />
                              <span>0</span>
                            </span>
                          </div>
                          {post.aiSummary && (
                            <p className="text-xs text-muted-foreground/70 mt-1 line-clamp-1 italic">
                              {post.aiSummary}
                            </p>
                          )}
                        </Link>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center space-x-2 text-sm text-foreground/80">
                          <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center border border-border">
                            <User className="w-3 h-3" />
                          </div>
                          <span className="truncate max-w-[100px]">
                            {post.author?.name || post.author?.email || '익명'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{format(new Date(post.createdAt), 'yyyy.MM.dd')}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <div className="inline-flex items-center space-x-1 text-sm text-muted-foreground bg-muted/30 px-2 py-1 rounded-full">
                          <Eye className="w-3.5 h-3.5" />
                          <span>{post.views || 0}</span>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Placeholder */}
        <div className="mt-10 flex justify-center space-x-2">
           <button className="px-4 py-2 bg-card border border-border rounded-lg text-sm disabled:opacity-50">이전</button>
           <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-bold text-sm shadow-md">1</button>
           <button className="px-4 py-2 bg-card border border-border rounded-lg text-sm">다음</button>
        </div>
      </div>
    </div>
  )
}
