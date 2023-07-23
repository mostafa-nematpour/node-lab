const checkRoute = function (req, r_method, r_url, patternRegex) {
    const { url, method } = req;
    if (patternRegex) {
        return method === r_method && patternRegex.test(url);
    }
    return method === r_method && url === r_url;
}
const extractFromPattern = function (inputString, patternRegex) {
    const match = inputString.match(patternRegex);
    if (match && match[1]) {
        return match[1];
    }
    return null;
}
module.exports.checkRoute = checkRoute;
module.exports.extractFromPattern = extractFromPattern;