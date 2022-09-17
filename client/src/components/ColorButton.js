import styled from "styled-components";

const ColorButton = ({ color = "purple", textColor = "white", type = "button", func = () => { return null }, text, width = "100%", height = "6rem" }) => {
    const Button = styled.button`
    background-color: ${color};
    color: ${textColor};
    height: ${height};
    width: ${width};
    margin: .5rem;
    cursor: pointer;
    border-radius: 5px;
    font-weight: bold;
    font-size: large;
    border: 0;
    box-shadow: 1px 2px 5px 1px rgba(0,0,0,0.3);
    transition: all .2s;
    text-rendering: optimizeLegibility;
    user-select: none;

&:hover{
    transform: translateZ(0) scale(1.04);
}
&:active{
    transform: translateZ(0) scale(.97);
}
    `;

    return (
        <Button type={type} onClick={() => { func() }}>
            {text}
        </Button>
    );
};


export default ColorButton;