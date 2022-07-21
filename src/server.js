import app from './app.js';

const port = process.env.PORT || '3000';

const start = async () => {
  try{
    await app.listen({ port });
  } catch(err){
    app.log.error(err);
    process.exit(1);
  }
}

export default start;
