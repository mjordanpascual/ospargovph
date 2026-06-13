// Example validator structure
// Validators contain input validation logic

const exampleValidator = {
  validateExampleData: (data) => {
    const errors = [];

    if (!data.name || typeof data.name !== 'string') {
      errors.push('Name is required and must be a string');
    }

    if (!data.email || !isValidEmail(data.email)) {
      errors.push('Valid email is required');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  },
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

module.exports = exampleValidator;
