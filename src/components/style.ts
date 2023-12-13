import styled from "@emotion/styled";
import { 
    IPropsTitles,
    IPropsInput, 
    IPropsLabel,
    IpropsButton,
    IPropsContainerC,
    IPropsBoardContainer,
    IPropsDescription,
    IPropsListOl,
    IPropsListLi,
    IPropsCard,
    IPropsCardDeck,
    IPropsWarningMessage,
    IPropsSelectedCards,
    IPropsLabelReveal,
    IPropsRevealButton,
    IPropsDivContainer,
    IPropsLabelContainer,
} from "./interfacesStyles";

// Rules

export const Titles = styled.label<IPropsTitles> `
    color: ${(props)=>props.Color};
    font-weight: ${(props)=>props.FontWeight};
    font-size: ${(props)=> props.FontSize};
`;
Titles.defaultProps = {
    FontWeight: "bold",
}

export const Description = styled.label<IPropsDescription> `
    display: ${(props)=> props.Display};
    text-align: ${(props)=> props.TextAlign};
    margin-bottom: ${(props)=> props.MarginBottom};
`;
Description.defaultProps = {
    Display: "flex",
    TextAlign: "justify",
    MarginBottom: ".5rem",
}
export const ListOl = styled.ol<IPropsListOl> `
    text-align: ${(props)=> props.TextAlign};
`;
ListOl.defaultProps = {
    TextAlign: "start"
}
export const ListLi = styled.li<IPropsListLi> `
    font-weight: ${(props)=>props.FontWeight};
    marker {
        color: #91c43b;
    }
`;
ListLi.defaultProps = {
    FontWeight: "bold"
}
// Input Users
export const Label = styled.label<IPropsLabel> `
    font-size: ${(props)=> props.FontSize};
    margin-bottom: ${(props)=> props.MarginBottom};
`;
Label.defaultProps = {
    FontSize: "1.7rem",
};

export const Input = styled.input<IPropsInput>`
  height: ${(props) => props.Height};
  width: ${(props) => props.Width};
  font-size: ${(props) => props.FontSize};
  text-align: ${(props) => props.TextAlign};
  border-radius: ${(props) => props.BorderRadius};
  border: ${(props) => props.Border};
  align-self: ${(props) => props.AlignSelf};
  margin-bottom: ${(props) => props.MarginBottom};
`;
Input.defaultProps = {
  Height: "3rem",
  Width: "20rem",
  FontSize: "1.5rem",
  TextAlign: "center",
  BorderRadius: "0.5rem",
  Border: "1.5px solid #6e6f74",
};
export const Button = styled.button<IpropsButton> `
    height: ${(props)=>props.Height};
    width: ${(props)=>props.Widht};
    border: ${(props)=> props.Border};
    border-radius: ${(props)=>props.BorderRadius};
    cursor: ${(props) => props.Cursor};
    background-color: ${(props)=> props.Background};
    color: ${(props)=>props.Color};
    align-self: ${(props)=>props.AlignSelf};
`;
Button.defaultProps = {
    Height: "2rem",
    Border: "1.5px solid #6e6f74",
    BorderRadius: "0.5rem",
    Background: "white",
}
export const ContainerC = styled.div<IPropsContainerC> `
    height: ${(props)=>props.Height};
    display: ${(props)=>props.Display};
    flex-direction: ${(props)=>props.FlexDirection};
    margin: ${(props)=>props.Margin};
`;
ContainerC.defaultProps = {
    Display: "flex",
    FlexDirection: "column",
}

// Board
export const BoardContainer = styled.div<IPropsBoardContainer>`
    background-color: ${(props)=>props.BackgroundC};
    padding-bottom: ${(props)=>props.PaddingB};
    margin: ${(props)=>props.Margin};
    border-radius: ${(props)=>props.BorderRadius};
`;
BoardContainer.defaultProps = {
    BackgroundC: "#e6b1138a",
    PaddingB: "1rem",
    Margin: "1rem",
    BorderRadius: ".5rem",
}
export const SelectedCards = styled.div<IPropsSelectedCards>`
    display: ${(props)=> props.Display};
    justify-content: ${(props)=>props.JustifyContent};
`;
SelectedCards.defaultProps = {
    Display: "flex",
    JustifyContent: "center",
}
export const RevealLabel = styled.label<IPropsLabelReveal>`
    font-size: ${(props)=> props.FontSize};
    margin: ${(props)=> props.Margin};
`;
RevealLabel.defaultProps = {
    FontSize: "1.2rem",
    Margin: ".5rem",
}
export const RevealButton = styled.button<IPropsRevealButton>`
    height: ${(props)=> props.Height};
    width: ${(props)=> props.Width};
    border: ${(props)=> props.Border};
    border-radius: ${(props)=> props.BorderRadius};
    cursor: ${(props)=> props.Cursor};
    background-color: ${(props)=> props.BackgroundColor};
    color: ${(props)=> props.Color};
    align-self: ${(props)=> props.AlignSelf};
`;
RevealButton.defaultProps = {
    Height: "2rem",
    Width: "15rem",
    Border: "0.09rem solid #6e6f74",
    BorderRadius: "0.5rem",
    Cursor: "pointer",
    BackgroundColor: "white",
    Color: "black",
    AlignSelf: "center"
}

// Cards
export const Card = styled.div<IPropsCard> `
    width: ${(props)=> props.Width};
    height: ${(props)=> props.Height};
    border: ${(props)=> props.Border};
    border-radius: ${(props)=> props.BorderRadius};
    padding: ${(props)=> props.Padding};
    margin: ${(props)=> props.Margin};
    text-align: ${(props)=> props.TextAlign};
    font-size: ${(props)=> props.FontSize};
    cursor: ${(props)=> props.Cursor};
    background-color: ${(props)=> props.BackgroundColor};
    box-shadow: ${(props)=> props.BoxShadow};
    color: ${(props)=> props.Color};
    display: ${(props)=> props.Display};
    align-items: ${(props)=> props.AlignItems};
    justify-content: ${(props)=> props.JustifyContent};
    &:hover {
        background-color: ${(props)=> props.Hover}
    }
     
`;
Card.defaultProps = {
    Width: "3.5rem",
    Height: "7rem",
    Border: "2px solid  #91c43b",
    BorderRadius: ".5rem",
    Padding: "1.25rem",
    Margin: "0.62rem",
    TextAlign: "center",
    FontSize: "3rem",
    BoxShadow: "10px 10px 5px 0px rgba(0,0,0,0.16)",
    Color: "#91c43b",
    Display: "flex",
    AlignItems: "center",
    JustifyContent: "center",
}

export const CardDeck = styled.div<IPropsCardDeck> `
    display: ${(props)=> props.Display};
    flex-wrap: ${(props)=> props.FlexWrap};
    margin: ${(props)=> props.Margin};
`;
CardDeck.defaultProps = {
    Display: "flex",
    FlexWrap: "wrap",
    Margin: "1rem",
}
export const WarningMessage = styled.div<IPropsWarningMessage> `
    color: ${(props)=> props.Color};
    font-size: ${(props)=> props.FontSize};
`;
 WarningMessage.defaultProps = {
    Color: "red",
    FontSize: "1.2rem",
 }

// General
export const DivContainer = styled.div<IPropsDivContainer>`
    width: ${(props)=> props.Width};
    height: ${(props)=> props.Height};
    margin: ${(props)=> props.Margin};
`;
export const LabelContainer = styled.label<IPropsLabelContainer>`
    padding: ${(props)=> props.Padding};
`;

