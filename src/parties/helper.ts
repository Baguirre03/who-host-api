import { Party, User } from '@prisma/client';

export interface findHostTypes {
  type: 'CLOSEST' | 'RANDOM' | 'CHOOSE';
  memberId?: string;
}

export default function findHost(
  party: Party & { members: User[] },
  findHostType: findHostTypes,
) {
  if (findHostType.type == 'CLOSEST') {
    return findClosestHost(party);
  } else if (findHostType.type == 'RANDOM') {
    return findRandomHost(party);
  } else if (findHostType.type == 'CHOOSE') {
    return findChooseHost(party, findHostType.memberId);
  }
}

function distance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  return Math.sqrt(Math.pow(lat2 - lat1, 2) + Math.pow(lon2 - lon1, 2));
}

function findClosestHost(party: Party & { members: User[] }) {
  let mp = new Map<User, Array<number>>();
  for (let i = 0; i < party.members.length; i++) {
    let curUser = party.members[i];
    for (let j = 0; j < party.members.length; j++) {
      if (i == j) continue;
      let curDistance = distance(
        curUser.lattitude,
        curUser.longitude,
        party.members[j].lattitude,
        party.members[j].longitude,
      );
      mp.has(curUser)
        ? mp.get(curUser).push(curDistance)
        : mp.set(curUser, [curDistance]);
    }
  }
  let bestUser: User = party.members[0];
  let bestDistance = Infinity;
  for (let [user, distances] of mp.entries()) {
    let sum = Math.round(
      distances.reduce((a, b) => a + b, 0) / distances.length,
    );
    if (sum < bestDistance) {
      bestUser = user;
      bestDistance = sum;
    }
  }

  console.log(mp);
  return bestUser;
}

function findRandomHost(party: Party & { members: User[] }) {
  const randomIndex = Math.floor(Math.random() * party.members.length);
  return party.members[randomIndex];
}

function findChooseHost(party: Party & { members: User[] }, memberId: string) {
  return party.members.find((user) => user.id === memberId);
}
