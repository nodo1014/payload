import type { Post } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'
import React from 'react'
import { Eye, User, Calendar, ArrowLeft, MoreHorizontal, MessageSquare, ThumbsUp, Send } from 'lucide-react'
import RichText from '@/components/RichText'

export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{
    slug: string
  }>
}

export default async function BoardDetailPage({ params: paramsPromise }: Args) {
  const { slug: id } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  try {
    const post = (await payload.findByID({
      collection: 'posts',
      id,
    })) as unknown as Post

    if (!post) return notFound()

    return (
      <div className="container mx-auto px-4 py-32 sm:py-40">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="flex justify-between items-center mb-8">
            <Link
              href="/board"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              목록으로 돌아가기
            </Link>
            <div className="flex items-center space-x-3">
              <button className="p-2 hover:bg-muted rounded-full transition-colors"><MoreHorizontal className="w-5 h-5" /></button>
            </div>
          </div>

          <header className="space-y-8 bg-card/60 backdrop-blur-lg border border-border/80 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
             
             {post.isNotice && (
               <span className="inline-flex px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-black uppercase tracking-widest ring-1 ring-primary/40 mb-4 animate-pulse">
                 NOTICE
               </span>
             )}
             
             <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight text-foreground/95">
                {post.title}
             </h1>

             <div className="flex flex-wrap items-center justify-between pt-8 border-t border-border/40 gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-xl shadow-primary/20">
                     {post.author && typeof post.author === 'object' ? post.author.name?.[0] : <User className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground truncate max-w-[150px]">
                      {post.author && typeof post.author === 'object' ? post.author.name || post.author.email : '익명'}
                    </h3>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1.5" />
                      {format(new Date(post.createdAt), 'yyyy.MM.dd HH:mm')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-muted-foreground text-sm bg-muted/20 px-4 py-2 rounded-full border border-border/50">
                   <Eye className="w-4 h-4" />
                   <span>조회 {post.views || 0}</span>
                </div>
             </div>
          </header>

          {post.aiSummary && (
            <div className="relative p-10 bg-primary/5 rounded-[2.5rem] border border-primary/20 shadow-inner group overflow-hidden">
               <div className="absolute top-0 left-0 w-1 h-full bg-primary/50"></div>
               <h4 className="flex items-center text-sm font-black text-primary uppercase tracking-[0.2em] mb-4">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  AI Summary
               </h4>
               <p className="text-lg leading-relaxed text-foreground/80 italic font-medium">
                  "{post.aiSummary}"
               </p>
            </div>
          )}

          <article className="prose prose-lg dark:prose-invert max-w-none px-4 text-foreground/90 leading-[1.8]">
             {post.content && <RichText data={post.content as any} />}
          </article>

          <div className="pt-12 border-t border-border/50 flex flex-wrap justify-between items-center gap-6">
             <div className="flex items-center space-x-3 text-muted-foreground text-sm">
                <div className="flex items-center space-x-1.5 bg-muted/30 px-3 py-1.5 rounded-lg border border-border/40 hover:text-primary cursor-pointer transition-colors">
                   <ThumbsUp className="w-4 h-4" />
                   <span>추천 0</span>
                </div>
                <div className="flex items-center space-x-1.5 bg-muted/30 px-3 py-1.5 rounded-lg border border-border/40 hover:text-primary cursor-pointer transition-colors">
                   <MessageSquare className="w-4 h-4" />
                   <span>댓글 0</span>
                </div>
             </div>
             
             <div className="flex space-x-2">
                <Link href="/board" className="px-6 py-2.5 rounded-full border border-border font-bold hover:bg-muted transition-colors">목록</Link>
             </div>
          </div>

          <section className="mt-20 pt-16 border-t-4 border-muted space-y-10">
             <h3 className="text-2xl font-bold flex items-center px-2">
                댓글 <span className="ml-2 text-primary">0</span>
             </h3>
             
             <div className="bg-muted/20 p-8 rounded-[2rem] border border-border/80 shadow-md">
                <div className="flex items-start space-x-4">
                   <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center shrink-0">
                      <User className="w-5 h-5 text-muted-foreground" />
                   </div>
                   <div className="flex-1 space-y-4">
                      <textarea 
                        className="w-full bg-transparent border-none focus:ring-0 text-foreground placeholder:text-muted-foreground resize-none text-lg h-24 shadow-none outline-none"
                        placeholder="이 게시물에 대한 생각을 공유해주세요..."
                      ></textarea>
                      <div className="flex justify-between items-center pt-4 border-t border-border/50">
                         <span className="text-xs text-muted-foreground">매너 있는 댓글은 작성자에게 큰 힘이 됩니다.</span>
                         <button className="flex items-center space-x-2 px-6 py-2 bg-primary text-primary-foreground rounded-xl font-bold text-sm shadow-md hover:scale-105 transition-transform">
                            <span>등록</span>
                            <Send className="w-3.5 h-3.5" />
                         </button>
                      </div>
                   </div>
                </div>
             </div>
          </section>

        </div>
      </div>
    )
  } catch (error) {
    console.error('Board detail error:', error)
    return notFound()
  }
}
