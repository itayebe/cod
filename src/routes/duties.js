import dutySchema from '../../schema/duty-schema.js';
import { createDuty, findDuties, findDutyById, deleteDuty, updateDuty, scheduleDuty } from '../repository/duties.js'

const duties = async (app) => {
    
    app.post('/duties', { schema: dutySchema }, createDuty);

    app.get('/duties', findDuties);

    app.get('/duties/:id', findDutyById);

    app.delete('/duties/:id', deleteDuty);
      
    app.patch('/duties/:id', { schema: dutySchema }, updateDuty);

    app.put('/duties/:id/schedule', scheduleDuty);
}
  
export default duties;
