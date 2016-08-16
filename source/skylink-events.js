/**
 * Stores the list of <code>on()</code> event handlers.
 * @attribute _EVENTS
 * @param {Array} <#event> The list of event handlers associated with the event.
 * @param {Function} <#event>.<#index> The event handler function.
 * @type JSON
 * @private
 * @for Skylink
 * @since 0.5.2
 */
Skylink.prototype._EVENTS = {
  /**
   * Event triggered when the socket connection to the platform signaling is opened.
   * - This event means that socket connection is open and self is ready to join the room.
   * @event channelOpen
   * @component Events
   * @for Skylink
   * @since 0.1.0
   */
  channelOpen: [],

  /**
   * Event triggered when the socket connection to the platform signaling is closed.
   * - This event means that socket connection is closed and self has left the room.
   * @event channelClose
   * @component Events
   * @for Skylink
   * @since 0.1.0
   */
  channelClose: [],

  /**
   * Event triggered when the socket connection is exchanging messages with the platform signaling.
   * - This event is a debugging feature, and it's not advisable to subscribe to
   *   this event unless you are debugging the socket messages
   *   received from the platform signaling.
   * @event channelMessage
   * @param {JSON} message The socket message object data received from the platform signaling.
   * @component Events
   * @for Skylink
   * @since 0.1.0
   */
  channelMessage: [],

  /**
   * Event triggered when the socket connection has occurred an exception
   *   during a connection with the platform signaling.
   * - After this event is triggered, it may result in <a href="#event_channelClose">channelClose</a>,
   *   and the socket connection with the platform signaling could be disrupted.
   * @event channelError
   * @param {Object|String} error The error object thrown that caused the exception.
   * @component Events
   * @for Skylink
   * @since 0.1.0
   */
  channelError: [],

  /**
   * Event triggered when attempting to reconnect the socket connection with the platform signaling.
   * - Depending on the current <code>type</code> triggered in <a href="#event_socketError">
   *   socketError</a> event before, it may or may not attempt the socket reconnection and
   *   this event may not be triggered.
   * - If reconnection attempt fails, it will trigger <a href="#event_socketError">socketError</a> event
   *   again and repeat the stage from there.
   * @event channelRetry
   * @param {String} fallbackType The fallback socket transport that Skylink is attempting to reconnect with.
   *   [Rel: Skylink.SOCKET_FALLBACK]
   * @param {Number} currentAttempt The current reconnection attempt.
   * @component Events
   * @for Skylink
   * @since 0.5.6
   */
  channelRetry: [],

  /**
   * Event triggered when attempt to <em>(re)</em>connect the socket connection with the platform signaling has failed.
   * - Depending on the current <code>type</code> payload, it may or may not attempt the
   *   socket reconnection and <a href="#event_channelRetry">channelRetry</a> event may not be triggered.
   * - If reconnection attempt fails and there are still available ports to reconnect with,
   *   it will trigger <a href="#event_channelRetry">channelRetry</a> event again and
   *   repeat the stage from there.
   * @event socketError
   * @param {String} errorCode The socket connection error code received.
   *   [Rel: Skylink.SOCKET_ERROR]
   * @param {Number|String|Object} error The error object thrown that caused the failure.
   * @param {String} type The socket transport that Skylink has failed to connect with.
   *   [Rel: Skylink.SOCKET_FALLBACK]
   * @component Events
   * @for Skylink
   * @since 0.5.5
   */
  socketError: [],

  /**
   * Event triggered when room connection information is being retrieved from platform server.
   * - This is also triggered when <a href="#method_init">init()</a> is invoked, but
   *   the socket connection events like <a href="#event_channelOpen">channelOpen</a> does
   *   not get triggered but stops at <u>readyStateChange</u> event.
   * @event readyStateChange
   * @param {String} readyState The current ready state of the retrieval when the event is triggered.
   *   [Rel: Skylink.READY_STATE_CHANGE]
   * @param {JSON} [error=null] The error object thrown when there is a failure in retrieval.
   *   If received as <code>null</code>, it means that there is no errors.
   * @param {Number} error.status Http status when retrieving information.
   *   May be empty for other errors.
   * @param {Number} error.errorCode The
   *   <a href="#attr_READY_STATE_CHANGE_ERROR">READY_STATE_CHANGE_ERROR</a>
   *   if there is an <a href="#event_readyStateChange">readyStateChange</a>
   *   event error that caused the failure for initialising Skylink.
   *   [Rel: Skylink.READY_STATE_CHANGE_ERROR]
   * @param {Object} error.content The exception thrown that caused the failure
   *   for initialising Skylink.
   * @param {Number} error.status The XMLHttpRequest status code received
   *   when exception is thrown that caused the failure for initialising Skylink.
   * @param {String} room The selected room connection information that Skylink is attempting
   *   to retrieve the information for to start connection to.
   * @component Events
   * @for Skylink
   * @since 0.4.0
   */
  readyStateChange: [],

  /**
   * Event triggered when a Peer handshaking state has changed.
   * - This event may trigger <code>state</code> <code>HANDSHAKE_PROGRESS.ENTER</code> for
   *   self to indicate that broadcast to ping for any existing Peers in the room has
   *   been made.
   * - This event is a debugging feature, and it's used to check the
   *   Peer handshaking connection status.
   * - This starts the Peer connection handshaking, where it retrieves all the Peer
   *   information and then proceeds to start the ICE connection.
   * @event handshakeProgress
   * @param {String} state The Peer connection handshake state.
   *   [Rel: Skylink.HANDSHAKE_PROGRESS]
   * @param {String} peerId The Peer ID associated with the connection
   *   handshake state.
   * @param {Object|String} [error] The error object thrown when there is a failure in
   *   the connection handshaking.
   * @component Events
   * @for Skylink
   * @since 0.3.0
   */
  handshakeProgress: [],

  /**
   * Event triggered when a Peer connection ICE gathering state has changed.
   * - This event is a debugging feature, and it's used to check the
   *   Peer ICE candidate gathering status.
   * - This indicates if the ICE gathering has been completed to
   *   start ICE connection for DataChannel and media streaming connection.
   * @event candidateGenerationState
   * @param {String} state The current ICE gathering state.
   *   <small>See the list of available triggered states in the related link.</small>
   *   [Rel: Skylink.CANDIDATE_GENERATION_STATE]
   * @param {String} peerId The Peer ID associated with the connection
   * @component Events
   * @for Skylink
   * @since 0.1.0
   */
  candidateGenerationState: [],

  /**
   * Event triggered when a Peer connection signaling state has changed.
   * - This event is a debugging feature, and it's used to check the
   *   Peer signaling connection status.
   * - This event indicates if the session description is received
   *   to start ICE gathering for DataChannel and media streaming connection.
   * @event peerConnectionState
   * @param {String} state The current connection signaling state.
   *   [Rel: Skylink.PEER_CONNECTION_STATE]
   * @param {String} peerId The Peer ID associated with the current connection
   *   signaling state.
   * @component Events
   * @for Skylink
   * @since 0.1.0
   */
  peerConnectionState: [],

  /**
   * Event triggered when a Peer connection ICE connection state has changed.
   * - This event is a debugging feature, and it's used to check the
   *   Peer ICE connection of added ICE candidates status.
   * - This event indicates if the ICE connection is established for successful
   *   DataChannel and media streaming connection.
   * @event iceConnectionState
   * @param {String} state The current ICE connection state.
   *   [Rel: Skylink.ICE_CONNECTION_STATE]
   * @param {String} peerId The Peer ID associated with the current ICE connection state.
   * @component Events
   * @for Skylink
   * @since 0.1.0
   */
  iceConnectionState: [],

  /**
   * Event triggered when access to self user media stream has failed.
   * - If <code>audioFallback</code> is enabled in <a href="#method_init">init()</a>,
   *   it will throw an error if audio only user media stream failed after
   *   a failed attempt to retrieve video and audio user media.
   * @event mediaAccessError
   * @param {Object|String} error The error object thrown that caused the failure.
   * @param {Boolean} isScreensharing The flag that indicates if self
   *    Stream object is a screensharing stream or not.
   * @param {Boolean} isAudioFallbackError The flag that indicates if Skylink throws
   *    the error after an audio fallback has been attempted.
   * @component Events
   * @for Skylink
   * @since 0.1.0
   */
  mediaAccessError: [],

  /**
   * Event triggered when media access fallback has been made.
   * - If <code>audioFallback</code> is enabled in <a href="#method_init">init()</a>,
   *   and if there is a failed attempt to retrieve video and audio user media,
   *   it will attempt to do the audio fallback.
   * - If MediaStream successfully received does not meet to expected tracks, this
   *   event would be triggered.
   * @event mediaAccessFallback
   * @param {JSON} error The error object information.
   * @param {Object|String} error.error The error object thrown that caused the failure
   *   from retrieve video and audio user media stream.
   *   is triggered because (video+audio) error is fallbacking to audio only.
   * @param {JSON} [error.diff=null] The list of expected audio and video tracks and received
   *   tracks.<br>This is only defined when <code>state</code> payload is <code>1</code>.
   * @param {JSON} error.diff.video The expected and received video tracks.
   * @param {Number} error.diff.video.expected The expected video tracks.
   * @param {Number} error.diff.video.received The received video tracks.
   * @param {JSON} error.diff.audio The expected and received audio tracks.
   * @param {Number} error.diff.audio.expected The expected audio tracks.
   * @param {Number} error.diff.audio.received The received audio tracks.
   * @param {Number} state The access fallback state.
   * <small><ul>
   * <li><code>0</code>: Attempting to retrieve access for fallback state.</li>
   * <li><code>1</code>: Fallback access has been completed successfully</li>
   * <li><code>-1</code>: Failed retrieving fallback access</li>
   * </ul></small>
   * @param {Boolean} [isScreensharing=false] The flag that indicates if this event ia an
   *   fallback from failed screensharing retrieval or attaching of audio.
   * @component Events
   * @param {Boolean} [isAudioFallback=false] The flag that indicates if this event is an
   *   audio fallbacking from failed attempt to retrieve video and audio user media.
   * @for Skylink
   * @since 0.6.3
   */
  mediaAccessFallback: [],

  /**
   * Event triggered when access to self user media stream is successfully
   *   attached to Skylink.
   * @event mediaAccessSuccess
   * @param {Object} stream The self user [MediaStream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_API)
   *   object. To display the MediaStream object to a <code>video</code> or <code>audio</code>, simply invoke:<br>
   *   <code>attachMediaStream(domElement, stream);</code>.
   * @param {Boolean} isScreensharing The flag that indicates if self
   *    Stream object is a screensharing stream or not.
   * @component Events
   * @for Skylink
   * @since 0.1.0
   */
  mediaAccessSuccess: [],

  /**
   * Event triggered when the application requires to retrieve self
   *   user media stream manually instead of doing it automatically in
   *   {{#crossLink "Skylink/joinRoom:method"}}joinRoom(){{/crossLink}}.
   * - This event triggers based on the configuration of <code>manualGetUserMedia</code>
   *   in the <a href="#method_joinRoom">joinRoom() configuration settings</a>.
   * - Developers must manually invoke <a href="#method_getUserMedia">getUserMedia()</a>
   *   to retrieve the user media stream before self would join the room.
   *   Once the user media stream is attached, self would proceed to join the room
   *   automatically.
   * @event mediaAccessRequired
   * @component Events
   * @for Skylink
   * @since 0.5.5
   */
  mediaAccessRequired: [],

  /**
   * Event triggered when self user media stream attached to Skylink has been stopped.
   * @event mediaAccessStopped
   * @param {Boolean} isScreensharing The flag that indicates if self
   *    Stream object is a screensharing stream or not.
   * @component Events
   * @for Skylink
   * @since 0.5.6
   */
  mediaAccessStopped: [],

  /**
   * Event triggered when a Peer joins the room.
   * @event peerJoined
   * @param {String} peerId The Peer ID of the new peer
   *   that has joined the room.
   * @param {Object} peerInfo The peer information associated
   *   with the Peer Connection.
   * @param {String|JSON} peerInfo.userData The custom user data
   *   information set by developer. This custom user data can also
   *   be set in <a href="#method_setUserData">setUserData()</a>.
   * @param {JSON} peerInfo.settings The Peer Stream
   *   streaming settings information. If both audio and video
   *   option is <code>false</code>, there should be no
   *   receiving remote Stream object from this associated Peer.
   * @param {Boolean|JSON} [peerInfo.settings.audio=false] The
   *   Peer Stream streaming audio settings. If
   *   <code>false</code>, it means that audio streaming is disabled in
   *   the remote Stream of the Peer.
   * @param {Boolean} [peerInfo.settings.audio.stereo] The flag that indicates if
   *   stereo option should be explictly enabled to an OPUS enabled audio stream.
   *   Check the <code>audioCodec</code> configuration settings in
   *   <a href="#method_init">init()</a>
   *   to enable OPUS as the audio codec. Note that stereo is already enabled
   *   for OPUS codecs, this only adds a stereo flag to the SDP to explictly
   *   enable stereo in the audio streaming.
   * @param {Boolean|JSON} [peerInfo.settings.video=false] The Peer
   *   Stream streaming video settings. If <code>false</code>, it means that
   *   video streaming is disabled in the remote Stream of the Peer.
   * @param {JSON} [peerInfo.settings.video.resolution] The Peer
   *   Stream streaming video resolution settings. Setting the resolution may
   *   not force set the resolution provided as it depends on the how the
   *   browser handles the resolution. [Rel: Skylink.VIDEO_RESOLUTION]
   * @param {Number} [peerInfo.settings.video.resolution.width] The Peer
   *   Stream streaming video resolution width.
   * @param {Number} [peerInfo.settings.video.resolution.height] The Peer
   *   Stream streaming video resolution height.
   * @param {Number} [peerInfo.settings.video.frameRate] The Peer
   *   Stream streaming video maximum frameRate.
   * @param {Boolean} [peerInfo.settings.video.screenshare=false] The flag
   *   that indicates if the Peer connection Stream object sent
   *   is a screensharing stream or not.
   * @param {String} [peerInfo.settings.bandwidth] The Peer configuration for
   *   the maximum sending bandwidth. The flags set may or may not work depending
   *   on the browser implementations and how it handles it.
   * @param {String} [peerInfo.settings.bandwidth.audio] The maximum
   *   sending audio bandwidth bitrate in <var>kb/s</var>. If this is not provided,
   *   it will leave the audio bitrate to the browser defaults.
   * @param {String} [peerInfo.settings.bandwidth.video] The maximum
   *   sending video bandwidth bitrate in <var>kb/s</var>. If this is not provided,
   *   it will leave the video bitrate to the browser defaults.
   * @param {String} [peerInfo.settings.bandwidth.data] The maximum
   *   sending data bandwidth bitrate in <var>kb/s</var>. If this is not provided,
   *   it will leave the data bitrate to the browser defaults.
   * @param {JSON} peerInfo.mediaStatus The Peer Stream mute
   *   settings for both audio and video streamings.
   * @param {Boolean} [peerInfo.mediaStatus.audioMuted=true] The flag that
   *   indicates if the remote Stream object audio streaming is muted. If
   *   there is no audio streaming enabled for the Peer, by default,
   *   it is set to <code>true</code>.
   * @param {Boolean} [peerInfo.mediaStatus.videoMuted=true] The flag that
   *   indicates if the remote Stream object video streaming is muted. If
   *   there is no video streaming enabled for the Peer, by default,
   *   it is set to <code>true</code>.
   * @param {JSON} peerInfo.agent The Peer platform agent information.
   * @param {String} peerInfo.agent.name The Peer platform browser or agent name.
   * @param {Number} peerInfo.agent.version The Peer platform browser or agent version.
   * @param {Number} peerInfo.agent.os The Peer platform name.
   * @param {String} peerInfo.room The current room that the Peer is in.
   * @param {Boolean} isSelf The flag that indicates if self is the Peer.
   * @component Events
   * @for Skylink
   * @since 0.5.2
   */
  peerJoined: [],

  /**
   * Event triggered when a Peer connection has been restarted for
   *   a reconnection.
   * @event peerRestart
   * @param {String} peerId The Peer ID of the connection that
   *   is restarted for a reconnection.
   * @param {Object} peerInfo The peer information associated
   *   with the Peer Connection.
   * @param {String|JSON} peerInfo.userData The custom user data
   *   information set by developer. This custom user data can also
   *   be set in <a href="#method_setUserData">setUserData()</a>.
   * @param {JSON} peerInfo.settings The Peer Stream
   *   streaming settings information. If both audio and video
   *   option is <code>false</code>, there should be no
   *   receiving remote Stream object from this associated Peer.
   * @param {Boolean|JSON} [peerInfo.settings.audio=false] The
   *   Peer Stream streaming audio settings. If
   *   <code>false</code>, it means that audio streaming is disabled in
   *   the remote Stream of the Peer.
   * @param {Boolean} [peerInfo.settings.audio.stereo] The flag that indicates if
   *   stereo option should be explictly enabled to an OPUS enabled audio stream.
   *   Check the <code>audioCodec</code> configuration settings in
   *   <a href="#method_init">init()</a>
   *   to enable OPUS as the audio codec. Note that stereo is already enabled
   *   for OPUS codecs, this only adds a stereo flag to the SDP to explictly
   *   enable stereo in the audio streaming.
   * @param {Boolean|JSON} [peerInfo.settings.video=false] The Peer
   *   Stream streaming video settings. If <code>false</code>, it means that
   *   video streaming is disabled in the remote Stream of the Peer.
   * @param {JSON} [peerInfo.settings.video.resolution] The Peer
   *   Stream streaming video resolution settings. Setting the resolution may
   *   not force set the resolution provided as it depends on the how the
   *   browser handles the resolution. [Rel: Skylink.VIDEO_RESOLUTION]
   * @param {Number} [peerInfo.settings.video.resolution.width] The Peer
   *   Stream streaming video resolution width.
   * @param {Number} [peerInfo.settings.video.resolution.height] The Peer
   *   Stream streaming video resolution height.
   * @param {Number} [peerInfo.settings.video.frameRate] The Peer
   *   Stream streaming video maximum frameRate.
   * @param {Boolean} [peerInfo.settings.video.screenshare=false] The flag
   *   that indicates if the Peer connection Stream object sent
   *   is a screensharing stream or not.
   * @param {String} [peerInfo.settings.bandwidth] The Peer configuration for
   *   the maximum sending bandwidth. The flags set may or may not work depending
   *   on the browser implementations and how it handles it.
   * @param {String} [peerInfo.settings.bandwidth.audio] The maximum
   *   sending audio bandwidth bitrate in <var>kb/s</var>. If this is not provided,
   *   it will leave the audio bitrate to the browser defaults.
   * @param {String} [peerInfo.settings.bandwidth.video] The maximum
   *   sending video bandwidth bitrate in <var>kb/s</var>. If this is not provided,
   *   it will leave the video bitrate to the browser defaults.
   * @param {String} [peerInfo.settings.bandwidth.data] The maximum
   *   sending data bandwidth bitrate in <var>kb/s</var>. If this is not provided,
   *   it will leave the data bitrate to the browser defaults.
   * @param {JSON} peerInfo.mediaStatus The Peer Stream mute
   *   settings for both audio and video streamings.
   * @param {Boolean} [peerInfo.mediaStatus.audioMuted=true] The flag that
   *   indicates if the remote Stream object audio streaming is muted. If
   *   there is no audio streaming enabled for the Peer, by default,
   *   it is set to <code>true</code>.
   * @param {Boolean} [peerInfo.mediaStatus.videoMuted=true] The flag that
   *   indicates if the remote Stream object video streaming is muted. If
   *   there is no video streaming enabled for the Peer, by default,
   *   it is set to <code>true</code>.
   * @param {JSON} peerInfo.agent The Peer platform agent information.
   * @param {String} peerInfo.agent.name The Peer platform browser or agent name.
   * @param {Number} peerInfo.agent.version The Peer platform browser or agent version.
   * @param {Number} peerInfo.agent.os The Peer platform name.
   * @param {String} peerInfo.room The current room that the Peer is in.
   * @param {Boolean} isSelfInitiateRestart The flag that indicates if self is
   *    the one who have initiated the Peer connection restart.
   * @component Events
   * @for Skylink
   * @since 0.5.5
   */
  peerRestart: [],

  /**
   * Event triggered when a Peer information have been updated.
   * - This event would only be triggered if self is in the room.
   * - This event triggers when the <code>peerInfo</code> data is updated,
   *   like <code>peerInfo.mediaStatus</code> or the <code>peerInfo.userData</code>,
   *   which is invoked through <a href="#method_muteStream">muteStream()</a> or
   *   <a href="#method_setUserData">setUserData()</a>.
   * @event peerUpdated
   * @param {String} peerId The Peer ID of the peer with updated information.
   * @param {Object} peerInfo The peer information associated
   *   with the Peer Connection.
   * @param {String|JSON} peerInfo.userData The custom user data
   *   information set by developer. This custom user data can also
   *   be set in <a href="#method_setUserData">setUserData()</a>.
   * @param {JSON} peerInfo.settings The Peer Stream
   *   streaming settings information. If both audio and video
   *   option is <code>false</code>, there should be no
   *   receiving remote Stream object from this associated Peer.
   * @param {Boolean|JSON} [peerInfo.settings.audio=false] The
   *   Peer Stream streaming audio settings. If
   *   <code>false</code>, it means that audio streaming is disabled in
   *   the remote Stream of the Peer.
   * @param {Boolean} [peerInfo.settings.audio.stereo] The flag that indicates if
   *   stereo option should be explictly enabled to an OPUS enabled audio stream.
   *   Check the <code>audioCodec</code> configuration settings in
   *   <a href="#method_init">init()</a>
   *   to enable OPUS as the audio codec. Note that stereo is already enabled
   *   for OPUS codecs, this only adds a stereo flag to the SDP to explictly
   *   enable stereo in the audio streaming.
   * @param {Boolean|JSON} [peerInfo.settings.video=false] The Peer
   *   Stream streaming video settings. If <code>false</code>, it means that
   *   video streaming is disabled in the remote Stream of the Peer.
   * @param {JSON} [peerInfo.settings.video.resolution] The Peer
   *   Stream streaming video resolution settings. Setting the resolution may
   *   not force set the resolution provided as it depends on the how the
   *   browser handles the resolution. [Rel: Skylink.VIDEO_RESOLUTION]
   * @param {Number} [peerInfo.settings.video.resolution.width] The Peer
   *   Stream streaming video resolution width.
   * @param {Number} [peerInfo.settings.video.resolution.height] The Peer
   *   Stream streaming video resolution height.
   * @param {Number} [peerInfo.settings.video.frameRate] The Peer
   *   Stream streaming video maximum frameRate.
   * @param {Boolean} [peerInfo.settings.video.screenshare=false] The flag
   *   that indicates if the Peer connection Stream object sent
   *   is a screensharing stream or not.
   * @param {String} [peerInfo.settings.bandwidth] The Peer configuration for
   *   the maximum sending bandwidth. The flags set may or may not work depending
   *   on the browser implementations.
   * @param {String} [peerInfo.settings.bandwidth] The Peer configuration for
   *   the maximum sending bandwidth. The flags set may or may not work depending
   *   on the browser implementations and how it handles it.
   * @param {String} [peerInfo.settings.bandwidth.audio] The maximum
   *   sending audio bandwidth bitrate in <var>kb/s</var>. If this is not provided,
   *   it will leave the audio bitrate to the browser defaults.
   * @param {String} [peerInfo.settings.bandwidth.video] The maximum
   *   sending video bandwidth bitrate in <var>kb/s</var>. If this is not provided,
   *   it will leave the video bitrate to the browser defaults.
   * @param {String} [peerInfo.settings.bandwidth.data] The maximum
   *   sending data bandwidth bitrate in <var>kb/s</var>. If this is not provided,
   *   it will leave the data bitrate to the browser defaults.
   * @param {JSON} peerInfo.mediaStatus The Peer Stream mute
   *   settings for both audio and video streamings.
   * @param {Boolean} [peerInfo.mediaStatus.audioMuted=true] The flag that
   *   indicates if the remote Stream object audio streaming is muted. If
   *   there is no audio streaming enabled for the Peer, by default,
   *   it is set to <code>true</code>.
   * @param {Boolean} [peerInfo.mediaStatus.videoMuted=true] The flag that
   *   indicates if the remote Stream object video streaming is muted. If
   *   there is no video streaming enabled for the Peer, by default,
   *   it is set to <code>true</code>.
   * @param {JSON} peerInfo.agent The Peer platform agent information.
   * @param {String} peerInfo.agent.name The Peer platform browser or agent name.
   * @param {Number} peerInfo.agent.version The Peer platform browser or agent version.
   * @param {Number} peerInfo.agent.os The Peer platform name.
   * @param {String} peerInfo.room The current room that the Peer is in.
   * @param {Boolean} isSelf The flag that indicates if self is the Peer.
   * @component Events
   * @for Skylink
   * @since 0.5.2
   */
  peerUpdated: [],

  /**
   * Event triggered when a Peer leaves the room.
   * @event peerLeft
   * @param {String} peerId The Peer ID of the peer
   *   that had left the room.
   * @param {Object} peerInfo The peer information associated
   *   with the Peer Connection.
   * @param {String|JSON} peerInfo.userData The custom user data
   *   information set by developer. This custom user data can also
   *   be set in <a href="#method_setUserData">setUserData()</a>.
   * @param {JSON} peerInfo.settings The Peer Stream
   *   streaming settings information. If both audio and video
   *   option is <code>false</code>, there should be no
   *   receiving remote Stream object from this associated Peer.
   * @param {Boolean|JSON} [peerInfo.settings.audio=false] The
   *   Peer Stream streaming audio settings. If
   *   <code>false</code>, it means that audio streaming is disabled in
   *   the remote Stream of the Peer.
   * @param {Boolean} [peerInfo.settings.audio.stereo] The flag that indicates if
   *   stereo option should be explictly enabled to an OPUS enabled audio stream.
   *   Check the <code>audioCodec</code> configuration settings in
   *   <a href="#method_init">init()</a>
   *   to enable OPUS as the audio codec. Note that stereo is already enabled
   *   for OPUS codecs, this only adds a stereo flag to the SDP to explictly
   *   enable stereo in the audio streaming.
   * @param {Boolean|JSON} [peerInfo.settings.video=false] The Peer
   *   Stream streaming video settings. If <code>false</code>, it means that
   *   video streaming is disabled in the remote Stream of the Peer.
   * @param {JSON} [peerInfo.settings.video.resolution] The Peer
   *   Stream streaming video resolution settings. Setting the resolution may
   *   not force set the resolution provided as it depends on the how the
   *   browser handles the resolution. [Rel: Skylink.VIDEO_RESOLUTION]
   * @param {Number} [peerInfo.settings.video.resolution.width] The Peer
   *   Stream streaming video resolution width.
   * @param {Number} [peerInfo.settings.video.resolution.height] The Peer
   *   Stream streaming video resolution height.
   * @param {Number} [peerInfo.settings.video.frameRate] The Peer
   *   Stream streaming video maximum frameRate.
   * @param {Boolean} [peerInfo.settings.video.screenshare=false] The flag
   *   that indicates if the Peer connection Stream object sent
   *   is a screensharing stream or not.
   * @param {String} [peerInfo.settings.bandwidth] The Peer configuration for
   *   the maximum sending bandwidth. The flags set may or may not work depending
   *   on the browser implementations and how it handles it.
   * @param {String} [peerInfo.settings.bandwidth.audio] The maximum
   *   sending audio bandwidth bitrate in <var>kb/s</var>. If this is not provided,
   *   it will leave the audio bitrate to the browser defaults.
   * @param {String} [peerInfo.settings.bandwidth.video] The maximum
   *   sending video bandwidth bitrate in <var>kb/s</var>. If this is not provided,
   *   it will leave the video bitrate to the browser defaults.
   * @param {String} [peerInfo.settings.bandwidth.data] The maximum
   *   sending data bandwidth bitrate in <var>kb/s</var>. If this is not provided,
   *   it will leave the data bitrate to the browser defaults.
   * @param {JSON} peerInfo.mediaStatus The Peer Stream mute
   *   settings for both audio and video streamings.
   * @param {Boolean} [peerInfo.mediaStatus.audioMuted=true] The flag that
   *   indicates if the remote Stream object audio streaming is muted. If
   *   there is no audio streaming enabled for the Peer, by default,
   *   it is set to <code>true</code>.
   * @param {Boolean} [peerInfo.mediaStatus.videoMuted=true] The flag that
   *   indicates if the remote Stream object video streaming is muted. If
   *   there is no video streaming enabled for the Peer, by default,
   *   it is set to <code>true</code>.
   * @param {JSON} peerInfo.agent The Peer platform agent information.
   * @param {String} peerInfo.agent.name The Peer platform browser or agent name.
   * @param {Number} peerInfo.agent.version The Peer platform browser or agent version.
   * @param {Number} peerInfo.agent.os The Peer platform name.
   * @param {String} peerInfo.room The current room that the Peer is in.
   * @param {Boolean} isSelf The flag that indicates if self is the Peer.
   * @component Events
   * @for Skylink
   * @since 0.5.2
   */
  peerLeft: [],

  /**
   * Event triggered when self is disconnected from room.
   * @event sessionDisconnect
   * @param {String} peerId The Peer ID of the peer
   *   that had left the room.
   * @param {Object} peerInfo The peer information associated
   *   with the Peer Connection.
   * @param {String|JSON} peerInfo.userData The custom user data
   *   information set by developer. This custom user data can also
   *   be set in <a href="#method_setUserData">setUserData()</a>.
   * @param {JSON} peerInfo.settings The Peer Stream
   *   streaming settings information. If both audio and video
   *   option is <code>false</code>, there should be no
   *   receiving remote Stream object from this associated Peer.
   * @param {Boolean|JSON} [peerInfo.settings.audio=false] The
   *   Peer Stream streaming audio settings. If
   *   <code>false</code>, it means that audio streaming is disabled in
   *   the remote Stream of the Peer.
   * @param {Boolean} [peerInfo.settings.audio.stereo] The flag that indicates if
   *   stereo option should be explictly enabled to an OPUS enabled audio stream.
   *   Check the <code>audioCodec</code> configuration settings in
   *   <a href="#method_init">init()</a>
   *   to enable OPUS as the audio codec. Note that stereo is already enabled
   *   for OPUS codecs, this only adds a stereo flag to the SDP to explictly
   *   enable stereo in the audio streaming.
   * @param {Boolean|JSON} [peerInfo.settings.video=false] The Peer
   *   Stream streaming video settings. If <code>false</code>, it means that
   *   video streaming is disabled in the remote Stream of the Peer.
   * @param {JSON} [peerInfo.settings.video.resolution] The Peer
   *   Stream streaming video resolution settings. Setting the resolution may
   *   not force set the resolution provided as it depends on the how the
   *   browser handles the resolution. [Rel: Skylink.VIDEO_RESOLUTION]
   * @param {Number} [peerInfo.settings.video.resolution.width] The Peer
   *   Stream streaming video resolution width.
   * @param {Number} [peerInfo.settings.video.resolution.height] The Peer
   *   Stream streaming video resolution height.
   * @param {Number} [peerInfo.settings.video.frameRate] The Peer
   *   Stream streaming video maximum frameRate.
   * @param {Boolean} [peerInfo.settings.video.screenshare=false] The flag
   *   that indicates if the Peer connection Stream object sent
   *   is a screensharing stream or not.
   * @param {String} [peerInfo.settings.bandwidth] The Peer configuration for
   *   the maximum sending bandwidth. The flags set may or may not work depending
   *   on the browser implementations and how it handles it.
   * @param {String} [peerInfo.settings.bandwidth.audio] The maximum
   *   sending audio bandwidth bitrate in <var>kb/s</var>. If this is not provided,
   *   it will leave the audio bitrate to the browser defaults.
   * @param {String} [peerInfo.settings.bandwidth.video] The maximum
   *   sending video bandwidth bitrate in <var>kb/s</var>. If this is not provided,
   *   it will leave the video bitrate to the browser defaults.
   * @param {String} [peerInfo.settings.bandwidth.data] The maximum
   *   sending data bandwidth bitrate in <var>kb/s</var>. If this is not provided,
   *   it will leave the data bitrate to the browser defaults.
   * @param {JSON} peerInfo.mediaStatus The Peer Stream mute
   *   settings for both audio and video streamings.
   * @param {Boolean} [peerInfo.mediaStatus.audioMuted=true] The flag that
   *   indicates if the remote Stream object audio streaming is muted. If
   *   there is no audio streaming enabled for the Peer, by default,
   *   it is set to <code>true</code>.
   * @param {Boolean} [peerInfo.mediaStatus.videoMuted=true] The flag that
   *   indicates if the remote Stream object video streaming is muted. If
   *   there is no video streaming enabled for the Peer, by default,
   *   it is set to <code>true</code>.
   * @param {JSON} peerInfo.agent The Peer platform agent information.
   * @param {String} peerInfo.agent.name The Peer platform browser or agent name.
   * @param {Number} peerInfo.agent.version The Peer platform browser or agent version.
   * @param {Number} peerInfo.agent.os The Peer platform name.
   * @param {String} peerInfo.room The current room that the Peer is in.
   * @component Events
   * @for Skylink
   * @since 0.6.10
   */
  sessionDisconnect: [],

  /**
   * Event triggered when a Stream is sent by Peer.
   * - This event may trigger for self, which indicates that self has joined the room
   *   and is sending this Stream object to other Peers connected in the room.
   * @event incomingStream
   * @param {String} peerId The Peer ID associated to the Stream object.
   * @param {Object} stream The Peer
   *   [MediaStream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_API)
   *   object that is sent in this connection.
   *   To display the MediaStream object to a <code>video</code> or <code>audio</code>, simply invoke:<br>
   *   <code>attachMediaStream(domElement, stream);</code>.
   * @param {Boolean} isSelf The flag that indicates if self is the Peer.
   * @param {Object} peerInfo The peer information associated
   *   with the Peer Connection.
   * @param {String|JSON} peerInfo.userData The custom user data
   *   information set by developer. This custom user data can also
   *   be set in <a href="#method_setUserData">setUserData()</a>.
   * @param {JSON} peerInfo.settings The Peer Stream
   *   streaming settings information. If both audio and video
   *   option is <code>false</code>, there should be no
   *   receiving remote Stream object from this associated Peer.
   * @param {Boolean|JSON} [peerInfo.settings.audio=false] The
   *   Peer Stream streaming audio settings. If
   *   <code>false</code>, it means that audio streaming is disabled in
   *   the remote Stream of the Peer.
   * @param {Boolean} [peerInfo.settings.audio.stereo] The flag that indicates if
   *   stereo option should be explictly enabled to an OPUS enabled audio stream.
   *   Check the <code>audioCodec</code> configuration settings in
   *   <a href="#method_init">init()</a>
   *   to enable OPUS as the audio codec. Note that stereo is already enabled
   *   for OPUS codecs, this only adds a stereo flag to the SDP to explictly
   *   enable stereo in the audio streaming.
   * @param {Boolean|JSON} [peerInfo.settings.video=false] The Peer
   *   Stream streaming video settings. If <code>false</code>, it means that
   *   video streaming is disabled in the remote Stream of the Peer.
   * @param {JSON} [peerInfo.settings.video.resolution] The Peer
   *   Stream streaming video resolution settings. Setting the resolution may
   *   not force set the resolution provided as it depends on the how the
   *   browser handles the resolution. [Rel: Skylink.VIDEO_RESOLUTION]
   * @param {Number} [peerInfo.settings.video.resolution.width] The Peer
   *   Stream streaming video resolution width.
   * @param {Number} [peerInfo.settings.video.resolution.height] The Peer
   *   Stream streaming video resolution height.
   * @param {Number} [peerInfo.settings.video.frameRate] The Peer
   *   Stream streaming video maximum frameRate.
   * @param {Boolean} [peerInfo.settings.video.screenshare=false] The flag
   *   that indicates if the Peer connection Stream object sent
   *   is a screensharing stream or not.
   * @param {String} [peerInfo.settings.bandwidth] The Peer configuration for
   *   the maximum sending bandwidth. The flags set may or may not work depending
   *   on the browser implementations and how it handles it.
   * @param {String} [peerInfo.settings.bandwidth.audio] The maximum
   *   sending audio bandwidth bitrate in <var>kb/s</var>. If this is not provided,
   *   it will leave the audio bitrate to the browser defaults.
   * @param {String} [peerInfo.settings.bandwidth.video] The maximum
   *   sending video bandwidth bitrate in <var>kb/s</var>. If this is not provided,
   *   it will leave the video bitrate to the browser defaults.
   * @param {String} [peerInfo.settings.bandwidth.data] The maximum
   *   sending data bandwidth bitrate in <var>kb/s</var>. If this is not provided,
   *   it will leave the data bitrate to the browser defaults.
   * @param {JSON} peerInfo.mediaStatus The Peer Stream mute
   *   settings for both audio and video streamings.
   * @param {Boolean} [peerInfo.mediaStatus.audioMuted=true] The flag that
   *   indicates if the remote Stream object audio streaming is muted. If
   *   there is no audio streaming enabled for the Peer, by default,
   *   it is set to <code>true</code>.
   * @param {Boolean} [peerInfo.mediaStatus.videoMuted=true] The flag that
   *   indicates if the remote Stream object video streaming is muted. If
   *   there is no video streaming enabled for the Peer, by default,
   *   it is set to <code>true</code>.
   * @param {JSON} peerInfo.agent The Peer platform agent information.
   * @param {String} peerInfo.agent.name The Peer platform browser or agent name.
   * @param {Number} peerInfo.agent.version The Peer platform browser or agent version.
   * @param {Number} peerInfo.agent.os The Peer platform name.
   * @param {String} peerInfo.room The current room that the Peer is in.
   * @component Events
   * @for Skylink
   * @since 0.5.5
   */
  incomingStream: [],

  /**
   * Event triggered when message data is received from Peer.
   * - This event may trigger for self when sending message data to Peer,
   *   which indicates that self has sent the message data.
   * @event incomingMessage
   * @param {JSON} message The message object received from Peer.
   * @param {JSON|String} message.content The message object content. This is the
   *   message data content passed in {{#crossLink "Skylink/sendMessage:method"}}sendMessage(){{/crossLink}}
   *   and {{#crossLink "Skylink/sendP2PMessage:method"}}sendP2PMessage(){{/crossLink}}.
   * @param {String} message.senderPeerId The Peer ID of the peer who
   *   sent the message object.
   * @param {String|Array} [message.targetPeerId=null] The array of targeted Peer
   *   peers or the single targeted Peer the message is
   *   targeted to received the message object. If the value is <code>null</code>, the message
   *   object is broadcasted to all Peer peers in the room.
   * @param {Boolean} message.isPrivate The flag that indicates if the message object is sent to
   *   targeted Peer peers and not broadcasted to all Peer peers.
   * @param {Boolean} message.isDataChannel The flag that indicates if the message object is sent
   *   from the platform signaling socket connection or P2P channel connection (DataChannel connection).
   * @param {String} peerId The Peer ID of peer who sent the
   *   message object.
   * @param {Object} peerInfo The peer information associated
   *   with the Peer Connection.
   * @param {String|JSON} peerInfo.userData The custom user data
   *   information set by developer. This custom user data can also
   *   be set in <a href="#method_setUserData">setUserData()</a>.
   * @param {JSON} peerInfo.settings The Peer Stream
   *   streaming settings information. If both audio and video
   *   option is <code>false</code>, there should be no
   *   receiving remote Stream object from this associated Peer.
   * @param {Boolean|JSON} [peerInfo.settings.audio=false] The
   *   Peer Stream streaming audio settings. If
   *   <code>false</code>, it means that audio streaming is disabled in
   *   the remote Stream of the Peer.
   * @param {Boolean} [peerInfo.settings.audio.stereo] The flag that indicates if
   *   stereo option should be explictly enabled to an OPUS enabled audio stream.
   *   Check the <code>audioCodec</code> configuration settings in
   *   <a href="#method_init">init()</a>
   *   to enable OPUS as the audio codec. Note that stereo is already enabled
   *   for OPUS codecs, this only adds a stereo flag to the SDP to explictly
   *   enable stereo in the audio streaming.
   * @param {Boolean|JSON} [peerInfo.settings.video=false] The Peer
   *   Stream streaming video settings. If <code>false</code>, it means that
   *   video streaming is disabled in the remote Stream of the Peer.
   * @param {JSON} [peerInfo.settings.video.resolution] The Peer
   *   Stream streaming video resolution settings. Setting the resolution may
   *   not force set the resolution provided as it depends on the how the
   *   browser handles the resolution. [Rel: Skylink.VIDEO_RESOLUTION]
   * @param {Number} [peerInfo.settings.video.resolution.width] The Peer
   *   Stream streaming video resolution width.
   * @param {Number} [peerInfo.settings.video.resolution.height] The Peer
   *   Stream streaming video resolution height.
   * @param {Number} [peerInfo.settings.video.frameRate] The Peer
   *   Stream streaming video maximum frameRate.
   * @param {Boolean} [peerInfo.settings.video.screenshare=false] The flag
   *   that indicates if the Peer connection Stream object sent
   *   is a screensharing stream or not.
   * @param {String} [peerInfo.settings.bandwidth] The Peer configuration for
   *   the maximum sending bandwidth. The flags set may or may not work depending
   *   on the browser implementations and how it handles it.
   * @param {String} [peerInfo.settings.bandwidth.audio] The maximum
   *   sending audio bandwidth bitrate in <var>kb/s</var>. If this is not provided,
   *   it will leave the audio bitrate to the browser defaults.
   * @param {String} [peerInfo.settings.bandwidth.video] The maximum
   *   sending video bandwidth bitrate in <var>kb/s</var>. If this is not provided,
   *   it will leave the video bitrate to the browser defaults.
   * @param {String} [peerInfo.settings.bandwidth.data] The maximum
   *   sending data bandwidth bitrate in <var>kb/s</var>. If this is not provided,
   *   it will leave the data bitrate to the browser defaults.
   * @param {JSON} peerInfo.mediaStatus The Peer Stream mute
   *   settings for both audio and video streamings.
   * @param {Boolean} [peerInfo.mediaStatus.audioMuted=true] The flag that
   *   indicates if the remote Stream object audio streaming is muted. If
   *   there is no audio streaming enabled for the Peer, by default,
   *   it is set to <code>true</code>.
   * @param {Boolean} [peerInfo.mediaStatus.videoMuted=true] The flag that
   *   indicates if the remote Stream object video streaming is muted. If
   *   there is no video streaming enabled for the Peer, by default,
   *   it is set to <code>true</code>.
   * @param {JSON} peerInfo.agent The Peer platform agent information.
   * @param {String} peerInfo.agent.name The Peer platform browser or agent name.
   * @param {Number} peerInfo.agent.version The Peer platform browser or agent version.
   * @param {Number} peerInfo.agent.os The Peer platform name.
   * @param {String} peerInfo.room The current room that the Peer is in.
   * @param {Boolean} isSelf The flag that indicates if self is the Peer.
   * @component Events
   * @for Skylink
   * @since 0.5.2
   */
  incomingMessage: [],

  /**
   * Event triggered when a data transfer is completed.
   * - This event may trigger for self when transferring data to Peer,
   *   which indicates that self has transferred the data successfully.
   * - For more extensive states like the outgoing and incoming
   *   data transfer progress and rejection of data transfer requests,
   *   you may subscribe to the <a href="#event_dataTransferState">dataTransferState</a> event.
   * - If <code>enableDataChannel</code> disabled in <a href="#method_init">init() configuration
   *   settings</a>, this event will not be triggered at all.
   * @event incomingData
   * @param {Blob|String} data The transferred data object.<br>
   *   For Blob data object, see the
   *   [createObjectURL](https://developer.mozilla.org/en-US/docs/Web/API/URL.createObjectURL)
   *   method on how you can convert the Blob data object to a download link.
   * @param {String} transferId The transfer ID of the completed data transfer.
   * @param {String} peerId The Peer ID associated with the data transfer.
   * @param {JSON} transferInfo The transfer data object information.
   * @param {String} [transferInfo.name=transferId] The transfer data object name.
   *   If there is no name based on the Blob given, the name would be the transfer ID.
   * @param {Number} transferInfo.size The transfer data size.
   * @param {String} transferInfo.dataType The type of data transfer initiated.
   *   Available types are <code>"dataURL"</code> and <code>"blob"</code>.
   * @param {String} transferInfo.timeout The waiting timeout in seconds that the DataChannel
   *   connection data transfer should wait before throwing an exception and terminating the data transfer.
   * @param {Boolean} transferInfo.isPrivate The flag to indicate if the data transferred
   *   targeted Peer peers and not broadcasted to all Peer peers.
   * @param {Boolean} isSelf The flag that indicates if the data transfer is from self or from
   *   associated Peer.
   * @component Events
   * @for Skylink
   * @since 0.6.1
   */
  incomingData: [],


  /**
   * Event triggered when there is a request to start a data transfer.
   * - This event may trigger for self when requesting a data transfer to Peer,
   *   which indicates that self has sent the data transfer request.
   * - For more extensive states like the outgoing and incoming
   *   data transfer progress and rejection of data transfer requests,
   *   you may subscribe to the <a href="#event_dataTransferState">dataTransferState</a> event.
   * - If <code>enableDataChannel</code> disabled in <a href="#method_init">init() configuration
   *   settings</a>, this event will not be triggered at all.
   * - <sub>DATA TRANSFER STAGE</sub><br>
   *   <small>
   *   <a href="#event_dataTransferState">dataTransferState</a> &#8594;
   *   <b>incomingDataRequest</b> &#8594;
   *   <a href="#event_incomingData">incomingData</a>
   *   </small>
   * @event incomingDataRequest
   * @param {String} transferId The transfer ID of the data transfer request.
   * @param {String} peerId The Peer ID associated with the data transfer request.
   * @param {JSON} transferInfo The transfer data object information.
   * @param {String} [transferInfo.name=transferId] The transfer data object name.
   *   If there is no name based on the Blob given, the name would be the transfer ID.
   * @param {Number} transferInfo.size The transfer data size.
   * @param {String} transferInfo.dataType The type of data transfer initiated.
   *   Available types are <code>"dataURL"</code> and <code>"blob"</code>.
   * @param {String} transferInfo.timeout The waiting timeout in seconds that the DataChannel
   *   connection data transfer should wait before throwing an exception and terminating the data transfer.
   * @param {Boolean} transferInfo.isPrivate The flag to indicate if the data transferred
   *   targeted Peer peers and not broadcasted to all Peer peers.
   * @param {Boolean} isSelf The flag that indicates if the data transfer request is from self or from
   *   associated Peer.
   * @component Events
   * @for Skylink
   * @since 0.6.1
   */
  incomingDataRequest: [],

  /**
   * Event triggered when the currently connected room lock status have been updated.
   * - If this event is triggered, this means that the room is locked / unlocked which
   *   may allow or prevent any other Peers from joining the room.
   * @event roomLock
   * @param {Boolean} isLocked The flag that indicates if the currently connected room is locked.
   * @param {String} peerId The Peer ID of the peer that updated the
   *   currently connected room lock status.
   * @param {Object} peerInfo The peer information associated
   *   with the Peer Connection.
   * @param {String|JSON} peerInfo.userData The custom user data
   *   information set by developer. This custom user data can also
   *   be set in <a href="#method_setUserData">setUserData()</a>.
   * @param {JSON} peerInfo.settings The Peer Stream
   *   streaming settings information. If both audio and video
   *   option is <code>false</code>, there should be no
   *   receiving remote Stream object from this associated Peer.
   * @param {Boolean|JSON} [peerInfo.settings.audio=false] The
   *   Peer Stream streaming audio settings. If
   *   <code>false</code>, it means that audio streaming is disabled in
   *   the remote Stream of the Peer.
   * @param {Boolean} [peerInfo.settings.audio.stereo] The flag that indicates if
   *   stereo option should be explictly enabled to an OPUS enabled audio stream.
   *   Check the <code>audioCodec</code> configuration settings in
   *   <a href="#method_init">init()</a>
   *   to enable OPUS as the audio codec. Note that stereo is already enabled
   *   for OPUS codecs, this only adds a stereo flag to the SDP to explictly
   *   enable stereo in the audio streaming.
   * @param {Boolean|JSON} [peerInfo.settings.video=false] The Peer
   *   Stream streaming video settings. If <code>false</code>, it means that
   *   video streaming is disabled in the remote Stream of the Peer.
   * @param {JSON} [peerInfo.settings.video.resolution] The Peer
   *   Stream streaming video resolution settings. Setting the resolution may
   *   not force set the resolution provided as it depends on the how the
   *   browser handles the resolution. [Rel: Skylink.VIDEO_RESOLUTION]
   * @param {Number} [peerInfo.settings.video.resolution.width] The Peer
   *   Stream streaming video resolution width.
   * @param {Number} [peerInfo.settings.video.resolution.height] The Peer
   *   Stream streaming video resolution height.
   * @param {Number} [peerInfo.settings.video.frameRate] The Peer
   *   Stream streaming video maximum frameRate.
   * @param {Boolean} [peerInfo.settings.video.screenshare=false] The flag
   *   that indicates if the Peer connection Stream object sent
   *   is a screensharing stream or not.
   * @param {String} [peerInfo.settings.bandwidth] The Peer configuration for
   *   the maximum sending bandwidth. The flags set may or may not work depending
   *   on the browser implementations and how it handles it.
   * @param {String} [peerInfo.settings.bandwidth.audio] The maximum
   *   sending audio bandwidth bitrate in <var>kb/s</var>. If this is not provided,
   *   it will leave the audio bitrate to the browser defaults.
   * @param {String} [peerInfo.settings.bandwidth.video] The maximum
   *   sending video bandwidth bitrate in <var>kb/s</var>. If this is not provided,
   *   it will leave the video bitrate to the browser defaults.
   * @param {String} [peerInfo.settings.bandwidth.data] The maximum
   *   sending data bandwidth bitrate in <var>kb/s</var>. If this is not provided,
   *   it will leave the data bitrate to the browser defaults.
   * @param {JSON} peerInfo.mediaStatus The Peer Stream mute
   *   settings for both audio and video streamings.
   * @param {Boolean} [peerInfo.mediaStatus.audioMuted=true] The flag that
   *   indicates if the remote Stream object audio streaming is muted. If
   *   there is no audio streaming enabled for the Peer, by default,
   *   it is set to <code>true</code>.
   * @param {Boolean} [peerInfo.mediaStatus.videoMuted=true] The flag that
   *   indicates if the remote Stream object video streaming is muted. If
   *   there is no video streaming enabled for the Peer, by default,
   *   it is set to <code>true</code>.
   * @param {JSON} peerInfo.agent The Peer platform agent information.
   * @param {String} peerInfo.agent.name The Peer platform browser or agent name.
   * @param {Number} peerInfo.agent.version The Peer platform browser or agent version.
   * @param {Number} peerInfo.agent.os The Peer platform name.
   * @param {String} peerInfo.room The current room that the Peer is in.
   * @param {Boolean} isSelf The flag that indicates if self is the Peer.
   * @component Events
   * @for Skylink
   * @since 0.5.2
   */
  roomLock: [],

  /**
   * Event triggered when a Peer connection DataChannel connection state has changed.
   * - This event is a debugging feature, and it's used to check the
   *   Peer DataChannel connection, which is used for P2P messaging and transfers for
   *   methods like <a href="#method_sendBlobData">sendBlobData()</a>,
   *   <a href="#method_sendURLData">sendURLData()</a> and
   *   <a href="#method_sendP2PMessage">sendP2PMessage()</a>.
   * - If <code>enableDataChannel</code> disabled in <a href="#method_init">init() configuration
   *   settings</a>, this event will not be triggered at all.
   * @event dataChannelState
   * @param {String} state The current DataChannel connection state.
   *   [Rel: Skylink.DATA_CHANNEL_STATE]
   * @param {String} peerId The Peer ID associated with the current DataChannel connection state.
   * @param {Object} [error=null] The error object thrown when there is a failure in
   *   the DataChannel connection.
   *   If received as <code>null</code>, it means that there is no errors.
   * @param {String} channelName The DataChannel connection ID.
   * @param {String} channelType The DataChannel connection functionality type.
   *   [Rel: Skylink.DATA_CHANNEL_TYPE]
   * @component Events
   * @for Skylink
   * @since 0.1.0
   */
  dataChannelState: [],

  /**
   * The event triggered when a data transfer state has changed.
   * @event dataTransferState
   * @param {String} state The data transfer state. [Rel: Skylink.DATA_TRANSFER_STATE]
   * @param {String} transferId The data transfer ID.
   * @param {String} peerId The Peer ID targeted for the data transfer.
   * @param {JSON} transferInfo The data transfer information.
   * @param {Blob|String} transferInfo.data <blockquote class="info">
   *    Use [<code>URL.createObjectURL()</code> method](https://developer.mozilla.org/en-US/docs/Web/API/URL.createObjectURL)
   *    to append Blob data as a download link <code>&lt;a href="<blobURL>" download="blobName"&gt;
   * Download File&lt;/a&gt;.</code></blockquote>
   *   The data transfer data based off the <code>data</code> parameter in method used to start data transfer.
   *   <small>Defined when <code>state</code> payload parameter value is <code>DOWNLOAD_COMPLETED</code> and
   *     <code>UPLOAD_STARTED</code>, else its value is <code>null</code>.</small>
   * @param {String} transferInfo.name The data transfer <code>data</code> Blob name.
   *   If data transfer data type is String or Blob name is not defined, the value will
   *   be the same as of the <code>transferId</code> value.
   * @param {Number} transferInfo.size The data transfer Blob size or String length.
   * @param {String} transferInfo.dataType The data transfer transfer type.
   *   <ul>
   *     <li><code>"dataURL"</code>: The data transfer was made using <a href="#method_sendURLData">
   * <code>sendURLData()</code> method</a></li>
   *     <li><code>"blob"</code>: The data transfer was made using <a href="#method_sendBlobData">
   * <code>sendBlobData()</code> method</a></li>
   *   </ul>
   * @param {Number} transferInfo.timeout The response timeout as provided in the <code>timeout</code>
   *   parameter in method used to start data transfer.
   * @param {Boolean} transferInfo.isPrivate The flag that indicates if data transfer is targeted or not, based
   *   off the <code>targetPeerId</code> parameter being defined in method used to start data transfer.
   * @param {JSON} [error] The error result when data transfer results in failure.
   * @param {Error|String} error.message The error message.
   * @param {String} error.transferType The direction of the failure. [Rel: Skylink.DATA_TRANSFER_TYPE]
   * @for Skylink
   * @since 0.4.1
   */
  dataTransferState: [],

  /**
   * Event triggered when Skylink receives an system action from the platform signaling.
   * @event systemAction
   * @param {String} action The system action that is received from the platform signaling.
   *   [Rel: Skylink.SYSTEM_ACTION]
   * @param {String} message The message received from the platform signaling when
   *   the system action and reason is given.
   * @param {String} reason The reason received from the platform signaling behind the
   *   system action given.
   *   [Rel: Skylink.SYSTEM_ACTION_REASON]
   * @component Events
   * @for Skylink
   * @since 0.5.1
   */
  systemAction: [],

  /**
   * Event triggered when a server Peer joins the room.
   * @event serverPeerJoined
   * @param {String} peerId The Peer ID of the new server peer
   *   that has joined the room.
   * @param {String} serverPeerType The server Peer type
   *   [Rel: Skylink.SERVER_PEER_TYPE]
   * @component Events
   * @for Skylink
   * @since 0.6.1
   */
  serverPeerJoined: [],

  /**
   * Event triggered when a server Peer leaves the room.
   * @event serverPeerLeft
   * @param {String} peerId The Peer ID of the new server peer
   *   that has left the room.
   * @param {String} serverPeerType The server Peer type
   *   [Rel: Skylink.SERVER_PEER_TYPE]
   * @component Events
   * @for Skylink
   * @since 0.6.1
   */
  serverPeerLeft: [],

  /**
   * Event triggered when a sever Peer connection has been restarted for
   *   a reconnection.
   * @event serverPeerRestart
   * @param {String} peerId The Peer ID of the new server peer
   *   that has joined the room.
   * @param {String} serverPeerType The server Peer type
   *   [Rel: Skylink.SERVER_PEER_TYPE]
   * @component Events
   * @for Skylink
   * @since 0.6.1
   */
  serverPeerRestart: [],

  /**
   * Event triggered when a Peer connection Stream streaming has stopped.
   * @event streamEnded
   * @param {String} [peerId=null] The Peer ID associated to the Stream object.
   *   If self is not in the room, the value returned would be <code>null</code>.
   * @param {Object} peerInfo The peer information associated
   *   with the Peer Connection.
   * @param {String|JSON} peerInfo.userData The custom user data
   *   information set by developer. This custom user data can also
   *   be set in <a href="#method_setUserData">setUserData()</a>.
   * @param {JSON} peerInfo.settings The Peer Stream
   *   streaming settings information. If both audio and video
   *   option is <code>false</code>, there should be no
   *   receiving remote Stream object from this associated Peer.
   * @param {Boolean|JSON} [peerInfo.settings.audio=false] The
   *   Peer Stream streaming audio settings. If
   *   <code>false</code>, it means that audio streaming is disabled in
   *   the remote Stream of the Peer.
   * @param {Boolean} [peerInfo.settings.audio.stereo] The flag that indicates if
   *   stereo option should be explictly enabled to an OPUS enabled audio stream.
   *   Check the <code>audioCodec</code> configuration settings in
   *   <a href="#method_init">init()</a>
   *   to enable OPUS as the audio codec. Note that stereo is already enabled
   *   for OPUS codecs, this only adds a stereo flag to the SDP to explictly
   *   enable stereo in the audio streaming.
   * @param {Boolean|JSON} [peerInfo.settings.video=false] The Peer
   *   Stream streaming video settings. If <code>false</code>, it means that
   *   video streaming is disabled in the remote Stream of the Peer.
   * @param {JSON} [peerInfo.settings.video.resolution] The Peer
   *   Stream streaming video resolution settings. Setting the resolution may
   *   not force set the resolution provided as it depends on the how the
   *   browser handles the resolution. [Rel: Skylink.VIDEO_RESOLUTION]
   * @param {Number} [peerInfo.settings.video.resolution.width] The Peer
   *   Stream streaming video resolution width.
   * @param {Number} [peerInfo.settings.video.resolution.height] The Peer
   *   Stream streaming video resolution height.
   * @param {Number} [peerInfo.settings.video.frameRate] The Peer
   *   Stream streaming video maximum frameRate.
   * @param {Boolean} [peerInfo.settings.video.screenshare=false] The flag
   *   that indicates if the Peer connection Stream object sent
   *   is a screensharing stream or not.
   * @param {String} [peerInfo.settings.bandwidth] The Peer configuration for
   *   the maximum sending bandwidth. The flags set may or may not work depending
   *   on the browser implementations and how it handles it.
   * @param {String} [peerInfo.settings.bandwidth.audio] The maximum
   *   sending audio bandwidth bitrate in <var>kb/s</var>. If this is not provided,
   *   it will leave the audio bitrate to the browser defaults.
   * @param {String} [peerInfo.settings.bandwidth.video] The maximum
   *   sending video bandwidth bitrate in <var>kb/s</var>. If this is not provided,
   *   it will leave the video bitrate to the browser defaults.
   * @param {String} [peerInfo.settings.bandwidth.data] The maximum
   *   sending data bandwidth bitrate in <var>kb/s</var>. If this is not provided,
   *   it will leave the data bitrate to the browser defaults.
   * @param {JSON} peerInfo.mediaStatus The Peer Stream mute
   *   settings for both audio and video streamings.
   * @param {Boolean} [peerInfo.mediaStatus.audioMuted=true] The flag that
   *   indicates if the remote Stream object audio streaming is muted. If
   *   there is no audio streaming enabled for the Peer, by default,
   *   it is set to <code>true</code>.
   * @param {Boolean} [peerInfo.mediaStatus.videoMuted=true] The flag that
   *   indicates if the remote Stream object video streaming is muted. If
   *   there is no video streaming enabled for the Peer, by default,
   *   it is set to <code>true</code>.
   * @param {JSON} peerInfo.agent The Peer platform agent information.
   * @param {String} peerInfo.agent.name The Peer platform browser or agent name.
   * @param {Number} peerInfo.agent.version The Peer platform browser or agent version.
   * @param {Number} peerInfo.agent.os The Peer platform name.
   * @param {String} peerInfo.room The current room that the Peer is in.
   * @param {Boolean} isSelf The flag that indicates if self is the Peer.
   * @param {Boolean} isScreensharing The flag that indicates if Peer connection
   *    Stream object is a screensharing stream or not.
   * @component Events
   * @for Skylink
   * @since 0.5.10
   */
  streamEnded: [],

  /**
   * Event triggered when a Peer connection Stream streaming audio or video
   *   stream muted status have been updated.
   * @event streamMuted
   * @param {String} peerId The Peer ID associated to the Stream object.
   *   If self is not in the room, the value returned would be <code>null</code>.
   * @param {Object} peerInfo The peer information associated
   *   with the Peer Connection.
   * @param {String|JSON} peerInfo.userData The custom user data
   *   information set by developer. This custom user data can also
   *   be set in <a href="#method_setUserData">setUserData()</a>.
   * @param {JSON} peerInfo.settings The Peer Stream
   *   streaming settings information. If both audio and video
   *   option is <code>false</code>, there should be no
   *   receiving remote Stream object from this associated Peer.
   * @param {Boolean|JSON} [peerInfo.settings.audio=false] The
   *   Peer Stream streaming audio settings. If
   *   <code>false</code>, it means that audio streaming is disabled in
   *   the remote Stream of the Peer.
   * @param {Boolean} [peerInfo.settings.audio.stereo] The flag that indicates if
   *   stereo option should be explictly enabled to an OPUS enabled audio stream.
   *   Check the <code>audioCodec</code> configuration settings in
   *   <a href="#method_init">init()</a>
   *   to enable OPUS as the audio codec. Note that stereo is already enabled
   *   for OPUS codecs, this only adds a stereo flag to the SDP to explictly
   *   enable stereo in the audio streaming.
   * @param {Boolean|JSON} [peerInfo.settings.video=false] The Peer
   *   Stream streaming video settings. If <code>false</code>, it means that
   *   video streaming is disabled in the remote Stream of the Peer.
   * @param {JSON} [peerInfo.settings.video.resolution] The Peer
   *   Stream streaming video resolution settings. Setting the resolution may
   *   not force set the resolution provided as it depends on the how the
   *   browser handles the resolution. [Rel: Skylink.VIDEO_RESOLUTION]
   * @param {Number} [peerInfo.settings.video.resolution.width] The Peer
   *   Stream streaming video resolution width.
   * @param {Number} [peerInfo.settings.video.resolution.height] The Peer
   *   Stream streaming video resolution height.
   * @param {Number} [peerInfo.settings.video.frameRate] The Peer
   *   Stream streaming video maximum frameRate.
   * @param {Boolean} [peerInfo.settings.video.screenshare=false] The flag
   *   that indicates if the Peer connection Stream object sent
   *   is a screensharing stream or not.
   * @param {String} [peerInfo.settings.bandwidth] The Peer configuration for
   *   the maximum sending bandwidth. The flags set may or may not work depending
   *   on the browser implementations and how it handles it.
   * @param {String} [peerInfo.settings.bandwidth.audio] The maximum
   *   sending audio bandwidth bitrate in <var>kb/s</var>. If this is not provided,
   *   it will leave the audio bitrate to the browser defaults.
   * @param {String} [peerInfo.settings.bandwidth.video] The maximum
   *   sending video bandwidth bitrate in <var>kb/s</var>. If this is not provided,
   *   it will leave the video bitrate to the browser defaults.
   * @param {String} [peerInfo.settings.bandwidth.data] The maximum
   *   sending data bandwidth bitrate in <var>kb/s</var>. If this is not provided,
   *   it will leave the data bitrate to the browser defaults.
   * @param {JSON} peerInfo.mediaStatus The Peer Stream mute
   *   settings for both audio and video streamings.
   * @param {Boolean} [peerInfo.mediaStatus.audioMuted=true] The flag that
   *   indicates if the remote Stream object audio streaming is muted. If
   *   there is no audio streaming enabled for the Peer, by default,
   *   it is set to <code>true</code>.
   * @param {Boolean} [peerInfo.mediaStatus.videoMuted=true] The flag that
   *   indicates if the remote Stream object video streaming is muted. If
   *   there is no video streaming enabled for the Peer, by default,
   *   it is set to <code>true</code>.
   * @param {JSON} peerInfo.agent The Peer platform agent information.
   * @param {String} peerInfo.agent.name The Peer platform browser or agent name.
   * @param {Number} peerInfo.agent.version The Peer platform browser or agent version.
   * @param {Number} peerInfo.agent.os The Peer platform name.
   * @param {String} peerInfo.room The current room that the Peer is in.
   * @param {Boolean} isSelf The flag that indicates if self is the Peer.
   * @param {Boolean} isScreensharing The flag that indicates if Peer connection
   *    Stream object is a screensharing stream or not.
   * @component Events
   * @for Skylink
   * @since 0.6.1
   */
  streamMuted: [],

  /**
   * Event triggered when the retrieval of the list of rooms and peers under the same realm based
   *   on the Application Key configured in <a href="#method_init">init()</a>
   *   from the platform signaling state has changed.
   * - This requires that the provided alias Application Key has privileged feature configured.
   * @event getPeersStateChange
   * @param {String} state The retrieval current status.
   *   [Rel: Skylink.GET_PEERS_STATE]
   * @param {String} privilegedPeerId The Peer ID of the privileged Peer.
   * @param {JSON} peerList The retrieved list of rooms and peers under the same realm based on
   *   the Application Key configured in <code>init()</code>.
   * @component Events
   * @for Skylink
   * @since 0.6.1
   */
  getPeersStateChange: [],

  /**
   * Event triggered when introductory state of two Peer peers to each other
   *   selected by the privileged Peer state has changed.
   * - This requires that the provided alias Application Key has privileged feature configured.
   * @event introduceStateChange
   * @param {String} state The Peer introduction state.
   *   [Rel: Skylink.INTRODUCE_STATE]
   * @param {String} privilegedPeerId The Peer ID of the privileged Peer.
   * @param {String} sendingPeerId The Peer ID of the peer
   *   that initiates the connection with the introduced Peer.
   * @param {String} receivingPeerId The Peer ID of the
   *   introduced peer who would be introduced to the initiator Peer.
   * @param {String} reason The error object thrown when there is a failure in
   *   the introduction with the two Peer peers.
   *   If received as <code>null</code>, it means that there is no errors.
   * @component Events
   * @for Skylink
   * @since 0.6.1
   */
  introduceStateChange: [],

  /**
   * Event triggered when the retrieval of the Peer connection status state has changed.
   * @event getConnectionStatusStateChange
   * @param {Number} state The retrieval state of the Peer connection status.
   *   [Rel: Skylink.GET_CONNECTION_STATUS_STATE]
   * @param {String} peerId The Peer ID of the peer connection status.
   * @param {JSON} stats The Peer retrieved connection stats.
   *   Returned as <code>null</code> unless <code>RETRIEVE_SUCCESS</code> state.
   * @param {JSON} stats.raw The received raw connection stats data before parsing.
   * @param {JSON} stats.audio The Peer connection audio stats.
   * @param {JSON} stats.audio.sending The Peer connection audio sending stats.
   * @param {Number} stats.audio.sending.bytes The Peer connection audio sending bytes.
   * @param {Number} stats.audio.sending.packets The Peer
   *   connection audio sending packets.
   * @param {Number} stats.audio.sending.packetsLost The Peer
   *   connection audio sending packets lost.
   * @param {Number} stats.audio.sending.ssrc The Peer
   *   connection audio sending ssrc.
   * @param {Number} stats.audio.sending.rtt The Peer
   *   connection audio sending RTT (Round-trip delay time). This will be defined as <code>0</code> if it's not
   *   defined in the original raw stats data.
   * @param {JSON} stats.audio.receiving The Peer connection audio receiving stats.
   * @param {Number} stats.audio.receiving.bytes The Peer connection audio receiving bytes.
   * @param {Number} stats.audio.receiving.packets The Peer
   *   connection audio receiving packets.
   * @param {Number} stats.audio.receiving.packetsLost The Peer
   *   connection audio receiving packets lost.
   * @param {Number} stats.audio.receiving.ssrc The Peer
   *   connection audio receiving ssrc.
   * @param {JSON} stats.video The Peer connection video stats.
   * @param {JSON} stats.video.sending The Peer connection video sending stats.
   * @param {Number} stats.video.sending.bytes The Peer connection video sending bytes.
   * @param {Number} stats.video.sending.packets The Peer
   *   connection video sending packets.
   * @param {Number} stats.video.sending.packetsLost The Peer
   *   connection video sending packets lost.
   * @param {JSON} stats.video.sending.ssrc The Peer
   *   connection video sending ssrc ID.
   * @param {Number} stats.video.sending.rtt The Peer
   *   connection video sending RTT (Round-trip delay time). This will be defined as <code>0</code> if it's not
   *   defined in the original raw stats data.
   * @param {JSON} stats.video.receiving The Peer connection video receiving stats.
   * @param {Number} stats.video.receiving.bytes The Peer connection video receiving bytes.
   * @param {Number} stats.video.receiving.packets The Peer
   *   connection video receiving packets.
   * @param {Number} stats.video.receiving.packetsLost The Peer
   *   connection video receiving packets lost.
   * @param {Number} stats.video.receiving.ssrc The Peer
   *   connection video receiving ssrc.
   * @param {JSON} stats.selectedCandidate The Peer connection selected candidate
   *   pair details.
   * @param {JSON} stats.selectedCandidate.local The Peer connection
   *   selected local candidate.
   * @param {String} stats.selectedCandidate.local.ipAddress The Peer connection
   *   selected local candidate IP address.
   * @param {Number} stats.selectedCandidate.local.portNumber The Peer connection
   *   selected local candidate port number.
   * @param {String} stats.selectedCandidate.local.transport The Peer connection
   *   selected local candidate transport.
   * @param {String} stats.selectedCandidate.local.candidateType The Peer connection
   *   selected local candidate candidate type.
   * @param {JSON} stats.selectedCandidate.remote The Peer connection
   *   selected remote candidate.
   * @param {String} stats.selectedCandidate.remote.ipAddress The Peer connection
   *   selected remote candidate IP address.
   * @param {Number} stats.selectedCandidate.remote.portNumber The Peer connection
   *   selected remote candidate port number.
   * @param {String} stats.selectedCandidate.remote.transport The Peer connection
   *   selected remote candidate transport.
   * @param {String} stats.selectedCandidate.remote.candidateType The Peer connection
   *   selected remote candidate candidate type.
   * @param {JSON} stats.connection The Peer connection details.
   * @param {String} stats.connection.iceConnectionState The Peer connection ICE
   *   connection state.
   * @param {String} stats.connection.iceGatheringState The Peer connection ICE
   *   gathering state.
   * @param {String} stats.connection.signalingState The Peer connection
   *   signaling state.
   * @param {JSON} stats.connection.localDescription The Peer connection
   *   local session description.
   * @param {String} stats.connection.localDescription.type The Peer connection
   *   local session description type.
   * @param {String} stats.connection.localDescription.sdp The Peer connection
   *   local session description sdp.
   * @param {JSON} stats.connection.remoteDescription The Peer connection
   *   remote session description.
   * @param {String} stats.connection.remoteDescription.type The Peer connection
   *   remote session description type.
   * @param {String} stats.connection.remoteDescription.sdp The Peer connection
   *   remote session description sdp.
   * @param {JSON} stats.connection.candidates The Peer connection list of
   *   candidates received or sent.
   * @param {JSON} stats.connection.candidates.sending The Peer connection list of
   *   candidates sent.
   * @param {Array} stats.connection.candidates.sending.host The Peer connection list of
   *   <code>"host"</code> candidates sent.
   * @param {JSON} stats.connection.candidates.sending.host.(#index) The <code>"host"</code>
   *   candidate sent.
   * @param {Array} stats.connection.candidates.sending.srflx The Peer connection list of
   *   <code>"srflx"</code> candidates sent.
   * @param {JSON} stats.connection.candidates.sending.srflx.(#index) The <code>"srflx"</code>
   *   candidate sent.
   * @param {Array} stats.connection.candidates.sending.relay The Peer connection list of
   *   <code>"relay"</code> candidates sent.
   * @param {JSON} stats.connection.candidates.sending.relay.(#index) The <code>"relay"</code>
   *   candidate sent.
   * @param {JSON} stats.connection.candidates.receiving The Peer connection list of
   *   candidates received.
   * @param {Array} stats.connection.candidates.receiving.host The Peer connection list of
   *   <code>"host"</code> candidates received.
   * @param {JSON} stats.connection.candidates.receiving.host.(#index) The <code>"host"</code>
   *   candidate received.
   * @param {Array} stats.connection.candidates.receiving.srflx The Peer connection list of
   *   <code>"srflx"</code> candidates received.
   * @param {JSON} stats.connection.candidates.receiving.srflx.(#index) The <code>"srflx"</code>
   *   candidate received.
   * @param {Array} stats.connection.candidates.receiving.relay The Peer connection list of
   *   <code>"relay"</code> candidates received.
   * @param {JSON} stats.connection.candidates.receiving.relay.(#index) The <code>"relay"</code>
   *   candidate received.
   * @param {Error} error The Error object received when failed retrieving the
   *   Peer connection status.
   * @component Events
   * @for Skylink
   * @since 0.6.14
   */
  getConnectionStatusStateChange: []
};

