import { faker } from '@faker-js/faker';

export function generateStrongPassword(length = 15): string {
  const upper = faker.string.alpha({ length: 2, casing: 'upper' });
  const lower = faker.string.alpha({ length: 2, casing: 'lower' });
  const digits = faker.string.numeric(3);
  const symbols = '!@#$%^&*()_+.-';
  const special = symbols[Math.floor(Math.random() * symbols.length)];

  let base = upper + lower + digits + special;

  while (base.length < length) {
    base += faker.string.alphanumeric(1);
  }

  return base.split('').sort(() => 0.5 - Math.random()).join('');
}
