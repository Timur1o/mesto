
export function validateForm(form, configs) {
  for(let config of configs) {
    const field = form.querySelector(config.selector);
    if (!config.regExp.test(field.value)) {
      return field.dataset.error
    }
  }
  return null;
};
