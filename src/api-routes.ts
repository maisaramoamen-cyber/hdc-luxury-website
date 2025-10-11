// HDC APPOINTMENT BOOKING SYSTEM - API ROUTES
// Comprehensive API endpoints for luxury dental clinic appointments

import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { database, Patient, Appointment, Doctor, Service } from './database';
import { 
  rateLimit, 
  validateBody, 
  ValidationSchemas, 
  Sanitizers, 
  securityHeaders,
  BusinessValidation,
  SecurityLogger,
  HoneypotValidation
} from './security';
import { instagramPosts } from './instagram-gallery';

const api = new Hono();

// Security headers for all routes
api.use('*', securityHeaders());

// Rate limiting for all routes
api.use('*', rateLimit('default'));

// CORS for all API routes
api.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization']
}));

// HEALTH CHECK
api.get('/health', (c) => {
  return c.json({
    status: 'healthy',
    service: 'HDC Appointment Booking API',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    features: ['appointments', 'patients', 'doctors', 'notifications', 'whatsapp', 'instagram']
  });
});

// DOCTORS ENDPOINTS
api.get('/doctors', (c) => {
  const doctors = database.getDoctors();
  return c.json({
    success: true,
    data: doctors,
    count: doctors.length
  });
});

api.get('/doctors/:id', (c) => {
  const id = c.req.param('id');
  const doctor = database.getDoctorById(id);
  
  if (!doctor) {
    return c.json({ success: false, error: 'Doctor not found' }, 404);
  }
  
  return c.json({
    success: true,
    data: doctor
  });
});

// SERVICES ENDPOINTS
api.get('/services', (c) => {
  const services = database.getServices();
  return c.json({
    success: true,
    data: services,
    count: services.length
  });
});

api.get('/services/:id', (c) => {
  const id = c.req.param('id');
  const service = database.getServiceById(id);
  
  if (!service) {
    return c.json({ success: false, error: 'Service not found' }, 404);
  }
  
  return c.json({
    success: true,
    data: service
  });
});

// PATIENTS ENDPOINTS
api.get('/patients', (c) => {
  const patients = database.getPatients();
  return c.json({
    success: true,
    data: patients,
    count: patients.length
  });
});

api.get('/patients/:id', (c) => {
  const id = c.req.param('id');
  const patient = database.getPatientById(id);
  
  if (!patient) {
    return c.json({ success: false, error: 'Patient not found' }, 404);
  }
  
  return c.json({
    success: true,
    data: patient
  });
});

api.post('/patients', 
  rateLimit('booking'),
  validateBody(ValidationSchemas.patient),
  async (c) => {
    try {
      const body = c.get('validatedBody');
      const clientIP = c.req.header('cf-connecting-ip') || 'unknown';
      const userAgent = c.req.header('user-agent') || 'unknown';
      
      // Honeypot validation
      if (!HoneypotValidation.validateHoneypot(body)) {
        SecurityLogger.logSuspiciousActivity(clientIP, 'honeypot_triggered', { body }, userAgent);
        return c.json({
          success: false,
          error: 'Invalid request'
        }, 400);
      }
      
      // Sanitize input data
      const sanitizedData = Sanitizers.sanitizePatient(body);
      
      // Check if patient already exists
      const existingPatient = database.getPatientByEmail(sanitizedData.email);
      if (existingPatient) {
        return c.json({
          success: false,
          error: 'Patient with this email already exists'
        }, 409);
      }
      
      // Set default preferences if not provided
      const patientData = {
        ...sanitizedData,
        preferences: {
          preferredLanguage: 'en',
          communicationMethod: 'whatsapp',
          reminderPreference: true,
          ...sanitizedData.preferences
        }
      };
      
      const patient = database.createPatient(patientData);
      
      return c.json({
        success: true,
        data: patient,
        message: 'Patient registered successfully'
      }, 201);
      
    } catch (error) {
      const clientIP = c.req.header('cf-connecting-ip') || 'unknown';
      const userAgent = c.req.header('user-agent') || 'unknown';
      
      SecurityLogger.logSecurityEvent('patient_creation_error', {
        error: error instanceof Error ? error.message : 'Unknown error',
        ip: clientIP,
        userAgent
      });
      
      return c.json({
        success: false,
        error: 'Failed to create patient'
      }, 500);
    }
  }
);

