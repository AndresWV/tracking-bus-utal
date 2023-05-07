import net from 'net';
import {Server} from 'socket.io';
import express from 'express';
import http from 'http';
import TK303Parser from '../util/tk303Parser.js';
import axios from 'axios';

/** GPS servers*/
export class TK303Server {
  // Setups all servers configs
  constructor(tcpPort, socketPort) {
    this.tcpPort = tcpPort;
    this.socketPort = socketPort;
    this.parser = new TK303Parser();
    this.app = express();
    this.app.use('/', (res, req) => {
      req.send('TCP-LISTENER');
    });
    this.server = http.createServer(this.app);
    this.io = new Server(this.server, {
      cors: {
        origin: '*',
      }
    });

    this.server.listen(this.socketPort, () => {
      console.log('Listening on ...' + this.socketPort);
    });
  }

  // Runs TCP listener for listening GPS device
  runNet() {
    const server = net.createServer();
    server.on('connection', (socket) => {
      socket.setEncoding('utf-8');
      socket.on('data', (data) => {
        console.log('COORD RECEIVED:');
        const latLong = this.parseGpsData(socket, data);
        console.log('NOT PARSED: ' + data);
        if (latLong) {
          this.io.emit('gps data', latLong); //Sends latitude and longitude to frontend socket
          this.sendCoords(latLong); //Save coord on database
          console.log('PARSED: ' + JSON.stringify(latLong));
        }
        console.log('\n');
      });
      socket.on('error', (err) => {
        console.log(err.message);
      });
    });
    server.listen(this.tcpPort, () => {
      console.log('Server listening at ' + server.address().port);
    });
  }

  // Verifies the type of packet sent by GPS
  parseGpsData(socket, data) {
    if (data.substring(0, 2) === '##') {
      console.log('doing LOAD');
      socket.write('LOAD');
      return;
    } else if (data.substring(0, 4) === 'imei') return this.parser.parse(data);
    return null;
  }

  // Save coords in database
  async sendCoords(coord) {
    await axios
      .post(`http://localhost:3000/api/v1/coord/create/${coord.imei}`, coord)
      .then(res => {
        console.log('Coord registered on database');
      })
      .catch(error => {
        console.error(error);
      });
  }

}
