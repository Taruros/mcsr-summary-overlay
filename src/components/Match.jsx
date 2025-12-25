const Match = ({ match, profile }) => {
  const change = match.changes.find(
    (change) => change.uuid === profile.uuid
  ).change;
  return (
    <div
      className={`result ${
        match.result.uuid === profile.uuid
          ? "win"
          : match.result.uuid
          ? "loss"
          : "draw"
      }`}
    >
      {change > 0 ? `+${change}` : change}
    </div>
  );
};

export default Match;
