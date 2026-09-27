import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import {
  ArrowLeft, Clock, Eye, Share2, Bookmark, Tag, ChevronRight,
  MessageCircle, Sparkles, BadgeCheck, TrendingUp, Link2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PillarLayout from "@/components/optibis/PillarLayout";
import ViralogContentCard from "@/components/viralog/ViralogContentCard";
import ViralogAdSlot from "@/components/viralog/ViralogAdSlot";
import ViralogNewsletter from "@/components/viralog/ViralogNewsletter";
import {
  getContentBySlug,
  getRelatedContent,
  getAuthorBySlug,
  getCategoryBySlug,
  getTrendingContent,
  formatDate,
  formatViews,
} from "@/data/viralog";
import { useSafeNav } from "@/hooks/useSafeNav";

export default function ViralogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const nav = useSafeNav();
  const [bookmarked, setBookmarked] = useState(false);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  const content = getContentBySlug(slug);

  if (!content) {
    return (
      <PillarLayout>
        <div className="max-w-2xl mx-auto px-4 py-32 text-center">
          <h1 className="text-2xl font-extrabold text-navy mb-4">Konten tidak ditemukan</h1>
          <p className="text-muted-foreground mb-6">Konten yang Anda cari tidak tersedia atau telah dihapus.</p>
          <Button onClick={() => navigate("/content")} className="bg-magenta hover:bg-magenta-500 text-white rounded-full">
            Kembali ke VIRALOG
          </Button>
        </div>
      </PillarLayout>
    );
  }

  const cat = getCategoryBySlug(content.category_slug);
  const author = getAuthorBySlug(content.author_slug);
  const related = getRelatedContent(slug, 3);
  const trendingSidebar = getTrendingContent(5);
  const isVideo = content.content_type === "short_video" || content.content_type === "long_video" || content.content_type === "podcast";

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: content.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  return (
    <PillarLayout>
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
          <Link to="/content" className="hover:text-navy transition-colors">VIRALOG</Link>
          <ChevronRight className="w-3 h-3" />
          {cat && <Link to={`/kategori/${cat.slug}`} className="hover:text-navy transition-colors">{cat.name}</Link>}
          <ChevronRight className="w-3 h-3" />
          <span className="text-navy font-medium line-clamp-1">{content.title}</span>
        </nav>
      </div>

      {/* Article Top Ad */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <ViralogAdSlot placement="article_top" />
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {cat && (
              <Link to={`/kategori/${cat.slug}`} className={`px-3 py-1 rounded-full bg-${cat.color} text-white text-xs font-bold uppercase`}>
                {cat.name}
              </Link>
            )}
            {content.sponsored && (
              <span className="px-3 py-1 rounded-full bg-amber-400 text-navy text-xs font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Sponsored Content
              </span>
            )}
            {content.source_type === "rss" && (
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center gap-1">
                <Link2 className="w-3 h-3" /> Source: {content.source_name || "External"}
              </span>
            )}
            {content.ai_generated && (
              <span className="px-3 py-1 rounded-full bg-amethyst/10 text-amethyst text-xs font-bold flex items-center gap-1">
                <BadgeCheck className="w-3 h-3" /> AI Assisted
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy leading-tight mb-3">
            {content.title}
          </h1>
          {content.subtitle && (
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-5">{content.subtitle}</p>
          )}

          {/* Author + Meta */}
          <div className="flex flex-wrap items-center justify-between gap-3 py-4 border-y border-gray-100">
            <div className="flex items-center gap-3">
              {author?.avatar ? (
                <img src={author.avatar} alt={content.author_name} className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-navy-100 flex items-center justify-center">
                  <span className="text-sm font-bold text-navy">{content.author_name.charAt(0)}</span>
                </div>
              )}
              <div>
                <p className="text-sm font-semibold text-navy">{content.author_name}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{formatDate(content.publish_date)}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {content.read_time_minutes} min baca</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {formatViews(content.views)}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setBookmarked(!bookmarked)}
                className={`p-2 rounded-lg transition-colors ${bookmarked ? "bg-magenta text-white" : "bg-slate-50 text-navy hover:bg-magenta/10"}`}
              >
                <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-white" : ""}`} />
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-lg bg-slate-50 text-navy hover:bg-magenta/10 transition-colors"
              >
                {shared ? <BadgeCheck className="w-4 h-4 text-green-600" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Thumbnail / Video Embed */}
        {isVideo && content.embed_url ? (
          <div className="my-6 rounded-2xl overflow-hidden bg-navy aspect-video">
            <iframe
              src={content.embed_url}
              title={content.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="my-6 rounded-2xl overflow-hidden">
            <img src={content.thumbnail} alt={content.title} className="w-full h-auto object-cover" />
          </motion.div>
        )}

        {/* Article Body */}
        <div className="prose prose-sm sm:prose-base max-w-none mb-8">
          <ReactMarkdown
            components={{
              h2: ({ node, ...props }) => <h2 className="text-xl font-extrabold text-navy mt-6 mb-3" {...props} />,
              h3: ({ node, ...props }) => <h3 className="text-lg font-bold text-navy mt-5 mb-2" {...props} />,
              p: ({ node, ...props }) => <p className="text-sm sm:text-base text-navy-300 leading-relaxed mb-4" {...props} />,
              ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-4 space-y-1.5" {...props} />,
              ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-4 space-y-1.5" {...props} />,
              li: ({ node, ...props }) => <li className="text-sm sm:text-base text-navy-300 leading-relaxed" {...props} />,
              strong: ({ node, ...props }) => <strong className="font-bold text-navy" {...props} />,
              blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-magenta pl-4 italic text-navy-400 my-4" {...props} />,
            }}
          >
            {content.body}
          </ReactMarkdown>
        </div>

        {/* Article Middle Ad */}
        <div className="my-6">
          <ViralogAdSlot placement="article_middle" />
        </div>

        {/* CTA Block */}
        {content.cta_label && (
          <div className="my-8 bg-gradient-to-r from-navy to-navy-400 rounded-2xl p-6 text-center">
            <h3 className="text-lg font-bold text-white mb-2">{content.cta_label}</h3>
            <p className="text-sm text-white/60 mb-4">Tim Optibis siap membantu bisnis Anda berkembang.</p>
            {content.cta_type === "whatsapp" ? (
              <a href={content.cta_url || "https://wa.me/6287772577020"} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-green-500 hover:bg-green-600 text-white text-sm font-semibold transition-colors">
                <MessageCircle className="w-4 h-4" /> Chat WhatsApp
              </a>
            ) : (
              <Button onClick={() => nav(content.cta_url || "#konsultasi")} className="bg-magenta hover:bg-magenta-500 text-white rounded-full px-6">
                {content.cta_label}
              </Button>
            )}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 py-4 border-y border-gray-100">
          <Tag className="w-4 h-4 text-muted-foreground" />
          {content.tags.map((tag) => (
            <Link key={tag} to={`/search?q=${encodeURIComponent(tag)}`} className="px-2.5 py-1 rounded-lg bg-slate-50 text-xs font-medium text-navy-300 hover:bg-magenta hover:text-white transition-colors">
              {tag}
            </Link>
          ))}
        </div>

        {/* Author Profile */}
        {author && (
          <div className="my-6 bg-slate-50/50 rounded-2xl p-5 flex items-start gap-4">
            {author.avatar ? (
              <img src={author.avatar} alt={author.name} className="w-14 h-14 rounded-full object-cover shrink-0" />
            ) : (
              <div className="w-14 h-14 rounded-full bg-navy-100 flex items-center justify-center shrink-0">
                <span className="text-lg font-bold text-navy">{author.name.charAt(0)}</span>
              </div>
            )}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="font-bold text-navy">{author.name}</p>
                {author.role === "ai_agent" && (
                  <span className="px-2 py-0.5 rounded bg-amethyst/10 text-amethyst text-[10px] font-bold">AI</span>
                )}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{author.bio}</p>
            </div>
          </div>
        )}

        {/* Article Bottom Ad */}
        <div className="my-6">
          <ViralogAdSlot placement="article_bottom" />
        </div>

        {/* Share Bar */}
        <div className="flex items-center justify-between py-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Bagikan:</span>
            <button onClick={handleShare} className="p-2 rounded-lg bg-slate-50 text-navy hover:bg-magenta/10 transition-colors">
              {shared ? <BadgeCheck className="w-4 h-4 text-green-600" /> : <Share2 className="w-4 h-4" />}
            </button>
            <a href={`https://wa.me/6287772577020?text=${encodeURIComponent(content.title)}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-50 text-green-600 hover:bg-green-50 transition-colors">
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
          <button onClick={() => setBookmarked(!bookmarked)} className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${bookmarked ? "text-magenta" : "text-muted-foreground hover:text-navy"}`}>
            <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-magenta text-magenta" : ""}`} /> {bookmarked ? "Tersimpan" : "Simpan"}
          </button>
        </div>
      </article>

      {/* Related Content */}
      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-100">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <h2 className="text-lg font-bold text-navy mb-4">Konten Terkait</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {related.map((item, i) => (
                  <ViralogContentCard key={item.id} content={item} variant="standard" index={i} />
                ))}
              </div>
            </div>
            {/* Sidebar */}
            <div className="space-y-5">
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                  <TrendingUp className="w-4 h-4 text-magenta" />
                  <h3 className="font-bold text-navy text-sm uppercase tracking-wide">Trending</h3>
                </div>
                <div className="space-y-0">
                  {trendingSidebar.map((item, i) => (
                    <ViralogContentCard key={item.id} content={item} variant="trending" index={i} />
                  ))}
                </div>
              </div>
              <ViralogNewsletter variant="sidebar" />
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ViralogNewsletter />
      </section>
    </PillarLayout>
  );
}
