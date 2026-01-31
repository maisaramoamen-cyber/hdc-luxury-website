import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import api from './api-routes'

// CRYSTAL POWER INVESTMENTS - STRATEGIC MULTI-SECTOR INVESTMENT PLATFORM
export const CPI_DATA = {
  company: {
    name: 'Crystal Power Investments',
    shortName: 'CPI',
    tagline: 'Leading Multi-Sector Investment Strategy',
    subtitle: 'Real Estate • Hospitality • Technology',
    description: 'Strategic multi-sector investment platform with 366% ROI and 98% client satisfaction. Founder & CEO: Mo\'men Maisara.',
    phone: '+201066505665',
    email: 'mmaisara@crystalpowerinvestment.com',
    location: 'Cairo, Egypt',
    commercialReg: '205636',
    taxId: '10530-02002-05636'
  },
  
  founder: {
    name: 'Mo\'men Maisara',
    title: 'Founder & CEO',
    description: 'Strategic Investment Architect | Multi-Sector Entrepreneur',
    education: 'Bachelor of Business Administration (BBA) - Arab Academy for Science, Technology and Maritime Transport (AASTMT)',
    philosophy: 'Where Data Meets Integrity',
    quote: 'We only win when you do'
  },
  
  keyMetrics: {
    roi: '366%',
    roiDescription: 'Achieved across multi-sector portfolio since 2022',
    satisfaction: '98%',
    satisfactionDescription: 'Client satisfaction rating maintained',
    projects: '100+',
    projectsDescription: 'Projects successfully deployed',
    students: '10,000+',
    studentsDescription: 'Students impacted through education ventures',
    visitors: '1,000+',
    visitorsDescription: 'Visitors served through hospitality operations',
    schools: '50+',
    schoolsDescription: 'Institutional clients in education sector'
  },
  
  sectors: [
    {
      id: 'education',
      name: 'Education & Nutrition',
      icon: 'fas fa-graduation-cap',
      description: 'Comprehensive school catering services and EdTech solutions bridging nutrition and education.',
      assets: ['Crystal Power Schools Catering', 'HFT Nutrition Platform'],
      metrics: '50+ schools, 10,000+ students'
    },
    {
      id: 'hospitality',
      name: 'Hospitality',
      icon: 'fas fa-utensils',
      description: 'Premium cultural hospitality concepts delivering authentic experiences with VIP service.',
      assets: ['Hawana Cafe'],
      metrics: '1,000+ visitors served'
    },
    {
      id: 'technology',
      name: 'Technology',
      icon: 'fas fa-laptop',
      description: 'Proprietary digital platforms for investment tracking, client management, and engagement.',
      assets: ['Crystal Hub Nexus', 'Parent Engagement Portals'],
      metrics: '3 proprietary platforms'
    },
    {
      id: 'realestate',
      name: 'Real Estate Excellence',
      icon: 'fas fa-building',
      description: 'Data-driven property acquisitions focused on high-growth zones and value enhancement.',
      assets: ['Strategic Property Portfolio'],
      metrics: 'Cairo & New Administrative Capital focus'
    },
    {
      id: 'strategic',
      name: 'Strategic Investments & Export',
      icon: 'fas fa-globe',
      description: 'Cross-border MENA opportunities in construction, manufacturing, and tourism.',
      assets: ['MENA Regional Expansion'],
      metrics: 'Vision 2030 aligned'
    }
  ],
  
  coreValues: [
    { name: 'Quality', description: 'Uncompromising standards in all endeavors' },
    { name: 'Innovation', description: 'Technology-driven solutions for competitive advantage' },
    { name: 'Customer Satisfaction', description: 'Client-first approach with 98% retention' },
    { name: 'Integrity', description: 'Ethical practices and transparent dealings' }
  ]
}

const app = new Hono()

app.use(cors())
app.use('/api/*', api)
app.use('/public/*', serveStatic({ root: './' }))

