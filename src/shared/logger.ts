import "colors";

export const successLog = (message: string) => console.log(message.green.bold);
export const errorLog = (message: string) => console.log(message.red.bold);