api.put('/patients/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    
    const updatedPatient = database.updatePatient(id, body);
    
    if (!updatedPatient) {
      return c.json({ success: false, error: 'Patient not found' }, 404);
    }
    
    return c.json({
      success: true,
      data: updatedPatient,
      message: 'Patient updated successfully'
    });
    
  } catch (error) {
    return c.json({
      success: false,
      error: 'Invalid request data'
    }, 400);
  }
});

// APPOINTMENTS ENDPOINTS
api.get('/appointments', (c) => {
  const appointments = database.getAppointments();
  
  // Populate with related data
  const populatedAppointments = appointments.map(appointment => {
    const patient = database.getPatientById(appointment.patientId);
    const doctor = database.getDoctorById(appointment.doctorId);
    const service = database.getServiceById(appointment.serviceId);
    
    return {
      ...appointment,
      patient: patient ? { id: patient.id, firstName: patient.firstName, lastName: patient.lastName, email: patient.email, phone: patient.phone } : null,
      doctor: doctor ? { id: doctor.id, name: doctor.name, title: doctor.title } : null,
      service: service ? { id: service.id, name: service.name, duration: service.duration } : null
    };
  });
  
  return c.json({
    success: true,
    data: populatedAppointments,
    count: populatedAppointments.length
  });
});

api.get('/appointments/:id', (c) => {
  const id = c.req.param('id');
  const appointment = database.getAppointmentById(id);
  
  if (!appointment) {
    return c.json({ success: false, error: 'Appointment not found' }, 404);
  }
  
  // Populate with related data
  const patient = database.getPatientById(appointment.patientId);
  const doctor = database.getDoctorById(appointment.doctorId);
  const service = database.getServiceById(appointment.serviceId);
  
  const populatedAppointment = {
    ...appointment,
    patient,
    doctor,
    service
  };
  
  return c.json({
    success: true,
    data: populatedAppointment
  });
});

api.post('/appointments',
  rateLimit('booking'),
  validateBody(ValidationSchemas.appointment),
  async (c) => {
    try {
      const body = c.get('validatedBody');
      const clientIP = c.req.header('cf-connecting-ip') || 'unknown';
      const userAgent = c.req.header('user-agent') || 'unknown';
      
      // Honeypot validation
      if (!HoneypotValidation.validateHoneypot(body)) {
        SecurityLogger.logSuspiciousActivity(clientIP, 'honeypot_triggered', { body }, userAgent);
        return c.json({
          success: false,
          error: 'Invalid request'
        }, 400);
      }
      
      // Sanitize input data
      const sanitizedData = Sanitizers.sanitizeAppointment(body);
      
      // Validate patient exists
      const patient = database.getPatientById(sanitizedData.patientId);
      if (!patient) {
        return c.json({
          success: false,
          error: 'Patient not found'
        }, 404);
      }
      
      // Validate doctor exists
      const doctor = database.getDoctorById(sanitizedData.doctorId);
      if (!doctor) {
        return c.json({
          success: false,
          error: 'Doctor not found'
        }, 404);
      }
      
      // Validate service exists
      const service = database.getServiceById(sanitizedData.serviceId);
      if (!service) {
        return c.json({
          success: false,
          error: 'Service not found'
        }, 404);
      }
      
      // Business logic validations
      if (!BusinessValidation.validateFutureDateTime(sanitizedData.dateTime)) {
        return c.json({
          success: false,
          error: 'Appointment must be scheduled for a future date and time'
        }, 400);
      }
      
      if (!BusinessValidation.validateBusinessHours(sanitizedData.dateTime, doctor.availability)) {
        return c.json({
          success: false,
          error: 'Appointment must be scheduled during doctor\'s available hours'
        }, 400);
      }
      
      if (!BusinessValidation.validateBookingWindow(sanitizedData.dateTime)) {
        return c.json({
          success: false,
          error: 'Appointment cannot be scheduled more than 90 days in advance'
        }, 400);
      }
      
      // Check for scheduling conflicts
      const existingAppointments = database.getAppointmentsByDoctor(sanitizedData.doctorId);
      const duration = sanitizedData.duration || service.duration;
      
      if (!BusinessValidation.validateNoConflict(sanitizedData.dateTime, duration, existingAppointments)) {
        return c.json({
          success: false,
          error: 'Time slot is not available'
        }, 409);
      }
      
      // Validate patient age for certain services (if date of birth is available)
      if (patient.dateOfBirth && service.category === 'surgical') {
        if (!BusinessValidation.validatePatientAge(patient.dateOfBirth, 18)) {
          return c.json({
            success: false,
            error: 'Patient must be at least 18 years old for surgical procedures'
          }, 400);
        }
      }
      
      // Create appointment
      const appointmentData = {
        ...sanitizedData,
        appointmentType: sanitizedData.appointmentType || 'consultation',
        status: 'scheduled',
        duration: duration,
        reminders: []
      };
      
      const appointment = database.createAppointment(appointmentData);
      
      // Create confirmation notification
      database.createNotification({
        recipientId: patient.id,
        recipientType: 'patient',
        type: 'appointment_confirmation',
        title: 'Appointment Confirmed',
        message: `Your appointment with ${doctor.name} has been confirmed for ${new Date(appointment.dateTime).toLocaleString()}.`,
        method: patient.preferences.communicationMethod as any,
        status: 'pending',
        scheduledFor: new Date().toISOString(),
        metadata: { appointmentId: appointment.id }
      });
      
      return c.json({
        success: true,
        data: appointment,
        message: 'Appointment booked successfully'
      }, 201);
      
    } catch (error) {
      const clientIP = c.req.header('cf-connecting-ip') || 'unknown';
      const userAgent = c.req.header('user-agent') || 'unknown';
      
      SecurityLogger.logSecurityEvent('appointment_creation_error', {
        error: error instanceof Error ? error.message : 'Unknown error',
        ip: clientIP,
        userAgent
      });
      
      return c.json({
        success: false,
        error: 'Failed to create appointment'
      }, 500);
    }
  }
);

