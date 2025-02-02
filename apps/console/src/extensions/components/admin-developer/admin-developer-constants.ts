/**
 * Copyright (c) 2021, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { AppConstants } from "../../../features/core";

/**
 * Class containing consumer users constants.
 */
export class AdminDeveloperConstants {

    /**
     * Private constructor to avoid object instantiation from outside
     * the class.
     *
     * @hideconstructor
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() { }

    /**
     * Get the consumer users paths as a map.
     *
     * @return {Map<string, string>}
     */
    public static getPaths(): Map<string, string> {

        return new Map<string, string>()
            .set("ADMIN_DEVELOPER_PATH", `${ AppConstants.getAdminViewBasePath() }/admin-developer`)
            .set("ADMIN_DEVELOPER_PATH", `${ AppConstants.getAdminViewBasePath() }/admin-developer/:id`);
    }

}
