import React from 'react';
import styled from 'styled-components';

const Header = styled.h1`
  font-family: italic;
`;

const GreenHeader = styled(Header)`
  color: green;
`;

const LightBlueHeader = styled(Header)`
  color: #add8e6;
`;

function Title({ title }) {
  return <GreenHeader>{title}</GreenHeader>;
}

export function GreenTitle({ title }) {
  return <GreenHeader>{title}</GreenHeader>;
}

export function LightBlueTitle({ title }) {
  return <LightBlueHeader>{title}</LightBlueHeader>;
}

export default Title;
