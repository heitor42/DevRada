module.exports = function parseStreangAsArray (arrayAsString) {
    return arrayAsString.split(",").map(tech => tech.trim());
}