/**
 * Copyright (c) 2022, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
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

import { IdentifiableComponentInterface } from "@wso2is/core/models";
import isEmpty from "lodash-es/isEmpty";
import React, {
    Fragment,
    FunctionComponent,
    ReactElement
} from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../../../features/core/store";
import { BrandingPreferencesConstants } from "../../constants";
import { BrandingPreferenceMeta } from "../../meta";
import { BrandingPreferenceInterface } from "../../models";

/**
 * Proptypes for the product footer component of login screen skeleton.
 */
interface ProductFooterInterface extends IdentifiableComponentInterface {
    /**
     * Branding preferences object.
     */
    brandingPreference: BrandingPreferenceInterface;
}

/**
 * Product Footer Component.
 *
 * @param props - Props injected to the component.
 *
 * @returns Product footer component.
 */
export const ProductFooter: FunctionComponent<ProductFooterInterface> = (
    props: ProductFooterInterface
): ReactElement => {

    const {
        ["data-componentid"]: componentId,
        brandingPreference
    } = props;

    const systemTheme: string = useSelector((state: AppState) => state.config.ui.theme?.name);

    return (
        <div data-componentid = { componentId } className="footer">
            <div className="ui container fluid">
                <div className="ui text menu">
                    <div className="left menu">
                        <a className="item no-hover" id="copyright">
                            <span>{ brandingPreference.organizationDetails.copyrightText }</span>
                            {
                                (brandingPreference.configs?.removeAsgardeoBranding === false) && (
                                    <Fragment>
                                        <div className="powered-by-logo-divider">|</div>
                                            Powered by <div className="powered-by-logo">
                                            <img
                                                width="80"
                                                height="20"
                                                src={
                                                    Object.prototype.hasOwnProperty.call(
                                                        BrandingPreferenceMeta
                                                            .getBrandingPreferenceInternalFallbacks(systemTheme)
                                                            .theme,
                                                        brandingPreference.theme.activeTheme
                                                    )
                                                        ? BrandingPreferenceMeta
                                                            .getBrandingPreferenceInternalFallbacks(systemTheme)
                                                            .theme[
                                                                brandingPreference.theme.activeTheme
                                                            ].images.logo.imgURL
                                                        : BrandingPreferenceMeta
                                                            .getBrandingPreferenceInternalFallbacks(systemTheme)
                                                            .theme[
                                                                BrandingPreferencesConstants.DEFAULT_THEME
                                                            ].images.logo.imgURL
                                                }
                                                alt="Asgardeo Logo"
                                            />
                                        </div>
                                    </Fragment>
                                )
                            }
                        </a>
                    </div>
                    <div className="right menu">
                        {
                            !isEmpty(brandingPreference.urls?.privacyPolicyURL) && (
                                <a
                                    id="privacy-policy"
                                    className="item"
                                    href={ brandingPreference.urls.privacyPolicyURL }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-testid="login-page-privacy-policy-link"
                                >
                                        Privacy Policy
                                </a>
                            )
                        }
                        {
                            !isEmpty(brandingPreference.urls?.termsOfUseURL) && (
                                <a
                                    id="terms-of-service"
                                    className="item"
                                    href={ brandingPreference.urls.termsOfUseURL }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-testid="login-page-privacy-policy-link"
                                >
                                        Terms of Service
                                </a>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

/**
 * Default props for the component.
 */
ProductFooter.defaultProps = {
    "data-componentid": "login-screen-skeleton-product-footer"
};
