/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com).
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

import { IdentityAppsError } from "@wso2is/core/errors";
import { ConnectionTemplateLoadingStrategies } from "../models/connection";

type MinMax = { min: number; max: number };

/**
 * Class containing connection management constants.
 */
export class ConnectionManagementConstants {

    /**
     * Private constructor to avoid object instantiation from outside
     * the class.
     *
     */
    /* eslint-disable @typescript-eslint/no-empty-function */
    private constructor() { }

    /**
     * Internal domain name.
     *
     */
    public static readonly INTERNAL_DOMAIN: string  = "Internal/";

    public static readonly CANNOT_DELETE_IDP_DUE_TO_ASSOCIATIONS_ERROR_CODE = "IDP-65004";

    public static readonly PROVISIONING_CONNECTOR_DISPLAY_NAME: string = "displayName";
    public static readonly PROVISIONING_CONNECTOR_GOOGLE: string = "googleapps";

    public static readonly GOOGLE_ONE_TAP_ENABLED: string = "IsGoogleOneTapEnabled";
    
    public static readonly GOOGLE_OIDC_AUTHENTICATOR_ID: string = "R29vZ2xlT0lEQ0F1dGhlbnRpY2F0b3I";
    public static readonly FACEBOOK_AUTHENTICATOR_ID: string = "RmFjZWJvb2tBdXRoZW50aWNhdG9y";
    public static readonly TWITTER_AUTHENTICATOR_ID: string = "VHdpdHRlckF1dGhlbnRpY2F0b3I";
    public static readonly GITHUB_AUTHENTICATOR_ID: string = "R2l0aHViQXV0aGVudGljYXRvcg";
    public static readonly YAHOO_AUTHENTICATOR_ID: string = "WWFob29PQXV0aDJBdXRoZW50aWNhdG9y";
    public static readonly OFFICE_365_AUTHENTICATOR_ID: string = "T2ZmaWNlMzY1QXV0aGVudGljYXRvcg";
    public static readonly MS_LIVE_AUTHENTICATOR_ID: string = "TWljcm9zb2Z0V2luZG93c0xpdmVBdXRoZW50aWNhdG9y";
    public static readonly IWA_KERBEROS_AUTHENTICATOR_ID: string = "SVdBS2VyYmVyb3NBdXRoZW50aWNhdG9y";
    public static readonly MICROSOFT_AUTHENTICATOR_ID: string = "T3BlbklEQ29ubmVjdEF1dGhlbnRpY2F0b3I";
    public static readonly APPLE_AUTHENTICATOR_ID: string = "QXBwbGVPSURDQXV0aGVudGljYXRvcg";
    public static readonly HYPR_AUTHENTICATOR_ID: string = "SFlQUkF1dGhlbnRpY2F0b3I";
    public static readonly SIWE_AUTHENTICATOR_ID: string = "T3BlbklEQ29ubmVjdEF1dGhlbnRpY2F0b3I"

    public static readonly ORGANIZATION_ENTERPRISE_AUTHENTICATOR_ID: string = "T3JnYW5pemF0aW9uQXV0aGVudGljYXRvcg";
    public static readonly OIDC_AUTHENTICATOR_ID: string = "T3BlbklEQ29ubmVjdEF1dGhlbnRpY2F0b3I";
    public static readonly ORGANIZATION_SSO_AUTHENTICATOR_ID: string = "e8e40c0e-2238-4438-a9e4-69c063d9b9dd";
    public static readonly ORG_SSO_AUTHENTICATOR_ID: string = "44c2a88a-d8c1-4668-9717-44bc135fb015";

    public static readonly IDP_NAME_LENGTH: MinMax = { max: 120, min: 3 };
    public static readonly JWKS_URL_LENGTH: MinMax = { max: 2048, min: 0 };
    public static readonly CLAIM_CONFIG_FIELD_MAX_LENGTH: number  = 100;
    public static readonly CLAIM_CONFIG_FIELD_MIN_LENGTH: number  = 1;
    public static readonly CLAIM_APP_ROLE: string  = "http://wso2.org/claims/groups";
    public static readonly CLAIM_USERNAME: string  = "http://wso2.org/claims/username";
    public static readonly CLAIM_ROLE: string  = "http://wso2.org/claims/role";

    /**
     * General Form element constraints.
     */
    public static readonly GENERAL_FORM_CONSTRAINTS: Record<string, string | number> = {
        IMAGE_URL_MAX_LENGTH: 2048,
        IMAGE_URL_MIN_LENGTH: 3
    };

    /**
     * Default connection template loading strategy.
    **/
    public static readonly DEFAULT_IDP_TEMPLATE_LOADING_STRATEGY: ConnectionTemplateLoadingStrategies =
    ConnectionTemplateLoadingStrategies.LOCAL;

    public static readonly CONNECTION_TEMPLATE_FETCH_INVALID_STATUS_CODE_ERROR: string = "Received an " +
        "invalid status code while fetching identity provider template.";

