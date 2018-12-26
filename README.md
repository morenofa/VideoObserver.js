# Video Observer

[![Build Status](https://travis-ci.org/morenofa/video-observer.svg?branch=master)](https://travis-ci.org/morenofa/video-observer)

## Purpose

VideoObserver.js allows you to listen some particular events that's occurs for on streaming videos. 

For example detect when video is ready to play or when the resolution of your live stream video changes.

## Installation

```bash
$ npm install video-observer
```

## Example Usage

````js
import { VideoObserver } from 'video-observer';

var vObserver = VideoObserver('#video');

// When video is ready to play
vObserver.on('ready', function (error) {
    if (error) {
        throw error;
    }

    console.log('ready without errors!!');
});

// When resolution changes
vObserver.on('resolutionChange', function (resolution, event) {
    console.log('resolution changed!!', resolution);
});
````

## Building

Fork and clone the repository. Then, install dependencies with. 

```
npm install
```

Then run the `build` script:

```
npm run build
```

__NOTE:__ You need node.js v8.11.2 or higher.

## Changelog

See [CHANGELOG.md](https://github.com/morenofa/video-observer/blob/master/CHANGELOG.md).


## License

<a rel="license" href="https://opensource.org/licenses/MIT">MIT</a>
