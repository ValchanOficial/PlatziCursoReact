import fakeMatchUpdates from './fake-match-updates';

const toIsoString = d => d.toISOString().split('T')[0];

const createFakeResponse = response =>
  new Promise(res => {
    const delay = Math.floor(Math.random() * (400 - 50)) + 50;
    setTimeout(() => res(response), delay);
  });

const headers = new Headers({
  'X-Auth-Token': process.env.REACT_APP_API_KEY
});

const getJson = async url => {
  const response = await fetch(url, {
    method: 'GET',
    headers
  });
  return await response.json();
};

const BASE_URL = 'https://api.football-data.org/v2';

export const getLeagueTable = async id =>
  getJson(`${BASE_URL}/competitions/${id}/standings`);

const getMatches = async (competitionId, dateStart, dateEnd) => {
  return getJson(
    `${BASE_URL}/competitions/${competitionId}/matches?dateFrom=${dateStart}&dateTo=${dateEnd}`
  );
};

export const getPreviousMatches = async id => {
  const now = new Date();
  const firstDayOfTheYear = toIsoString(new Date(now.getFullYear(), 0, 1));
  const today = toIsoString(now);
  return getMatches(id, firstDayOfTheYear, today);
};

export const getTodaysMatches = async id => {
  const today = toIsoString(new Date());
  return getMatches(id, today, today);
};

export const getNextMatches = async id => {
  const now = new Date();
  now.setFullYear(2019);
  const until = new Date();
  until.setDate(now.getDate() + 21);
  return getMatches(id, toIsoString(now), toIsoString(until));
};

export const getMatch = id =>
  createFakeResponse({
    id,
    date: '2018-06-03T16:00:00',
    homeTeamName: 'Espanha',
    awayTeamName: 'Suíça'
  });

export const subscribeToMatch = cb => {
  let stop = false;
  const fakeSeconds = 2;
  fakeMatchUpdates.forEach((update, index) =>
    setTimeout(() => !stop && cb(update), index * 1000 * fakeSeconds)
  );
  return () => {
    stop = true;
  };
};
