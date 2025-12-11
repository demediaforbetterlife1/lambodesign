'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import SpaceBackground from '@/components/SpaceBackground';
import AnimatedHeadline from '@/components/AnimatedHeadline';
import ScrollSection from '@/components/ScrollSection';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import GlowButton from '@/components/GlowButton';
import TiltCard from '@/components/TiltCard';
import StardustParticles from '@/components/StardustParticles';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { SPACE_COLORS } from '@/lib/constants';

export default function AboutPage() {
  return (
    <PageTransition>
      <main className="min-h-screen relative">
        {/* Space background */}
        <SpaceBackground starCount={200} nebulaIntensity={0.4} />

        {/* Content */}
        <div className="relative z-10">
          {/* Hero Section */}
          <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
            {/* Stardust particles */}
            <StardustParticles count={20} />
            
            {/* Overlay Image */}
            <div className="absolute inset-0 z-10">
              <Image
                src="/amalambo.png"
                alt="Lamborghini"
                fill
                className="object-cover opacity-30"
                priority
              />
              <div 
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to bottom, ${SPACE_COLORS.voidBlack}90 0%, ${SPACE_COLORS.deepSpace}60 50%, ${SPACE_COLORS.voidBlack} 100%)`
                }}
              />
            </div>

            {/* Cosmic frame */}
            <div className="absolute inset-8 z-20 pointer-events-none">
              <div className="absolute top-0 left-0 w-32 h-32">
                <div 
                  className="absolute top-0 left-0 w-full h-[2px]"
                  style={{ 
                    background: `linear-gradient(to right, ${SPACE_COLORS.glowCyan}, transparent)`,
                    boxShadow: `0 0 20px ${SPACE_COLORS.glowCyan}` 
                  }} 
                />
                <div 
                  className="absolute top-0 left-0 h-full w-[2px]"
                  style={{ 
                    background: `linear-gradient(to bottom, ${SPACE_COLORS.glowCyan}, transparent)`,
                    boxShadow: `0 0 20px ${SPACE_COLORS.glowCyan}` 
                  }} 
                />
              </div>
              <div className="absolute bottom-0 right-0 w-32 h-32">
                <div 
                  className="absolute bottom-0 right-0 w-full h-[2px]"
                  style={{ 
                    background: `linear-gradient(to left, ${SPACE_COLORS.glowPurple}, transparent)`,
                    boxShadow: `0 0 20px ${SPACE_COLORS.glowPurple}` 
                  }} 
                />
                <div 
                  className="absolute bottom-0 right-0 h-full w-[2px]"
                  style={{ 
                    background: `linear-gradient(to top, ${SPACE_COLORS.glowPurple}, transparent)`,
                    boxShadow: `0 0 20px ${SPACE_COLORS.glowPurple}` 
                  }} 
                />
              </div>
            </div>

            {/* Content */}
            <div className="relative z-20 text-center px-6 pt-24">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-block px-6 py-2 rounded-full text-sm uppercase tracking-[0.3em] font-medium mb-4"
                style={{
                  background: `${SPACE_COLORS.nebulaCyan}30`,
                  border: `1px solid ${SPACE_COLORS.glowCyan}`,
                  color: SPACE_COLORS.starWhite,
                  textShadow: `0 0 20px ${SPACE_COLORS.glowCyan}`,
                  boxShadow: `0 0 30px ${SPACE_COLORS.glowCyan}`
                }}
              >
                Our Story
              </motion.span>
              <AnimatedHeadline
                text="About Lamborghini"
                tag="h1"
                delay={100}
                className="text-5xl md:text-7xl font-bold mt-4"
                style={{ 
                  color: SPACE_COLORS.starWhite,
                  textShadow: `0 0 40px ${SPACE_COLORS.glowCyan}, 0 0 80px ${SPACE_COLORS.glowPurple}`
                }}
              />
            </div>
            
            {/* Bottom cosmic line */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-[2px] z-20"
              style={{ 
                background: `linear-gradient(90deg, transparent, ${SPACE_COLORS.glowCyan}, ${SPACE_COLORS.glowPurple}, transparent)`,
                boxShadow: `0 0 30px ${SPACE_COLORS.glowCyan}`
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </section>


          {/* Story Section */}
          <section className="relative py-24 px-6 overflow-hidden">
            <div className="relative max-w-7xl mx-auto z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <ScrollSection animation="slide" direction="left">
                  <TiltCard maxTilt={8} glowColor={SPACE_COLORS.glowPurple} className="relative aspect-square rounded-3xl overflow-hidden">
                    <Image
                      src="/dmalambo.png"
                      alt="Lamborghini Heritage"
                      fill
                      className="object-cover"
                    />
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(to top, ${SPACE_COLORS.voidBlack}80 0%, transparent 50%)`
                      }}
                    />
                  </TiltCard>
                </ScrollSection>

                <ScrollSection animation="slide" direction="right">
                  <span 
                    className="text-sm uppercase tracking-[0.3em]"
                    style={{ 
                      color: SPACE_COLORS.starGold,
                      textShadow: `0 0 20px ${SPACE_COLORS.starGold}`
                    }}
                  >
                    Since 1963
                  </span>
                  <h2 
                    className="text-4xl md:text-5xl font-bold mt-4"
                    style={{ 
                      color: SPACE_COLORS.starWhite,
                      textShadow: `0 0 30px ${SPACE_COLORS.glowPurple}`
                    }}
                  >
                    A Legacy of Excellence
                  </h2>
                  <p className="text-white/70 mt-6 text-lg leading-relaxed">
                    Founded by Ferruccio Lamborghini in 1963, Automobili Lamborghini 
                    has been at the forefront of automotive innovation for over six decades. 
                    What began as one man&apos;s vision to create the perfect grand touring car 
                    has evolved into a symbol of uncompromising luxury and performance.
                  </p>
                  <p className="text-white/70 mt-4 text-lg leading-relaxed">
                    Every Lamborghini is a testament to Italian craftsmanship, combining 
                    cutting-edge technology with timeless design. From the iconic Miura 
                    to the revolutionary Revuelto, each model pushes the boundaries of 
                    what&apos;s possible in automotive engineering.
                  </p>
                  <div className="mt-8">
                    <GlowButton href="/gallery" variant="neon">
                      Explore Our Models
                    </GlowButton>
                  </div>
                </ScrollSection>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="relative py-24 px-6 overflow-hidden">
            {/* Nebula accent */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-3xl pointer-events-none"
              style={{ background: `radial-gradient(circle, ${SPACE_COLORS.nebulaPurple}20 0%, transparent 70%)` }}
            />
            
            <div className="relative max-w-7xl mx-auto z-10">
              <ScrollSection animation="fade" className="text-center mb-16">
                <span 
                  className="text-sm uppercase tracking-[0.3em]"
                  style={{ 
                    color: SPACE_COLORS.nebulaViolet,
                    textShadow: `0 0 20px ${SPACE_COLORS.glowViolet}`
                  }}
                >
                  Our Philosophy
                </span>
                <h2 
                  className="text-4xl md:text-5xl font-bold mt-4"
                  style={{ 
                    color: SPACE_COLORS.starWhite,
                    textShadow: `0 0 30px ${SPACE_COLORS.glowPurple}`
                  }}
                >
                  What Drives Us
                </h2>
              </ScrollSection>

              <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {[
                  {
                    title: 'Innovation',
                    description: 'Pushing the boundaries of automotive technology with every new model.',
                    icon: '⚡',
                    color: SPACE_COLORS.glowCyan
                  },
                  {
                    title: 'Craftsmanship',
                    description: 'Every detail meticulously crafted by skilled Italian artisans.',
                    icon: '✨',
                    color: SPACE_COLORS.starGold
                  },
                  {
                    title: 'Performance',
                    description: 'Uncompromising power and precision in every driving experience.',
                    icon: '🏎️',
                    color: SPACE_COLORS.glowPurple
                  },
                ].map((value) => (
                  <motion.div
                    key={value.title}
                    variants={staggerItem}
                    className="relative p-8 rounded-3xl overflow-hidden group"
                    style={{ 
                      background: 'rgba(255, 255, 255, 0.03)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                    whileHover={{
                      borderColor: value.color,
                      boxShadow: `0 0 40px ${value.color}40, inset 0 0 40px ${value.color}10`
                    }}
                  >
                    <div 
                      className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110"
                      style={{ filter: `drop-shadow(0 0 15px ${value.color})` }}
                    >
                      {value.icon}
                    </div>
                    <h3 
                      className="text-2xl font-bold mb-4"
                      style={{ color: value.color, textShadow: `0 0 15px ${value.color}` }}
                    >
                      {value.title}
                    </h3>
                    <p className="text-white/60">{value.description}</p>
                    
                    {/* Cosmic accent line */}
                    <motion.div 
                      className="absolute bottom-0 left-1/4 right-1/4 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ 
                        background: value.color,
                        boxShadow: `0 0 15px ${value.color}`
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
            
            {/* Bottom cosmic line */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-[1px]"
              style={{ 
                background: `linear-gradient(90deg, transparent, ${SPACE_COLORS.glowViolet}, transparent)`,
                boxShadow: `0 0 20px ${SPACE_COLORS.glowViolet}`
              }}
            />
          </section>

          {/* Contact Section */}
          <section className="relative py-24 px-6 overflow-hidden">
            <StardustParticles count={15} />
            
            <div className="relative max-w-7xl mx-auto z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <ScrollSection animation="slide" direction="up">
                  <span 
                    className="text-sm uppercase tracking-[0.3em]"
                    style={{ 
                      color: SPACE_COLORS.nebulaCyan,
                      textShadow: `0 0 20px ${SPACE_COLORS.glowCyan}`
                    }}
                  >
                    Get in Touch
                  </span>
                  <h2 
                    className="text-4xl md:text-5xl font-bold mt-4"
                    style={{ 
                      color: SPACE_COLORS.starWhite,
                      textShadow: `0 0 30px ${SPACE_COLORS.glowCyan}`
                    }}
                  >
                    Contact Us
                  </h2>
                  <p className="text-white/70 mt-6 text-lg">
                    Interested in experiencing the Lamborghini lifestyle? 
                    Our team is ready to assist you on your journey.
                  </p>

                  <div className="mt-8 space-y-4">
                    {[
                      { label: 'Email', value: 'info@lamborghini.com', color: SPACE_COLORS.glowCyan },
                      { label: 'Phone', value: '+39 051 6817611', color: SPACE_COLORS.starGold },
                      { label: 'Address', value: 'Via Modena 12, Sant\'Agata Bolognese, Italy', color: SPACE_COLORS.glowPurple },
                    ].map((contact) => (
                      <motion.div
                        key={contact.label}
                        whileHover={{ x: 10, boxShadow: `0 0 30px ${contact.color}40` }}
                        className="flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300"
                        style={{
                          background: 'rgba(255, 255, 255, 0.03)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                      >
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center"
                          style={{ 
                            background: `${contact.color}20`,
                            boxShadow: `0 0 20px ${contact.color}40`
                          }}
                        >
                          <span style={{ color: contact.color, textShadow: `0 0 10px ${contact.color}` }}>
                            {contact.label[0]}
                          </span>
                        </div>
                        <div>
                          <div className="text-white/50 text-sm">{contact.label}</div>
                          <div className="text-white font-medium">{contact.value}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="mt-8">
                    <GlowButton variant="primary">
                      Send Message
                    </GlowButton>
                  </div>
                </ScrollSection>

                <ScrollSection animation="slide" direction="up" delay={0.2}>
                  <TiltCard maxTilt={8} glowColor={SPACE_COLORS.glowCyan} className="relative aspect-[4/3] rounded-3xl overflow-hidden">
                    <Image
                      src="/walkinglabo.png"
                      alt="Lamborghini Showroom"
                      fill
                      className="object-cover"
                    />
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(to top, ${SPACE_COLORS.voidBlack}90 0%, transparent 50%)`
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <h3 
                        className="text-2xl font-bold"
                        style={{ 
                          color: SPACE_COLORS.starWhite,
                          textShadow: `0 0 20px ${SPACE_COLORS.glowCyan}`
                        }}
                      >
                        Visit Our Showroom
                      </h3>
                      <p className="text-white/70 mt-2">
                        Experience Lamborghini in person at our headquarters.
                      </p>
                    </div>
                  </TiltCard>
                </ScrollSection>
              </div>
            </div>
          </section>

          <Footer />
        </div>
      </main>
    </PageTransition>
  );
}
