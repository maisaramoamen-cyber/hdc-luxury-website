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
  ],
  
  colorPsychology: {
    primary: {
      trustBlue: '#1e40af',
      calmingBlue: '#3b82f6',
      successGreen: '#059669',
      mintGreen: '#10b981'
    },
    secondary: {
      professionalWhite: '#ffffff',
      luxuryGray: '#64748b',
      softGray: '#f1f5f9',
      warmBeige: '#f5f5dc'
    },
    accents: {
      luxuryGold: '#d97706',
      warmYellow: '#fbbf24',
      successGreen: '#16a34a',
      energyOrange: '#ea580c'
    }
  }
}

const app = new Hono()

// CORS for API routes
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// Mount API routes
app.route('/api', api)

// Legacy API route for CPI data
app.get('/api/cpi-data', (c) => {
  return c.json(CPI_DATA)
})

// MAIN PAGE - CRYSTAL POWER INVESTMENTS LUXURY WEBSITE
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en" class="scroll-smooth">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Crystal Power Investments - Strategic Multi-Sector Investment Platform</title>
        <meta name="description" content="Crystal Power Investments: 366% ROI, 98% client satisfaction. Strategic multi-sector investment platform led by Founder & CEO Mo'men Maisara. Real Estate, Hospitality, Technology, Education.">
        <meta name="keywords" content="investment platform, multi-sector investments, Egypt investments, MENA region, real estate, hospitality, technology, education, Cairo">
        
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
        
        <script>
            tailwind.config = {
              theme: {
                extend: {
                  colors: {
                    trust: { 50: '#eff6ff', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a' },
                    success: { 50: '#f0fdf4', 500: '#10b981', 600: '#059669', 700: '#047857', 800: '#065f46', 900: '#064e3b' },
                    luxury: { 50: '#fefce8', 500: '#eab308', 600: '#d97706', 700: '#b45309', 800: '#92400e', 900: '#78350f' },
                    calm: { 50: '#f8fafc', 100: '#f1f5f9', 500: '#64748b', 900: '#0f172a' }
                  },
                  fontFamily: { 'sans': ['Inter', 'system-ui', 'sans-serif'], 'luxury': ['Playfair Display', 'Georgia', 'serif'] }
                }
              }
            }
        </script>
    </head>
    <body class="font-sans antialiased bg-calm-50 text-calm-900">
        
        <!-- LUXURY HEADER -->
        <header class="bg-white shadow-xl sticky top-0 z-50 border-b border-success-200">
            <div class="container mx-auto px-4">
                <div class="hidden md:flex justify-between items-center py-3 text-sm border-b border-calm-100">
                    <div class="flex items-center space-x-6">
                        <div class="bg-gradient-to-r from-luxury-100 to-luxury-200 text-luxury-800 px-4 py-2 rounded-full font-medium">
                            <i class="fas fa-award mr-2"></i>Strategic Investment Leader
                        </div>
                        <span class="flex items-center text-calm-600">
                            <i class="fas fa-phone text-success-600 mr-2"></i>${CPI_DATA.company.phone}
                        </span>
                    </div>
                    <div class="flex items-center space-x-4">
                        <div class="flex items-center space-x-2">
                            <i class="fas fa-star text-luxury-500"></i>
                            <span class="font-medium text-calm-800">98%</span>
                            <span class="text-calm-500">Client Satisfaction</span>
                        </div>
                    </div>
                </div>
                
                <nav class="flex justify-between items-center py-4">
                    <div class="flex items-center">
                        <a href="/" class="flex items-center space-x-4">
                            <div class="bg-gradient-to-br from-trust-600 via-success-500 to-trust-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg">
                                <i class="fas fa-gem text-2xl"></i>
                            </div>
                            <div>
                                <h1 class="text-2xl font-bold text-calm-800">${CPI_DATA.company.shortName}</h1>
                                <p class="text-sm text-success-600 font-medium">${CPI_DATA.company.tagline}</p>
                            </div>
                        </a>
                    </div>
                    
                    <div class="hidden lg:flex items-center space-x-8">
                        <a href="/" class="text-calm-700 hover:text-success-600 font-medium transition-colors">Home</a>
                        <a href="#about" class="text-calm-700 hover:text-success-600 font-medium transition-colors">About</a>
                        <a href="#sectors" class="text-calm-700 hover:text-success-600 font-medium transition-colors">Sectors</a>
                        <a href="#founder" class="text-calm-700 hover:text-success-600 font-medium transition-colors">Leadership</a>
                        <a href="#contact" class="text-calm-700 hover:text-success-600 font-medium transition-colors">Contact</a>
                    </div>
                    
                    <div class="flex items-center space-x-4">
                        <a href="mailto:${CPI_DATA.company.email}" class="hidden md:flex items-center bg-success-600 text-white px-6 py-3 rounded-full hover:bg-success-500 transition-colors shadow-lg">
                            <i class="fas fa-envelope mr-2"></i>Get In Touch
                        </a>
                        <a href="tel:${CPI_DATA.company.phone}" class="bg-gradient-to-r from-trust-600 to-success-500 text-white px-8 py-3 rounded-full hover:from-trust-500 hover:to-success-400 transition-colors font-bold shadow-lg">
                            <i class="fas fa-phone mr-2"></i>Call Now
                        </a>
                    </div>
                </nav>
            </div>
        </header>
        
        <!-- HERO SECTION -->
        <section class="relative min-h-screen bg-gradient-to-br from-calm-50 via-trust-50 to-success-50 overflow-hidden">
            <div class="container mx-auto px-4 py-20">
                <div class="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
                    <div class="space-y-8">
                        <div class="inline-block bg-gradient-to-r from-luxury-100 to-luxury-200 text-luxury-800 px-6 py-3 rounded-full font-bold shadow-lg">
                            <i class="fas fa-chart-line mr-2"></i>STRATEGIC INVESTMENT PLATFORM
                        </div>
                        
                        <h1 class="text-5xl lg:text-7xl font-luxury font-bold text-calm-900 leading-tight">
                            <span class="text-trust-800">${CPI_DATA.company.tagline}</span><br>
                            <span class="text-success-600">${CPI_DATA.company.subtitle}</span>
                        </h1>
                        
                        <p class="text-xl text-calm-600 leading-relaxed max-w-2xl">
                            ${CPI_DATA.company.description}
                        </p>
                        
                        <div class="flex flex-col sm:flex-row gap-4 pt-6">
                            <a href="mailto:${CPI_DATA.company.email}" class="bg-gradient-to-r from-trust-600 to-success-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-trust-700 hover:to-success-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
                                <i class="fas fa-rocket mr-2"></i>Start Your Journey
                            </a>
                            <a href="#sectors" class="border-2 border-trust-600 text-trust-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-trust-50 transition-all duration-300">
                                <i class="fas fa-arrow-down mr-2"></i>Explore Sectors
                            </a>
                        </div>
                    </div>
                    
                    <div class="relative">
                        <div class="absolute inset-0 bg-gradient-to-r from-trust-400 to-success-400 rounded-2xl blur-3xl opacity-20"></div>
                        <div class="relative bg-white rounded-2xl shadow-2xl p-8 space-y-6">
                            <div class="text-center">
                                <div class="text-5xl font-bold text-luxury-600 mb-2">${CPI_DATA.keyMetrics.roi}</div>
                                <p class="text-calm-600">${CPI_DATA.keyMetrics.roiDescription}</p>
                            </div>
                            <div class="border-t border-calm-100 pt-6 grid grid-cols-2 gap-4">
                                <div class="text-center">
                                    <div class="text-3xl font-bold text-success-600">${CPI_DATA.keyMetrics.satisfaction}</div>
                                    <p class="text-sm text-calm-500">${CPI_DATA.keyMetrics.satisfactionDescription}</p>
                                </div>
                                <div class="text-center">
                                    <div class="text-3xl font-bold text-trust-600">${CPI_DATA.keyMetrics.projects}</div>
                                    <p class="text-sm text-calm-500">${CPI_DATA.keyMetrics.projectsDescription}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- KEY METRICS SECTION -->
        <section class="py-20 bg-white">
            <div class="container mx-auto px-4">
                <h2 class="text-4xl font-luxury font-bold text-center mb-16 text-calm-900">Our Track Record</h2>
                <div class="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
                    <div class="text-center p-6 bg-gradient-to-br from-trust-50 to-trust-100 rounded-xl">
                        <div class="text-3xl font-bold text-trust-600 mb-2">${CPI_DATA.keyMetrics.roi}</div>
                        <p class="text-sm text-calm-600">ROI Achieved</p>
                    </div>
                    <div class="text-center p-6 bg-gradient-to-br from-success-50 to-success-100 rounded-xl">
                        <div class="text-3xl font-bold text-success-600 mb-2">${CPI_DATA.keyMetrics.satisfaction}</div>
                        <p class="text-sm text-calm-600">Client Satisfaction</p>
                    </div>
                    <div class="text-center p-6 bg-gradient-to-br from-luxury-50 to-luxury-100 rounded-xl">
                        <div class="text-3xl font-bold text-luxury-600 mb-2">${CPI_DATA.keyMetrics.projects}</div>
                        <p class="text-sm text-calm-600">Projects Deployed</p>
                    </div>
                    <div class="text-center p-6 bg-gradient-to-br from-trust-50 to-trust-100 rounded-xl">
                        <div class="text-3xl font-bold text-trust-600 mb-2">${CPI_DATA.keyMetrics.students}</div>
                        <p class="text-sm text-calm-600">Students Impacted</p>
                    </div>
                    <div class="text-center p-6 bg-gradient-to-br from-success-50 to-success-100 rounded-xl">
                        <div class="text-3xl font-bold text-success-600 mb-2">${CPI_DATA.keyMetrics.schools}</div>
                        <p class="text-sm text-calm-600">School Partners</p>
                    </div>
                    <div class="text-center p-6 bg-gradient-to-br from-luxury-50 to-luxury-100 rounded-xl">
                        <div class="text-3xl font-bold text-luxury-600 mb-2">${CPI_DATA.keyMetrics.visitors}</div>
                        <p class="text-sm text-calm-600">Hospitality Visitors</p>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- SECTORS SECTION -->
        <section id="sectors" class="py-20 bg-gradient-to-br from-calm-50 to-trust-50">
            <div class="container mx-auto px-4">
                <h2 class="text-4xl font-luxury font-bold text-center mb-4 text-calm-900">Our Strategic Sectors</h2>
                <p class="text-center text-calm-600 mb-16 max-w-2xl mx-auto">Diversified portfolio across five strategic sectors, each delivering exceptional value and sustainable growth.</p>
                
                <div class="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                    ${CPI_DATA.sectors.map(sector => `
                    <div class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 hover:transform hover:scale-105">
                        <div class="text-4xl text-luxury-600 mb-4"><i class="${sector.icon}"></i></div>
                        <h3 class="text-xl font-bold text-calm-900 mb-3">${sector.name}</h3>
                        <p class="text-calm-600 text-sm mb-4">${sector.description}</p>
                        <div class="border-t border-calm-100 pt-4">
                            <p class="text-xs font-bold text-success-600 uppercase">${sector.metrics}</p>
                        </div>
                    </div>
                    `).join('')}
                </div>
            </div>
        </section>
        
        <!-- FOUNDER SECTION -->
        <section id="founder" class="py-20 bg-white">
            <div class="container mx-auto px-4">
                <div class="grid lg:grid-cols-2 gap-12 items-center">
                    <div class="space-y-6">
                        <h2 class="text-4xl font-luxury font-bold text-calm-900">Meet the Visionary</h2>
                        <h3 class="text-2xl font-bold text-trust-600">${CPI_DATA.founder.name}</h3>
                        <p class="text-lg font-semibold text-success-600">${CPI_DATA.founder.title}</p>
                        <p class="text-calm-600 leading-relaxed">${CPI_DATA.founder.description}</p>
                        
                        <div class="bg-gradient-to-r from-luxury-100 to-luxury-200 p-6 rounded-xl">
                            <p class="text-lg font-italic text-calm-900 mb-2">"${CPI_DATA.founder.quote}"</p>
                            <p class="text-sm text-calm-600">Core Investment Philosophy</p>
                        </div>
                        
                        <div class="space-y-2">
                            <p class="text-calm-600"><strong>Education:</strong> ${CPI_DATA.founder.education}</p>
                            <p class="text-calm-600"><strong>Philosophy:</strong> ${CPI_DATA.founder.philosophy}</p>
                        </div>
                    </div>
                    
                    <div class="relative">
                        <div class="absolute inset-0 bg-gradient-to-r from-trust-400 to-success-400 rounded-2xl blur-3xl opacity-20"></div>
                        <div class="relative bg-gradient-to-br from-trust-600 to-success-600 rounded-2xl shadow-2xl p-12 text-white text-center">
                            <div class="text-6xl mb-4"><i class="fas fa-user-tie"></i></div>
                            <h3 class="text-3xl font-bold mb-2">${CPI_DATA.founder.name}</h3>
                            <p class="text-lg mb-4">${CPI_DATA.founder.title}</p>
                            <p class="text-trust-100">${CPI_DATA.founder.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- CORE VALUES SECTION -->
        <section class="py-20 bg-gradient-to-br from-calm-50 to-success-50">
            <div class="container mx-auto px-4">
                <h2 class="text-4xl font-luxury font-bold text-center mb-16 text-calm-900">Our Core Values</h2>
                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    ${CPI_DATA.coreValues.map(value => `
                    <div class="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all">
                        <div class="text-4xl text-luxury-600 mb-4"><i class="fas fa-star"></i></div>
                        <h3 class="text-xl font-bold text-calm-900 mb-3">${value.name}</h3>
                        <p class="text-calm-600">${value.description}</p>
                    </div>
                    `).join('')}
                </div>
            </div>
        </section>
        
        <!-- ABOUT SECTION -->
        <section id="about" class="py-20 bg-white">
            <div class="container mx-auto px-4">
                <h2 class="text-4xl font-luxury font-bold text-center mb-12 text-calm-900">About Crystal Power Investments</h2>
                
                <div class="grid md:grid-cols-2 gap-12 mb-16">
                    <div class="space-y-6">
                        <h3 class="text-2xl font-bold text-trust-600">Our Mission</h3>
                        <p class="text-calm-600 leading-relaxed">To empower our clients with strategic investment solutions that drive financial growth and long-term prosperity. We address the need for strategic investment guidance, enabling clients to achieve financial success through tailored investment solutions.</p>
                    </div>
                    <div class="space-y-6">
                        <h3 class="text-2xl font-bold text-success-600">Our Vision</h3>
                        <p class="text-calm-600 leading-relaxed">To be recognized as a leading investment firm in Egypt, renowned for our integrity, expertise, and commitment to client success. We aspire to achieve a position of leadership in the investment sector, contributing to both financial success for clients and broader economic development.</p>
                    </div>
                </div>
                
                <div class="bg-gradient-to-r from-trust-600 to-success-600 text-white rounded-2xl p-12 text-center">
                    <h3 class="text-2xl font-bold mb-4">Investment Philosophy</h3>
                    <p class="text-lg mb-6">"Where Data Meets Integrity"</p>
                    <p class="max-w-2xl mx-auto">Client-first ethos with zero-commission alignment. Evidence-based decisions grounded in ethical practices. Sector-agnostic approach balancing profitability with societal impact. Transparency as standard through proprietary tracking platforms.</p>
                </div>
            </div>
        </section>
        
        <!-- CONTACT SECTION -->
        <section id="contact" class="py-20 bg-gradient-to-br from-calm-50 to-trust-50">
            <div class="container mx-auto px-4">
                <h2 class="text-4xl font-luxury font-bold text-center mb-16 text-calm-900">Get In Touch</h2>
                
                <div class="grid md:grid-cols-3 gap-8 mb-12">
                    <div class="bg-white rounded-xl shadow-lg p-8 text-center">
                        <div class="text-4xl text-trust-600 mb-4"><i class="fas fa-phone"></i></div>
                        <h3 class="text-xl font-bold text-calm-900 mb-2">Phone</h3>
                        <a href="tel:${CPI_DATA.company.phone}" class="text-success-600 hover:text-success-700 font-semibold">${CPI_DATA.company.phone}</a>
                    </div>
                    
                    <div class="bg-white rounded-xl shadow-lg p-8 text-center">
                        <div class="text-4xl text-success-600 mb-4"><i class="fas fa-envelope"></i></div>
                        <h3 class="text-xl font-bold text-calm-900 mb-2">Email</h3>
                        <a href="mailto:${CPI_DATA.company.email}" class="text-success-600 hover:text-success-700 font-semibold">${CPI_DATA.company.email}</a>
                    </div>
                    
                    <div class="bg-white rounded-xl shadow-lg p-8 text-center">
                        <div class="text-4xl text-luxury-600 mb-4"><i class="fas fa-map-marker-alt"></i></div>
                        <h3 class="text-xl font-bold text-calm-900 mb-2">Location</h3>
                        <p class="text-calm-600 font-semibold">${CPI_DATA.company.location}</p>
                    </div>
                </div>
                
                <div class="bg-white rounded-xl shadow-lg p-12">
                    <form class="space-y-6">
                        <div class="grid md:grid-cols-2 gap-6">
                            <input type="text" placeholder="Your Name" class="w-full px-6 py-3 border border-calm-200 rounded-lg focus:outline-none focus:border-trust-600" required>
                            <input type="email" placeholder="Your Email" class="w-full px-6 py-3 border border-calm-200 rounded-lg focus:outline-none focus:border-trust-600" required>
                        </div>
                        <input type="text" placeholder="Subject" class="w-full px-6 py-3 border border-calm-200 rounded-lg focus:outline-none focus:border-trust-600" required>
                        <textarea placeholder="Your Message" rows="5" class="w-full px-6 py-3 border border-calm-200 rounded-lg focus:outline-none focus:border-trust-600" required></textarea>
                        <button type="submit" class="w-full bg-gradient-to-r from-trust-600 to-success-500 text-white py-4 rounded-lg font-bold text-lg hover:from-trust-700 hover:to-success-600 transition-all duration-300">
                            <i class="fas fa-paper-plane mr-2"></i>Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>
        
        <!-- FOOTER -->
        <footer class="bg-calm-900 text-white py-12">
            <div class="container mx-auto px-4">
                <div class="grid md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 class="text-xl font-bold mb-4">Crystal Power Investments</h3>
                        <p class="text-calm-300 text-sm">Strategic multi-sector investment platform leading Egypt's economic transformation.</p>
                    </div>
                    <div>
                        <h4 class="font-bold mb-4">Quick Links</h4>
                        <ul class="space-y-2 text-sm text-calm-300">
                            <li><a href="#about" class="hover:text-white transition-colors">About</a></li>
                            <li><a href="#sectors" class="hover:text-white transition-colors">Sectors</a></li>
                            <li><a href="#founder" class="hover:text-white transition-colors">Leadership</a></li>
                            <li><a href="#contact" class="hover:text-white transition-colors">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-bold mb-4">Company</h4>
                        <ul class="space-y-2 text-sm text-calm-300">
                            <li>Commercial Reg: ${CPI_DATA.company.commercialReg}</li>
                            <li>Tax ID: ${CPI_DATA.company.taxId}</li>
                            <li>Location: ${CPI_DATA.company.location}</li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-bold mb-4">Contact</h4>
                        <ul class="space-y-2 text-sm text-calm-300">
                            <li><a href="tel:${CPI_DATA.company.phone}" class="hover:text-white transition-colors">${CPI_DATA.company.phone}</a></li>
                            <li><a href="mailto:${CPI_DATA.company.email}" class="hover:text-white transition-colors">${CPI_DATA.company.email}</a></li>
                        </ul>
                    </div>
                </div>
                
                <div class="border-t border-calm-700 pt-8 text-center text-calm-300 text-sm">
                    <p>&copy; 2026 Crystal Power Investments. All rights reserved. | Where Data Meets Integrity</p>
                </div>
            </div>
        </footer>
        
    </body>
    </html>
  `)
})

export default app
