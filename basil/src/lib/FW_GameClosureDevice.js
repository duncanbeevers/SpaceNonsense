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
  getMinDimension: getMinDimension,
  getWidth: function() { return device.width; },
  getHeight: function() { return device.height; }
};

exports = FW.GameClosureDevice;
