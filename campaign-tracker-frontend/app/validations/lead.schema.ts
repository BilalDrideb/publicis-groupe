import * as yup from 'yup'

export const leadSchema = yup.object({
  full_name: yup.string().required('Full Name is required'),
  email: yup.string().email('Must be a valid email format').required('Email is required'),
  birth_date: yup.date()
    .max(new Date(), 'Birth date cannot be in the future')
    .required('Birth date is required'),
  campaign_id: yup.number().required('Please select a campaign').positive('Please select a campaign').integer(),
  location_id: yup.number().required('Please select a location').positive('Please select a location').integer(),
  agreeTerms: yup.boolean().oneOf([true], 'You must agree to the Terms & Conditions')
})
