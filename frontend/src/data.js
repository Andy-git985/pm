export const notes = [
  {
    id: 'note1',
    title: 'Run',
    description: 'One mile a day',
    folder: 'Goals',
    user: 'user1',
    date: '12/01/2022',
    access: [],
    edits: [
      { date: '01/02/2023', user: 'user1' },
      { date: '01/03/2023', user: 'user1' },
    ],
  },
  {
    id: 'note2',
    title: 'Diet',
    description: 'Salad for lunch everyday',
    folder: 'Goals',
    user: 'user2',
    date: '01/02/2023',
    access: [],
  },
  {
    id: 'note3',
    title: 'Drinking',
    description: 'Drink less',
    folder: 'Goals',
    user: 'user1',
    date: '01/01/2023',
    access: ['user2'],
  },
];

export const users = [
  {
    id: '1',
    name: 'user1',
    notes: ['note1', 'note3'],
  },
  { id: '2', name: 'user2', notes: ['note2', 'note3'] },
];
