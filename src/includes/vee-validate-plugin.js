import {
  alpha_spaces as alphaSpaces,
  confirmed,
  email,
  not_one_of as excluded,
  max,
  max_value as maxValue,
  min,
  min_value as minValue,
  regex,
  required,
} from '@vee-validate/rules'
import {
  configure,
  defineRule,
  ErrorMessage,
  Field as VeeField,
  Form as VeeForm,
} from 'vee-validate'

export default {
  install(app) {
    app.component('VeeForm', VeeForm)
    app.component('VeeField', VeeField)
    app.component('ErrorMessage', ErrorMessage)

    defineRule('required', required)
    defineRule('tos', required)
    defineRule('min', min)
    defineRule('max', max)
    defineRule('alpha_spaces', alphaSpaces)
    defineRule('email', email)
    defineRule('min_value', minValue)
    defineRule('max_value', maxValue)
    defineRule('regex', regex)
    defineRule('confirmed', confirmed)
    defineRule('excluded', excluded)

    configure({
      errorMessage: (ctx) => {
        const messages = {
          required: `The field ${ctx.field} is required.`,
          min: `The field ${ctx.field} is too short.`,
          max: `The field ${ctx.field} is too long.`,
          alpha_spaces: `The field ${ctx.field} may only contain alphabetical characters and spaces.`,
          email: `The field ${ctx.field} must be a valid email.`,
          min_value: `The field ${ctx.field} is too low.`,
          max_value: `The field ${ctx.field} is too high.`,
          regex: `The field ${ctx.field} format is invalid.`,
          confirmed: `The field ${ctx.field} confirmation does not match.`,
          excluded: `The field ${ctx.field} is not allowed.`,
          tos: `You must accept the terms of service.`,
        }

        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `The field ${ctx.field} is invalid.`
        return message
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true,
    })
  },
}
