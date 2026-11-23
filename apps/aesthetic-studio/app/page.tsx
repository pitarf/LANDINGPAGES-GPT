"use client";
import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ArrowDown, ArrowRight, ArrowUpRight, Instagram, Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { site } from "./site.config";

const services = [
  { n: "01", title: "Estética facial", desc: "Protocolos personalizados para realçar sua beleza com naturalidade.", tag: "Harmonia & cuidado" },
  { n: "02", title: "Tecnologia corporal", desc: "Tratamentos que respeitam seu corpo e acompanham seus objetivos.", tag: "Ciência & bem-estar" },
  { n: "03", title: "Rituais de pele", desc: "Uma pausa na rotina para renovar, hidratar e devolver luminosidade.", tag: "Pele saudável" }
];
const photos = {
  hero: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1800&q=90",
  face: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=85",
  room: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1000&q=85",
  detail: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=1000&q=85"
};
export default function Home() {
  const root = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cleanup = () => {};
    let cancelled = false;

    const setupAnimations = async () => {
      try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger")
        ]);

        if (cancelled) return;

        gsap.registerPlugin(ScrollTrigger);
        const context = gsap.context(() => {
          gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
            gsap.fromTo(
              element,
              { y: 32, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.85,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: element,
                  start: "top 88%",
                  once: true
                }
              }
            );
          });

          gsap.to(".hero-image", {
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "bottom top",
              scrub: true
            }
          });
        }, root);

        cleanup = () => context.revert();
        ScrollTrigger.refresh();
      } catch (error) {
        console.error("Não foi possível iniciar as animações da página.", error);
      }
    };

    void setupAnimations();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);
  return <main ref={root}>
    <a className="skip-link" href="#essencia">Pular para o conteúdo</a>
    <header className="nav"><a className="brand" href="#"><span className="brand-mark">m.</span><span>{site.name}<small>{site.descriptor}</small></span></a><nav aria-label="Navegação principal" id="aesthetic-navigation" className={menuOpen ? "nav-links open" : "nav-links"}><a href="#essencia" onClick={()=>setMenuOpen(false)}>A essência</a><a href="#tratamentos" onClick={()=>setMenuOpen(false)}>Tratamentos</a><a href="#espaco" onClick={()=>setMenuOpen(false)}>O espaço</a><a href="#contato" onClick={()=>setMenuOpen(false)}>Contato</a></nav><a className="nav-cta" href="#contato">Agendar consulta <ArrowUpRight size={15}/></a><button type="button" className="menu-toggle" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} aria-controls="aesthetic-navigation" onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X/>:<Menu/>}</button></header>
    <section className="hero"><div className="hero-image" style={{backgroundImage:"linear-gradient(90deg,rgba(29,38,31,.62),rgba(29,38,31,.05)),url("+photos.hero+")"}}/><div className="hero-content"><motion.p initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:.2}} className="eyebrow light"><span/> BELEZA COM INTENÇÃO</motion.p><motion.h1 initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{delay:.35,duration:.8}}>Sua beleza.<br/><em>Seu tempo.</em><br/>Sua essência.</motion.h1><motion.p className="hero-copy" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.7}}>Cuidado especializado para revelar o que há de mais bonito em você, sem excessos, sem padrões. Apenas você.</motion.p><motion.a className="button button-light" href="#contato" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.9}}>Descubra sua experiência <ArrowUpRight size={17}/></motion.a></div><div className="hero-note">{site.city} · {site.since}</div><a className="scroll-cue" href="#essencia"><ArrowDown size={16}/> ROLE PARA DESCOBRIR</a></section>
    <section className="intro reveal-zone" id="essencia"><div className="intro-kicker reveal">01 / NOSSA FILOSOFIA</div><div className="intro-main reveal"><p className="eyebrow"><span/> UM NOVO OLHAR SOBRE O AUTOCUIDADO</p><h2>Não é sobre mudar quem você é. É sobre <em>se reconhecer</em> em cada detalhe.</h2></div><div className="intro-aside reveal"><p>Acreditamos que beleza e bem-estar caminham juntos. Por isso, unimos conhecimento, tecnologia e um olhar atento para criar experiências que fazem sentido para você.</p><a className="text-link" href="#tratamentos">Conheça nossa abordagem <ArrowRight size={16}/></a></div></section>
    <section className="services reveal-zone" id="tratamentos"><div className="section-head reveal"><div><p className="eyebrow"><span/> CUIDADO SOB MEDIDA</p><h2>Seu momento de <em>florescer.</em></h2></div><p className="section-note">Cada pele tem uma história.<br/>Cada cuidado, um propósito.</p></div><div className="service-grid">{services.map((s)=><article className="service-card reveal" key={s.n}><span className="service-number">{s.n}</span><div><span className="service-tag">{s.tag}</span><h3>{s.title}</h3><p>{s.desc}</p><a href="#contato" aria-label={"Saiba mais sobre "+s.title}><ArrowUpRight/></a></div></article>)}</div></section>
    <section className="editorial reveal-zone" id="espaco"><div className="editorial-image reveal" style={{backgroundImage:"url("+photos.face+")"}}/><div className="editorial-copy reveal"><p className="eyebrow"><span/> O ESPAÇO {site.name}</p><h2>Um lugar para <em>desacelerar.</em></h2><p>Da recepção ao último cuidado, cada detalhe foi pensado para que você se sinta acolhida. Um ambiente sereno, profissionais que escutam e uma experiência que começa muito antes do tratamento.</p><a className="text-link" href="#contato">Venha conhecer <ArrowRight size={16}/></a></div><div className="editorial-small reveal" style={{backgroundImage:"url("+photos.room+")"}}/><div className="editorial-caption">UM REFÚGIO NO MEIO DA CIDADE</div></section>
    <section className="quote-section"><Sparkles size={20}/><p>“O autocuidado não é um luxo.<br/>É a forma como você diz <em>eu importo.</em>”</p><span>{site.name} · NOSSA ESSÊNCIA</span></section>
    <section className="contact reveal-zone" id="contato"><div className="contact-image" style={{backgroundImage:"url("+photos.detail+")"}}/><div className="contact-copy reveal"><p className="eyebrow"><span/> SEU PRÓXIMO CAPÍTULO COMEÇA AQUI</p><h2>Vamos cuidar<br/>de <em>você?</em></h2><p>Conte para nós o que você procura. Nossa equipe vai ajudar a encontrar o cuidado ideal para o seu momento.</p><a className="button button-dark" href={site.whatsappUrl} target={site.whatsappUrl.startsWith("https://") ? "_blank" : undefined} rel="noreferrer">Personalizar agendamento <ArrowUpRight size={17}/></a><div className="contact-meta"><span>{site.hours}</span><span>{site.city}</span></div></div></section>
    <footer><a className="brand footer-brand" href="#"><span className="brand-mark">m.</span><span>{site.name}<small>{site.descriptor}</small></span></a><p>Beleza com intenção. Cuidado com presença.</p>{site.instagramUrl ? <a className="social" href={site.instagramUrl} target="_blank" rel="noreferrer"><Instagram size={17}/> INSTAGRAM</a> : <span className="social"><Instagram size={17}/> INSTAGRAM · CONFIGURAR PERFIL</span>}<small>© {new Date().getFullYear()} {site.name}. TODOS OS DIREITOS RESERVADOS.</small></footer>
  </main>;
}