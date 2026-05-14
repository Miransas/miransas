/* eslint-disable react/jsx-no-comment-textnodes */
"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, ArrowUpRight, Hash, Clock, ChevronRight } from "lucide-react";
import Link from "next/link"; // Next.js kullandığını varsayıyorum

const BlogCard = ({ title, excerpt, date, readTime, tags, slug }: { title: string; excerpt: string; date: string; readTime: string; tags: string[]; slug: string }) => (
  <Link href={`/blog/${slug}`}>
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative p-8 rounded-[2.5rem] bg-[#0a0a0a] border border-white/5 hover:border-purple-500/30 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col h-full"
    >
      {/* Background Hover Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag, i) => (
            <span key={i} className="text-[9px] font-mono uppercase tracking-[0.2em] text-zinc-600 bg-white/5 px-2 py-1 rounded">
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-start gap-4 mb-4">
          <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white group-hover:text-purple-400 transition-colors leading-[0.9]">
            {title}
          </h3>
          <div className="p-2 rounded-full bg-white/5 group-hover:bg-purple-500 transition-colors">
            <ArrowUpRight size={18} className="text-zinc-500 group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        <p className="text-zinc-500 text-sm font-light leading-relaxed mb-8 line-clamp-3">
          {excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5">
          <div className="flex items-center gap-4 text-[10px] font-mono text-zinc-600">
            <div className="flex items-center gap-1.5">
              <Clock size={12} />
              {readTime}
            </div>
            <span>//</span>
            <span>{date}</span>
          </div>
          
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-white flex items-center gap-1 transition-colors">
            Read Entry <ChevronRight size={12} />
          </span>
        </div>
      </div>
    </motion.div>
  </Link>
);

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#030303] text-zinc-300 font-sans pt-32 pb-24 selection:bg-purple-500/30">
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <header className="mb-24 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10">
            <BookOpen size={14} className="text-purple-500" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500">Engineering_Journal // Node_Insights</span>
          </div>
          
          <h1 className="text-3xl md:text-3xl font-black italic uppercase tracking-[ -0.05em] text-white leading-[0.8]">
            The <span className="text-zinc-200">Archive.</span>
          </h1>
          
          <p className="max-w-2xl text-xl text-zinc-500 font-light leading-relaxed border-l-4 border-purple-500/20 pl-8">
            Technical documentation and architectural insights from the Miransas core team. We document our journey through low-level systems and neural automation.
          </p>
        </header>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <BlogCard 
            title="Memory Safety in binboi: Why Rust Wins"
            excerpt="An in-depth look at how we utilize Rust's ownership model to eliminate memory leaks and race conditions in our high-speed tunneling agents."
            date="MAY 10, 2026"
            readTime="8 MIN READ"
            tags={["systems", "rust", "binboi"]}
            slug="rust-memory-safety"
          />

          <BlogCard 
            title="Achieving 0.1ms Latency on Edge Nodes"
            excerpt="Optimizing the Go backplane and minimizing kernel-space context switching to provide ultra-low latency for global proxy nodes."
            date="APR 22, 2026"
            readTime="12 MIN READ"
            tags={["network", "go", "performance"]}
            slug="low-latency-networking"
          />

          <BlogCard 
            title="Lost Signal: Designing Atmospheric Soundscapes"
            excerpt="Utilizing spatial audio and low-level rendering pipelines to create an immersive horror experience in the Sadpera universe."
            date="MAR 15, 2026"
            readTime="6 MIN READ"
            tags={["gamedev", "unity", "audio"]}
            slug="atmospheric-sound-design"
          />

          <BlogCard 
            title="Bitboard Optimization in Chess Engines"
            excerpt="Technical breakdown of move generation efficiency in the miransas-chess engine using SIMD instructions and bit manipulation."
            date="FEB 05, 2026"
            readTime="15 MIN READ"
            tags={["chess", "algorithms", "rust"]}
            slug="chess-engine-bitboards"
          />

        </div>

        {/* Load More Button */}
        <footer className="mt-24 flex justify-center">
          <button className="group flex flex-col items-center gap-4 transition-all">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-purple-500/50 group-hover:bg-purple-500/5 transition-all">
              <Hash size={20} className="text-zinc-700 group-hover:text-purple-500" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-600 group-hover:text-white transition-colors">Fetch Older Nodes</span>
          </button>
        </footer>

      </div>

      {/* Subtle Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] -left-[10%] w-[40vw] h-[40vw] bg-purple-600/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[10%] -right-[10%] w-[30vw] h-[30vw] bg-blue-600/5 blur-[120px] rounded-full" />
      </div>
    </main>
  );
}