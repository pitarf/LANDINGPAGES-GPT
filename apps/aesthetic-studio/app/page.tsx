"use client";
import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ArrowDown, ArrowRight, ArrowUpRight, Instagram, Menu, MessageCircle, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { site, professionals, testimonials, resultsGallery } from "./site.config";

const services = [
  { n: "01", title: "Estética facial", desc: "Cuidados faciais definidos após avaliação, considerando características, rotina e objetivos individuais.", tag: "Harmonia & cuidado", options: ["Avaliação da pele e rotina de cuidados", "Protocolos faciais personalizados", "Orientações de manutenção em casa"] },
  { n: "02", title: "Tecnologia corporal", desc: "Recursos estéticos selecionados de acordo com a indicação profissional e as necessidades de cada pessoa.", tag: "Ciência & bem-estar", options: ["Avaliação individual e definição de objetivos", "Apresentação das tecnologias disponíveis", "Plano de sessões e cuidados complementares"] },
  { n: "03", title: "Rituais de pele", desc: "Tratamentos voltados à limpeza, hidratação e cuidado da pele, respeitando suas particularidades.", tag: "Pele saudável", options: ["Higienização e cuidado facial", "Hidratação conforme avaliação", "Recomendações para rotina diária"] }
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
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [menuOpen]);
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

          const hero = root.current?.querySelector<HTMLElement>(".hero");
          const heroImage = hero?.querySelector<HTMLElement>(".hero-image");
          const canTrackPointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

          if (hero && heroImage && canTrackPointer) {
            const moveX = gsap.quickTo(heroImage, "x", { duration: 0.7, ease: "power3.out" });
            const moveY = gsap.quickTo(heroImage, "y", { duration: 0.7, ease: "power3.out" });

            const handlePointerMove = (event: PointerEvent) => {
              const bounds = hero.getBoundingClientRect();
              const offsetX = (event.clientX - bounds.left) / bounds.width - 0.5;
              const offsetY = (event.clientY - bounds.top) / bounds.height - 0.5;
              moveX(offsetX * -14);
              moveY(offsetY * -10);
            };

            const resetPointer = () => {
              moveX(0);
              moveY(0);
            };

            hero.addEventListener("pointermove", handlePointerMove);
            hero.addEventListener("pointerleave", resetPointer);
            cleanup = () => {
              hero.removeEventListener("pointermove", handlePointerMove);
              hero.removeEventListener("pointerleave", resetPointer);
              context.revert();
            };
          } else {
            cleanup = () => context.revert();
          }
        }, root.current ?? undefined);

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
    <header className="nav"><a className="brand" href="#"><span className="brand-mark">m.</span><span>{site.name}<small>{site.descriptor}</small></span></a><nav aria-label="Navegação principal" id="aesthetic-navigation" className={menuOpen ? "nav-links open" : "nav-links"}><a href="#essencia" onClick={()=>{if(menuOpen)menuButtonRef.current?.focus();setMenuOpen(false)}}>A essência</a><a href="#tratamentos" onClick={()=>{if(menuOpen)menuButtonRef.current?.focus();setMenuOpen(false)}}>Tratamentos</a><a href="#espaco" onClick={()=>{if(menuOpen)menuButtonRef.current?.focus();setMenuOpen(false)}}>O espaço</a><a href="#contato" onClick={()=>{if(menuOpen)menuButtonRef.current?.focus();setMenuOpen(false)}}>Contato</a></nav><a className="nav-cta" href="#contato">Agendar consulta <ArrowUpRight size={15}/></a><button ref={menuButtonRef} type="button" className="menu-toggle" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} aria-controls="aesthetic-navigation" onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X/>:<Menu/>}</button></header>
    <section className="hero"><div className="hero-image" style={{backgroundImage:"linear-gradient(90deg,rgba(29,38,31,.62),rgba(29,38,31,.05)),url("+photos.hero+")"}}/><div className="hero-content"><motion.p initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:.2}} className="eyebrow light"><span/> BELEZA COM INTENÇÃO</motion.p><motion.h1 initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{delay:.35,duration:.8}}>Sua beleza.<br/><em>Seu tempo.</em><br/>Sua essência.</motion.h1><motion.p className="hero-copy" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.7}}>Cuidado especializado para revelar o que há de mais bonito em você, sem excessos, sem padrões. Apenas você.</motion.p><motion.a className="button button-light" href="#contato" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.9}}>Descubra sua experiência <ArrowUpRight size={17}/></motion.a></div><div className="hero-note">{site.city ? site.city+" · " : ""}{site.since}</div><a className="scroll-cue" href="#essencia"><ArrowDown size={16}/> ROLE PARA DESCOBRIR</a></section>
    <section className="intro reveal-zone" id="essencia"><div className="intro-kicker reveal">01 / NOSSA FILOSOFIA</div><div className="intro-main reveal"><p className="eyebrow"><span/> UM NOVO OLHAR SOBRE O AUTOCUIDADO</p><h2>Não é sobre mudar quem você é. É sobre <em>se reconhecer</em> em cada detalhe.</h2></div><div className="intro-aside reveal"><p>Acreditamos que beleza e bem-estar caminham juntos. Por isso, unimos conhecimento, tecnologia e um olhar atento para criar experiências que fazem sentido para você.</p><a className="text-link" href="#tratamentos">Conheça nossa abordagem <ArrowRight size={16}/></a></div></section>
    <section className="services reveal-zone" id="tratamentos"><div className="section-head reveal"><div><p className="eyebrow"><span/> CUIDADO SOB MEDIDA</p><h2>Seu momento de <em>florescer.</em></h2></div><p className="section-note">Cada pele tem uma história.<br/>Cada cuidado, um propósito.</p></div><div className="service-grid">{services.map((s)=><article className="service-card reveal" key={s.n}><span className="service-number">{s.n}</span><div><span className="service-tag">{s.tag}</span><h3>{s.title}</h3><p>{s.desc}</p><ul className="service-options">{s.options.map((option)=><li key={option}>{option}</li>)}</ul><a href="#contato" aria-label={"Saiba mais sobre "+s.title}><ArrowUpRight/></a></div></article>)}</div></section>
    <section className="editorial reveal-zone" id="espaco"><div className="editorial-image reveal" style={{backgroundImage:"url("+photos.face+")"}}/><div className="editorial-copy reveal"><p className="eyebrow"><span/> O ESPAÇO {site.name}</p><h2>Um lugar para <em>desacelerar.</em></h2><p>Da recepção ao último cuidado, cada detalhe foi pensado para que você se sinta acolhida. Um ambiente sereno, profissionais que escutam e uma experiência que começa muito antes do tratamento.</p><a className="text-link" href="#contato">Venha conhecer <ArrowRight size={16}/></a></div><div className="editorial-small reveal" style={{backgroundImage:"url("+photos.room+")"}}/><div className="editorial-caption">UM REFÚGIO NO MEIO DA CIDADE</div></section>
    <section className="a-trust reveal-zone" aria-labelledby="a-trust-title"><div className="a-trust-heading reveal"><p className="eyebrow"><span/> UMA EXPERIÊNCIA COM PROPÓSITO</p><h2 id="a-trust-title">Cuidado que começa <em>na escuta.</em></h2><p>Antes de qualquer procedimento, existe uma conversa. Entendemos seus objetivos, explicamos possibilidades e respeitamos o seu tempo.</p></div><div className="a-trust-grid"><article className="a-trust-card reveal"><span>01</span><h3>Avaliação individual</h3><p>Uma análise cuidadosa para compreender necessidades, rotina e expectativas, sem soluções prontas.</p></article><article className="a-trust-card reveal"><span>02</span><h3>Plano transparente</h3><p>Você conhece as etapas, os cuidados recomendados e os limites de cada procedimento antes de decidir.</p></article><article className="a-trust-card reveal"><span>03</span><h3>Acompanhamento</h3><p>Orientações antes e depois do atendimento, com espaço para dúvidas e acompanhamento responsável.</p></article></div><p className="a-demo-note">Modelo demonstrativo: inclua aqui avaliações verificadas, com autorização de publicação, quando disponíveis.</p></section>
    {professionals.length > 0 && <section className="profile-section" id="equipe"><div className="profile-heading"><p className="eyebrow"><span/> QUEM CUIDA DE VOCÊ</p><h2>Conhecimento com <em>olhar humano.</em></h2></div><div className="profile-grid">{professionals.map((person)=><article className="profile-card" key={person.name}>{person.photo && <img src={person.photo} alt={person.name}/>}<div><h3>{person.name}</h3><p className="profile-role">{person.role}{person.credential ? " · "+person.credential : ""}</p><p>{person.bio}</p></div></article>)}</div></section>}
    {resultsGallery.length > 0 && <section className="proof-section" aria-label="Galeria de resultados"><div className="profile-heading"><p className="eyebrow"><span/> RESULTADOS E CUIDADOS</p><h2>Histórias de <em>autocuidado.</em></h2></div><div className="proof-grid">{resultsGallery.map((item)=><article className="proof-card" key={item.title}><img src={item.image} alt={item.alt}/><div><h3>{item.title}</h3><p>{item.description}</p></div></article>)}</div><p className="proof-note">Resultados individuais variam. Imagens publicadas somente com autorização e contexto adequado.</p></section>}
    {testimonials.length > 0 && <section className="testimonial-section"><div className="profile-heading"><p className="eyebrow"><span/> EXPERIÊNCIAS COMPARTILHADAS</p><h2>Palavras de quem <em>viveu o cuidado.</em></h2></div><div className="proof-grid">{testimonials.map((item)=><article className="testimonial-card" key={item.author+item.quote}><p>“{item.quote}”</p><strong>{item.author}</strong><small>{item.context}</small></article>)}</div></section>}
    <section className="quote-section"><Sparkles size={20}/><p>“O autocuidado não é um luxo.<br/>É a forma como você diz <em>eu importo.</em>”</p><span>{site.name} · NOSSA ESSÊNCIA</span></section>
    <section className="contact reveal-zone" id="contato"><div className="contact-image" style={{backgroundImage:"url("+photos.detail+")"}}/><div className="contact-copy reveal"><p className="eyebrow"><span/> SEU PRÓXIMO CAPÍTULO COMEÇA AQUI</p><h2>Vamos cuidar<br/>de <em>você?</em></h2><p>Conte para nós o que você procura. Nossa equipe vai ajudar a encontrar o cuidado ideal para o seu momento.</p>{site.whatsappUrl.startsWith("https://wa.me/") ? <a className="button button-dark" href={site.whatsappUrl} target="_blank" rel="noreferrer">Agendar pelo WhatsApp <ArrowUpRight size={17}/></a> : site.phone ? <a className="button button-dark" href={"tel:"+site.phone}>Ligar para a clínica <ArrowUpRight size={17}/></a> : <p className="contact-pending">Configure os canais de atendimento antes de publicar.</p>}<div className="contact-meta">{site.hours && <span>{site.hours}</span>}{site.city && <span>{site.city}</span>}{site.address && <span>{site.address}</span>}{site.mapsUrl && <a href={site.mapsUrl} target="_blank" rel="noreferrer">Como chegar <ArrowUpRight size={13}/></a>}{site.phone && <a href={"tel:"+site.phone}>{site.phone}</a>}{site.email && <a href={"mailto:"+site.email}>{site.email}</a>}</div></div></section>
    <footer><a className="brand footer-brand" href="#"><span className="brand-mark">m.</span><span>{site.name}<small>{site.descriptor}</small></span></a><p>Beleza com intenção. Cuidado com presença.</p>{site.instagramUrl && <a className="social" href={site.instagramUrl} target="_blank" rel="noreferrer"><Instagram size={17}/> INSTAGRAM</a>}<small>© {new Date().getFullYear()} {site.name}. TODOS OS DIREITOS RESERVADOS.</small></footer>
  </main>;
}