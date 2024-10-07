const fs = require('fs');
const prompt = require('prompt-sync')({ sigint: true }); // Import prompt-sync

// Helper function to write to file
function writeToFile(fileName, content, append = false) {
    if (append) {
        fs.appendFileSync(fileName, content);
    } else {
        fs.writeFileSync(fileName, content);
    }
}

class CElement {
    constructor() {
        this.n_atm = 0; // total atom number
        this.n_mol = 0; // molecule number
        this.n_seg = 0; // The number of different types of segments
        this.segn = []; // atom number in each segment
        this.segt = []; // atom type in each segment
        this.segRigid = []; // Is this segment rigid
        this.l_bnd = 0; // bond length

        // Init box
        this.lx = 0; this.ly = 0; this.lz = 0;
        this.hx = 0; this.hy = 0; this.hz = 0;

        this.init();
    }

    init() {
        let rigidTemp = false;

        this.n_seg = parseInt(prompt("Input number of segments: "));
        for (let i = 0; i < this.n_seg; i++) {
            this.segn.push(0);
            this.segt.push(0);
            this.segRigid.push(rigidTemp);
        }
        this.n_atm = 0;

        for (let i = 0; i < this.n_seg; i++) {
            this.segt[i] = parseInt(prompt(`Input the atom type of ${i + 1} segment: `));
            this.segn[i] = parseInt(prompt("Input the atom number of this type: "));
            this.n_atm += this.segn[i]; // total atom number in each molecule

            if (this.segn[i] > 2) { // only atom number >=3 can be rigid chain
                let boolTemp = prompt("Is this segment a rigid segment? (please input true or false): ");
                while (true) {
                    if (boolTemp === "true" || boolTemp === "false") {
                        rigidTemp = boolTemp === "true";
                        this.segRigid[i] = rigidTemp;
                        break;
                    } else {
                        boolTemp = prompt("Invalid value, please input true or false:");
                    }
                }
            }
        }

        this.n_mol = parseInt(prompt("Input the number of molecules: "));
        this.n_atm *= this.n_mol; // total atom number for all molecules

        this.l_bnd = parseFloat(prompt("Bond length:"));

        // Init box
        this.lx = parseFloat(prompt("Input lowx:"));
        this.hx = parseFloat(prompt("Input highx:"));
        this.ly = parseFloat(prompt("Input lowy:"));
        this.hy = parseFloat(prompt("Input highy:"));
        this.lz = parseFloat(prompt("Input lowz:"));
        this.hz = parseFloat(prompt("Input highz:"));
    }
}

function write_title(fileName) {
    let content = "LAMMPS data file by lmp_data\n\n";
    let n_atom = 0, n_bond = 0, n_angle = 0;

    sys.forEach((element) => {
        n_atom += element.n_atm;
        if (element.l_bnd > 0) {
            n_bond += element.n_mol * (element.n_atm / element.n_mol - 1);
            element.segn.forEach((segLength, segIndex) => {
                if (element.segRigid[segIndex]) {
                    n_angle += segLength - 2;
                }
            });
        }
    });

    content += `${n_atom} atoms\n`;
    content += `${n_bond} bonds\n`;
    content += `${n_angle} angles\n`;
    content += "0 dihedrals\n";
    content += "0 impropers\n\n";

    let maxatyp = 0;
    let minx = Number.MAX_VALUE, maxx = -Number.MAX_VALUE;
    let miny = Number.MAX_VALUE, maxy = -Number.MAX_VALUE;
    let minz = Number.MAX_VALUE, maxz = -Number.MAX_VALUE;

    sys.forEach((element) => {
        element.segt.forEach((type) => {
            if (type > maxatyp) maxatyp = type;
        });
        if (element.hx > maxx) maxx = element.hx;
        if (element.hy > maxy) maxy = element.hy;
        if (element.hz > maxz) maxz = element.hz;
        if (element.lx < minx) minx = element.lx;
        if (element.ly < miny) miny = element.ly;
        if (element.lz < minz) minz = element.lz;
    });

    content += `${maxatyp} atom types\n`;
    content += `1 bond types\n`;
    content += `0 angle types\n`;
    content += `0 dihedral types\n`;
    content += `0 improper types\n\n`;
    content += `${minx} ${maxx} xlo xhi\n`;
    content += `${miny} ${maxy} ylo yhi\n`;
    content += `${minz} ${maxz} zlo zhi\n\n`;

    content += "Masses\n\n";
    for (let i = 0; i < maxatyp; i++) {
        content += `${i + 1} 1.0\n`;
    }
    content += "\n";

    writeToFile(fileName, content);
}

let sys = [];
let n_element = parseInt(prompt("Input element number: "));
for (let i = 0; i < n_element; i++) {
    let tempElement = new CElement();
    sys.push(tempElement);
}

let iseed = parseInt(prompt("Input seed value: "));
Math.seedrandom(iseed);
console.log(iseed);

// Write Title to file
const outputFileName = 'data.out';
write_title(outputFileName);

// Continue with other write functions like write_atom, write_bond, etc.
