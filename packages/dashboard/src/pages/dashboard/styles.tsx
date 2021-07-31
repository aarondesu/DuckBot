/* eslint-disable import/prefer-default-export */
import { Header } from 'semantic-ui-react';
import styled from 'styled-components';

export const DashboardContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const HeaderLogo = styled(Header)`
  span {
    font-weight: normal;
    font-size: 0.9em;
  }
`;