/**
 * Stores the list of <code>once()</code> event handlers.
 * These events are only triggered once.
 * @attribute _onceEvents
 * @param {Array} <#event> The list of event handlers associated with the event.
 * @param {Array} <#event>.<#index> The array of event handler function and its condition function.
 * @type JSON
 * @private
 * @for Skylink
 * @since 0.5.4
 */
Skylink.prototype._onceEvents = {};

/**
 * Stores the timestamps data used for throttling.
 * @attribute _timestamp
 * @type JSON
 * @private
 * @for Skylink
 * @since 0.5.8
 */
Skylink.prototype._timestamp = {
  now: Date.now() || function() { return +new Date(); },
  screen: false
};

/**
 * Subscribes an event handler associated to the event name.
 * This event handler will always be triggered when the event name is triggered. If you
 *   are looking for subscription event handler to be triggered once, check out
 *   {{#crossLink "Skylink/once:method"}}once() event subscription{{/crossLink}}.
 * @method on
 * @param {String} eventName The Skylink event name to subscribe to.
 * @param {Function} callback The event handler to subsribe to the associated
 *   Skylink event name that would be triggered once the event name is triggered.
 * @example
 *   SkylinkDemo.on("peerJoined", function (peerId, peerInfo) {
 *      alert(peerId + " has joined the room");
 *   });
 * @component Events
 * @for Skylink
 * @since 0.1.0
 */
