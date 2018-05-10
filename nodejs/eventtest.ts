import * as events from "events";

const eventEmitter = new events.EventEmitter();

eventEmitter.on("connection", () =>
{
  console.log("connection successful");
  eventEmitter.emit("data_received");
});

eventEmitter.on("data_received", () =>
{
  console.log("data recieved successfully");
});

eventEmitter.emit("connection");
console.log("Program Ended");
