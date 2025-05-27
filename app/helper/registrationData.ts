// import { faker } from '@faker-js/faker';

// export function generateStrongPassword(length = 15): string {
//   const upper = faker.string.alpha({ length: 2, casing: 'upper' });
//   const lower = faker.string.alpha({ length: 2, casing: 'lower' });
//   const digits = faker.string.numeric(3);
//   const symbols = '!@#$%^&*()_+.-';
//   const special = symbols[Math.floor(Math.random() * symbols.length)];

//   let base = upper + lower + digits + special;

//   while (base.length < length) {
//     base += faker.string.alphanumeric(1);
//   }

//   return base.split('').sort(() => 0.5 - Math.random()).join('');
// }
import { faker } from '@faker-js/faker';

export type RegistrationData = {
  email?: string;
  password?: string;
  name?: string;
  surname?: string;
  acceptPrivacy?: boolean;
};

function generateStrongPassword(length = 15): string {
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

export function generateValidRegistrationData(): RegistrationData {
  return {
    email: faker.internet.email(),
    password: generateStrongPassword(),
    name: faker.person.firstName(),
    surname: faker.person.lastName(),
    acceptPrivacy: true,
  };
}

export function generateInvalidEmailData(): RegistrationData {
  const data = generateValidRegistrationData();
  return {
    ...data,
    email: faker.internet.username() + 'gmail.com',
  };
}


export function generateInvalidPasswordData(): RegistrationData {
  const data = generateValidRegistrationData();
  return {
    ...data,
    password: faker.string.alphanumeric(5),
  };
}

export function generateMissingFieldData(field: keyof RegistrationData): RegistrationData {
  const data = generateValidRegistrationData();
  delete data[field];
  return data;
}