api.put('/appointments/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    
    const updatedAppointment = database.updateAppointment(id, body);
    
    if (!updatedAppointment) {
      return c.json({ success: false, error: 'Appointment not found' }, 404);
    }
    
    return c.json({
      success: true,
      data: updatedAppointment,
      message: 'Appointment updated successfully'
    });
    
  } catch (error) {
    return c.json({
      success: false,
      error: 'Invalid request data'
    }, 400);
  }
});

api.delete('/appointments/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json().catch(() => ({}));
    
    const appointment = database.getAppointmentById(id);
    if (!appointment) {
      return c.json({ success: false, error: 'Appointment not found' }, 404);
    }
    
    // Update appointment status to cancelled instead of deleting
    const cancelledAppointment = database.updateAppointment(id, {
      status: 'cancelled',
      cancelledAt: new Date().toISOString(),
      cancellationReason: body.reason || 'Cancelled by patient'
    });
    
    // Create cancellation notification
    const patient = database.getPatientById(appointment.patientId);
    const doctor = database.getDoctorById(appointment.doctorId);
    
    if (patient && doctor) {
      database.createNotification({
        recipientId: patient.id,
        recipientType: 'patient',
        type: 'appointment_cancellation',
        title: 'Appointment Cancelled',
        message: `Your appointment with ${doctor.name} scheduled for ${new Date(appointment.dateTime).toLocaleString()} has been cancelled.`,
        method: patient.preferences.communicationMethod as any,
        status: 'pending',
        scheduledFor: new Date().toISOString(),
        metadata: { appointmentId: appointment.id }
      });
    }
    
    return c.json({
      success: true,
      data: cancelledAppointment,
      message: 'Appointment cancelled successfully'
    });
    
  } catch (error) {
    return c.json({
      success: false,
      error: 'Failed to cancel appointment'
    }, 500);
  }
});

// AVAILABILITY ENDPOINTS
api.get('/slots', (c) => {
  const doctorId = c.req.query('doctorId');
  const date = c.req.query('date');
  
  if (!doctorId || !date) {
    return c.json({
      success: false,
      error: 'doctorId and date parameters are required'
    }, 400);
  }
  
  const slots = database.getAvailableSlots(doctorId, date);
  
  return c.json({
    success: true,
    data: slots,
    count: slots.length
  });
});

