export default class TK303Parser {
  constructor() {
  }

  // Split GPS packet
  parse(packet) {
    let packetSplit = packet.split(',');
    let imei = packetSplit[0].split(':')[1];
    let alarm = packetSplit[1];
    return this.parseLatLong(imei, alarm, {value: packetSplit[7], direction: packetSplit[8]}, {
      value: packetSplit[9],
      direction: packetSplit[10]
    });
  }

  // Converts degrees, minutes and seconds to latitude and longitude
  parseLatLong(imei, alarm, parallel, meridian) {
    const latComp = {
      grades: parallel.value.substring(0, 2),
      minutes: parallel.value.substring(2, parallel.value.length)
    };
    const longComp = {
      grades: meridian.value.substring(0, 3),
      minutes: meridian.value.substring(3, meridian.value.length)
    };
    const latitude = parseInt(latComp.grades) + parseFloat(latComp.minutes) / 60;
    const longitude = parseInt(longComp.grades) + parseFloat(longComp.minutes) / 60;
    return {
      imei: imei,
      lat: parallel.direction === 'S' ? -latitude : latitude,
      lng: meridian.direction === 'W' ? -longitude : longitude,
      alarm: alarm
    };
  }
}
