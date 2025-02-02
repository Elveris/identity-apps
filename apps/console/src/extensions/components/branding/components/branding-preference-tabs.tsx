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

import { IdentifiableComponentInterface } from "@wso2is/core/models";
import { FormPropsInterface } from "@wso2is/form";
import { Heading, Link, ResourceTab } from "@wso2is/react-components";
import cloneDeep from "lodash-es/cloneDeep";
import isEmpty from "lodash-es/isEmpty";
import set from "lodash-es/set";
import React, { FunctionComponent, MutableRefObject, ReactElement, useEffect, useRef, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Divider, Dropdown, DropdownProps, Message, Segment, TabProps } from "semantic-ui-react";
import { AdvanceForm, AdvanceFormValuesInterface } from "./advanced";
import { DesignForm, DesignFormValuesInterface } from "./design";
import {
    GeneralDetailsForm,
    GeneralDetailsFormValuesInterface
} from "./general";
import { BrandingPreferencePreview } from "./preview";
import { StickyTabPaneActionPanel } from "./sticky-tab-pane-action-panel";
import { AppState } from "../../../../features/core/store";
import { BrandingPreferencesConstants } from "../constants";
import { BrandingPreferenceMeta } from "../meta";
import {
    BrandingPreferenceInterface,
    BrandingPreferenceThemeInterface,
    PredefinedThemes,
    PreviewScreenType
} from "../models";

/**
 * Proptypes for the Branding preference tabs component.
 */
interface BrandingPreferenceTabsInterface extends IdentifiableComponentInterface {

    /**
     * Branding preferences object.
     */
    brandingPreference: BrandingPreferenceInterface;
    /**
     * Predefines themes configs with default values.
     */
    predefinedThemes: BrandingPreferenceThemeInterface;
    /**
     * Is the component loading.
     */
    isLoading: boolean;
    /**
     * Is Read only?
     */
    readOnly: boolean;
    /**
     * Should the tabs be split in to two views.
     */
    isSplitView: boolean;
    /**
     * Is the component updating.
     */
    isUpdating: boolean;
    /**
     *
     * @param values - Form Values.
     */
    onSubmit: (values: Partial<BrandingPreferenceInterface>) => void;
}

/**
 * Branding Preference Tabs.
 *
 * @param props - Props injected to the component.
 *
 * @returns React.ReactElement
 */
