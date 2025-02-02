/**
 * Copyright (c) 2020, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
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

import { useColorScheme } from "@mui/material";
import {
    ArrowRightFromBracketIcon,
    ChevronDownIcon,
    LanguageIcon,
    RectangleLineIcon
} from "@oxygen-ui/react-icons";
import Alert from "@oxygen-ui/react/Alert";
import Button from "@oxygen-ui/react/Button";
import Flag from "@oxygen-ui/react/CountryFlag";
import OxygenHeader from "@oxygen-ui/react/Header";
import Image from "@oxygen-ui/react/Image";
import ListItem from "@oxygen-ui/react/ListItem";
import ListItemAvatar from "@oxygen-ui/react/ListItemAvatar";
import ListItemIcon from "@oxygen-ui/react/ListItemIcon";
import ListItemText from "@oxygen-ui/react/ListItemText";
import Menu from "@oxygen-ui/react/Menu";
import MenuItem from "@oxygen-ui/react/MenuItem";
import { resolveAppLogoFilePath } from "@wso2is/core/helpers";
import {
    AlertLevels,
    LinkedAccountInterface
} from "@wso2is/core/models";
import { addAlert } from "@wso2is/core/store";
import {
    StringUtils
} from "@wso2is/core/utils";
import { I18n, LocaleMeta, SupportedLanguagesMeta } from "@wso2is/i18n";
import isEmpty from "lodash-es/isEmpty";
import React, {
    FunctionComponent,
    MouseEvent,
    ReactElement,
    useEffect,
    useState
} from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Action, AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { Gravatar } from "./gravatar";
import { AppConstants } from "../../constants";
import { commonConfig } from "../../extensions";
import { history, resolveUserstore } from "../../helpers";
import { useBrandingPreference } from "../../hooks/use-branding-preference";
import { AuthStateInterface, ConfigReducerStateInterface } from "../../models";
import { AppState } from "../../store";
import {
    getProfileInformation,
    getProfileLinkedAccounts,
    handleAccountSwitching
} from "../../store/actions";
import { CommonUtils, refreshPage } from "../../utils";

/**
 * Dashboard layout Prop types.
 */
interface HeaderPropsInterface {
    handleSidePanelToggleClick?: () => void;
}

/**
 * Implementation of the Reusable Header component.
 *
 * @param props - Props injected to the component.
 * @returns - Header component.
 */
