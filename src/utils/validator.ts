export const validateName = (name: string): boolean => {
  return name.length >= 2;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
  return passwordRegex.test(password);
};

export const validateBrideGroomNames = (brideGroom: { name: string }[]) => {
  return brideGroom.every((person) => person.name.trim() !== '');
};
