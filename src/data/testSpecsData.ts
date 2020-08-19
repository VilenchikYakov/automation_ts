import * as path from 'path';
import * as upath from 'upath';

const SPECS = {
  test: {
    specs: [upath.toUnix(path.resolve(__dirname, '../specs/test/specs')) + '/*.js'],
  },
};

export default SPECS;
