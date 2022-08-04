import soldierSchema from '../../schema/soldier-schema.js';
import { createSoldier, findSoldiers, findSoldierById } from '../repository/soldiers.js'

const soldiers = async (app) => {

    app.post('/soldiers', { schema: soldierSchema }, createSoldier);

    app.get('/soldiers', findSoldiers);

    app.get('/soldiers/:id', findSoldierById);
}
  
export default soldiers;
