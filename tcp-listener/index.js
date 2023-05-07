import { TK303Server } from "./servers/tk303Server.js";

const tk303Server = new TK303Server(5000, 3001);

tk303Server.runNet();
