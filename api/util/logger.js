import debug from 'debug';
import { format, createLogger, transports } from 'winston';

const { timestamp, label, prettyPrint, colorize, combine, json, splat, simple } = format;

export const logger = createLogger({
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    label({ label: 'book-a-meal' }),
    splat(),
    simple(),
    colorize()
  ),
  transports: [new transports.Console()]
});

if (process.env.NODE_ENV === 'production') {
  logger.add(new transports.File({ filename: 'error.log', level: 'error' }));
  logger.add(new transports.File({ filename: 'combined.log' }));
  logger.add(
    new transports.Console({
      format: combine(prettyPrint(), json())
    })
  );
}

export const prettyStringify = data => JSON.stringify(data, null, '\t');
