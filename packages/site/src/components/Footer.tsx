import styled, { useTheme, DefaultTheme } from 'styled-components';
import { ReactComponent as MetaMaskFox } from '../assets/metamask_fox.svg';
import { MetaMask } from './MetaMask';
import { PoweredBy } from './PoweredBy';

const FooterWrapper = styled.footer`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: 2.4rem;
  padding-bottom: 2.4rem;
  border-top: 1px solid ${(props) => props.theme.colors.border.default};
`;

const PoweredByButton = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 1.2rem;
  border-radius: ${({ theme }) => theme.radii.button};
  box-shadow: ${({ theme }) => theme.shadows.button};
  background-color: ${({ theme }) => theme.colors.background.alternative};
`;

const PoweredByContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`;

export const Footer = () => {
  const theme: DefaultTheme = useTheme();
  console.log('theme: ', theme);
  console.log('theme.colors: ', theme.colors);
  console.log('theme.colors.text: ', theme.colors.text);
  console.log('theme.colors.text.muted: ', theme.colors.text.muted);

  return (
    <FooterWrapper>
      <PoweredByButton href="https://docs.metamask.io/" target="_blank">
        {/* <MetaMaskFox /> */}
        <PoweredByContainer>
          <PoweredBy color={theme.colors.text.muted} /> {/* here */}
          <MetaMask color={theme.colors.text.default} />
        </PoweredByContainer>
      </PoweredByButton>
    </FooterWrapper>
  );
};
