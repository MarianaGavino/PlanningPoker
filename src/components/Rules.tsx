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
      <Titles FontSize="2rem" Color="#e6b313">
        Planning Poker
      </Titles>
      <Description>
        Agile teams use planning poker to estimate the amount of effort needed
        to complete a user story.
      </Description>
      <Titles FontSize="1.5rem" Color="#e6b313">
        How to play?
      </Titles>
      <ListOl className="rule-list">
        <ListLi>Click on "New" to create a new game</ListLi>
        <LabelContainer>
          Once created, the game ID will appear above "New Game"
        </LabelContainer>
        <ListLi>Join a Game</ListLi>
        <LabelContainer>
          For other players to join your game, you'll need to share the game ID
          with them. They should put it where it says "put here game id" and
          then click on "Join."{" "}
        </LabelContainer>
        <ListLi>Choose a Card</ListLi>
        <LabelContainer>
          Once all players are in, they should select a card, and it will
          automatically go to the board.
        </LabelContainer>
        <ListLi>Reveal the cards</ListLi>
        <LabelContainer>
          After all players have chosen their cards, click on "Reveal" to see
          all the cards. Determine if everyone reached the same estimation or if
          further discussion is needed.
        </LabelContainer>
        <ListLi>Reach a consensus</ListLi>
        <LabelContainer>
          If the team members have different opinions on their initial
          estimates, the team member with the highest estimate and the team
          member with the lowest estimate should take some time to discuss why
          they chose that specific number.
        </LabelContainer>
      </ListOl>
    </ContainerC>
  );
};

export default Rules;
