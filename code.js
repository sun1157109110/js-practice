const readline = require('readline');

function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    let inputLines = [];
    rl.on('line', (line) => {
        inputLines.push(line.trim());
    });

    rl.on('close', () => {
        const [S_str, B_str, E_str] = inputLines[0].split(' ');
        const S = parseInt(S_str);
        const B = parseInt(B_str);
        const E = parseInt(E_str);
        const N = parseInt(inputLines[1]);

        const routes = [];
        const stationToRoutes = new Map();

        for (let i = 0; i < N; i++) {
            const parts = inputLines[2 + i].split(' ');
            const K = parseInt(parts[0]);
            const stations = parts.slice(1).map(Number);
            routes.push(new Set(stations));

            for (const station of stations) {
                if (!stationToRoutes.has(station)) {
                    stationToRoutes.set(station, new Set());
                }
                stationToRoutes.get(station).add(i);
            }
        }

        // 构建公交路线的邻接表
        const adj = Array.from({ length: N }, () => new Set());
        for (const [station, routeIds] of stationToRoutes.entries()) {
            const routeIdsArray = Array.from(routeIds);
            for (let i = 0; i < routeIdsArray.length; i++) {
                for (let j = i + 1; j < routeIdsArray.length; j++) {
                    const routeA = routeIdsArray[i];
                    const routeB = routeIdsArray[j];
                    adj[routeA].add(routeB);
                    adj[routeB].add(routeA);
                }
            }
        }

        // 初始化 BFS
        const routesWithS = [];
        const routesWithB = new Set();
        const routesWithE = new Set();

        for (let i = 0; i < N; i++) {
            if (routes[i].has(S)) {
                routesWithS.push(i);
            }
            if (routes[i].has(B)) {
                routesWithB.add(i);
            }
            if (routes[i].has(E)) {
                routesWithE.add(i);
            }
        }

        const visited = Array.from({ length: N }, () => [false, false]); // visited[routeId][havePassedB]
        const queue = [];

        for (const routeId of routesWithS) {
            const havePassedB = routesWithB.has(routeId) ? 1 : 0;
            queue.push({ routeId, havePassedB, busCount: 1 });
        }

        let found = false;
        while (queue.length > 0) {
            const { routeId, havePassedB, busCount } = queue.shift();
            if (visited[routeId][havePassedB]) continue;
            visited[routeId][havePassedB] = true;

            let currentHavePassedB = havePassedB;
            if (currentHavePassedB === 0 && routesWithB.has(routeId)) {
                currentHavePassedB = 1;
            }

            if (currentHavePassedB === 1 && routesWithE.has(routeId)) {
                console.log(busCount);
                found = true;
                break;
            }

            for (const neighbor of adj[routeId]) {
                const nextHavePassedB = currentHavePassedB;
                if (!visited[neighbor][nextHavePassedB]) {
                    queue.push({ routeId: neighbor, havePassedB: nextHavePassedB, busCount: busCount + 1 });
                }
            }
        }

        if (!found) {
            console.log(-1);
        }
    });
}

main();
