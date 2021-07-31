import React, { FC, FormEvent } from 'react';
import { Button, Header, Segment } from 'semantic-ui-react';

import Navbar from '../../components/navbar';

import {
  LandingSegment,
  LandingContent,
  LandingPageContainer,
  ContentWrapper,
  DuckAvatar,
  LandingFooter,
} from './styles';

import { API_AUTH_URL } from '../../constants';

const LandingPage: FC = () => {
  const authenticate = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.location.href = API_AUTH_URL;
  };

  return (
    <>
      <LandingPageContainer>
        <LandingSegment vertical inverted>
          <Navbar />
          <LandingContent text textAlign="center">
            <ContentWrapper>
              <DuckAvatar src="src/assets/duck.jpg" size="medium" circular />
              <Segment inverted>
                <Header as="h1" content="Connect With Duck" />
                <Button
                  content="Login"
                  size="huge"
                  primary
                  onClick={authenticate}
                />
              </Segment>
            </ContentWrapper>
          </LandingContent>
          <LandingFooter text textAlign="center" inverted hidden>
            <span>Shinu &copy; Copyright 2021</span>
          </LandingFooter>
        </LandingSegment>
      </LandingPageContainer>
    </>
  );
};

export default LandingPage;
