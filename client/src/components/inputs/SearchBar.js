import { AiOutlineSearch } from "react-icons/ai";
import styled from "styled-components";

const SearchBar = () => {
    return (
        <SearchBarWrapper>
            <Search>
                <AiOutlineSearch fill="#A691DB" size={45} />
                <Input type="text" placeholder="Search..." onChange={()=>{return}}/>            </Search>
        </SearchBarWrapper>
    );
};

const Input = styled.input`
  border: 0;
  width: 0%;
  height: 95%;
  transition: width 0.5s ease-in-out;
  :focus {
    outline: none;
  }

  &::placeholder{
    color: #A691DB;
  }
`;

const SearchBarWrapper = styled.span`
  display: flex;
  justify-content: flex-end;
  width: 600px;
  margin-right: 1rem;
`;

const Search = styled.span`
cursor: pointer;
  display: flex;
  align-items: center;
  border-bottom: solid 2px #A691DB;
  width: 50px;
  height: 50%;
  transition: width 0.5s ease-in-out;

  &:hover {
    width: 400px;
    ${Input} {
      width: 400px;
    }
  }

  :focus-within {
    border-bottom: solid 2px purple;
    width: 400px;
    ${Input} {
      width: 400px;
    }
  }
`;

export default SearchBar;
