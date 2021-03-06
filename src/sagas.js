import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { createRootReducer } from 'reducers';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import { appInit } from 'components/App/AppSagas';
import { loginInit } from 'components/LoginPage/LoginPageSagas';
import { logoutButtonInit } from 'components/LogoutButton/LogoutButtonSagas';
import { noteDetailsInit } from 'components/NoteDetails/NoteDetailsSagas';
import { notesContentEditorInit } from 'components/NotesContentEditor/NotesContentEditorSagas';
import { noteMindMapInit } from 'components/NotesMindMap/NotesMindMapSagas';
import { notesInit } from 'components/NotesPage/NotesPageSagas';
import { searchPageInit } from 'components/SearchPage/SearchPageSagas';
import { spinnerInit } from 'components/Spinner/SpinnerSagas';
import { uploadsInit } from 'components/Uploads/UploadsSagas';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = composeWithDevTools({
  serialize: {
    replacer: (__, value) => {
      if (value instanceof File) {
        // we want to see files in the redux-dev-tools
        return {
          filename: value.name,
          uploadFolderId: value.uploadFolderId,
        };
      }

      return value;
    },
  },
});

export const history = createBrowserHistory();

const configureStore = preloadedState => {
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composeEnhancers(
      applyMiddleware(sagaMiddleware),
      applyMiddleware(routerMiddleware(history)),
    ),
  );

  return store;
};

export const store = configureStore();

sagaMiddleware.run(rootSaga);

export const action = (type, data = null) => store.dispatch({ type, data });

export function* rootSaga() {
  yield all([
    appInit(),
    spinnerInit(),
    loginInit(),
    logoutButtonInit(),
    notesInit(),
    noteMindMapInit(),
    notesContentEditorInit(),
    uploadsInit(),
    noteDetailsInit(),
    searchPageInit(),
  ]);
}
