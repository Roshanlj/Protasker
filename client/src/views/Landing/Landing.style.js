import styled from 'styled-components';
import { color, padding } from '../../shared/utils/styles';
import { media } from '../../shared/utils/global';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  min-height: 600px;

  ${media.medium2`
    min-height: auto;
  `}
`;

export const Left = styled.div`
  width: 50%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 5%;

  ${media.medium2`
    width: 100%;
    padding: 0;
  `}
`;

export const Right = styled.div`
  width: 50%;
  height: 100%;
  background-color: ${color.blue}; /* Set background color to blue */
  color: ${color.white}; /* Set text color to white */
  display: flex;
  flex-direction: column;
  padding: 0 5%;
`;

export const FormContainer = styled.div`
  margin-bottom: 4%;
`;

export const Logo = styled.p`
  margin-top: 6%;
  margin-bottom: 8%;
  display: flex;
  align-items: center;
  justify-content: center;

  & > img {
    margin-right: 2%;
    width: 4.5%; /* Adjust width as needed */
    height: auto; /* Maintain aspect ratio */
  }

  & > span {
    font-weight: 700;
    font-size: 2.2vw;
    color: ${color.blue}; /* Set text color to white */
  }

  ${media.medium2`
    margin-top: 3%;
    margin-bottom: 3%;
  `}
`;

export const Options = styled.div`
  width: 100%;
  border-bottom: 1px solid transparent;
  border-top: 0.2vw solid ${color.smokewhite};
`;

export const Image = styled.div`
  height: 40%;
  
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const Bottom = styled.div`
  height: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Headings = styled.div`
  max-width: 60vw;
  text-align: center;
  padding: 0 2%;
`;

export const MainHeading = styled.p`
  font-size: 3.4vw;
  font-weight: 600;
  line-height: 1.6;
  color: ${color.white};
  margin-bottom: 1.4%;

  @media (max-width: 1100px) {
    font-size: 2.8vw;
  }
`;

export const SubHeading = styled.p`
  font-size: 1.8vw;
  font-weight: 500;
  color: ${color.black};

  @media (max-width: 1100px) {
    font-size: 1.6vw;
  }
`;

export const SubmitButton = styled.input`
  display: inline-block;
  background: ${color.primary};
  line-height: 1;
  padding: 1.5% 3%;
  border: 0;
  text-align: center;
  cursor: pointer;
  font-weight: 400;
  color: ${color.white};
  border-radius: 5px;
  width: 100%;
  box-shadow: 0 0.5vw #00279e;
  top: 0;

  &:active {
    position: relative;
    outline: none;
    top: 0.5vw;
    box-shadow: none;
  }
`;
