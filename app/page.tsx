'use client';

import { useState, useEffect, useRef } from 'react';

// CSS Variables injection
const cssVariables = `
  :root {
    --color-background: #0F1117;
    --color-secondary: #1A1F2E;
    --color-surface: #1E2333;
    --color-primary: #FFD600;
    --color-accent: #FFF176;
    --color-text: #F0F0F0;
    --color-border: #2E3450;
    --border-radius: 8px;
    --shadow-card: 0 4px 24px rgba(0, 0, 0, 0.4);
    --shadow-hover: 0 8px 32px rgba(255, 214, 0, 0.2);
    --shadow-button: 0 2px 12px rgba(255, 214, 0, 0.3);
    --spacing-section-padding: 120px 0;
    --spacing-element-gap: 32px;
    --spacing-container-max: 1280px;
    --font-heading: Pretendard, 'Noto Sans KR', sans-serif;
    --font-body: Pretendard, 'Noto Sans KR', sans-serif;
    --text-h1: clamp(40px, 5vw, 72px);
    --text-h2: clamp(28px, 3.5vw, 48px);
    --text-h3: clamp(20px, 2.5vw, 32px);
    --text-base: 16px;
    --animation-duration: 0.3s;
    --animation-easing: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
`;

interface NewsItem {
  category: string;
  date: string;
  title: string;
}

interface IRItem {
  label: string;
  value?: string;
  change?: string;
}

const newsItems: NewsItem[] = [
  { category: 'Global', date: '2025.06.10', title: '사우디아라비아 메카, 메디나, 제다의 디지털 트윈 플랫폼 공개' },
  { category: '보도자료', date: '2025.01.16', title: 'AI 챗봇으로 웹툰 캐릭터와 대화 나누니 원작 소비 쑥↑… AI와 IP 결합 시너지 내는 네이버웹툰' },
  { category: '보도자료', date: '2025.01.16', title: '크림, 홍대 스토어 리뉴얼 오픈…아울렛 코너 처음 선보인다' },
  { category: '보도자료', date: '2025.01.16', title: '팀네이버, 사우디 전시회 LEAP에서 데이터센터-클라우드-AI 아우르는 밸류체인 선보인다' },
  { category: '보도자료', date: '2025.01.16', title: '네이버페이, 한국신용정보원-NICE평가정보와 금융권 데이터 활용 활성화를 위한 공동연구 MOU 체결' },
  { category: '보도자료', date: '2025.01.16', title: '네이버클라우드, AI 튜터 등 AI 활용한 다양한 교육 솔루션 선보여' },
  { category: 'People', date: '2025.01.16', title: '기술의 생명을 지키는 일 NAVER I Design UX디자인' },
];

const serviceItems = [
  '포털', '도구', '검색', '광고', '커머스', '클라우드',
  '핀테크', '1784', '콘텐츠', '데이터센터 각', '커뮤니티', '지도'
];

const techItems = ['HyperCLOVA X', '공간지능', '로보틱스', '이머시브 미디어'];

const esgItems = ['지속가능경영', 'Social Tech for People', 'Environment', 'Principle', 'ESG 자료실'];

const subsidiaries = ['네이버클라우드', '스노우', '네이버랩스', '네이버웹툰', '네이버파이낸셜'];

