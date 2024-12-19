import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  await prisma.party.deleteMany({});
  await prisma.user.deleteMany({});

  const users = [];
  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.create({
      data: {
        username: faker.internet.username(),
        name: faker.person.fullName(),
        password: faker.word.noun(),
        description: faker.lorem.sentence(),
        lattitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
      },
    });
    users.push(user);
  }

  // Create 5 parties
  const parties = [];
  for (let i = 0; i < 5; i++) {
    // Randomly select a host from users
    const host = users[Math.floor(Math.random() * users.length)];

    // Randomly select 2-5 members (excluding host)
    const availableMembers = users.filter((u) => u.id !== host.id);
    const memberCount = Math.floor(Math.random() * 4) + 2; // 2 to 5 members
    const selectedMembers = faker.helpers
      .shuffle(availableMembers)
      .slice(0, memberCount);

    const party = await prisma.party.create({
      data: {
        name: faker.word.words(3),
        description: faker.lorem.sentence(),
        time: faker.date.future(),
        hostId: host.id,
        members: {
          connect: selectedMembers.map((member) => ({ id: member.id })),
        },
      },
    });
    parties.push(party);
  }
  console.log(`Created ${users.length} users`);
  console.log(`Created ${parties.length} parties`);

  // Log some sample data
  const sampleUser = users[0];
  console.log('\nSample User:');
  console.log(sampleUser);

  const sampleParty = parties[0];
  console.log('\nSample Party:');
  console.log(sampleParty);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
