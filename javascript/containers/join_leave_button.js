import React from 'react';
import { connect } from 'react-redux';
import { joinGame, leaveGame } from '../actions';

let JoinLeaveButton = ({ userId, gameId, isJoined, onClickJoin, onClickLeave }) => {
  return (
    isJoined ?
      <button type="submit" onClick={() => onClickLeave({ userId: userId, gameId: gameId })}>
        Leave Game
      </button> :
      <button type="submit" onClick={() => onClickJoin({ userId: userId, gameId: gameId })}>
        Join Game
      </button>
  );
};

const mapStateToProps = (state, ownProps) => ({
  userId: state.currentUser.id,
  gameId: state.currentGame.id,
  isJoined: state.currentGame.users ?
    !!(state.currentGame.users.find((el) => el.id === state.currentUser.id)) :
    false
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClickJoin: (data) => {
    joinGame(data, dispatch);
  },
  onClickLeave: (data) => {
    leaveGame(data, dispatch);
  }
});

JoinLeaveButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(JoinLeaveButton);

export default JoinLeaveButton;