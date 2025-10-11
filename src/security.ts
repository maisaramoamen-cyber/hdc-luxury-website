// HDC APPOINTMENT BOOKING SYSTEM - SECURITY & VALIDATION
// Comprehensive security features and data validation

import { Context, Next } from 'hono';

// Rate limiting configuration
interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  message: string;
}

// In-memory rate limiting store (replace with Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Default rate limit configurations
const RATE_LIMITS: Record<string, RateLimitConfig> = {
  default: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100,
    message: 'Too many requests, please try again later'
  },
  booking: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 5,
    message: 'Too many booking attempts, please try again later'
  },
  auth: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5,
    message: 'Too many authentication attempts, please try again later'
  }
};

// Rate limiting middleware
export function rateLimit(type: keyof typeof RATE_LIMITS = 'default') {
  return async (c: Context, next: Next) => {
    const config = RATE_LIMITS[type];
    const clientIP = c.req.header('cf-connecting-ip') || 
                     c.req.header('x-forwarded-for') || 
                     c.req.header('x-real-ip') || 
                     'unknown';
    
    const key = `${type}:${clientIP}`;
    const now = Date.now();
    
    // Clean up expired entries
    for (const [storeKey, data] of rateLimitStore.entries()) {
      if (data.resetTime < now) {
        rateLimitStore.delete(storeKey);
      }
    }
    
    const current = rateLimitStore.get(key);
    
    if (!current || current.resetTime < now) {
      // First request or window expired
      rateLimitStore.set(key, {
        count: 1,
        resetTime: now + config.windowMs
      });
    } else if (current.count >= config.maxRequests) {
      // Rate limit exceeded
      return c.json({
        success: false,
        error: config.message,
        retryAfter: Math.ceil((current.resetTime - now) / 1000)
      }, 429);
    } else {
      // Increment counter
      current.count++;
    }
    
    await next();
  };
}

// Input validation schemas
export const ValidationSchemas = {
  patient: {
    firstName: {
      required: true,
      type: 'string',
      minLength: 2,
      maxLength: 50,
      pattern: /^[a-zA-Z\s]+$/,
      message: 'First name must be 2-50 characters and contain only letters'
    },
    lastName: {
      required: true,
      type: 'string',
      minLength: 2,
      maxLength: 50,
      pattern: /^[a-zA-Z\s]+$/,
      message: 'Last name must be 2-50 characters and contain only letters'
    },
    email: {
      required: true,
      type: 'string',
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please provide a valid email address'
    },
    phone: {
      required: true,
      type: 'string',
      pattern: /^\+?[1-9]\d{1,14}$/,
      message: 'Please provide a valid phone number'
    },
    dateOfBirth: {
      required: false,
      type: 'string',
      pattern: /^\d{4}-\d{2}-\d{2}$/,
      message: 'Date of birth must be in YYYY-MM-DD format'
    }
  },
  
  appointment: {
    patientId: {
      required: true,
      type: 'string',
      minLength: 1,
      message: 'Patient ID is required'
    },
    doctorId: {
      required: true,
      type: 'string',
      minLength: 1,
      message: 'Doctor ID is required'
    },
    serviceId: {
      required: true,
      type: 'string',
      minLength: 1,
      message: 'Service ID is required'
    },
    dateTime: {
      required: true,
      type: 'string',
      pattern: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/,
      message: 'Date and time must be in ISO format (YYYY-MM-DDTHH:MM:SS)'
    },
    appointmentType: {
      required: false,
      type: 'string',
      enum: ['consultation', 'treatment', 'follow-up', 'emergency'],
      message: 'Appointment type must be one of: consultation, treatment, follow-up, emergency'
    },
    notes: {
      required: false,
      type: 'string',
      maxLength: 1000,
      message: 'Notes must not exceed 1000 characters'
    }
  },
  
  whatsapp: {
    phone: {
      required: true,
      type: 'string',
      pattern: /^\+?[1-9]\d{1,14}$/,
      message: 'Please provide a valid phone number'
    },
    message: {
      required: true,
      type: 'string',
      minLength: 1,
      maxLength: 4096,
      message: 'Message must be 1-4096 characters'
    }
  }
};

