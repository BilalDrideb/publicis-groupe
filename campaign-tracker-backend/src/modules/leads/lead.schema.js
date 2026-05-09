import { z } from 'zod';

export const createLeadSchema = z.object({
  full_name: z
    .string({ required_error: 'full_name is required' })
    .trim()
    .min(2, 'full_name must be at least 2 characters')
    .max(120, 'full_name must be at most 120 characters'),

  email: z
    .string({ required_error: 'email is required' })
    .trim()
    .toLowerCase()
    .email('Invalid email format'),

  birth_date: z
    .string({ required_error: 'birth_date is required' })
    .trim()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      'birth_date must be in ISO format YYYY-MM-DD'
    )
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'birth_date must be a valid date',
    }),

  location_id: z
    .number({ required_error: 'location_id is required', invalid_type_error: 'location_id must be a number' })
    .int('location_id must be an integer')
    .positive('location_id must be a positive integer'),

  campaign_id: z
    .number({ required_error: 'campaign_id is required', invalid_type_error: 'campaign_id must be a number' })
    .int('campaign_id must be an integer')
    .positive('campaign_id must be a positive integer'),
});
