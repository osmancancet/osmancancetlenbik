"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { profile } from "@/data/profile";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { MatrixRain } from "@/components/cyber/MatrixRain";
import { DecryptText } from "@/components/cyber/DecryptText";

export function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center px-6 overflow-hidden">
      {/* Matrix rain background — subtle full bleed */}
      <div className="absolute inset-0 pointer-events-none">
        <MatrixRain opacity={0.5} />
      </div>
      {/* Soft dark overlay behind text column for readability */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 45%, rgba(0,0,0,0.1) 70%, transparent 100%)",
        }}
      />

      <div className="relative z-[2] max-w-6xl mx-auto w-full grid md:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16 items-center">
        {/* Left: text */}
        <div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05] text-[var(--accent)]">
            <DecryptText text="Osman Can" speed={80} delay={200} />
            <br />
            <DecryptText text="ÇETLENBİK" speed={80} delay={1250} />
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 2.3 }}
            className="mt-5 text-base md:text-lg text-[var(--fg-muted)]"
          >
            <span className="text-[var(--fg)] font-medium">
              Öğretim Görevlisi
            </span>
            <span className="mx-2 text-[var(--fg-subtle)]">·</span>
            <span>Manisa Celal Bayar Üniversitesi</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 2.45 }}
            className="mt-6 text-base md:text-lg text-[var(--fg-muted)] max-w-xl leading-relaxed"
          >
            Büyük Veri Analistliği Programı'nda öğretim görevlisiyim. Siber
            güvenlik, yapay zekâ ve veri bilimi alanlarında çalışıyor, yazıyor
            ve öğretiyorum.
          </motion.p>

          {/* Topic tags — clean Turkish */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 2.6 }}
            className="mt-6 flex flex-wrap gap-2"
          >
            {[
              "Siber Güvenlik",
              "Büyük Veri",
              "Yapay Zekâ",
              "Web Geliştirme",
              "IoT",
            ].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs text-[var(--fg-muted)] border border-[var(--border-strong)] hover:border-[var(--accent)]/50 hover:text-[var(--accent)] transition-colors"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 2.75 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/hakkimda"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-[var(--bg)] text-sm font-semibold rounded-md hover:opacity-90 transition-opacity shadow-[0_0_24px_-8px_var(--accent)]"
            >
              Hakkımda
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border-strong)] text-[var(--fg)] text-sm font-medium rounded-md hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              <Mail className="w-4 h-4" />
              İletişim
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 2.9 }}
            className="mt-8 flex items-center gap-5 text-[var(--fg-subtle)]"
          >
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="hover:text-[var(--fg)] transition-colors"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="hover:text-[var(--fg)] transition-colors"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>
            <a
              href={profile.socials.email}
              aria-label="E-posta"
              className="hover:text-[var(--fg)] transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </motion.div>
        </div>

        {/* Right: round photo with green scanner rings */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative justify-self-center md:justify-self-end"
        >
          <div className="relative w-72 h-72 md:w-80 md:h-80">
            {/* Outer rotating dashed ring */}
            <motion.div
              aria-hidden
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-6 rounded-full border border-dashed border-[var(--accent)]/35"
            />
            <motion.div
              aria-hidden
              animate={{ rotate: -360 }}
              transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-3 rounded-full border border-[var(--accent)]/15"
            />

            {/* Pulsing green halo */}
            <motion.div
              aria-hidden
              animate={{ scale: [1, 1.06, 1], opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-2 rounded-full blur-2xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(0,255,65,0.50), transparent 60%)",
              }}
            />

            {/* Round photo: clean, slight desat, vignette only */}
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[var(--accent)]/70 shadow-[0_0_80px_-10px_rgba(0,255,65,0.5)]">
              <div className="absolute inset-0 bg-black" aria-hidden />
              <Image
                src="/profile.png"
                alt={profile.name}
                fill
                className="object-cover"
                style={{
                  filter: "grayscale(0.35) brightness(0.92) contrast(1.08)",
                }}
                priority
                sizes="(max-width: 768px) 288px, 320px"
              />
              {/* Vignette to pure black edges (no white background) */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at center, transparent 35%, rgba(0,0,0,0.55) 78%, #000 100%)",
                }}
              />
              {/* Animated horizontal scanner */}
              <motion.div
                aria-hidden
                animate={{ y: ["-5%", "105%"] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 1.5,
                }}
                className="absolute inset-x-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(0,255,65,1), transparent)",
                  boxShadow: "0 0 14px rgba(0,255,65,0.9)",
                }}
              />
            </div>

          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.3, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[var(--fg-subtle)]"
      >
        <span>Kaydır</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-[var(--accent)] to-transparent"
        />
      </motion.div>
    </section>
  );
}
