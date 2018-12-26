export default function VideoObserver(selector) {

    //Variables

    const video = document.querySelector(selector);
    let isReady = false;

    //Callbacks

    let onReady = [];
    let onResolutionChange = [];

    //Initializations

    _checkVideo();
    _initListeners();

    //Public methods

    function on(event, callback) {
        const localEvent = 'on' + _capitalizeFirstLetter(event);

        switch(localEvent) {
            case 'onResolutionChange':
                onResolutionChange.push(callback);
                break;
            case 'onReady':
                onReady.push(callback);

                setTimeout(function () {
                    if (isReady) {
                        _executeCallbacks([callback], []);
                    }
                }, 20);

                break;
        }
    }

    function off(event, callback) {
        if (event === undefined) {
            onResolutionChange = [];
        }

        const localEvent = 'on' + _capitalizeFirstLetter(event);

        switch(localEvent) {
            case 'onResolutionChange':
                onResolutionChange = _removeCallbackToEventCallbacks(callback, onResolutionChange);
                break;
            case 'onReady':
                onReady = _removeCallbackToEventCallbacks(callback, onReady);
                break;
        }
    }

    //Listeners

    function _initListeners() {
        _resolutionListener();
        _readyListener();
    }

    function _resolutionListener() {
        video.addEventListener('loadedmetadata', function(event) {
            event.target.dataset.width = event.target.videoWidth;
            event.target.dataset.height = event.target.videoHeight;
        });

        video.addEventListener('timeupdate', function(event) {
            if (+event.target.dataset.width !== event.target.videoWidth && +event.target.dataset.height !== event.target.videoHeight) { // if `event.target` `.videoWidth` or `.videoHeight` changed
                event.target.dataset.width = event.target.videoWidth;
                event.target.dataset.height = event.target.videoHeight;

                _checkReady(video)
                    .then(function () {
                        const resolution = {
                            width: event.target.videoWidth,
                            height: event.target.videoHeight
                        };

                        _executeCallbacks(onResolutionChange, [resolution, event], event.target);
                    })
                    .catch(function (error) {
                        throw error;
                    });
            }
        });
    }

    function _readyListener() {
        function onLoadStart() {
            isReady = false;

            _checkReady(video)
                .then(function () {
                    isReady = true;

                    _executeCallbacks(onReady, []);
                })
                .catch(function (error) {
                    _executeCallbacks(onReady, [error]);
                });
        }

        video.addEventListener('loadstart', onLoadStart);

        onLoadStart();
    }

    //Helpers

    function _checkVideo() {
        if (!video) {
            throw new Error('Video tag not found with "' + selector + '" selector');
        }

        if (video.tagName.toLocaleLowerCase() !== 'video') {
            throw new Error('You have to select a video');
        }
    }

    function _checkReady(video, timeout = 10 * 1000) {
        const startTime = Date.now();

        return new Promise((resolve, reject) => {
            let interval = setInterval(() => {
                if (video.readyState === 4) {
                    clearInterval(interval);

                    resolve();
                }

                if (Date.now() > (startTime + timeout)) {
                    reject(new Error('Timeout'));
                }
            }, 50);
        });
    }

    function _capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function _executeCallbacks(callbacks, argsArray, thisArg = null) {
        if (callbacks.length > 0) {
            callbacks.forEach(function(callback) {
                callback.apply(thisArg, argsArray);
            });
        }
    }

    function _removeCallbackToEventCallbacks(callback, callbacks) {
        if (callback === undefined) {
            return [];
        }

        const index = callbacks.indexOf(callback);
        if (index > -1) {
            callbacks.splice(index, 1);
        }

        return callbacks;
    }

    return {
        on: on,
        off: off
    }
}