export default function HomePage() {
  const [activeNewsIndex, setActiveNewsIndex] = useState(0);
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const setSectionRef = (id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveNewsIndex((prev) => (prev + 1) % newsItems.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <style>{cssVariables}</style>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background-color: var(--color-background); color: var(--color-text); font-family: var(--font-body); }
        .container { max-width: var(--spacing-container-max); margin: 0 auto; padding: 0 24px; }
        @media (min-width: 768px) { .container { padding: 0 48px; } }
        .section-fade { opacity: 0; transform: translateY(40px); transition: opacity 0.7s var(--animation-easing), transform 0.7s var(--animation-easing); }
        .section-fade.visible { opacity: 1; transform: translateY(0); }
        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background-color: var(--color-primary); color: var(--color-background);
          padding: 14px 28px; border-radius: var(--border-radius);
          font-family: var(--font-body); font-size: 15px; font-weight: 700;
          letter-spacing: -0.02em; cursor: pointer; border: none;
          box-shadow: var(--shadow-button);
          transition: all var(--animation-duration) var(--animation-easing);
          text-decoration: none;
        }
        .btn-primary:hover { background-color: var(--color-accent); box-shadow: var(--shadow-hover); transform: translateY(-2px); }
        .btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: var(--color-primary);
          padding: 12px 24px; border-radius: var(--border-radius);
          font-family: var(--font-body); font-size: 14px; font-weight: 600;
          letter-spacing: -0.02em; cursor: pointer;
          border: 1px solid var(--color-primary);
          transition: all var(--animation-duration) var(--animation-easing);
          text-decoration: none;
        }
        .btn-ghost:hover { background-color: var(--color-primary); color: var(--color-background); box-shadow: var(--shadow-hover); }
        .card {
          background-color: var(--color-surface); border: 1px solid var(--color-border);
          border-radius: var(--border-radius); box-shadow: var(--shadow-card);
          transition: all var(--animation-duration) var(--animation-easing);
        }
        .card:hover { box-shadow: var(--shadow-hover); border-color: var(--color-primary); transform: translateY(-4px); }
        .tag {
          display: inline-block; padding: 4px 12px;
          background-color: rgba(255, 214, 0, 0.12); color: var(--color-primary);
          border-radius: 100px; font-size: 12px; font-weight: 600; letter-spacing: 0.04em;
        }
        .divider { border: none; border-top: 1px solid var(--color-border); }
        .ticker-item { animation: tickerMove 0.5s var(--animation-easing); }
        @keyframes tickerMove { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .service-pill {
          display: inline-flex; align-items: center;
          padding: 10px 20px; border-radius: 100px;
          border: 1px solid var(--color-border); background: var(--color-surface);
          font-size: 14px; font-weight: 500; color: var(--color-text);
          cursor: pointer;
          transition: all var(--animation-duration) var(--animation-easing);
        }
        .service-pill:hover { border-color: var(--color-primary); color: var(--color-primary); background: rgba(255,214,0,0.08); }
        .nav-link { color: rgba(240,240,240,0.8); font-size: 14px; font-weight: 500; text-decoration: none; transition: color 0.2s; }
        .nav-link:hover { color: var(--color-primary); }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes pulse-dot { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        .live-dot { animation: pulse-dot 2s infinite; }
        .section-label {
          font-size: 12px; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--color-primary);
          display: flex; align-items: center; gap: 8px;
        }
        .section-label::before {
          content: ''; display: block; width: 24px; height: 2px;
          background: var(--color-primary);
        }
        .news-item-hover:hover { background-color: rgba(255,214,0,0.04); }
        .footer-link { color: rgba(240,240,240,0.5); font-size: 13px; text-decoration: none; transition: color 0.2s; }
        .footer-link:hover { color: var(--color-primary); }
        .gradient-overlay {
          background: linear-gradient(to bottom, transparent 60%, var(--color-background));
        }
        .hero-grid-line {
          position: absolute; background: var(--color-border); opacity: 0.5;
        }
        .number-highlight {
          font-size: var(--text-h1); font-family: var(--font-heading);
          font-weight: 800; color: var(--color-primary); letter-spacing: -0.04em;
          line-height: 1;
        }
        .cta-section-bg {
          background: linear-gradient(135deg, var(--color-surface) 0%, var(--color-secondary) 100%);
          border: 1px solid var(--color-border);
        }
      `}</style>

      <div style={{ backgroundColor: 'var(--color-background)', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>

        {/* Navigation */}
        <nav
          role="navigation"
          aria-label="주 메뉴"
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
            backgroundColor: 'rgba(15, 17, 23, 0.92)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
            <a href="/" aria-label="NAVER Corp 홈" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
              <div style={{
                width: '32px', height: '32px', backgroundColor: 'var(--color-primary)',
                borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: '18px', fontWeight: '900', color: 'var(--color-background)', letterSpacing: '-0.05em' }}>N</span>
              </div>
              <span style={{ fontSize: '16px', fontWeight: '700', color: 'var(--color-text)', letterSpacing: '-0.02em' }}>NAVER Corp</span>
            </a>
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="hidden md:flex">
              {['회사 소개', '서비스', '기술', 'ESG', '뉴스룸', 'IR'].map((item) => (
                <a key={item} href="#" className="nav-link">{item}</a>
              ))}
            </div>
            <a href="#contact" className="btn-primary" style={{ padding: '10px 20px', fontSize: '13px' }}>
              파트너십 시작하기
            </a>
          </div>
        </nav>

        {/* Section 1: Hero */}
        <section
          id="hero"
          aria-label="히어로 섹션"
          style={{
            minHeight: '100vh',
            paddingTop: '72px',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: 'var(--color-background)',
          }}
        >
          {/* Background grid lines */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="hero-grid-line" style={{
                left: `${(i + 1) * (100 / 7)}%`, top: 0, bottom: 0, width: '1px',
              }} />
            ))}
            {[...Array(4)].map((_, i) => (
              <div key={i} className="hero-grid-line" style={{
                top: `${(i + 1) * 25}%`, left: 0, right: 0, height: '1px',
              }} />
            ))}
            {/* Radial glow */}
            <div style={{
              position: 'absolute', top: '30%', right: '10%',
              width: '600px', height: '600px',
              background: 'radial-gradient(circle, rgba(255,214,0,0.08) 0%, transparent 70%)',
              borderRadius: '50%',
            }} />
          </div>

          <div className="container" style={{ position: 'relative', zIndex: 1, padding: 'var(--spacing-section-padding)' }}>
            <div style={{ maxWidth: '800px' }}>
              <div className="tag" style={{ marginBottom: '24px' }}>NAVER Corp. B2B Platform</div>
              <h1 style={{
                fontSize: 'var(--text-h1)',
                fontFamily: 'var(--font-heading)',
                fontWeight: '800',
                letterSpacing: '-0.03em',
                lineHeight: '1.1',
                color: 'var(--color-text)',
                marginBottom: '24px',
              }}>
                기술로 연결하고,<br />
                <span style={{ color: 'var(--color-primary)' }}>함께 성장합니다.</span>
              </h1>
              <p style={{
                fontSize: 'clamp(16px, 1.5vw, 20px)',
                lineHeight: '1.65',
                color: 'rgba(240,240,240,0.7)',
                maxWidth: '560px',
                marginBottom: '40px',
                letterSpacing: '-0.01em',
              }}>
                네이버는 AI 원천기술과 혁신적인 플랫폼 서비스를 통해<br />
                사용자, 파트너, 사회와 함께 성장합니다.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <a href="#about" className="btn-primary">
                  자세히 알아보기
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a href="#ir" className="btn-ghost">
                  IR 자료 다운로드
                </a>
              </div>

              {/* Stats Row */}
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '32px', marginTop: '80px', paddingTop: '48px',
                borderTop: '1px solid var(--color-border)',
              }}>
                {[
                  { value: '4,200+', label: '글로벌 파트너사' },
                  { value: '92M+', label: '월간 활성 사용자' },
                  { value: '35+', label: '핵심 서비스' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div style={{
                      fontSize: 'clamp(28px, 3vw, 44px)',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: '800',
                      color: 'var(--color-primary)',
                      letterSpacing: '-0.04em',
                      lineHeight: '1',
                      marginBottom: '8px',
                    }}>{stat.value}</div>
                    <div style={{ fontSize: '13px', color: 'rgba(240,240,240,0.5)', fontWeight: '500' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hero image */}
          <div style={{
            position: 'absolute', right: 0, top: '72px', bottom: 0, width: '45%',
            overflow: 'hidden',
          }} className="hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=900&auto=format&fit=crop&q=80"
              alt="네이버 테크 비전"
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to right, var(--color-background) 0%, transparent 40%, transparent 80%, var(--color-background) 100%)',
            }} />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to bottom, var(--color-background) 0%, transparent 20%, transparent 80%, var(--color-background) 100%)',
            }} />
          </div>
        </section>

        {/* Section 2: Feature Grid */}
        <section
          id="features"
          ref={setSectionRef('features')}
          aria-labelledby="features-heading"
          style={{ padding: 'var(--spacing-section-padding)', backgroundColor: 'var(--color-secondary)' }}
        >
          <div className={`container section-fade ${isVisible['features'] ? 'visible' : ''}`}>
            <div style={{ marginBottom: '16px' }}>
              <span className="section-label">핵심 영역</span>
            </div>
            <h2
              id="features-heading"
              style={{
                fontSize: 'var(--text-h2)', fontFamily: 'var(--font-heading)',
                fontWeight: '700', letterSpacing: '-0.03em', color: 'var(--color-text)',
                marginBottom: '16px',
              }}
            >
              네이버가 이끄는 세 가지 축
            </h2>
            <p style={{ fontSize: '16px', color: 'rgba(240,240,240,0.6)', marginBottom: '64px', maxWidth: '480px' }}>
              네이버의 핵심 서비스, 기술, 그리고 지속가능경영을 한눈에 확인하세요.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-element-gap)' }}>
              {[
                {
                  icon: '◎',
                  badge: 'Service',
                  title: '서비스',
                  subtitle: '검색에서 탐색으로 진화',
                  tag: 'On-Service AI',
                  desc: '네이버의 서비스는 AI를 통해 더욱 스마트하고 개인화된 경험을 제공합니다.',
                  href: '#service',
                },
                {
                  icon: '⚡',
                  badge: 'Technology',
                  title: '기술',
                  subtitle: '혁신의 기술을 일상의 서비스로',
                  tag: 'Everyday Tech',
                  desc: 'HyperCLOVA X를 비롯한 자체 AI 기술로 산업 전반의 디지털 전환을 선도합니다.',
                  href: '#technology',
                },
                {
                  icon: '♻',
                  badge: 'ESG',
                  title: '지속가능성',
                  subtitle: '지속가능성을 위한 약속과 실천',
                  tag: 'ESG Commitment',
                  desc: '환경·사회·지배구조 전반에 걸친 책임 있는 경영으로 미래 세대와 함께합니다.',
                  href: '#esg',
                },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="card"
                  style={{ padding: '40px', textDecoration: 'none', display: 'block', cursor: 'pointer' }}
                  aria-label={`${item.title} - ${item.subtitle}`}
                >
                  <div style={{
                    width: '56px', height: '56px', borderRadius: 'var(--border-radius)',
                    backgroundColor: 'rgba(255,214,0,0.1)', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '24px', marginBottom: '24px',
                    border: '1px solid rgba(255,214,0,0.2)',
                  }}>
                    {item.icon}
                  </div>
                  <div className="tag" style={{ marginBottom: '16px', fontSize: '11px' }}>{item.tag}</div>
                  <h3 style={{
                    fontSize: 'var(--text-h3)', fontFamily: 'var(--font-heading)',
                    fontWeight: '700', color: 'var(--color-text)', letterSpacing: '-0.02em',
                    marginBottom: '8px',
                  }}>{item.title}</h3>
                  <p style={{ fontSize: '15px', fontWeight: '600', color: 'var(--color-primary)', marginBottom: '16px' }}>
                    {item.subtitle}
                  </p>
                  <p style={{ fontSize: '14px', color: 'rgba(240,240,240,0.6)', lineHeight: '1.65' }}>
                    {item.desc}
                  </p>
                  <div style={{ marginTop: '32px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)', fontSize: '14px', fontWeight: '600' }}>
                    자세히 보기
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Services CTA Banner */}
        <section
          id="service"
          ref={setSectionRef('service')}
          aria-labelledby="service-heading"
          style={{ padding: 'var(--spacing-section-padding)', backgroundColor: 'var(--color-background)' }}
        >
          <div className={`container section-fade ${isVisible['service'] ? 'visible' : ''}`}>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr',
              gap: '64px',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div>
                  <span className="section-label" style={{ marginBottom: '16px', display: 'flex' }}>On-Service AI</span>
                  <h2
                    id="service-heading"
                    style={{
                      fontSize: 'var(--text-h2)', fontFamily: 'var(--font-heading)',
                      fontWeight: '700', letterSpacing: '-0.03em', color: 'var(--color-text)',
                      marginBottom: '16px', lineHeight: '1.2',
                    }}
                  >
                    검색에서 탐색으로,<br />
                    <span style={{ color: 'var(--color-primary)' }}>AI가 바꾸는 서비스</span>
                  </h2>
                  <p style={{ fontSize: '16px', color: 'rgba(240,240,240,0.6)', lineHeight: '1.65', maxWidth: '480px' }}>
                    AI 원천기술을 도입하여 사용자의 다양한 요구와 상황에 최적화된 맞춤형 서비스로 나아갑니다.
                  </p>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  {serviceItems.map((item) => (
                    <button key={item} className="service-pill" aria-label={`${item} 서비스`}>
                      {item}
                    </button>
                  ))}
                </div>
                <div>
                  <a href="#" className="btn-primary">
                    자세히 알아보기
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Service visualization */}
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
              }}>
                {serviceItems.slice(0, 6).map((item, idx) => (
                  <div key={item} className="card" style={{ padding: '24px', textAlign: 'center' }}>
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '50%',
                      backgroundColor: `rgba(255,214,0,${0.05 + idx * 0.02})`,
                      border: '1px solid rgba(255,214,0,0.15)',
                      margin: '0 auto 12px',
                    }} />
                    <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-text)' }}>{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Technology CTA Banner */}
        <section
          id="technology"
          ref={setSectionRef('technology')}
          aria-labelledby="tech-heading"
          style={{ padding: 'var(--spacing-section-padding)', backgroundColor: 'var(--color-secondary)' }}
        >
          <div className={`container section-fade ${isVisible['technology'] ? 'visible' : ''}`}>
            <div style={{
              position: 'relative', borderRadius: '16px', overflow: 'hidden',
              padding: '80px 64px',
            }}
              className="cta-section-bg"
            >
              {/* Background image overlay */}
              <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                <img
                  src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1400&auto=format&fit=crop&q=60"
                  alt=""
                  aria-hidden="true"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.08 }}
                />
              </div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <span className="section-label" style={{ marginBottom: '16px', display: 'flex' }}>Everyday Tech</span>
                <h2
                  id="tech-heading"
                  style={{
                    fontSize: 'var(--text-h2)', fontFamily: 'var(--font-heading)',
                    fontWeight: '700', letterSpacing: '-0.03em', color: 'var(--color-text)',
                    marginBottom: '16px', maxWidth: '600px', lineHeight: '1.2',
                  }}
                >
                  혁신의 기술을<br />
                  <span style={{ color: 'var(--color-primary)' }}>일상의 서비스로</span>
                </h2>
                <p style={{ fontSize: '16px', color: 'rgba(240,240,240,0.6)', lineHeight: '1.65', maxWidth: '560px', marginBottom: '48px' }}>
                  지속적인 연구개발(R&D) 투자로 일상생활 속으로 더 깊숙이 확장될 네이버 플랫폼의 미래를 준비합니다.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '48px' }}>
                  {techItems.map((item, idx) => (
                    <div key={item} style={{
                      padding: '16px 24px',
                      borderRadius: 'var(--border-radius)',
                      backgroundColor: idx === 0 ? 'rgba(255,214,0,0.15)' : 'rgba(30,35,51,0.8)',
                      border: `1px solid ${idx === 0 ? 'rgba(255,214,0,0.4)' : 'var(--color-border)'}`,
                      backdropFilter: 'blur(8px)',
                    }}>
                      <div style={{
                        fontSize: '15px', fontWeight: '700',
                        color: idx === 0 ? 'var(--color-primary)' : 'var(--color-text)',
                        letterSpacing: '-0.01em',
                      }}>{item}</div>
                    </div>
                  ))}
                </div>
                <a href="#" className="btn-primary">
                  자세히 알아보기
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: ESG CTA Banner */}
        <section
          id="esg"
          ref={setSectionRef('esg')}
          aria-labelledby="esg-heading"
          style={{ padding: 'var(--spacing-section-padding)', backgroundColor: 'var(--color-background)' }}
        >
          <div className={`container section-fade ${isVisible['esg'] ? 'visible' : ''}`}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}
              className="flex flex-col lg:grid">
              <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', aspectRatio: '4/3' }}>
                <img
                  src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800&auto=format&fit=crop&q=80"
                  alt="지속가능성"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(135deg, rgba(15,17,23,0.6) 0%, transparent 60%)',
                }} />
                <div style={{ position: 'absolute', bottom: '32px', left: '32px' }}>
                  <div style={{
                    fontSize: '48px', fontWeight: '800', color: 'var(--color-primary)',
                    fontFamily: 'var(--font-heading)', letterSpacing: '-0.04em',
                  }}>2045</div>
                  <div style={{ fontSize: '14px', color: 'rgba(240,240,240,0.8)', fontWeight: '500' }}>탄소중립 목표 연도</div>
                </div>
              </div>
              <div>
                <span className="section-label" style={{ marginBottom: '16px', display: 'flex' }}>ESG</span>
                <h2
                  id="esg-heading"
                  style={{
                    fontSize: 'var(--text-h2)', fontFamily: 'var(--font-heading)',
                    fontWeight: '700', letterSpacing: '-0.03em', color: 'var(--color-text)',
                    marginBottom: '16px', lineHeight: '1.2',
                  }}
                >
                  더 나은 세상을 위한<br />
                  <span style={{ color: 'var(--color-primary)' }}>약속과 실천</span>
                </h2>
                <p style={{ fontSize: '16px', color: 'rgba(240,240,240,0.6)', lineHeight: '1.65', marginBottom: '40px' }}>
                  네이버의 기술과 서비스로 사회에 긍정적이고 지속적인 변화를 함께 만들어 갑니다.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
                  {esgItems.map((item) => (
                    <a
                      key={item}
                      href="#"
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '16px 20px', borderRadius: 'var(--border-radius)',
                        border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)',
                        textDecoration: 'none', color: 'var(--color-text)',
                        transition: 'all var(--animation-duration) var(--animation-easing)',
                        fontSize: '14px', fontWeight: '500',
                      }}
                      className="news-item-hover"
                    >
                      <span>{item}</span>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  ))}
                </div>
                <a href="#" className="btn-ghost">
                  자세히 알아보기
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: News Room */}
        <section
          id="newsroom"
          ref={setSectionRef('newsroom')}
          aria-labelledby="news-heading"
          style={{ padding: 'var(--spacing-section-padding)', backgroundColor: 'var(--color-secondary)' }}
        >
          <div className={`container section-fade ${isVisible['newsroom'] ? 'visible' : ''}`}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '48px', flexWrap: 'wrap', gap: '24px' }}>
              <div>
                <span className="section-label" style={{ marginBottom: '16px', display: 'flex' }}>Newsroom</span>
                <h2
                  id="news-heading"
                  style={{
                    fontSize: 'var(--text-h2)', fontFamily: 'var(--font-heading)',
                    fontWeight: '700', letterSpacing: '-0.03em', color: 'var(--color-text)',
                    marginBottom: '12px',
                  }}
                >
                  최신 소식
                </h2>
                <p style={{ fontSize: '15px', color: 'rgba(240,240,240,0.6)' }}>
                  네이버의 최신 소식, 보도자료, 사람 이야기를 확인하세요.
                </p>
              </div>
              <a href="#" className="btn-ghost">
                스토리 전체보기
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>

            {/* Featured news */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="flex flex-col lg:grid">
              {/* Main featured */}
              <a href="#" className="card" style={{ padding: '0', overflow: 'hidden', textDecoration: 'none', display: 'block' }}>
                <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                  <img
                    src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=80"
                    alt="사우디아라비아 디지털 트윈"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to bottom, transparent 30%, rgba(15,17,23,0.9))',
                  }} />
                  <div style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
                    <span className="tag" style={{ marginBottom: '8px', display: 'inline-block' }}>Global</span>
                    <div style={{ fontSize: '12px', color: 'rgba(240,240,240,0.6)' }}>2025.06.10</div>
                  </div>
                </div>
                <div style={{ padding: '28px 32px 32px' }}>
                  <h3 style={{
                    fontSize: '18px', fontFamily: 'var(--font-heading)',
                    fontWeight: '700', color: 'var(--color-text)', letterSpacing: '-0.02em',
                    lineHeight: '1.5',
                  }}>
                    사우디아라비아 메카, 메디나, 제다의 디지털 트윈 플랫폼 공개
                  </h3>
                </div>
              </a>

              {/* News list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {newsItems.slice(1).map((item, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="news-item-hover"
                    style={{
                      display: 'block', padding: '20px 24px',
                      borderBottom: '1px solid var(--color-border)',
                      textDecoration: 'none', transition: 'background 0.2s',
                      borderRadius: idx === 0 ? 'var(--border-radius) var(--border-radius) 0 0' : idx === newsItems.length - 2 ? '0 0 var(--border-radius) var(--border-radius)' : '0',
                      backgroundColor: 'var(--color-surface)',
                    }}
                    aria-label={`${item.category} ${item.date}: ${item.title}`}
                  >
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '8px' }}>
                      <span className="tag" style={{ fontSize: '10px', padding: '2px 8px' }}>{item.category}</span>
                      <span style={{ fontSize: '12px', color: 'rgba(240,240,240,0.4)' }}>{item.date}</span>
                    </div>
                    <p style={{
                      fontSize: '13px', color: 'var(--color-text)', lineHeight: '1.55',
                      fontWeight: '500',
                      display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    }}>
                      {item.title}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: IR */}
        <section
          id="ir"
          ref={setSectionRef('ir')}
          aria-labelledby="ir-heading"
          style={{ padding: 'var(--spacing-section-padding)', backgroundColor: 'var(--color-background)' }}
        >
          <div className={`container section-fade ${isVisible['ir'] ? 'visible' : ''}`}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }} className="flex flex-col lg:grid">
              <div>
                <span className="section-label" style={{ marginBottom: '16px', display: 'flex' }}>Investor Relations</span>
                <h2
                  id="ir-heading"
                  style={{
                    fontSize: 'var(--text-h2)', fontFamily: 'var(--font-heading)',
                    fontWeight: '700', letterSpacing: '-0.03em', color: 'var(--color-text)',
                    marginBottom: '16px', lineHeight: '1.2',
                  }}
                >
                  투자자 정보
                </h2>
                <p style={{ fontSize: '16px', color: 'rgba(240,240,240,0.6)', lineHeight: '1.65', marginBottom: '40px' }}>
                  네이버 주가 및 최신 IR 정보를 확인하세요.
                </p>

                {/* Stock */}
                <div className="card" style={{ padding: '32px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div style={{ fontSize: '13px', color: 'rgba(240,240,240,0.5)', fontWeight: '500' }}>NAVER Corp. (035420)</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div className="live-dot" style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-primary)' }} />
                      <span style={{ fontSize: '11px', color: 'var(--color-primary)', fontWeight: '600' }}>LIVE</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '8px' }}>
                    <span style={{
                      fontSize: 'clamp(32px, 4vw, 48px)', fontFamily: 'var(--font-heading)',
                      fontWeight: '800', color: 'var(--color-text)', letterSpacing: '-0.04em',
                    }}>206,000</span>
                    <span style={{ fontSize: '18px', color: 'rgba(240,240,240,0.5)', fontWeight: '500' }}>KRW</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '15px', color: '#4ade80', fontWeight: '600' }}>▲ 1,200</span>
                    <span style={{
                      backgroundColor: 'rgba(74, 222, 128, 0.12)', color: '#4ade80',
                      padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600',
                    }}>+0.6%</span>
                  </div>
                </div>

                <a href="#" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  자세히 보기
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { icon: '📊', title: '2024년 4분기 NAVER 실적 발표', sub: '분기 실적 발표 자료', badge: 'New' },
                  { icon: '📋', title: '2025 통합보고서 다운로드', sub: 'Annual Integrated Report', badge: 'PDF' },
                  { icon: '📈', title: 'NAVER Annual Report', sub: '연간 보고서', badge: '' },
                  { icon: '🌱', title: 'ESG Library', sub: 'ESG 데이터 및 자료', badge: '' },
                ].map((doc) => (
                  <a
                    key={doc.title}
                    href="#"
                    className="card"
                    style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px', textDecoration: 'none' }}
                    aria-label={doc.title}
                  >
                    <div style={{
                      width: '48px', height: '48px', flexShrink: 0,
                      borderRadius: 'var(--border-radius)', backgroundColor: 'rgba(255,214,0,0.08)',
                      border: '1px solid rgba(255,214,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '20px',
                    }}>{doc.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '15px', fontWeight: '600', color: 'var(--color-text)' }}>{doc.title}</span>
                        {doc.badge && (
                          <span style={{
                            fontSize: '10px', fontWeight: '700', padding: '2px 6px',
                            backgroundColor: 'var(--color-primary)', color: 'var(--color-background)',
                            borderRadius: '4px',
                          }}>{doc.badge}</span>
                        )}
                      </div>
                      <div style={{ fontSize: '12px', color: 'rgba(240,240,240,0.5)' }}>{doc.sub}</div>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0, color: 'rgba(240,240,240,0.3)' }}>
                      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: Partners & Developers */}
        <section
          id="partners"
          ref={setSectionRef('partners')}
          aria-labelledby="partners-heading"
          style={{ padding: 'var(--spacing-section-padding)', backgroundColor: 'var(--color-secondary)' }}
        >
          <div className={`container section-fade ${isVisible['partners'] ? 'visible' : ''}`}>
            <div style={{ marginBottom: '16px' }}>
              <span className="section-label">파트너 & 개발자</span>
            </div>
            <h2
              id="partners-heading"
              style={{
                fontSize: 'var(--text-h2)', fontFamily: 'var(--font-heading)',
                fontWeight: '700', letterSpacing: '-0.03em', color: 'var(--color-text)',
                marginBottom: '16px',
              }}
            >
              함께 성장하는 생태계
            </h2>
            <p style={{ fontSize: '16px', color: 'rgba(240,240,240,0.6)', marginBottom: '64px', maxWidth: '480px' }}>
              비즈니스 파트너와 개발자를 위한 다양한 지원 프로그램을 제공합니다.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }} className="flex flex-col lg:grid">
              {/* Business */}
              <div className="card" style={{ padding: '40px' }}>
                <div style={{ marginBottom: '32px' }}>
                  <div className="tag" style={{ marginBottom: '16px' }}>Business</div>
                  <h3 style={{ fontSize: 'var(--text-h3)', fontFamily: 'var(--font-heading)', fontWeight: '700', color: 'var(--color-text)', letterSpacing: '-0.02em', marginBottom: '12px' }}>
                    네이버 비즈니스
                  </h3>
                  <p style={{ fontSize: '14px', color: 'rgba(240,240,240,0.6)', lineHeight: '1.65' }}>
                    소상공인부터 대기업까지, 네이버의 다양한 비즈니스 도구를 활용하세요.
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {['네이버 비즈니스 스쿨', '네이버 광고', '스토어 개설', '지역업체 등록', '엑스퍼트 등록', 'SME 풀케어'].map((item) => (
                    <a key={item} href="#" style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '12px 16px', borderRadius: 'var(--border-radius)',
                      backgroundColor: 'rgba(15,17,23,0.5)', border: '1px solid var(--color-border)',
                      textDecoration: 'none', color: 'var(--color-text)', fontSize: '13px', fontWeight: '500',
                      transition: 'all var(--animation-duration)',
                    }}
                      className="news-item-hover"
                    >
                      <span>{item}</span>
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ opacity: 0.4 }}>
                        <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  ))}
                </div>
              </div>

              {/* Developer */}
              <div className="card" style={{ padding: '40px' }}>
                <div style={{ marginBottom: '32px' }}>
                  <div className="tag" style={{ marginBottom: '16px' }}>Developer</div>
                  <h3 style={{ fontSize: 'var(--text-h3)', fontFamily: 'var(--font-heading)', fontWeight: '700', color: 'var(--color-text)', letterSpacing: '-0.02em', marginBottom: '12px' }}>
                    네이버 개발자
                  </h3>
                  <p style={{ fontSize: '14px', color: 'rgba(240,240,240,0.6)', lineHeight: '1.65' }}>
                    오픈 API, 오픈소스, 개발자 커뮤니티를 통해 혁신을 함께 만들어 갑니다.
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {['네이버 개발자 센터', '오픈 API', '오픈소스', '네이버 D2', '네이버 D2SF'].map((item) => (
                    <a key={item} href="#" style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '12px 16px', borderRadius: 'var(--border-radius)',
                      backgroundColor: 'rgba(15,17,23,0.5)', border: '1px solid var(--color-border)',
                      textDecoration: 'none', color: 'var(--color-text)', fontSize: '13px', fontWeight: '500',
                      transition: 'all var(--animation-duration)',
                    }}
                      className="news-item-hover"
                    >
                      <span>{item}</span>
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ opacity: 0.4 }}>
                        <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 9: Footer */}
        <footer
          id="contact"
          role="contentinfo"
          aria-label="푸터"
          style={{ backgroundColor: 'var(--color-background)', borderTop: '1px solid var(--color-border)' }}
        >
          {/* Pre-footer CTA */}
          <div style={{ padding: '80px 0', borderBottom: '1px solid var(--color-border)' }}>
            <div className="container" style={{ textAlign: 'center' }}>
              <h2 style={{
                fontSize: 'var(--text-h2)', fontFamily: 'var(--font-heading)',
                fontWeight: '700', letterSpacing: '-0.03em', color: 'var(--color-text)',
                marginBottom: '16px',
              }}>
                네이버와 함께 성장할 파트너를<br />
                <span style={{ color: 'var(--color-primary)' }}>찾고 있습니다.</span>
              </h2>
              <p style={{ fontSize: '16px', color: 'rgba(240,240,240,0.6)', marginBottom: '40px' }}>
                파트너십, 광고, 기술 협력에 대해 문의하세요.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <a href="#" className="btn-primary">파트너십 시작하기</a>
                <a href="#" className="btn-ghost">IR 자료 다운로드</a>
              </div>
            </div>
          </div>

          {/* Footer main */}
          <div className="container" style={{ padding: '64px 24px 48px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px', marginBottom: '64px' }}>
              {/* Brand */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <div style={{
                    width: '28px', height: '28px', backgroundColor: 'var(--color-primary)',
                    borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ fontSize: '16px', fontWeight: '900', color: 'var(--color-background)' }}>N</span>
                  </div>
                  <span style={{ fontSize: '15px', fontWeight: '700', color: 'var(--color-text)' }}>NAVER Corp.</span>
                </div>
                <p style={{ fontSize: '13px', color: 'rgba(240,240,240,0.4)', lineHeight: '1.65', marginBottom: '24px' }}>
                  기술과 연결로<br />비즈니스 가능성을 확장합니다.
                </p>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {['블로그', 'LinkedIn', 'YouTube', 'Instagram'].map((social) => (
                    <a key={social} href="#" aria-label={social} style={{
                      width: '36px', height: '36px', borderRadius: '50%',
                      border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      backgroundColor: 'var(--color-surface)', transition: 'all var(--animation-duration)',
                    }}
                      className="news-item-hover"
                    >
                      <span style={{ fontSize: '12px', color: 'rgba(240,240,240,0.5)' }}>
                        {social[0]}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Subsidiaries */}
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-primary)', marginBottom: '16px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  주요 계열사
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {subsidiaries.map((item) => (
                    <a key={item} href="#" className="footer-link">{item}</a>
                  ))}
                </div>
              </div>

              {/* Resources */}
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-primary)', marginBottom: '16px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  자료실
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {['IR 자료실', 'ESG 자료실', '네이버 리포트', '브랜드 리소스'].map((item) => (
                    <a key={item} href="#" className="footer-link">{item}</a>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-primary)', marginBottom: '16px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  안내
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {['제휴 제안', '고객센터', '기업윤리 상담센터'].map((item) => (
                    <a key={item} href="#" className="footer-link">{item}</a>
                  ))}
                  <a href="#" className="btn-ghost" style={{ marginTop: '8px', padding: '8px 16px', fontSize: '13px', width: 'fit-content' }}>
                    Contact →
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <hr className="divider" style={{ marginBottom: '32px' }} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ fontSize: '12px', color: 'rgba(240,240,240,0.3)' }}>
                © 2025 NAVER Corp. All rights reserved.
              </div>
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                {['개인정보 처리방침', '이용약관', '운영정책'].map((item) => (
                  <a key={item} href="#" style={{ fontSize: '12px', color: 'rgba(240,240,240,0.4)', textDecoration: 'none', transition: 'color 0.2s' }}
                    className="footer-link"
                  >
                    {item}
                  </a>
                ))}
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(240,240,240,0.3)' }}>
                경기도 성남시 분당구 불정로 6
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}