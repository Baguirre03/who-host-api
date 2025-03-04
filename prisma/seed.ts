import { PrismaClient, PartyStatus, PartyHostType } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

// Test User Credentials:
// username: test_user
// password: test123

async function main() {
  // Clear existing data
  await prisma.party.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        username: 'test_user',
        name: 'Test User',
        description: 'Main test account',
        lattitude: 40.7128,
        longitude: -74.006,
        address: '123 Main St, New York, NY',
        password: await hash('test123', 10),
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
    prisma.user.create({
      data: {
        username: 'alice_jones',
        name: 'Alice Jones',
        description: 'Party planner extraordinaire',
        lattitude: 37.7749,
        longitude: -122.4194,
        address: '101 Market St, San Francisco, CA',
        password: await hash('alicepass', 10),
        isAdmin: false,
      },
    }),
  ]);

  const testUser = users[0];

  // Create multiple parties with test_user in different roles
  await Promise.all([
    prisma.party.create({
      data: {
        name: 'Summer Bash',
        description: 'Annual summer party',
        time: new Date('2024-07-15T18:00:00Z'),
        hostId: testUser.id,
        adminId: testUser.id,
        hostType: PartyHostType.CHOOSE,
        status: PartyStatus.PLANNING,
        members: { connect: [{ id: users[1].id }, { id: users[2].id }] },
      },
    }),
    prisma.party.create({
      data: {
        name: 'Winter Wonderland',
        description: 'Cozy winter gathering',
        time: new Date('2024-12-20T19:00:00Z'),
        hostId: users[1].id,
        adminId: testUser.id,
        hostType: PartyHostType.RANDOM,
        status: PartyStatus.PLANNED,
        members: { connect: [{ id: testUser.id }, { id: users[2].id }] },
      },
    }),
    prisma.party.create({
      data: {
        name: 'Spring Festival',
        description: 'Outdoor fun and games',
        time: new Date('2024-04-10T14:00:00Z'),
        hostId: users[2].id,
        adminId: users[1].id,
        hostType: PartyHostType.RANDOM,
        status: PartyStatus.COMPLETED,
        members: { connect: [{ id: testUser.id }, { id: users[3].id }] },
      },
    }),
    prisma.party.create({
      data: {
        name: 'Halloween Spooktacular',
        description: 'Scary fun awaits',
        time: new Date('2024-10-31T20:00:00Z'),
        hostId: testUser.id,
        adminId: users[3].id,
        hostType: PartyHostType.CHOOSE,
        status: PartyStatus.PLANNING,
        members: { connect: [{ id: users[1].id }, { id: users[2].id }] },
      },
    }),
    prisma.party.create({
      data: {
        name: 'New Year’s Eve Blowout',
        description: 'Ring in the new year with style!',
        time: new Date('2024-12-31T23:30:00Z'),
        hostId: users[3].id,
        adminId: testUser.id,
        hostType: PartyHostType.RANDOM,
        status: PartyStatus.PLANNED,
        members: { connect: [{ id: testUser.id }, { id: users[2].id }] },
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
