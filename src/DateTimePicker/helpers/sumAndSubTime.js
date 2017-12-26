import pad2 from './pad2';
/*
 * (time, pair, action )
 * time: string '10:30'
 * pair: [h, m]
 * action: [sum, sub]
  * */

export default (time, pair, action) => {
  let [hours, minutes] = time.split(':');

  if (action === 'sub') {
    if (pair === 'h') {
      hours = parseInt(hours, 10) > 0 ? parseInt(hours, 10) - 1 : 23;
    } else {
      minutes = parseInt(minutes, 10) > 0 ? parseInt(minutes, 10) - 1 : 59;
    }
  } else if (action === 'sum') {
    if (pair === 'h') {
      hours = parseInt(hours, 10) < 23 ? parseInt(hours, 10) + 1 : 0;
    } else {
      minutes = parseInt(minutes, 10) < 59 ? parseInt(minutes, 10) + 1 : 0;
    }
  }

  return `${pad2(hours)}:${pad2(minutes)}`;
};
