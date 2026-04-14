import React, { useState, useEffect, useRef } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html {
    scroll-behavior: smooth;
  }
  body {
    background-color: #080808;
    color: #FFFFFF;
    font-family: 'Inter', sans-serif;
    overflow-x: hidden;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Bebas Neue', sans-serif;
    letter-spacing: 1px;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  button {
    cursor: pointer;
    border: none;
    outline: none;
    font-family: inherit;
  }
`;

// --- Animations ---
const pulseGlow = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.4); }
  70% { box-shadow: 0 0 0 15px rgba(255, 215, 0, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 215, 0, 0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const shine = keyframes`
  0% { left: -100%; }
  20% { left: 100%; }
  100% { left: 100%; }
`;

const pulseGreen = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.5); }
  70% { box-shadow: 0 0 0 15px rgba(37, 211, 102, 0); }
  100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
`;

// --- FadeIn Component ---
const FadeInWrapper = styled.div<{ $visible: boolean; $delay: number }>`
  opacity: ${props => props.$visible ? 1 : 0};
  transform: translateY(${props => props.$visible ? '0' : '40px'});
  transition: opacity 0.8s ease ${props => props.$delay}s, transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${props => props.$delay}s;
`;

const FadeIn: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (domRef.current) observer.unobserve(domRef.current);
        }
      });
    }, { threshold: 0.1 });
    
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return <FadeInWrapper ref={domRef} $visible={isVisible} $delay={delay}>{children}</FadeInWrapper>;
};

// --- Styled Components ---

const Container = styled.div`
  max-w-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
`;

const Section = styled.section<{ $bgImage?: string; $darker?: boolean }>`
  padding: 100px 0;
  position: relative;
  background: ${props => props.$darker ? '#0d0d0d' : '#080808'};
  ${props => props.$bgImage && `
    background: url(${props.$bgImage}) center/cover no-repeat;
    background-attachment: fixed;
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.85);
    }
  `}
`;

