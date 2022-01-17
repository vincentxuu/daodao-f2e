import React, { useMemo } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { Skeleton } from "@mui/material";
import { css } from "@emotion/react";
import Link from "next/link";
import Chip from "@mui/material/Chip";
import { COLOR_TABLE } from "../../../../../constants/notion";

const TagsWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

// const TagItemWrapper = styled.li`
//   color: black;
//   border-radius: 15px;
//   padding: 2px 10px;
//   margin: 0 5px;
//   white-space: nowrap;
//   cursor: pointer;
//   ${({ color }) => css`
//     background-color: ${COLOR_TABLE[color ?? "default"]};
//   `}
// `;

const Tags = ({ tags }) => {
  return (
    <TagsWrapper>
      {tags.map(({ name, color }) => (
        <Link key={name} href={`/search?tag=${name}`}>
          <li>
            <Chip
              label={name}
              sx={{
                backgroundColor: COLOR_TABLE[color ?? "default"],
                cursor: "pointer",
                margin: "5px",
                whiteSpace: "nowrap",
                fontWeight: 500,
                fontSize: "14px",
              }}
            />
          </li>
          {/* <TagItemWrapper color={color}>{name}</TagItemWrapper> */}
        </Link>
      ))}
    </TagsWrapper>
  );
};

export default Tags;