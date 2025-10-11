// HDC APPOINTMENT BOOKING SYSTEM - DATABASE SCHEMA
// Comprehensive database structure for luxury dental clinic appointments

export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialization: string[];
  bio: string;
  image: string;
  experience: number;
  education: string[];
  certifications: string[];
  languages: string[];
  availability: DoctorAvailability[];
  socialMedia: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    whatsapp?: string;
  };
}

export interface DoctorAvailability {
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, etc.
  startTime: string; // "09:00"
  endTime: string;   // "17:00"
  breakStart?: string; // "12:00"
  breakEnd?: string;   // "13:00"
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  address?: {
    street: string;
    city: string;
    country: string;
    postalCode: string;
  };
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  medicalHistory?: {
    allergies: string[];
    medications: string[];
    conditions: string[];
    previousDentalWork: string[];
  };
  preferences: {
    preferredLanguage: string;
    communicationMethod: 'email' | 'sms' | 'whatsapp' | 'call';
    reminderPreference: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  name: string;
  category: 'cosmetic' | 'general' | 'surgical' | 'orthodontics' | 'emergency';
  description: string;
  duration: number; // in minutes
  price: {
    min: number;
    max: number;
    currency: string;
  };
  requiresConsultation: boolean;
  preparationInstructions?: string[];
  aftercareInstructions?: string[];
  images?: string[];
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  serviceId: string;
  appointmentType: 'consultation' | 'treatment' | 'follow-up' | 'emergency';
  status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';
  dateTime: string; // ISO string
  duration: number; // in minutes
  notes?: string;
  patientNotes?: string;
  doctorNotes?: string;
  treatmentPlan?: string;
  cost?: {
    estimated: number;
    actual?: number;
    currency: string;
  };
  reminders: {
    sent: boolean;
    sentAt?: string;
    method: 'email' | 'sms' | 'whatsapp';
  }[];
  followUpRequired?: boolean;
  followUpDate?: string;
  createdAt: string;
  updatedAt: string;
  cancelledAt?: string;
  cancellationReason?: string;
}

export interface TimeSlot {
  doctorId: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  isAvailable: boolean;
  appointmentId?: string;
}

export interface Notification {
  id: string;
  recipientId: string;
  recipientType: 'patient' | 'doctor' | 'admin';
  type: 'appointment_confirmation' | 'appointment_reminder' | 'appointment_cancellation' | 'follow_up' | 'payment_reminder';
  title: string;
  message: string;
  method: 'email' | 'sms' | 'whatsapp' | 'push';
  status: 'pending' | 'sent' | 'delivered' | 'failed';
  scheduledFor: string;
  sentAt?: string;
  metadata?: {
    appointmentId?: string;
    templateId?: string;
    externalId?: string;
  };
  createdAt: string;
}

export interface ClinicSettings {
  id: string;
  name: string;
  address: {
    street: string;
    city: string;
    country: string;
    postalCode: string;
  };
  contact: {
    phone: string;
    email: string;
    whatsapp: string;
    website: string;
  };
  socialMedia: {
    instagram: string;
    facebook: string;
    linkedin: string;
    youtube?: string;
  };
  businessHours: {
    [key: string]: { // day of week
      open: string;
      close: string;
      isOpen: boolean;
    };
  };
  appointmentSettings: {
    defaultDuration: number;
    bufferTime: number; // minutes between appointments
    advanceBookingDays: number;
    cancellationPolicy: string;
    reminderSettings: {
      enabled: boolean;
      daysBefore: number[];
      methods: ('email' | 'sms' | 'whatsapp')[];
    };
  };
  paymentSettings: {
    acceptedMethods: string[];
    currency: string;
    depositRequired: boolean;
    depositPercentage?: number;
  };
}

// SAMPLE DATA FOR DEVELOPMENT
export const SAMPLE_DOCTORS: Doctor[] = [
  {
    id: 'dr-mohamed-hamido',
    name: 'Dr. Mohamed Hamido',
    title: 'Founder & Chief Esthetic Specialist',
    specialization: ['Cosmetic Dentistry', 'Veneers', 'Smile Design', 'Dental Implants'],
    bio: 'Dr. Mohamed Hamido is the founder of Hamido Dental Clinics and a renowned specialist in cosmetic dentistry. With over 15 years of experience, he has transformed thousands of smiles using the latest techniques in esthetic dentistry.',
    image: 'https://page.gensparksite.com/v1/base64_upload/96b90671ecd85fb84f7cf0ca587385ad',
    experience: 15,
    education: [
      'DDS - Cairo University Faculty of Dentistry',
      'Master in Cosmetic Dentistry - American University',
      'Fellowship in Implantology - European Association'
    ],
    certifications: [
      'Board Certified Cosmetic Dentist',
      'Advanced Implant Specialist',
      'Digital Smile Design Certified'
    ],
    languages: ['Arabic', 'English', 'French'],
    availability: [
      { dayOfWeek: 1, startTime: '09:00', endTime: '17:00', breakStart: '12:00', breakEnd: '13:00' },
      { dayOfWeek: 2, startTime: '09:00', endTime: '17:00', breakStart: '12:00', breakEnd: '13:00' },
      { dayOfWeek: 3, startTime: '09:00', endTime: '17:00', breakStart: '12:00', breakEnd: '13:00' },
      { dayOfWeek: 4, startTime: '09:00', endTime: '17:00', breakStart: '12:00', breakEnd: '13:00' },
      { dayOfWeek: 6, startTime: '10:00', endTime: '15:00' }
    ],
    socialMedia: {
      instagram: '@dr.mohamed.hamido',
      facebook: 'Dr.MohamedHamido',
      whatsapp: '+201114591117'
    }
  },
  {
    id: 'dr-amr-hamido',
    name: 'Dr. Amr Hamido',
    title: 'Co-Founder & Oral Surgery Specialist',
    specialization: ['Oral Surgery', 'Dental Implants', 'Periodontics', 'Complex Extractions'],
    bio: 'Dr. Amr Hamido is the co-founder of Hamido Dental Clinics and a specialist in oral surgery and implantology. His expertise in complex surgical procedures and implant placement has made him a sought-after specialist in the region.',
    image: 'https://page.gensparksite.com/v1/base64_upload/96b90671ecd85fb84f7cf0ca587385ad',
    experience: 12,
    education: [
      'DDS - Cairo University Faculty of Dentistry',
      'Master in Oral Surgery - Alexandria University',
      'Advanced Training in Implantology - ITI Switzerland'
    ],
    certifications: [
      'Board Certified Oral Surgeon',
      'ITI Fellow in Implantology',
      'Advanced Bone Grafting Specialist'
    ],
    languages: ['Arabic', 'English', 'German'],
    availability: [
      { dayOfWeek: 1, startTime: '10:00', endTime: '18:00', breakStart: '13:00', breakEnd: '14:00' },
      { dayOfWeek: 2, startTime: '10:00', endTime: '18:00', breakStart: '13:00', breakEnd: '14:00' },
      { dayOfWeek: 4, startTime: '10:00', endTime: '18:00', breakStart: '13:00', breakEnd: '14:00' },
      { dayOfWeek: 5, startTime: '10:00', endTime: '18:00', breakStart: '13:00', breakEnd: '14:00' },
      { dayOfWeek: 6, startTime: '09:00', endTime: '14:00' }
    ],
    socialMedia: {
      instagram: '@dr.amr.hamido',
      facebook: 'Dr.AmrHamido',
      whatsapp: '+201114591118'
    }
  }
];

export const SAMPLE_SERVICES: Service[] = [
  {
    id: 'luxury-veneers',
    name: 'Luxury Porcelain Veneers',
    category: 'cosmetic',
    description: 'Premium porcelain veneers for the perfect smile transformation',
    duration: 120,
    price: { min: 15000, max: 25000, currency: 'EGP' },
    requiresConsultation: true,
    preparationInstructions: [
      'Avoid hard foods 24 hours before appointment',
      'Maintain good oral hygiene',
      'Arrive 15 minutes early for preparation'
    ],
    aftercareInstructions: [
      'Avoid staining foods for 48 hours',
      'Use soft-bristled toothbrush',
      'Schedule follow-up appointment in 2 weeks'
    ]
  },
  {
    id: 'smile-design',
    name: 'Digital Smile Design',
    category: 'cosmetic',
    description: 'Complete smile makeover using digital design technology',
    duration: 90,
    price: { min: 5000, max: 8000, currency: 'EGP' },
    requiresConsultation: false
  },
  {
    id: 'dental-implants',
    name: 'Premium Dental Implants',
    category: 'surgical',
    description: 'High-quality titanium implants for permanent tooth replacement',
    duration: 180,
    price: { min: 20000, max: 35000, currency: 'EGP' },
    requiresConsultation: true
  },
  {
    id: 'luxury-consultation',
    name: 'Luxury Consultation',
    category: 'general',
    description: 'Comprehensive dental examination with treatment planning',
    duration: 60,
    price: { min: 1000, max: 1500, currency: 'EGP' },
    requiresConsultation: false
  }
];

export const CLINIC_SETTINGS: ClinicSettings = {
  id: 'hdc-main',
  name: 'Hamido Dental Clinics',
  address: {
    street: 'Luxury Medical District',
    city: 'Cairo',
    country: 'Egypt',
    postalCode: '11511'
  },
  contact: {
    phone: '+201114591117',
    email: 'info@hamidodental.com',
    whatsapp: '+201114591117',
    website: 'https://hamidodental.com'
  },
  socialMedia: {
    instagram: '@hamidodental',
    facebook: 'HamidoDentalClinics',
    linkedin: 'hamido-dental-clinics'
  },
  businessHours: {
    'monday': { open: '09:00', close: '18:00', isOpen: true },
    'tuesday': { open: '09:00', close: '18:00', isOpen: true },
    'wednesday': { open: '09:00', close: '18:00', isOpen: true },
    'thursday': { open: '09:00', close: '18:00', isOpen: true },
    'friday': { open: '10:00', close: '16:00', isOpen: true },
    'saturday': { open: '09:00', close: '15:00', isOpen: true },
    'sunday': { open: '00:00', close: '00:00', isOpen: false }
  },
  appointmentSettings: {
    defaultDuration: 60,
    bufferTime: 15,
    advanceBookingDays: 90,
    cancellationPolicy: 'Appointments can be cancelled up to 24 hours in advance without penalty.',
    reminderSettings: {
      enabled: true,
      daysBefore: [7, 3, 1],
      methods: ['whatsapp', 'email', 'sms']
    }
  },
  paymentSettings: {
    acceptedMethods: ['cash', 'card', 'bank_transfer', 'installments'],
    currency: 'EGP',
    depositRequired: true,
    depositPercentage: 30
  }
};

// IN-MEMORY DATABASE (for development - replace with real database in production)
export class InMemoryDatabase {
  private doctors: Doctor[] = [...SAMPLE_DOCTORS];
  private patients: Patient[] = [];
  private appointments: Appointment[] = [];
  private services: Service[] = [...SAMPLE_SERVICES];
  private notifications: Notification[] = [];
  private settings: ClinicSettings = CLINIC_SETTINGS;

