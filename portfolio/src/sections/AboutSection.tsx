import FadeIn from '../components/FadeIn';
import AnimatedText from '../components/AnimatedText';
import { ABOUT_TEXT } from '../data/profile';

export default function AboutSection() {
  return (
    <section id="about" className="px-5 sm:px-8 md:px-10 py-16 sm:py-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 md:gap-12 border-t border-[#D7E2EA]/10 pt-10">
        <FadeIn y={20}>
          <p className="font-mono text-xs tracking-[0.3em] text-[#D7E2EA]/40 uppercase">About</p>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight mt-2 whitespace-nowrap"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}
          >
            Who I am
          </h2>
        </FadeIn>
        <div className="flex flex-col gap-3 max-w-3xl">
          <AnimatedText
            text={ABOUT_TEXT}
            className="text-[#D7E2EA] font-medium leading-relaxed"
            style={{ fontSize: 'clamp(1rem, 1.6vw, 1.2rem)' }}
          />
          <FadeIn
            delay={0.1}
            className="text-[#D7E2EA]/55 font-light leading-relaxed"
            style={{ fontSize: 'clamp(0.88rem, 1.3vw, 1rem)' }}
          >
            MS Computer Science candidate at Northeastern University, graduating May 2027. My
            work is retrieval systems and autonomous agents, with a steady side of security
            engineering. First author on an IEEE INDIACom 2024 paper on honeypot architecture. I
            like problems where the obvious answer turns out to be wrong once you measure it.
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
