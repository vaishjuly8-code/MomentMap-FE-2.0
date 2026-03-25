"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Calendar, Sparkles, Check, Quote } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

function MiniCalendar() {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const startDay = 4; // Starts on Friday for May 2026
  const padding = Array.from({ length: startDay }, (_, i) => null);
  const calendarDays = [...padding, ...days];

  return (
    <div className="bg-white rounded-[2.5rem] p-8 shadow-ambient border-none w-full max-w-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-display font-bold italic text-xl">May 2026</h3>
        <div className="flex gap-2">
          <div className="w-6 h-6 rounded-full bg-surface-container-low flex items-center justify-center">
            <ArrowRight className="w-3 h-3 rotate-180 opacity-30" />
          </div>
          <div className="w-6 h-6 rounded-full bg-surface-container-low flex items-center justify-center">
            <ArrowRight className="w-3 h-3 opacity-30" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-7 mb-4">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <div key={i} className="text-[10px] font-bold text-muted-foreground/30 text-center uppercase tracking-widest">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-4">
        {calendarDays.map((d, i) => (
          <div key={i} className="flex items-center justify-center relative h-8">
            {d && (
              <span className={`text-[11px] font-bold ${d === 4 ? 'text-white z-10' : 'text-foreground/40'}`}>
                {d}
              </span>
            )}
            {d === 4 && (
              <div className="absolute inset-0 bg-primary rounded-full scale-125 shadow-raised" />
            )}
            {d === 3 && (
              <div className="absolute bottom-0 w-1 h-1 bg-primary/40 rounded-full" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-black/5">
        <div className="bg-[#EAE4FF] p-4 rounded-2xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center overflow-hidden">
            <img src="https://www.sheknows.com/wp-content/uploads/2024/05/jennifer-lopez-met-gala-photos.jpg?w=1440" alt="Item" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#630ED4]">Today's Look</p>
            <p className="text-[11px] font-bold text-foreground">MET GALA PREPARATION</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const SECTION_EYEBROW_CLASS = "font-body text-[10px] font-bold tracking-[0.4em] text-primary mb-6 block uppercase opacity-80";
const SECTION_TITLE_CLASS = "text-[4rem] md:text-[6rem] font-display font-bold leading-[1] tracking-tight mb-12";

export default function LandingPage() {
  const heroImage1 = "https://www.designscene.net/wp-content/uploads/2014/12/Barbara-Palvin-Vogue-Portugal-Marcin-Tyszka-01.jpg";
  const heroImage2 = "https://assets.vogue.com/photos/68b71dfbcbc79c70ec48720b/master/w_2560%2Cc_limit/VO1025_Cover_A_logo.jpg";

  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      <Navbar />

      <main>
        {/* --- HERO SECTION --- */}
        <section className="container mx-auto px-8 py-24 lg:py-40 max-w-[1500px]">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-[7rem] lg:text-[10rem] font-display font-bold leading-[0.85] tracking-tight mb-12">
                Your Personal <br />
                <span className="italic font-light text-primary">Aesthetic</span>, <br />
                Curated.
              </h1>
              <p className="font-body text-xl text-muted-foreground max-w-xl leading-relaxed mb-16 opacity-70">
                Experience the evolution of personal style. MomentMap harmonizes your wardrobe with your life
                through intelligent, high-fashion curation.
              </p>
              <div className="flex flex-wrap gap-6">
                <Button asChild className="h-20 px-12 rounded-full bg-primary text-white font-bold text-lg hover:shadow-raised transition-all uppercase tracking-[0.2em]">
                  <Link href="/calendar">Explore the Calendar</Link>
                </Button>
              </div>
            </motion.div>

            <div className="relative h-[800px] hidden lg:block">
              <motion.div
                initial={{ opacity: 0, rotate: -15, x: 100 }}
                animate={{ opacity: 1, rotate: -6, x: 0 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="absolute right-0 top-0 w-[500px] aspect-[3/4] rounded-[3rem] overflow-hidden border-[1.5rem] border-white shadow-2xl z-10"
              >
                <img src={heroImage1} alt="Editorial 1" className="w-full h-full object-cover" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, rotate: 15, x: -100 }}
                animate={{ opacity: 1, rotate: 4, x: 0 }}
                transition={{ duration: 1.2, delay: 0.4 }}
                className="absolute left-10 top-[450px] w-[350px] aspect-[4/5] rounded-[2rem] overflow-hidden border-[1rem] border-white shadow-xl z-20"
              >
                <img src={heroImage2} alt="Editorial 2" className="w-full h-full object-cover" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- THE VISION --- */}
        <section className="bg-white py-32 lg:py-56">
          <div className="container mx-auto px-8 max-w-[1500px]">
            <div className="max-w-4xl mx-auto text-center mb-24">
              <span className={SECTION_EYEBROW_CLASS}>The Vision</span>
              <h2 className={SECTION_TITLE_CLASS}>
                Beyond an app—a digital extension <br />
                <span className="italic font-light">of your creative soul.</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto opacity-70">
              <p className="font-body text-xl leading-relaxed">
                MomentMap redefines the relationship between clothing and context. We believe that every moment—from a
                high-stakes boardroom presentation to a quiet gallery stroll—deserves a curated visual narrative.
              </p>
              <p className="font-body text-xl leading-relaxed">
                Our AI-driven curation engine analyzes your existing wardrobe and upcoming life events to suggest ensembles
                that reflect your unique aesthetic identity, ensuring you move through the world with effortless intention.
              </p>
            </div>
          </div>
        </section>

        {/* --- FASHION CALENDAR --- */}
        <section className="py-32 lg:py-56">
          <div className="container mx-auto px-8 max-w-[1500px]">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div className="flex justify-center lg:justify-start">
                <MiniCalendar />
              </div>

              <div>
                <span className={SECTION_EYEBROW_CLASS}>01 — Event-Based Curation</span>
                <h2 className={SECTION_TITLE_CLASS}>The Fashion <br /> <span className="italic font-light">Calendar</span></h2>
                <p className="font-body text-xl text-muted-foreground mb-12 leading-relaxed">
                  Your life isn't static, and your style shouldn't be either. Synchronize your digital wardrobe with
                  your social calendar to receive automated, weather-appropriate, and context-aware outfit recommendations.
                </p>
                <ul className="space-y-6">
                  {[
                    "Automated event sync",
                    "Contextual style logic",
                    "Climate-adaptive suggestions"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-[#630ED4]">
                      <div className="w-6 h-6 rounded-full bg-[#EAE4FF] flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* --- DIGITAL WARDROBE --- */}
        <section className="bg-surface py-32 lg:py-56">
          <div className="container mx-auto px-8 max-w-[1500px]">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div>
                <span className={SECTION_EYEBROW_CLASS}>02 — The Digital Archive</span>
                <h2 className={SECTION_TITLE_CLASS}>The Digital <br /> <span className="italic font-light">Wardrobe</span></h2>
                <p className="font-body text-xl text-muted-foreground mb-12 leading-relaxed">
                  Digitize your collection with museum-grade precision. Our platform organizes your pieces by silhouette,
                  material, and aesthetic vibe, creating a searchable catalog of your personal style history.
                </p>
                <Link href="/products" className="group flex items-center gap-3 font-body font-bold text-sm tracking-widest uppercase text-primary">
                  Explore Catalog Features <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-8 pt-12">
                  <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-ambient">
                    <img src="https://img01.ztat.net/article/spp-media-p1/82488c5dffc34765aa295ac9075886f8/0184c318e9004134bf4916310e4c052d.jpg?imwidth=1800" alt="Suit" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-square rounded-[2.5rem] overflow-hidden shadow-ambient">
                    <img src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80" alt="Coat" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="space-y-8">
                  <div className="aspect-square rounded-[2.5rem] overflow-hidden shadow-ambient">
                    <img src="https://monark.com.pk/cdn/shop/collections/monark_0009_3_e0e53fd1-e173-46f3-aaef-547593bb5c81.jpg?v=1760940469" alt="Fashion" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-ambient">
                    <img src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=600&q=80" alt="Style" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- TESTIMONIAL --- */}
        <section className="bg-[#1A1A1A] py-40">
          <div className="container mx-auto px-8 text-center max-w-[1500px]">
            <div className="flex justify-center mb-12 text-[#630ED4]">
              <Quote className="w-16 h-16 opacity-30 fill-current" />
            </div>
            <blockquote className="max-w-6xl mx-auto mb-16">
              <p className="text-[3rem] md:text-[5rem] font-display font-bold text-white leading-[1.1] tracking-tight italic">
                "MomentMap is the missing link between my chaotic schedule and my creative expression. It's like having a master curator in my pocket who knows my style better than I do."
              </p>
            </blockquote>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary mb-6">
                <img src="https://i.pravatar.cc/150?u=fashion" alt="User" />
              </div>
              <p className="text-white font-bold tracking-widest uppercase text-xs">Sasha Vankovic</p>
              <p className="text-[#630ED4] font-body text-[10px] uppercase font-bold tracking-[0.3em] mt-2">Digital Style Director</p>
            </div>
          </div>
        </section>

        {/* --- JOIN WAITLIST --- */}
        <section className="py-40 bg-white">
          <div className="container mx-auto px-8 text-center max-w-[1500px]">
            <h2 className="text-[6rem] lg:text-[10rem] font-display font-bold tracking-tight mb-16 leading-[0.85]">
              Start Your <br /> <span className="italic font-light">Journey.</span>
            </h2>
            <p className="font-body text-xl text-muted-foreground mb-20 max-w-2xl mx-auto leading-relaxed">
              Join an exclusive community of curators who are redefining personal style. Early access members
              receive a personalized style audit.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto p-2 rounded-full border border-black/5 bg-[#FBFBFB] shadow-sm">
              <Input
                placeholder="Your email address"
                className="h-16 rounded-full border-none bg-transparent px-10 text-lg font-body"
              />
              <Button className="h-16 px-12 rounded-full bg-primary text-white font-bold text-lg hover:shadow-raised transition-all uppercase tracking-[0.2em]">
                Join Waitlist
              </Button>
            </div>
          </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="py-24 bg-white border-t border-black/5">
          <div className="container mx-auto px-8 max-w-[1500px]">
            <div className="flex flex-col md:flex-row justify-between items-center gap-16">
              <div className="font-display text-2xl font-bold tracking-tight shrink-0">
                <span className="italic font-light text-primary">Moment</span>Map
              </div>

              <div className="flex flex-wrap justify-center gap-12 text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground/60">
                <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
                <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
                <Link href="#" className="hover:text-primary transition-colors">Editorial Guidelines</Link>
                <Link href="#" className="hover:text-primary transition-colors">Contact</Link>
              </div>

              <div className="text-[10px] font-body tracking-[0.1em] text-muted-foreground/30 uppercase shrink-0">
                © 2024 MomentMap. The Digital Curator. All Rights Reserved.
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
