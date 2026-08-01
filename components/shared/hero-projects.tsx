"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Miransas Architecture",
    description: "Scalable web platform built for modern digital products and high-traffic handling.",
    span: "md:col-span-7",
    mediaType: "video",
    mediaSrc: "/videos/miransas-demo.mp4",
    fallbackBg: "bg-neutral-200",
    tags: ["Rust", "C ", "Go", "C++"],
    textPosition: "bottom-left",
  },
  {
    title: "Binboi Server",
    description: "Advanced server and client components tailored for seamless communication.",
    span: "md:col-span-5",
    mediaType: "image",
    mediaSrc: "/projects/binboi.png",
    fallbackBg: "bg-neutral-300",
    tags: ["Go", "Networking"],
    textPosition: "bottom-left",
  },
  {
    title: "Project Sad",
    description: "Independent game featuring custom assets, deep narrative, and dynamic UI systems.",
    span: "md:col-span-5",
    mediaType: "video",
    mediaSrc: "/games/lostsignal-1.png",
    fallbackBg: "bg-neutral-200",
    tags: ["Game Dev", "Story Elements"],
    textPosition: "bottom-left",
  },
  {
    title: "Rust Chess Engine",
    description: "High-performance evaluation engine currently pushing 1600+ Elo.",
    span: "md:col-span-7",
    mediaType: "image",
    mediaSrc: "/chess.png",
    fallbackBg: "bg-neutral-300",
    tags: ["Rust", "Algorithms"],
    textPosition: "bottom-left",
  },
  {
    title: "Mail Sender Service",
    description: "Reliable and scalable email sending infrastructure.",
    span: "md:col-span-8",
    mediaType: "image",
    mediaSrc: "/mail-sender.png",
    fallbackBg: "bg-neutral-200",
    tags: ["Supabase", "MongoDB"],
    textPosition: "bottom-left",
  },
  {
    title: "Tunneling Service",
    description: "Secure, fast, and reliable internal networking infrastructure.",
    span: "md:col-span-4",
    mediaType: "video",
    mediaSrc: "/videos/tunneling.mp4",
    fallbackBg: "bg-neutral-300",
    tags: ["Go", "Infrastructure"],
    textPosition: "bottom-left",
  },
];

export default function HeroProjects() {
  return (
    <section className="relative overflow-hidden bg-[#F6F5F2] py-20 text-neutral-900 md:py-28">
      
      
    </section>
  );
}