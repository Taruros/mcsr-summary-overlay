const Match = ({ match, profile }) => {
  const changeObj = match.changes?.find((x) => x.uuid === profile.uuid);
  const change = changeObj?.change ?? 0;

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
