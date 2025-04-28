import os from 'os';

export function privateIP() {
    const networkInterfaces = os.networkInterfaces();

    for (const interfaceName in networkInterfaces) {
        for (const address of networkInterfaces[interfaceName]) {
            if (address.family === 'IPv4' && !address.internal) {
                return address.address;
            }
        }
    }

    return 'localhost';
}