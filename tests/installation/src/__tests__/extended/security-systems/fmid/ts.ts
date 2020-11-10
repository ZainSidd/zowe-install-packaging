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
  installAndVerifySmpeFmid,
  showZoweRuntimeLogs,
} from '../../../../utils';
import {SSO_USE_GSKKYMAN,
  TEST_TIMEOUT_SMPE_FMID,
  ZOWE_TOKEN_LABEL,
  ZOWE_TOKEN_NAME} from '../../../../constants';

/**
 * Define this test should run in a specific worker
 *
 * @worker marist-3
 */
// hard code to use marist-3 which we started with Top Secret
const testServer = 'marist-3';
const testSuiteName = 'Test SMPE FMID installation with Top Secret';
describe(testSuiteName, () => {
  beforeAll(() => {
    // validate variables
    checkMandatoryEnvironmentVariables([
      'ZOWE_BUILD_LOCAL',
    ]);
  });

  test('install and verify', async () => {
    await installAndVerifySmpeFmid(
      testSuiteName,
      testServer,
      {
        'zowe_build_local': process.env['ZOWE_BUILD_LOCAL'],
        'zowe_lock_keystore': 'false',
        'zowe_token_name': ZOWE_TOKEN_NAME,
        'zowe_token_label': ZOWE_TOKEN_LABEL,
        'sso_use_gskkyman': SSO_USE_GSKKYMAN,
      }
    );
  }, TEST_TIMEOUT_SMPE_FMID);

  afterAll(async () => {
    await showZoweRuntimeLogs(testServer);
  })
});
