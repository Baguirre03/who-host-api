import { Party, User } from '@prisma/client';

export interface findHostTypes {
  type: 'closest' | 'random' | 'choose';
  memberId?: string; // Optional member ID when type is 'choose'
}

export default function findHost(
  party: Party & { members: User[] },
  findHostType: findHostTypes,
) {
  if (findHostType.type == 'closest') {
    return findClosestHost(party);
  } else if (findHostType.type == 'random') {
    return findRandomHost(party);
  } else if (findHostType.type == 'choose') {
    return findChooseHost(party, findHostType.memberId);
  }
}

function findClosestHost(party: Party & { members: User[] }) {
  for (const user of party.members) {
    console.log(user);
  }
}

function findRandomHost(party: Party & { members: User[] }) {
  const randomIndex = Math.floor(Math.random() * party.members.length);
  return party.members[randomIndex];
}

function findChooseHost(party: Party & { members: User[] }, memberId: string) {
  return party.members.find((user) => user.id === memberId);
}
