import React from "react";
import { 
  ContainerC, 
  Description, 
  Titles, 
  ListOl,
  ListLi,
  LabelContainer,
} from "./style";

const Rules = () => {
  return (
    <ContainerC Margin="1rem">
      <Titles FontSize="2rem" Color="#e6b313"
>Planning Poker</Titles>
      <Description>
        Agile teams use planning poker to estimate the amount of effort needed
        to complete a user story.
      </Description>
      <Titles FontSize="1.5rem" Color="#e6b313">How to play?</Titles>
      <ListOl className="rule-list">
        <ListLi>Select the number of players</ListLi>
        <ListLi>Vote for each user story</ListLi>
        <LabelContainer>
          Once the team finishes analyzing a user story, each player choose one
          card that corresponds to the amount of effort or story points they
          consider.
        </LabelContainer>
        <ListLi>Reach a consensus</ListLi>
        <LabelContainer>
          If the team members have different opinions on their initial
          estimates, the team member with the highest estimate and the team
          member with the lowest estimate should take some time to discuss why
          they chose that specific number. Once the discussion is over, everyone
          selects their cards again. This process is repeated until the team
          reaches a consensus.
        </LabelContainer>
      </ListOl>
    </ContainerC>
  );
};

export default Rules;
