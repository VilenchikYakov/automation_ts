import * as winston from 'winston';
import * as chalk from 'chalk';
import { params } from '../configs/config';
const reportPortal = require('wdio-reportportal-reporter');

function colorize(info) {
  switch (info.level) {
    case 'error':
      return `${info.timestamp}-${info.level}: ${chalk.rgb(255, 136, 0).bold(info['0'])}: ${chalk.red(info.message)}`;
    case 'warn':
      return `${info.timestamp}-${info.level}: ${chalk.rgb(255, 136, 0).bold(info['0'])}: ${chalk.yellow(
        info.message,
      )}`;
    case 'info':
      return `${info.timestamp}-${info.level}: ${chalk.rgb(255, 136, 0).bold(info['0'])}: ${chalk.green(info.message)}`;
    case 'debug':
      return `${info.timestamp}-${info.level}: ${chalk.rgb(255, 136, 0).bold(info['0'])}: ${chalk.cyan(info.message)}`;
  }
}

/**
 *
 * @param message : string
 * @param level - enum LEVEL {
    ERROR = 'error',
    TRACE = 'trace',
    DEBUG = 'debug',
    INFO = 'info',
    WARN = 'warn',
    EMPTY = ''
 */
function sentToReportPortal(message: string, level = 'info') {
  global.test ? reportPortal.sendLogToTest(global.test, level, message) : reportPortal.sendLog(level, message);
}
export const logger: winston.Logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY.MM.DD_HH:mm:ss' }),
    winston.format.printf((info) => `${info.timestamp}-${info.level}: ${info['0']}: ${info.message}`),
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY.MM.DD_HH:mm:ss' }),
        winston.format.printf((info) => colorize(info)),
      ),
      level: params.logLevel,
    }),
    new winston.transports.File({
      filename: `src/integration/logs/${params.suite}.log`,
      options: { flags: 'w' },
      level: params.logLevel,
    }),
  ],
});

function log(logLevel: string, message: string, methodName?: string) {
  methodName = methodName ? methodName : getMethod(logLevel);
  const loggedMessage = logLevel === 'error' ? `${message} - URL: ${browser?.getUrl()}` : message;
  logger.log(logLevel, loggedMessage, [methodName]);
  sentToReportPortal(`${methodName}: ${loggedMessage}`, logLevel);
  return message;
}

export function debug(message: string, methodName?: string) {
  return log('debug', message, methodName);
}

export function info(message: string, methodName?: string) {
  return log('info', message, methodName);
}

export function warn(message: string, methodName?: string) {
  return log('warn', message, methodName);
}

export function error(message: string, methodName?: string) {
  return log('error', message, methodName);
}

function getMethod(logLevel?: string) {
  const errorStack = new Error().stack;
  const functionLine = errorStack.split('\n')[
    errorStack
      .split('\n')
      .findIndex((row) => row.includes(errorStack.includes('Expectation.') ? 'Expectation.' : `Object.${logLevel}`)) + 1
  ];

  const lineRegEx = functionLine
    ? functionLine
        .split('/')
        .pop()
        .slice(0, -1)
    : errorStack.split('\n').pop();
  const functionRegEx = /at \w+\.(\w+)/.exec(functionLine) || /at (\w+)/.exec(functionLine);
  return `${lineRegEx} -> ${
    Array.isArray(functionRegEx) && functionRegEx.length ? functionRegEx[0].substring(3) : 'function'
  }`;
}
