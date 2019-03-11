import {Validators, ValidatorManager} from '../../src/validator';
import { expect } from 'chai';
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';

describe('Validate bad schema function', () => {
  it('should return false', () => {
    ValidatorManager.loadCoreValidators();
    var result = Validators.steedosObjectSchema({namex: "aaa"})
    expect(result).to.equal(false);
  });
});