Skylink.prototype.on = function(eventName, callback) {
  if ('function' === typeof callback) {
    this._EVENTS[eventName] = this._EVENTS[eventName] || [];
    this._EVENTS[eventName].push(callback);
    log.log([null, 'Event', eventName, 'Event is subscribed']);
  } else {
    log.error([null, 'Event', eventName, 'Provided parameter is not a function']);
  }
};

/**
 * Subscribes an event handler associated to the event name that
 *    would only be triggered once the provided condition function has been met.
 * @method once
 * @param {String} eventName The Skylink event name to subscribe to.
 * @param {Function} callback The event handler to subscribe to the associated
 *   Skylink event name to trigger once the condition has met. If
 *   <code>fireAlways</code> option is set toe <code>true</code>, this will
 *   always be fired when condition is met.
 * @param {Function} [condition] The condition function that once the condition has
 *   been met, trigger the event handler once. Return in the condition function <code>true</code>
 *   to pass as meeting the condition.
 *   If the condition function is not provided, the event handler will be triggered
 *     once the Skylink event name is triggered.
 * @param {Boolean} [fireAlways=false] The flag that indicates if Skylink should interrupt this
 *   <code>once()</code> function once the function has been triggered to not unsubscribe the
 *   event handler but to always trigger when the condition has been met.
 * @example
 *   SkylinkDemo.once("peerConnectionState", function (state, peerId) {
 *     alert("Peer has left");
 *   }, function (state, peerId) {
 *     return state === SkylinkDemo.PEER_CONNECTION_STATE.CLOSED;
 *   });
 * @component Events
 * @for Skylink
 * @since 0.5.4
 */
