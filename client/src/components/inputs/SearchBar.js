import { AiOutlineSearch } from "react-icons/ai";
import styled from "styled-components";

const SearchBar = () => {
  return (
    <SearchBarWrapper>
      <Search>
        <AiOutlineSearch fill="#A691DB" size={45} />
        <Input
          type="text"
          placeholder="Search..."
          onChange={() => {
            return;
          }}
        />
      </Search>
    </SearchBarWrapper>
  );
};

const Input = styled.input`
  border: 0;
  width: 0%;
  height: 95%;
  transition: width 0.5s ease-in-out;
  background-color: transparent;
  :focus {
    outline: none;
  }

  &::placeholder {
    color: #a691db;
  }
`;

const SearchBarWrapper = styled.span`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 600px;
  height: 100%;
  margin-right: 1rem;
`;

const Search = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
  border-bottom: solid 2px #a691db;
  width: 50px;
  height: 70%;
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
