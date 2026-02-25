'use client';

import { useState } from 'react';

const CSS_VARS = `
  :root {
    --color-text: #F0F0F0;
    --color-accent: #FFF176;
    --color-border: #2E3450;
    --color-primary: #FFD600;
    --color-surface: #1E2333;
    --color-secondary: #1A1F2E;
    --color-background: #0F1117;
    --border-radius: 8px;
    --shadow-card: 0 4px 24px rgba(0, 0, 0, 0.4);
    --shadow-hover: 0 8px 32px rgba(255, 214, 0, 0.2);
    --shadow-button: 0 2px 12px rgba(255, 214, 0, 0.3);
    --spacing-section-padding: 120px 0;
    --spacing-element-gap: 32px;
    --container-max-width: 1280px;
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

interface SubsidiaryCard {
  name: string;
  description: string;
  tag: string;
  icon: string;
}

interface BrandResource {
  title: string;
  subtitle: string;
  description: string;
  imageKeyword: string;
}

const subsidiaries: SubsidiaryCard[] = [
  {
    name: '네이버클라우드',
    description: 'AI·데이터 기반 클라우드 인프라로 기업의 디지털 전환을 지원합니다.',
    tag: 'Cloud & AI',
    icon: '☁️',
  },
  {
    name: '스노우',
    description: '카메라 및 콘텐츠 플랫폼으로 글로벌 크리에이터 생태계를 선도합니다.',
    tag: 'Camera & Content',
    icon: '📸',
  },
  {
    name: '네이버랩스',
    description: 'AI·로보틱스·자율주행 연구로 미래 기술의 경계를 확장합니다.',
    tag: 'R&D',
    icon: '🔬',
  },
  {
    name: '네이버웹툰',
    description: '글로벌 150개국에 서비스되는 세계 최대 웹툰 플랫폼입니다.',
    tag: 'Content & Global',
    icon: '🎨',
  },
  {
    name: '네이버파이낸셜',
    description: '네이버페이를 중심으로 혁신적인 금융 서비스 생태계를 구축합니다.',
    tag: 'Fintech',
    icon: '💳',
  },
];

const brandResources: BrandResource[] = [
  {
    title: '네이버 로고 아이덴티티',
    subtitle: 'Logo Identity',
    description: '네이버의 공식 로고와 브랜드 아이덴티티 가이드라인을 확인하세요.',
    imageKeyword: 'brand identity design minimal',
  },
  {
    title: 'Logo and Color',
    subtitle: '로고 & 컬러 시스템',
    description: '브랜드 컬러 팔레트와 로고 사용 규정을 다운로드하세요.',
    imageKeyword: 'color palette design system',
  },
  {
    title: 'NAVER MAP',
    subtitle: 'Connecting online and offline',
    description: '온라인과 오프라인을 연결하는 네이버 지도 브랜드 가이드입니다.',
    imageKeyword: 'map navigation city aerial',
  },
];

const milestones = [
  { year: '1999', event: '네이버(주) 설립' },
  { year: '2002', event: '통합검색 서비스 출시' },
  { year: '2008', event: '코스피 상장' },
  { year: '2011', event: '라인(LINE) 글로벌 출시' },
  { year: '2017', event: '네이버클라우드 분사' },
  { year: '2021', event: '글로벌 웹툰 플랫폼 통합' },
  { year: '2023', event: '하이퍼클로바X 출시' },
  { year: '2024', event: 'AI 기반 B2B 플랫폼 강화' },
];

const stats = [
  { value: '4,500+', label: '기업 파트너사', sublabel: 'Enterprise Partners' },
  { value: '82M+', label: '월간 활성 사용자', sublabel: 'Monthly Active Users' },
  { value: '38조', label: '2023 연간 매출', sublabel: 'Annual Revenue' },
  { value: '50+', label: '글로벌 진출 국가', sublabel: 'Countries' },
];

const coreValues = [
  {
    keyword: '신뢰',
    en: 'Trust',
    desc: '투명한 정보와 검증된 기술력으로 파트너의 의사결정을 지원합니다.',
  },
  {
    keyword: '혁신',
    en: 'Innovation',
    desc: 'AI·클라우드·커머스 기반의 지속적 기술 선도로 미래를 만들어갑니다.',
  },
  {
    keyword: '연결',
    en: 'Connection',
    desc: '기업과 사용자, 파트너와 시장을 연결하는 플랫폼 생태계를 구축합니다.',
  },
  {
    keyword: '성장',
    en: 'Growth',
    desc: '파트너의 비즈니스 성장을 함께 만들어가는 동반자적 관계를 추구합니다.',
  },
];

export default function CompanyPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredBrand, setHoveredBrand] = useState<number | null>(null);

  return (
    <>
      <style>{CSS_VARS}</style>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background-color: var(--color-background); color: var(--color-text); font-family: var(--font-body); }
        
        .subsidiary-card {
          transition: transform var(--animation-duration) var(--animation-easing),
                      box-shadow var(--animation-duration) var(--animation-easing),
                      border-color var(--animation-duration) var(--animation-easing);
        }
        .subsidiary-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-hover);
          border-color: var(--color-primary) !important;
        }
        
        .brand-card {
          transition: transform var(--animation-duration) var(--animation-easing),
                      box-shadow var(--animation-duration) var(--animation-easing);
          overflow: hidden;
        }
        .brand-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-hover);
        }
        .brand-card:hover .brand-overlay {
          opacity: 0.85;
        }
        .brand-card:hover .brand-arrow {
          transform: translate(4px, -4px);
        }
        
        .brand-overlay {
          transition: opacity var(--animation-duration) var(--animation-easing);
          opacity: 0.75;
        }
        .brand-arrow {
          transition: transform var(--animation-duration) var(--animation-easing);
        }
        
        .cta-primary {
          transition: all var(--animation-duration) var(--animation-easing);
        }
        .cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-hover);
          background-color: var(--color-accent) !important;
        }
        
        .cta-secondary {
          transition: all var(--animation-duration) var(--animation-easing);
        }
        .cta-secondary:hover {
          background-color: var(--color-surface);
          border-color: var(--color-primary) !important;
          color: var(--color-primary);
        }
        
        .milestone-item {
          transition: background-color var(--animation-duration) var(--animation-easing);
        }
        .milestone-item:hover {
          background-color: var(--color-surface);
        }
        
        .value-card {
          transition: all var(--animation-duration) var(--animation-easing);
        }
        .value-card:hover {
          box-shadow: var(--shadow-hover);
          border-color: var(--color-primary) !important;
        }
        
        .stat-item {
          transition: transform var(--animation-duration) var(--animation-easing);
        }
        .stat-item:hover {
          transform: scale(1.02);
        }
        
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .subsidiary-grid { grid-template-columns: 1fr !important; }
          .brand-grid { grid-template-columns: 1fr !important; }
          .value-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .milestone-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr !important; }
          .value-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <main
        style={{
          backgroundColor: 'var(--color-background)',
          color: 'var(--color-text)',
          fontFamily: 'var(--font-body)',
          minHeight: '100vh',
        }}
      >
        {/* ── SECTION 1: HERO ── */}
        <section
          aria-label="회사소개 히어로"
          style={{
            padding: 'var(--spacing-section-padding)',
            paddingTop: '140px',
            paddingBottom: '100px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background grid decoration */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `linear-gradient(var(--color-border) 1px, transparent 1px),
                                linear-gradient(90deg, var(--color-border) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
              opacity: 0.15,
            }}
          />
          {/* Yellow glow top-right */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '-200px',
              right: '-200px',
              width: '600px',
              height: '600px',
              background: 'radial-gradient(circle, rgba(255,214,0,0.12) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              maxWidth: 'var(--container-max-width)',
              margin: '0 auto',
              padding: '0 24px',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {/* Eyebrow */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '32px',
                padding: '6px 16px',
                border: '1px solid var(--color-primary)',
                borderRadius: '100px',
                backgroundColor: 'rgba(255,214,0,0.08)',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-primary)',
                  display: 'inline-block',
                }}
              />
              <span
                style={{
                  fontSize: '13px',
                  color: 'var(--color-primary)',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                About NAVER
              </span>
            </div>

            <div
              className="hero-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'var(--spacing-element-gap)',
                alignItems: 'start',
              }}
            >
              {/* Left: Text */}
              <div>
                <h1
                  style={{
                    fontSize: 'var(--text-h1)',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1,
                    marginBottom: '24px',
                    color: 'var(--color-text)',
                  }}
                >
                  기술과 연결로
                  <br />
                  <span style={{ color: 'var(--color-primary)' }}>비즈니스 가능성</span>을
                  <br />
                  확장합니다
                </h1>

                <p
                  style={{
                    fontSize: 'clamp(16px, 1.25vw, 20px)',
                    color: 'rgba(240,240,240,0.7)',
                    lineHeight: '1.65',
                    maxWidth: '520px',
                    marginBottom: '48px',
                  }}
                >
                  네이버(주)의 비전, 주요 계열사, 연혁, 브랜드 리소스 및 제휴 제안 정보를 제공합니다.
                  데이터 기반의 투명성과 혁신적 파트너십으로 귀사의 성장을 함께 만들어갑니다.
                </p>

                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <a
                    href="#contact"
                    className="cta-primary"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '16px 32px',
                      backgroundColor: 'var(--color-primary)',
                      color: 'var(--color-background)',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 700,
                      fontSize: '16px',
                      borderRadius: 'var(--border-radius)',
                      textDecoration: 'none',
                      boxShadow: 'var(--shadow-button)',
                      letterSpacing: '-0.01em',
                    }}
                    aria-label="제휴 제안 페이지로 이동"
                  >
                    제휴 제안
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                  <a
                    href="#about"
                    className="cta-secondary"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '16px 32px',
                      backgroundColor: 'transparent',
                      color: 'var(--color-text)',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 600,
                      fontSize: '16px',
                      borderRadius: 'var(--border-radius)',
                      textDecoration: 'none',
                      border: '1px solid var(--color-border)',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    더 알아보기
                  </a>
                </div>
              </div>

              {/* Right: Stats */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                {/* Hero image */}
                <div
                  style={{
                    borderRadius: 'var(--border-radius)',
                    overflow: 'hidden',
                    border: '1px solid var(--color-border)',
                    height: '280px',
                    position: 'relative',
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop"
                    alt="네이버 기업 전경"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(135deg, rgba(15,17,23,0.6) 0%, transparent 60%)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '20px',
                      left: '20px',
                      padding: '8px 16px',
                      backgroundColor: 'var(--color-primary)',
                      borderRadius: '4px',
                      color: 'var(--color-background)',
                      fontWeight: 700,
                      fontSize: '13px',
                    }}
                  >
                    Founded 1999 · Seoul, Korea
                  </div>
                </div>

                {/* Quick stats row */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '12px',
                  }}
                >
                  {stats.slice(0, 2).map((s) => (
                    <div
                      key={s.value}
                      className="stat-item"
                      style={{
                        padding: '20px',
                        backgroundColor: 'var(--color-surface)',
                        borderRadius: 'var(--border-radius)',
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      <div
                        style={{
                          fontSize: 'clamp(22px, 2vw, 28px)',
                          fontWeight: 800,
                          color: 'var(--color-primary)',
                          fontFamily: 'var(--font-heading)',
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {s.value}
                      </div>
                      <div style={{ fontSize: '13px', color: 'rgba(240,240,240,0.6)', marginTop: '4px' }}>
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS BAR ── */}
        <section
          aria-label="주요 지표"
          style={{
            backgroundColor: 'var(--color-secondary)',
            borderTop: '1px solid var(--color-border)',
            borderBottom: '1px solid var(--color-border)',
            padding: '48px 24px',
          }}
        >
          <div
            style={{
              maxWidth: 'var(--container-max-width)',
              margin: '0 auto',
            }}
          >
            <div
              className="stats-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '0',
              }}
            >
              {stats.map((s, i) => (
                <div
                  key={s.value}
                  className="stat-item"
                  style={{
                    textAlign: 'center',
                    padding: '24px 16px',
                    borderRight: i < stats.length - 1 ? '1px solid var(--color-border)' : 'none',
                  }}
                >
                  <div
                    style={{
                      fontSize: 'clamp(28px, 3vw, 40px)',
                      fontWeight: 800,
                      color: 'var(--color-primary)',
                      fontFamily: 'var(--font-heading)',
                      letterSpacing: '-0.03em',
                    }}
                  >
                    {s.value}
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--color-text)', fontWeight: 600, marginTop: '6px' }}>
                    {s.label}
                  </div>
                  <div style={{ fontSize: '12px', color: 'rgba(240,240,240,0.4)', marginTop: '2px' }}>
                    {s.sublabel}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION: CORE VALUES ── */}
        <section
          id="about"
          aria-label="핵심 가치"
          style={{
            padding: 'var(--spacing-section-padding)',
          }}
        >
          <div
            style={{
              maxWidth: 'var(--container-max-width)',
              margin: '0 auto',
              padding: '0 24px',
            }}
          >
            <div style={{ marginBottom: '64px' }}>
              <p style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
                Core Values
              </p>
              <h2
                style={{
                  fontSize: 'var(--text-h2)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                  maxWidth: '560px',
                }}
              >
                네이버가 추구하는
                <span style={{ color: 'var(--color-primary)' }}> 5가지 핵심 가치</span>
              </h2>
            </div>

            <div
              className="value-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '16px',
              }}
            >
              {coreValues.map((v) => (
                <article
                  key={v.keyword}
                  className="value-card"
                  style={{
                    padding: '32px 24px',
                    backgroundColor: 'var(--color-surface)',
                    borderRadius: 'var(--border-radius)',
                    border: '1px solid var(--color-border)',
                    boxShadow: 'var(--shadow-card)',
                  }}
                >
                  <div
                    style={{
                      fontSize: 'clamp(24px, 2vw, 32px)',
                      fontWeight: 800,
                      fontFamily: 'var(--font-heading)',
                      color: 'var(--color-primary)',
                      letterSpacing: '-0.02em',
                      marginBottom: '4px',
                    }}
                  >
                    {v.keyword}
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: 'rgba(240,240,240,0.4)',
                      letterSpacing: '0.06em',
                      marginBottom: '16px',
                      fontWeight: 500,
                    }}
                  >
                    {v.en}
                  </div>
                  <p style={{ fontSize: '14px', color: 'rgba(240,240,240,0.65)', lineHeight: '1.6' }}>
                    {v.desc}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 2: FEATURE GRID (Subsidiaries) ── */}
        <section
          aria-label="주요 계열사"
          style={{
            padding: 'var(--spacing-section-padding)',
            backgroundColor: 'var(--color-secondary)',
            borderTop: '1px solid var(--color-border)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <div
            style={{
              maxWidth: 'var(--container-max-width)',
              margin: '0 auto',
              padding: '0 24px',
            }}
          >
            {/* Section header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                marginBottom: '64px',
                flexWrap: 'wrap',
                gap: '24px',
              }}
            >
              <div>
                <p style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
                  Group Companies
                </p>
                <h2
                  style={{
                    fontSize: 'var(--text-h2)',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                  }}
                >
                  네이버 그룹의
                  <br />
                  <span style={{ color: 'var(--color-primary)' }}>핵심 계열사</span>를 소개합니다
                </h2>
              </div>
              <p style={{ fontSize: '15px', color: 'rgba(240,240,240,0.6)', maxWidth: '320px', lineHeight: '1.65' }}>
                네이버 그룹의 핵심 계열사를 소개합니다. 각 계열사는 독자적인 영역에서 혁신을 이끌며 그룹의 성장을 견인합니다.
              </p>
            </div>

            {/* Cards grid */}
            <div
              className="subsidiary-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
              }}
            >
              {subsidiaries.map((sub, i) => (
                <article
                  key={sub.name}
                  className="subsidiary-card"
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    padding: '32px',
                    backgroundColor: 'var(--color-background)',
                    borderRadius: 'var(--border-radius)',
                    border: `1px solid ${hoveredCard === i ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    boxShadow: hoveredCard === i ? 'var(--shadow-hover)' : 'var(--shadow-card)',
                    cursor: 'pointer',
                    gridColumn: i === 3 ? 'span 1' : 'span 1',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '20px',
                    }}
                  >
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        backgroundColor: 'rgba(255,214,0,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '22px',
                        border: '1px solid rgba(255,214,0,0.2)',
                      }}
                      aria-hidden="true"
                    >
                      {sub.icon}
                    </div>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        color: 'var(--color-primary)',
                        backgroundColor: 'rgba(255,214,0,0.1)',
                        padding: '4px 10px',
                        borderRadius: '100px',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {sub.tag}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: 'var(--text-h3)',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
                      marginBottom: '12px',
                      color: 'var(--color-text)',
                    }}
                  >
                    {sub.name}
                  </h3>
                  <p
                    style={{
                      fontSize: '14px',
                      color: 'rgba(240,240,240,0.6)',
                      lineHeight: '1.65',
                      marginBottom: '24px',
                    }}
                  >
                    {sub.description}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: 'var(--color-primary)',
                      fontSize: '13px',
                      fontWeight: 600,
                    }}
                  >
                    자세히 보기
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION: MILESTONES ── */}
        <section
          aria-label="연혁"
          style={{
            padding: 'var(--spacing-section-padding)',
          }}
        >
          <div
            style={{
              maxWidth: 'var(--container-max-width)',
              margin: '0 auto',
              padding: '0 24px',
            }}
          >
            <div style={{ marginBottom: '64px' }}>
              <p style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
                Milestones
              </p>
              <h2
                style={{
                  fontSize: 'var(--text-h2)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                }}
              >
                25년의 <span style={{ color: 'var(--color-primary)' }}>기술 혁신 연혁</span>
              </h2>
            </div>

            <div
              className="milestone-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '2px',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--border-radius)',
                overflow: 'hidden',
              }}
            >
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className="milestone-item"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '24px',
                    padding: '24px 32px',
                    backgroundColor: i % 2 === 0 ? 'var(--color-surface)' : 'var(--color-secondary)',
                    borderBottom: i < milestones.length - 2 ? '1px solid var(--color-border)' : 'none',
                  }}
                >
                  <span
                    style={{
                      fontSize: 'clamp(20px, 2vw, 28px)',
                      fontWeight: 800,
                      fontFamily: 'var(--font-heading)',
                      color: 'var(--color-primary)',
                      letterSpacing: '-0.02em',
                      minWidth: '72px',
                    }}
                  >
                    {m.year}
                  </span>
                  <span
                    style={{
                      fontSize: '15px',
                      color: 'var(--color-text)',
                      lineHeight: '1.5',
                    }}
                  >
                    {m.event}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 3: BRAND RESOURCES ── */}
        <section
          aria-label="브랜드 리소스"
          style={{
            padding: 'var(--spacing-section-padding)',
            backgroundColor: 'var(--color-secondary)',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          <div
            style={{
              maxWidth: 'var(--container-max-width)',
              margin: '0 auto',
              padding: '0 24px',
            }}
          >
            {/* Section header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                marginBottom: '64px',
                flexWrap: 'wrap',
                gap: '24px',
              }}
            >
              <div>
                <p style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
                  Brand Resources
                </p>
                <h2
                  style={{
                    fontSize: 'var(--text-h2)',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                  }}
                >
                  공식 브랜드
                  <br />
                  <span style={{ color: 'var(--color-primary)' }}>리소스 센터</span>
                </h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-end' }}>
                <p style={{ fontSize: '15px', color: 'rgba(240,240,240,0.6)', maxWidth: '360px', lineHeight: '1.65', textAlign: 'right' }}>
                  네이버 로고, 아이덴티티, 컬러 등 브랜드 리소스를 제공합니다.
                </p>
                <a
                  href="#brand"
                  className="cta-primary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '14px 28px',
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-background)',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 700,
                    fontSize: '15px',
                    borderRadius: 'var(--border-radius)',
                    textDecoration: 'none',
                    boxShadow: 'var(--shadow-button)',
                  }}
                  aria-label="브랜드 리소스 보기 페이지로 이동"
                >
                  브랜드 리소스 보기
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Brand cards grid */}
            <div
              className="brand-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
              }}
            >
              {brandResources.map((res, i) => (
                <article
                  key={res.title}
                  className="brand-card"
                  onMouseEnter={() => setHoveredBrand(i)}
                  onMouseLeave={() => setHoveredBrand(null)}
                  style={{
                    borderRadius: 'var(--border-radius)',
                    border: '1px solid var(--color-border)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    boxShadow: hoveredBrand === i ? 'var(--shadow-hover)' : 'var(--shadow-card)',
                    transform: hoveredBrand === i ? 'translateY(-4px)' : 'translateY(0)',
                  }}
                >
                  {/* Image */}
                  <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                    <img
                      src={
                        i === 0
                          ? 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&auto=format&fit=crop'
                          : i === 1
                          ? 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop'
                          : 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&auto=format&fit=crop'
                      }
                      alt={res.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div
                      className="brand-overlay"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, transparent 20%, rgba(15,17,23,0.9) 100%)',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        padding: '6px 12px',
                        backgroundColor: 'rgba(15,17,23,0.8)',
                        borderRadius: '4px',
                        border: '1px solid var(--color-border)',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      <span style={{ fontSize: '11px', color: 'var(--color-primary)', fontWeight: 600, letterSpacing: '0.04em' }}>
                        Brand Asset
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    style={{
                      padding: '24px',
                      backgroundColor: 'var(--color-background)',
                    }}
                  >
                    <div style={{ fontSize: '12px', color: 'rgba(240,240,240,0.4)', marginBottom: '8px', letterSpacing: '0.04em' }}>
                      {res.subtitle}
                    </div>
                    <h3
                      style={{
                        fontSize: 'clamp(16px, 1.5vw, 20px)',
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                        marginBottom: '10px',
                        color: 'var(--color-text)',
                      }}
                    >
                      {res.title}
                    </h3>
                    <p style={{ fontSize: '14px', color: 'rgba(240,240,240,0.55)', lineHeight: '1.6', marginBottom: '20px' }}>
                      {res.description}
                    </p>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: 'var(--color-primary)',
                        fontSize: '13px',
                        fontWeight: 600,
                      }}
                    >
                      다운로드
                      <svg
                        className="brand-arrow"
                        width="14" height="14" viewBox="0 0 14 14" fill="none"
                        aria-hidden="true"
                        style={{ transform: hoveredBrand === i ? 'translate(4px, -4px)' : 'translate(0,0)', transition: `transform var(--animation-duration) var(--animation-easing)` }}
                      >
                        <path d="M2 12L12 2M7 2h5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION: CTA / CONTACT ── */}
        <section
          id="contact"
          aria-label="제휴 제안"
          style={{
            padding: 'var(--spacing-section-padding)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* BG decoration */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: '-100px',
              left: '-100px',
              width: '500px',
              height: '500px',
              background: 'radial-gradient(circle, rgba(255,214,0,0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              maxWidth: 'var(--container-max-width)',
              margin: '0 auto',
              padding: '0 24px',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <div
              style={{
                padding: 'clamp(48px, 6vw, 96px)',
                backgroundColor: 'var(--color-surface)',
                borderRadius: '16px',
                border: '1px solid var(--color-border)',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Decorative line */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: 'linear-gradient(90deg, transparent, var(--color-primary), transparent)',
                }}
              />

              <p
                style={{
                  color: 'var(--color-primary)',
                  fontWeight: 600,
                  fontSize: '13px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '24px',
                }}
              >
                Partnership
              </p>

              <h2
                style={{
                  fontSize: 'var(--text-h2)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.15,
                  marginBottom: '24px',
                }}
              >
                네이버와 함께<br />
                <span style={{ color: 'var(--color-primary)' }}>비즈니스를 성장</span>시키세요
              </h2>

              <p
                style={{
                  fontSize: 'clamp(15px, 1.2vw, 18px)',
                  color: 'rgba(240,240,240,0.65)',
                  lineHeight: '1.65',
                  maxWidth: '560px',
                  margin: '0 auto 48px',
                }}
              >
                B2B 파트너십, 기술 제휴, 투자자 문의 등 네이버와의 협업에 대한 문의를 남겨주세요.
                전문 담당자가 신속하게 응답드립니다.
              </p>

              <div
                style={{
                  display: 'flex',
                  gap: '16px',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <a
                  href="mailto:biz@naver.com"
                  className="cta-primary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '18px 40px',
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-background)',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 700,
                    fontSize: '16px',
                    borderRadius: 'var(--border-radius)',
                    textDecoration: 'none',
                    boxShadow: 'var(--shadow-button)',
                  }}
                >
                  파트너십 시작하기
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a
                  href="/ir"
                  className="cta-secondary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '18px 40px',
                    backgroundColor: 'transparent',
                    color: 'var(--color-text)',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    fontSize: '16px',
                    borderRadius: 'var(--border-radius)',
                    textDecoration: 'none',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  IR 자료 다운로드
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}