Skylink.prototype.once = function(eventName, callback, condition, fireAlways) {
  if (typeof condition === 'boolean') {
    fireAlways = condition;
    condition = null;
  }
  fireAlways = (typeof fireAlways === 'undefined' ? false : fireAlways);
  condition = (typeof condition !== 'function') ? function () {
    return true;
  } : condition;

  if (typeof callback === 'function') {

    this._EVENTS[eventName] = this._EVENTS[eventName] || [];
    // prevent undefined error
    this._onceEvents[eventName] = this._onceEvents[eventName] || [];
    this._onceEvents[eventName].push([callback, condition, fireAlways]);
    log.log([null, 'Event', eventName, 'Event is subscribed on condition']);
  } else {
    log.error([null, 'Event', eventName, 'Provided callback is not a function']);
  }
};

/**
 * Unsubscribes an event handler associated to the event name.
 * @method off
 * @param {String} eventName The Skylink event name to unsubscribe to.
 * @param {Function} [callback] The event handler to unsubscribe to the associated
 *   Skylink event name. If the event handler is not provided, Skylink would
 *   unsubscribe all event handlers subscribed to the associated event name.
 * @example
 *   // Example 1: Unsubscribe all event handlers related to the event
 *   SkylinkDemo.off("peerJoined");
 *
 *   // Example 2: Unsubscribe to one event handler
 *   SkylinkDemo.off("peerJoined", callback);
 * @component Events
 * @for Skylink
 * @since 0.5.5
 */
