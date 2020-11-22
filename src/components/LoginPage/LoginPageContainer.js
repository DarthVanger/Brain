import { connect } from 'react-redux';
import { REQUEST_AUTHORIZATION_ACTION } from 'components/LoginPage/LoginPageActions';
import { LoginPageComponent } from 'components/LoginPage/LoginPageComponent';
import { action } from 'sagas';

const mapStateToProps = ({ login: { isGoogleApiInitialized } }) => ({
  isGoogleApiInitialized,
});

const mapDispatchToProps = () => ({
  requestAuthorization() {
    action(REQUEST_AUTHORIZATION_ACTION);
  },
});

export const LoginPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPageComponent);
