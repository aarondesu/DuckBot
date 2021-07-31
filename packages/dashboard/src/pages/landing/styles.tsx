import { Container, Segment, Image as SImage, Header } from 'semantic-ui-react';
import styled from 'styled-components';

export const LandingPageContainer = styled.div`
  height: 100vh;
  padding: 0;
  margin: 0;
`;

export const LandingSegment = styled(Segment)`
  display: flex;
  flex-direction: column;
  padding: 1em 0em;
  height: 100vh;
`;
export const LandingContent = styled(Container)`
  flex: 1;
  justify-content: center;
  margin-top: 3em;
`;

export const ContentWrapper = styled.div`
  vertical-align: middle;
  position: relative;
  flex: 1;
`;

export const DuckAvatar = styled(SImage)`
  margin-left: auto;
  margin-right: auto;
`;

export const LandingFooter = styled(Segment)`
  span {
    font-size: 12px;
    color: gray;
    cursor: normal;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
`;

export const HeaderLogo = styled(Header)`
  span {
    font-weight: normal;
    font-size: 0.9em;
  }
`;
