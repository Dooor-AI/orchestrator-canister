"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertCpuResourceString = exports.convertResourceString = void 0;
const prefixes = "kmgtpe".split("");
function parseSizeString(size) {
    const regex = /^([\d.]+)([a-zA-Z])([a-zA-Z]*)$/;
    const match = size.match(regex);
    if (match) {
        const [, value, unit1, unit2] = match;
        return [parseFloat(value), unit1.toLowerCase(), unit2.toLowerCase()];
    }
    throw new Error(`Invalid size string: ${size}`);
}
function convertResourceString(resourceStr) {
    const [value, prefix, unit] = parseSizeString(resourceStr.toLowerCase());
    const power = prefixes.indexOf(prefix);
    const base = unit === "i" ? 1024 : 1000;
    return power !== -1 ? value * Math.pow(base, power + 1) : value;
}
exports.convertResourceString = convertResourceString;
// checks to see if the resource string has an suffix, and extracts the
// value and suffix if it does, otherwise return the numerical value and
// an empty string
function parseCpuResourceString(size) {
    const regex = /^([\d.]+)([a-zA-Z]*)$/;
    const match = size.match(regex);
    if (match) {
        const [, value, unit1] = match;
        return [parseFloat(value), unit1.toLowerCase()];
    }
    throw new Error(`Invalid size string: ${size}`);
}
function convertCpuResourceString(resourceStr) {
    const [value, unit] = parseCpuResourceString(resourceStr.toLowerCase());
    if (unit === "m") {
        return value;
    }
    return value * 1000;
}
exports.convertCpuResourceString = convertCpuResourceString;
