import { createLogger, transports, format } from 'winston';

const logger = createLogger({
  level: 'info',
  format: format.json(),
  transports: new transports.File({ filename: 'errors.log', level: 'error' }),
});

export default logger;
