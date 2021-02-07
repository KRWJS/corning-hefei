const MobileDetect = require('mobile-detect');

const md = new MobileDetect(window.navigator.userAgent);

const setDeviceType = (type) => Session.set('device', type);

function widthBasedDeviceDetection() {
    const devices = [
        { type: 'desktop', query: "(min-width: 769px)" },
        { type: 'tablet', query: "(max-width: 768px) and (min-width: 481px)" },
        { type: 'phone', query: "(max-width: 480px)" }
    ];

    devices.forEach(function(device) {
        const mql = window.matchMedia(device.query);
        mql.matches && setDeviceType(device.type);
        mql.addListener((mq) => mql.matches && setDeviceType(device.type));
    });
} ;

if (md.phone()) {
    setDeviceType('phone');
} else if (md.tablet()) {
    setDeviceType('tablet');
} else {
    widthBasedDeviceDetection();
}