  // DOCTOR METHODS
  getDoctors(): Doctor[] {
    return this.doctors;
  }

  getDoctorById(id: string): Doctor | undefined {
    return this.doctors.find(doctor => doctor.id === id);
  }

  // PATIENT METHODS
  getPatients(): Patient[] {
    return this.patients;
  }

  getPatientById(id: string): Patient | undefined {
    return this.patients.find(patient => patient.id === id);
  }

  getPatientByEmail(email: string): Patient | undefined {
    return this.patients.find(patient => patient.email === email);
  }

  createPatient(patient: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>): Patient {
    const newPatient: Patient = {
      ...patient,
      id: `patient-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.patients.push(newPatient);
    return newPatient;
  }

  updatePatient(id: string, updates: Partial<Patient>): Patient | undefined {
    const index = this.patients.findIndex(patient => patient.id === id);
    if (index === -1) return undefined;
    
    this.patients[index] = {
      ...this.patients[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return this.patients[index];
  }

  // APPOINTMENT METHODS
  getAppointments(): Appointment[] {
    return this.appointments;
  }

  getAppointmentById(id: string): Appointment | undefined {
    return this.appointments.find(appointment => appointment.id === id);
  }

  getAppointmentsByPatient(patientId: string): Appointment[] {
    return this.appointments.filter(appointment => appointment.patientId === patientId);
  }

  getAppointmentsByDoctor(doctorId: string): Appointment[] {
    return this.appointments.filter(appointment => appointment.doctorId === doctorId);
  }

  createAppointment(appointment: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>): Appointment {
    const newAppointment: Appointment = {
      ...appointment,
      id: `appointment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.appointments.push(newAppointment);
    return newAppointment;
  }

  updateAppointment(id: string, updates: Partial<Appointment>): Appointment | undefined {
    const index = this.appointments.findIndex(appointment => appointment.id === id);
    if (index === -1) return undefined;
    
    this.appointments[index] = {
      ...this.appointments[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return this.appointments[index];
  }

  deleteAppointment(id: string): boolean {
    const index = this.appointments.findIndex(appointment => appointment.id === id);
    if (index === -1) return false;
    
    this.appointments.splice(index, 1);
    return true;
  }

  // SERVICE METHODS
  getServices(): Service[] {
    return this.services;
  }

  getServiceById(id: string): Service | undefined {
    return this.services.find(service => service.id === id);
  }

  // AVAILABILITY METHODS
  getAvailableSlots(doctorId: string, date: string): TimeSlot[] {
    const doctor = this.getDoctorById(doctorId);
    if (!doctor) return [];

    const dayOfWeek = new Date(date).getDay();
    const availability = doctor.availability.find(avail => avail.dayOfWeek === dayOfWeek);
    if (!availability) return [];

    // Generate time slots based on doctor availability
    const slots: TimeSlot[] = [];
    const startTime = new Date(`${date}T${availability.startTime}:00`);
    const endTime = new Date(`${date}T${availability.endTime}:00`);
    const slotDuration = 30; // 30-minute slots

    let currentTime = new Date(startTime);
    while (currentTime < endTime) {
      const slotStart = currentTime.toTimeString().slice(0, 5);
      const slotEnd = new Date(currentTime.getTime() + slotDuration * 60000).toTimeString().slice(0, 5);
      
      // Check if slot conflicts with existing appointments
      const isBooked = this.appointments.some(appointment => 
        appointment.doctorId === doctorId &&
        appointment.dateTime.startsWith(date) &&
        appointment.status !== 'cancelled' &&
        appointment.dateTime.includes(slotStart)
      );

      slots.push({
        doctorId,
        date,
        startTime: slotStart,
        endTime: slotEnd,
        isAvailable: !isBooked
      });

      currentTime = new Date(currentTime.getTime() + slotDuration * 60000);
    }

    return slots;
  }

  // NOTIFICATION METHODS
  createNotification(notification: Omit<Notification, 'id' | 'createdAt'>): Notification {
    const newNotification: Notification = {
      ...notification,
      id: `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString()
    };
    this.notifications.push(newNotification);
    return newNotification;
  }

  getNotifications(): Notification[] {
    return this.notifications;
  }

  // SETTINGS METHODS
  getSettings(): ClinicSettings {
    return this.settings;
  }

  updateSettings(updates: Partial<ClinicSettings>): ClinicSettings {
    this.settings = { ...this.settings, ...updates };
    return this.settings;
  }
}

// Export singleton instance
export const database = new InMemoryDatabase();
