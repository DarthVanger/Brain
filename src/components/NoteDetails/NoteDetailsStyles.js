import { colors } from 'colors';
import styled from 'styled-components';

export const DefaultTextarea = styled.textarea`
  background-color: ${colors.darkViolet};
  padding: 0px;
  width: 100%;
  border: none;
  resize: none;
  border-radius: 4px;
  outline: none;
  box-shadow: none;
  font-family: Roboto;
`;

export const StyledNoteNameEditor = styled(DefaultTextarea)`
  text-align: center;
  height: 24px;
  line-height: 24px;
  color: ${colors.white87};
  font-size: 20px;
  overflow: hidden;
  font-weight: 500;
  margin-bottom: 16px;
`;

export const StyledNoteDetailsScreen = styled.div`
  height: 100vh;
  padding: 24px;
  background-color: ${colors.darkViolet};
`;

export const StyledNoteContentEditor = styled(DefaultTextarea)`
  height: 90%;
  line-height: 20px;
  color: ${colors.white60};
  font-size: 14px;
  font-weight: normal;
  letter-spacing: 0.25px;

  padding: 1rem;
`;
