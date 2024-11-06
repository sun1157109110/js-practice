const fs = require('fs');
const path = require('path');

class CElement {
  constructor() {
    this.n_atm = 0; // total atom number
    this.n_mol = 0; // molecule number
    this.n_seg = 0; // The number of different type of segment, such as A-b-B, is 2.
    this.segn = []; // atom number in each segment
    this.segt = []; // atom type in each segment
    this.segRigid = []; // A sign for rigid (true) or coil (false) blocks
    this.l_bnd = 0.0; // bond length

    // init box
    this.lx = 0;
    this.ly = 0;
    this.lz = 0;
    this.hx = 0;
    this.hy = 0;
    this.hz = 0;
  }
}

const sys = [];
let n_element = 0;
let iseed = 0;

function main() {
  const inputData = fs.readFileSync(path.join(__dirname, 'chain.txt'), 'utf-8');
  const lines = inputData.split('\n').filter(line => line.trim() !== '');
  let currentLine = 0;

  // Input element number
  n_element = parseInt(lines[currentLine++]);

  for (let i = 0; i < n_element; i++) {
    const element = new CElement();
    element.n_seg = parseInt(lines[currentLine++]);

    for (let j = 0; j < element.n_seg; j++) {
      element.segt.push(parseInt(lines[currentLine++]));
      element.segn.push(parseInt(lines[currentLine++]));
      element.n_atm += element.segn[j];

      if (element.segn[j] > 2 && currentLine < lines.length) {
        const rigidValue = lines[currentLine++]?.trim();
        if (rigidValue === 'true' || rigidValue === 'false') {
          element.segRigid.push(rigidValue === 'true');
        } else {
          throw new Error(`Invalid value for rigid segment: ${rigidValue}`);
        }
      } else {
        element.segRigid.push(false);
      }
    }

    element.n_mol = parseInt(lines[currentLine++]);
    element.n_atm *= element.n_mol;
    element.l_bnd = parseFloat(lines[currentLine++]);

    // Init box
    if (currentLine < lines.length) {
      const boxValues = lines[currentLine++].split(' ').map(parseFloat);
      if (boxValues.length >= 2) {
        element.lx = boxValues[0];
        element.hx = boxValues[1];
      }
    }

    if (currentLine < lines.length) {
      const boxValuesY = lines[currentLine++].split(' ').map(parseFloat);
      if (boxValuesY.length >= 2) {
        element.ly = boxValuesY[0];
        element.hy = boxValuesY[1];
      }
    }

    if (currentLine < lines.length) {
      const boxValuesZ = lines[currentLine++].split(' ').map(parseFloat);
      if (boxValuesZ.length >= 2) {
        element.lz = boxValuesZ[0];
        element.hz = boxValuesZ[1];
      }
    }

    sys.push(element);
  }

  if (currentLine < lines.length) {
    iseed = parseInt(lines[currentLine++]);
  }
  Math.seedrandom = require('seedrandom');
  Math.seedrandom(iseed.toString(), { global: true });

  const outputFile = path.join(__dirname, 'data.out');
  const outputStream = fs.createWriteStream(outputFile);

  writeTitle(outputStream);
  writeAtom(outputStream);
  writeBond(outputStream);

  outputStream.end();
}

function writeTitle(fn) {
  let n_atom = 0;
  let n_bond = 0;
  let n_angle = 0;

  sys.forEach((element) => {
    n_atom += element.n_atm;
    if (element.l_bnd > 0.0) {
      n_bond += element.n_mol * (element.n_atm / element.n_mol - 1);
      element.n_mol && element.segRigid.forEach((rigid, index) => {
        if (rigid) {
          n_angle += element.segn[index] - 2;
        }
      });
    }
  });

  fn.write(`LAMMPS data file by lmp_data\n\n`);
  fn.write(`${n_atom} atoms\n`);
  fn.write(`${n_bond} bonds\n`);
  fn.write(`${n_angle} angles\n`);
  fn.write(`0 dihedrals\n`);
  fn.write(`0 impropers\n\n`);

  let maxatyp = 0;
  let maxx = -Number.MAX_VALUE, maxy = -Number.MAX_VALUE, maxz = -Number.MAX_VALUE;
  let minx = Number.MAX_VALUE, miny = Number.MAX_VALUE, minz = Number.MAX_VALUE;

  sys.forEach((element) => {
    element.segt.forEach((type) => {
      if (type > maxatyp) maxatyp = type;
    });
    if (maxx < element.hx) maxx = element.hx;
    if (maxy < element.hy) maxy = element.hy;
    if (maxz < element.hz) maxz = element.hz;
    if (minx > element.lx) minx = element.lx;
    if (miny > element.ly) miny = element.ly;
    if (minz > element.lz) minz = element.lz;
  });

  fn.write(`${maxatyp} atom types\n`);
  fn.write(`1 bond types\n`);
  fn.write(`0 angle types\n`);
  fn.write(`0 dihedral types\n`);
  fn.write(`0 improper types\n`);
  fn.write(`10 extra bond per atom\n\n`);

  fn.write(`${minx} ${maxx} xlo xhi\n`);
  fn.write(`${miny} ${maxy} ylo yhi\n`);
  fn.write(`${minz} ${maxz} zlo zhi\n\n`);

  fn.write(`Masses\n\n`);
  for (let i = 0; i < maxatyp; i++) {
    fn.write(`${i + 1} 1.0\n`);
  }
  fn.write(`\n`);
}

function writeAtom(fn) {
  fn.write(`Atoms # full\n\n`);
  let na = 0;
  let nm = 1;

  sys.forEach((element) => {
    for (let j = 0; j < element.n_mol; j++) {
      for (let k = 0; k < element.n_seg; k++) {
        for (let l = 0; l < element.segn[k]; l++) {
          na++;
          fn.write(` ${na} ${nm} ${element.segt[k]} `);
          fn.write(`${element.segt[k] === 2 ? -1 : element.segt[k] === 3 ? 1 : 0} `);
          const x = randomInRange(element.lx, element.hx);
          const y = randomInRange(element.ly, element.hy);
          const z = randomInRange(element.lz, element.hz);
          fn.write(`${x} ${y} ${z}\n`);
        }
      }
      nm++;
    }
  });
  fn.write(`\n`);
}

function writeBond(fn) {
  fn.write(`Bonds\n\n`);
  let na = 0;
  let nb = 1;

  sys.forEach((element) => {
    for (let j = 0; j < element.n_mol; j++) {
      for (let k = 0; k < element.n_seg; k++) {
        for (let l = 0; l < element.segn[k]; l++) {
          na++;
          if (element.l_bnd > 0.0 && (k * k + l * l) !== 0) {
            fn.write(` ${nb} 1 ${na - 1} ${na}\n`);
            nb++;
          }
        }
      }
    }
  });
  fn.write(`\n`);
}

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

main();