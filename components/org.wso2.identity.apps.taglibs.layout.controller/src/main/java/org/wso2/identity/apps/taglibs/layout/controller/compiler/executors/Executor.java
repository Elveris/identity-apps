/*
 * Copyright (c) 2022, WSO2 Inc. (http://www.wso2.com).
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

package org.wso2.identity.apps.taglibs.layout.controller.compiler.executors;

import org.wso2.identity.apps.taglibs.layout.controller.compiler.identifiers.ComponentIdentifier;
import org.wso2.identity.apps.taglibs.layout.controller.compiler.identifiers.ConditionIdentifier;
import org.wso2.identity.apps.taglibs.layout.controller.compiler.identifiers.DataIdentifier;
import org.wso2.identity.apps.taglibs.layout.controller.compiler.identifiers.DefaultIdentifier;
import org.wso2.identity.apps.taglibs.layout.controller.compiler.identifiers.NoIdentifier;
import org.wso2.identity.apps.taglibs.layout.controller.compiler.identifiers.NotConditionIdentifier;

import java.io.Serializable;
import java.io.Writer;

/**
 * Executor class interface
 */
public interface Executor extends Serializable {

    /**
     * Check whether the compiled layout execution can continue or not
     *
     * @return Whether the compiled layout execution can continue or not
     */
    public boolean continueExecution();

    /**
     * Get the current executing index of the compiled layout
     *
     * @return current executing index
     */
    public int getCurrentExecutionIndex();

    /**
     * Execute the provided default identifier
     *
     * @param identifier Default identifier (Set of identifiers)
     * @param out The output will be written to this writer
     */
    public void execute(DefaultIdentifier identifier, Writer out);

    /**
     * Execute the provided component identifier
     *
     * @param identifier Component identifier
     * @param out The output will be written to this writer
     */
    public void execute(ComponentIdentifier identifier, Writer out);

    /**
     * Execute the provided data identifier
     *
     * @param identifier Data identifier
     * @param out The output will be written to this writer
     */
    public void execute(DataIdentifier identifier, Writer out);

    /**
     * Execute the provided condition identifier
     *
     * @param identifier Condition identifier
     * @param out The output will be written to this writer
     */
    public void execute(ConditionIdentifier identifier, Writer out);

    /**
     * Execute the provided not condition identifier
     *
     * @param identifier Not condition identifier
     * @param out The output will be written to this writer
     */
    public void execute(NotConditionIdentifier identifier, Writer out);

    /**
     * Execute the provided no identifier
     *
     * @param identifier No identifier
     * @param out The output will be written to this writer
     */
    public void execute(NoIdentifier identifier, Writer out);

}