Skylink.prototype.off = function(eventName, callback) {
  if (callback === undefined) {
    this._EVENTS[eventName] = [];
    this._onceEvents[eventName] = [];
    log.log([null, 'Event', eventName, 'All events are unsubscribed']);
    return;
  }
  var arr = this._EVENTS[eventName];
  var once = this._onceEvents[eventName];

  // unsubscribe events that is triggered always
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === callback) {
      log.log([null, 'Event', eventName, 'Event is unsubscribed']);
      arr.splice(i, 1);
      break;
    }
  }
  // unsubscribe events fired only once
  if(once !== undefined) {
    for (var j = 0; j < once.length; j++) {
      if (once[j][0] === callback) {
        log.log([null, 'Event', eventName, 'One-time Event is unsubscribed']);
        once.splice(j, 1);
        break;
      }
    }
  }
};

/**
 * Function that triggers an event.
 * The rest of the parameters after the <code>eventName</code> parameter is considered as the event parameter payloads.
 * @method _trigger
 * @private
 * @for Skylink
 * @since 0.1.0
 */
Skylink.prototype._trigger = function(eventName) {
  //convert the arguments into an array
  var args = Array.prototype.slice.call(arguments);
  var arr = this._EVENTS[eventName];
  var once = this._onceEvents[eventName] || null;
  args.shift(); //Omit the first argument since it's the event name
  if (arr) {
    // for events subscribed forever
    for (var i = 0; i < arr.length; i++) {
      try {
        log.log([null, 'Event', eventName, 'Event is fired']);
        if(arr[i].apply(this, args) === false) {
          break;
        }
      } catch(error) {
        log.error([null, 'Event', eventName, 'Exception occurred in event:'], error);
        throw error;
      }
    }
  }
  if (once){
    // for events subscribed on once
    for (var j = 0; j < once.length; j++) {
      if (once[j][1].apply(this, args) === true) {
        log.log([null, 'Event', eventName, 'Condition is met. Firing event']);
        if(once[j][0].apply(this, args) === false) {
          break;
        }
        if (!once[j][2]) {
          log.log([null, 'Event', eventName, 'Removing event after firing once']);
          once.splice(j, 1);
          //After removing current element, the next element should be element of the same index
          j--;
        }
      } else {
        log.log([null, 'Event', eventName, 'Condition is still not met. ' +
          'Holding event from being fired']);
      }
    }
  }

  log.log([null, 'Event', eventName, 'Event is triggered']);
};