// --- Navbar ---
const Nav = styled.nav<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: ${props => props.$scrolled ? '15px 0' : '25px 0'};
  background: ${props => props.$scrolled ? 'rgba(0, 0, 0, 0.85)' : 'transparent'};
  backdrop-filter: blur(20px);
  border-bottom: ${props => props.$scrolled ? '1px solid rgba(255, 215, 0, 0.2)' : '1px solid transparent'};
  transition: all 0.3s ease;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  
  .badge {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 2px solid #FFD700;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.5);
    
    span {
      color: #FFD700;
      font-family: 'Bebas Neue', sans-serif;
      font-size: 24px;
      margin-top: 4px;
    }
  }
  
  .text {
    display: flex;
    flex-direction: column;
    
    .main {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 22px;
      line-height: 1;
    }
    .sub {
      font-size: 10px;
      color: #888888;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;

  @media (max-width: 768px) {
    display: none;
  }

  a.link {
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0;
      height: 2px;
      background: #FFD700;
      transition: width 0.3s ease;
    }
    
    &:hover::after {
      width: 100%;
    }
  }
`;

const PillButton = styled.a<{ $variant?: 'outline' | 'filled' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 32px;
  border-radius: 50px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 14px;
  transition: all 0.3s ease;
  
  ${props => props.$variant === 'outline' ? `
    background: transparent;
    color: #FFD700;
    border: 1px solid #FFD700;
    
    &:hover {
      background: rgba(255, 215, 0, 0.1);
      box-shadow: 0 0 25px rgba(255, 215, 0, 0.5);
      transform: scale(1.05);
    }
  ` : `
    background: linear-gradient(135deg, #FFD700, #FFA500);
    color: #000000;
    
    &:hover {
      box-shadow: 0 0 25px rgba(255, 215, 0, 0.5);
      transform: scale(1.05);
    }
  `}
`;

// --- Hero ---
const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  text-align: center;
`;

const HeroBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background: url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80') center/cover no-repeat;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.75);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -20%;
    right: -10%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(255,215,0,0.06) 0%, rgba(0,0,0,0) 70%);
    border-radius: 50%;
    animation: ${float} 10s ease-in-out infinite;
  }
`;

const HeroBadge = styled.div`
  display: inline-block;
  padding: 8px 20px;
  border-radius: 50px;
  border: 1px solid rgba(255, 215, 0, 0.3);
  background: rgba(255, 215, 0, 0.05);
  color: #FFD700;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 30px;
  animation: ${float} 4s ease-in-out infinite;
`;

const HeroTitle = styled.h1`
  font-size: clamp(60px, 10vw, 100px);
  line-height: 0.9;
  margin-bottom: 20px;
  letter-spacing: 3px;
  
  .line1 {
    display: block;
    color: #FFFFFF;
  }
  
  .line2 {
    display: block;
    font-size: clamp(70px, 12vw, 120px);
    background: linear-gradient(to right, #FFD700, #FFA500);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const HeroSub = styled.p`
  font-size: 18px;
  color: #888888;
  margin-bottom: 40px;
  font-weight: 300;
  letter-spacing: 1px;
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ScrollArrow = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  color: #FFD700;
  font-size: 24px;
  animation: ${float} 2s ease-in-out infinite;
  
  i {
    display: block;
  }
`;

// --- Stats ---
const StatsStrip = styled.div`
  background: linear-gradient(90deg, #FFD700, #FFA500);
  padding: 40px 0;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    transform: skewX(-20deg);
    animation: ${shine} 6s infinite;
  }
`;

const StatsGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  text-align: center;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
  }
`;

const StatItem = styled.div`
  color: #000000;
  
  .value {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 48px;
    line-height: 1;
    margin-bottom: 5px;
  }
  
  .label {
    font-weight: 700;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 1px;
    opacity: 0.8;
  }
`;

// --- Why Choose Us ---
const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
  
  h2 {
    font-size: 48px;
    color: #FFFFFF;
    margin-bottom: 15px;
  }
  
  p {
    color: #888888;
    font-size: 18px;
  }
`;

const Grid = styled.div<{ $cols?: number }>`
  display: grid;
  grid-template-columns: repeat(${props => props.$cols || 3}, 1fr);
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const GlassCard = styled.div`
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 215, 0, 0.15);
  border-radius: 20px;
  padding: 40px 30px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  
  .icon {
    font-size: 32px;
    color: #FFD700;
    margin-bottom: 20px;
    transition: all 0.3s ease;
  }
  
  h3 {
    font-size: 24px;
    margin-bottom: 15px;
    color: #FFFFFF;
  }
  
  p {
    color: #888888;
    line-height: 1.6;
    font-size: 15px;
  }
  
  &:hover {
    transform: translateY(-8px);
    border-color: rgba(255, 215, 0, 0.5);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 215, 0, 0.15);
    
    .icon {
      text-shadow: 0 0 15px rgba(255, 215, 0, 0.5);
      transform: scale(1.1);
    }
  }
`;

const ServiceCard = styled(GlassCard)`
  padding: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  
  .image-container {
    height: 200px;
    position: relative;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
    }
  }
  
  .content {
    padding: 30px;
    flex-grow: 1;
  }
`;

// --- Plans ---
const PlanCard = styled(GlassCard)<{ $featured?: boolean }>`
  display: flex;
  flex-direction: column;
  position: relative;
  ${props => props.$featured && `
    transform: scale(1.05);
    border-color: rgba(255, 215, 0, 0.8);
    box-shadow: 0 0 40px rgba(255, 215, 0, 0.2);
    
    &:hover {
      transform: scale(1.05) translateY(-8px);
      box-shadow: 0 0 50px rgba(255, 215, 0, 0.4);
    }
    
    @media (max-width: 992px) {
      transform: scale(1);
      &:hover {
        transform: translateY(-8px);
      }
    }
  `}
  
  .badge {
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, #FFD700, #FFA500);
    color: #000;
    padding: 4px 16px;
    border-radius: 50px;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .tagline {
    color: #FFD700;
    font-size: 14px;
    margin-bottom: 20px;
    font-weight: 500;
  }
  
  ul {
    list-style: none;
    margin-bottom: 40px;
    flex-grow: 1;
    
    li {
      margin-bottom: 15px;
      color: #ccc;
      font-size: 15px;
      display: flex;
      align-items: flex-start;
      gap: 10px;
      
      i {
        color: #FFD700;
        margin-top: 4px;
      }
    }
  }
  
  .btn-wrapper {
    margin-top: auto;
    text-align: center;
  }
`;

// --- Trainers ---
const TrainerCard = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 20px;
  padding: 40px;
  display: flex;
  gap: 40px;
  align-items: center;
  transition: all 0.4s ease;
  
  &:hover {
    border-color: rgba(255, 215, 0, 0.8);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 215, 0, 0.3);
    transform: translateY(-8px);
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 30px;
  }
  
  .image {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 3px solid #FFD700;
    object-fit: cover;
    flex-shrink: 0;
  }
  
  .info {
    h3 {
      font-size: 36px;
      color: #FFD700;
      margin-bottom: 5px;
    }
    
    .title {
      font-size: 18px;
      color: #FFF;
      margin-bottom: 15px;
      font-weight: 500;
    }
    
    p {
      color: #888;
      line-height: 1.6;
      margin-bottom: 20px;
    }
    
    .badges {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      
      @media (max-width: 768px) {
        justify-content: center;
      }
      
      span {
        background: rgba(255, 215, 0, 0.1);
        border: 1px solid rgba(255, 215, 0, 0.3);
        color: #FFD700;
        padding: 6px 12px;
        border-radius: 50px;
        font-size: 12px;
      }
    }
  }
`;

// --- Reviews ---
const ReviewHeader = styled.div`
  max-width: 1200px;
  margin: 0 auto 40px;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 20px;
  }
  
  .google-badge {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 10px 20px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    gap: 10px;
    
    i { color: #FFD700; }
    span { font-weight: 600; }
  }
`;

const ReviewSection = styled(Section)`
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 800px;
    height: 800px;
    background: radial-gradient(circle, rgba(255,215,0,0.06) 0%, rgba(0,0,0,0) 70%);
    border-radius: 50%;
    z-index: 0;
    pointer-events: none;
  }
  
  > * {
    position: relative;
    z-index: 1;
  }
