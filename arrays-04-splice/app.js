const SetTimeOutPromsified = (duration) => {
  const promise = new Promise((resolve, reject) => {
    // I need the timeout to have the countdown
    setTimeout(() => resolve(), duration);
  });

  return promise;
}


const getCurrentPositionPromisified = (options) => {
  const promise = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });

  return promise;
}

const alwaysResolves = () => {
  const promise = new Promise((resolve, reject) => {
    resolve('success!');
  });
  return promise;
}

const alwaysRejects = () => {
  const promise = new Promise((resolve, reject) => {
    reject('error!');
  });
  return promise;
}

// alwaysResolves()
// .then(data => console.log(data))
// .then(data => alwaysRejects())
// .catch(error => console.log(error)) // it doesn't stop other .then methods from beeing called
// .then(data => console.log('this runs!'));

// const example = async () => {
// }

const example = async () => {
  const combinedData = await Promise.allSettled([getCurrentPositionPromisified(), alwaysRejects()]);
  console.log(combinedData); // [GeolocationPosition, 'success']
}

example();






