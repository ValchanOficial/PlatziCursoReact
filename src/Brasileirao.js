import React from "react";
import "./style/Brasileirao.css";
import {getLeagueTable, getNextMatches} from './api';
import createPersistedState from 'use-persisted-state';

import formatDate from './Util';

const useLocalFavoriteState = createPersistedState('platzi.soccer.favorites');

const Brasileirao = () => {
    const [loading, setLoading] = React.useState(false);
    const [leagueTable, setLeagueTable] = React.useState();
    const [nextMatches, setNextMatches] = React.useState();
    const [favorites, setFavorites] = useLocalFavoriteState([]);

    const handleToggleFavorite = teamName => {
        let newFavorites;
        if(favorites.includes(teamName)) {
            newFavorites = [...favorites.filter(f => f !== teamName)];
        } else {
            newFavorites = [...favorites, teamName];
        }
        setFavorites(newFavorites);
    }

    React.useEffect(() => {
        const leagueId = 2013;
        const load = async () => {
            setLoading(true);
            const promises = [getLeagueTable(leagueId), getNextMatches(leagueId)];
            const [leagueTable, nextMatches] = await Promise.all(promises);
            setLeagueTable(leagueTable.standings[0].table);
            setNextMatches(nextMatches.matches);
            setLoading(false);
        }
        load();
    }, []);

    return (
        <div id="brasileirao">
            {loading && <h1>Carregando</h1> }
            {!loading && leagueTable && (
                <>
                    <h1>Tabela</h1>
                    <div>
                        <table className="stripe-vertical">
                            <thead>
                                <tr>
                                    <th/>
                                    <th/>
                                    <th/>
                                    <th>P</th>
                                    <th>J</th>
                                    <th>V</th>
                                    <th>E</th>
                                    <th>D</th>
                                    <th>GP</th>
                                    <th>GC</th>
                                    <th>SG</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leagueTable.map(r => (
                                    <tr key={r.position}>
                                        <td>
                                            <button onClick={() => handleToggleFavorite(r.team.name)}>
                                                {favorites.includes(r.team.name) ? '-' : '+'}
                                            </button>
                                        </td>
                                        <td>{r.position}</td>
                                        <td>{r.team.name}</td>
                                        <td>{r.points}</td>
                                        <td>{r.playedGames}</td>
                                        <td>{r.won}</td>
                                        <td>{r.draw}</td>
                                        <td>{r.lost}</td>
                                        <td>{r.goalsFor}</td>
                                        <td>{r.goalsAgainst}</td>
                                        <td>{r.goalDifference}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <h1>Próximas partidas</h1>
                    <div>
                        <table className="striped-horizontal">
                            <thead>
                                <tr>
                                    <th/>
                                    <th>Times</th>
                                    <th>Horário</th>
                                </tr>
                            </thead>
                            <tbody>
                                {nextMatches.map(m => (
                                    <tr key={m.id.toString()}>
                                        <td>{
                                            favorites.includes(m.homeTeam.name) 
                                            || favorites.includes(m.awayTeam.name)
                                            ? <span>♥</span> : <span>♡</span>
                                        }</td>
                                        <td>{`${m.homeTeam.name} X ${m.awayTeam.name}`}</td>
                                        <td>{formatDate(m.utcDate)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default Brasileirao;