`;

const ReviewCard = styled(GlassCard)`
  display: flex;
  flex-direction: column;
  
  .stars {
    color: #FFD700;
    margin-bottom: 15px;
    font-size: 14px;
  }
  
  .text {
    flex-grow: 1;
    font-style: italic;
    margin-bottom: 20px;
  }
  
  .author {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 15px;
    
    .name {
      font-weight: 600;
      color: #FFF;
    }
    
    .google-icon {
      color: #4285F4;
      font-size: 18px;
    }
  }
`;

// --- Gallery ---
const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const GalleryItem = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  aspect-ratio: 4/3;
  cursor: pointer;
  border: 1px solid rgba(255, 215, 0, 0.15);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  
  .overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 50%);
    opacity: 0;
    transition: opacity 0.4s ease;
    display: flex;
    align-items: flex-end;
    padding: 20px;
    
    span {
      color: #FFD700;
      font-family: 'Bebas Neue', sans-serif;
      letter-spacing: 1px;
      font-size: 24px;
      transform: translateY(20px);
      transition: transform 0.4s ease;
    }
  }
  
  &:hover {
    border-color: rgba(255, 215, 0, 0.5);
    box-shadow: 0 15px 40px rgba(255, 215, 0, 0.15);
    
    img {
      transform: scale(1.1);
    }
    
    .overlay {
      opacity: 1;
      
      span {
        transform: translateY(0);
      }
    }
  }
`;

