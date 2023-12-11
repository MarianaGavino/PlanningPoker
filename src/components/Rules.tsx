import React from "react";
import "./Rules.css";

const Rules = () => {
  return (
    <div className="rules-container">
      <label className="title">Planning Poker</label>
      <label className="description">
        Agile teams use planning poker to estimate the amount of effort needed
        to complete a user story.
      </label>
      <label className="subtitle">How to play?</label>
      <ol className="rule-list">
        <li>Select the number of players</li>
        <li>Vote for each user story</li>
        <label className="explanation">
          Once the team finishes analyzing a user story, each player choose one
          card that corresponds to the amount of effort or story points they
          consider.
        </label>
        <li>Reach a consensus</li>
        <label className="explanation">
          If the team members have different opinions on their initial
          estimates, the team member with the highest estimate and the team
          member with the lowest estimate should take some time to discuss why
          they chose that specific number. Once the discussion is over, everyone
          selects their cards again. This process is repeated until the team
          reaches a consensus.
        </label>
      </ol>
    </div>
  );
};

export default Rules;
