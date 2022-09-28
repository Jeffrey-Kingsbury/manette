import styled from "styled-components";

const ColorButton = ({ color = "purple", textColor = "white", type = "button", func = () => { }, text, width = "100%", height = "6rem", tab = 0, disabled=false}) => {


    return (
        <Button
            type={type}
            onClick={() => { func() }}
            style={{ backgroundColor: disabled ? "lightgray" : color, color: textColor, height: height, width: width }}
            tabIndex={tab}
            disabled={disabled}
        >
            {text}
        </Button>
    );
};

const Button = styled.button`
margin: .5rem;
cursor: ${props => props.disabled ? "default" : "pointer" };
border-radius: 5px;
font-weight: bold;
font-size: large;
border: 0;
box-shadow: 1px 2px 5px 1px rgba(0,0,0,0.3);
transition: all .2s;
text-rendering: optimizeLegibility;
user-select: none;

&:hover{
transform: ${props => props.disabled ? "" : "translateZ(0) scale(1.04)"};
}
&:active{
    transform: ${props => props.disabled ? "" : "translateZ(0) scale(.97)"};
}
`;

export default ColorButton;