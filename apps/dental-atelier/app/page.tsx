"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowDown, ArrowRight, ArrowUpRight, Instagram, Menu, X, Plus } from "lucide-react";
import { site } from "./site.config";
const treatments = [
 {id:"01",name:"Clínica geral",text:"Prevenção e cuidado contínuo para a saúde do seu sorriso.",detail:"Consultas, limpeza e acompanhamento"},
 {id:"02",name:"Estética dental",text:"Pequenos detalhes, grandes transformações com naturalidade.",detail:"Clareamento e facetas"},
 {id:"03",name:"Ortodontia",text:"Planejamento individual para alinhar função, conforto e estética.",detail:"Alinhadores e aparelhos"},
 {id:"04",name:"Implantodontia",text:"Reabilitação oral com planejamento cuidadoso e precisão.",detail:"Avaliação e planejamento"}
];
const images={hero:"https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1800&q=90",portrait:"https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1000&q=85",clinic:"https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=85",detail:"https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1000&q=85"};
export default function Home(){
 const root=useRef<HTMLElement>(null);const [open,setOpen]=useState<number|null>(0);const [menu,setMenu]=useState(false);const menuButtonRef=useRef<HTMLButtonElement>(null);
 useEffect(()=>{const onKeyDown=(event:KeyboardEvent)=>{if(event.key==="Escape"&&menu){setMenu(false);menuButtonRef.current?.focus()}};window.addEventListener("keydown",onKeyDown);return()=>window.removeEventListener("keydown",onKeyDown)},[menu]);
 useEffect(()=>{
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  let cleanup=()=>{};
  let cancelled=false;
  const setupAnimations=async()=>{
   try{
    const [{gsap},{ScrollTrigger}]=await Promise.all([import("gsap"),import("gsap/ScrollTrigger")]);
    if(cancelled)return;
    gsap.registerPlugin(ScrollTrigger);
    const context=gsap.context(()=>{
     gsap.utils.toArray<HTMLElement>(".rise").forEach((element)=>{
      gsap.fromTo(element,{y:34,autoAlpha:0},{y:0,autoAlpha:1,duration:.85,ease:"power3.out",scrollTrigger:{trigger:element,start:"top 88%",once:true}});
     });
     gsap.to(".dental-hero-photo",{yPercent:10,ease:"none",scrollTrigger:{trigger:".dental-hero",start:"top top",end:"bottom top",scrub:true}});
     const hero=root.current?.querySelector<HTMLElement>(".dental-hero");
     const heroPhoto=hero?.querySelector<HTMLElement>(".dental-hero-photo");
     const canTrackPointer=window.matchMedia("(hover: hover) and (pointer: fine)").matches;
     if(hero&&heroPhoto&&canTrackPointer){
      const moveX=gsap.quickTo(heroPhoto,"x",{duration:.7,ease:"power3.out"});
      const moveY=gsap.quickTo(heroPhoto,"y",{duration:.7,ease:"power3.out"});
      const handlePointerMove=(event:PointerEvent)=>{
       const bounds=hero.getBoundingClientRect();
       const offsetX=(event.clientX-bounds.left)/bounds.width-.5;
       const offsetY=(event.clientY-bounds.top)/bounds.height-.5;
       moveX(offsetX*-12);moveY(offsetY*-9);
      };
      const resetPointer=()=>{moveX(0);moveY(0)};
      hero.addEventListener("pointermove",handlePointerMove);
      hero.addEventListener("pointerleave",resetPointer);
      cleanup=()=>{hero.removeEventListener("pointermove",handlePointerMove);hero.removeEventListener("pointerleave",resetPointer);context.revert()};
     }else cleanup=()=>context.revert();
    },root.current??undefined);
    ScrollTrigger.refresh();
    if(cancelled)cleanup();
   }catch(error){console.error("Não foi possível iniciar as animações da página.",error)}
  };
  void setupAnimations();
  return()=>{cancelled=true;cleanup()};
 },[]);
 return <main ref={root}>
 <a className="skip-link" href="#filosofia">Pular para o conteúdo</a>
 <header className="d-nav"><a className="d-brand" href="#"><span className="d-symbol">A</span><span>{site.name}<small>{site.descriptor}</small></span></a><nav aria-label="Navegação principal" id="dental-navigation" className={menu?"d-links active":"d-links"}><a href="#filosofia" onClick={()=>{if(menu)menuButtonRef.current?.focus();setMenu(false)}}>Filosofia</a><a href="#especialidades" onClick={()=>{if(menu)menuButtonRef.current?.focus();setMenu(false)}}>Especialidades</a><a href="#equipe" onClick={()=>{if(menu)menuButtonRef.current?.focus();setMenu(false)}}>Nosso espaço</a><a href="#contato" onClick={()=>{if(menu)menuButtonRef.current?.focus();setMenu(false)}}>Contato</a></nav><a className="d-nav-cta" href="#contato">Agende sua avaliação <ArrowUpRight size={15}/></a><button ref={menuButtonRef} type="button" className="d-menu" aria-label={menu ? "Fechar menu" : "Abrir menu"} aria-expanded={menu} aria-controls="dental-navigation" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></header>
 <section className="dental-hero"><div className="dental-hero-photo" style={{backgroundImage:"linear-gradient(90deg,rgba(17,39,48,.72),rgba(17,39,48,.08)),url("+images.hero+")"}}/><div className="d-hero-copy"><motion.p className="d-eyebrow" initial={{opacity:0}} animate={{opacity:1}}>ODONTOLOGIA COM OUTRO OLHAR</motion.p><motion.h1 initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{delay:.2}}>Seu sorriso<br/>merece <i>cuidado.</i></motion.h1><motion.p className="d-hero-desc" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.5}}>Um encontro entre ciência, sensibilidade e precisão. Para cuidar da sua saúde com a atenção que você merece.</motion.p><motion.a href="#contato" className="d-button" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.7}}>Agende sua avaliação <ArrowUpRight size={16}/></motion.a></div><div className="d-hero-index">01 — 04 <span/> ODONTOLOGIA CONTEMPORÂNEA</div><a className="d-scroll" href="#filosofia"><ArrowDown size={15}/> DESCUBRA O ATELIER</a></section>
 <section className="d-intro" id="filosofia"><div className="d-intro-label rise">NOSSA FILOSOFIA <span>01 / 04</span></div><div className="d-intro-title rise"><p className="d-eyebrow dark">MAIS DO QUE UM SORRISO</p><h2>Cuidar da saúde também é <i>cuidar de você.</i></h2></div><div className="d-intro-text rise"><p>Acreditamos em uma odontologia que começa pela escuta. Cada pessoa chega com uma história, uma expectativa e necessidades únicas. Nosso papel é oferecer clareza, segurança e um plano de cuidado construído em conjunto.</p><a href="#equipe" className="d-link">Conheça nosso jeito de cuidar <ArrowRight size={16}/></a></div></section>
 <section className="d-approach approach" id="especialidades"><div className="d-section-title rise"><div><p className="d-eyebrow dark">CUIDADO INTEGRADO</p><h2>Especialidades que<br/><i>se conectam.</i></h2></div><p>Um olhar completo para a sua saúde bucal, com planejamento individual em cada etapa.</p></div><div className="d-treatment-list">{treatments.map((t,i)=><article className={open===i?"d-treatment expanded":"d-treatment"} key={t.id}><button type="button" onClick={()=>setOpen(open===i?null:i)} aria-expanded={open===i} aria-controls={"treatment-panel-"+t.id}><span className="d-treatment-id">{t.id}</span><span className="d-treatment-name">{t.name}</span><span className="d-treatment-detail">{t.detail}</span><span className="d-plus">{open===i?<X size={18}/>:<Plus size={18}/>}</span></button><div className="d-treatment-body" id={"treatment-panel-"+t.id} role="region" aria-label={t.name} hidden={open!==i}><p>{t.text}</p><a href="#contato">Converse com nossa equipe <ArrowUpRight size={14}/></a></div></article>)}</div></section>
 <section className="d-space" id="equipe"><div className="d-space-image" style={{backgroundImage:"url("+images.clinic+")"}}/><div className="d-space-copy rise"><p className="d-eyebrow dark">UM ESPAÇO PENSADO PARA VOCÊ</p><h2>Precisão nos detalhes.<br/><i>Acolhimento em tudo.</i></h2><p>Ambientes tranquilos, tecnologia adequada e profissionais comprometidos com uma experiência transparente. Aqui, você entende cada etapa e participa das decisões sobre seu tratamento.</p><a className="d-link" href="#contato">Conheça o espaço <ArrowRight size={16}/></a></div><div className="d-space-stamp">{site.name} <span>{site.city} · BRASIL</span></div></section>
 <section className="d-quote"><span className="d-quote-mark">“</span><p>Um sorriso saudável começa<br/>quando você se sente <i>bem cuidado.</i></p><small>{site.name} · NOSSO COMPROMISSO</small></section>
 <section className="d-contact" id="contato"><div className="d-contact-copy"><p className="d-eyebrow">VAMOS CONVERSAR?</p><h2>O primeiro passo<br/>é uma <i>boa conversa.</i></h2><p>Agende uma avaliação e conheça um plano de cuidado pensado para suas necessidades.</p><a className="d-button light" href={site.whatsappUrl} target={site.whatsappUrl.startsWith("https://") ? "_blank" : undefined} rel="noreferrer">Fale com nossa equipe <ArrowUpRight size={16}/></a><div className="d-contact-meta"><span>{site.hours}</span><span>{site.city}</span></div></div><div className="d-contact-photo" style={{backgroundImage:"url("+images.detail+")"}}/></section>
 <footer className="d-footer"><a className="d-brand footer-d-brand" href="#"><span className="d-symbol">A</span><span>{site.name}<small>{site.descriptor}</small></span></a><p>Saúde, confiança e cuidado em cada detalhe.</p>{site.instagramUrl ? <a href={site.instagramUrl} target="_blank" rel="noreferrer"><Instagram size={16}/> INSTAGRAM</a> : <span className="d-footer-social"><Instagram size={16}/> INSTAGRAM · CONFIGURAR PERFIL</span>}<small>© {new Date().getFullYear()} {site.name}. TODOS OS DIREITOS RESERVADOS.</small></footer>
 </main>
}