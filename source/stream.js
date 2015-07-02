var Stream = function () {

  'use strict';

  var self = this;

  // This stream constraints
  self._constraints = {};

  // This stream native MediaStream reference
  self._objectRef = null;

  // This stream audio tracks list
  self._audioTracks = [];

  // This stream video tracks list
  self._videoTracks = [];

  // Hook events settings in here
  // Event.hook($$); // this is an illustration
};


// getAudioTracks function. Returns AudioStreamTrack objects.
Stream.prototype.getAudioTracks = function () {
  var self = this;

  return self._audioTracks;
};

// getVideoTracks function. Returns VideoStreamTrack objects.
Stream.prototype.getVideoTracks = function () {
  var self = this;

  return self._videoTracks;
};

// stop the stream itself.
Stream.prototype.stop = function () {
  var self = this;

  try {
    self._nativeRef.stop();

  } catch (error) {
    // MediaStream.stop is not implemented.
    // Stop all MediaStreamTracks

    var i, j;

    for (i = 0; i < self._audioTracks.length; i += 1) {
      self._audioTracks[i].stop();
    }

    for (j = 0; j < self._videoTracks.length; j += 1) {
      self._videoTracks[j].stop();
    }
  }
};

// attach the video element with the stream
Stream.prototype.attachStream = function (dom) {
  var self = this;

  window.attachMediaStream(dom, self._nativeRef);
};

Stream.prototype._init = function (stream) {
  self._nativeRef = stream;

  var i, j;

  var aTracks = stream.getAudioTracks();
  var vTracks = stream.getVideoTracks();

  for (i = 0; i < aTracks.length; i += 1) {
    self._audioTracks[i] = new StreamTrack(aTracks[i], _config.audio.mute);
  }

  for (j = 0; j < vTracks.length; j += 1) {
    self._videoTracks[j] = new StreamTrack(vTracks[j], _config.video.mute);
  }
};

// initialise the stream object and subscription of events
Stream.prototype.start = function (constraints, stream) {
  var self = this;

  if (typeof stream === 'object' && stream !== null) {

    if (stream instanceof MediaStream || stream instanceof LocalMediaStream) {
      self._init(stream);

    } else {
      throw new Error('Provided stream object is not a MediaStream object');
    }

  } else {
    // we don't manage the parsing of the stream.
    // just your own rtc getUserMedia stuff here :)
    self._constraints = options;

    window.navigator.getUserMedia(self._constraints, self._init, function (error) {
      // NOTE: throw is not support for older IEs (ouch)
      return Util.throw(error);
    });
  }
};