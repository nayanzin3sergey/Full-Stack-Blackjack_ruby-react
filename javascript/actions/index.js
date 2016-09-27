const receiveGame = (game) => ({
  type: 'RECEIVE_GAME',
  game: game
});

const receiveAllGames = (games) => ({
  type: 'RECEIVE_ALL_GAMES',
  games: games
});

const updateCurrentUser = (user) => ({
  type: 'UPDATE_CURRENT_USER',
  user: user
});


export function fetchGame (id, dispatch) {
  $.ajax({
    method: "GET",
    url: `api/games/${id}`,
    success: (resp) => {
      dispatch(receiveGame(resp));
    }
  });
}

export function fetchAllGames (dispatch) {
  $.ajax({
    method: "GET",
    url: `api/games/`,
    success: (resp) => {
      console.log(resp);
      dispatch(receiveAllGames(resp));
    }
  });
}

export function createGame (dispatch) {
  $.ajax({
    method: "POST",
    url: `api/games`,
    success: (resp) => {
      dispatch(receiveGame(resp));
    }
  });
}

export function startGame (id, dispatch) {
  $.ajax({
    method: "PATCH",
    url: `api/games/${id}`,
    data: {game: {game_action: 'start'}},
    success: (resp) => {
      console.log(resp);
      dispatch(receiveGame(resp));
    }
  });
}

export function createUser (data, dispatch) {
  $.ajax({
    method: "POST",
    url: "api/users",
    data: {user: {username: data.username, password: data.password}},
    success (resp) {
      dispatch(updateCurrentUser(resp));
    },
    error (resp) {
      errorCallback(resp.responseJSON, form);
    }
  });
}

export function joinGame (data, dispatch) {
  $.ajax({
    method: "PATCH",
    url: `api/users/${data.userId}`,
    data: {user: { game_id: data.gameId, action_type: 'join' }},
    success (resp) {
      dispatch(updateCurrentUser(resp));
      fetchGame(data.gameId, dispatch);
    }
  });
}

export function leaveGame (data, dispatch) {
  $.ajax({
    method: "PATCH",
    url: `api/users/${data.userId}`,
    data: {user: { game_id: data.gameId, action_type: 'leave' }},
    success (resp) {
      dispatch(updateCurrentUser(resp));
      fetchGame(data.gameId, dispatch);
    }
  });
}

export function logInUser (data, dispatch) {
  $.ajax({
    method: "POST",
    url: `api/session`,
    data: {user: {username: data.username, password: data.password}},
    success: (resp) => {
      console.log(resp);
      dispatch(updateCurrentUser(resp));
    }
  });
}

export function logOutUser (dispatch) {
  $.ajax({
    method: "DELETE",
    url: `api/session`,
    success: (resp) => {
      console.log(resp);
      dispatch(updateCurrentUser(resp));
    }
  });
}