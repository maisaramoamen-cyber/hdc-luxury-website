import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import api from './api-routes'

// HDC LUXURY DATA WITH PROFESSIONAL PHOTOS AND COLOR PSYCHOLOGY
export const HDC_DATA = {
  clinic: {
    name: 'Hamido Dental Clinics',
    shortName: 'HDC', 
    tagline: 'Luxury Is Dentistry',
    subtitle: 'Your Best Smile Starts Here',
    description: 'Luxury dental clinic featuring esthetic specialists and founders of Hamido Clinics, as featured in NICHE Luxury Lifestyle Magazine.',
    phone: '+201114591117',
    email: 'info@hamidodental.com'
  },
  
  // PROFESSIONAL PHOTO GALLERY - CATEGORIZED FOR MAXIMUM IMPACT
  images: {
    // NICHE MAGAZINE FEATURES
    magazineHero: 'https://page.gensparksite.com/v1/base64_upload/96b90671ecd85fb84f7cf0ca587385ad',
    magazineFeature: 'https://page.gensparksite.com/v1/base64_upload/27347ee3320b16b68edeb2bacb92abdc',
    
    // CLINICAL EXCELLENCE
    premiumClinic: 'https://page.gensparksite.com/v1/base64_upload/a756cc9e83f6b994cc61865a05dc8543',
    
    // TRANSFORMATION GALLERY - BEFORE/AFTER SHOWCASE
    transformations: {
      veneersBeforeAfter: 'https://page.gensparksite.com/v1/base64_upload/fb3513452c36a917ef43f34e0d23ce8a',
      veneerDetail: 'https://page.gensparksite.com/v1/base64_upload/5caaa6960ce1440df44f08d76393f245',
      perfectSmile1: 'https://page.gensparksite.com/v1/base64_upload/eba6710671db8d69d167858589a4f512',
      perfectSmile2: 'https://page.gensparksite.com/v1/base64_upload/badb98d345bae7752fbbb48010f27b15',
      naturalResult: 'https://page.gensparksite.com/v1/base64_upload/0db5501e799eb7791d4dfdc2f9eafe0e'
    },
    
    // PATIENT TESTIMONIALS WITH FACES
    testimonials: {
      happyPatient1: 'https://page.gensparksite.com/v1/base64_upload/929f0c731de6be72f6f5b051b28fa15a',
      happyPatient2: 'https://page.gensparksite.com/v1/base64_upload/ac041271a9555244e5c58351aa848462',
    },
    
    // TECHNICAL EXCELLENCE
    dentalWork: {
      precisionVeneers: 'https://page.gensparksite.com/v1/base64_upload/69180c9cd2eddfe6503e95eb59d86886',
      chairsideResult: 'https://page.gensparksite.com/v1/base64_upload/e0bd8bdc56be5212f53651c7223ca4db'
    },
    
    // AWARDS AND RECOGNITION  
    awards: {
      luxuryAward: 'https://page.gensparksite.com/v1/base64_upload/9d5917733b60021e2783a8bd25ce4de7'
    }
  },
  
  // COLOR PSYCHOLOGY SYSTEM - ANXIETY REDUCTION & TRUST BUILDING
  colorPsychology: {
    // PRIMARY COLORS (60% - DOMINANT)
    primary: {
      trustBlue: '#1e40af',        // Deep blue for credibility
      calmingBlue: '#3b82f6',      // Soft blue for anxiety reduction  
      wellnessGreen: '#059669',    // Green for health/wellness
      mintGreen: '#10b981'         // Mint for freshness
    },
    
    // SECONDARY COLORS (30% - SUPPORTING)
    secondary: {
      professionalWhite: '#ffffff', // Clean professionalism
      luxuryGray: '#64748b',       // Sophisticated neutral
      softGray: '#f1f5f9',        // Light backgrounds
      warmBeige: '#f5f5dc'        // Warm accent neutral
    },
    
    // ACCENT COLORS (10% - HIGHLIGHTS)
    accents: {
      luxuryGold: '#d97706',       // Premium gold for luxury
      warmYellow: '#fbbf24',       // Welcoming touch
      successGreen: '#16a34a',     // Positive outcomes
      energyOrange: '#ea580c'      // Call-to-action energy
    }
  },
  
  // BIOPHILIC DESIGN ELEMENTS
  biophilic: {
    nature: {
      leafGreen: '#22c55e',
      skyBlue: '#0ea5e9', 
      earthBrown: '#a3a3a3',
      sunYellow: '#eab308'
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

// Legacy API route for HDC data
app.get('/api/hdc-data', (c) => {
  return c.json(HDC_DATA)
})

// MAIN PAGE WITH COLOR PSYCHOLOGY - COMPLETE LUXURY WEBSITE
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en" class="scroll-smooth">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Hamido Dental Clinics - Luxury Is Dentistry</title>
        <meta name="description" content="Luxury dental clinic featuring esthetic specialists Dr. Mohamed and Amr Hamido. Featured in NICHE Luxury Lifestyle Magazine with scientifically-designed color psychology for patient comfort.">
        <meta name="keywords" content="luxury dentistry, color psychology, dental clinic, esthetic dentistry, NICHE magazine, Cairo dentist, anxiety reduction">
        
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
        
        <script>
            tailwind.config = {
              theme: {
                extend: {
                  colors: {
                    trust: { 50: '#eff6ff', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a' },
                    wellness: { 50: '#f0fdf4', 500: '#10b981', 600: '#059669', 700: '#047857', 800: '#065f46', 900: '#064e3b' },
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
        <header class="bg-white shadow-xl sticky top-0 z-50 border-b border-wellness-200">
            <div class="container mx-auto px-4">
                <div class="hidden md:flex justify-between items-center py-3 text-sm border-b border-calm-100">
                    <div class="flex items-center space-x-6">
                        <div class="bg-gradient-to-r from-luxury-100 to-luxury-200 text-luxury-800 px-4 py-2 rounded-full font-medium">
                            <i class="fas fa-award mr-2"></i>Featured in NICHE Luxury Magazine
                        </div>
                        <span class="flex items-center text-calm-600">
                            <i class="fas fa-phone text-wellness-600 mr-2"></i>${HDC_DATA.clinic.phone}
                        </span>
                    </div>
                    <div class="flex items-center space-x-4">
                        <div class="flex items-center space-x-2">
                            <i class="fas fa-star text-luxury-500"></i>
                            <span class="font-medium text-calm-800">4.9</span>
                            <span class="text-calm-500">(320+ reviews)</span>
                        </div>
                    </div>
                </div>
                
                <nav class="flex justify-between items-center py-4">
                    <div class="flex items-center">
                        <a href="/" class="flex items-center space-x-4">
                            <div class="bg-gradient-to-br from-trust-600 via-wellness-500 to-trust-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg">
                                <i class="fas fa-crown text-2xl"></i>
                            </div>
                            <div>
                                <h1 class="text-2xl font-bold text-calm-800">${HDC_DATA.clinic.shortName}</h1>
                                <p class="text-sm text-wellness-600 font-medium">${HDC_DATA.clinic.tagline}</p>
                            </div>
                        </a>
                    </div>
                    
                    <div class="hidden lg:flex items-center space-x-8">
                        <a href="/" class="text-calm-700 hover:text-wellness-600 font-medium transition-colors">Home</a>
                        <a href="/services" class="text-calm-700 hover:text-wellness-600 font-medium transition-colors">Services</a>
                        <a href="/gallery" class="text-calm-700 hover:text-wellness-600 font-medium transition-colors">Gallery</a>
                        <a href="/doctors" class="text-calm-700 hover:text-wellness-600 font-medium transition-colors">Specialists</a>
                        <a href="/contact" class="text-calm-700 hover:text-wellness-600 font-medium transition-colors">Contact</a>
                    </div>
                    
                    <div class="flex items-center space-x-4">
                        <a href="https://wa.me/${HDC_DATA.clinic.phone.replace('+', '')}?text=Hello%20HDC,%20I%20would%20like%20to%20book%20a%20luxury%20consultation" target="_blank" class="hidden md:flex items-center bg-wellness-600 text-white px-6 py-3 rounded-full hover:bg-wellness-500 transition-colors shadow-lg">
                            <i class="fab fa-whatsapp mr-2"></i>Concierge
                        </a>
                        <a href="/booking.html" class="bg-gradient-to-r from-trust-600 to-wellness-500 text-white px-8 py-3 rounded-full hover:from-trust-500 hover:to-wellness-400 transition-colors font-bold shadow-lg">
                            <i class="fas fa-crown mr-2"></i>Book Luxury
                        </a>
                    </div>
                </nav>
            </div>
        </header>
        
        <!-- HERO SECTION -->
        <section class="relative min-h-screen bg-gradient-to-br from-calm-50 via-trust-50 to-wellness-50 overflow-hidden">
            <div class="container mx-auto px-4 py-20">
                <div class="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
                    <div class="space-y-8 animate-fade-in">
                        <div class="inline-block bg-gradient-to-r from-luxury-100 to-luxury-200 text-luxury-800 px-6 py-3 rounded-full font-bold shadow-lg">
                            <i class="fas fa-award mr-2"></i>FEATURED IN NICHE LUXURY MAGAZINE
                        </div>
                        
                        <h1 class="text-5xl lg:text-7xl font-luxury font-bold text-calm-900 leading-tight">
                            <span class="text-trust-800">${HDC_DATA.clinic.tagline}</span><br>
                            <span class="text-wellness-600">${HDC_DATA.clinic.subtitle}</span>
                        </h1>
                        
                        <p class="text-xl text-calm-600 leading-relaxed max-w-2xl">
                            ${HDC_DATA.clinic.description}
                        </p>
                        
                        <div class="flex flex-col sm:flex-row gap-4 pt-6">
                            <a href="/booking.html" class="bg-gradient-to-r from-trust-600 to-wellness-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-trust-700 hover:to-wellness-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
                                <i class="fas fa-crown mr-2"></i>Book Luxury Consultation
                            </a>
                            <a href="/gallery" class="border-2 border-trust-600 text-trust-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-trust-600 hover:text-white transition-all duration-300">
                                <i class="fas fa-images mr-2"></i>View Transformations
                            </a>
                        </div>
                        
                        <div class="flex items-center space-x-8 pt-8">
                            <div class="text-center">
                                <div class="text-3xl font-bold text-wellness-600">500+</div>
                                <div class="text-sm text-calm-600">Luxury Smiles</div>
                            </div>
                            <div class="text-center">
                                <div class="text-3xl font-bold text-trust-600">4.9⭐</div>
                                <div class="text-sm text-calm-600">Patient Rating</div>
                            </div>
                            <div class="text-center">
                                <div class="text-3xl font-bold text-luxury-600">15+</div>
                                <div class="text-sm text-calm-600">Years Excellence</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="relative">
                        <div class="relative z-10 transform hover:scale-105 transition-transform duration-500">
                            <img src="${HDC_DATA.images.magazineHero}" alt="NICHE Magazine Feature - Dr. Mohamed and Amr Hamido" class="w-full rounded-2xl shadow-2xl" />
                            <div class="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl">
                                <div class="text-center">
                                    <div class="text-2xl font-bold text-luxury-600">NICHE</div>
                                    <div class="text-sm text-calm-600">LUXURY MAGAZINE</div>
                                </div>
                            </div>
                        </div>
                        <div class="absolute top-10 -left-6 w-20 h-20 bg-trust-100 rounded-full animate-float opacity-60"></div>
                        <div class="absolute bottom-20 -right-8 w-16 h-16 bg-wellness-100 rounded-full animate-float animation-delay-2s opacity-60"></div>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- TRANSFORMATION GALLERY -->
        <section class="py-20 bg-white">
            <div class="container mx-auto px-4">
                <div class="text-center mb-16">
                    <h2 class="text-4xl font-luxury font-bold text-calm-900 mb-6">
                        <span class="text-trust-800">Luxury</span> <span class="text-wellness-600">Transformations</span>
                    </h2>
                    <p class="text-xl text-calm-600 max-w-3xl mx-auto">Witness the artistry of precision dentistry through our before-and-after gallery</p>
                </div>
                
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    <div class="bg-calm-50 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 group">
                        <img src="${HDC_DATA.images.transformations.veneersBeforeAfter}" alt="Luxury Veneers Transformation" class="w-full rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300" />
                        <h3 class="text-xl font-bold text-calm-900 mb-2">Luxury Veneers</h3>
                        <p class="text-calm-600">Premium porcelain veneers for the perfect smile</p>
                    </div>
                    
                    <div class="bg-calm-50 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 group">
                        <img src="${HDC_DATA.images.transformations.perfectSmile1}" alt="Perfect Smile Result" class="w-full rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300" />
                        <h3 class="text-xl font-bold text-calm-900 mb-2">Smile Design</h3>
                        <p class="text-calm-600">Digital smile design with precision execution</p>
                    </div>
                    
                    <div class="bg-calm-50 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 group">
                        <img src="${HDC_DATA.images.transformations.naturalResult}" alt="Natural Smile Result" class="w-full rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300" />
                        <h3 class="text-xl font-bold text-calm-900 mb-2">Natural Beauty</h3>
                        <p class="text-calm-600">Achieving natural-looking perfection</p>
                    </div>
                </div>
                
                <div class="text-center">
                    <a href="/booking.html" class="bg-gradient-to-r from-trust-600 to-wellness-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-trust-700 hover:to-wellness-600 transition-all duration-300 shadow-xl">
                        <i class="fas fa-crown mr-2"></i>Book Your Transformation
                    </a>
                </div>
            </div>
        </section>
        
        <!-- PATIENT TESTIMONIALS -->
        <section class="py-20 bg-gradient-to-br from-trust-50 to-wellness-50">
            <div class="container mx-auto px-4">
                <div class="text-center mb-16">
                    <h2 class="text-4xl font-luxury font-bold text-calm-900 mb-6">
                        <span class="text-wellness-600">Patient</span> <span class="text-trust-800">Experiences</span>
                    </h2>
                </div>
                
                <div class="grid md:grid-cols-2 gap-12 items-center">
                    <div class="space-y-8">
                        <div class="bg-white rounded-2xl p-8 shadow-xl">
                            <div class="flex items-center mb-6">
                                <img src="${HDC_DATA.images.testimonials.happyPatient1}" alt="Happy Patient" class="w-16 h-16 rounded-full mr-4 object-cover" />
                                <div>
                                    <div class="font-bold text-calm-900">Sarah M.</div>
                                    <div class="text-calm-600">Luxury Veneers Patient</div>
                                </div>
                            </div>
                            <p class="text-calm-700 italic text-lg leading-relaxed">"The experience exceeded all my expectations. The attention to detail and luxury service made me feel truly special."</p>
                            <div class="flex text-luxury-500 mt-4">⭐⭐⭐⭐⭐</div>
                        </div>
                        
                        <div class="bg-white rounded-2xl p-8 shadow-xl">
                            <div class="flex items-center mb-6">
                                <img src="${HDC_DATA.images.testimonials.happyPatient2}" alt="Patient in Clinic" class="w-16 h-16 rounded-full mr-4 object-cover" />
                                <div>
                                    <div class="font-bold text-calm-900">Ahmed R.</div>
                                    <div class="text-calm-600">Smile Makeover Patient</div>
                                </div>
                            </div>
                            <p class="text-calm-700 italic text-lg leading-relaxed">"Professional excellence combined with luxury comfort. My smile transformation has changed my life completely."</p>
                            <div class="flex text-luxury-500 mt-4">⭐⭐⭐⭐⭐</div>
                        </div>
                    </div>
                    
                    <div class="relative">
                        <img src="${HDC_DATA.images.premiumClinic}" alt="Premium HDC Clinic Interior" class="w-full rounded-2xl shadow-2xl" />
                        <div class="absolute inset-0 bg-gradient-to-t from-trust-900/20 to-transparent rounded-2xl"></div>
                        <div class="absolute bottom-8 left-8 text-white">
                            <h3 class="text-2xl font-bold mb-2">State-of-the-Art Facility</h3>
                            <p class="text-lg opacity-90">Where luxury meets precision dentistry</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- LUXURY FOOTER -->
        <footer class="bg-gradient-to-br from-calm-900 via-trust-900 to-calm-800 text-white">
            <div class="container mx-auto px-4 py-16">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <div class="flex items-center mb-6">
                            <div class="bg-gradient-to-br from-trust-600 via-wellness-500 to-trust-700 text-white rounded-full w-12 h-12 flex items-center justify-center mr-4">
                                <i class="fas fa-crown"></i>
                            </div>
                            <div>
                                <h3 class="font-bold text-2xl">${HDC_DATA.clinic.shortName}</h3>
                                <p class="text-luxury-300 font-medium">${HDC_DATA.clinic.tagline}</p>
                            </div>
                        </div>
                        <p class="text-calm-300 mb-6 leading-relaxed">${HDC_DATA.clinic.description}</p>
                    </div>
                    
                    <div>
                        <h4 class="font-bold text-xl mb-6 text-wellness-300">Contact</h4>
                        <div class="space-y-4 text-calm-300">
                            <div class="flex items-center">
                                <i class="fas fa-phone text-wellness-400 mr-3"></i>
                                <span>${HDC_DATA.clinic.phone}</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-envelope text-wellness-400 mr-3"></i>
                                <span>${HDC_DATA.clinic.email}</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-map-marker-alt text-wellness-400 mr-3"></i>
                                <span>Cairo, Egypt - Multiple Locations</span>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <h4 class="font-bold text-xl mb-6 text-wellness-300">Awards & Recognition</h4>
                        <div class="bg-gradient-to-r from-luxury-600 to-luxury-500 text-black p-4 rounded-xl mb-4">
                            <div class="flex items-center mb-2">
                                <i class="fas fa-award mr-2"></i>
                                <span class="font-bold">NICHE LUXURY MAGAZINE</span>
                            </div>
                            <p class="text-sm opacity-90">Featured for excellence in luxury dental care</p>
                        </div>
                    </div>
                </div>
                
                <div class="border-t border-calm-700 pt-8">
                    <div class="flex flex-col md:flex-row justify-between items-center">
                        <p class="text-calm-400 text-sm mb-4 md:mb-0">© 2024 Hamido Dental Clinics. Luxury Is Dentistry. All rights reserved.</p>
                        <div class="flex space-x-6">
                            <a href="https://www.instagram.com/hamidodental?igsh=MTIybjI0dTRsNm55eQ==" target="_blank" class="text-calm-400 hover:text-wellness-400 transition-colors"><i class="fab fa-instagram text-xl"></i></a>
                            <a href="#" class="text-calm-400 hover:text-wellness-400 transition-colors"><i class="fab fa-facebook text-xl"></i></a>
                            <a href="https://wa.me/${HDC_DATA.clinic.phone.replace('+', '')}" class="text-calm-400 hover:text-wellness-400 transition-colors"><i class="fab fa-whatsapp text-xl"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        
        <!-- Floating WhatsApp -->
        <div class="fixed bottom-6 right-6 z-50">
            <a href="https://wa.me/${HDC_DATA.clinic.phone.replace('+', '')}?text=Hello%20HDC,%20I%20would%20like%20to%20book%20a%20luxury%20consultation" 
               class="bg-wellness-600 hover:bg-wellness-500 text-white rounded-full p-4 shadow-2xl transition-all duration-300 flex items-center justify-center w-16 h-16 animate-pulse" 
               target="_blank" rel="noopener noreferrer">
                <i class="fab fa-whatsapp text-3xl"></i>
            </a>
        </div>
        
        <style>
            .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
            .animate-float { animation: float 6s ease-in-out infinite; }
            .animation-delay-2s { animation-delay: 2s; }
            @keyframes fadeIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
            @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        </style>
    </body>
    </html>
  `)
})

export default app