/**
 * Function that checks if the current state condition is met before subscribing
 *   event handler to wait for condition to be fulfilled.
 * @method _condition
 * @private
 * @for Skylink
 * @since 0.5.5
 */
Skylink.prototype._condition = function(eventName, callback, checkFirst, condition, fireAlways) {
  if (typeof condition === 'boolean') {
    fireAlways = condition;
    condition = null;
  }
  if (typeof callback === 'function' && typeof checkFirst === 'function') {
    if (checkFirst()) {
      log.log([null, 'Event', eventName, 'First condition is met. Firing callback']);
      callback();
      return;
    }
    log.log([null, 'Event', eventName, 'First condition is not met. Subscribing to event']);
    this.once(eventName, callback, condition, fireAlways);
  } else {
    log.error([null, 'Event', eventName, 'Provided callback or checkFirst is not a function']);
  }
};

/**
 * Function that starts an interval check to wait for a condition to be resolved.
 * @method _wait
 * @private
 * @for Skylink
 * @since 0.5.5
 */
Skylink.prototype._wait = function(callback, condition, intervalTime, fireAlways) {
  fireAlways = (typeof fireAlways === 'undefined' ? false : fireAlways);
  if (typeof callback === 'function' && typeof condition === 'function') {
    if (condition()) {
      log.log([null, 'Event', null, 'Condition is met. Firing callback']);
      callback();
      return;
    }
    log.log([null, 'Event', null, 'Condition is not met. Doing a check.']);

    intervalTime = (typeof intervalTime === 'number') ? intervalTime : 50;

    var doWait = setInterval(function () {
      if (condition()) {
        log.log([null, 'Event', null, 'Condition is met after waiting. Firing callback']);
        if (!fireAlways){
          clearInterval(doWait);
        }
        callback();
      }
    }, intervalTime);
  } else {
    if (typeof callback !== 'function'){
      log.error([null, 'Event', null, 'Provided callback is not a function']);
    }
    if (typeof condition !== 'function'){
      log.error([null, 'Event', null, 'Provided condition is not a function']);
    }
  }
};

/**
 * Function that throttles a method function to prevent multiple invokes over a specified amount of time.
 * Returns a function to be invoked <code>._throttle(fn, 1000)()</code> to make throttling functionality work.
 * @method _throttle
 * @private
 * @for Skylink
 * @since 0.5.8
 */
Skylink.prototype._throttle = function(func, wait){
  var self = this;
  return function () {
      if (!self._timestamp.func){
        //First time run, need to force timestamp to skip condition
        self._timestamp.func = self._timestamp.now - wait;
      }
      var now = Date.now();
      if (now - self._timestamp.func < wait) {
          return;
      }
      func.apply(self, arguments);
      self._timestamp.func = now;
  };
};