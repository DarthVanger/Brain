import React from 'react';

import PropTypes from 'prop-types';

import {
  StyledButtonContainer,
  StyledHeader,
} from 'components/NoteNameEditor/HeaderComponent/HeaderStyles';

export const HeaderComponent = ({
  onChangeParentClick,
  onDeleteClick,
  isChangeParentModeActive,
}) => (
  <StyledHeader>
    Edit note name
    <StyledButtonContainer>
      <button
        className={`btn ${
          isChangeParentModeActive ? 'btn-success' : 'btn-primary'
        }`}
        onClick={onChangeParentClick}>
        {isChangeParentModeActive ? 'Select new parent' : 'Change parent'}
      </button>
      <button className="btn btn-danger" onClick={onDeleteClick}>
        Delete
      </button>
    </StyledButtonContainer>
  </StyledHeader>
);

HeaderComponent.propTypes = {
  onDeleteClick: PropTypes.func.isRequired,
  onChangeParentClick: PropTypes.func.isRequired,
  isChangeParentModeActive: PropTypes.bool.isRequired,
};
