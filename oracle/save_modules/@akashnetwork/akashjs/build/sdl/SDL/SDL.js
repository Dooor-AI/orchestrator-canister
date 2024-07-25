"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDL = exports.GPU_SUPPORTED_INTERFACES = exports.GPU_SUPPORTED_VENDORS = void 0;
const js_yaml_1 = __importDefault(require("js-yaml"));
const castArray_1 = __importDefault(require("lodash/castArray"));
const mapKeys_1 = __importDefault(require("lodash/mapKeys"));
const sizes_1 = require("../sizes");
const json_stable_stringify_1 = __importDefault(require("json-stable-stringify"));
const CryptoJS = require("crypto-js")

const network_1 = require("../../config/network");
const error_1 = require("../../error");
const Endpoint_SHARED_HTTP = 0;
const Endpoint_RANDOM_PORT = 1;
const Endpoint_LEASED_IP = 2;
exports.GPU_SUPPORTED_VENDORS = ["nvidia", "amd"];
exports.GPU_SUPPORTED_INTERFACES = ["pcie", "sxm"];
function isArray(obj) {
    return Array.isArray(obj);
}
function isString(str) {
    return typeof str === "string";
}
class SDL {
    constructor(data, version = "beta2", networkId = network_1.MAINNET_ID) {
        this.data = data;
        this.version = version;
        this.networkId = networkId;
        this.ENDPOINT_NAME_VALIDATION_REGEX = /^[a-z]+[-_\da-z]+$/;
        this.ABSOLUTE_PATH_REGEX = /^(\/|([a-zA-Z]:)?([\\/]))/;
        this.ENDPOINT_KIND_IP = "ip";
        this.endpointsUsed = new Set();
        this.portsUsed = new Map();
        this.validate();
    }
    static fromString(yaml, version = "beta2", networkId = network_1.MAINNET_ID) {
        const data = js_yaml_1.default.load(yaml);
        return new SDL(data, version, networkId);
    }
    static validate(yaml) {
        console.warn("SDL.validate is deprecated. Use SDL.constructor directly.");
        // TODO: this should really be cast to unknown, then assigned
        // to v2 or v3 SDL only after being validated
        const data = js_yaml_1.default.load(yaml);
        for (const [name, profile] of Object.entries(data.profiles.compute || {})) {
            this.validateGPU(name, profile.resources.gpu);
            this.validateStorage(name, profile.resources.storage);
        }
        return data;
    }
    static validateGPU(name, gpu) {
        if (gpu) {
            if (typeof gpu.units === "undefined") {
                throw new Error("GPU units must be specified for profile " + name);
            }
            const units = parseInt(gpu.units.toString());
            if (units === 0 && gpu.attributes !== undefined) {
                throw new Error("GPU must not have attributes if units is 0");
            }
            if (units > 0 && gpu.attributes === undefined) {
                throw new Error("GPU must have attributes if units is not 0");
            }
            if (units > 0 && gpu.attributes?.vendor === undefined) {
                throw new Error("GPU must specify a vendor if units is not 0");
            }
            if (units > 0 && !exports.GPU_SUPPORTED_VENDORS.some(vendor => vendor in (gpu.attributes?.vendor || {}))) {
                throw new Error(`GPU must be one of the supported vendors (${exports.GPU_SUPPORTED_VENDORS.join(",")}).`);
            }
            const vendor = Object.keys(gpu.attributes?.vendor || {})[0];
            if (units > 0 && !!gpu.attributes?.vendor[vendor] && !Array.isArray(gpu.attributes.vendor[vendor])) {
                throw new Error(`GPU configuration must be an array of GPU models with optional ram.`);
            }
            if (units > 0 &&
                Object.values(gpu.attributes?.vendor || {}).some(models => models?.some(model => model.interface && !exports.GPU_SUPPORTED_INTERFACES.includes(model.interface)))) {
                throw new Error(`GPU interface must be one of the supported interfaces (${exports.GPU_SUPPORTED_INTERFACES.join(",")}).`);
            }
        }
    }
    static validateStorage(name, storage) {
        if (!storage) {
            throw new Error("Storage is required for service " + name);
        }
        const storages = isArray(storage) ? storage : [storage];
        for (const storage of storages) {
            if (typeof storage.size === "undefined") {
                throw new Error("Storage size is required for service " + name);
            }
            if (storage.attributes) {
                for (const [key, value] of Object.entries(storage.attributes)) {
                    if (key === "class" && value === "ram" && storage.attributes.persistent === true) {
                        throw new Error("Storage attribute 'ram' must have 'persistent' set to 'false' or not defined for service " + name);
                    }
                }
            }
        }
    }
    validate() {
        // TODO: this should really be cast to unknown, then assigned
        // to v2 or v3 SDL only after being validated
        this.validateEndpoints();
        Object.keys(this.data.services).forEach(serviceName => {
            this.validateDeploymentWithRelations(serviceName);
            this.validateLeaseIP(serviceName);
            this.validateCredentials(serviceName);
        });
        this.validateDenom();
        this.validateEndpointsUtility();
    }
    validateDenom() {
        const usdcDenom = network_1.USDC_IBC_DENOMS[this.networkId];
        const denoms = this.groups()
            .flatMap(g => g.resources)
            .map(resource => resource.price.denom);
        const invalidDenom = denoms.find(denom => denom !== network_1.AKT_DENOM && denom !== usdcDenom);
        error_1.SdlValidationError.assert(!invalidDenom, `Invalid denom: "${invalidDenom}". Only uakt and ${usdcDenom} are supported.`);
    }
    validateEndpoints() {
        if (!this.data.endpoints) {
            return;
        }
        Object.keys(this.data.endpoints).forEach(endpointName => {
            const endpoint = this.data.endpoints[endpointName] || {};
            error_1.SdlValidationError.assert(this.ENDPOINT_NAME_VALIDATION_REGEX.test(endpointName), `Endpoint named "${endpointName}" is not a valid name.`);
            error_1.SdlValidationError.assert(!!endpoint.kind, `Endpoint named "${endpointName}" has no kind.`);
            error_1.SdlValidationError.assert(endpoint.kind === this.ENDPOINT_KIND_IP, `Endpoint named "${endpointName}" has an unknown kind "${endpoint.kind}".`);
        });
    }
    validateCredentials(serviceName) {
        const { credentials } = this.data.services[serviceName];
        if (credentials) {
            const credentialsKeys = ["host", "username", "password"];
            credentialsKeys.forEach(key => {
                error_1.SdlValidationError.assert(credentials[key]?.trim().length, `service "${serviceName}" credentials missing "${key}"`);
            });
        }
    }
    validateDeploymentWithRelations(serviceName) {
        const deployment = this.data.deployment[serviceName];
        error_1.SdlValidationError.assert(deployment, `Service "${serviceName}" is not defined in the "deployment" section.`);
        Object.keys(this.data.deployment[serviceName]).forEach(deploymentName => {
            this.validateDeploymentRelations(serviceName, deploymentName);
            this.validateServiceStorages(serviceName, deploymentName);
            this.validateStorages(serviceName, deploymentName);
            this.validateGPU(serviceName, deploymentName);
        });
    }
    validateDeploymentRelations(serviceName, deploymentName) {
        const serviceDeployment = this.data.deployment[serviceName][deploymentName];
        const compute = this.data.profiles.compute?.[serviceDeployment.profile];
        const infra = this.data.profiles.placement?.[deploymentName];
        error_1.SdlValidationError.assert(infra, `The placement "${deploymentName}" is not defined in the "placement" section.`);
        error_1.SdlValidationError.assert(infra.pricing?.[serviceDeployment.profile], `The pricing for the "${serviceDeployment.profile}" profile is not defined in the "${deploymentName}" "placement" definition.`);
        error_1.SdlValidationError.assert(compute, `The compute requirements for the "${serviceDeployment.profile}" profile are not defined in the "compute" section.`);
    }
    validateServiceStorages(serviceName, deploymentName) {
        const service = this.data.services[serviceName];
        const mounts = {};
        const serviceDeployment = this.data.deployment[serviceName][deploymentName];
        const compute = this.data.profiles.compute[serviceDeployment.profile];
        const storages = (0, castArray_1.default)(compute.resources.storage);
        if (!service.params?.storage) {
            return;
        }
        (0, mapKeys_1.default)(service.params.storage, (storage, storageName) => {
            const storageNameExists = storages.some(({ name }) => name === storageName);
            error_1.SdlValidationError.assert(storage, `Storage "${storageName}" is not configured.`);
            error_1.SdlValidationError.assert(storageNameExists, `Service "${serviceName}" references to non-existing compute volume names "${storageName}".`);
            error_1.SdlValidationError.assert(!("mount" in storage) || this.ABSOLUTE_PATH_REGEX.test(storage.mount), `Invalid value for "service.${serviceName}.params.${storageName}.mount" parameter. expected absolute path.`);
            const mount = storage?.mount;
            const volumeName = mounts[mount];
            error_1.SdlValidationError.assert(!volumeName || mount, "Multiple root ephemeral storages are not allowed");
            error_1.SdlValidationError.assert(!volumeName || !mount, `Mount ${mount} already in use by volume "${volumeName}".`);
            mounts[mount] = storageName;
        });
    }
    validateStorages(serviceName, deploymentName) {
        const service = this.data.services[serviceName];
        const serviceDeployment = this.data.deployment[serviceName][deploymentName];
        const compute = this.data.profiles.compute[serviceDeployment.profile];
        const storages = (0, castArray_1.default)(compute.resources.storage);
        storages.forEach(storage => {
            const isRam = storage.attributes?.class === "ram";
            const persistent = this.stringToBoolean(storage.attributes?.persistent || false);
            error_1.SdlValidationError.assert(storage.size, `Storage size is required for service "${serviceName}".`);
            error_1.SdlValidationError.assert(!isRam || !persistent, `Storage attribute "ram" must have "persistent" set to "false" or not defined for service "${serviceName}".`);
            const mount = service.params?.storage?.[storage.name]?.mount;
            error_1.SdlValidationError.assert(!persistent || mount, `compute.storage.${storage.name} has persistent=true which requires service.${serviceName}.params.storage.${storage.name} to have mount.`);
        });
    }
    stringToBoolean(str) {
        if (typeof str === "boolean") {
            return str;
        }
        switch (str.toLowerCase()) {
            case "false":
            case "no":
            case "0":
            case "":
                return false;
            default:
                return true;
        }
    }
    validateGPU(serviceName, deploymentName) {
        const deployment = this.data.deployment[serviceName];
        const compute = this.data.profiles.compute[deployment[deploymentName].profile];
        const gpu = compute.resources.gpu;
        if (!gpu) {
            return;
        }
        const hasUnits = gpu.units !== 0;
        const hasAttributes = typeof gpu.attributes !== "undefined";
        const hasVendor = hasAttributes && typeof gpu.attributes?.vendor !== "undefined";
        error_1.SdlValidationError.assert(typeof gpu.units === "number", `GPU units must be specified for profile "${serviceName}".`);
        error_1.SdlValidationError.assert(hasUnits || !hasAttributes, "GPU must not have attributes if units is 0");
        error_1.SdlValidationError.assert(!hasUnits || hasAttributes, "GPU must have attributes if units is not 0");
        error_1.SdlValidationError.assert(!hasUnits || hasVendor, "GPU must specify a vendor if units is not 0");
        const hasUnsupportedVendor = hasVendor && exports.GPU_SUPPORTED_VENDORS.some(vendor => vendor in (gpu.attributes?.vendor || {}));
        error_1.SdlValidationError.assert(!hasUnits || hasUnsupportedVendor, `GPU must be one of the supported vendors (${exports.GPU_SUPPORTED_VENDORS.join(",")}).`);
        const vendor = Object.keys(gpu.attributes?.vendor || {})[0];
        error_1.SdlValidationError.assert(!hasUnits || !gpu.attributes?.vendor[vendor] || Array.isArray(gpu.attributes.vendor[vendor]), `GPU configuration must be an array of GPU models with optional ram.`);
        error_1.SdlValidationError.assert(!hasUnits ||
            !Object.values(gpu.attributes?.vendor || {}).some(models => models?.some(model => model.interface && !exports.GPU_SUPPORTED_INTERFACES.includes(model.interface))), `GPU interface must be one of the supported interfaces (${exports.GPU_SUPPORTED_INTERFACES.join(",")}).`);
    }
    validateLeaseIP(serviceName) {
        this.data.services[serviceName].expose?.forEach(expose => {
            const proto = this.parseServiceProto(expose.proto);
            expose.to?.forEach(to => {
                if (to.ip?.length > 0) {
                    error_1.SdlValidationError.assert(to.global, `Error on "${serviceName}", if an IP is declared, the directive must be declared as global.`);
                    error_1.SdlValidationError.assert(this.data.endpoints?.[to.ip], `Unknown endpoint "${to.ip}" in service "${serviceName}". Add to the list of endpoints in the "endpoints" section.`);
                    this.endpointsUsed.add(to.ip);
                    const portKey = `${to.ip}-${expose.as}-${proto}`;
                    const otherServiceName = this.portsUsed.get(portKey);
                    error_1.SdlValidationError.assert(!this.portsUsed.has(portKey), `IP endpoint ${to.ip} port: ${expose.port} protocol: ${proto} specified by service ${serviceName} already in use by ${otherServiceName}`);
                    this.portsUsed.set(portKey, serviceName);
                }
            });
        });
    }
    validateEndpointsUtility() {
        if (this.data.endpoints) {
            Object.keys(this.data.endpoints).forEach(endpoint => {
                error_1.SdlValidationError.assert(this.endpointsUsed.has(endpoint), `Endpoint ${endpoint} declared but never used.`);
            });
        }
    }
    services() {
        if (this.data) {
            return this.data.services;
        }
        return {};
    }
    deployments() {
        if (this.data) {
            return this.data.deployment;
        }
        return {};
    }
    profiles() {
        if (this.data) {
            return this.data.profiles;
        }
        return {};
    }
    placements() {
        const { placement } = this.data.profiles;
        return placement || {};
    }
    serviceNames() {
        const names = this.data ? Object.keys(this.data.services) : [];
        // TODO: sort these
        return names;
    }
    deploymentsByPlacement(placement) {
        const deployments = this.data ? this.data.deployment : [];
        return Object.entries(deployments).filter(({ 1: deployment }) => Object.prototype.hasOwnProperty.call(deployment, placement));
    }
    resourceUnit(val, asString) {
        return asString ? { val: `${(0, sizes_1.convertResourceString)(val)}` } : { val: (0, sizes_1.convertResourceString)(val) };
    }
    resourceValue(value, asString) {
        if (value === null) {
            return value;
        }
        const strVal = value.toString();
        const encoder = new TextEncoder();
        return asString ? strVal : encoder.encode(strVal);
    }
    serviceResourceCpu(resource) {
        const units = isString(resource.units) ? (0, sizes_1.convertCpuResourceString)(resource.units) : resource.units * 1000;
        return resource.attributes
            ? {
                units: { val: `${units}` },
                attributes: this.serviceResourceAttributes(resource.attributes)
            }
            : {
                units: { val: `${units}` }
            };
    }
    serviceResourceMemory(resource, asString) {
        const key = asString ? "quantity" : "size";
        return resource.attributes
            ? {
                [key]: this.resourceUnit(resource.size, asString),
                attributes: this.serviceResourceAttributes(resource.attributes)
            }
            : {
                [key]: this.resourceUnit(resource.size, asString)
            };
    }
    serviceResourceStorage(resource, asString) {
        const key = asString ? "quantity" : "size";
        const storage = isArray(resource) ? resource : [resource];
        return storage.map(storage => storage.attributes
            ? {
                name: storage.name || "default",
                [key]: this.resourceUnit(storage.size, asString),
                attributes: this.serviceResourceStorageAttributes(storage.attributes)
            }
            : {
                name: storage.name || "default",
                [key]: this.resourceUnit(storage.size, asString)
            });
    }
    serviceResourceAttributes(attributes) {
        return (attributes &&
            Object.keys(attributes)
                .sort()
                .map(key => ({ key, value: attributes[key].toString() })));
    }
    serviceResourceStorageAttributes(attributes) {
        if (!attributes)
            return undefined;
        const pairs = Object.keys(attributes).map(key => ({ key, value: attributes[key].toString() }));
        if (attributes.class === "ram" && !("persistent" in attributes)) {
            pairs.push({ key: "persistent", value: "false" });
        }
        pairs.sort((a, b) => a.key.localeCompare(b.key));
        return pairs;
    }
    serviceResourceGpu(resource, asString) {
        const value = resource?.units || 0;
        const numVal = isString(value) ? Buffer.from(value, "ascii") : value;
        const strVal = !isString(value) ? value.toString() : value;
        return resource?.attributes
            ? {
                units: asString ? { val: strVal } : { val: numVal },
                attributes: this.transformGpuAttributes(resource?.attributes)
            }
            : {
                units: asString ? { val: strVal } : { val: numVal }
            };
    }
    v2ServiceResourceEndpoints(service) {
        const endpointSequenceNumbers = this.computeEndpointSequenceNumbers(this.data);
        const endpoints = service.expose.flatMap(expose => expose.to
            ? expose.to
                .filter(to => to.global && to.ip?.length > 0)
                .map(to => ({
                kind: Endpoint_LEASED_IP,
                sequence_number: endpointSequenceNumbers[to.ip] || 0
            }))
            : []);
        return endpoints.length > 0 ? endpoints : null;
    }
    v3ServiceResourceEndpoints(service) {
        const endpointSequenceNumbers = this.computeEndpointSequenceNumbers(this.data);
        const endpoints = service.expose.flatMap(expose => expose.to
            ? expose.to
                .filter(to => to.global)
                .flatMap(to => {
                const exposeSpec = {
                    port: expose.port,
                    externalPort: expose.as || 0,
                    proto: this.parseServiceProto(expose.proto),
                    global: !!to.global
                };
                const kind = this.exposeShouldBeIngress(exposeSpec) ? Endpoint_SHARED_HTTP : Endpoint_RANDOM_PORT;
                const defaultEp = kind !== 0 ? { kind: kind, sequence_number: 0 } : { sequence_number: 0 };
                const leasedEp = to.ip?.length > 0
                    ? {
                        kind: Endpoint_LEASED_IP,
                        sequence_number: endpointSequenceNumbers[to.ip] || 0
                    }
                    : undefined;
                return leasedEp ? [defaultEp, leasedEp] : [defaultEp];
            })
            : []);
        return endpoints;
    }
    serviceResourcesBeta2(profile, service, asString = false) {
        return {
            cpu: this.serviceResourceCpu(profile.resources.cpu),
            memory: this.serviceResourceMemory(profile.resources.memory, asString),
            storage: this.serviceResourceStorage(profile.resources.storage, asString),
            endpoints: this.v2ServiceResourceEndpoints(service)
        };
    }
    serviceResourcesBeta3(id, profile, service, asString = false) {
        return {
            id: id,
            cpu: this.serviceResourceCpu(profile.resources.cpu),
            memory: this.serviceResourceMemory(profile.resources.memory, asString),
            storage: this.serviceResourceStorage(profile.resources.storage, asString),
            endpoints: this.v3ServiceResourceEndpoints(service),
            gpu: this.serviceResourceGpu(profile.resources.gpu, asString)
        };
    }
    parseServiceProto(proto) {
        const raw = proto?.toUpperCase();
        let result = "TCP";
        switch (raw) {
            case "TCP":
            case "":
            case undefined:
                result = "TCP";
                break;
            case "UDP":
                result = "UDP";
                break;
            default:
                throw new Error("ErrUnsupportedServiceProtocol");
        }
        return result;
    }
    manifestExposeService(to) {
        return to.service || "";
    }
    manifestExposeGlobal(to) {
        return to.global || false;
    }
    manifestExposeHosts(expose) {
        return expose.accept || null;
    }
    v2HttpOptions(http_options) {
        const defaults = {
            MaxBodySize: 1048576,
            ReadTimeout: 60000,
            SendTimeout: 60000,
            NextTries: 3,
            NextTimeout: 0,
            NextCases: ["error", "timeout"]
        };
        if (!http_options) {
            return { ...defaults };
        }
        return {
            MaxBodySize: http_options.max_body_size || defaults.MaxBodySize,
            ReadTimeout: http_options.read_timeout || defaults.ReadTimeout,
            SendTimeout: http_options.send_timeout || defaults.SendTimeout,
            NextTries: http_options.next_tries || defaults.NextTries,
            NextTimeout: http_options.next_timeout || defaults.NextTimeout,
            NextCases: http_options.next_cases || defaults.NextCases
        };
    }
    v3HttpOptions(http_options) {
        const defaults = {
            maxBodySize: 1048576,
            readTimeout: 60000,
            sendTimeout: 60000,
            nextTries: 3,
            nextTimeout: 0,
            nextCases: ["error", "timeout"]
        };
        if (!http_options) {
            return { ...defaults };
        }
        return {
            maxBodySize: http_options.max_body_size || defaults.maxBodySize,
            readTimeout: http_options.read_timeout || defaults.readTimeout,
            sendTimeout: http_options.send_timeout || defaults.sendTimeout,
            nextTries: http_options.next_tries || defaults.nextTries,
            nextTimeout: http_options.next_timeout || defaults.nextTimeout,
            nextCases: http_options.next_cases || defaults.nextCases
        };
    }
    v2ManifestExposeHttpOptions(expose) {
        return this.v2HttpOptions(expose.http_options);
    }
    v3ManifestExposeHttpOptions(expose) {
        return this.v3HttpOptions(expose.http_options);
    }
    v2ManifestExpose(service) {
        const endpointSequenceNumbers = this.computeEndpointSequenceNumbers(this.data);
        return service.expose.flatMap(expose => expose.to
            ? expose.to.map(to => ({
                Port: expose.port,
                ExternalPort: expose.as || 0,
                Proto: this.parseServiceProto(expose.proto),
                Service: this.manifestExposeService(to),
                Global: this.manifestExposeGlobal(to),
                Hosts: this.manifestExposeHosts(expose),
                HTTPOptions: this.v2ManifestExposeHttpOptions(expose),
                IP: to.ip || "",
                EndpointSequenceNumber: endpointSequenceNumbers[to.ip] || 0
            }))
            : []);
    }
    v3ManifestExpose(service) {
        const endpointSequenceNumbers = this.computeEndpointSequenceNumbers(this.data);
        return service.expose
            .flatMap(expose => expose.to
            ? expose.to.map(to => ({
                port: expose.port,
                externalPort: expose.as || 0,
                proto: this.parseServiceProto(expose.proto),
                service: this.manifestExposeService(to),
                global: this.manifestExposeGlobal(to),
                hosts: this.manifestExposeHosts(expose),
                httpOptions: this.v3ManifestExposeHttpOptions(expose),
                ip: to.ip || "",
                endpointSequenceNumber: endpointSequenceNumbers[to.ip] || 0
            }))
            : [])
            .sort((a, b) => {
            if (a.service != b.service)
                return a.service.localeCompare(b.service);
            if (a.port != b.port)
                return a.port - b.port;
            if (a.proto != b.proto)
                return a.proto.localeCompare(b.proto);
            if (a.global != b.global)
                return a.global ? -1 : 1;
            return 0;
        });
    }
    v2ManifestServiceParams(params) {
        return {
            Storage: Object.keys(params?.storage ?? {}).map(name => {
                if (!params?.storage)
                    throw new Error("Storage is undefined");
                return {
                    name: name,
                    mount: params.storage[name].mount,
                    readOnly: params.storage[name].readOnly || false
                };
            })
        };
    }
    v3ManifestServiceParams(params) {
        if (params === undefined) {
            return null;
        }
        return {
            storage: Object.keys(params?.storage ?? {}).map(name => {
                if (!params?.storage)
                    throw new Error("Storage is undefined");
                return {
                    name: name,
                    mount: params.storage[name]?.mount,
                    readOnly: params.storage[name]?.readOnly || false
                };
            })
        };
    }
    v2ManifestService(placement, name, asString) {
        const service = this.data.services[name];
        const deployment = this.data.deployment[name];
        const profile = this.data.profiles.compute[deployment[placement].profile];
        const manifestService = {
            Name: name,
            Image: service.image,
            Command: service.command || null,
            Args: service.args || null,
            Env: service.env || null,
            Resources: this.serviceResourcesBeta2(profile, service, asString),
            Count: deployment[placement].count,
            Expose: this.v2ManifestExpose(service)
        };
        if (service.params) {
            manifestService.params = this.v2ManifestServiceParams(service.params);
        }
        return manifestService;
    }
    v3ManifestService(id, placement, name, asString) {
        const service = this.data.services[name];
        const deployment = this.data.deployment[name];
        const profile = this.data.profiles.compute[deployment[placement].profile];
        const credentials = service.credentials || null;
        if (credentials && !credentials.email) {
            credentials.email = "";
        }
        return {
            name: name,
            image: service.image,
            command: service.command || null,
            args: service.args || null,
            env: service.env || null,
            resources: this.serviceResourcesBeta3(id, profile, service, asString),
            count: deployment[placement].count,
            expose: this.v3ManifestExpose(service),
            params: this.v3ManifestServiceParams(service.params),
            credentials
        };
    }
    v2Manifest(asString = false) {
        return Object.keys(this.placements()).map(name => ({
            Name: name,
            Services: this.deploymentsByPlacement(name).map(([service]) => this.v2ManifestService(name, service, asString))
        }));
    }
    v3Manifest(asString = false) {
        const groups = this.v3Groups();
        const serviceId = (pIdx, sIdx) => groups[pIdx].resources[sIdx].resource.id;
        return Object.keys(this.placements()).map((name, pIdx) => ({
            name: name,
            services: this.deploymentsByPlacement(name)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([service], idx) => this.v3ManifestService(serviceId(pIdx, idx), name, service, asString))
        }));
    }
    manifest(asString = false) {
        return this.version === "beta2" ? this.v2Manifest(asString) : this.v3Manifest(asString);
    }
    computeEndpointSequenceNumbers(sdl) {
        return Object.fromEntries(Object.values(sdl.services).flatMap(service => service.expose.flatMap(expose => expose.to
            ? expose.to
                .filter(to => to.global && to.ip?.length > 0)
                .map(to => to.ip)
                .sort()
                .map((ip, index) => [ip, index + 1])
            : [])));
    }
    resourceUnitCpu(computeResources, asString) {
        const attributes = computeResources.cpu.attributes;
        const cpu = isString(computeResources.cpu.units) ? (0, sizes_1.convertCpuResourceString)(computeResources.cpu.units) : computeResources.cpu.units * 1000;
        return {
            units: { val: this.resourceValue(cpu, asString) },
            attributes: attributes &&
                Object.entries(attributes)
                    .sort(([k0], [k1]) => k0.localeCompare(k1))
                    .map(([key, value]) => ({
                    key: key,
                    value: value.toString()
                }))
        };
    }
    resourceUnitMemory(computeResources, asString) {
        const attributes = computeResources.memory.attributes;
        return {
            quantity: {
                val: this.resourceValue((0, sizes_1.convertResourceString)(computeResources.memory.size), asString)
            },
            attributes: attributes &&
                Object.entries(attributes)
                    .sort(([k0], [k1]) => k0.localeCompare(k1))
                    .map(([key, value]) => ({
                    key: key,
                    value: value.toString()
                }))
        };
    }
    resourceUnitStorage(computeResources, asString) {
        const storages = isArray(computeResources.storage) ? computeResources.storage : [computeResources.storage];
        return storages.map(storage => ({
            name: storage.name || "default",
            quantity: {
                val: this.resourceValue((0, sizes_1.convertResourceString)(storage.size), asString)
            },
            attributes: this.serviceResourceStorageAttributes(storage.attributes)
        }));
    }
    transformGpuAttributes(attributes) {
        return Object.entries(attributes.vendor).flatMap(([vendor, models]) => models
            ? models.map(model => {
                let key = `vendor/${vendor}/model/${model.model}`;
                if (model.ram) {
                    key += `/ram/${model.ram}`;
                }
                if (model.interface) {
                    key += `/interface/${model.interface}`;
                }
                return {
                    key: key,
                    value: "true"
                };
            })
            : [
                {
                    key: `vendor/${vendor}/model/*`,
                    value: "true"
                }
            ]);
    }
    resourceUnitGpu(computeResources, asString) {
        const attributes = computeResources.gpu?.attributes;
        const units = computeResources.gpu?.units || "0";
        const gpu = isString(units) ? parseInt(units) : units;
        return {
            units: { val: this.resourceValue(gpu, asString) },
            attributes: attributes && this.transformGpuAttributes(attributes)
        };
    }
    groupResourceUnits(resource, asString) {
        if (!resource)
            return {};
        const units = {
            endpoints: null
        };
        if (resource.cpu) {
            units.cpu = this.resourceUnitCpu(resource, asString);
        }
        if (resource.memory) {
            units.memory = this.resourceUnitMemory(resource, asString);
        }
        if (resource.storage) {
            units.storage = this.resourceUnitStorage(resource, asString);
        }
        if (this.version === "beta3") {
            units.gpu = this.resourceUnitGpu(resource, asString);
        }
        return units;
    }
    exposeShouldBeIngress(expose) {
        const externalPort = expose.externalPort === 0 ? expose.port : expose.externalPort;
        return expose.global && expose.proto === "TCP" && externalPort === 80;
    }
    groups() {
        return this.version === "beta2" ? this.v2Groups() : this.v3Groups();
    }
    v3Groups() {
        const groups = new Map();
        const services = Object.entries(this.data.services).sort(([a], [b]) => a.localeCompare(b));
        for (const [svcName, service] of services) {
            for (const [placementName, svcdepl] of Object.entries(this.data.deployment[svcName])) {
                // objects below have been ensured to exist
                const compute = this.data.profiles.compute[svcdepl.profile];
                const infra = this.data.profiles.placement[placementName];
                const pricing = infra.pricing[svcdepl.profile];
                const price = {
                    ...pricing,
                    amount: pricing.amount?.toString()
                };
                let group = groups.get(placementName);
                if (!group) {
                    const attributes = (infra.attributes
                        ? Object.entries(infra.attributes).map(([key, value]) => ({
                            key,
                            value
                        }))
                        : []);
                    attributes.sort((a, b) => a.key.localeCompare(b.key));
                    group = {
                        dgroup: {
                            name: placementName,
                            resources: [],
                            requirements: {
                                attributes: attributes,
                                signedBy: {
                                    allOf: infra.signedBy?.allOf || [],
                                    anyOf: infra.signedBy?.anyOf || []
                                }
                            }
                        },
                        boundComputes: {}
                    };
                    groups.set(placementName, group);
                }
                if (!group.boundComputes[placementName]) {
                    group.boundComputes[placementName] = {};
                }
                // const resources = this.serviceResourcesBeta3(0, compute as v3ProfileCompute, service, false);
                const location = group.boundComputes[placementName][svcdepl.profile];
                if (!location) {
                    const res = this.groupResourceUnits(compute.resources, false);
                    res.endpoints = this.v3ServiceResourceEndpoints(service);
                    const resID = group.dgroup.resources.length > 0 ? group.dgroup.resources.length + 1 : 1;
                    res.id = resID;
                    // resources.id = res.id;
                    group.dgroup.resources.push({
                        resource: res,
                        price: price,
                        count: svcdepl.count
                    });
                    group.boundComputes[placementName][svcdepl.profile] = group.dgroup.resources.length - 1;
                }
                else {
                    const endpoints = this.v3ServiceResourceEndpoints(service);
                    // resources.id = group.dgroup.resources[location].id;
                    group.dgroup.resources[location].count += svcdepl.count;
                    group.dgroup.resources[location].endpoints += endpoints;
                    group.dgroup.resources[location].endpoints.sort();
                }
            }
        }
        // keep ordering stable
        const names = [...groups.keys()].sort();
        return names.map(name => groups.get(name)).map(group => (group ? group.dgroup : {}));
    }
    v2Groups() {
        const yamlJson = this.data;
        const ipEndpointNames = this.computeEndpointSequenceNumbers(yamlJson);
        const groups = {};
        Object.keys(yamlJson.services).forEach(svcName => {
            const svc = yamlJson.services[svcName];
            const depl = yamlJson.deployment[svcName];
            Object.keys(depl).forEach(placementName => {
                const svcdepl = depl[placementName];
                const compute = yamlJson.profiles.compute[svcdepl.profile];
                const infra = yamlJson.profiles.placement[placementName];
                const pricing = infra.pricing[svcdepl.profile];
                const price = {
                    ...pricing,
                    amount: pricing.amount.toString()
                };
                let group = groups[placementName];
                if (!group) {
                    group = {
                        name: placementName,
                        requirements: {
                            attributes: infra.attributes
                                ? Object.entries(infra.attributes).map(([key, value]) => ({
                                    key,
                                    value
                                }))
                                : [],
                            signedBy: {
                                allOf: infra.signedBy?.allOf || [],
                                anyOf: infra.signedBy?.anyOf || []
                            }
                        },
                        resources: []
                    };
                    if (group.requirements.attributes) {
                        group.requirements.attributes = group.requirements.attributes.sort((a, b) => a.key < b.key);
                    }
                    groups[group.name] = group;
                }
                const resources = {
                    resources: this.groupResourceUnits(compute.resources, false),
                    price: price,
                    count: svcdepl.count
                };
                const endpoints = [];
                svc?.expose?.forEach(expose => {
                    expose?.to
                        ?.filter(to => to.global)
                        .forEach(to => {
                        const exposeSpec = {
                            port: expose.port,
                            externalPort: expose.as || 0,
                            proto: this.parseServiceProto(expose.proto),
                            global: !!to.global
                        };
                        if (to.ip?.length > 0) {
                            const seqNo = ipEndpointNames[to.ip];
                            endpoints.push({
                                kind: Endpoint_LEASED_IP,
                                sequence_number: seqNo
                            });
                        }
                        const kind = this.exposeShouldBeIngress(exposeSpec) ? Endpoint_SHARED_HTTP : Endpoint_RANDOM_PORT;
                        endpoints.push({ kind: kind, sequence_number: 0 });
                    });
                });
                resources.resources.endpoints = endpoints;
                group.resources.push(resources);
            });
        });
        return Object.keys(groups)
            .sort((a, b) => (a < b ? 1 : 0))
            .map(name => groups[name]);
    }
    escapeHtml(raw) {
        return raw.replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026");
    }
    SortJSON(jsonStr) {
        return this.escapeHtml((0, json_stable_stringify_1.default)(JSON.parse(jsonStr)));
    }
    manifestSortedJSON() {
        const manifest = this.manifest(true);
        let jsonStr = JSON.stringify(manifest);
        if (jsonStr) {
            jsonStr = jsonStr.replaceAll('"quantity":{"val', '"size":{"val');
        }
        return this.SortJSON(jsonStr);
    }
    async manifestVersion() {
        const jsonStr = this.manifestSortedJSON();
        const enc = new TextEncoder();
        const sortedBytes = enc.encode(jsonStr);
        const wordArray = CryptoJS.lib.WordArray.create(sortedBytes);
        const hash = CryptoJS.SHA256(wordArray);
        const hashHex = hash.toString(CryptoJS.enc.Hex);
    
        const hashBytes = new Uint8Array(hashHex.match(/[\da-f]{2}/gi).map(byte => parseInt(byte, 16)));
        return hashBytes;
    }
    manifestSorted() {
        const sorted = this.manifestSortedJSON();
        return JSON.parse(sorted);
    }
}
exports.SDL = SDL;