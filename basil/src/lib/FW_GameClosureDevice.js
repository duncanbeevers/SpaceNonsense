import device;

var FW = this.FW || (this.FW = {});

function getMaxDimension() {
  return Math.max(device.width, device.height);
};

function getMinDimension() {
  return Math.min(device.width, device.height);
};

FW.GameClosureDevice = {
  getMaxDimension: getMaxDimension,
  getMinDimension: getMinDimension
};

exports = FW.GameClosureDevice;
