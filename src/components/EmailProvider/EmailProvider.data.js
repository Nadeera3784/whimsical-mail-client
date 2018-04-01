// @flow
import React, { Fragment } from 'react';
import { generators, createMany } from 'sharkhorse';

import { sample } from '../../utils';

import avatar1 from '../../assets/avatars/avatar-1.jpg';
import avatar2 from '../../assets/avatars/avatar-2.jpg';
import avatar3 from '../../assets/avatars/avatar-3.jpg';
import avatar4 from '../../assets/avatars/avatar-4.jpg';
import avatar5 from '../../assets/avatars/avatar-5.jpg';
import avatar6 from '../../assets/avatars/avatar-6.jpg';
import avatar7 from '../../assets/avatars/avatar-7.jpg';
import avatar8 from '../../assets/avatars/avatar-8.jpg';
import avatar9 from '../../assets/avatars/avatar-9.jpg';
import avatar10 from '../../assets/avatars/avatar-10.jpg';
import avatar11 from '../../assets/avatars/avatar-11.jpg';
import avatar12 from '../../assets/avatars/avatar-12.jpg';
import avatar13 from '../../assets/avatars/avatar-13.jpg';
import avatar14 from '../../assets/avatars/avatar-14.jpg';
import avatar15 from '../../assets/avatars/avatar-15.jpg';
import avatar16 from '../../assets/avatars/avatar-16.jpg';

import type { EmailData } from '../../types';

const avatarSrcs = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7,
  avatar8,
  avatar9,
  avatar10,
  avatar11,
  avatar12,
  avatar13,
  avatar14,
  avatar15,
  avatar16,
];

const subjects = [
  'RE: Plans next Saturday?',
  'JS Fatigue Fatigue Fatigue',
  'OMG did you hear what Trump said',
  'Eggcelent Egg Salad recipe, dont share...',
  'FWD: forward this to at least 5 people or your house will burn to the ground',
];

const previews = [
  "Hi Marcy, are we still on for that pool party on Saturday? I know John's already got his swimming trunks on.",
  "I'm getting sick and tired about people saying that they're sick and tired of people talking about JS fatigue. JS fatigue³.",
  'Lunatic tweeted some more horse shit.',
  "Ok Tom, I'm warning you: This Egg Salad recipe will BLOW. YOUR. MIND!! It's a family secret so please NO SOCIAL MEDIA",
  'so most chain letters are nonsense but this one is the REAL DEAL. FORWARD or BAD FIRE will happen to your HOME.',
];

const EmailFactory = {
  id: generators.sequence(),
  from: {
    firstName: generators.name().first(),
    lastName: generators.name().last(),
    email: generators.email(),
  },

  body: generators.lorem().paragraphs(6),
};

const BOXES = ['inbox', 'outbox', 'drafts'];

export const generateData = (num: number): Map<number, EmailData> => {
  let time = new Date();

  const data = createMany(EmailFactory, num).map((data, i) => {
    const subject = subjects[i % subjects.length];
    const preview = previews[i % previews.length];
    const avatarSrc = avatarSrcs[i % avatarSrcs.length];

    time -= Math.random() * 10000000;

    return {
      id: data.id,
      box: BOXES[i % 3],
      from: {
        email: data.from.email,
        name: `${data.from.firstName} ${data.from.lastName}`,
        avatarSrc,
      },
      timestamp: time,
      subject,
      preview,
      body: data.body,
    };
  });

  // Sharkhorse's factories return an array, but I'd like to keep my data in a
  // map, to simulate a database. Map constructors take an array of tuples,
  // with the ID and the item: [ [1, email1], [2, email2], ...]
  return new Map(data.map(item => [item.id, item]));
};
