import { v2Manifest, v3Manifest, v2ManifestService, v3ManifestService, v2ServiceExpose, v3ServiceExpose, v2ComputeResources, v2Expose, v2ExposeTo, v2HTTPOptions, v2ProfileCompute, v2ResourceCPU, v3ResourceGPU, v2ResourceMemory, v2ResourceStorage, v2ResourceStorageArray, v2Sdl, v2Service, v2ServiceExposeHttpOptions, v3ServiceExposeHttpOptions, v2ManifestServiceParams, v3GPUAttributes, v3Sdl, v3ProfileCompute, v3ComputeResources, v2ServiceParams, v3DeploymentGroup, v3ManifestServiceParams, v2StorageAttributes } from "../types";
import { NetworkId } from "../../types/network";
export declare const GPU_SUPPORTED_VENDORS: string[];
export declare const GPU_SUPPORTED_INTERFACES: string[];
declare type NetworkVersion = "beta2" | "beta3";
export declare class SDL {
    readonly data: v2Sdl;
    readonly version: NetworkVersion;
    private readonly networkId;
    static fromString(yaml: string, version?: NetworkVersion, networkId?: NetworkId): SDL;
    static validate(yaml: string): v3Sdl;
    static validateGPU(name: string, gpu: v3ResourceGPU | undefined): void;
    static validateStorage(name: string, storage?: v2ResourceStorage | v2ResourceStorageArray): void;
    private readonly ENDPOINT_NAME_VALIDATION_REGEX;
    private readonly ABSOLUTE_PATH_REGEX;
    private readonly ENDPOINT_KIND_IP;
    private readonly endpointsUsed;
    private readonly portsUsed;
    constructor(data: v2Sdl, version?: NetworkVersion, networkId?: NetworkId);
    private validate;
    private validateDenom;
    private validateEndpoints;
    private validateCredentials;
    private validateDeploymentWithRelations;
    private validateDeploymentRelations;
    private validateServiceStorages;
    private validateStorages;
    private stringToBoolean;
    private validateGPU;
    private validateLeaseIP;
    private validateEndpointsUtility;
    services(): Record<string, v2Service>;
    deployments(): Record<string, import("../types").v2Deployment>;
    profiles(): {};
    placements(): Record<string, import("../types").v2ProfilePlacement>;
    serviceNames(): string[];
    deploymentsByPlacement(placement: string): [string, any][];
    resourceUnit(val: string, asString: boolean): {
        val: string;
    } | {
        val: number;
    };
    resourceValue(value: {
        toString: () => string;
    } | null, asString: boolean): string | Uint8Array | null;
    serviceResourceCpu(resource: v2ResourceCPU): {
        units: {
            val: string;
        };
        attributes: {
            key: string;
            value: any;
        }[] | undefined;
    } | {
        units: {
            val: string;
        };
        attributes?: undefined;
    };
    serviceResourceMemory(resource: v2ResourceMemory, asString: boolean): {
        [x: string]: {
            val: string;
        } | {
            val: number;
        } | {
            key: string;
            value: any;
        }[] | undefined;
        attributes: {
            key: string;
            value: any;
        }[] | undefined;
    } | {
        [x: string]: {
            val: string;
        } | {
            val: number;
        };
        attributes?: undefined;
    };
    serviceResourceStorage(resource: v2ResourceStorageArray | v2ResourceStorage, asString: boolean): ({
        [x: string]: string | {
            val: string;
        } | {
            val: number;
        } | {
            key: string;
            value: any;
        }[] | undefined;
        name: string;
        attributes: {
            key: string;
            value: any;
        }[] | undefined;
    } | {
        [x: string]: string | {
            val: string;
        } | {
            val: number;
        };
        name: string;
        attributes?: undefined;
    })[];
    serviceResourceAttributes(attributes?: Record<string, any>): {
        key: string;
        value: any;
    }[] | undefined;
    serviceResourceStorageAttributes(attributes?: v2StorageAttributes): {
        key: string;
        value: any;
    }[] | undefined;
    serviceResourceGpu(resource: v3ResourceGPU | undefined, asString: boolean): {
        units: {
            val: string;
        } | {
            val: number | Buffer;
        };
        attributes: {
            key: string;
            value: string;
        }[];
    } | {
        units: {
            val: string;
        } | {
            val: number | Buffer;
        };
        attributes?: undefined;
    };
    v2ServiceResourceEndpoints(service: v2Service): {
        kind: number;
        sequence_number: number;
    }[] | null;
    v3ServiceResourceEndpoints(service: v2Service): ({
        kind: number;
        sequence_number: number;
    } | {
        sequence_number: number;
        kind?: undefined;
    })[];
    serviceResourcesBeta2(profile: v2ProfileCompute, service: v2Service, asString?: boolean): {
        cpu: {
            units: {
                val: string;
            };
            attributes: {
                key: string;
                value: any;
            }[] | undefined;
        } | {
            units: {
                val: string;
            };
            attributes?: undefined;
        };
        memory: {
            [x: string]: {
                val: string;
            } | {
                val: number;
            } | {
                key: string;
                value: any;
            }[] | undefined;
            attributes: {
                key: string;
                value: any;
            }[] | undefined;
        } | {
            [x: string]: {
                val: string;
            } | {
                val: number;
            };
            attributes?: undefined;
        };
        storage: ({
            [x: string]: string | {
                val: string;
            } | {
                val: number;
            } | {
                key: string;
                value: any;
            }[] | undefined;
            name: string;
            attributes: {
                key: string;
                value: any;
            }[] | undefined;
        } | {
            [x: string]: string | {
                val: string;
            } | {
                val: number;
            };
            name: string;
            attributes?: undefined;
        })[];
        endpoints: {
            kind: number;
            sequence_number: number;
        }[] | null;
    };
    serviceResourcesBeta3(id: number, profile: v3ProfileCompute, service: v2Service, asString?: boolean): {
        id: number;
        cpu: {
            units: {
                val: string;
            };
            attributes: {
                key: string;
                value: any;
            }[] | undefined;
        } | {
            units: {
                val: string;
            };
            attributes?: undefined;
        };
        memory: {
            [x: string]: {
                val: string;
            } | {
                val: number;
            } | {
                key: string;
                value: any;
            }[] | undefined;
            attributes: {
                key: string;
                value: any;
            }[] | undefined;
        } | {
            [x: string]: {
                val: string;
            } | {
                val: number;
            };
            attributes?: undefined;
        };
        storage: ({
            [x: string]: string | {
                val: string;
            } | {
                val: number;
            } | {
                key: string;
                value: any;
            }[] | undefined;
            name: string;
            attributes: {
                key: string;
                value: any;
            }[] | undefined;
        } | {
            [x: string]: string | {
                val: string;
            } | {
                val: number;
            };
            name: string;
            attributes?: undefined;
        })[];
        endpoints: ({
            kind: number;
            sequence_number: number;
        } | {
            sequence_number: number;
            kind?: undefined;
        })[];
        gpu: {
            units: {
                val: string;
            } | {
                val: number | Buffer;
            };
            attributes: {
                key: string;
                value: string;
            }[];
        } | {
            units: {
                val: string;
            } | {
                val: number | Buffer;
            };
            attributes?: undefined;
        };
    };
    parseServiceProto(proto?: string): string;
    manifestExposeService(to: v2ExposeTo): string;
    manifestExposeGlobal(to: v2ExposeTo): boolean;
    manifestExposeHosts(expose: v2Expose): import("../types").v2Accept;
    v2HttpOptions(http_options: v2HTTPOptions | undefined): {
        MaxBodySize: number;
        ReadTimeout: number;
        SendTimeout: number;
        NextTries: number;
        NextTimeout: number;
        NextCases: string[];
    };
    v3HttpOptions(http_options: v2HTTPOptions | undefined): {
        maxBodySize: number;
        readTimeout: number;
        sendTimeout: number;
        nextTries: number;
        nextTimeout: number;
        nextCases: string[];
    };
    v2ManifestExposeHttpOptions(expose: v2Expose): v2ServiceExposeHttpOptions;
    v3ManifestExposeHttpOptions(expose: v2Expose): v3ServiceExposeHttpOptions;
    v2ManifestExpose(service: v2Service): v2ServiceExpose[];
    v3ManifestExpose(service: v2Service): v3ServiceExpose[];
    v2ManifestServiceParams(params: v2ServiceParams): v2ManifestServiceParams | undefined;
    v3ManifestServiceParams(params: v2ServiceParams | undefined): v3ManifestServiceParams | null;
    v2ManifestService(placement: string, name: string, asString: boolean): v2ManifestService;
    v3ManifestService(id: number, placement: string, name: string, asString: boolean): v3ManifestService;
    v2Manifest(asString?: boolean): v2Manifest;
    v3Manifest(asString?: boolean): v3Manifest;
    manifest(asString?: boolean): v2Manifest | v3Manifest;
    computeEndpointSequenceNumbers(sdl: v2Sdl): {
        [k: string]: number;
    };
    resourceUnitCpu(computeResources: v2ComputeResources, asString: boolean): {
        units: {
            val: string | Uint8Array | null;
        };
        attributes: {
            key: string;
            value: any;
        }[] | undefined;
    };
    resourceUnitMemory(computeResources: v2ComputeResources, asString: boolean): {
        quantity: {
            val: string | Uint8Array | null;
        };
        attributes: {
            key: string;
            value: any;
        }[] | undefined;
    };
    resourceUnitStorage(computeResources: v2ComputeResources, asString: boolean): {
        name: string;
        quantity: {
            val: string | Uint8Array | null;
        };
        attributes: {
            key: string;
            value: any;
        }[] | undefined;
    }[];
    transformGpuAttributes(attributes: v3GPUAttributes): Array<{
        key: string;
        value: string;
    }>;
    resourceUnitGpu(computeResources: v3ComputeResources, asString: boolean): {
        units: {
            val: string | Uint8Array | null;
        };
        attributes: {
            key: string;
            value: string;
        }[] | undefined;
    };
    groupResourceUnits(resource: v2ComputeResources | undefined, asString: boolean): any;
    exposeShouldBeIngress(expose: {
        proto: string;
        global: boolean;
        externalPort: number;
        port: number;
    }): boolean;
    groups(): any[];
    v3Groups(): v3DeploymentGroup[];
    v2Groups(): any[];
    escapeHtml(raw: string): string;
    SortJSON(jsonStr: string): string;
    manifestSortedJSON(): string;
    manifestVersion(): Promise<Uint8Array>;
    manifestSorted(): any;
}
export {};