    public static readonly CONNECTION_TEMPLATE_FETCH_ERROR: string = "An error occurred while fetching " +
    "the required identity provider template.";

    public static readonly LOCAL_AUTHENTICATOR_FETCH_INVALID_STATUS_CODE_ERROR: string = "Received an invalid " +
        "status code while fetching the local authenticator.";

    public static readonly LOCAL_AUTHENTICATOR_FETCH_ERROR: string = "An error occurred while fetching the " +
        "local authenticator.";

    public static readonly MULTI_FACTOR_AUTHENTICATOR_FETCH_INVALID_STATUS_CODE_ERROR: string = "Received an invalid " +
        "status code while fetching the multi-factor authenticator.";

    public static readonly MULTI_FACTOR_AUTHENTICATOR_UPDATE_INVALID_STATUS_CODE_ERROR: string = "Received an " +
        "invalid status code while updating the multi-factor authenticator.";

    public static readonly MULTI_FACTOR_AUTHENTICATOR_FETCH_ERROR: string = "An error occurred while fetching the " +
        "multi-factor authenticator.";

    public static readonly MULTI_FACTOR_AUTHENTICATOR_UPDATE_ERROR: string = "An error occurred while updating the " +
        "multi-factor authenticator.";
    
    public static readonly CONNECTION_JIT_PROVISIONING_UPDATE_ERROR: string = "An error occurred while" +
        " updating the JIT provisioning configurations of the identity provider.";

    public static readonly CONNECTION_CERTIFICATE_UPDATE_ERROR: string = "An error occurred while updating " +
        "the certificate of the identity provider.";

    public static readonly CONNECTION_CLAIMS_UPDATE_ERROR: string = "An error occurred while updating claims " +
        "configurations of the identity provider.";

    /**
     * Identity provider create limit reached error.
    **/
    public static readonly ERROR_CREATE_LIMIT_REACHED: IdentityAppsError = new IdentityAppsError(
        "IDP-60035",
        "console:develop.features.idp.notifications.apiLimitReachedError.error.description",
        "console:develop.features.idp.notifications.apiLimitReachedError.error.message",
        "cec1f247-32fd-4624-9915-f469195a53ac"
    )

    public static readonly ORG_ENTERPRISE_CONNECTION_ID: string  = "organization-enterprise-idp";

    /**
     * Key for the URL search param for IDP create wizard trigger.
     */
    public static readonly IDP_CREATE_WIZARD_TRIGGER_URL_SEARCH_PARAM_KEY: string = "open";

    /**
     * Key for the URL search param for IDP state.
     */
    public static readonly IDP_STATE_URL_SEARCH_PARAM_KEY: string = "state";

    /**
     * URL Search param for newly created IDPs.
     */
    public static readonly NEW_IDP_URL_SEARCH_PARAM: string = `?${
        this.IDP_STATE_URL_SEARCH_PARAM_KEY }=new`;

    public static readonly ADVANCED_TAB_ID: string  = "advanced";
    public static readonly ATTRIBUTES_TAB_ID: string  = "attributes";
    public static readonly CONNECTED_APPS_TAB_ID: string  = "connected-apps";
    public static readonly GENERAL_TAB_ID: string  = "general";
    public static readonly JIT_PROVISIONING_TAB_ID: string  = "jit-provisioning";
    public static readonly OUTBOUND_PROVISIONING_TAB_ID: string  = "outbound-provisioning";
    public static readonly SETTINGS_TAB_ID: string  = "settings";
    public static readonly IDENTITY_PROVIDER_GROUPS_TAB_ID: string  = "identity-provider-groups";

    public static readonly SHOW_PREDEFINED_TEMPLATES_IN_EXPERT_MODE_SETUP: boolean = false;

    /**
     * Google Scope mappings.
     */
    public static readonly GOOGLE_SCOPE_DICTIONARY: Record<string, string> = {
        EMAIL: "email",
        OPENID: "openid",
        PROFILE: "profile"
    };

    /**
     * Set of IDP template Ids.
     */
    public static readonly IDP_TEMPLATE_IDS: {
        APPLE: string;
        ENTERPRISE: string;
        FACEBOOK: string;
        GITHUB: string;
        GOOGLE: string;
        HYPR: string;
        MICROSOFT: string;
        OIDC: string;
        ORGANIZATION_ENTERPRISE_IDP: string;
        SAML: string;
        SWE: string;
    } = {
        APPLE: "apple-idp",
        ENTERPRISE: "enterprise-idp",
        FACEBOOK: "facebook-idp",
        GITHUB: "github-idp",
        GOOGLE: "google-idp",
        HYPR: "hypr-idp",
        MICROSOFT: "microsoft-idp",
        OIDC: "enterprise-oidc-idp",
        ORGANIZATION_ENTERPRISE_IDP: "organization-enterprise-idp",
        SAML: "enterprise-saml-idp",
        SWE: "swe-idp"
    };
}
