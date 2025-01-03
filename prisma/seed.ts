import { PrismaClient, PartyStatus, PartyHostType } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.party.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        username: 'john_doe',
        name: 'John Doe',
        description: 'Party enthusiast',
        lattitude: 40.7128,
        longitude: -74.006,
        address: '123 Main St, New York, NY',
        password: await hash('password123', 10),
        isAdmin: true,
      },
    }),
    prisma.user.create({
      data: {
        username: 'jane_smith',
        name: 'Jane Smith',
        description: 'Love hosting parties',
        lattitude: 34.0522,
        longitude: -118.2437,
        address: '456 Oak Ave, Los Angeles, CA',
        password: await hash('password456', 10),
        isAdmin: false,
      },
    }),
    prisma.user.create({
      data: {
        username: 'bob_wilson',
        name: 'Bob Wilson',
        description: 'Always up for a party',
        lattitude: 41.8781,
        longitude: -87.6298,
        address: '789 Pine St, Chicago, IL',
        password: await hash('password789', 10),
        isAdmin: false,
      },
    }),
  ]);

  // Create parties
  await Promise.all([
    prisma.party.create({
      data: {
        name: 'Summer Bash',
        description: 'Annual summer party',
        time: new Date('2024-07-15T18:00:00Z'),
        hostId: users[0].id,
        adminId: users[0].id,
        hostType: PartyHostType.CHOOSE,
        status: PartyStatus.PLANNING,
        members: {
          connect: [{ id: users[1].id }, { id: users[2].id }],
        },
      },
    }),
    prisma.party.create({
      data: {
        name: 'Winter Wonderland',
        description: 'Cozy winter gathering',
        time: new Date('2024-12-20T19:00:00Z'),
        hostId: users[1].id,
        adminId: users[0].id,
        hostType: PartyHostType.RANDOM,
        status: PartyStatus.PLANNED,
        members: {
          connect: [{ id: users[0].id }, { id: users[2].id }],
        },
      },
    }),
  ]);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