app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en" class="scroll-smooth">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Crystal Power Investments - Strategic Multi-Sector Investment Platform</title>
        <meta name="description" content="Crystal Power Investments: 366% ROI, 98% client satisfaction. Strategic multi-sector investment platform led by Founder & CEO Mo'men Maisara.">
        <meta name="keywords" content="investment platform, multi-sector investments, Egypt investments, MENA region, real estate, hospitality, technology, education, Cairo">
        
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
        
        <script>
            tailwind.config = {
              theme: {
                extend: {
                  colors: {
                    'vip-dark': '#1a1a1a',
                    'vip-black': '#0f0f0f',
                    'vip-red': '#8B0000',
                    'vip-burgundy': '#6B1B1B',
                    'vip-gold': '#D4AF37',
                    'vip-light-gold': '#E8D4A0',
                    'vip-white': '#F5F5F5'
                  },
                  fontFamily: { 
                    'sans': ['Inter', 'system-ui', 'sans-serif'], 
                    'luxury': ['Playfair Display', 'Georgia', 'serif'] 
                  }
                }
              }
            }
        </script>
        
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { background-color: #0f0f0f; color: #f5f5f5; font-family: 'Inter', sans-serif; }
            .luxury-text { font-family: 'Playfair Display', serif; letter-spacing: 0.05em; }
            .gold-accent { color: #D4AF37; }
            .vip-gradient { background: linear-gradient(135deg, #1a1a1a 0%, #2a1a1a 100%); }
            .vip-border-gold { border-color: #D4AF37; }
            .hover-gold:hover { color: #E8D4A0; transition: all 0.3s ease; }
            .card-vip { background: linear-gradient(135deg, rgba(26,26,26,0.8) 0%, rgba(42,26,26,0.8) 100%); border: 1px solid rgba(212,175,55,0.3); }
            .btn-vip { background: linear-gradient(135deg, #8B0000 0%, #6B1B1B 100%); color: #D4AF37; border: 1px solid #D4AF37; }
            .btn-vip:hover { background: linear-gradient(135deg, #6B1B1B 0%, #4a0e0e 100%); box-shadow: 0 0 20px rgba(212,175,55,0.3); }
        </style>
    </head>
    <body class="bg-vip-black text-vip-white">
        
        <!-- LUXURY HEADER -->
        <header class="bg-vip-dark border-b border-vip-gold sticky top-0 z-50">
            <div class="container mx-auto px-6 py-4">
                <div class="flex justify-between items-center">
                    <div class="flex items-center space-x-4">
                        <img src="/public/static/images/crystal-power-logo-small.png" alt="Crystal Power Investments" class="h-12 w-auto">
                        <div class="hidden md:block">
                            <p class="text-sm gold-accent font-light">Crystal Power Investments</p>
                            <p class="text-xs text-vip-light-gold">Strategic Multi-Sector Platform</p>
                        </div>
                    </div>
                    
                    <nav class="hidden md:flex items-center space-x-8">
                        <a href="#home" class="hover-gold text-sm">Home</a>
                        <a href="#about" class="hover-gold text-sm">About</a>
                        <a href="#sectors" class="hover-gold text-sm">Sectors</a>
                        <a href="#leadership" class="hover-gold text-sm">Leadership</a>
                        <a href="#contact" class="hover-gold text-sm">Contact</a>
                    </nav>
                    
                    <div class="flex items-center space-x-4">
                        <a href="tel:+201066505665" class="btn-vip px-6 py-2 rounded-full text-sm font-semibold">
                            <i class="fas fa-phone mr-2"></i>Call
                        </a>
                    </div>
                </div>
            </div>
        </header>
        
        <!-- HERO SECTION -->
        <section id="home" class="vip-gradient py-24 md:py-32 border-b border-vip-gold border-opacity-20">
            <div class="container mx-auto px-6">
                <div class="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div class="mb-6">
                            <p class="text-vip-gold text-sm font-light tracking-widest">STRATEGIC INVESTMENT PLATFORM</p>
                        </div>
                        <h1 class="luxury-text text-5xl md:text-6xl font-bold mb-6 leading-tight">
                            <span class="text-vip-gold">Crystal Power</span><br>
                            <span class="text-vip-white">Investments</span>
                        </h1>
                        <p class="text-lg text-vip-light-gold mb-8 leading-relaxed">Strategic multi-sector investment platform with 366% ROI and 98% client satisfaction. Founder & CEO: Mo'men Maisara.</p>
                        <div class="flex gap-4">
                            <button class="btn-vip px-8 py-3 rounded-lg font-semibold">Start Your Journey</button>
                            <button class="border border-vip-gold text-vip-gold px-8 py-3 rounded-lg font-semibold hover:bg-vip-burgundy transition">Explore Sectors</button>
                        </div>
                    </div>
                    
                    <div class="bg-gradient-to-br from-vip-burgundy to-vip-black p-8 rounded-lg border border-vip-gold border-opacity-30">
                        <div class="text-center">
                            <img src="/public/static/images/crystal-power-logo.png" alt="Crystal Power Logo" class="w-32 h-auto mx-auto mb-6">
                            <p class="text-6xl luxury-text gold-accent font-bold mb-2">366%</p>
                            <p class="text-vip-light-gold mb-6">Achieved across multi-sector portfolio since 2022</p>
                            <div class="grid grid-cols-2 gap-4 mt-8">
                                <div class="border-t border-vip-gold border-opacity-30 pt-4">
                                    <p class="text-3xl gold-accent font-bold">98%</p>
                                    <p class="text-xs text-vip-light-gold">Client Satisfaction</p>
                                </div>
                                <div class="border-t border-vip-gold border-opacity-30 pt-4">
                                    <p class="text-3xl gold-accent font-bold">100+</p>
                                    <p class="text-xs text-vip-light-gold">Projects Deployed</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- KEY METRICS -->
        <section class="bg-vip-black py-16 border-b border-vip-gold border-opacity-20">
            <div class="container mx-auto px-6">
                <h2 class="luxury-text text-3xl gold-accent text-center mb-12">Our Track Record</h2>
                <div class="grid md:grid-cols-3 gap-8">
                    <div class="card-vip p-8 rounded-lg text-center border">
                        <p class="text-4xl gold-accent font-bold mb-2">366%</p>
                        <p class="text-vip-light-gold">ROI Achieved</p>
                    </div>
                    <div class="card-vip p-8 rounded-lg text-center border">
                        <p class="text-4xl gold-accent font-bold mb-2">98%</p>
                        <p class="text-vip-light-gold">Client Satisfaction</p>
                    </div>
                    <div class="card-vip p-8 rounded-lg text-center border">
                        <p class="text-4xl gold-accent font-bold mb-2">100+</p>
                        <p class="text-vip-light-gold">Projects Deployed</p>
                    </div>
                    <div class="card-vip p-8 rounded-lg text-center border">
                        <p class="text-4xl gold-accent font-bold mb-2">10,000+</p>
                        <p class="text-vip-light-gold">Students Impacted</p>
                    </div>
                    <div class="card-vip p-8 rounded-lg text-center border">
                        <p class="text-4xl gold-accent font-bold mb-2">50+</p>
                        <p class="text-vip-light-gold">School Partners</p>
                    </div>
                    <div class="card-vip p-8 rounded-lg text-center border">
                        <p class="text-4xl gold-accent font-bold mb-2">1,000+</p>
                        <p class="text-vip-light-gold">Hospitality Visitors</p>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- STRATEGIC SECTORS -->
        <section id="sectors" class="vip-gradient py-20 border-b border-vip-gold border-opacity-20">
            <div class="container mx-auto px-6">
                <h2 class="luxury-text text-4xl gold-accent text-center mb-4">Our Strategic Sectors</h2>
                <p class="text-center text-vip-light-gold mb-12 max-w-2xl mx-auto">Diversified portfolio across five strategic sectors, each delivering exceptional value and sustainable growth.</p>
                
                <div class="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                    <div class="card-vip p-6 rounded-lg border text-center hover:border-vip-gold transition">
                        <i class="fas fa-graduation-cap text-3xl gold-accent mb-4"></i>
                        <h3 class="luxury-text text-lg gold-accent font-bold mb-2">Education & Nutrition</h3>
                        <p class="text-sm text-vip-light-gold mb-3">Comprehensive school catering services and EdTech solutions.</p>
                        <p class="text-xs gold-accent font-semibold">50+ schools, 10,000+ students</p>
                    </div>
                    <div class="card-vip p-6 rounded-lg border text-center hover:border-vip-gold transition">
                        <i class="fas fa-utensils text-3xl gold-accent mb-4"></i>
                        <h3 class="luxury-text text-lg gold-accent font-bold mb-2">Hospitality</h3>
                        <p class="text-sm text-vip-light-gold mb-3">Premium cultural hospitality concepts with VIP service.</p>
                        <p class="text-xs gold-accent font-semibold">1,000+ visitors served</p>
                    </div>
                    <div class="card-vip p-6 rounded-lg border text-center hover:border-vip-gold transition">
                        <i class="fas fa-laptop text-3xl gold-accent mb-4"></i>
                        <h3 class="luxury-text text-lg gold-accent font-bold mb-2">Technology</h3>
                        <p class="text-sm text-vip-light-gold mb-3">Proprietary digital platforms for investment tracking.</p>
                        <p class="text-xs gold-accent font-semibold">3 proprietary platforms</p>
                    </div>
                    <div class="card-vip p-6 rounded-lg border text-center hover:border-vip-gold transition">
                        <i class="fas fa-building text-3xl gold-accent mb-4"></i>
                        <h3 class="luxury-text text-lg gold-accent font-bold mb-2">Real Estate Excellence</h3>
                        <p class="text-sm text-vip-light-gold mb-3">Data-driven property acquisitions in high-growth zones.</p>
                        <p class="text-xs gold-accent font-semibold">Cairo & New Administrative Capital</p>
                    </div>
                    <div class="card-vip p-6 rounded-lg border text-center hover:border-vip-gold transition">
                        <i class="fas fa-globe text-3xl gold-accent mb-4"></i>
                        <h3 class="luxury-text text-lg gold-accent font-bold mb-2">Strategic Investments</h3>
                        <p class="text-sm text-vip-light-gold mb-3">Cross-border MENA opportunities aligned with Vision 2030.</p>
                        <p class="text-xs gold-accent font-semibold">Vision 2030 aligned</p>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- FOUNDER SECTION -->
        <section id="leadership" class="bg-vip-black py-20 border-b border-vip-gold border-opacity-20">
            <div class="container mx-auto px-6">
                <h2 class="luxury-text text-4xl gold-accent text-center mb-12">Meet the Visionary</h2>
                
                <div class="max-w-3xl mx-auto card-vip p-12 rounded-lg border">
                    <div class="text-center mb-8">
                        <p class="luxury-text text-3xl gold-accent font-bold mb-2">\${CPI_DATA.founder.name}</p>
                        <p class="text-vip-gold text-lg">\${CPI_DATA.founder.title}</p>
                        <p class="text-vip-light-gold text-sm mt-2">\${CPI_DATA.founder.description}</p>
                    </div>
                    
                    <div class="border-t border-vip-gold border-opacity-20 pt-8 mb-8">
                        <p class="text-center italic text-vip-light-gold text-lg mb-4">"\${CPI_DATA.founder.quote}"</p>
                        <p class="text-center text-vip-gold font-semibold">Core Investment Philosophy</p>
                    </div>
                    
                    <div class="bg-vip-burgundy bg-opacity-30 p-6 rounded border border-vip-gold border-opacity-20">
                        <p class="text-vip-light-gold text-sm"><strong class="gold-accent">Education:</strong> \${CPI_DATA.founder.education}</p>
                        <p class="text-vip-light-gold text-sm mt-3"><strong class="gold-accent">Philosophy:</strong> \${CPI_DATA.founder.philosophy}</p>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- CORE VALUES -->
        <section class="vip-gradient py-20 border-b border-vip-gold border-opacity-20">
            <div class="container mx-auto px-6">
                <h2 class="luxury-text text-4xl gold-accent text-center mb-12">Our Core Values</h2>
                <div class="grid md:grid-cols-4 gap-6">
                    <div class="card-vip p-6 rounded-lg border text-center">
                        <p class="luxury-text text-xl gold-accent font-bold mb-3">Quality</p>
                        <p class="text-vip-light-gold text-sm">Uncompromising standards in all endeavors</p>
                    </div>
                    <div class="card-vip p-6 rounded-lg border text-center">
                        <p class="luxury-text text-xl gold-accent font-bold mb-3">Innovation</p>
                        <p class="text-vip-light-gold text-sm">Technology-driven solutions for competitive advantage</p>
                    </div>
                    <div class="card-vip p-6 rounded-lg border text-center">
                        <p class="luxury-text text-xl gold-accent font-bold mb-3">Customer Satisfaction</p>
                        <p class="text-vip-light-gold text-sm">Client-first approach with 98% retention</p>
                    </div>
                    <div class="card-vip p-6 rounded-lg border text-center">
                        <p class="luxury-text text-xl gold-accent font-bold mb-3">Integrity</p>
                        <p class="text-vip-light-gold text-sm">Ethical practices and transparent dealings</p>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- ABOUT SECTION -->
        <section id="about" class="bg-vip-black py-20 border-b border-vip-gold border-opacity-20">
            <div class="container mx-auto px-6">
                <h2 class="luxury-text text-4xl gold-accent text-center mb-12">About Crystal Power Investments</h2>
                
                <div class="grid md:grid-cols-3 gap-8">
                    <div class="card-vip p-8 rounded-lg border">
                        <p class="luxury-text text-lg gold-accent font-bold mb-4">Our Mission</p>
                        <p class="text-vip-light-gold text-sm">To empower our clients with strategic investment solutions that drive financial growth and long-term prosperity.</p>
                    </div>
                    
                    <div class="card-vip p-8 rounded-lg border">
                        <p class="luxury-text text-lg gold-accent font-bold mb-4">Our Vision</p>
                        <p class="text-vip-light-gold text-sm">To be recognized as a leading investment firm in Egypt, renowned for our integrity, expertise, and commitment to client success.</p>
                    </div>
                    
                    <div class="card-vip p-8 rounded-lg border">
                        <p class="luxury-text text-lg gold-accent font-bold mb-4">Investment Philosophy</p>
                        <p class="text-vip-light-gold text-sm italic">"Where Data Meets Integrity" - Client-first ethos with zero-commission alignment.</p>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- CONTACT SECTION -->
        <section id="contact" class="vip-gradient py-20">
            <div class="container mx-auto px-6">
                <h2 class="luxury-text text-4xl gold-accent text-center mb-12">Get In Touch</h2>
                
                <div class="grid md:grid-cols-2 gap-12">
                    <div class="card-vip p-8 rounded-lg border">
                        <div class="mb-6">
                            <p class="gold-accent font-semibold mb-2">Phone</p>
                            <a href="tel:+201066505665" class="text-vip-light-gold hover-gold">\${CPI_DATA.company.phone}</a>
                        </div>
                        <div class="mb-6">
                            <p class="gold-accent font-semibold mb-2">Email</p>
                            <a href="mailto:\${CPI_DATA.company.email}" class="text-vip-light-gold hover-gold">\${CPI_DATA.company.email}</a>
                        </div>
                        <div>
                            <p class="gold-accent font-semibold mb-2">Location</p>
                            <p class="text-vip-light-gold">\${CPI_DATA.company.location}</p>
                        </div>
                    </div>
                    
                    <form class="card-vip p-8 rounded-lg border">
                        <input type="text" placeholder="Your Name" class="w-full bg-vip-black border border-vip-gold border-opacity-30 text-vip-white px-4 py-3 rounded mb-4 placeholder-vip-light-gold placeholder-opacity-50">
                        <input type="email" placeholder="Your Email" class="w-full bg-vip-black border border-vip-gold border-opacity-30 text-vip-white px-4 py-3 rounded mb-4 placeholder-vip-light-gold placeholder-opacity-50">
                        <textarea placeholder="Your Message" rows="4" class="w-full bg-vip-black border border-vip-gold border-opacity-30 text-vip-white px-4 py-3 rounded mb-4 placeholder-vip-light-gold placeholder-opacity-50"></textarea>
                        <button class="btn-vip w-full py-3 rounded font-semibold">Send Message</button>
                    </form>
                </div>
            </div>
        </section>
        
        <!-- FOOTER -->
        <footer class="bg-vip-black border-t border-vip-gold py-12">
            <div class="container mx-auto px-6">
                <div class="grid md:grid-cols-3 gap-8 mb-8">
                    <div class="flex items-start space-x-4">
                        <img src="/public/static/images/crystal-power-icon.png" alt="Crystal Power" class="w-16 h-auto">
                        <div>
                            <p class="luxury-text text-lg gold-accent font-bold mb-2">Crystal Power Investments</p>
                            <p class="text-vip-light-gold text-sm">Strategic multi-sector investment platform leading Egypt's economic transformation.</p>
                        </div>
                    </div>
                    <div>
                        <p class="gold-accent font-semibold mb-4">Quick Links</p>
                        <ul class="space-y-2 text-vip-light-gold text-sm">
                            <li><a href="#about" class="hover-gold">About</a></li>
                            <li><a href="#sectors" class="hover-gold">Sectors</a></li>
                            <li><a href="#leadership" class="hover-gold">Leadership</a></li>
                            <li><a href="#contact" class="hover-gold">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <p class="gold-accent font-semibold mb-4">Company</p>
                        <p class="text-vip-light-gold text-sm mb-2">Commercial Reg: \${CPI_DATA.company.commercialReg}</p>
                        <p class="text-vip-light-gold text-sm mb-2">Tax ID: \${CPI_DATA.company.taxId}</p>
                        <p class="text-vip-light-gold text-sm">Location: \${CPI_DATA.company.location}</p>
                    </div>
                </div>
                
                <div class="border-t border-vip-gold border-opacity-20 pt-8 text-center">
                    <p class="text-vip-light-gold text-sm">© 2026 Crystal Power Investments. All rights reserved. | Where Data Meets Integrity</p>
                </div>
            </div>
        </footer>
        
    </body>
    </html>
  `)
})

export default app
