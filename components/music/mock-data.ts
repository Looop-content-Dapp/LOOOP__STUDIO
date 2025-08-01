import { Playlist, Release, Song } from './types';

export const releases: Release[] = [
  {
    id: '1',
    title: 'Sounds from this side',
    type: 'EP',
    releaseDate: '12 December 2024',
    trackCount: 4,
    duration: '22mins',
    totalStreams: '103,748,389',
    imageUrl: 'https://i.pinimg.com/736x/46/e5/24/46e5244c8026d98f69e619ce331704d5.jpg',
  },
  {
    id: '2',
    title: 'By any means',
    type: 'Single',
    releaseDate: '19 November 2024',
    trackCount: 1,
    duration: '03:08',
    totalStreams: '2,732,781',
    imageUrl: 'https://i.pinimg.com/736x/bc/01/df/bc01df8c0e7616e20a6959da992236f6.jpg',
  },
  {
    id: '3',
    title: 'Big Stepper',
    type: 'Album',
    releaseDate: '04 June 2022',
    trackCount: 11,
    duration: '56 mins',
    totalStreams: '83,909,489',
    imageUrl: 'https://i.pinimg.com/736x/87/39/62/8739620311c66e075130147d6eb5eb06.jpg',
  },
  {
    id: '4',
    title: 'Mirror',
    type: 'Single',
    releaseDate: '17 April 2022',
    trackCount: 1,
    duration: '02:58',
    totalStreams: '2,342,748',
    imageUrl: 'https://i.pinimg.com/736x/71/85/27/7185276b3567227571ff2d01f7eff97d.jpg',
  },
  {
    id: '5',
    title: 'My Heart',
    type: 'Single',
    releaseDate: '22 January 2022',
    trackCount: 1,
    duration: '3:16',
    totalStreams: '1,764,327',
    imageUrl: 'https://i.pinimg.com/736x/96/f0/b5/96f0b5b8aea6ad37b6b83db86c193524.jpg',
  },
];

export const songs: Song[] = [
  {
    id: '1',
    title: 'Am I high rn',
    duration: '03:16',
    releaseDate: '12 Dec 24',
    totalStreams: '103,748,389',
    imageUrl: 'https://i.pinimg.com/736x/f0/18/1f/f0181fe76523ccef461dcb12e7719975.jpg',
  },
  {
    id: '2',
    title: 'By any means',
    duration: '03:16',
    releaseDate: '12 Dec 24',
    totalStreams: '103,748,389',
    imageUrl: 'https://i.pinimg.com/736x/e2/70/7b/e2707b67bc3524fe61c616bf4a3821a9.jpg',
  },
  {
    id: '3',
    title: 'Stackin n grindin',
    duration: '03:16',
    releaseDate: '12 Dec 24',
    totalStreams: '103,748,389',
    imageUrl: 'https://i.pinimg.com/736x/16/c5/ca/16c5cab0812d340a9b259f1bd2978307.jpg',
  },
  {
    id: '4',
    title: '8 Cars',
    duration: '03:16',
    releaseDate: '12 Dec 24',
    totalStreams: '103,748,389',
    imageUrl: 'https://i.pinimg.com/736x/78/f4/1e/78f41e5c45bbbf2d2a591b0f5b9fd271.jpg',
  },
  {
    id: '5',
    title: 'Mirror',
    duration: '03:16',
    releaseDate: '12 Dec 24',
    totalStreams: '103,748,389',
    imageUrl: 'https://i.pinimg.com/736x/39/a1/ab/39a1ab587fac93f29d5ea809b330f8f0.jpg',
  },
  {
    id: '6',
    title: 'My Heart',
    duration: '03:16',
    releaseDate: '12 Dec 24',
    totalStreams: '103,748,389',
    imageUrl: 'https://i.pinimg.com/736x/1c/23/15/1c2315412d8d75e9a27193b9aa4fd114.jpg',
  },
];

export const algorithmicPlaylists: Playlist[] = [
  {
    id: '1',
    title: 'Can’t Get Enough',
    songsOnPlaylist: 2,
    listeners: '21,437,382',
    totalStreams: '811,272,860',
    imageUrl: require('@/assets/images/cantgetEnough.jpg'),
  },
  {
    id: '2',
    title: 'The Off Radar',
    songsOnPlaylist: 2,
    listeners: '21,437,382',
    totalStreams: '811,272,860',
    imageUrl: require('@/assets/images/offradar.jpg'),
  },
  {
    id: '3',
    title: 'HipHop Essentials',
    songsOnPlaylist: 2,
    listeners: '21,437,382',
    totalStreams: '811,272,860',
    imageUrl: require('@/assets/images/essential.jpg'),
  },
];

export const listenerPlaylists: Playlist[] = [
  {
    id: '1',
    title: 'Can’t Get Enough',
    songsOnPlaylist: 2,
    listeners: '21,437,382',
    totalStreams: '811,272,860',
    imageUrl: require('@/assets/images/cantgetEnough.jpg'),
  },
  {
    id: '2',
    title: 'The Off Radar',
    songsOnPlaylist: 2,
    listeners: '21,437,382',
    totalStreams: '811,272,860',
    imageUrl: require('@/assets/images/offradar.jpg'),
  },
  {
    id: '3',
    title: 'HipHop Essentials',
    songsOnPlaylist: 2,
    listeners: '21,437,382',
    totalStreams: '811,272,860',
    imageUrl: require('@/assets/images/essential.jpg'),
  },
];
