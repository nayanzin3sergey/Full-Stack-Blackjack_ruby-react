import { connect } from 'react-redux';
import Game from '../components/game';

const mapStateToProps = (state) => ({
  game: state.currentGame,
  users: state.currentGame.users,
  isJoined: state.currentGame.users ?
    !!(state.currentGame.users[state.currentUser.id]) :
    false
});

const mapDispatchToProps =  ({

});

const VisibleGame = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);

export default VisibleGame;