// Validation function
export function validateInput(data: any, schema: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  for (const [field, rules] of Object.entries(schema)) {
    const value = data[field];
    const fieldRules = rules as any;
    
    // Check required fields
    if (fieldRules.required && (value === undefined || value === null || value === '')) {
      errors.push(`${field} is required`);
      continue;
    }
    
    // Skip validation if field is not required and empty
    if (!fieldRules.required && (value === undefined || value === null || value === '')) {
      continue;
    }
    
    // Type validation
    if (fieldRules.type && typeof value !== fieldRules.type) {
      errors.push(`${field} must be of type ${fieldRules.type}`);
      continue;
    }
    
    // String validations
    if (fieldRules.type === 'string' && typeof value === 'string') {
      if (fieldRules.minLength && value.length < fieldRules.minLength) {
        errors.push(`${field} must be at least ${fieldRules.minLength} characters`);
      }
      
      if (fieldRules.maxLength && value.length > fieldRules.maxLength) {
        errors.push(`${field} must not exceed ${fieldRules.maxLength} characters`);
      }
      
      if (fieldRules.pattern && !fieldRules.pattern.test(value)) {
        errors.push(fieldRules.message || `${field} format is invalid`);
      }
    }
    
    // Enum validation
    if (fieldRules.enum && !fieldRules.enum.includes(value)) {
      errors.push(fieldRules.message || `${field} must be one of: ${fieldRules.enum.join(', ')}`);
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// Validation middleware
export function validateBody(schema: any) {
  return async (c: Context, next: Next) => {
    try {
      const body = await c.req.json();
      const validation = validateInput(body, schema);
      
      if (!validation.isValid) {
        return c.json({
          success: false,
          error: 'Validation failed',
          details: validation.errors
        }, 400);
      }
      
      // Store validated body for use in route handlers
      c.set('validatedBody', body);
      await next();
    } catch (error) {
      return c.json({
        success: false,
        error: 'Invalid JSON in request body'
      }, 400);
    }
  };
}

// Sanitization functions
export const Sanitizers = {
  // Remove HTML tags and dangerous characters
  sanitizeString: (input: string): string => {
    if (typeof input !== 'string') return '';
    return input
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/[<>'"&]/g, '') // Remove dangerous characters
      .trim();
  },
  
  // Sanitize email
  sanitizeEmail: (email: string): string => {
    if (typeof email !== 'string') return '';
    return email.toLowerCase().trim();
  },
  
  // Sanitize phone number
  sanitizePhone: (phone: string): string => {
    if (typeof phone !== 'string') return '';
    return phone.replace(/[^\d+]/g, '');
  },
  
  // Sanitize patient data
  sanitizePatient: (patient: any): any => {
    return {
      ...patient,
      firstName: Sanitizers.sanitizeString(patient.firstName),
      lastName: Sanitizers.sanitizeString(patient.lastName),
      email: Sanitizers.sanitizeEmail(patient.email),
      phone: Sanitizers.sanitizePhone(patient.phone),
      dateOfBirth: patient.dateOfBirth ? Sanitizers.sanitizeString(patient.dateOfBirth) : undefined
    };
  },
  
  // Sanitize appointment data
  sanitizeAppointment: (appointment: any): any => {
    return {
      ...appointment,
      notes: appointment.notes ? Sanitizers.sanitizeString(appointment.notes) : undefined,
      patientNotes: appointment.patientNotes ? Sanitizers.sanitizeString(appointment.patientNotes) : undefined,
      doctorNotes: appointment.doctorNotes ? Sanitizers.sanitizeString(appointment.doctorNotes) : undefined
    };
  }
};

// Security headers middleware
export function securityHeaders() {
  return async (c: Context, next: Next) => {
    await next();
    
    // Set security headers
    c.header('X-Content-Type-Options', 'nosniff');
    c.header('X-Frame-Options', 'DENY');
    c.header('X-XSS-Protection', '1; mode=block');
    c.header('Referrer-Policy', 'strict-origin-when-cross-origin');
    c.header('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
    
    // Content Security Policy
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://cdn.jsdelivr.net https://fonts.googleapis.com",
      "style-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://cdn.jsdelivr.net https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net",
      "img-src 'self' data: https: blob:",
      "connect-src 'self' https://api.whatsapp.com https://wa.me",
      "frame-src 'none'",
      "object-src 'none'",
      "base-uri 'self'"
    ].join('; ');
    
    c.header('Content-Security-Policy', csp);
  };
}

// CORS configuration for production
export function corsConfig() {
  return {
    origin: (origin: string) => {
      // Allow requests from the same domain and common development origins
      const allowedOrigins = [
        'https://hamidodental.com',
        'https://www.hamidodental.com',
        'http://localhost:3000',
        'http://127.0.0.1:3000'
      ];
      
      return !origin || allowedOrigins.includes(origin);
    },
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
    maxAge: 86400 // 24 hours
  };
}

// Business logic validation
export const BusinessValidation = {
  // Validate appointment time is in the future
  validateFutureDateTime: (dateTime: string): boolean => {
    const appointmentDate = new Date(dateTime);
    const now = new Date();
    return appointmentDate > now;
  },
  
  // Validate appointment is during business hours
  validateBusinessHours: (dateTime: string, doctorAvailability: any[]): boolean => {
    const appointmentDate = new Date(dateTime);
    const dayOfWeek = appointmentDate.getDay();
    const timeString = appointmentDate.toTimeString().slice(0, 5); // HH:MM
    
    const availability = doctorAvailability.find(avail => avail.dayOfWeek === dayOfWeek);
    if (!availability) return false;
    
    return timeString >= availability.startTime && timeString <= availability.endTime;
  },
  
  // Validate appointment doesn't conflict with existing appointments
  validateNoConflict: (dateTime: string, duration: number, existingAppointments: any[]): boolean => {
    const newStart = new Date(dateTime);
    const newEnd = new Date(newStart.getTime() + duration * 60000);
    
    return !existingAppointments.some(existing => {
      if (existing.status === 'cancelled') return false;
      
      const existingStart = new Date(existing.dateTime);
      const existingEnd = new Date(existingStart.getTime() + existing.duration * 60000);
      
      // Check for overlap
      return newStart < existingEnd && newEnd > existingStart;
    });
  },
  
  // Validate patient age for certain services
  validatePatientAge: (dateOfBirth: string, minimumAge: number = 0): boolean => {
    if (!dateOfBirth) return minimumAge === 0;
    
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1 >= minimumAge;
    }
    
    return age >= minimumAge;
  },
  
  // Validate appointment booking window (e.g., can't book more than 90 days in advance)
  validateBookingWindow: (dateTime: string, maxDaysInAdvance: number = 90): boolean => {
    const appointmentDate = new Date(dateTime);
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + maxDaysInAdvance);
    
    return appointmentDate <= maxDate;
  }
};

// Error logging and monitoring
export const SecurityLogger = {
  logSecurityEvent: (event: string, details: any, severity: 'low' | 'medium' | 'high' = 'medium') => {
    const logEntry = {
      timestamp: new Date().toISOString(),
      event,
      severity,
      details,
      userAgent: details.userAgent || 'unknown',
      ip: details.ip || 'unknown'
    };
    
    // In production, send to monitoring service
    console.warn('Security Event:', logEntry);
  },
  
  logRateLimitExceeded: (ip: string, endpoint: string, userAgent?: string) => {
    SecurityLogger.logSecurityEvent('rate_limit_exceeded', {
      ip,
      endpoint,
      userAgent
    }, 'medium');
  },
  
  logValidationFailure: (ip: string, endpoint: string, errors: string[], userAgent?: string) => {
    SecurityLogger.logSecurityEvent('validation_failure', {
      ip,
      endpoint,
      errors,
      userAgent
    }, 'low');
  },
  
  logSuspiciousActivity: (ip: string, activity: string, details: any, userAgent?: string) => {
    SecurityLogger.logSecurityEvent('suspicious_activity', {
      ip,
      activity,
      details,
      userAgent
    }, 'high');
  }
};

// Honeypot fields for bot detection
export const HoneypotValidation = {
  // Add honeypot field validation
  validateHoneypot: (body: any): boolean => {
    // Check for common honeypot field names
    const honeypotFields = ['website', 'url', 'homepage', 'company_website'];
    
    for (const field of honeypotFields) {
      if (body[field] && body[field].trim() !== '') {
        return false; // Bot detected
      }
    }
    
    return true;
  },
  
  // Time-based validation (form should take reasonable time to fill)
  validateFormTiming: (submissionTime: number, minimumSeconds: number = 5): boolean => {
    const now = Date.now();
    const timeTaken = (now - submissionTime) / 1000;
    
    return timeTaken >= minimumSeconds;
  }
};

// Export all security utilities
export default {
  rateLimit,
  validateInput,
  validateBody,
  ValidationSchemas,
  Sanitizers,
  securityHeaders,
  corsConfig,
  BusinessValidation,
  SecurityLogger,
  HoneypotValidation
};
