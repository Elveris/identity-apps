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

/**
 * Interface for the resource endpoints of extended features.
 */
export interface ExtendedFeatureResourceEndpointsInterface {
    /**
     * Tenant Branding Preference API endpoint.
     */
    brandingPreference: string;
    /**
     * Remote user store agent connection API endpoint.
     */
    userStoreAgentConnection: string;
    /**
     * Remote user store agent token API endpoint.
     */
    userStoreAgentToken: string;

    /**
     * Get the resource endpoints for the Invitation Management feature.
     */
    userEndpoint: string;
    resendEndpoint: string;
    inviteEndpoint: string;
    inviteLinkEndpoint: string;
    organizationEndpoint: string;
    organizationPatchEndpoint: string;

    /**
     * Diagnostic logs API endpoint.
     */
    diagnosticLogsEndpoint: string;

    /**
     * Event Publishing API endpoint.
     */
    emailProviderEndpoint : string;
    
    /**
     * Event Publishing API endpoint.
     */
    eventsEndpoint : string;

    /**
     * Eventing endpoint in Choreo.
     */
    choreoEventingEndpoint : string;

    /**
     * Notification senders API endpoint.
     */
    notificationSendersEndPoint: string;
    
    /**
     * Authorization Service API endpoint.
     */
    authzEndpoint: string;

    /**
     * Email management API endpoint.
     */
    emailManagement: string;
}
