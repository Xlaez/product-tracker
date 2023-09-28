const alpNum = "1234567890";

const newReferenceNo = (length) => {
  let tempAlph = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * alpNum.length);
    tempAlph += alpNum.charAt(randomIndex);
  }
  return tempAlph;
};
const newTrackingId = (length) => {
  let tempAlph = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * alpNum.length);
    tempAlph += alpNum.charAt(randomIndex);
  }
  return tempAlph;
};

const uniqueFiveDigits = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

module.exports = { newReferenceNo, newTrackingId, uniqueFiveDigits };