export const Header: FunctionComponent<HeaderPropsInterface> = (
    props: HeaderPropsInterface
): ReactElement => {
    const { handleSidePanelToggleClick } = props;

    const dispatch: ThunkDispatch<AppState, void, Action> = useDispatch();

    const [ userStore, setUserstore ] = useState<string>(null);
    const [ showAppSwitchButton, setShowAppSwitchButton ] = useState<boolean>(
        true
    );
    const [ openLanguageSwitcher, setOpenLanguageSwitcher ] = useState<boolean>(
        false
    );
    const [ languageSwitcherAnchorEl, setLanguageSwitcherAnchorEl ] = useState<
        HTMLElement
    >(null);

    const { t } = useTranslation();

    // TODO: Get this from profile reducer and cast `ProfileInfoInterface`.
    const profileInfo: any = useSelector(
        (state: AppState) => state.authenticationInformation.profileInfo
    );
    const tenantName: string = useSelector(
        (state: AppState) => state.authenticationInformation.tenantDomain
    );
    const linkedAccounts: LinkedAccountInterface[] = useSelector(
        (state: AppState) => state.profile.linkedAccounts
    );
    const config: ConfigReducerStateInterface = useSelector(
        (state: AppState) => state.config
    );
    const showAppSwitchButtonConfig: boolean = useSelector(
        (state: AppState) => state.config.ui.showAppSwitchButton
    );
    const consoleAppURL: string = useSelector(
        (state: AppState) => state.config.deployment.consoleApp.path
    );
    const profileDetails: AuthStateInterface = useSelector(
        (state: AppState) => state.authenticationInformation
    );
    const isReadOnlyUser: string = useSelector(
        (state: AppState) =>
            state.authenticationInformation.profileInfo.isReadOnly
    );
    const productName: string = useSelector((state: AppState) => state?.config?.ui?.productName);
    const { mode } = useColorScheme();

    const { theme } = useBrandingPreference();

    useEffect(() => {
        if (isEmpty(profileInfo)) {
            dispatch((getProfileInformation() as unknown) as AnyAction);
        }

        if (isEmpty(linkedAccounts)) {
            dispatch((getProfileLinkedAccounts() as unknown) as AnyAction);
        }
    }, []);

    /**
     * Sets whether to show apps in dropdown.
     */
    useEffect(() => {
        setShowAppSwitchButton(showAppSwitchButtonConfig);
        if (!commonConfig?.utils?.isConsoleNavigationAllowed(userStore)) {
            setShowAppSwitchButton(false);
        }
    }, [ showAppSwitchButtonConfig, userStore ]);

    /**
     * Sets user store of the user.
     */
    useEffect(() => {
        if (profileDetails?.profileInfo?.userName) {
            const userstore: string = resolveUserstore(
                profileDetails.profileInfo.userName
            );

            setUserstore(userstore);
        }
    }, [ profileDetails?.profileInfo ]);

    /**
     * Handles the account switch click event.
     *
     * @param account - Target account.
     */
    const handleLinkedAccountSwitch = (account: LinkedAccountInterface): void => {
        try {
            dispatch(handleAccountSwitching(account));
            refreshPage();
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.detail
            ) {
                dispatch(
                    addAlert({
                        description: t(
                            "myAccount:components.linkedAccounts.notifications.switchAccount.error.description",
                            { description: error.response.data.detail }
                        ),
                        level: AlertLevels.ERROR,
                        message: t("myAccount:components.linkedAccounts.notifications.switchAccount.error.message")
                    })
                );

                return;
            }

            dispatch(
                addAlert({
                    description: t(
                        "myAccount:components.linkedAccounts.notifications.switchAccount.genericError.description"
                    ),
                    level: AlertLevels.ERROR,
                    message: t("myAccount:components.linkedAccounts.notifications.switchAccount.genericError.message")
                })
            );
        }
    };

    /**
     * Resolves the organization label in the header.
     */
    const resolveOrganizationLabel = (): ReactElement => {
        const organization: string =
            tenantName == "carbon.super"
                ? commonConfig.header.organization.replace("{{productName}}", productName)
                : tenantName;

        return (
            <Alert classes={ { root: "organization-label-alert" } } severity="info" icon={ false }>
                { t("myAccount:components.header.organizationLabel") }{ " " }
                <strong>{ organization }</strong>
            </Alert>
        );
    };

    /**
     * Resolves the Console App Switch menu item.
     */
    const resolveConsoleAppSwitchMenuItem = (): ReactElement => {

        return (
            showAppSwitchButton &&
                !(CommonUtils?.isProfileReadOnly(isReadOnlyUser)) &&
                    consoleAppURL && consoleAppURL != "" ? (
                    <MenuItem 
                        key={
                            t("myAccount:components.header.appSwitch.console.name") 
                        } 
                        onClick={ () => window.open(consoleAppURL, "_blank", "noopener") }>
                        <ListItemIcon> 
                            <RectangleLineIcon fill="black" />
                        </ListItemIcon>
                        <ListItemText primary={ t("myAccount:components.header.appSwitch.console.name") } />
                    </MenuItem>
                ) : null
        );
    };

    const supportedI18nLanguages: SupportedLanguagesMeta = useSelector(
        (state: AppState) => state.global.supportedI18nLanguages
    );

    const handleLanguageSwitching = (e: MouseEvent<HTMLElement>) => {
        setOpenLanguageSwitcher(!openLanguageSwitcher);
        setLanguageSwitcherAnchorEl(e.currentTarget);
    };

    const resolveUsername = (): string => {
        if (profileInfo?.name?.givenName) {
            return profileInfo.name.givenName;
        }

        if (profileInfo?.name?.familyName) {
            return profileInfo.name.familyName;
        }

        if (profileInfo?.userName) {
            return profileInfo.userName.split("/")[ 1 ];
        }

        return "";
    };

    return (
        <OxygenHeader
            className="is-header"
            brand={ {
                logo: {
                    desktop: (
                        <Image
                            src={ theme?.images?.myAccountLogo?.imgURL 
                                    ?? resolveAppLogoFilePath(
                                        window[ "AppUtils" ].getConfig().ui.appLogoPath,
                                        `${ window[ "AppUtils" ].getConfig().clientOrigin
                                        }/` +
                                        `${ StringUtils.removeSlashesFromPath(
                                            window[ "AppUtils" ].getConfig()
                                                .appBase
                                        ) !== ""
                                            ? StringUtils.removeSlashesFromPath(
                                                window[ "AppUtils" ].getConfig()
                                                    .appBase
                                            ) + "/"
                                            : ""
                                        }libs/themes/` +
                                        config.ui.theme.name
                                    ) }
                            alt="logo"
                        />
                    ),
                    mobile: (
                        <Image
                            src={ theme?.images?.myAccountLogo?.imgURL 
                                    ?? resolveAppLogoFilePath(
                                        window[ "AppUtils" ].getConfig().ui.appLogoPath,
                                        `${ window[ "AppUtils" ].getConfig().clientOrigin
                                        }/` +
                                        `${ StringUtils.removeSlashesFromPath(
                                            window[ "AppUtils" ].getConfig()
                                                .appBase
                                        ) !== ""
                                            ? StringUtils.removeSlashesFromPath(
                                                window[ "AppUtils" ].getConfig()
                                                    .appBase
                                            ) + "/"
                                            : ""
                                        }libs/themes/` +
                                        config.ui.theme.name
                                    ) }
                            alt="logo"
                        />
                    )
                },
                onClick: () => {
                    history.push(AppConstants.getPaths().get("DASHBOARD"));
                },
                title: theme?.images?.myAccountLogo?.title ?? config.ui.appName
            } }
            user={ {
                email: profileInfo?.email ?? profileInfo?.emails[ 0 ],
                image: profileInfo?.profileUrl,
                name: resolveUsername()
            } }
            showCollapsibleHamburger
            onCollapsibleHamburgerClick={ handleSidePanelToggleClick }
            position="fixed"
            rightAlignedElements={ [
                <>
                    <Button
                        color="inherit"
                        startIcon={ <LanguageIcon /> }
                        endIcon={ <ChevronDownIcon /> }
                        key={ I18n.instance?.language }
                        onClick={ handleLanguageSwitching }
                        data-componentid="app-header-language-switcher-trigger"
                    >
                        { supportedI18nLanguages[ I18n.instance?.language ]?.name }
                    </Button>
                    <Menu
                        open={ openLanguageSwitcher }
                        anchorEl={ languageSwitcherAnchorEl }
                        onClose={ handleLanguageSwitching }
                    >
                        { Object.entries(supportedI18nLanguages)?.map(
                            ([ key, value ]: [ key: string, value: LocaleMeta ]) => {
                                if (I18n.instance?.language === value.code) {
                                    return;
                                }

                                return (
                                    <MenuItem
                                        key={ key }
                                        onClick={ () => {
                                            I18n.instance?.changeLanguage(
                                                value.code
                                            );
                                            setOpenLanguageSwitcher(false);
                                        } }
                                    >
                                        <ListItem>
                                            <ListItemIcon>
                                                <Flag
                                                    countryCode={ value.flag }
                                                />
                                            </ListItemIcon>
                                            <ListItemText>
                                                { value.name }
                                            </ListItemText>
                                        </ListItem>
                                    </MenuItem>
                                );
                            }
                        ) }
                    </Menu>
                </>
            ] }
            userDropdownMenu={ {
                actionIcon: <ArrowRightFromBracketIcon fill={ mode === "dark" ? "white" : "black" } />,
                actionText: t("common:logout"),
                menuItems: [
                    resolveOrganizationLabel(),
                    resolveConsoleAppSwitchMenuItem(),
                    linkedAccounts.map((linkedAccount: LinkedAccountInterface) => (
                        <MenuItem
                            key={ linkedAccount.userId }
                            onClick={ () => handleLinkedAccountSwitch(linkedAccount) }>
                            <ListItemAvatar>
                                <Gravatar email={ linkedAccount.email } />
                            </ListItemAvatar>
                            <ListItemText primary={ linkedAccount.username } secondary={ linkedAccount.lastName } />
                        </MenuItem>
                    ))
                ],
                onActionClick: () =>
                    history.push(AppConstants.getAppLogoutPath()),
                triggerOptions: {
                    "data-componentid": "app-header-user-avatar",
                    "data-testid": "app-header-user-avatar"
                }
            } }
        />
    );
};

Header.defaultProps = {
    handleSidePanelToggleClick: () => null
};
