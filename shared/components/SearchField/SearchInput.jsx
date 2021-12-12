import React, { useState } from "react";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import styled from "@emotion/styled";

const SearchInputWrapper = styled(Paper)`
  height: 35px;
  min-width: 500px;
  width: 100%;
  position: relative;
  border-radius: 10px;
  border: #ffefef solid 1px;
  background-color: transparent;
`;

const SearchButtonWrapper = styled(IconButton)`
  position: absolute;
  overflow: hidden;
  color: white;
  border-radius: 10px;
  height: 100%;
  left: 0;
  &:hover {
    background-color: #007bbb;
  }
`;

const SearchInput = () => {
  // eslint-disable-next-line no-unused-vars
  const [word, setWord] = useState("");
  return (
    <SearchInputWrapper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 400,
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="今晚，要不要來點＿＿的學習資源？"
        inputProps={{ "aria-label": "search google maps" }}
        onChange={(event) => setWord(event.target.value)}
        style={{
          color: "white",
          fontWeight: "500",
          paddingLeft: "30px",
        }}
      />
      <SearchButtonWrapper type="submit" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </SearchButtonWrapper>
    </SearchInputWrapper>
  );
};

export default SearchInput;
