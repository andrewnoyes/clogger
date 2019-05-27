export enum LogLevel {
    error,
    warn,
    info,
    verbose,
    debug,
    silly,
}

export const getDefaultLogLevelCss = (level: LogLevel): string => {
    switch (level) {
        case LogLevel.error:
            return "color: #d32f2f";
        case LogLevel.warn:
            return "color: #fbc02d";
        default:
            return "";
    }
};

export const getDefaultLogTimestamp = (): string => {
    const now = new Date();
    const mon = now.getMonth() + 1; // January == 0
    const day = now.getDate();
    const hrs = now.getHours();
    const min = now.getMinutes();
    const sec = now.getSeconds();
    const ms = now.getMilliseconds();

    return `${mon}-${day} ${hrs}:${min}:${sec}.${ms}`;
};

export interface ILoggerOptions {
    source?: string;
    minLogLevel?: LogLevel;
    getLogLevelCss?: (level: LogLevel) => string;
    getLogTimestamp?: () => string;
}

// TODO: `console.log` should be defined as a transport

export class Logger {
    private source: string;
    private minLogLevel: LogLevel;
    private getLogLevelCss: (level: LogLevel) => string;
    private getLogTimestamp: () => string;

    public constructor(options: ILoggerOptions = {}) {
        this.source = options.source || "";
        this.minLogLevel = options.minLogLevel || LogLevel.debug;
        this.getLogLevelCss = options.getLogLevelCss || getDefaultLogLevelCss;
        this.getLogTimestamp = options.getLogTimestamp || getDefaultLogTimestamp;
    }

    public log(level: LogLevel, message: string, args?: any[]) {
        if (level > this.minLogLevel) {
            return;
        }

        const time = this.getLogTimestamp();
        const source = !!this.source ? ` [${this.source}] ` : "";
        const logLevel = `[${LogLevel[level].toUpperCase()}]`;

        console.log(`${time}${source} ${logLevel} ${message}`, args || "", this.getLogLevelCss(level));
    }

    public error(message: string, args?: any[]) {
        this.log(LogLevel.error, message, args);
    }

    public warn(message: string, args?: any[]) {
        this.log(LogLevel.warn, message, args);
    }

    public info(message: string, args?: any[]) {
        this.log(LogLevel.info, message, args);
    }

    public debug(message: string, args?: any[]) {
        this.log(LogLevel.debug, message, args);
    }

    public silly(message: string, args?: any[]) {
        this.log(LogLevel.silly, message, args);
    }
}
