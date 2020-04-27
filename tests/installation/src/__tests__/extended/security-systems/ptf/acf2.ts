/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2020
 */

import {
  checkMandatoryEnvironmentVariables,
  installAndVerifySmpePtf,
} from '../../../../utils';
import { TEST_TIMEOUT_CONVENIENCE_BUILD } from '../../../../constants';

/**
 * Define this test should run in a specific worker
 *
 * @worker marist-2
 */
const testSuiteName = 'Test SMPE PTF installation with ACF2';
describe(testSuiteName, () => {
  beforeAll(() => {
    // validate variables
    checkMandatoryEnvironmentVariables([
      'ZOWE_BUILD_LOCAL',
    ]);
  });

  test('install and verify', async () => {
    await installAndVerifySmpePtf(
      testSuiteName,
      // hard code to use marist-2 which we started with ACF2
      'marist-2',
      {
        'zowe_build_local': process.env['ZOWE_BUILD_LOCAL'],
      }
    );
  }, TEST_TIMEOUT_CONVENIENCE_BUILD);
});