api.get('/availability/:doctorId', (c) => {
  const doctorId = c.req.param('doctorId');
  const startDate = c.req.query('startDate') || new Date().toISOString().split('T')[0];
  const endDate = c.req.query('endDate') || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  const doctor = database.getDoctorById(doctorId);
  if (!doctor) {
    return c.json({ success: false, error: 'Doctor not found' }, 404);
  }
  
  const availability = [];
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
    const dateStr = date.toISOString().split('T')[0];
    const slots = database.getAvailableSlots(doctorId, dateStr);
    
    if (slots.length > 0) {
      availability.push({
        date: dateStr,
        slots: slots.filter(slot => slot.isAvailable)
      });
    }
  }
  
  return c.json({
    success: true,
    data: availability,
    doctor: { id: doctor.id, name: doctor.name, title: doctor.title }
  });
});

// WHATSAPP INTEGRATION ENDPOINTS
api.get('/whatsapp/test', (c) => {
  const phone = '+201114591117';
  const message = 'Hello HDC, I would like to book a luxury consultation';
  const whatsappUrl = `https://wa.me/${phone.replace('+', '')}?text=${encodeURIComponent(message)}`;
  
  return c.json({
    success: true,
    phone: phone,
    whatsappUrl: whatsappUrl,
    testUrl: whatsappUrl,
    timestamp: new Date().toISOString()
  });
});

api.post('/whatsapp/send',
  rateLimit('default'),
  validateBody(ValidationSchemas.whatsapp),
  async (c) => {
    try {
      const body = c.get('validatedBody');
      const clientIP = c.req.header('cf-connecting-ip') || 'unknown';
      const userAgent = c.req.header('user-agent') || 'unknown';
      
      // Sanitize input data
      const sanitizedPhone = Sanitizers.sanitizePhone(body.phone);
      const sanitizedMessage = Sanitizers.sanitizeString(body.message);
      
      // In a real implementation, this would integrate with WhatsApp Business API
      // For now, we'll create a notification record and return the WhatsApp URL
      
      const whatsappUrl = `https://wa.me/${sanitizedPhone.replace('+', '')}?text=${encodeURIComponent(sanitizedMessage)}`;
      
      // Create notification record
      const notification = database.createNotification({
        recipientId: body.appointmentId || 'unknown',
        recipientType: 'patient',
        type: 'appointment_reminder',
        title: 'WhatsApp Message',
        message: sanitizedMessage,
        method: 'whatsapp',
        status: 'sent',
        scheduledFor: new Date().toISOString(),
        sentAt: new Date().toISOString(),
        metadata: { appointmentId: body.appointmentId, whatsappUrl }
      });
      
      return c.json({
        success: true,
        data: {
          notificationId: notification.id,
          whatsappUrl: whatsappUrl,
          message: sanitizedMessage,
          phone: sanitizedPhone
        },
        message: 'WhatsApp message prepared successfully'
      });
      
    } catch (error) {
      const clientIP = c.req.header('cf-connecting-ip') || 'unknown';
      const userAgent = c.req.header('user-agent') || 'unknown';
      
      SecurityLogger.logSecurityEvent('whatsapp_send_error', {
        error: error instanceof Error ? error.message : 'Unknown error',
        ip: clientIP,
        userAgent
      });
      
      return c.json({
        success: false,
        error: 'Failed to send WhatsApp message'
      }, 500);
    }
  }
);

// INSTAGRAM INTEGRATION ENDPOINTS
api.get('/instagram/profile', (c) => {
  return c.json({
    success: true,
    data: {
      username: 'hamidodental',
      profileUrl: 'https://www.instagram.com/hamidodental?igsh=MTIybjI0dTRsNm55eQ==',
      displayName: 'Hamido Dental Clinics',
      bio: 'Luxury Is Dentistry ✨ Premium dental care in Cairo, Egypt 🇪🇬 Featured in NICHE Luxury Magazine 📖',
      followersCount: '12.5K',
      postsCount: instagramPosts.length,
      website: 'https://hamidodental.com'
    }
  });
});

// Instagram Gallery Endpoint
api.get('/instagram/gallery', (c) => {
  try {
    // Format posts for website display
    const galleryPosts = instagramPosts
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 12) // Show latest 12 posts
      .map(post => ({
        id: post.id,
        imageUrl: post.imageUrl,
        caption: post.caption,
        instagramUrl: post.instagramUrl,
        date: post.date,
        engagement: post.engagement
      }));

    return c.json({
      success: true,
      data: galleryPosts,
      count: galleryPosts.length,
      profile: {
        username: 'hamidodental',
        profileUrl: 'https://www.instagram.com/hamidodental?igsh=MTIybjI0dTRsNm55eQ=='
      }
    });
  } catch (error) {
    return c.json({
      success: false,
      error: 'Failed to fetch Instagram gallery'
    }, 500);
  }
});

