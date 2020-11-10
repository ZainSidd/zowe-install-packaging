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
    installAndVerifyConvenienceBuild,
    showZoweRuntimeLogs,
  } from '../../../utils';
  import {
  TEST_TIMEOUT_CONVENIENCE_BUILD,
  KEYSTORE_MODE_KEYRING,
  ZOWE_TOKEN_NAME,
  ZOWE_TOKEN_LABEL, ZOWE_APIML_SECURITY_X509_ENABLED,
} from '../../../constants';
  
  const testServer = 'marist-1';
  const testSuiteName = 'Test convenience build installation with keystore pointing to a RACF keyring';
  describe(testSuiteName, () => {
    beforeAll(() => {
      // validate variables
      checkMandatoryEnvironmentVariables([
        'ZOWE_BUILD_LOCAL',
      ]);
    });
  
    test('install and verify', async () => {
      await installAndVerifyConvenienceBuild(
        testSuiteName,
        testServer,
        {
          'zowe_build_local': process.env['ZOWE_BUILD_LOCAL'],
          'zos_keystore_mode': KEYSTORE_MODE_KEYRING,
          'zowe_lock_keystore': 'false',
          'zowe_token_name': ZOWE_TOKEN_NAME,
          'zowe_token_label': ZOWE_TOKEN_LABEL,
          'zowe_apiml_security_x509_enabled': ZOWE_APIML_SECURITY_X509_ENABLED,
        }
      );
    }, TEST_TIMEOUT_CONVENIENCE_BUILD);
  
    afterAll(async () => {
      await showZoweRuntimeLogs(testServer);
    })
  });