export const BrandingPreferenceTabs: FunctionComponent<BrandingPreferenceTabsInterface> = (
    props: BrandingPreferenceTabsInterface
): ReactElement => {

    const {
        ["data-componentid"]: componentId,
        predefinedThemes,
        brandingPreference,
        isLoading,
        isSplitView,
        isUpdating,
        readOnly,
        onSubmit
    } = props;

    const { t } = useTranslation();

    const formRef: MutableRefObject<FormPropsInterface> = useRef<FormPropsInterface>(null);

    const systemTheme: string = useSelector((state: AppState) => state.config.ui.theme?.name);
    const supportEmail: string = useSelector((state: AppState) =>
        state.config.deployment.extensions?.supportEmail as string);

    const [ isSubmitting, setIsSubmitting ] = useState<boolean>(isUpdating);
    const [
        brandingPreferenceForPreview,
        setBrandingPreferenceForPreview
    ] = useState<BrandingPreferenceInterface>(brandingPreference);
    const [ previewScreenType, setPreviewScreenType ] = useState<PreviewScreenType>(PreviewScreenType.LOGIN);

    /**
     * Sets the branding preference preview config.
     */
    useEffect(() => {

        if (isEmpty(brandingPreference)) {
            return;
        }

        setBrandingPreferenceForPreview(moderateValuesForPreview(brandingPreference));
    }, [ brandingPreference, predefinedThemes ]);

    /**
     * Sets the submitting state of the form.
     */
    useEffect(() => {

        setIsSubmitting(isUpdating);
    }, [ isUpdating ]);

    /**
     * General Preferences Tab.
     * @returns ReactElement
     */
    const GeneralPreferenceTabPane = (): ReactElement => (
        <ResourceTab.Pane attached="bottom" data-componentid="branding-preference-general-tab">
            <Segment
                basic
                padded="very"
                className="preference-form-container"
                data-componentid="branding-preference-general-tab-content-container"
            >
                <GeneralDetailsForm
                    ref={ formRef }
                    onSubmit={ onSubmit }
                    initialValues={ {
                        organizationDetails: {
                            copyrightText: brandingPreference.organizationDetails?.copyrightText,
                            siteTitle: brandingPreference.organizationDetails?.siteTitle,
                            supportEmail: brandingPreference.organizationDetails?.supportEmail
                        }
                    } }
                    broadcastValues={ (values: GeneralDetailsFormValuesInterface) => {
                        setBrandingPreferenceForPreview({
                            ...moderateValuesForPreview({
                                ...brandingPreference,
                                organizationDetails: {
                                    copyrightText: !isEmpty(values.organizationDetails.copyrightText)
                                        ? values.organizationDetails.copyrightText
                                        : BrandingPreferenceMeta
                                            .getBrandingPreferenceInternalFallbacks(
                                                systemTheme
                                            ).organizationDetails.copyrightText,
                                    siteTitle: values.organizationDetails.siteTitle,
                                    supportEmail: values.organizationDetails.supportEmail
                                }
                            })
                        });
                    } }
                    isLoading={ isLoading }
                    readOnly={ readOnly }
                    isLive={ brandingPreference.configs.isBrandingEnabled }
                    data-componentid="branding-preference-general-details-form"
                />
            </Segment>
            <StickyTabPaneActionPanel
                formRef={ formRef }
                saveButton={ {
                    "data-componentid": "branding-preference-general-details-form-submit-button",
                    isDisabled: isSubmitting || isLoading,
                    isLoading: isSubmitting,
                    readOnly: readOnly
                } }
                data-componentid="sticky-tab-action-panel"
            />
        </ResourceTab.Pane>
    );

    /**
     * Design Preferences Tab.
     * @returns ReactElement
     */
    const DesignPreferenceTabPane = (): ReactElement => (
        <ResourceTab.Pane attached="bottom" data-componentid="branding-preference-design-tab">
            <Segment
                basic
                padded="very"
                className="preference-form-container no-max-width"
                data-componentid="branding-preference-design-tab-content-container"
            >
                <DesignForm
                    initialValues={ {
                        layout: brandingPreference.layout,
                        theme: brandingPreference.theme
                    } }
                    ref={ formRef }
                    isLoading={ isLoading }
                    onSubmit={ onSubmit }
                    broadcastValues={ (values: DesignFormValuesInterface) => {
                        setBrandingPreferenceForPreview({
                            ...moderateValuesForPreview({
                                ...brandingPreference,
                                layout: values.layout,
                                theme: values.theme
                            })
                        });
                    } }
                    readOnly={ readOnly }
                    data-componentid="branding-preference-design-form"
                />
            </Segment>
            <StickyTabPaneActionPanel
                formRef={ formRef }
                saveButton={ {
                    "data-componentid": "branding-preference-design-form-submit-button",
                    isDisabled: isSubmitting || isLoading,
                    isLoading: isSubmitting,
                    readOnly: readOnly
                } }
                data-componentid="sticky-tab-action-panel"
            />
        </ResourceTab.Pane>
    );

    /**
     * Advance Preferences Tab.
     * @returns ReactElement
     */
    const AdvancePreferenceTabPane = (): ReactElement => (
        <ResourceTab.Pane attached="bottom" data-componentid="branding-preference-advanced-tab">
            <Segment
                basic
                padded="very"
                className="preference-form-container"
                data-componentid="branding-preference-advanced-tab-content-container"
            >
                <AdvanceForm
                    ref={ formRef }
                    onSubmit={ onSubmit }
                    initialValues={ {
                        urls: {
                            cookiePolicyURL: brandingPreference.urls?.cookiePolicyURL,
                            privacyPolicyURL: brandingPreference.urls?.privacyPolicyURL,
                            termsOfUseURL: brandingPreference.urls?.termsOfUseURL
                        }
                    } }
                    isLoading={ isLoading }
                    isSubmitting={ isSubmitting }
                    broadcastValues={ (values: AdvanceFormValuesInterface) => {
                        setBrandingPreferenceForPreview({
                            ...moderateValuesForPreview({
                                ...brandingPreference,
                                urls: values.urls
                            })
                        });
                    } }
                    readOnly={ readOnly }
                    data-componentid="branding-preference-advanced-form"
                />
                <Divider hidden/>
                { !isLoading && (
                    <Message info className={ "mb-5 connector-info" }>
                        <Heading as="h3">
                            { t("extensions:develop.branding.tabs.general.customRequest.heading") }
                        </Heading>
                        <p>
                            <Trans
                                i18nKey={ "extensions:develop.branding.tabs.general.customRequest.description" }
                                tOptions={ {
                                    supportEmail
                                } }
                            >
                            If you require further customizations, please reach to us at <Link
                                    data-componentid="branding-preference-custom-request-mail-trigger"
                                    link={ `mailto:${ supportEmail }` }>{ supportEmail }</Link>
                            </Trans>
                        </p>
                    </Message>
                ) }
            </Segment>
            <StickyTabPaneActionPanel
                formRef={ formRef }
                saveButton={ {
                    "data-componentid": "branding-preference-advanced-form-submit-button",
                    isDisabled: isSubmitting || isLoading,
                    isLoading: isSubmitting,
                    readOnly: readOnly
                } }
                data-componentid="sticky-tab-action-panel"
            />
        </ResourceTab.Pane>
    );

    /**
     * Preview Preferences Tab.
     * @returns ReactElement
     */
    const PreviewPreferenceTabPane = (): ReactElement => (
        <ResourceTab.Pane className="preview-tab" attached="bottom" data-componentid="branding-preference-preview-tab">
            <BrandingPreferencePreview
                screenType={ previewScreenType }
                isLoading={ isLoading }
                brandingPreference={ brandingPreferenceForPreview }
                data-componentid="branding-preference-preview"
            />
        </ResourceTab.Pane>
    );

    /**
     * Resolves the tab panes based on the application config.
     *
     * @returns TabProps [ "panes" ] Resolved tab panes.
     */
    const resolveTabPanes = (): TabProps [ "panes" ] => {

        const panes: TabProps [ "panes" ] = [];

        panes.push({
            menuItem: t("extensions:develop.branding.tabs.general.label"),
            render: GeneralPreferenceTabPane
        });

        panes.push({
            menuItem: t("extensions:develop.branding.tabs.design.label"),
            render: DesignPreferenceTabPane
        });

        panes.push({
            menuItem: t("extensions:develop.branding.tabs.advance.label"),
            render: AdvancePreferenceTabPane
        });

        if (!isSplitView) {
            panes.push({
                menuItem: t("extensions:develop.branding.tabs.preview.label"),
                render: PreviewPreferenceTabPane
            });
        }

        return panes;
    };

    /**
     * Moderate the values for the preview window.
     * @param preference - Preference Object.
     */
    const moderateValuesForPreview = (preference: BrandingPreferenceInterface): BrandingPreferenceInterface => {

        const preferenceForPreview: BrandingPreferenceInterface = cloneDeep(preference);

        for (const key in PredefinedThemes) {
            if (isEmpty(preferenceForPreview.theme[ PredefinedThemes[ key ] ]?.images?.logo?.imgURL)) {
                set(preferenceForPreview,
                    `theme.${ PredefinedThemes[ key ] }.images.logo.imgURL`,
                    Object.prototype.hasOwnProperty.call(
                        BrandingPreferenceMeta.getBrandingPreferenceInternalFallbacks(systemTheme).theme,
                        PredefinedThemes[ key ]
                    )
                        ? BrandingPreferenceMeta.getBrandingPreferenceInternalFallbacks(systemTheme)
                            .theme[ PredefinedThemes[ key ] ].images.logo.imgURL
                        : BrandingPreferenceMeta.getBrandingPreferenceInternalFallbacks(systemTheme)
                            .theme[ BrandingPreferencesConstants.DEFAULT_THEME ].images.logo.imgURL
                );
            }
        }

        if (isEmpty(preferenceForPreview.organizationDetails?.copyrightText)) {
            set(preferenceForPreview,
                "organizationDetails.copyrightText",
                BrandingPreferenceMeta.getBrandingPreferenceInternalFallbacks(
                    systemTheme
                ).organizationDetails.copyrightText);
        }

        return preferenceForPreview;
    };

    return (
        <Segment.Group horizontal className="basic branding-preference-tab-group" data-componentid={ componentId }>
            <Segment basic padded={ false }>
                <ResourceTab
                    attached="top"
                    secondary={ false }
                    pointing={ false }
                    onTabChange={ () => setBrandingPreferenceForPreview(moderateValuesForPreview(brandingPreference)) }
                    panes={ resolveTabPanes() }
                    data-componentid={ `${componentId}-forms` }
                />
            </Segment>
            { isSplitView && (
                <Segment basic padded={ false } className="preview">
                    <ResourceTab
                        attached="top"
                        secondary={ false }
                        pointing={ false }
                        panes={ [
                            {
                                menuItem: (
                                    <div className="preview-title-bar">
                                        <div>Preview</div>
                                        <div className="preview-screen-selection">
                                            <label>Screen</label>
                                            <Dropdown
                                                placeholder="Select a screen"
                                                fluid
                                                selection
                                                defaultValue={ PreviewScreenType.LOGIN }
                                                options={ [
                                                    {
                                                        key: "login",
                                                        text: "Login",
                                                        value: PreviewScreenType.LOGIN
                                                    },
                                                    {
                                                        key: "myaccount",
                                                        text: "My Account",
                                                        value: PreviewScreenType.MY_ACCOUNT
                                                    },
                                                    {
                                                        key: "email-template",
                                                        text: "Email Template",
                                                        value: PreviewScreenType.EMAIL_TEMPLATE
                                                    }
                                                ] }
                                                onChange={ (
                                                    _: React.SyntheticEvent<HTMLElement, Event>,
                                                    { value }: DropdownProps
                                                ) => {
                                                    setPreviewScreenType(value as PreviewScreenType);
                                                } }
                                            />
                                        </div>
                                    </div>
                                ),
                                render: PreviewPreferenceTabPane
                            }
                        ] }
                        data-componentid={ `${componentId}-preview` }
                    />
                </Segment>
            ) }
        </Segment.Group>
    );
};

/**
 * Default props for the component.
 */
BrandingPreferenceTabs.defaultProps = {
    "data-componentid": "branding-preference-tabs"
};