api.post('/instagram/share', async (c) => {
  try {
    const body = await c.req.json();
    const { content, imageUrl, appointmentId } = body;
    
    // In a real implementation, this would integrate with Instagram API
    // For now, we'll create a notification record
    
    const notification = database.createNotification({
      recipientId: appointmentId || 'clinic',
      recipientType: 'admin',
      type: 'appointment_confirmation',
      title: 'Instagram Share',
      message: content || 'Shared appointment success story',
      method: 'push',
      status: 'sent',
      scheduledFor: new Date().toISOString(),
      sentAt: new Date().toISOString(),
      metadata: { appointmentId, imageUrl, platform: 'instagram' }
    });
    
    return c.json({
      success: true,
      data: {
        notificationId: notification.id,
        content: content,
        imageUrl: imageUrl,
        instagramUrl: 'https://instagram.com/hamidodental'
      },
      message: 'Instagram share prepared successfully'
    });
    
  } catch (error) {
    return c.json({
      success: false,
      error: 'Failed to prepare Instagram share'
    }, 500);
  }
});

// NOTIFICATIONS ENDPOINTS
api.get('/notifications', (c) => {
  const notifications = database.getNotifications();
  return c.json({
    success: true,
    data: notifications,
    count: notifications.length
  });
});

api.post('/notifications/send', async (c) => {
  try {
    const body = await c.req.json();
    
    const notification = database.createNotification({
      ...body,
      status: 'sent',
      sentAt: new Date().toISOString()
    });
    
    return c.json({
      success: true,
      data: notification,
      message: 'Notification sent successfully'
    });
    
  } catch (error) {
    return c.json({
      success: false,
      error: 'Failed to send notification'
    }, 500);
  }
});

// CLINIC SETTINGS ENDPOINTS
api.get('/settings', (c) => {
  const settings = database.getSettings();
  return c.json({
    success: true,
    data: settings
  });
});

api.put('/settings', async (c) => {
  try {
    const body = await c.req.json();
    const updatedSettings = database.updateSettings(body);
    
    return c.json({
      success: true,
      data: updatedSettings,
      message: 'Settings updated successfully'
    });
    
  } catch (error) {
    return c.json({
      success: false,
      error: 'Failed to update settings'
    }, 500);
  }
});

// ANALYTICS ENDPOINTS
api.get('/analytics/dashboard', (c) => {
  const appointments = database.getAppointments();
  const patients = database.getPatients();
  const doctors = database.getDoctors();
  
  const today = new Date().toISOString().split('T')[0];
  const thisMonth = new Date().toISOString().slice(0, 7);
  
  const analytics = {
    overview: {
      totalPatients: patients.length,
      totalAppointments: appointments.length,
      totalDoctors: doctors.length,
      activeAppointments: appointments.filter(a => a.status === 'scheduled' || a.status === 'confirmed').length
    },
    today: {
      appointments: appointments.filter(a => a.dateTime.startsWith(today)).length,
      newPatients: patients.filter(p => p.createdAt.startsWith(today)).length
    },
    thisMonth: {
      appointments: appointments.filter(a => a.dateTime.startsWith(thisMonth)).length,
      newPatients: patients.filter(p => p.createdAt.startsWith(thisMonth)).length,
      revenue: appointments
        .filter(a => a.dateTime.startsWith(thisMonth) && a.status === 'completed' && a.cost)
        .reduce((sum, a) => sum + (a.cost?.actual || 0), 0)
    },
    appointmentsByStatus: {
      scheduled: appointments.filter(a => a.status === 'scheduled').length,
      confirmed: appointments.filter(a => a.status === 'confirmed').length,
      completed: appointments.filter(a => a.status === 'completed').length,
      cancelled: appointments.filter(a => a.status === 'cancelled').length
    },
    popularServices: database.getServices().map(service => ({
      ...service,
      bookingCount: appointments.filter(a => a.serviceId === service.id).length
    })).sort((a, b) => b.bookingCount - a.bookingCount)
  };
  
  return c.json({
    success: true,
    data: analytics
  });
});

export default api;
