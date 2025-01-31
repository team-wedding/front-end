export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateBrideGroomNames = (brideGroom: { name: string }[]) => {
  return brideGroom.every((person) => person.name.trim() !== '');
}