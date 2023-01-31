const folders = ['Personal', 'Work', 'Fitness'];
const priority = ['Low', 'Medium', 'High'];
const progress = [
  { name: 'To do', value: 'todo' },
  { name: 'In progress', value: 'inProgress' },
  { name: 'Done', value: 'done' },
];

const testData = [
  [
    // first
    [
      { id: 1, title: 'Clean dishes', priority: 'Low', progress: 'todo' },
      { id: 2, title: 'Takeout trash', priority: 'Low', progress: 'todo' },
      { id: 3, title: 'Vacuum rug', priority: 'Low', progress: 'todo' },
    ],
    [
      { id: 4, title: 'Exercise', priority: 'Medium', progress: 'todo' },
      { id: 5, title: 'Limit coffee', priority: 'Medium', progresjs: 'todo' },
      {
        id: 6,
        title: 'Drink more water',
        priority: 'Medium',
        progress: 'todo',
      },
      { id: 7, title: 'Cut out sweets', priority: 'Medium', progress: 'todo' },
    ],
    [
      {
        id: 8,
        title: 'Check in with friends once a week',
        priority: 'High',
        progress: 'todo',
      },
      {
        id: 9,
        title: 'Go to a show or museum',
        priority: 'High',
        progress: 'todo',
      },
      {
        id: 10,
        title: 'Stop watch Netflix',
        priority: 'High',
        progress: 'todo',
      },
    ],
  ],
  [
    // in progress
    [
      {
        id: 11,
        title: 'Daily meditation',
        priority: 'Low',
        progress: 'inProgress',
      },
      {
        id: 12,
        title: 'Clean up room',
        priority: 'Low',
        progress: 'inProgress',
      },
    ],
    [
      {
        id: 13,
        title: 'Cook more at home',
        priority: 'Medium',
        progress: 'inProgress',
      },
      {
        id: 14,
        title: 'Limit drinking to social events',
        priority: 'Medium',
        progress: 'inProgress',
      },
      {
        id: 15,
        title: 'Watch less youtube videos',
        priority: 'Medium',
        progress: 'inProgress',
      },
      {
        id: 16,
        title: 'Start job hunt',
        priority: 'Medium',
        progress: 'inProgress',
      },
    ],
    [
      {
        id: 17,
        title: 'Increase 3 point shooting percentage',
        priority: 'High',
        progress: 'inProgress',
      },
      {
        id: 18,
        title: 'Yoga once a week',
        priority: 'High',
        progress: 'inProgress',
      },
    ],
  ],
  [
    // done
    [
      { id: 19, title: 'Run daily', priority: 'Low', progress: 'done' },
      {
        id: 20,
        title: 'Finish reading book',
        priority: 'Low',
        progress: 'done',
      },
      {
        id: 21,
        title: 'Start another book',
        priority: 'Low',
        progress: 'done',
      },
      {
        id: 22,
        title: 'Return library books',
        priority: 'Low',
        progress: 'done',
      },
      {
        id: 23,
        title: 'Start volunteering',
        priority: 'Low',
        progress: 'done',
      },
    ],
    [
      {
        id: 24,
        title: 'Go to that meetup',
        priority: 'Medium',
        progress: 'done',
      },
      { id: 25, title: 'Recycle more', priority: 'Medium', progress: 'done' },
      {
        id: 26,
        title: 'Buy less things',
        priority: 'Medium',
        progress: 'done',
      },
    ],
    [
      {
        id: 27,
        title: 'Fix bathroom leak',
        priority: 'High',
        progress: 'done',
      },
    ],
  ],
];

export default { folders, priority, progress, testData };
