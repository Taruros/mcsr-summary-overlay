import { useState, useEffect } from "react";
import Match from "./components/Match";

function getRankName(eloRate) {
  if (eloRate < 400) return "Coal I";
  if (eloRate < 500) return "Coal II";
  if (eloRate < 600) return "Coal III";
  if (eloRate < 700) return "Iron I";
  if (eloRate < 800) return "Iron II";
  if (eloRate < 900) return "Iron III";
  if (eloRate < 1000) return "Gold I";
  if (eloRate < 1100) return "Gold II";
  if (eloRate < 1200) return "Gold III";
  if (eloRate < 1300) return "Emerald I";
  if (eloRate < 1400) return "Emerald II";
  if (eloRate < 1500) return "Emerald III";
  if (eloRate < 1650) return "Diamond I";
  if (eloRate < 1800) return "Diamond II";
  if (eloRate < 2000) return "Diamond III";
  return "Netherite";
}

function App() {
  // Extract minecraft name from URL path
  const id = window.location.pathname.split("/").filter(Boolean).pop();

  const [profile, setProfile] = useState({});
  const [matches, setMatches] = useState([]);

  const fetchProfile = async (identifier) => {
    const apiBaseURL = "https://api.mcsrranked.com";
    const endpoint = `${apiBaseURL}/users/${identifier}`;

    try {
      const req = await fetch(endpoint);
      if (!req.ok) throw new Error(`HTTP ${req.status}`);
      const data = await req.json();
      setProfile(data.data);
    } catch (error) {
      console.error(`Failed to fetch profile data for ${identifier}:`, error);
    }
  };

  const fetchMatches = async (identifier, count = 10) => {
    const apiBaseURL = "https://api.mcsrranked.com";
    const endpoint = `${apiBaseURL}/users/${identifier}/matches?count=${count}&type=2`;

    try {
      const req = await fetch(endpoint);
      if (!req.ok) throw new Error(`HTTP ${req.status}`);
      const data = await req.json();
      setMatches(data.data);
    } catch (error) {
      console.error(`Failed to fetch matches for ${identifier}:`, error);
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchProfile(id);
    fetchMatches(id);

    const interval = setInterval(() => {
      fetchMatches(id);
    }, 10000);

    return () => clearInterval(interval);
  }, [id]);

  // useEffect(() => {
  //   // TODO: Effect on new finished match
  // }, [matches]);

  return (
    <div className="summary">
      <div className="profile">
        <img
          src={`https://mc-heads.net/avatar/${profile.nickname}`}
          className="head"
        />
        <div className="profile-text">
          <div className="nickname">{profile.nickname}</div>
          <span className="rank">
            {getRankName(profile.eloRate)} #{profile.eloRank} ({profile.eloRate}{" "}
            elo)
          </span>
        </div>
      </div>
      <div className="matches">
        {/* <span className="matches -text">Last 10 matches</span> */}
        <div className="results">
          {matches.toReversed().map((match) => (
            <Match key={match.id} match={match} profile={profile} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