const Lightbox = styled.div<{ $visible: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.$visible ? 1 : 0};
  visibility: ${props => props.$visible ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
  padding: 40px;
  
  img {
    max-width: 100%;
    max-height: 100%;
    border-radius: 10px;
    border: 1px solid rgba(255, 215, 0, 0.3);
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
    transform: scale(${props => props.$visible ? 1 : 0.9});
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  
  .close-btn {
    position: absolute;
    top: 30px;
    right: 30px;
    color: #FFF;
    font-size: 30px;
    cursor: pointer;
    transition: color 0.3s ease;
    
    &:hover {
      color: #FFD700;
    }
  }
`;

// --- Amenities ---
const AmenitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const AmenityCard = styled.div`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 215, 0, 0.1);
  border-radius: 20px;
  padding: 30px 20px;
  text-align: center;
  transition: all 0.3s ease;
  
  i {
    font-size: 28px;
    color: #FFD700;
    margin-bottom: 15px;
    transition: transform 0.3s ease;
  }
  
  h4 {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #ccc;
  }
  
  &:hover {
    background: rgba(255, 215, 0, 0.05);
    border-color: rgba(255, 215, 0, 0.3);
    transform: translateY(-5px);
    
    i {
      transform: scale(1.2);
    }
  }
`;

// --- Contact ---
const ContactWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled.div`
  .item {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
    
    .icon {
      width: 50px;
      height: 50px;
      background: rgba(255, 215, 0, 0.1);
      border: 1px solid rgba(255, 215, 0, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #FFD700;
      font-size: 20px;
      flex-shrink: 0;
    }
    
    .details {
      h4 {
        font-family: 'Inter', sans-serif;
        font-size: 16px;
        color: #FFF;
        margin-bottom: 5px;
      }
      p, a {
        color: #888;
        font-size: 15px;
        line-height: 1.5;
        transition: color 0.3s ease;
      }
      a:hover {
        color: #FFD700;
      }
    }
  }
`;

const MapContainer = styled.div`
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255, 215, 0, 0.2);
  height: 400px;
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
    filter: grayscale(100%) invert(92%) contrast(83%);
  }
`;

// --- Footer ---
const FooterSection = styled.footer`
  background: #050505;
  padding: 80px 0 30px;
  position: relative;
  border-top: 1px solid rgba(255, 215, 0, 0.1);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.5), transparent);
  }
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 50px;
  max-width: 1200px;
  margin: 0 auto 60px;
  padding: 0 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .brand {
    p {
      color: #888;
      margin-top: 20px;
      font-size: 15px;
    }
  }
  
  h4 {
    color: #FFF;
    font-size: 20px;
    margin-bottom: 20px;
  }
  
  ul {
    list-style: none;
    li {
      margin-bottom: 12px;
      a {
        color: #888;
        transition: color 0.3s ease;
        &:hover {
          color: #FFD700;
        }
      }
    }
  }
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 24px 0;
  border-top: 1px solid rgba(255, 215, 0, 0.1);
  text-align: center;
  color: #666;
  font-size: 14px;
`;

// --- Floating Elements ---
const FloatingWhatsApp = styled.a`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: #25D366;
  color: #FFF;
  padding: 12px 24px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  z-index: 1000;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  animation: ${pulseGreen} 2s infinite;
  transition: transform 0.3s ease;
  
  i { font-size: 24px; }
  
  &:hover {
    transform: translateY(-5px) scale(1.05);
  }
  
  @media (max-width: 768px) {
    padding: 15px;
    span { display: none; }
  }
