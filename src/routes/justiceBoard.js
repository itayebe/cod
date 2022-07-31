import { makeJusticeBoard } from '../repository/justiceBoard.js';

const justiceBoard = async (app) => {
  app.get('/justice-board', makeJusticeBoard);
}

export default justiceBoard;
