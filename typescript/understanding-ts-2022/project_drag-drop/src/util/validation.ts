// namespace App {
// ## VALIDATION
export interface Validatable {
  value: string | number
  required?: boolean
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
}

export function validate(validatableInput: Validatable) {
  let isValid = true
  const { value, ...validationProps } = validatableInput
  const isStringValue = typeof value === 'string'

  if (validationProps.required) {
    isValid &&= value.toString().trim().length !== 0
  }
  if (validationProps.minLength != null && isStringValue) {
    isValid &&= value.length >= validationProps.minLength
  }
  if (validationProps.maxLength != null && isStringValue) {
    isValid &&= value.length <= validationProps.maxLength
  }
  if (validationProps.min != null && !isStringValue) {
    isValid &&= value >= validationProps.min
  }
  if (validationProps.max != null && !isStringValue) {
    isValid &&= value <= validationProps.max
  }

  return isValid
}
// }
