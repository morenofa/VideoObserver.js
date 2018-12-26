/**
 * Created by aitor on 11/6/18.
 */

import VideoObserver from '../src/';

describe('VideoObserver', () => {
    let vObserver = null;
    let videoId = null;

    it('checking on ready', (done) => {
        const video = document.querySelector(videoId);

        if (video.readyState !== 4) {
            vObserver.on('ready', function(error) {
                if (error) {
                    throw error;
                }

                done();
            });
        }
    });

    it('checking on ready with ready video', (done) => {
        const video = document.querySelector(videoId);

        let interval = setInterval(() => {
            if (video.readyState === 4) {
                clearInterval(interval);

                vObserver.on('ready', function(error) {
                    if (error) {
                        throw error;
                    }

                    done();
                });
            }
        }, 50);
    });

    it('checking on resolution change', (done) => {
        const video = document.querySelector(videoId);

        vObserver.on('resolutionChange', function (resolution, event) {
            expect(resolution).toEqual({width: 640, height: 480});

            done();
        });

        setTimeout(function() {
            video.src = 'https://sample-videos.com/video123/mp4/480/big_buck_bunny_480p_5mb.mp4';
        }, 100);
    });

    beforeEach(function() {
        const { id } = DomManipulation();
        vObserver = VideoObserver(id);

        videoId = id;
    });

    function DomManipulation(){
        const video = document.createElement('video');

        const videoId = 'i'+Math.floor((Math.random() * 100) + 1);

        video.src = 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4';
        video.id = videoId;
        video.autoplay = 'autoplay';
        video.muted = 'muted';
        video.loop = 'loop';

        document.body.appendChild(video);

        return {
            id: '#' + videoId
        };
    }

});