`;

const ScrollTopBtn = styled.button<{ $visible: boolean }>`
  position: fixed;
  bottom: 30px;
  left: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid #FFD700;
  color: #FFD700;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: ${props => props.$visible ? 1 : 0};
  visibility: ${props => props.$visible ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
  
  &:hover {
    background: #FFD700;
    color: #000;
    transform: translateY(-5px);
  }
`;

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <GlobalStyle />
      
      <Nav $scrolled={scrolled}>
        <NavContainer>
          <Logo href="#home">
            <div className="badge">
              <span>UFC</span>
            </div>
            <div className="text">
              <span className="main">ULTIMATE</span>
              <span className="sub">Fit Club</span>
            </div>
          </Logo>
          
          <NavLinks>
            <a href="#home" className="link">Home</a>
            <a href="#why-us" className="link">Why Us</a>
            <a href="#services" className="link">Services</a>
            <a href="#plans" className="link">Plans</a>
            <PillButton href="#contact">Join Now</PillButton>
          </NavLinks>
        </NavContainer>
      </Nav>

      <HeroSection id="home">
        <HeroBg />
        <div style={{ position: 'relative', zIndex: 10 }}>
          <FadeIn delay={0.2}>
            <HeroBadge>⚡ Pune's #1 Gym in Dighi</HeroBadge>
          </FadeIn>
          <FadeIn delay={0.4}>
            <HeroTitle>
              <span className="line1">FORGE YOUR</span>
              <span className="line2">BEST SELF</span>
            </HeroTitle>
          </FadeIn>
          <FadeIn delay={0.6}>
            <HeroSub>Where Champions Are Built — Dighi, Pune</HeroSub>
          </FadeIn>
          <FadeIn delay={0.8}>
            <HeroButtons>
              <PillButton href="#contact">Start Your Journey</PillButton>
              <PillButton href="#services" $variant="outline">Explore Services</PillButton>
            </HeroButtons>
          </FadeIn>
        </div>
        <ScrollArrow>
          <i className="fa-solid fa-chevron-down"></i>
        </ScrollArrow>
      </HeroSection>

      <StatsStrip>
        <StatsGrid>
          <StatItem>
            <FadeIn delay={0.1}>
              <div className="value">244+</div>
              <div className="label">Members</div>
            </FadeIn>
          </StatItem>
          <StatItem>
            <FadeIn delay={0.2}>
              <div className="value">4.4★</div>
              <div className="label">Rated</div>
            </FadeIn>
          </StatItem>
          <StatItem>
            <FadeIn delay={0.3}>
              <div className="value">6AM–10PM</div>
              <div className="label">Hours</div>
            </FadeIn>
          </StatItem>
          <StatItem>
            <FadeIn delay={0.4}>
              <div className="value">8+</div>
              <div className="label">Services</div>
            </FadeIn>
          </StatItem>
        </StatsGrid>
      </StatsStrip>

      <Section id="why-us" $bgImage="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200&q=80">
        <FadeIn>
          <SectionHeader>
            <h2>Why Choose Us</h2>
          </SectionHeader>
        </FadeIn>
        <Grid>
          <FadeIn delay={0.1}>
            <GlassCard>
              <div className="icon"><i className="fa-solid fa-user-tie"></i></div>
              <h3>Expert Trainers</h3>
              <p>Certified professionals dedicated to your fitness journey.</p>
            </GlassCard>
          </FadeIn>
          <FadeIn delay={0.2}>
            <GlassCard>
              <div className="icon"><i className="fa-solid fa-dumbbell"></i></div>
              <h3>Modern Equipment</h3>
              <p>State of the art machines for every fitness goal.</p>
            </GlassCard>
          </FadeIn>
          <FadeIn delay={0.3}>
            <GlassCard>
              <div className="icon"><i className="fa-solid fa-clipboard-list"></i></div>
              <h3>Personalized Plans</h3>
              <p>Custom workout and nutrition strategies tailored to you.</p>
            </GlassCard>
          </FadeIn>
          <FadeIn delay={0.4}>
            <GlassCard>
              <div className="icon"><i className="fa-solid fa-clock"></i></div>
              <h3>Flexible Timings</h3>
              <p>Open early and late to fit your busy schedule perfectly.</p>
            </GlassCard>
          </FadeIn>
          <FadeIn delay={0.5}>
            <GlassCard>
              <div className="icon"><i className="fa-solid fa-sparkles"></i></div>
              <h3>Hygienic Environment</h3>
              <p>Immaculately clean facilities sanitized continuously.</p>
            </GlassCard>
          </FadeIn>
          <FadeIn delay={0.6}>
            <GlassCard>
              <div className="icon"><i className="fa-solid fa-users"></i></div>
              <h3>Premium Community</h3>
              <p>Join a supportive, motivating group of like-minded individuals.</p>
            </GlassCard>
          </FadeIn>
        </Grid>
      </Section>

      <Section id="services" $bgImage="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=1920&q=80">
        <FadeIn>
          <SectionHeader>
            <h2>Everything You Need To Win</h2>
          </SectionHeader>
        </FadeIn>
        <Grid $cols={4}>
          {[
            { icon: 'fa-user-ninja', title: 'Personal Training', desc: '1-on-1 coaching tailored to your specific goals.', img: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800&q=80' },
            { icon: 'fa-music', title: 'Zumba Classes', desc: 'High-energy dance workouts to burn calories.', img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80' },
            { icon: 'fa-hot-tub-person', title: 'Steam Bath', desc: 'Relax and recover post-workout in our premium steam room.', img: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&q=80' },
            { icon: 'fa-child-reaching', title: 'Yoga', desc: 'Improve flexibility, core strength and mental focus.', img: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=800&q=80' },
            { icon: 'fa-dumbbell', title: 'Weight Training', desc: 'World-class equipment for serious muscle building.', img: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=800&q=80' },
            { icon: 'fa-shoe-prints', title: 'Dance Classes', desc: 'Fun and engaging dance sessions for all levels.', img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80' },
            { icon: 'fa-heart-pulse', title: 'Cardio Zone', desc: 'Top-tier treadmills, ellipticals and bikes.', img: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=800&q=80' },
            { icon: 'fa-clipboard-list', title: 'Body Assessment', desc: 'Regular tracking of your fitness progress.', img: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800&q=80' }
          ].map((srv, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <ServiceCard>
                <div className="image-container">
                  <img src={srv.img} alt={srv.title} />
                </div>
                <div className="content">
                  <div className="icon"><i className={`fa-solid ${srv.icon}`}></i></div>
                  <h3>{srv.title}</h3>
                  <p>{srv.desc}</p>
                </div>
              </ServiceCard>
            </FadeIn>
          ))}
        </Grid>
      </Section>

      <Section id="plans" $darker>
        <FadeIn>
          <SectionHeader>
            <h2>Choose Your Plan</h2>
            <p>Invest in yourself — it pays the best returns</p>
          </SectionHeader>
        </FadeIn>
        <Grid>
          <FadeIn delay={0.1}>
            <PlanCard>
              <h3>Starter</h3>
              <div className="tagline">Perfect to begin</div>
              <ul>
                <li><i className="fa-solid fa-check"></i> Gym floor access</li>
                <li><i className="fa-solid fa-check"></i> Basic equipment</li>
                <li><i className="fa-solid fa-check"></i> Locker room</li>
                <li><i className="fa-solid fa-check"></i> Free parking</li>
              </ul>
              <div className="btn-wrapper">
                <PillButton href="https://wa.me/919112149009?text=Hi!%20I%20am%20interested%20in%20the%20Starter%20Plan%20at%20Ultimate%20Fit%20Club.%20Please%20share%20details." target="_blank" rel="noopener noreferrer" $variant="outline">Get Started</PillButton>
              </div>
            </PlanCard>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <PlanCard $featured={true}>
              <div className="badge">Most Popular</div>
              <h3>Pro</h3>
              <div className="tagline">Most chosen by members</div>
              <ul>
                <li><i className="fa-solid fa-check"></i> Everything in Starter</li>
                <li><i className="fa-solid fa-check"></i> Personal training sessions</li>
                <li><i className="fa-solid fa-check"></i> Zumba and dance classes</li>
                <li><i className="fa-solid fa-check"></i> Steam bath access</li>
                <li><i className="fa-solid fa-check"></i> Body assessment</li>
              </ul>
              <div className="btn-wrapper">
                <PillButton href="https://wa.me/919112149009?text=Hi!%20I%20am%20interested%20in%20the%20Pro%20Plan%20at%20Ultimate%20Fit%20Club.%20Please%20share%20details." target="_blank" rel="noopener noreferrer">Join Pro</PillButton>
              </div>
            </PlanCard>
          </FadeIn>
          
          <FadeIn delay={0.3}>
            <PlanCard>
              <h3>Elite</h3>
              <div className="tagline">The complete experience</div>
              <ul>
                <li><i className="fa-solid fa-check"></i> Everything in Pro</li>
                <li><i className="fa-solid fa-check"></i> Priority trainer access</li>
                <li><i className="fa-solid fa-check"></i> Nutrition guidance</li>
                <li><i className="fa-solid fa-check"></i> Unlimited classes</li>
                <li><i className="fa-solid fa-check"></i> Premium locker</li>
              </ul>
              <div className="btn-wrapper">
                <PillButton href="https://wa.me/919112149009?text=Hi!%20I%20am%20interested%20in%20the%20Elite%20Plan%20at%20Ultimate%20Fit%20Club.%20Please%20share%20details." target="_blank" rel="noopener noreferrer" $variant="outline">Go Elite</PillButton>
              </div>
            </PlanCard>
          </FadeIn>
        </Grid>
        <FadeIn delay={0.4}>
          <div style={{ textAlign: 'center', marginTop: '40px', color: '#888', fontSize: '14px' }}>
            Exact pricing available at the gym. Contact us for current offers.
          </div>
        </FadeIn>
      </Section>

      <Section id="trainers">
        <FadeIn>
          <SectionHeader>
            <h2>Train With The Best</h2>
          </SectionHeader>
        </FadeIn>
        <FadeIn delay={0.2}>
          <TrainerCard>
            <img src="https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=600&q=80" alt="Pranav Gore" className="image" />
            <div className="info">
              <h3>Pranav Gore</h3>
              <div className="title">Head Trainer & Bodybuilding Specialist</div>
              <p>Expert in personal transformation, injury rehabilitation, strength training and body assessment. Dedicated to pushing you beyond your limits safely and effectively.</p>
              <div className="badges">
                <span><i className="fa-solid fa-certificate"></i> Certified Trainer</span>
                <span><i className="fa-solid fa-dumbbell"></i> Bodybuilding Specialist</span>
                <span><i className="fa-solid fa-briefcase-medical"></i> Injury Rehab Expert</span>
              </div>
            </div>
          </TrainerCard>
        </FadeIn>
      </Section>

      <ReviewSection id="reviews">
        <FadeIn>
          <ReviewHeader>
            <div>
              <h2 style={{ fontSize: '48px', color: '#FFF', marginBottom: '10px' }}>Real People. Real Results.</h2>
            </div>
            <div className="google-badge">
              <i className="fa-brands fa-google"></i>
              <span>4.4 out of 5 — 244 Google Reviews</span>
            </div>
          </ReviewHeader>
        </FadeIn>
        <Grid $cols={3}>
          {[
            { name: "Krishna Vadak", text: "The environment is positive, motivating and well-maintained. Personal training with Pranav Gore made a real difference." },
            { name: "Arti Deshmukh", text: "Despite my knee injury, Pranav Sir created a perfect workout routine ensuring safety and steady progress. Highly recommended." },
            { name: "Sanket Tikam", text: "Best gym in Dighi. More spacious than any other gym. Equipment, locker room and steam are excellent." },
            { name: "Shraddha Ghawate", text: "UFC is my favourite gym in the Bhosari and Dighi area. Huge space, best interior, great trainers and all services." },
            { name: "Shrikant Bambargekar", text: "One of the best gyms in Dighi, Bhosari, Charholi and Alandi area. Facilities are top notch and equipment is well maintained." }
          ].map((rev, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <ReviewCard>
                <div className="stars">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star-half-stroke"></i>
                </div>
                <p className="text">"{rev.text}"</p>
                <div className="author">
                  <span className="name">{rev.name}</span>
                  <i className="fa-brands fa-google google-icon"></i>
                </div>
              </ReviewCard>
            </FadeIn>
          ))}
        </Grid>
      </ReviewSection>

      <Section id="amenities" $darker>
        <FadeIn>
          <SectionHeader>
            <h2>Premium Facilities Included</h2>
          </SectionHeader>
        </FadeIn>
        <AmenitiesGrid>
          {[
            { icon: 'fa-maximize', name: 'Spacious Floor' },
            { icon: 'fa-dumbbell', name: 'Modern Equipment' },
            { icon: 'fa-hot-tub-person', name: 'Steam Bath' },
            { icon: 'fa-sink', name: 'Clean Washrooms' },
            { icon: 'fa-shower', name: 'Shower Room' },
            { icon: 'fa-square-parking', name: 'Free Parking' },
            { icon: 'fa-qrcode', name: 'UPI Payments' },
            { icon: 'fa-lock', name: 'Locker Room' }
          ].map((am, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <AmenityCard>
                <i className={`fa-solid ${am.icon}`}></i>
                <h4>{am.name}</h4>
              </AmenityCard>
            </FadeIn>
          ))}
        </AmenitiesGrid>
      </Section>

      <Section id="gallery">
        <FadeIn>
          <SectionHeader>
            <h2>Inside Our Ultimate Fitness Club</h2>
            <p>Experience the premium environment built for your success</p>
          </SectionHeader>
        </FadeIn>
        <GalleryGrid>
          {[
            { img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80', label: 'Main Floor' },
            { img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80', label: 'Free Weights' },
            { img: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80', label: 'Strength Zone' },
            { img: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&q=80', label: 'Dumbbells' },
            { img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80', label: 'Functional Training' },
            { img: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=800&q=80', label: 'Cardio Area' }
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <GalleryItem onClick={() => setLightboxImg(item.img)}>
                <img src={item.img} alt={item.label} loading="lazy" />
                <div className="overlay">
                  <span>{item.label}</span>
                </div>
              </GalleryItem>
            </FadeIn>
          ))}
        </GalleryGrid>
      </Section>

      <Section id="contact">
        <FadeIn>
          <SectionHeader>
            <h2>Start Your Journey Today</h2>
          </SectionHeader>
        </FadeIn>
        <ContactWrapper>
          <FadeIn delay={0.2}>
            <ContactInfo>
              <div className="item">
                <div className="icon"><i className="fa-solid fa-location-dot"></i></div>
                <div className="details">
                  <h4>Address</h4>
                  <p>3rd Floor, Kamalraj Haridwar Commercial Mall,<br/>Datta Nagar, Dighi, Pune 411015</p>
                </div>
              </div>
              <div className="item">
                <div className="icon"><i className="fa-solid fa-phone"></i></div>
                <div className="details">
                  <h4>Phone</h4>
                  <a href="tel:09112149009">091121 49009</a>
                </div>
              </div>
              <div className="item">
                <div className="icon"><i className="fa-brands fa-whatsapp"></i></div>
                <div className="details">
                  <h4>WhatsApp</h4>
                  <a href="https://wa.me/919112149009" target="_blank" rel="noopener noreferrer">91121 49009</a>
                </div>
              </div>
              <div className="item">
                <div className="icon"><i className="fa-solid fa-clock"></i></div>
                <div className="details">
                  <h4>Hours</h4>
                  <p>Monday–Saturday 6AM–10PM<br/>Sunday Closed</p>
                </div>
              </div>
            </ContactInfo>
          </FadeIn>
          <FadeIn delay={0.4}>
            <MapContainer>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.334005081395!2d73.8693833!3d18.6040183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c70046b0a093%3A0x8998813a304e1262!2sUltimate%20Fit%20Club!5e0!3m2!1sen!2sin!4v1709664532185!5m2!1sen!2sin" 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </MapContainer>
          </FadeIn>
        </ContactWrapper>
      </Section>

      <FooterSection>
        <FooterGrid>
          <div className="brand">
            <Logo href="#home" style={{ marginBottom: '15px' }}>
              <div className="badge"><span>UFC</span></div>
              <div className="text">
                <span className="main">ULTIMATE</span>
                <span className="sub">Fit Club</span>
              </div>
            </Logo>
            <p>Forge Your Best Self</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#why-us">Why Us</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#plans">Plans</a></li>
              <li><a href="#trainers">Trainers</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li>Dighi, Pune 411015</li>
              <li><a href="tel:09112149009">091121 49009</a></li>
              <li><a href="mailto:info@ultimatefitclub.com">info@ultimatefitclub.com</a></li>
            </ul>
          </div>
        </FooterGrid>
        <FooterBottom>
          &copy; {new Date().getFullYear()} Ultimate Fit Club. All rights reserved.
        </FooterBottom>
      </FooterSection>

      <FloatingWhatsApp href="https://wa.me/919112149009" target="_blank" rel="noopener noreferrer">
        <i className="fa-brands fa-whatsapp"></i>
        <span>Chat With Us</span>
      </FloatingWhatsApp>

      <ScrollTopBtn $visible={scrolled} onClick={scrollToTop}>
        <i className="fa-solid fa-arrow-up"></i>
      </ScrollTopBtn>

      <Lightbox $visible={!!lightboxImg} onClick={() => setLightboxImg(null)}>
        <i className="fa-solid fa-xmark close-btn"></i>
        {lightboxImg && <img src={lightboxImg} alt="Gallery view" onClick={e => e.stopPropagation()} />}
      </Lightbox>
    </>
  );
}

