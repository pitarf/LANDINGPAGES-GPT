"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowDown, ArrowRight, ArrowUpRight, Instagram, Menu, MessageCircle, X, Plus } from "lucide-react";
import { site, professionals, testimonials, resultsGallery } from "./site.config";
const treatments = [
 {id:"01",name:"Clínica geral",text:"Acompanhamento preventivo e cuidados essenciais para a saúde bucal em diferentes fases da vida.",detail:"Prevenção, consultas e restaurações",steps:["Avaliação clínica e histórico de saúde","Orientação de higiene e prevenção","Plano de acompanhamento individual"]},
 {id:"02",name:"Estética dental",text:"Alternativas para cuidar da aparência do sorriso com indicação criteriosa e expectativas realistas.",detail:"Clareamento e planejamento estético",steps:["Análise da saúde bucal antes de procedimentos","Explicação das opções e limitações","Cuidados para preservar o resultado"]},
 {id:"03",name:"Ortodontia",text:"Estudo da posição dos dentes e da mordida para avaliar possibilidades de correção.",detail:"Aparelhos e alinhadores, quando indicados",steps:["Análise da mordida e documentação","Discussão das opções de tratamento","Acompanhamento e ajustes periódicos"]},
 {id:"04",name:"Implantodontia",text:"Avaliação para reabilitação de espaços sem dentes, considerando saúde, estrutura óssea e necessidades individuais.",detail:"Diagnóstico e planejamento reabilitador",steps:["Avaliação clínica e exames indicados","Planejamento individualizado","Orientações sobre etapas e manutenção"]}
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
 <section className="d-intro" id="filosofia"><div className="d-intro-label rise">NOSSA FILOSOFIA <span>01 / 04</span></div><div className="d-intro-title rise"><p className="d-eyebrow dark">MAIS DO QUE UM SORRISO</p><h2>Cuidar da saúde também é <i>cuidar de você.</i></h2></div><div className="d-intro-text rise"><p>Acreditamos em uma odontologia que começa pela escuta. Cada pessoa chega com uma história, uma expectativa e necessidades únicas. Nosso papel é oferecer clareza, segurança e um plano de cuidado construído em conjunto.</p><a href="#especialidades" className="d-link">Conheça nosso jeito de cuidar <ArrowRight size={16}/></a></div></section>
 <section className="d-approach approach" id="especialidades"><div className="d-section-title rise"><div><p className="d-eyebrow dark">CUIDADO INTEGRADO</p><h2>Especialidades que<br/><i>se conectam.</i></h2></div><p>Um olhar completo para a sua saúde bucal, com planejamento individual em cada etapa.</p></div><div className="d-treatment-list">{treatments.map((t,i)=><article className={open===i?"d-treatment expanded":"d-treatment"} key={t.id}><button type="button" onClick={()=>setOpen(open===i?null:i)} aria-expanded={open===i} aria-controls={"treatment-panel-"+t.id}><span className="d-treatment-id">{t.id}</span><span className="d-treatment-name">{t.name}</span><span className="d-treatment-detail">{t.detail}</span><span className="d-plus">{open===i?<X size={18}/>:<Plus size={18}/>}</span></button><div className="d-treatment-body" id={"treatment-panel-"+t.id} role="region" aria-label={t.name} hidden={open!==i}><p>{t.text}</p><ul className="d-treatment-steps">{t.steps.map((step)=><li key={step}>{step}</li>)}</ul><a href="#contato">Converse com nossa equipe <ArrowUpRight size={14}/></a></div></article>)}</div></section>
 <section className="d-space" id="equipe"><div className="d-space-image" style={{backgroundImage:"url("+images.clinic+")"}}/><div className="d-space-copy rise"><p className="d-eyebrow dark">UM ESPAÇO PENSADO PARA VOCÊ</p><h2>Precisão nos detalhes.<br/><i>Acolhimento em tudo.</i></h2><p>Ambientes tranquilos, tecnologia adequada e profissionais comprometidos com uma experiência transparente. Aqui, você entende cada etapa e participa das decisões sobre seu tratamento.</p><a className="d-link" href="#contato">Conheça o espaço <ArrowRight size={16}/></a></div><div className="d-space-stamp">{site.name} {site.city && <span>{site.city} · BRASIL</span>}</div></section>
 <section className="d-trust rise" aria-labelledby="d-trust-title"><div className="d-trust-heading"><p className="d-eyebrow dark">UMA JORNADA TRANSPARENTE</p><h2 id="d-trust-title">Confiança em <i>cada etapa.</i></h2><p>Um bom atendimento começa com informação clara. Você entende as opções, participa das decisões e recebe orientações adequadas ao seu caso.</p></div><div className="d-trust-grid"><article><span>01 / ESCUTA</span><h3>Avaliação cuidadosa</h3><p>Conhecer seu histórico, suas queixas e suas prioridades é o primeiro passo para um plano individual.</p></article><article><span>02 / PLANEJAMENTO</span><h3>Opções explicadas</h3><p>Apresentamos possibilidades, etapas, cuidados e limites para que você decida com segurança.</p></article><article><span>03 / CONTINUIDADE</span><h3>Acompanhamento próximo</h3><p>Orientações e revisões fazem parte do cuidado, respeitando a necessidade de cada tratamento.</p></article></div><p className="d-demo-note">Área preparada para avaliações verificadas de pacientes. Publique somente relatos autorizados e fiéis à experiência real.</p></section>
 {professionals.length > 0 && <section className="profile-section" id="equipe"><div className="profile-heading"><p className="d-eyebrow dark">NOSSA EQUIPE</p><h2>Profissionais que unem <i>técnica e cuidado.</i></h2></div><div className="profile-grid">{professionals.map((person)=><article className="profile-card" key={person.name}>{person.photo && <img src={person.photo} alt={person.name}/>}<div><h3>{person.name}</h3><p className="profile-role">{person.role}{person.credential ? " · "+person.credential : ""}</p><p>{person.bio}</p></div></article>)}</div></section>}
 {resultsGallery.length > 0 && <section className="proof-section"><div className="profile-heading"><p className="d-eyebrow dark">CASOS CLÍNICOS</p><h2>Planejamento com <i>responsabilidade.</i></h2></div><div className="proof-grid">{resultsGallery.map((item)=><article className="proof-card" key={item.title}><img src={item.image} alt={item.alt}/><div><h3>{item.title}</h3><p>{item.description}</p></div></article>)}</div><p className="proof-note">Casos divulgados somente com autorização expressa, preservando a privacidade do paciente. Cada tratamento exige avaliação individual.</p></section>}
 {testimonials.length > 0 && <section className="testimonial-section"><div className="profile-heading"><p className="d-eyebrow dark">RELATOS DE PACIENTES</p><h2>Experiências de <i>cuidado.</i></h2></div><div className="proof-grid">{testimonials.map((item)=><article className="testimonial-card" key={item.author+item.quote}><p>“{item.quote}”</p><strong>{item.author}</strong><small>{item.context}</small></article>)}</div></section>}
 <section className="d-quote"><span className="d-quote-mark">“</span><p>Um sorriso saudável começa<br/>quando você se sente <i>bem cuidado.</i></p><small>{site.name} · NOSSO COMPROMISSO</small></section>
 <section className="d-contact" id="contato"><div className="d-contact-copy"><p className="d-eyebrow">VAMOS CONVERSAR?</p><h2>O primeiro passo<br/>é uma <i>boa conversa.</i></h2><p>Agende uma avaliação e conheça um plano de cuidado pensado para suas necessidades.</p><a className="d-button light" href={site.whatsappUrl} target={site.whatsappUrl.startsWith("https://") ? "_blank" : undefined} rel="noreferrer">Fale com nossa equipe <ArrowUpRight size={16}/></a><div className="d-contact-meta">{site.hours && <span>{site.hours}</span>}{site.city && <span>{site.city}</span>}{site.address && <span>{site.address}</span>}{site.phone && <a href={"tel:"+site.phone}>{site.phone}</a>}{site.email && <a href={"mailto:"+site.email}>{site.email}</a>}</div></div><div className="d-contact-photo" style={{backgroundImage:"url("+images.detail+")"}}/></section>
 <footer className="d-footer"><a className="d-brand footer-d-brand" href="#"><span className="d-symbol">A</span><span>{site.name}<small>{site.descriptor}</small></span></a><p>Saúde, confiança e cuidado em cada detalhe.</p>{site.instagramUrl ? <a href={site.instagramUrl} target="_blank" rel="noreferrer"><Instagram size={16}/> INSTAGRAM</a> : <span className="d-footer-social"><Instagram size={16}/> INSTAGRAM</span>}<small>© {new Date().getFullYear()} {site.name}. TODOS OS DIREITOS RESERVADOS.</small></footer>
 </main>
}